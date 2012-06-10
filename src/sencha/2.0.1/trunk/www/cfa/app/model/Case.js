Ext.define('cfa.model.Case', {
    extend: 'Ext.data.Model',

    requires: ['cfa.proxy.FormEngine'],

    config: {
        fields: [
            'id',
            'form',
            { name: 'text', type: 'string' }
        ],

        proxy: {
            type: 'formengine'
        }
    }
});
