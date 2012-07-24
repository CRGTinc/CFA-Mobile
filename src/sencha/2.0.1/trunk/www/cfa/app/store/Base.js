Ext.define('cfa.store.Base',{
	extend: 'Ext.data.Store',
	config:{
		model: null,
		offlineStore : null
	},
	
	updateOfflineStore : function(newOfflineStore, oldOfflineStore) {
		if (newOfflineStore != null) {		
			this.addListener('load', function(me, records, successful, operation, eOpts) {
				if (successful) {				
					var offlineStore = me.getOfflineStore();
					offlineStore.getProxy().clear();
					for (var i = 0; i < records.length; i++) {
						offlineStore.add(records[i]);										
					};
					offlineStore.sync();										
				}
			});
		} 
	}
});