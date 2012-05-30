Ext.define("cfa.view.event.EventView", {
    extend: 'Ext.Container',
	alias: 'widget.event_view_container',
	
	requires:['cfa.view.event.EventsList','cfa.model.Event', 'cfa.view.event.EventDetail','cfa.reader.Csv'],	
	
	config: {
		title:'Events',
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
				{xtype:'button',align:'left',iconMask:true,iconCls:'refresh',handler:this.onRefreshClick, scope:this},
				{xtype:'spacer'},
				{xtype:'button',text:"Month",align:'right', handler:this.monthGroupClick, scope:this},
				{xtype:'button',text:"Office",align:'right', handler:this.officeGroupClick, scope:this},
				
			],
			docked:'bottom',
		};
		
		var eventsList = {
			xtype: 'events_list',
			//flex: 1,
			store: Ext.getStore("Events").load(),
			listeners:{
				select : {fn:this.onItemSelected, scope:this}
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
			xtype: 'event_detail',
			flex: 2
		}
		
		this.add([leftPanel,eventDetail])		
	},
		
	onItemSelected: function(list,record,opt){
		this.fireEvent('displayEventDetailCommand',this,record);
	},
	
	onRefreshClick: function(){
		this.fireEvent('reloadDataCommand',this);		
	},
	
	monthGroupClick: function(){
		this.fireEvent('groupByMonthCommand',this);		
	},
	
	officeGroupClick: function(){
		this.fireEvent('groupByOfficeCommand',this);
	}
	 
	
});
