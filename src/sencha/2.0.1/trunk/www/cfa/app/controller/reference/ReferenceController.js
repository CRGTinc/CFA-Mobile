Ext.define('cfa.controller.reference.ReferenceController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.reference.ReferenceView'],
	
	config: {
        routes: {
            'reference': 'showReferencePage'
        },

        refs: {
            main: 'main'
        }
    },
	
	showReferencePage: function(){
		console.log("Go to references page");
		var caseView = Ext.create('cfa.view.reference.ReferenceView');
		this.getMain().push(caseView);        						
	}		
})