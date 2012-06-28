Ext.define('cfa.controller.case.CaseController', {
	extend : 'Ext.app.Controller',

	requires : ['cfa.view.case.CaseView', 'cfa.view.case.CaseFormSelectionView'],

	config : {
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
			deleteCaseDataButton : 'button[action = deletecasedata]'
		},

		control : {
			casesList : {
				'itemtap' : 'caseItemTap',
				'back' : 'casesListBackTap'
			},
            
            refreshCaseDataButton: {
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
			}
		},

		currentRecord : null,
		
		nextRecord: null,

		recordsPath : [],

		formSelectionView : null
	},

	initForms : function() {
		if (!this.getFormSelectionView())
			this.setFormSelectionView(Ext.create('cfa.view.case.CaseFormSelectionView'));

		for (var formName in Formpod.FormTypes) {
			Formpod.FormTypes[formName].deleteForm();
		}

		this.setRecordsPath([]);
		this.getCurrentRecord(null);
		this.setNextRecord(null);
	},

	showCasePage : function() {
		this.initForms();
		var caseView = Ext.create('cfa.view.case.CaseView');
		this.getMain().push(caseView);
	},

	caseItemTap: function(nestedList, list, index, target, record, e, eOpts) {
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
    
    refreshCaseData: function() {
        this.setCurrentRecord(null);
        this.showCurrentRecord();
        this.setRecordsPath([]);
    
        var store = Ext.getStore('Cases');
        store.load();
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
	
	getNewRecord: function() {
		var recordsPath = this.getRecordsPath();
		var record = Ext.create('cfa.model.Case');

		if (recordsPath.length) {
			record.set('form', { engineClass: null });
		} else {
			var engine = Formpod.FormTypes['Case Form'];
			record.set('form', engine.getInstance());
		}
		
		return record;
	},

	saveCaseData : function() {
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

			store.sync();

			if (phantomRecord) {
				var parentId = currentRecord.get('parentId');

				if (parentId) {
					store.getNodeById(parentId).appendChild(currentRecord);
				} else {
					store.getNode().appendChild(currentRecord);
				}
			}
		}
		
		var currentRecord = this.getCurrentRecord();
		if (currentRecord) {
			var formData = currentRecord.get('form');
			var engine = formData.engineClass;
			 engine.scrollFormToTop();
		}
		
		return true;
	},
	
	cancelCaseData : function() {
		this.setCurrentRecord(null);
		this.showCurrentRecord();
	},

	exportCaseData : function() {
			
		if (Ext.os.is.Desktop) {
			Ext.Msg.alert("Export Data", "Currently support only for iPad.");
		} else {
			var me = this,
				currentRecord = this.getCurrentRecord();
			
			if (currentRecord.phantom) {
				Ext.Msg.alert("Export Data", "You can not export unsaved data.");
				return;
			}
			
			var actionSheet = Ext.create('Ext.ActionSheet', {
				modal : false,
				left : "40%",
				right : "40%",
				bottom : "6%",

				items : [{

					text : 'Via email',
					handler : function() {

						Formpod.exportData(currentRecord.getData().form, function(data) {
							var filename = Ext.util.Format.date(new Date(), 'Ymd') + "-" + currentRecord.getData().form.id + ".cfadata";

							me.saveFile(data, filename, function() {
								window.plugins.emailComposer.showEmailComposer("CFA Data", null, filename, null, null, null, null);
							});
						});
						actionSheet.hide();
					}
				}, {
					text : 'To iTunes',
					handler : function() {
						Formpod.exportData(currentRecord.getData().form, function(data) {
							var filename = Ext.util.Format.date(new Date(), 'Ymd') + "-" + currentRecord.getData().form.id + ".cfadata";

							me.saveFile(data, filename, function() {
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
		}
	},

	deleteCaseData : function() {
		var  currentRecord = this.getCurrentRecord();
		
		if(!currentRecord.phantom) {
			Ext.Msg.confirm("Delete Data", "Do you want to delete this data?", this.confirmDeleteData, this);
		} else {
			Ext.Msg.alert("Delete Data", "You can not delete unsaved data.");
		}
	},
	
	confirmDeleteData: function(button) {
        if (button == 'yes') {
         	var store = Ext.getStore("Cases"),
         		currentRecord = this.getCurrentRecord();

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
        }
    },

	casesListBackTap : function(nestedList, node, lastActiveList, detailCardActive, eOpts) {
		if (this.formChanged()) {
			this.setNextRecord(null);
			Ext.Msg.confirm("Data Changed", "Do you want to save changes before adding new data?", this.confirmFormChanged, this);
			return false;
		} else {
			var recordsPath = this.getRecordsPath();
			Ext.Array.remove(recordsPath, recordsPath[recordsPath.length - 1]);
			this.setCurrentRecord(null);
			this.showCurrentRecord();
		}
	},

	caseFormSelected : function(list, index, target, record, e, eOpts) {
		this.getFormSelectionView().hide();

		var formType = record.get('name'),
			data = Ext.create('cfa.model.Case'),
			engine = Formpod.FormTypes[formType];

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
			this.getCaseContentPanel().show();
			this.getCaseToolbar().show();
		} else {
			this.getCaseFormPanel().removeAll(false);
			this.getCaseContentPanel().hide();
			this.getCaseToolbar().hide();
		}

		this.showContextInfo(currentRecord);
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

	saveFile : function(jsonString, filename, callback, scope) {
		var me = this;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			fileSystem.root.getFile(filename, {
				create : true,
				exclusive : false
			}, function(fileEntry) {
				fileEntry.createWriter(function(writer) {
					writer.onwrite = function(evt) {
						if ( typeof callback == 'function') {
							Ext.callback(callback, scope || me);
						}
					};

					writer.write(jsonString);
				}, this.fail);
			}, this.fail);
		}, this.fail);
	},

	fail : function(error) {
		console.log(error.code);
	},
	
	formChanged: function() {
		var currentRecord = this.getCurrentRecord();
		var changed = false;
		
		if (currentRecord) {
			var currentData = currentRecord.getData().form;
			var engine = currentData.engineClass,
				formData = engine.getFormObject();
				
			for (key in formData) {
                if (formData[key] == '' && currentData[key] == null)
                    continue;

                if (formData[key] == null && currentData[key] == '')
                    continue;
                
				if (formData[key] != currentData[key]) {
					changed = true;
					break;
				}
			}
		}
		
		return changed;
	},
	
	confirmFormChanged: function(button) {
		if (button == 'yes') {
			if (!this.saveCaseData()) {
				return;
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
				var store = Ext.getStore('CaseForms'),
					lastRecord = recordsPath[recordsPath.length - 1],
					childForms = lastRecord.get('form').engineClass.childForms;

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
	}
});

