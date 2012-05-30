Ext.define('cfa.controller.event.EventController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.event.EventView'],
	
	config: {
        routes: {
            'event': 'showEventPage'
        },

        refs: {
            main: 'main',
			eventsContainer: 'event_view_container',
			eventDetailViewer: 'event_detail'
        },
		
		control: {			
			eventsContainer:{
				displayEventDetailCommand : 'displayEventDetail',
				reloadDataCommand : 'reloadData',
				groupByOfficeCommand : 'groupByOffice',
				groupByMonthCommand : 'groupByMonth'				
			},
		}		
    },
	
	showEventPage: function(){
		console.log("Go to events page");
		var caseView = Ext.create('cfa.view.event.EventView');
		this.getMain().push(caseView);        						
	},
	
	displayEventDetail: function(list,record){
		console.log("Display event detail");
		var eventViewer = this.getEventDetailViewer();
		eventViewer.setRecord(record);		
	},
	
	reloadData: function(){
		console.log("reset data");
		Ext.getStore("Events").load();					
	},
	
	groupByMonth: function(){
		console.log("Month group");
		var store  = Ext.getStore("Events");
		var grouper = {
			groupFn: function(record) {
				return record.get('date').toDateString();
			},
			sortProperty: 'date',
    		direction: 'ASC'
		};
		store.setGrouper(grouper);		
		Ext.getStore("Events").load();		
	},
	
	groupByOffice: function(){
		console.log("Location group");
		var store  = Ext.getStore("Events");
		var grouper = {
			groupFn: function(record) {
				return record.get('location');
			},
			sortProperty: 'location',
    		direction: 'ASC'
		};
		store.setGrouper(grouper);		
		Ext.getStore("Events").load();
	}
			
})