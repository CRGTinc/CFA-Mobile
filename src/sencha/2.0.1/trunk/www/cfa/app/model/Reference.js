Ext.define('cfa.model.Reference',{
	extend: 'Ext.data.Model',
	config:{
		identifier : 'uuid',
		idProperty: 'id',
		fields:[
			{name: 'title', type: 'string'},
			{name: 'description', type: 'string'},
			{name: 'url', type: 'string'},
			{name: 'downloaded', type: 'string'}
		]	
	}	
})