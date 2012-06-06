Ext.define('cfa.controller.help.HelpController',{
	extend: 'Ext.app.Controller',
    
	requires: ['cfa.view.help.HelpView', 'cfa.view.HTMLPanel'],
	
	config: {
        routes: {
            'help': 'showHelpPage',
			'help/:path' : 'showHelpById'
        },

        refs: {
            main: 'main'
        }
    },
	
	showHelpPage: function(){		
		var helpView = Ext.create('cfa.view.help.HelpView');
		this.getMain().push(helpView);
		
		//get the current page
		     						
	},
	
	showHelpById: function(path){
		 if (Ext.os.is.Desktop) {
            window.open("help/"+path+".html");
        } else {
            window.plugins.childBrowser.showWebPage("help/"+path+".html");
        }
	}
			
})