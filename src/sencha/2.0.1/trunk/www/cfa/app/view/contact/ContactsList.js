Ext.define('cfa.view.contact.ContactsList',{
	extend: 'Ext.dataview.List',
	alias: 'widget.contact_list',
	
	
		
	config: {					
		loadingText: "Loading contacts...",
	    itemTpl: '</pre>	<div>{firstname} {lastname}</div><pre>',
		grouped: true		
    },

	
})