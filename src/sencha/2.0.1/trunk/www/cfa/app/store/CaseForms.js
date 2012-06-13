Ext.define('cfa.store.CaseForms', {
    extend: 'Ext.data.Store',
    
    requires: ['cfa.model.CaseForm'],

    config: {
        autoLoad: true,
        model: 'cfa.model.CaseForm'
    }
});
