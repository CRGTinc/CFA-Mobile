Ext.define('cfa.model.Event',{
	extend: 'Ext.data.Model',
	
	config:{
		identifier : 'uuid',	
		fields:[
			{name: 'start_date', type: 'date'},
			{name: 'end_date', type: 'date'},
			{name: 'event_name', type: 'string'},
			{name: 'time', type: 'string'},
			{name: 'location', type: 'string'},
			{name: 'event_description', type: 'string'}		
		]	
	}	
})