Ext.define('cfa.view.reference.ReferencesList',{
	extend: 'Ext.dataview.List',
	alias: 'widget.references_list',
	
	
		
	config: {					
		loadingText: "Loading reference...",
	    itemTpl: '</pre><div> <div style="overflow:hidden;"><div style="float:left">{title}</div><div style="float:right"><font size="-1">{downloaded}</font></div></div></div> <div><font size="-1">{description}</font></div> </div><pre>',
		grouped: true			
    }

	
})