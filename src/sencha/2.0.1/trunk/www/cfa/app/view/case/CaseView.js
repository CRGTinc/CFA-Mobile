Ext.define("cfa.view.case.CaseView", {
    extend: 'Ext.Container',
	xtype: 'case',
	
    config: {
		layout: 'hbox',        
		items:[{
                xtype: 'panel',
				layout: 'fit',
				flex: 1,
                items: [{
                        xtype: 'nestedlist',
                        title: 'Cases',
                        id: 'caseslist',                        
                        store: 'Cases'
                    }
                ]
            }, {
                xtype: 'panel',
				flex:2,
				layout: 'fit',
                items: [
					{
						xtype:'panel',
						layout: 'vbox',
						items:[
							{
								xtype: 'panel',
								id: 'casecontextpanel',
								docked: 'top',
								layout: 'fit',
								flex: 1,
								minHeight: 100,
								html: '<center>Context Information</center>'
							}, {
								xtype: 'panel',
								layout: 'fit',
								flex: 2,
								minHeight: 200,
								id: 'casecontentpanel',
								html: '<center>Content</center>'
							}
						
						]	
					}
                ]
            }
        ]
    }
});
