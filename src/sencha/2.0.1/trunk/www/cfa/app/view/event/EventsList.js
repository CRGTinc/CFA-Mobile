Ext.define('cfa.view.event.EventsList',{
	extend: 'Ext.dataview.List',
	alias: 'widget.eventslist',
	
	
		
	config: {					
		loadingText: "Loading Notes...",
	    itemTpl: '</pre>	<div class="list-item-title">{title}</div><pre>'			
    },

	
})