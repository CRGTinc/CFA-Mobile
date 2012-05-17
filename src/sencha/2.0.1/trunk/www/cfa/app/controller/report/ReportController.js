Ext.define('cfa.controller.report.ReportController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.report.ReportView'],
	
	config: {
        routes: {
            'report': 'showReferencePage'
        },

        refs: {
            main: 'main'
        }
    },
	
	showReferencePage: function(){
		console.log("Go to report page");
		var caseView = Ext.create('cfa.view.report.ReportView');
		this.getMain().push(caseView);        						
	}		
})