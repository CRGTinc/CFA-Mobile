Ext.define('cfa.store.Cases', {
    extend: 'Ext.data.TreeStore',
    
    requires: [
        'cfa.model.Case',
        'cfa.proxy.FormEngine'
    ],

    config :{
        model: 'cfa.model.Case',
        
   		proxy : {
			type: 'formengine'
		}
    }		
});
