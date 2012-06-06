Ext.define('cfa.view.report.ReportView', {
    extend: 'Ext.Panel',
    xtype: 'report',

    config: {
        modal: true,
        centered: true,
        hideOnMaskTap: true,
        height: 200,
        width: 600,
        title: 'Report',
        layout: 'fit',
		items:[{
                centered: true,
                html: [
                    '<p align="center">Coming Soon</p>',
                ].join('')
            }
        ]
    },
	
	initialize: function(){
		cfa.app.helpUrl = "Report";	
	}
});

