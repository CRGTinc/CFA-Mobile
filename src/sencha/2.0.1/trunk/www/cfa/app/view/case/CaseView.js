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
                                xtype: 'formpanel',
                                baseCls: 'panel-shadow',
                                cls: ['infoPanel'],
                                id: 'casecontextpanel',
                                layout: 'fit',
                                height: 80,
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'label',
                                        id: 'casecontextlabel'
                                    }
                                ],
                            }, {
                                xtype: 'panel',
                                baseCls: 'panel-shadow',
                                cls:['infoPanel'],
                                layout: 'fit',
                                flex: 9,      
                                hidden: true,
                                id: 'casecontentpanel',
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: 'fit',
                                        id: 'caseformpanel'
                                    }
                                ]
                            }, {
                                xtype: 'toolbar',
                                id: 'casetoolbar',
                                layout:{
                                   	align:'center',
                                   	pack:'right'                                     	
                                },
                                docked: 'bottom',
                                hidden: true,
                                items: [
                                   	{
                                        xtype: 'button',
                                        action: 'savecasedata',                   
                                        text: 'Save'
                                    }, {
                                        xtype: 'button',
                                        action: 'cancelcasedata',                    
                                        text: 'Cancel'
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
