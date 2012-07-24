Ext.define('cfa.view.help.HTMLPanel', {
    extend: 'Ext.Panel',
	alias: 'widget.htmlpanel',

    requires: ['Ext.Ajax'],

    config: {
        url: null,
        modal: true,
        centered: true,
        hideOnMaskTap: true,
        height: '60%',
        width: '60%',
        styleHtmlContent: true,
        scrollable: {
        	direction: 'vertical'
        }
    },

   updateUrl: function(newURl, oldURL) {
   	var me = this;
		Ext.Ajax.request({
            url: this.getUrl(),			
            method: "GET",
			disableCaching: false,
            success: function(response, request) {
                me.setHtml(response.responseText);	
            },
            failure: function(response, request) {				
				if(response.status == 0 && response.responseText != ''){
					me.setHtml(response.responseText);
				} else {
					console.log('Load HTML View failed');
					me.setHtml("<font color='white'> Offline Mode</font>");
				}                
            }
        });
    }
});