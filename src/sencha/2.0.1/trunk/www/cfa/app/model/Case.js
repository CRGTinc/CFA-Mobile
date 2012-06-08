Ext.define('cfa.model.Case', {
	extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'text', type: 'string'},
            {name: 'aname', type: 'string'},
            {name: 'artifactType', type: 'string'}
        ]
    }
})
