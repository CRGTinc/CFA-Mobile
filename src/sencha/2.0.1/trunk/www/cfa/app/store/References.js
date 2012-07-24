Ext.define("cfa.store.References",{
	extend : "cfa.store.Base",
	storeId: 'References',
	
	config : {
		model : "cfa.model.Reference",		
		proxy : {
			type: "ajax",
			url : "data/References.csv",	
			reader : {
				type:"csv"
			}
		},
		sorters: 'title',
		grouper: {			
			groupFn: function(record) {
				return record.get('title')[0];
			}
		}
	}	
})