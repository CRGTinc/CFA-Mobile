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
		helpView.setUrl('data/HelpPages/HomeHelp.html');
		Ext.Viewport.add(helpView);
		helpView.show();
	},
	
	showHelpById: function(path){
		var helpView = Ext.create('cfa.view.help.HTMLPanel');
		helpView.setUrl('data/HelpPages/' + path + '.html');
		Ext.Viewport.add(helpView);
		helpView.show();
	}
			
})