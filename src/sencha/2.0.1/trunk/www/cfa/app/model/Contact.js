Ext.define('cfa.model.Contact',{
	extend: 'Ext.data.Model',
	config:{
		identifier : 'uuid',	
		fields:[
			{name: 'firstname', type: 'string'},
			{name: 'lastname', type: 'string'},
			{name: 'email', type: 'email'},
			{name: 'office_phone', type: 'string'},
			{name: 'mobile_phone', type: 'string'},
			{name: 'departement', type: 'string'}					
		]	
	}	
});