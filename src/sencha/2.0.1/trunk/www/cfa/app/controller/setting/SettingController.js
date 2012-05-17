Ext.define('cfa.controller.setting.SettingController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.setting.SettingView'],
	
	config: {
        routes: {
            'setting': 'showSettingPage'
        },

        refs: {
            main: 'main'
        }
    },
	
	showSettingPage: function(){
		console.log("Go to setting page");
		var caseView = Ext.create('cfa.view.setting.SettingView');
		this.getMain().push(caseView);        						
	}		
})