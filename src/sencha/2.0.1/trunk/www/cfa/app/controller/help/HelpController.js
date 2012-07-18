Ext.define('cfa.controller.help.HelpController',{
	extend: 'Ext.app.Controller',
    
	requires: ['cfa.view.help.HelpView', 'cfa.view.help.HTMLPanel'],
	
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
		var helpView = Ext.create('cfa.view.help.HTMLPanel');
		helpView.setUrl('/data/HelpPages/HomeHelp.html');
		this.getMain().push(helpView);
		
	},
	
	showHelpById: function(path){
		var helpView = Ext.create('cfa.view.help.HTMLPanel');
		helpView.setUrl('/data/HelpPages/' + path + '.html');
		this.getMain().push(helpView);
	}
			
})