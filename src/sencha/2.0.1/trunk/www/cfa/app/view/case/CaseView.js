Ext.define("cfa.view.case.CaseView", {
    extend: 'Ext.Container',
    xtype: 'case',

    config: {
        title: 'Case Data Management',
        layout: 'hbox',
        items: [{
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
                        xtype: 'list',
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
                                layout: 'fit',
                                flex: 1,
                                minHeight: 100,
                                html: '<center>Context Information</center>'
                            }, {
                                xtype: 'panel',
                                layout: 'card',
                                flex: 2,
                                minHeight: 200,
                                id: 'casecontentpanel',
                                items: [{
                                        xtype: 'panel',
                                        layout: 'fit',
                                        id: 'caseformpanel'
                                    }, {
                                        xtype: 'toolbar',
                                        docked: 'bottom',
                                        items: [{
                                                xtype: 'button',
                                                action: 'savecasedata',
                                                align: 'right',
                                                text: 'Save'
                                            }, {
                                                xtype: 'button',
                                                action: 'cancelcasedata',
                                                align: 'right',
                                                text: 'Cancel'
                                            }
                                        ]
                                    }
                                ]
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
