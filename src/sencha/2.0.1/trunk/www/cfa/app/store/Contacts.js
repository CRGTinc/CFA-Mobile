Ext.define("cfa.store.Contacts", {
			extend : "cfa.store.Base",
			storeId : 'Contacts',
			config : {
				model : "cfa.model.Contact",
				proxy : {
					type : "ajax",
					url : "/data/Contacts.csv",
					reader : {
						type : "csv"
					},
					enablePagingParams : false,
					noCache : false
				},
				sorters : 'lastname',
				grouper : {
					groupFn : function(record) {
						return record.get('lastname')[0];
					}
				}				
			}			
		})