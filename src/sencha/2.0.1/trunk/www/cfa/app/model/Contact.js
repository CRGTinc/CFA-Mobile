Ext.define('cfa.model.Contact',{
	extend: 'Ext.data.Model',
	config:{
		idProperty: 'id',
		fields:[
			{name: 'id', type:'int'},
			{name: 'firstname', type: 'string'},
			{name: 'lastname', type: 'string'},
			{name: 'email', type: 'email'},
			{name: 'office_phone', type: 'int'},
			{name: 'cell', type: 'int'},
			{name: 'sac', type: 'string'},
			{name: 'rac', type: 'string'},
			{name: 'address', type: 'string'},		
		]	
	}	
		
		
		
		
	
	
	
})