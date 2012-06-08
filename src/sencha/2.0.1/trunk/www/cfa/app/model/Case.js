Ext.define('cfa.model.Case', {
	extend: 'Ext.data.Model',
    
    requires: [
        'cfa.proxy.FormEngine'
    ],

    config: {
        fields: [
            'id',
            'cfa',
            { name: 'text', type: 'string' }
        ],
        
        proxy: {
            type: 'formengine'
        }
    }
})
