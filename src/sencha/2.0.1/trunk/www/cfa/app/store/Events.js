Ext.define("cfa.store.Events",{
	extend : "Ext.data.Store",
	
	config : {
		model : "cfa.model.Event",		
		proxy : {
			type: "ajax",
			url : "/data/Events.json",						
		},
		sorters: 'date',
		grouper: {			
			groupFn: function(record) {
				var date = record.get('date');
				var monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
				return monthNames[date.getMonth()];
			}
		},
	}	
})