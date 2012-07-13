Ext.define('cfa.model.SearchTemplate',{
	extend: 'Ext.data.Model',
	
	config:{
		indentifier: 'uuid',
		fields: [
			{name: 'text', type: 'string'},
			{name: 'description', type: 'string'},
			{name: 'queryType', type: 'string'},
			{name: 'queryParam', type: 'string'}
		]
	}
})
