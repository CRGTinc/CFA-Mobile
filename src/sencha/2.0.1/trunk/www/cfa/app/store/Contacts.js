Ext.define("cfa.store.Contacts", {
	extend : 'cfa.store.Base',
	storeId : 'Contacts',
	config : {
		model : "cfa.model.Contact",
		proxy : {
			type : "ajax",
			url : "data/Contacts.csv",
			reader : {
				type : "csv"
			}
		},
		sorters : 'lastname',
		grouper : {
			groupFn : function(record) {
				return record.get('lastname')[0];
			}
		}				
	}			
})