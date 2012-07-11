Ext.define('cfa.controller.setting.SettingController', {
	extend : 'Ext.app.Controller',
	requires : ['cfa.view.setting.SettingView', 'cfa.model.Import', 'cfa.model.User'],

	config : {
		routes : {
			'settings' : 'showSettingPage'
		},

		refs : {
			main : 'main',
			resetDataButton : 'button[action = resetdatabtn]',
			importDataButton : 'button[action = importdatabtn]',
			saveUserDataButton: 'button[action = saveuserdata]'
		},

		control : {
			resetDataButton : {
				tap : 'resetData'
			},
			importDataButton : {
				tap : 'importData'
			},
			saveUserDataButton: {
            	'tap': 'saveUserData'
            }

		},
		importList : undefined,
		importStore : undefined,
		casesStore : undefined,
		casesList : undefined,
		settingView: null
	},

	showSettingPage: function(){
		this.setSettingView(Ext.create('cfa.view.setting.SettingView'));
		this.getMain().push(this.getSettingView());
		Ext.getStore('Users').load({callback: function(records, e, opt){
			this.getSettingView().getComponent('settingformpanel').setRecord(records[0]);
		}, scope: this});
		
		       						
	},

	resetData : function() {
		Ext.Msg.confirm("Reset Data", "Do you want to reset data?",
				this.confirmResetData, this);
	},

	importData : function() {
		var me = this;
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

				var fail = function(error) {
					console.log("Error: " + error.code);
				}

				var onItemDisclosure = function(list, record, target, index, event, eOpts) {
					if (record.getData().type.toUpperCase() == 'CASE') {
						window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
								function(fileSystem) {
									fileSystem.root.getFile(
											record.getData().fullPath, {
												create : false
											}, function(entry) {
												entry.file(function(file) {
													var reader = new FileReader();
													reader.onloadend = function(
															evt) {
														Formpod
																.importData(
																		evt.target.result,
																		function() {
																			Ext.Msg
																					.alert(
																							"Import Data",
																							"Import data succesfully",
																							function() {
																								me
																										.getImportList()
																										.hide();
																							},
																							me);

																		});
													};
													reader.readAsText(file);

												}, fail);
											}, fail);

								}, fail);

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
											store : me.getCasesStore()
										}]
							}
							me.setCasesList(caselist);
						}
						me.getImportList().getComponent('importview').push(me.getCasesList());
					}

				}

				var importList = Ext.create('Ext.Panel', {
							modal : true,
							layout: 'fit',
							hideOnMaskTap : true,
							hidden : true,
							top : 0,
							left : 0,
							width : 400,
							height : 400,
							scrollable : true,

							items : [{
								xtype: 'navigationview',
								itemId: 'importview',
								items: [{
										xtype : 'list',
										title : 'Import list',
										fullScreen : true,
										itemTpl : "{name}",
										store : me.getImportStore(),
										grouped : true,
										onItemDisclosure: true,
										listeners : {
											disclose : {
												fn : onItemDisclosure,
												scope : me
											}
										}

									}]
							}]
						});
				me.setImportList(importList);
				Ext.Viewport.add(me.getImportList());
			} else {
				me.getImportStore().setData(Ext.JSON.decode(result));
			}
			me.getImportList().showBy(me.getImportDataButton());
		}, function() {
			Ext.Msg.alert('Import Data', 'This may be cause error....',
					Ext.emptyFn, this);
		});
	},

	confirmResetData : function(button) {
		if (button == 'yes') {
			Ext.Msg
					.confirm(
							"Reset Data",
							"This action can not be reverted, do you really want to reset data?",
							this.confirmResetData2, this);
		}
	},

	confirmResetData2 : function(button) {
		if (button == 'yes') {
			var casesStore = Ext.getStore('Cases');
			casesStore.getProxy().clear();
			casesStore.load();

			var imageStore = Ext.create('cfa.store.LSImages');
			imageStore.load(function() {
						imageStore.removeAll();
						imageStore.sync();
					});

			Ext.Msg.alert('Reset Data', 'Data has been reset successfully.',
					Ext.emptyFn, this);
		}
	},
	
	 saveUserData: function() {
    	var store = Ext.getStore('Users').load(),
    		firstname = this.getSettingView().getComponent('settingformpanel').getComponent(0).getComponent('firstname').getValue(),
    		lastname = this.getSettingView().getComponent('settingformpanel').getComponent(0).getComponent('lastname').getValue();
    	
    	store.removeAll(false);
    	store.add({'firstname': firstname, 'lastname': lastname});
    	store.sync();
    	Ext.Msg.alert('Save user data', 'Data has been saved successfully.', Ext.emptyFn, this);
    }

})