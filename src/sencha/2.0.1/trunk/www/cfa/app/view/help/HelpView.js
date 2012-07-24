Ext.define('cfa.view.help.HelpView', {
    extend: 'Ext.Panel',
	
    config: {
        modal: true,
        centered: true,
        hideOnMaskTap: true,
        height: 200,
        width: 600,
        title: 'Help',
        layout: 'fit',
		items:[{
                centered: true,
                html: [
                    '<p align="center">Coming Soon</p>'
                ].join('')
            }
        ]
    }
});
