Ext.define('cfa.view.setting.SettingView', {
	extend : 'Ext.Panel',
	xtype : 'setting',

	config : {
		title : 'Settings',
		layout : 'fit',
		items : [{
					xtype : 'formpanel',
					itemId : 'settingformpanel',
					items : [{
								xtype : 'fieldset',
								title : 'General Information',
								defaults : {
									labelWidth : '20%'
								},
								items : [{
											xtype : 'textfield',
											itemId: 'firstname',
											name : 'firstname',
											label : 'First Name',
											autoCapitalize : true
										}, {
											xtype : 'textfield',
											itemId: 'lastname',
											name : 'lastname',
											label : 'Last Name',
											autoCapitalize : true
										}]
							}, {
								xtype : 'panel',
								items : [{
											xtype : 'button',
											action : 'saveuserdata',
											width : 200,
											text : 'Save'
										}]
							}, {
								xtype : 'fieldset',
								itemId : 'aboutfieldset',
								title : 'About',
								defaults : {
									labelWidth : '20%'
								},
								items : [{
											xtype : 'textfield',
											itemId : 'versiontextfield',
											label : 'Version',
											value : '',
											readOnly : true
										}]
							}, {
								xtype : 'panel',
								layout: 'hbox',
								items : [{
											xtype : 'button',
											action : 'resetdatabtn',
											width : 200,
											text : 'Reset Data'
										}, {
											xtype : 'button',
											action : 'importdatabtn',
											width : 200,
											margin : '0 0 0 20',
											text : 'Import Data'
										}, {
											xtype : 'button',
											action : 'managedocument',
											width : 200,
											margin : '0 0 0 20',
											text : 'Manage Documents'
										}]
							}]
				}]
	},

	initialize : function() {
		var settingFormPanel = this.getComponent('settingformpanel'), aboutFieldSet = settingFormPanel
				.getComponent('aboutfieldset'), versionTextField = aboutFieldSet
				.getComponent('versiontextfield');

		versionTextField.setValue(cfa.app.application.buildVersion.version);

		cfa.app.helpUrl = "SettingHelp";
	}
});
