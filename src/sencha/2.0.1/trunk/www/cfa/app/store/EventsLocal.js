Ext.define("Ext.app.store.EventsLocal",
	extend: "Ext.data.Store",
	config:{
		model: "cfa.app.model.Event",		
		proxy:{
			type: "localstorage",
			id: "events"
		}
	}	
)
