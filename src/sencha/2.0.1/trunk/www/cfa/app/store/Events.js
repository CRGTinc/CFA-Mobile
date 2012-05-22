Ext.define("cfa.app.store.Events",
	extend : "Ext.data.Store",
	
	config : {
		model : "cfa.app.model.Event",		
		proxy : {
			type: "ajax",
			url : "/data/Events.json",						
		}		
	}	
)