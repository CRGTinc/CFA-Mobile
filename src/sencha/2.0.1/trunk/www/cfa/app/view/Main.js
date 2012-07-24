Ext.define('cfa.view.Main', {
    extend: 'Ext.navigation.View',
    
    xtype: 'main',

    requires: [
        'cfa.view.Dashboards'		
    ],

    config: {
        fullscreen: true,
        
        navigationBar: {
			items: [{
					xtype: 'button',
					text: 'Home',
                    iconCls: 'home',
                    iconMask: true,
					ui: 'action',
					id: 'home-btn',
					align:'right'
                }, {
					xtype: 'button',
					text: 'Help',
                    iconCls: 'bookmarks',
                    iconMask: true,
					ui: 'action',
					id: 'basic-btn',
					align:'right'
				}, {
					xtype: 'button',
					text: 'Feedback',
                    iconCls: 'compose',
                    iconMask: true,
					ui: 'action',
					id: 'fed-btn',
					align:'right'
				}, {
					xtype: 'button',
					text: 'About',
                    iconCls: 'info',
                    iconMask: true,
					ui: 'action',
					id: 'about-btn',
					align:'right'
				}
            ]			
        },
        
        items: [{
                xtype: 'dashboards',
                store: 'Dashboards',
            }
        ],
    },
	
	pop: function() {
        this.callParent(arguments);
		cfa.app.helpUrl = "root";
   },
   
   beforePop: function(number) {
   	this.fireEvent('beforepopcommand', this);   
   },
   
   backToDashboard: function() {
   	this.fireEvent("todashboardcommand", this);
   }
	
});
