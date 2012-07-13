Ext.define('cfa.view.reference.ReferencesList',{
	extend: 'Ext.dataview.List',
	alias: 'widget.references_list',
	
	
		
	config: {					
		loadingText: "Loading reference...",
	    itemTpl: '</pre><div>{title}</div><div><font size="-1">{description}</font></div><pre>',
		grouped: true			
    },

	
})