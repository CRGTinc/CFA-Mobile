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
			enablePagingParams : false,
			noCache: false
								
		},
		grouper: {			
			groupFn: function(record) {
				return Ext.util.Format.date(record.get('date'), 'Y-M-d');
			},
			sortProperty: 'date',
    		direction: 'DESC'
		},
	}	
})