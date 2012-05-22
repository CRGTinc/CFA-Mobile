Ext.define('cfa.controller.event.EventController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.event.EventView'],
	
	config: {
        routes: {
            'event': 'showEventPage'
        },

        refs: {
            main: 'main',
			eventsContainer: 'eventcontainer',
			eventDetailViewer: 'eventdetail'
        },
		
		control: {
			
			eventsContainer:{
				displayEventInfo : 'displayEventInfo'	
			},
		}
		
    },
	
	showEventPage: function(){
		console.log("Go to events page");
		var caseView = Ext.create('cfa.view.event.EventView');
		this.getMain().push(caseView);        						
	},
	
	displayEventInfo: function(list,record){
		var eventViewer = this.getEventDetailViewer();
		eventViewer.setRecord(record);
		var eventsContainer = this.getEventsContainer();
		eventsContainer.getLayout().setItemFlex(eventViewer,2);		
	},
	
	launch: function(app){
		this.callParent(arguments);
		console.log("Load event");
		Ext.getStore("Events").load();	
	},
	
	init: function(){
		this.callParent(arguments);
		console.log("init");
	}
	
	
			
})