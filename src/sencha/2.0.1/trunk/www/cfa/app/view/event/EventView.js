Ext.define("cfa.view.event.EventView", {
    extend: 'Ext.Container',
	alias: 'widget.eventcontainer',
	
	requires:['cfa.view.event.EventsList','cfa.model.Event', 'cfa.view.event.EventDetail'],	
	
	config: {
		layout: 'hbox',
	},
	
	initialize: function() {
		this.callParent(arguments);
			
		var eventsList = {
			xtype: 'eventslist',
			flex: 1,
			store: Ext.getStore("Events"),
			listeners:{
				itemtap : {fn:this.onEventSelected, scope:this}
        	}	
		};
		
		var eventDetail = {
			xtype: 'eventdetail',
			store: Ext.getStore("Events"),
			flex: 2
		}
		
		this.add([eventsList,eventDetail])		
	},
		
	onEventSelected: function(list, index ,target,record, evt, opt){
		this.fireEvent('displayEventInfo',this,record);
	}   
	
});
