Ext.define('cfa.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'main',

    requires: [
        'cfa.view.Dashboards'		
    ],

    config: {
		items: [{
				xtype: 'panel',
				id: 'container'		
			}],
			
        fullscreen: true,
        autoDestroy: false,

        navigationBar: {
            backButton: {
                iconCls: 'back'
            },		
			items: [{
					xtype: "button",
					text: "Home",
					ui: "action",
					id:"home-btn"
					},{
					xtype: "button",
					text: "Basics help",
					ui: "action",
					id:"basic-btn"
				},{
					xtype: "button",
					text: "Feedback",
					ui: "action",
					id:"fed-btn"
				},{
					xtype: "button",
					text: "About pages",
					ui: "action",
					id:"about-btn"
				
				}]			
        }
    },

    pop: function() {
        this.fireEvent('beforepop', this);
        this.callParent(arguments);
    }
});
