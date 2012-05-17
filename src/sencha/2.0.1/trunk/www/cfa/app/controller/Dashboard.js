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
            main: {
                beforepop: 'onMainBeforePop'
            },
            dashboards: {
                itemtap: 'onDashboardTap'
            },        
			homebtn: {
			   tap: 'goHome'
			},			
        },

        routes: {
            '': 'showRootDashboard'          			
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

    onMainBeforePop: function() {
        /*var history = this.getApplication().getHistory(),
            record = this.getCurrentRecord().parentNode,
            urlId = (record && record.get('urlId')) ? record.get('urlId') : '',            
            stack = this.getStack();

        this.setCurrentRecord(record);

        history.add(new Ext.app.Action({
            url: urlId
        }), true);

        stack.pop();
        this.setStack(stack);        */
    },

    showRootDashboard: function() {
        var stack = this.getStack();

        if (stack.length) {
            this.getMain().pop();
            return;
        }

        this.setStack([]);

        var store = Ext.getStore('Dashboards'),
            record = store.getRoot();

        this.addPreviousViews(record);
        this.showDashboard(record);
    },

    onDashboardTap: function(view, index, target, record, e) {				
		this.redirectTo(record);
    },
   

    addPreviousViews: function(record) {
        var parents = [],
            main = this.getMain(),
            layout = main.getLayout(),
            animation = layout.getAnimation(),
            stack = this.getStack(),
            ln, i, urlId;

        if (main.getInnerItems().length) {
            return;
        }

        while ((record = record.parentNode)) {
            parents.unshift(record);
        }

        layout.setAnimation(false);

        ln = parents.length;
        for (i = 0; i < ln; i++) {
            urlId = parents[i].get('urlId');
            if (urlId) {
                stack.push(urlId);
            }

            this.showDashboard(parents[i]);
        }

        this.setStack(stack);

        setTimeout(function() {
            layout.setAnimation(animation);
        }, 50);
    },

    showDashboard: function(record) {
        var isRoot = (record.get('id') == "root"),
            view;

        if (isRoot) {
            record.set('label', 'Dashboards');
        }

        this.setCurrentRecord(record);

        view = this.getDashboardsView({
            title: record.get('label'),
            cls: (isRoot) ? 'root' : null,
            data: record.childNodes
        });

        this.getMain().setActiveItem(view);
    },
  
    /**
     * This creates and returns a new Dashboards view, for when it is needed.
     * Ideally this should be improved at some point to only instansiate a max of 2 views
     * and then reuse the same views over again.
     * @param {Object} config The configuration for the view.
     * @return {cfa.view.Dashboards} view
     */
    getDashboardsView: function(config) {
        return Ext.create('cfa.view.Dashboards', config);
    }, 
	goHome: function(){		
		this.showRootDashboard();
	}
});
