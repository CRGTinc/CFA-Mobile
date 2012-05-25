Ext.define('cfa.view.event.EventsList',{
	extend: 'Ext.dataview.List',
	alias: 'widget.events_list',
	
	
		
	config: {					
		loadingText: "Loading events...",
	    itemTpl: '</pre>	<div class="list-item-title">{title}</div><pre>',
		grouped: true,		
    },

	
})