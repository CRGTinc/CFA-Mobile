Ext.define('cfa.model.Image',{
	extend: 'Ext.data.Model',
	config:{
		identifier : 'uuid',	
		fields:[
			{name: 'formId', type: 'string'},			
			{name: 'srcImage', type: 'string'},		
			{name: 'fullPath', type: 'string'}
		]	
	}	
});