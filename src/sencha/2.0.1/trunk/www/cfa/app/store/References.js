Ext.define("cfa.store.References",{
	extend : "Ext.data.Store",
	
	config : {
		model : "cfa.model.Reference",		
		proxy : {
			type: "ajax",
			url : "/data/References.csv",	
			reader : {
				type:"csv"
			},
			enablePagingParams : false,
			noCache: false
		},
		sorters: 'title',
		grouper: {			
			groupFn: function(record) {
				return record.get('title')[0];
			}
		},
	}	
})