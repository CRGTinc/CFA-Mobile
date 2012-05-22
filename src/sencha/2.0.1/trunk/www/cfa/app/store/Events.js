Ext.define("cfa.store.Events",{
	extend : "Ext.data.Store",
	
	config : {
		model : "cfa.model.Event",		
		proxy : {
			type: "ajax",
			url : "/data/Events.json",						
		}		
	}	
})