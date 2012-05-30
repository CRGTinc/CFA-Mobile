Ext.define("cfa.store.Events",{
	extend : "Ext.data.Store",
	
	config : {
		model : "cfa.model.Event",		
		proxy : {
			type: "ajax",
			url : "/data/Events.csv",
			reader : {
				type:"csv"
			},						
		},
		sorters: 'date',
		grouper: {			
			groupFn: function(record) {
				return record.get('date').toDateString();
			},
			sortProperty: 'date',
    		direction: 'ASC'
		},
	}	
})