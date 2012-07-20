Ext.define('cfa.view.event.EventDetail', {
	extend : 'Ext.form.Panel',
	alias : 'widget.event_detail',
	requires : ['Ext.form.FieldSet'],

	config : {
		items : [{
			xtype : 'fieldset',
			items : [{
				xtype : 'textfield',
				name : 'event_name',
				label : 'Title',
				readOnly : true
			}, {
				xtype : 'datepickerfield',
				name : 'start_date',
				label : 'Start Date',
				readOnly : true
			}, {
				xtype : 'datepickerfield',
				name : 'end_date',
				label : 'End Date',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'time',
				label : 'Time',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'location',
				label : 'Location',
				readOnly : true
			}, {
				xtype : 'textareafield',
				name : 'event_description',
				label : 'Description',
				maxRows : 20,
				readOnly : true
			}]
		}]

	}
});
