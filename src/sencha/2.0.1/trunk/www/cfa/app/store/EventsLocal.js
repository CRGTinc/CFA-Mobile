Ext.define("cfa.store.EventsLocal",{
	extend: "Ext.data.Store",
	config:{
		model: "cfa.model.Event",		
		proxy:{
			type: "localstorage",
			id: "events"
		},
	}	
})
