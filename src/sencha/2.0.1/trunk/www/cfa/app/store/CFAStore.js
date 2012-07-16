Ext.define('cfa.store.CFAStore', {
    override: 'Ext.data.TreeStore',

    sync: function(config) {
    	config = config || {};

        var defaults = {
            callback: Ext.emptyFn
        }
        
        config = Ext.apply(defaults, config);
        
        var me = this,
            operations = {},
            toCreate = me.getNewRecords(),
            toUpdate = me.getUpdatedRecords(),
            toDestroy = me.getRemovedRecords(),
            needsSync = false;

        if (toCreate.length > 0) {
            operations.create = toCreate;
            needsSync = true;
        }

        if (toUpdate.length > 0) {
            operations.update = toUpdate;
            needsSync = true;
        }

        if (toDestroy.length > 0) {
            operations.destroy = toDestroy;
            needsSync = true;
        }
        
        if (needsSync && me.fireEvent('beforesync', this, operations) !== false) {
        	var listeners = me.getBatchListeners(),
        		defaultCompleteFn = listeners.complete,
        		batch;
	        listeners.complete = function() {
        		Ext.callback(defaultCompleteFn, listeners.scope, [batch]);
        		Ext.callback(config.callback, config.scope, [this, operations]);
    	    };
        		
            batch = me.getProxy().batch({
                operations: operations,
                listeners: listeners
            });
        }

        return {
            added: toCreate,
            updated: toUpdate,
            removed: toDestroy
        };
    },
    
    onBatchComplete: function(batch) {
    	
    }
});