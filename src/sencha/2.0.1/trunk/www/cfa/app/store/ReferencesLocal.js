Ext.define("cfa.store.ReferencesLocal",{
	extend: "cfa.store.References",
	storeId: 'ReferencesLocal',
	
	config:{
		model: "cfa.model.Reference",		
		proxy:{
			type: "localstorage",
			id: "reference"
		}
	}	
})