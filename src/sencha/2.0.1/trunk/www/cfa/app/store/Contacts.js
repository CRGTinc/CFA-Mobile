Ext.define("cfa.store.Contacts",{
	extend : "Ext.data.Store",
	
	config : {
		model : "cfa.model.Contact",		
		proxy : {
			type: "ajax",
			url : "/data/Contacts.json",						
		},
		sorters: 'lastname',
		grouper: {			
			groupFn: function(record) {
				return record.get('lastname')[0];
			}
		},
	}	
})