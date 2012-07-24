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
                itemId: 'versionpanel',
                html: [
                    '<p align="center">CFA Mobile app</p>'
                ].join('')
            }
        ]
    },
    
    initialize: function() {
        var versionPanel = this.getComponent('versionpanel'),
            content = versionPanel.getHtml();
            
        content += '<p>Version ' + cfa.app.application.buildVersion.version + '</p>';
        versionPanel.setHtml(content);
    }
});
