Ext.define('cfa.model.Event',{
	extend: 'Ext.data.Model',
	
	config:{
		idProperty: 'id',
		fields:[
			{name: 'id', type:'int'},
			{name: 'title', type: 'string'},
			{name: 'datetime', type: 'date'},
			{name: 'time', type: 'string'},
			{name: 'description', type: 'string'},		
		]	
	}	
})