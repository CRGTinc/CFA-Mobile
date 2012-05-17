Ext.define('cfa.view.contact.HTMLPanel', {
    extend: 'Ext.Panel',

    // We are using Ext.Ajax, so we should require it
    requires: ['Ext.Ajax'],

    config: {
        listeners: {
            activate: 'onActivate'
        },

        // Create a new configuration called `url` so we can specify the URL
        url: null
    },

    onActivate: function(me, container) {
	console.log('Ajax calling');
		Ext.Ajax.request({
            // we should use the getter for our new `url` config
            url: this.getUrl(),			
            method: "GET",
			disableCaching: false,
            success: function(response, request) {
                // We should use the setter for the HTML config for this
                me.setHtml(response.responseText);				
            },
            failure: function(response, request) {				
				//iOS in phonegap returns response.status=0 on success
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