Ext.define('cfa.store.Users', {
	extend: 'Ext.data.Store',
	storeId : 'User',
	config: {
		model : "cfa.model.User",
		proxy: {
			type: 'localstorage',
			id: 'user'
		}
	}
})
