Ext.define('cfa.controller.Dashboard', {
    extend: 'Ext.app.Controller',	
	
    config: {
        refs: {
            main: 'main',
			homebtn: '#home-btn'
        },

        before: {
            showRootDashboard: 'ensureStoreLoad',
            showDashboardById: 'ensureStoreLoad'
        },

        control: {
            dashboards: {
                itemtap: 'onDashboardItemTap'
            },
            
			homebtn: {
			   tap: 'goHome'
			},			
        },

        currentRecord: null,

        stack: []
    },

    init: function() {
        Ext.getStore('Dashboards').on('load', this.onStoreLoad, this);
    },

    ensureStoreLoad: function(action) {
        var store = Ext.getStore('Dashboards');

        if (store.data.all.length) {
            action.resume();
        } else {
            store.on('load', function() {
                action.resume();
            }, this, {
                single: true
            });
        }
    },

    onDashboardItemTap: function(view, index, target, record, e, eOpts) {
		this.redirectTo(record);
    },
     
	goHome: function(){		
		this.getMain().reset();
	}
});
