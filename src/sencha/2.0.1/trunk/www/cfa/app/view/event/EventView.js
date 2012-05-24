Ext.define("cfa.view.event.EventView", {
    extend: 'Ext.Container',
	alias: 'widget.eventcontainer',
	
	requires:['cfa.view.event.EventsList','cfa.model.Event', 'cfa.view.event.EventDetail'],	
	
	config: {
		layout: 'hbox',
	},
	
	
	
	initialize: function() {
		this.callParent(arguments);
		
		var topTitle = {
			xtype:'toolbar',
			title:"Events",
			docked:'top',
			
		};
		
		var bottombar = {
			xtype:'toolbar',
			items:[
				{xtype:'button',align:'left',iconMask:true,iconCls:'refresh'},
				{xtype:'spacer'},
				{xtype:'button',text:"Month",align:'right'},
				{xtype:'button',text:"office",align:'right'},
				
			],
			docked:'bottom',
		};
		
		var eventsList = {
			xtype: 'eventslist',
			//flex: 1,
			store: Ext.getStore("Events"),
			listeners:{
				select : {fn:this.onEventSelected, scope:this}
        	}
		};
		
		var leftPanel = {
			xtype:'panel',
			layout:'fit',
			flex:1,
			items:[
				topTitle,
				eventsList,
				bottombar
			]			
		};
		
		var eventDetail = {
			xtype: 'eventdetail',
			store: Ext.getStore("Events"),
			flex: 2
		}
		
		this.add([leftPanel,eventDetail])		
	},
		
	onEventSelected: function(list,record,opt){
		console.log(record);
		this.fireEvent('displayEventInfo',this,record);
	}   
	
});
