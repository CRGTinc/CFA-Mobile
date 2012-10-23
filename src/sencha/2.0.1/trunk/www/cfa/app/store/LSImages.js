Ext.define('cfa.store.LSImages',{
	extend: 'Ext.data.Store',
	requires: ['cfa.model.Image'],	
	storeId: 'LSImages',
		
	config:{	
		model : "cfa.model.Image",
		proxy :	{
			type : Ext.os.is.Desktop?"chromefile":"file"
		}
	}
	
});