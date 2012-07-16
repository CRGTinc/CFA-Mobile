Ext.define('cfa.store.Cases', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'cfa.model.Case',
        'cfa.proxy.FormEngine',
        'cfa.store.CFAStore'
    ],

    config :{
        model: 'cfa.model.Case',

        defaultRootId: 'cases',

        proxy : {
            type: "formengine"
        }
    }
});
