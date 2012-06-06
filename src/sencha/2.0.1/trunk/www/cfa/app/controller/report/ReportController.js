Ext.define('cfa.controller.report.ReportController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.report.ReportView'],
	
	config: {
        routes: {
            'search': 'showReportPage'
        },

        refs: {
            main: 'main'
        }
    },
	
	showReportPage: function(){
		var reportView = Ext.create('cfa.view.report.ReportView');
		this.getMain().push(reportView);        						
	}		
})