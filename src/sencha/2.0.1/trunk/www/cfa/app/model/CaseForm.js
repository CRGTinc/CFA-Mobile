Ext.define('cfa.model.CaseForm', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string' },
            'definition',
            { name: 'displayProperty', type: 'string' },
            'childForms'
        ]
    }
});
