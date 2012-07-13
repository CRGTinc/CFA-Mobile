Ext.define('cfa.store.Events',{
	extend : 'cfa.store.Base',
	storeId: 'Events',
			
	config : {
		model : "cfa.model.Event",		
		proxy : {
			type: 'ajax',
			url : "data/Events.csv",
			reader : {
				type:"csv"
			}
		},
		grouper: {			
			groupFn: function(record) {
				return Ext.util.Format.date(record.get('start_date'), 'm/d/Y');
			},
			sortProperty: 'date',
    		direction: 'ASC'
		}
	}	
})