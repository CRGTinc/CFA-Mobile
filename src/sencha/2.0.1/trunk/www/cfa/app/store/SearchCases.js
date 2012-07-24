Ext.define('cfa.store.SearchCases', {
    extend: 'Ext.data.Store',

    requires: [
        'cfa.model.Case',
        'cfa.proxy.FormEngine',
        'cfa.store.CFACustomStore'
    ],

    config :{
        model: 'cfa.model.Case',
        queryType: null,
        queryParam: null,      

        proxy : {
            type: "formengine"
        }
    },
    
    updateQueryType: function(newType, oldType) {
    	this.getProxy().setQueryType(newType);
    },
    
    updateQueryParam: function(newParam, oldParam) {
    	this.getProxy().setQueryParam(newParam);
    }
});