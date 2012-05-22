Ext.define('cfa.view.event.EventDetail',{
	extend: 'Ext.Panel',
	alias: 'widget.eventdetail',
	requires:['Ext.form.FieldSet'],
	
	config:{
		scrollable: 'vertical'
		
	},
	
	initialize: function(){

		var eventTitle = {
			xtype: 'textfield',
			name: 'title',
			label: 'Title',
		};
		
		var eventDescription = {
			xtype: 'textfield',
			name: 'description',
			label: 'Description',
		}
		
		this.add(
			{ xtype: "fieldset",
	                items: [eventTitle, eventDescription]
			});
		
	}
	

})