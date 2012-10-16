Ext.define('cfa.controller.case.CaseController', {
	extend : 'Ext.app.Controller',

	requires : ['cfa.view.case.CaseView', 'cfa.view.case.CaseFormSelectionView', 'cfa.store.LSImages'],

	config : {
		imageStore : undefined,
		imageList : undefined,
		currentImageURI : undefined,

		routes : {
			'cases' : 'showCasePage'
		},

		refs : {
			main : 'main',
			casesList : 'nestedlist[id = "caseslist"]',
			caseContextPanel : 'panel[id = "casecontextpanel"]',
			caseContentPanel : 'panel[id = "casecontentpanel"]',
			caseFormPanel : 'panel[id = "caseformpanel"]',
			caseToolbar : 'toolbar[id = "casetoolbar"]',
			caseContextLabel : '#casecontextlabel',
			refreshCaseDataButton : 'button[action = refreshCaseData]',
			addCaseDataButton : 'button[action = addCaseData]',
			saveCaseDataButton : 'button[action = savecasedata]',
			cancelCaseDataButton : 'button[action = cancelcasedata]',
			caseFormList : 'list[id = "caseformlist"]',
			exportCaseDataButton : 'button[action = exportcasedata]',
			deleteCaseDataButton : 'button[action = deletecasedata]',
			attachCaseDataButton : 'button[action = attachcasedata]',
			deleteAttachmentButton : 'button[action = deleteattachmentdata]',
			clearAllAttachmentButton : 'button[action = clearattachmentdata]'
		},

		control : {
			main : {
				'pop' : 'onPop',
				beforepopcommand : 'onMainBack',
				todashboardcommand : 'onBackToDashboard'
			},

			casesList : {
				'itemtap' : 'caseItemTap',
				'back' : 'casesListBackTap'
			},

			refreshCaseDataButton : {
				'tap' : 'refreshCaseData'
			},

			addCaseDataButton : {
				'tap' : 'addCaseData'
			},

			saveCaseDataButton : {
				'tap' : 'saveCaseData'
			},

			cancelCaseDataButton : {
				'tap' : 'cancelCaseData'
			},

			caseFormList : {
				'itemtap' : 'caseFormSelected'
			},

			exportCaseDataButton : {
				'tap' : 'exportCaseData'
			},

			deleteCaseDataButton : {
				'tap' : 'deleteCaseData'
			},

			attachCaseDataButton : {
				'tap' : 'attachCaseData'
			},

			deleteAttachmentButton : {
				'tap' : 'deleteAttachmentData'
			},

			clearAllAttachmentButton : {
				'tap' : 'clearAttachmentData'
			}
		},

		currentRecord : null,

		nextRecord : null,

		recordsPath : [],

		formSelectionView : null,

		imageStoreChanged : false,

		caseView : null,

		currentActionSheet : null,

		neededPop : false,
		neededRefesh : false,
		resetMainStack : false,
		
		helper: cfa.utils.HelperUtil.getHelper(),
		fileUtils: cfa.utils.FileUtils,
		isDesktop: Ext.os.is.Desktop
	},

	initForms : function() {
		if (!this.getFormSelectionView())
			this.setFormSelectionView(Ext.create('cfa.view.case.CaseFormSelectionView'));

		for (var formName in Formpod.FormTypes) {
			Formpod.FormTypes[formName].deleteForm();
		}

		this.setRecordsPath([]);
		this.setCurrentRecord(null);
		this.setNextRecord(null);
	},

	showCasePage : function() {
		this.initForms();
		this.setCaseView(Ext.create('cfa.view.case.CaseView'));
		this.getMain().push(this.getCaseView());
		var store = Ext.getStore('Cases')
		store.load({
			callback: function(records, operation, success) {
				store.removed = [];
				if(store.getData().all.length == 0) {
					this.getCaseContextLabel().setHtml('<div align="center">"Tap on the + button to add a new case"</div>');
				}
		}, scope: this});

		window.webkitStorageInfo.requestQuota(window.PERSISTENT, 1024 * 1024 * 50, function(grantedBytes) {
			
		}, function(e) {
			
			Ext.Msg.alert("Error", "Error allocating quota");
		});
	},

	onPop : function(navigation, view, eOpts) {
		if (view.getId() == 'caseview') {
			var imagelist = Ext.getCmp('imagelist');

			if (imagelist) {
				this.setImageStoreChanged(false);
				this.getCaseFormPanel().removeAll(true);
			} else {
				this.getCaseFormPanel().removeAll(false);
			}
		}

		if (this.getCurrentActionSheet()) {
			this.getCurrentActionSheet().hide();
		}

		view.destroy();
	},

	onMainBack : function() {
		if (!this.getResetMainStack()) {
			if (this.getImageStoreChanged() || this.formChanged()) {
				this.setNextRecord(null);
				Ext.Msg.confirm("Data Changed", "Do you want to save change information?", this.confirmFormChanged, this);
				this.setNeededPop(true);
			} else {
				this.getMain().doPop();
			}
		} else {
			this.getMain().doPop();
		}
	},

	onBackToDashboard : function() {
		if (this.getImageStoreChanged() || this.formChanged()) {
			this.setNextRecord(null);
			Ext.Msg.confirm("Data Changed", "Do you want to save change information?", this.confirmFormChanged, this);
			this.setResetMainStack(true);
		} else {
			this.getMain().reset();
		}
	},

	caseItemTap : function(nestedList, list, index, target, record, e, eOpts) {
		if (this.formChanged()) {
			this.setNextRecord(record);
			Ext.Msg.confirm("Data Changed", "Do you want to save changes before openning new data?", this.confirmFormChanged, this);
			return;
		} else {
			this.setNextRecord(record);
			this.confirmFormChanged('no');
		}

		if (!record.isLeaf()) {
			var recordsPath = this.getRecordsPath();
			Ext.Array.insert(recordsPath, recordsPath.length, [record]);
		}
	},

	refreshCaseData : function() {
		if (this.getImageStoreChanged() || this.formChanged()) {
			this.setNextRecord(null);
			Ext.Msg.confirm("Data Changed", "Do you want to save change information?", this.confirmFormChanged, this);
			this.setNeededRefesh(true);
		} else {
			this.doRefreshData();
		}
	},

	doRefreshData : function() {
		var store = Ext.getStore('Cases'), recordsPath = this.getRecordsPath(), currentNode = recordsPath.length ? recordsPath[recordsPath.length - 1] : store.getNode();

		store.load({
			node : currentNode,
			scope : this,
			callback : function(records, operation, success) {
				store.removed = [];
			}
		});
		this.setCurrentRecord(null);
		this.showCurrentRecord();
	},

	addCaseData : function() {
		if (this.formChanged()) {
			this.setNextRecord(this.getNewRecord());
			Ext.Msg.confirm("Data Changed", "Do you want to save changes before adding new data?", this.confirmFormChanged, this);
		} else {
			this.setNextRecord(this.getNewRecord());
			this.confirmFormChanged('no');
		}
	},

	getNewRecord : function() {
		var recordsPath = this.getRecordsPath();
		var record = Ext.create('cfa.model.Case');

		if (recordsPath.length) {
			record.set('form', {
				engineClass : null
			});
		} else {
			var engine = Formpod.FormTypes['Case Form'];
			record.set('form', engine.getInstance());
		}

		return record;
	},

	saveCaseData : function() {
		if (this.formChanged()) {
			var me = this;
			var currentRecord = this.getCurrentRecord();

			if (currentRecord) {
				var errors = currentRecord.validate();
				if (!errors.isValid()) {
					var errorString = '';
					Ext.each(errors.items, function(rec, i) {
						errorString += rec.getMessage() + "<br>";
					});

					Ext.Msg.alert('Save Data', errorString, Ext.emptyFn);
					return false;
				}

				var store = Ext.getStore('Cases'), phantomRecord = currentRecord.phantom;

				if (phantomRecord) {
					store.add(currentRecord);
				}

				var form = currentRecord.get('form'), engine = form.engineClass;

				form = engine.getFormObject();
				currentRecord.beginEdit();
				currentRecord.set('form', form);
				currentRecord.set('text', form[Formpod.FormTypes[engine.name].displayProperty]);
				currentRecord.endEdit();

				if (!phantomRecord) {
					currentRecord.setDirty(true);
				}

				if (phantomRecord) {

					var parentId = currentRecord.get('parentId');

					if (parentId) {
						store.getNodeById(parentId).appendChild(currentRecord);
					} else {
						store.getNode().appendChild(currentRecord);
					}
				}

				this.getCaseView().setMasked({
					xtype : 'loadmask',
					message : 'Saving...'
				});

				var operations = store.sync({
					callback : function() {
						me.showCurrentRecord();
						me.getCaseView().unmask();
						Ext.Msg.alert("Save Data", "Data saved successfully");
						if (me.getNeededPop()) {
							me.getMain().doPop();
							me.setNeededPop(false);
						}

						if (me.getNeededRefesh()) {
							me.doRefreshData();
							me.setNeededRefesh(false);
						}

						if (me.getResetMainStack()) {
							me.getMain().doPop();
							me.setResetMainStack(false);
						}
					}
				});

				if (this.getImageStore() != undefined) {
					this.getImageStore().sync();
					this.setImageStoreChanged(false);
				}

				engine.scrollFormToTop();
			}
			return true;
		}

	},

	cancelCaseData : function() {
		this.setCurrentRecord(null);
		this.showCurrentRecord();
	},

	exportCaseData : function() {
		var me = this, currentRecord = this.getCurrentRecord();

		if (currentRecord.phantom) {
			Ext.Msg.alert("Export Data", "You can not export unsaved data.");
			return;
		}

		
		if (!me.getIsDesktop()) {
			var actionSheet = Ext.create('Ext.ActionSheet', {
				modal : false,
				left : "40%",
				right : "40%",
				bottom : "6%",
				items : [{
					text : 'Via email',
					handler : function() {
						
					   Ext.Msg.alert("Export Data", "Images are not included in export via email. To include images, export to iTunes.", function(){
					       Formpod.exportData(currentRecord.getData().form, false ,function(data) {
                                var filename = currentRecord.getData().form.engineClass.name.replace(' ', '').replace('/', '') + '-' + Ext.util.Format.date(new Date(), 'Ymd') + "-" + currentRecord.getData().form.id + ".cfadata";
                                var encodedData = me.getFileUtils().XOREncode(data);
    
                                me.getHelper().saveFile(encodedData, filename, function(path) {
                                    if (me.getHelper().fileSizeValidation(filename)) {
                                        window.plugins.emailComposer.showEmailComposer("CFA Data", null, filename, null, null, null, null);
                                    } else {
                                        Ext.Msg.alert("Export Data", "The data is exported but it is larger than 10MB and reach the maximum total size of an attachment data in an email(10MB).<br>Please use iTunes to get the exported file.");
                                    }
                                });
                           });
					   });
					   actionSheet.hide();
					}
				}, {
					text : 'To iTunes',
					handler : function() {
						Formpod.exportData(currentRecord.getData().form, true , function(data) {
							var filename = currentRecord.getData().form.engineClass.name.replace(' ', '').replace('/', '') + '-' + Ext.util.Format.date(new Date(), 'Ymd') + "-" + currentRecord.getData().form.id + ".cfadata";

							me.getHelper().saveFile(data, filename, function() {
								Ext.Msg.alert("Export Data", "Data has been exported successfully.");
							});
							actionSheet.hide();
						});
					}
				}, {
					text : 'Cancel',
					ui : 'confirm',
					handler : function() {
						actionSheet.hide();
					}
				}]
			});
			
			Ext.Viewport.add(actionSheet);
			actionSheet.show();
			this.setCurrentActionSheet(actionSheet);
		} else {
			Formpod.exportData(currentRecord.getData().form, true,function(data) {
				var filename = currentRecord.getData().form.engineClass.name.replace(' ', '').replace('/', '') + '-' + Ext.util.Format.date(new Date(), 'Ymd') + "-" + currentRecord.getData().form.id + ".cfadata";
				var encodedData = me.getFileUtils().XOREncode(data);

				me.getHelper().saveFile(encodedData, filename, function(path) {
					var linkFile = document.createElement('a');
					linkFile.href = path;
					linkFile.download = filename;
					document.body.appendChild(linkFile);
					linkFile.click();
					document.body.removeChild(linkFile);
					me.getHelper().deleteFile("/" + filename);
				});
			}); 
		}
	},

	deleteCaseData : function() {
		var currentRecord = this.getCurrentRecord();

		if (!currentRecord.phantom) {
			Ext.Msg.confirm("Delete Data", "Do you want to delete this data?", this.confirmDeleteData, this);
		} else {
			Ext.Msg.alert("Delete Data", "You can not delete unsaved data.");
		}
	},

	attachCaseData : function() {
		var me = this;

		var onPhotoDataSuccess = function(imageData) {
			var currentRecord = me.getCurrentRecord(), imageStore = me.getImageStore();

			var formId = currentRecord.get('form').PhotoId;
			imageStore.add({
				formId : formId,
				srcImage : "data:image/png;base64," + imageData
			});
			var length = me.getImageStore().getData().length - 1;
			me.getImageList().getScrollable().getScroller().scrollTo(330 * length, 0);
			me.setImageStoreChanged(true);
		}
		var onPhotoDataError = function(message) {
			console.log('Photo data error: ', message);
		}
		var actionSheet = Ext.create('Ext.ActionSheet', {
			modal : false,
			left : '40%',
			right : '40%',
			bottom : '6%',

			items : [{
				text : 'From Camera',
				handler : function() {
					navigator.camera.getPicture(onPhotoDataSuccess, onPhotoDataError, {
						quality : 50,
						destinationType : navigator.camera.DestinationType.DATA_URL,
						encodingType : navigator.camera.EncodingType.PNG,
						sourceType : Camera.PictureSourceType.CAMERA,
						correctOrientation : true
					});
					actionSheet.hide();
				}
			}, {
				text : 'From Photo Library',
				handler : function() {
					navigator.camera.getPicture(onPhotoDataSuccess, onPhotoDataError, {
						quality : 50,
						sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
						destinationType : navigator.camera.DestinationType.DATA_URL,
						encodingType : navigator.camera.EncodingType.PNG
					});
					actionSheet.hide();
				}
			}, {
				text : 'Cancel',
				ui : 'confirm',
				handler : function() {
					actionSheet.hide();
				}
			}]

		});

		Ext.Viewport.add(actionSheet);
		actionSheet.show();
		this.setCurrentActionSheet(actionSheet);
	},

	confirmDeleteData : function(button) {
		if (button == 'yes') {
			var store = Ext.getStore("Cases"), currentRecord = this.getCurrentRecord();

			this.getCasesList().goToNode(currentRecord.parentNode);

			if (!currentRecord.isLeaf()) {
				this.casesListBackTap();
			} else {
				this.setCurrentRecord(null);
				this.showCurrentRecord();
			}

			currentRecord.parentNode.removeChild(currentRecord);
			store.remove(currentRecord);
			store.sync();

			var imageStore = this.getImageStore();

			if (imageStore) {
				imageStore.removeAll();
				imageStore.sync();
				this.setImageStore(null);
			}
		}
	},

	casesListBackTap : function(nestedList, node, lastActiveList, detailCardActive, eOpts) {
		if (this.formChanged()) {
			this.setNextRecord(null);
			Ext.Msg.confirm("Data Changed", "Do you want to save change information?", this.confirmFormChanged, this);
			return false;
		} else {
			var recordsPath = this.getRecordsPath();
			Ext.Array.remove(recordsPath, recordsPath[recordsPath.length - 1]);
			this.setCurrentRecord(null);
			this.showCurrentRecord();
		}

		if (this.getCurrentActionSheet()) {
			this.getCurrentActionSheet().hide();
		}
	},

	caseFormSelected : function(list, index, target, record, e, eOpts) {
		this.getFormSelectionView().hide();

		var formType = record.get('name'), data = Ext.create('cfa.model.Case'), engine = Formpod.FormTypes[formType];

		engine.resetForm();
		data.set('form', engine.getFormObject());

		if (engine.childForms && engine.childForms.length) {
			data.set('leaf', false);
		} else {
			data.set('leaf', true);
		}

		var recordsPath = this.getRecordsPath();

		if (recordsPath.length) {
			var currentNode = recordsPath[recordsPath.length - 1];
			data.set('parentId', currentNode.get('id'));
		}

		this.setCurrentRecord(data);
		this.showCurrentRecord();
	},

	showCurrentRecord : function() {
		var currentRecord = this.getCurrentRecord();

		if (currentRecord) {
			var formData = currentRecord.get('form');
			var data = formData;
			var engine = formData.engineClass;
			engine.resetForm();
			engine.loadForm(data);

			var form = engine.getForm();
			this.getCaseFormPanel().removeAll(false);
			this.getCaseFormPanel().add(form);

			if (engine.attachment == "photo") {
				this.addImageListById(data.PhotoId);
			} else {
				this.addImageListById(null);
			}

			this.getCaseContentPanel().show();

		} else {
			this.getCaseFormPanel().removeAll(false);
			this.getCaseContentPanel().hide();
		}

		this.showEditToolbar(currentRecord);
		this.showContextInfo(currentRecord);
	},

	addImageListById : function(id) {
		this.setImageStore(undefined);
		this.setImageList(undefined);
		if (id != undefined) {
			var imageStore = Ext.create('cfa.store.LSImages');
			imageStore.filterBy(function(record) {
				return record.getData().formId == id; 
			});
			imageStore.getProxy().setFormId(id);
			imageStore.load();
			this.setImageStore(imageStore);
			var imageList = Ext.create('Ext.List', {
				id : 'imagelist',
				itemTpl : new Ext.XTemplate('<img src="{srcImage}"  style = "max-width:320px; max-height:240px;"/>'),
				inline : {
					wrap : false
				},
				scrollable : {
					direction : 'horizontal'
				},
				flex : 2,
				store : this.getImageStore()
			});

			this.setImageList(imageList);
			this.getCaseFormPanel().add(this.getImageList());
			if(this.getIsDesktop()){
                this.processImageDesktop();
            }
		}
	},

	showEditToolbar : function(record) {

		var toolbar = this.getCaseToolbar();

		if (record) {
			var engine = record.get('form').engineClass;

			if (engine.attachment == "photo") {
				
				if (!this.getIsDesktop()){
					this.getAttachCaseDataButton().show();;
				} else {
					this.getAttachCaseDataButton().hide();;
				}
				
				this.getDeleteAttachmentButton().show();
				this.getClearAllAttachmentButton().show();
			} else {
				this.getAttachCaseDataButton().hide();
				this.getDeleteAttachmentButton().hide();
				this.getClearAllAttachmentButton().hide();
			}

			toolbar.show();
		} else {
			toolbar.hide();
		}
	},

	showContextInfo : function(record) {
		if (record) {
			var contextString, engine = record.get('form').engineClass;

			if (record.phantom) {
				contextString = Ext.String.format('<div align="center">New {0}<br />{1}</div>', engine.name, engine.description);
			} else {
				contextString = Ext.String.format('<div align="center">{0}<br />{1}</div>', engine.name, engine.description);
			}

			this.getCaseContextLabel().setHtml(contextString);
		} else {
			this.getCaseContextLabel().setHtml('');
		}
	},

	formChanged : function() {
		var currentRecord = this.getCurrentRecord();
		var changed = false;

		if (currentRecord) {
			var currentData = currentRecord.getData().form;
			var engine = currentData.engineClass, formData = engine.getFormObject();

			for (key in formData) {
				if (formData[key] == '' && currentData[key] == null)
					continue;

				if (formData[key] == null && currentData[key] == '')
					continue;

				if ( typeof formData[key] == 'object') {
					if (formData[key] instanceof Date) {
						if ( typeof currentData[key] != 'undefined' && currentData[key] != null) {
							if (Ext.Date.format(formData[key], Formpod.dateFormat) != Ext.Date.format(currentData[key], Formpod.dateFormat))
								changed = true;
						} else {
							changed = true;
						}
					}
				} else if ( typeof formData[key] == 'string') {
					if (formData[key] != currentData[key]) {
						changed = true;
						break;
					}
				}
			}
		}

		if (this.getImageStoreChanged())
			changed = true;

		return changed;
	},

	confirmFormChanged : function(button) {
		if (button == 'yes') {
			if (!this.saveCaseData()) {
				return;
			}
		} else {
			if (this.getNeededPop()) {
				this.getMain().doPop();
				this.setNeededPop(false);
			}

			if (this.getNeededRefesh()) {
				this.doRefreshData();
				this.setNeededRefesh(false);
			}

			if (this.getResetMainStack()) {
				this.getMain().reset();
				this.setResetMainStack(false);
			}
			
			if (this.getImageStoreChanged()){
				this.setImageStoreChanged(false);
			}
		}

		var nextRecord = this.getNextRecord();

		if (!nextRecord) {
		} else if (nextRecord.phantom) {
			var engine = nextRecord.get('form').engineClass;

			if (engine) {
				engine.resetForm();
				nextRecord.set('form', engine.getFormObject());
			} else {
				var recordsPath = this.getRecordsPath();
				var store = Ext.getStore('CaseForms'), lastRecord = recordsPath[recordsPath.length - 1], childForms = lastRecord.get('form').engineClass.childForms;

				store.clearFilter();
				store.filterBy(function(record) {
					return Ext.Array.contains(childForms, record.get('name'));
				});

				this.getFormSelectionView().showBy(this.getCasesList().getToolbar());
				return;
			}
		} else {
		}

		this.setCurrentRecord(nextRecord);
		this.showCurrentRecord();
	},

	deleteAttachmentData : function() {
		var imageStore = this.getImageStore(), imageList = this.getImageList(), record = imageList.getSelection();

		for (var i = 0; i < record.length; i++) {
			imageStore.remove(record[i])
		}

		this.setImageStoreChanged(true);
	},

	clearAttachmentData : function() {
		var imageStore = this.getImageStore();
		imageStore.removeAll();
		this.setImageStoreChanged(true);
	},
	
	processImageDesktop : function() {
		var me = this;
		var currentRecord = me.getCurrentRecord();
		var imageStore = me.getImageStore();
		var formId = currentRecord.get('form').PhotoId;
		if (window.FileReader) {

			var drop = document.getElementById('imagelist');
			function cancel(e) {
				if (e.preventDefault) {
					e.preventDefault();
				}
				return false;
			}
			// Tells the browser that we *can* drop on this target
			me.addEventHandler(drop, 'dragover', cancel);
			me.addEventHandler(drop, 'dragenter', cancel);
			me.addEventHandler(drop, 'drop', function(e) {
						e = e || window.event;
						// get window.event if e argument missing (in IE)
						if (e.preventDefault) {
							e.preventDefault();
						}
						// stops the browser from redirecting off to the
						// image.

						var dt = e.dataTransfer;
						var files = dt.files;
						for (var i = 0; i < files.length; i++) {
							var file = files[i];
							var reader = new FileReader();
							// attach event handlers here...
							reader.onloadend = function(evt) {
								imageStore.add({
											formId : formId,
											srcImage : evt.target.result
										});
							};

							reader.readAsDataURL(file);
						}
						return false;
					});

		} else {
			Ext.Msg.alert('Alert',
					'Your browser does not support the HTML5 FileReader. Please use Chrome browser');
		}
	},
	
	addEventHandler : function(obj, evt, handler) {
		if (obj.addEventListener) {
			// W3C method
			obj.addEventListener(evt, handler, false);
		} else if (obj.attachEvent) {
			// IE method.
			obj.attachEvent('on' + evt, handler);
		} else {
			// Old school method.
			obj['on' + evt] = handler;
		}
	}
});
