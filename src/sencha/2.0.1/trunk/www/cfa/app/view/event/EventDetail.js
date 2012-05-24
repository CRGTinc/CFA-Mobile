Ext.define('cfa.view.event.EventDetail',{
	extend: 'Ext.form.Panel',
	alias: 'widget.eventdetail',
	requires:['Ext.form.FieldSet'],
	

	
	initialize: function(){
		console.log("init detail");
		console.log(this.getRecord());

		var eventTitle = {
			xtype: 'textfield',
			name: 'title',
			label: 'Title',
		};
		
		var eventDate = {
			xtype: 'textfield',
			name: 'date',
			label: 'Date',
		}
		
		var eventTime = {
			xtype: 'textfield',
			name: 'time',
			label: 'Time',
		}
		
		var eventLocation = {
			xtype: 'textfield',
			name: 'location',
			label: 'Location',
		}
		
		var eventDescription = {
			xtype: 'textfield',
			name: 'description',
			label: 'Description',
		}
		
		this.add(
			{ 
				xtype: "fieldset",
	          	items: [eventTitle, eventDate, eventTime, eventLocation,eventDescription],
				
			});
			
		
		
	}
	

})