Ext.define('cfa.controller.about.AboutController',{
	extend: 'Ext.app.Controller',
    
	requires: ['cfa.view.about.AboutView'],
	
	config: {
        routes: {
            'about': 'showAboutPage'
        }
    },
	
	showAboutPage: function() {
        if (!this.aboutView) {
            this.aboutView = Ext.create('cfa.view.about.AboutView');
            Ext.Viewport.add(this.aboutView);
        }
        
        this.aboutView.show();
	}
})
