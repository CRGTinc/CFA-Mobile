Ext.define('cfa.view.case.CaseFormSelectionView', {
    extend: 'Ext.Panel',
    
    xtype: 'caseformselection',
    
    requires: ['cfa.store.CaseForms'],
    
    config: {
        layout: 'fit',
        modal: true,
        centered: true,
        hideOnMaskTap: true,
        width: 300,
        height: 400,
        items: [{
                xtype: 'list',
                id: 'caseformlist',
                itemTpl: '{name}',
                store: 'CaseForms'
            }
        ]
    }
});
