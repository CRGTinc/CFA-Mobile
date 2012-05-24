Ext.define('cfa.view.Main', {
    extend: 'Ext.navigation.View',
    
    xtype: 'main',

    requires: [
        'cfa.view.Dashboards'		
    ],

    config: {
		items: [{
                xtype: 'dashboards',
                title: 'Dashboards',
                store: 'Dashboards'
            }
        ],
        
        fullscreen: true,
        
        autoDestroy: false,
        
        navigationBar: {
            backButton: {
                iconCls: 'back'
            },
            
			items: [{
					xtype: 'button',
					text: 'Home',
					ui: 'action',
					id: 'home-btn'
                }, {
					xtype: 'button',
					text: 'Basics Help',
					ui: 'action',
					id: 'basic-btn'
				}, {
					xtype: 'button',
					text: 'Feedback',
					ui: 'action',
					id: 'fed-btn'
				}, {
					xtype: 'button',
					text: 'About',
					ui: 'action',
					id: 'about-btn'
				}
            ]			
        }
    }
});
