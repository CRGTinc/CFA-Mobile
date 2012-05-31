Ext.define('cfa.controller.help.HelpController',{
	extend: 'Ext.app.Controller',
    
	requires: ['cfa.view.help.HelpView'],
	
	config: {
        routes: {
            'help': 'showHelpPage'
        },

        refs: {
            main: 'main'
        }
    },
	
	showHelpPage: function(){
		var helpView = Ext.create('cfa.view.help.HelpView');
		this.getMain().push(helpView);        						
	}		
})