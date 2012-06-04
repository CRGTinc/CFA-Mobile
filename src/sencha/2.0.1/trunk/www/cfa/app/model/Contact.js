Ext.define('cfa.model.Contact',{
	extend: 'Ext.data.Model',
	config:{
		identifier : 'uuid',	
		fields:[
			{name: 'firstname', type: 'string'},
			{name: 'lastname', type: 'string'},
			{name: 'email', type: 'email'},
			{name: 'office_phone', type: 'int'},
			{name: 'mobile_phone', type: 'int'},
			{name: 'departement', type: 'string'}					
		]	
	}	
});