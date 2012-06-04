Ext.define('cfa.view.event.EventDetail',{
	extend: 'Ext.form.Panel',
	alias: 'widget.event_detail',
	requires:['Ext.form.FieldSet'],

	initialize: function(){
		var eventTitle = {
			xtype: 'textfield',
			name: 'event_name',
			label: 'Title',
			readOnly: true
		};
		
		var eventDate = {
			xtype: 'datepickerfield',
			name: 'date',
			label: 'Date',
			readOnly: true
		}
		
		var eventTime = {
			xtype: 'textfield',
			name: 'time',
			label: 'Time',
			readOnly: true
		}
		
		var eventLocation = {
			xtype: 'textfield',
			name: 'location',
			label: 'Location',
			readOnly: true
		}
		
		var eventDescription = {
			xtype: 'textfield',
			name: 'event_description',
			label: 'Description',
			readOnly: true
		}
		
		this.add(
			{ 
				xtype: "fieldset",
	          	items: [eventTitle, eventDate, eventTime, eventLocation,eventDescription],
				
			});
			
		
		
	}
	

})