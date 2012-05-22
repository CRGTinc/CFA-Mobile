Ext.define('cfa.view.event.EventsList',{
	extend: 'Ext.dataview.List',
	alias: 'widget.eventslist',
	
	
	config:{
		loadingText: 'Loading ...',
	    itemTpl:'</pre><div><font color="white">{title}</font></div><pre>'
	}

})