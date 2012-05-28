Ext.define('cfa.view.event.EventDetail',{
	extend: 'Ext.form.Panel',
	alias: 'widget.event_detail',
	requires:['Ext.form.FieldSet'],

	initialize: function(){
		console.log("init detail");
		console.log(this.getRecord());

		var eventTitle = {
			xtype: 'textfield',
			name: 'title',
			label: 'Title',
			disabled: true
		};
		
		var eventDate = {
			xtype: 'datepickerfield',
			name: 'date',
			label: 'Date',
			disabled: true
		}
		
		var eventTime = {
			xtype: 'textfield',
			name: 'time',
			label: 'Time',
			disabled: true
		}
		
		var eventLocation = {
			xtype: 'textfield',
			name: 'location',
			label: 'Location',
			disabled: true
		}
		
		var eventDescription = {
			xtype: 'textfield',
			name: 'description',
			label: 'Description',
			disabled: true
		}
		
		this.add(
			{ 
				xtype: "fieldset",
	          	items: [eventTitle, eventDate, eventTime, eventLocation,eventDescription],
				
			});
			
		
		
	}
	

})