Ext.define('cfa.controller.setting.SettingController', {
	extend : 'Ext.app.Controller',
	requires : ['cfa.view.setting.SettingView', 'cfa.model.Import', 'cfa.model.User', 'cfa.view.setting.ImportDataView'],

	config : {
		routes : {
			'settings' : 'showSettingPage'
		},

		refs : {
			main : 'main',
			resetDataButton : 'button[action = resetdatabtn]',
			importDataButton : 'button[action = importdatabtn]',
			saveUserDataButton : 'button[action = saveuserdata]',
			manageDocumentButton: 'button[action = managedocument]',
			deleteButton: 'button[action = deletefile]'
		},

		control : {
			resetDataButton : {
				tap : 'resetData'
			},
			importDataButton : {
				tap : 'importData'
			},
			saveUserDataButton : {
				'tap' : 'saveUserData'
			},

			deleteImportButton : {
				'tap' : 'deleteImportItems'
			},
			
			manageDocumentButton: {
				'tap' : 'manageDocument'
			},
			
			deleteButton: {
				'tap': 'deleteFile'
			}

		},
		importListView : undefined,
		importStore : undefined,
		casesStore : undefined,
		casesList : undefined,
		documentStore: undefined,
		documentStoreView: undefined,
		settingView : null,
		currentImportFile : '',
		helper: cfa.utils.HelperUtil.getHelper(),
		fileUtils: cfa.utils.FileUtils,
		isBindDropEvent: false,
		currentListView: undefined
	},

	showSettingPage : function() {
		this.setSettingView(Ext.create('cfa.view.setting.SettingView'));
		
        if (Ext.os.is.Desktop) {
            this.getManageDocumentButton().hide();
        } else {
            this.getManageDocumentButton().show();
        }

		this.getMain().push(this.getSettingView());
		Ext.getStore('Users').load({
			callback : function(records, e, opt) {
				this.getSettingView().getComponent('settingformpanel').setRecord(records[0]);
			},
			scope : this
		});
		
		window.webkitStorageInfo.requestQuota(window.PERSISTENT, 1024 * 1024 * 50, function(grantedBytes) {
			
		}, function(e) {
			
			Ext.Msg.alert("Error", "Error allocating quota");
		});
	},

	resetData : function() {
		Ext.Msg.confirm("Reset Data", "Do you want to reset data?", this.confirmResetData, this);
	},

	onImportListItemDisclosure : function(list, record, target, index, event, eOpts) {
		var me = this, fail = function(error) {
			console.log("Error: " + error.code);
		};

		if (record.getData().type.toUpperCase() == 'CASE') {
			me.getHelper().getFileData(record.getData().fullPath,
					function(data) {
						me.getSettingView().setMasked({
									xtype : 'loadmask',
									message : 'Importing...'
								});
						
						if (me.getFileUtils().isEncryptedData(data)) {
							data = me.getFileUtils().XORDecode(data);
						}
						Formpod.importData(data, function() {
									Ext.Msg.alert("Import Data",
											"Data imported successfully",
											Ext.emptyFn, me);
									me.getSettingView().unmask();
								});

					});
			me.getImportListView().hide();

		} else {
			if (me.getCasesStore() == undefined) {
				var store = Ext.create('cfa.store.SearchCases', {
					queryType : 'class',
					queryParam : 'Case Form'
				}).load();

				me.setCasesStore(store);

				var caselist = {
					xtype : 'panel',
					layout : 'fit',
					items : [{
						xtype : 'list',
						store : me.getCasesStore(),
						listeners : {
							itemtap : {
								fn : me.onCaseListItemTap,
								scope : this
							}
						}
					}]
				}
				me.setCasesList(caselist);
			}
			me.getImportListView().getComponent('container').push(me.getCasesList());
			me.setCurrentImportFile(record.getData().fullPath);
		};
	},

	onCaseListItemTap : function(view, index, target, record, e, eOpts) {

		var me = this;
		var fail = function(error) {
			console.log("Error: " + error);
		};

		me.getHelper().getFileData(me.getCurrentImportFile(), function(data) {
			me.getSettingView().setMasked({
				xtype : 'loadmask',
				message : 'Importing...'
			});
			
			if (me.getFileUtils().isEncryptedData(data)) {
				data = me.getFileUtils().XORDecode(data);
			}

			Formpod.importDevice(record.getData().form, data, function() {
				Ext.Msg.alert("Import Data", "Data imported successfully", function() {
				}, me);
				me.getSettingView().unmask();
			});
		});

		me.getImportListView().hide();

	},

	importData : function() {
		var me = this;
		var listener = {
			disclose : {
				fn : this.onImportListItemDisclosure,
				scope : me
			}
		};

		me.getHelper().loadImportedData(function(result) {
			if (me.getImportStore() == undefined) {
				var importDataStore = Ext.create('Ext.data.Store', {
					model : 'cfa.model.Import',
					data : result,
					grouper : {
						groupFn : function(record) {
							return record.get('type');
						}
					}
				});
				
				me.setImportStore(importDataStore);
				me.getImportStore().load();
				me.setImportListView(Ext.create('cfa.view.setting.ImportDataView'));
				var listView = {
					xtype : 'list',
					mode: 'MULTI',
					title: 'Import List',
					itemId: 'importlist',
					itemTpl : "{name}",
					onItemDisclosure: true,
					grouped : true
				};
				me.getImportListView().getComponent('container').add(listView);
				me.getImportListView().getComponent('container').getComponent('importlist').setListeners(listener);
				me.getImportListView().getComponent('container').getComponent('importlist').setStore(me.getImportStore());
				Ext.Viewport.add(me.getImportListView());
			} else {
				me.getImportListView().getComponent('container').reset();
				me.getImportStore().setData(Ext.JSON.decode(result));
			}
			
			if (Ext.os.is.Desktop) {
				me.getImportListView().getComponent('dragpanel').getComponent('dragfilefield').show();
			} else {
				me.getImportListView().getComponent('dragpanel').getComponent('dragfilefield').hide();
			}
			
			me.getImportListView().showBy(me.getImportDataButton());
			me.setCurrentListView('importlist');
			if(!me.getIsBindDropEvent()) {
			    me.processDataFromDesktop();
			    me.setIsBindDropEvent(true);
			}
			    
		}, function() {
			Ext.Msg.alert('Import Data', 'This may be cause error....', Ext.emptyFn, this);
		});
	},
	confirmResetData : function(button) {
		if (button == 'yes') {
			Ext.Msg.confirm("Reset Data", "This action can not be reverted, do you really want to reset data?", this.confirmResetData2, this);
		}
	},
	confirmResetData2 : function(button) {
		if (button == 'yes') {
			var casesStore = Ext.getStore('Cases');
			casesStore.getNode().removeAll();
			casesStore.sync();

			var imageStore = Ext.create('cfa.store.LSImages');
			imageStore.load(function() {
				imageStore.removeAll();
				imageStore.sync();
			});

			Ext.Msg.alert('Reset Data', 'Data has been reset successfully.', Ext.emptyFn, this);
		}
	},
	saveUserData : function() {
		var store = Ext.getStore('Users').load(),
			firstname = this.getSettingView().getComponent('settingformpanel').getComponent(0).getComponent('firstname').getValue(),
		 	lastname = this.getSettingView().getComponent('settingformpanel').getComponent(0).getComponent('lastname').getValue();

		store.removeAll(false);
		store.add({
			'firstname' : firstname,
			'lastname' : lastname
		});
		store.sync();
		Ext.Msg.alert('Save user data', 'Data has been saved successfully.', Ext.emptyFn, this);
	},
	
	manageDocument: function() {
		var me = this;

		me.getHelper().loadDownloadedDocuments(function(result) {
			if (me.getDocumentStore() == undefined) {
				var documentStore = Ext.create('Ext.data.Store', {
					model : 'cfa.model.Import',
					data : result,
					grouper : {
						groupFn : function(record) {
							return record.get('type');
						}
					}
				});

				me.setDocumentStore(documentStore);
				me.getDocumentStore().load();
				var listView = {
					xtype : 'list',
					title: 'Downloaded Documents',
					itemId: 'documentlist',
					itemTpl : "{name}",
					grouped : true
				};
				me.setDocumentStoreView(Ext.create('cfa.view.setting.ImportDataView'));
				me.getDocumentStoreView().getComponent('container').add(listView);
				me.getDocumentStoreView().getComponent('container').getComponent('documentlist').setStore(me.getDocumentStore());
				me.getDocumentStoreView().getComponent('actionbar').show();
				Ext.Viewport.add(me.getDocumentStoreView());
			} else {
				me.getDocumentStoreView().getComponent('container').reset();
				me.getDocumentStore().setData(Ext.JSON.decode(result));
			}
			me.getDocumentStoreView().showBy(me.getManageDocumentButton());
			me.setCurrentListView('documentlist');
		}, function() {
			Ext.Msg.alert('Manage Document', 'This may be cause error....', Ext.emptyFn, this);
		});
	},
	
	
	deleteFile: function() {
		var me = this;
		var selectedFiles;
		if (this.getCurrentListView() == 'importlist') {
		    selectedFiles = this.getImportListView().getComponent('container').getComponent('importlist').getSelection();
		    importStore = this.getImportStore();
		   
            for (var i = 0; i < selectedFiles.length; i++) {
                importStore.remove(selectedFiles[i]);
                me.getHelper().deleteFile(selectedFiles[i].getData().fullPath);
            }
            me.getImportListView().hide();
            Ext.Msg.alert('Detele File', 'File(s) deleted');
		         
		} else {
		    selectedFiles = this.getDocumentStoreView().getComponent('container').getComponent('documentlist').getSelection();
		    var downloadedStore = Ext.getStore('ReferencesDownloaded');
            var documentStore = this.getDocumentStore();
        
            downloadedStore.load({
                callback : function(records, operation, success) {
    
                    for (var i = 0; i < selectedFiles.length; i++) {
                        documentStore.remove(selectedFiles[i]);
                        var recordToDelete = downloadedStore.findRecord('title',selectedFiles[i].getData().name.replace('.pdf','') );
                        downloadedStore.remove(recordToDelete);
                        me.getHelper().deleteFile(selectedFiles[i].getData().fullPath);
                    }
    
                    downloadedStore.sync({
                        callback : function() {
                            me.getDocumentStoreView().hide();
                            Ext.Msg.alert('Detele File', 'Document(s) deleted');
                            
                        }
                    });
                },
                scope : this,
            }); 
		} 
	},
	
	processDataFromDesktop : function() {
		var me = this;
		
		if (window.FileReader) {
		   
			var drop = document.getElementById('dragfilefield');
			function cancel(e) {
				if (e.preventDefault) {
					e.preventDefault();
				}
				return false;
			}
			me.addEventHandler(drop, 'dragover', cancel);
			me.addEventHandler(drop, 'dragenter', cancel);
			me.addEventHandler(drop, 'drop', function(e) {
				e = e || window.event;
				if (e.preventDefault) {
					e.preventDefault();
				}

				var dt = e.dataTransfer;
				var files = dt.files;
				var filesArray = [], dataArray = [];
				var store = me.getImportStore();

				for (var i = 0; i < files.length; i++) {
					if (!store.findRecord('name', files[i].name)) {
						filesArray.push(files[i]);
					}
				}
				
				if (filesArray.length > 0) {
					me.putFileInToList(filesArray, dataArray);
				} else {
					Ext.Msg.alert("File Import", "The file(s) already exists." )
				}
				
				return false;
			});
			
		} else {
			Ext.Msg.alert('Alert', 'Your browser does not support the HTML5 FileReader. Please use Chrome browser');
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
	},
	
	
	putFileInToList : function(filesArray, resultArray) {
		var me = this;
		var files = filesArray;
		var dataArray = resultArray;
		var dataType = '';

		if (files[0] != null) {
			var name = files[0].name;
			
			if (files[0].name.toUpperCase().indexOf('CASE') > -1) {
				dataType = 'Case';
			} else {
				dataType = 'Device';
			}
			
			var reader = new FileReader();
			reader.onloadend = function(evt) {
				var data = evt.target.result.replace('data:;base64,', '').replace('data:base64,', '').replace('data:application/json;base64,', '');

				if (me.getFileUtils().isEncryptedData(data)) {
					data = me.getFileUtils().XORDecode(data);
					if (me.getFileUtils().isEncryptedData(data)) {
						Ext.Msg.alert("Import Files", "There is error(s) in decoded file");
						return;
					}
				}
				
				var count = 0, length = files.length;
				me.getHelper().saveDropFile(name, data, function(path) {
					var record = {};
					record.name = name;
					record.fullPath = path;
					record.type = dataType;
					dataArray.push(record);
					count++;

					if (count == length) {
						me.getImportStore().add(dataArray);
						me.getImportStore().sync();
					} else {
						me.putFileInToList(files.slice(1, files.length), dataArray);
					}
				});
			};

			reader.readAsText(files[0]);
		}
	},
	
})