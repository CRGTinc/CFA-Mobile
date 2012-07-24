Ext.define('cfa.controller.event.EventController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.event.EventView'],
	
	config: {
        routes: {
            'events': 'showEventPage'
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
			}
		}		
    },
	
	showEventPage: function(){
		var caseView = Ext.create('cfa.view.event.EventView');
		this.getMain().push(caseView);        						
	},
	
	displayEventDetail: function(list,record){
		var eventViewer = this.getEventDetailViewer();
		eventViewer.setRecord(record);		
	},
	
	reloadData: function(obj){
		obj.getEventStore().load();				
	},
	
	groupByMonth: function(obj){
		var store  = obj.getEventStore().load();
		var grouper = {
			groupFn: function(record) {
				return Ext.util.Format.date(record.get('start_date'), 'm/d/Y');
			},
			sortProperty: 'date',
    		direction: 'ASC'
		};
		store.setGrouper(grouper);		
		Ext.getStore("Events").load();		
	},
	
	groupByOffice: function(obj) {
		var store  = obj.getEventStore().load();
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