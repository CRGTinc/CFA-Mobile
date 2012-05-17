Ext.define('cfa.controller.case.CaseController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.case.CaseView'],
	
	config: {
        routes: {
            'case': 'showCasePage'
        },

        refs: {
            main: 'main'
        }
    },
	
	showCasePage: function(){
		console.log("Go to cases page");
		var caseView = Ext.create('cfa.view.case.CaseView');
		this.getMain().push(caseView);        						
	}		
})