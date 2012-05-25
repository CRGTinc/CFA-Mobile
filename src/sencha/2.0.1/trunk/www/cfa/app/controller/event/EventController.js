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
		store.setSorters(['date']);
		var grouper = {
			groupFn: function(record) {
				var date = record.get('date');
				var monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
				return monthNames[date.getMonth()];
			}	
		};
		store.setGrouper(grouper);		
		Ext.getStore("Events").load();		
	},
	
	groupByOffice: function(){
		console.log("Location group");
		var store  = Ext.getStore("Events");
		store.setSorters(['location']);
		var grouper = {
			groupFn: function(record) {
				 var location = record.get('location').split(" ");
				 return location[3];
			}	
		};
		store.setGrouper(grouper);		
		Ext.getStore("Events").load();
	}
			
})