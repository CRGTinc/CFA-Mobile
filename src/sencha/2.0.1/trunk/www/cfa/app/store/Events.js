Ext.define('cfa.store.Events',{
	extend : 'cfa.store.Base',
	storeId: 'Events',
			
	config : {
		model : "cfa.model.Event",		
		proxy : {
			type: 'ajax',
			url : "/data/Events.csv",
			reader : {
				type:"csv"
			},	
		},
		grouper: {			
			groupFn: function(record) {
				return Ext.util.Format.date(record.get('date'), 'Y-M-d');
			},
			sortProperty: 'date',
    		direction: 'ASC'
		},
	}	
})