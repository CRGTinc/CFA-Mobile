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
		currentImportFile : ''
	},

	showSettingPage : function() {
		this.setSettingView(Ext.create('cfa.view.setting.SettingView'));
		this.getMain().push(this.getSettingView());
		Ext.getStore('Users').load({
			callback : function(records, e, opt) {
				this.getSettingView().getComponent('settingformpanel').setRecord(records[0]);
			},
			scope : this
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
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
				fileSystem.root.getFile(record.getData().fullPath, {
					create : false
				}, function(entry) {
					entry.file(function(file) {
						var reader = new FileReader();
						reader.onloadend = function(evt) {
							me.getSettingView().setMasked({
								xtype : 'loadmask',
								message : 'Importing...'
							});
							Formpod.importData(evt.target.result, function() {
								Ext.Msg.alert("Import Data", "Data imported successfully", Ext.emptyFn, me);
								me.getSettingView().unmask();
							});
						};
						reader.readAsText(file);

					}, fail);
				}, fail);

			}, fail);
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
			me.getImportListView().getComponent('importlistcontainer').push(me.getCasesList());
			me.setCurrentImportFile(record.getData().fullPath);
		};
	},

	onCaseListItemTap : function(view, index, target, record, e, eOpts) {

		var me = this;
		var fail = function(error) {
			console.log("Error: " + error);
		};

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			fileSystem.root.getFile(me.getCurrentImportFile(), {
				create : false
			}, function(entry) {
				entry.file(function(file) {
					var reader = new FileReader();
					reader.onloadend = function(evt) {
						me.getSettingView().setMasked({
							xtype : 'loadmask',
							message : 'Importing...'
						});
						Formpod.importDevice(record.getData().form, evt.target.result, function() {
							Ext.Msg.alert("Import Data", "Data imported successfully", function() {
							}, me);
							me.getSettingView().unmask();
						});
					};
					reader.readAsText(file);

				}, fail);
			}, fail);

		}, fail);
		me.getImportListView().hide();

	},

	importData : function() {

		if (Ext.os.is.Desktop) {
			Ext.Msg.alert("Import Data", "Currently support only for iPad.");
			return;
		}

		var me = this;

		var listener = {
			disclose : {
				fn : this.onImportListItemDisclosure,
				scope : me
			}
		};

		cfa.helper.PhoneGapHelper.loadImportedData(function(result) {
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
			me.getImportListView().showBy(me.getImportDataButton());
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
		if (Ext.os.is.Desktop) {
			Ext.Msg.alert("Manage Document", "Currently support only for iPad.");
			return;
		}

		var me = this;

		cfa.helper.PhoneGapHelper.loadDownloadedDocuments(function(result) {
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
		}, function() {
			Ext.Msg.alert('Manage Document', 'This may be cause error....', Ext.emptyFn, this);
		});
	},
	
	
	deleteFile: function() {
		var me = this;
		var selectedFiles = this.getDocumentStoreView().getComponent('container').getComponent('documentlist').getSelection();
		var downloadedStore = Ext.getStore('ReferencesDownloaded');
		var documentStore = this.getDocumentStore();
	
		downloadedStore.load({
			callback : function(records, operation, success) {

				for (var i = 0; i < selectedFiles.length; i++) {
					documentStore.remove(selectedFiles[i]);
					var recordToDelete = downloadedStore.findRecord('title',selectedFiles[i].getData().name.replace('.pdf','') );
					downloadedStore.remove(recordToDelete);
					console.log('here');
					cfa.helper.PhoneGapHelper.deleteFile(selectedFiles[i].getData().fullPath);
				}

				downloadedStore.sync({
					callback : function() {
						me.getDocumentStoreView().hide();
						Ext.Msg.alert('Detele File', 'Document deleted');
						
					}
				});
			},
			scope : this,
		}); 


	}

})