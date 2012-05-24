Ext.define('cfa.model.Event',{
	extend: 'Ext.data.Model',
	
	config:{
		idProperty: 'id',
		fields:[
			{name: 'id', type:'int'},
			{name: 'title', type: 'string'},
			{name: 'date', type: 'date'},
			{name: 'time', type: 'string'},
			{name: 'location', type: 'string'},
			{name: 'description', type: 'string'},		
		]	
	}	
})