Ext.define('cfa.view.event.EventsList',{
	extend: 'Ext.dataview.List',
	alias: 'widget.eventslist',
	
	
	config: {
	        loadingText: "Loading Notes...",
	        onItemDisclosure: true,
	        itemTpl: '</pre>	<div class="list-item-title">{title}</div><pre>',
				
    }
	
})