Ext.define('cfa.model.User', {
	extend: 'Ext.data.Model',	
	config:{
		identifier: 'uuid',
		fields: [
			{name: 'firstname', type: 'string'},
			{name: 'lastname', type: 'string'}
		]
	}
})
