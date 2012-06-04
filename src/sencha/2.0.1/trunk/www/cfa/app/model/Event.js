Ext.define('cfa.model.Event',{
	extend: 'Ext.data.Model',
	
	config:{
		identifier : 'uuid',	
		fields:[
			{name: 'event_name', type: 'string'},
			{name: 'date', type: 'date',},
			{name: 'time', type: 'string'},
			{name: 'location', type: 'string'},
			{name: 'event_description', type: 'string'},		
		]	
	}	
})