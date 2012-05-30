Ext.define('cfa.view.about.AboutView', {
    extend: 'Ext.Panel',
	
    config: {
        modal: true,
        centered: true,
        hideOnMaskTap: true,
        height: 200,
        width: 600,
        title: 'About',
        layout: 'fit',
		items:[{
                centered: true,
                html: [
                    '<p align="center">CFA Mobile App</p>',
                    '<p align="center">Version ' + '0.1.0' + '</p>'
                    
                ].join('')
            }
        ]
    }
});
