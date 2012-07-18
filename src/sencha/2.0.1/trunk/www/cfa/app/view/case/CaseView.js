Ext.define("cfa.view.case.CaseView", {
    extend: 'Ext.Container',
    xtype: 'case',

    config: {
    	id: 'caseview',
        title: 'Case Data Management',
        layout: 'hbox',
        items: [{
                xtype: 'panel',
                layout: 'fit',
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
                                    iconCls: 'refresh',
                                    iconMask: true,
                                    align:'right',
                                    action: 'refreshCaseData',
                                    ui: 'action'
                                }, {
                                    xtype: 'button',
                                    iconCls: 'add',
                                    iconMask: true,
                                    align:'right',
                                    action: 'addCaseData',
                                    ui: 'action'
                                }
                            ]
                        }
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
                                ]
                            }, {
                                xtype: 'panel',
                                baseCls: 'panel-shadow',
                                cls:['infoPanel'],
                                layout: 'fit',
                                flex: 2,
                                hidden: true,
                                id: 'casecontentpanel',
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: 'vbox',
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
                                        action: 'deletecasedata',
                                        text: 'Delete'
                                    }, {
                                        xtype: 'button',
                                        action: 'exportcasedata',
                                        text: 'Export'
                                    }, {
                                        xtype: 'button',
                                        action: 'attachcasedata',
                                        text: 'Attach'
                                    },{
                                        xtype: 'button',
                                        action: 'deleteattachmentdata',
                                        text: 'Delete Photo'
                                    }, {
                                        xtype: 'button',
                                        action: 'clearattachmentdata',
                                        text: 'Clear Photos'
                                    }, {
                                        xtype: 'spacer'
                                    }, {
                                        xtype: 'button',
                                        action: 'savecasedata',                   
                                        text: 'Save',
                                        ui: 'confirm'
                                    }, {
                                        xtype: 'button',
                                        action: 'cancelcasedata',                    
                                        text: 'Cancel',
                                        ui: 'decline'
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
        cfa.app.helpUrl = "CaseHelp";
    }
});
