Ext.define('cfa.store.SearchTemplates', {
	extend: 'Ext.data.Store',
	
	config: {
		autoLoad: true,
		model: 'cfa.model.SearchTemplate',
		proxy: {
			type: 'ajax',
			url : 'data/SearchTemplate.json',
			limitParam: false,
			pageParam : false,
			startParam: false,
			noCache: false,			
		}
	}

})