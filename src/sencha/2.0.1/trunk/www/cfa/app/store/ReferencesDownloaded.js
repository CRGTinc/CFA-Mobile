Ext.define('cfa.store.ReferencesDownloaded', {
	extend: 'Ext.data.Store',
	storeId : 'references_downloaded',
	
	requires: [
		'cfa.model.Reference',
        'cfa.store.CFACustomStore'
    ],
	
	config: {
		model : 'cfa.model.Reference',
		proxy: {
			type: 'localstorage',
			id: 'references_downloaded'
		}
	}
})
