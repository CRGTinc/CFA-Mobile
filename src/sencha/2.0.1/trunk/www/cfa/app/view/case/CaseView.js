Ext.define("cfa.view.case.CaseView", {
    extend: 'Ext.Container',
	xtype: 'case',
	
    config: {
        title: 'Case Data Management',
		layout: 'hbox',
		items:[{
                xtype: 'tabpanel',
                tabBarPosition: 'bottom',
				flex: 1,
                items: [{
                        xtype: 'nestedlist',
                        title: 'Cases',
                        iconCls: 'star',
                        id: 'caseslist',
                        store: 'Cases',
                        toolbar: {
                            items: [{
                                    xtype: 'button',
                                    iconCls: 'add',
                                    iconMask: true,
                                    align:'right',
                                    action: 'addCaseData'
                                }
                            ]
                        }
                    }, {
                        xtype: 'nestedlist',
                        title: 'Devices',
                        iconCls: 'settings'
                    }, {
                        xtype: 'panel',
                        title: 'Search',
                        iconCls: 'search'
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
    },
	
	initialize: function(){
		this.callParent(arguments);
		cfa.app.helpUrl = "Cases";	
	}
});
