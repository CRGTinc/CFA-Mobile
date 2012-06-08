Ext.define('cfa.store.Cases', {
    extend: 'Ext.data.TreeStore',
    
    requires: ['cfa.model.Case'],

    config :{
        model: 'cfa.model.Case',
        
        defaultRootProperty: 'items',
        
   		proxy : {
			type: "ajax",
			url : "data/Cases.json",					
		}
    }		
});
