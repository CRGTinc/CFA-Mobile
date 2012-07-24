Ext.define("cfa.store.EventsLocal",{
	extend: "cfa.store.Events",
	storeId: 'EventsLocal',
	
	config:{
		model: "cfa.model.Event",		
		proxy:{
			type: "localstorage",
			id: "event"
		}
	}	
})
