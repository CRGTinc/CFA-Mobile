Ext.define('cfa.view.setting.SettingView', {
    extend: 'Ext.Panel',
	xtype: 'setting',
	
    config: {
        title: 'Settings',
        layout: 'fit',
		items:[{
                xtype: 'formpanel',
                items: [{
                        xtype: 'fieldset',
                        title: 'General Information',
                        defaults: {
                            labelWidth: '20%'
                        },
                        items: [{
                                xtype: 'textfield',
                                name: 'firstname',
                                label: 'First Name',
                                autoCapitalize: true
                            }, {
                                xtype: 'textfield',
                                name: 'lastname',
                                label: 'Last Name',
                                autoCapitalize: true
                            }
                        ]
                    }, {
                        xtype: 'fieldset',
                        title: 'About',
                        defaults: {
                            labelWidth: '20%'
                        },
                        items: [{
                                xtype: 'textfield',
                                label: 'Version',
                                value: '0.1.0',
                                readOnly: true
                            }
                        ]
                    }, {
                        xtype: 'panel',
                        items: [{
                                xtype: 'button',
                                id: 'resetdatabtn',
                                width: 200,
                                text: 'Reset Data'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
