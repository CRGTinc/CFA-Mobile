Ext.define('cfa.model.Import',{
	extend: 'Ext.data.Model',
	config:{
		fields:[
			{name: 'type', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'fullPath', type: 'string'}		
		]	
	}	
});