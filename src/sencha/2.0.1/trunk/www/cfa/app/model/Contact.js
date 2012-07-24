Ext.define('cfa.model.Contact',{
	extend: 'Ext.data.Model',
	config:{
		identifier : 'uuid',	
		fields:[
			{name: 'firstname', type: 'string'},
			{name: 'lastname', type: 'string'},
			{name: 'email', type: 'email'},
			{name: 'office_phone', type: 'string'},
			{name: 'cell', type: 'string'},
			
			{name: 'SAC', type: 'string'},
			{name: 'RAC', type: 'string'},
			{name: 'street1', type: 'string'},
			{name: 'sreet2', type: 'string'},
			{name: 'city', type: 'string'},
			{name: 'state', type: 'string'},
			{name: 'zip', type: 'int'}
		]	
	}	
});