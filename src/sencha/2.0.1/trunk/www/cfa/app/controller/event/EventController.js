Ext.define('cfa.controller.event.EventController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.event.EventView'],
	
	config: {
        routes: {
            'event': 'showEventPage'
        },

        refs: {
            main: 'main'
        }
    },
	
	showEventPage: function(){
		console.log("Go to events page");
		var caseView = Ext.create('cfa.view.event.EventView');
		this.getMain().push(caseView);        						
	}		
})