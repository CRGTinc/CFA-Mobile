Ext.define("cfa.view.case.CaseView", {
    extend: 'Ext.Container',
	xtype: 'case',
	
    config: {
        fullscreen: true,
        
		items:[{
                xtype: 'container',
                width: 300,
                docked: 'left',
                items: [{
                        xtype: 'nestedlist',
                        title: 'Cases',
                        id: 'caseslist',
                        height: 400,
                        store: 'Cases'
                    }
                ]
            }, {
                xtype: 'container',
                items: [{
                        xtype: 'container',
                        id: 'casecontextpanel',
                        docked: 'top',
                        layout: 'fit',
                        height: 100,
                        html: '<center>Context Information</center>'
                    }, {
                        xtype: 'container',
                        id: 'casecontentpanel',
                        html: '<center>Content</center>'
                    }
                ]
            }
        ]
    }
});
