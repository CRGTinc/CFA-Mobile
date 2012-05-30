Ext.define("cfa.view.contact.ContactView", {
    extend: 'Ext.Container',
	alias: 'widget.contact_view_container',
	
	requires:['cfa.view.contact.ContactsList','cfa.model.Contact', 'cfa.view.contact.ContactDetail','cfa.reader.Csv'],	
	
	config: {
		title:'Contacts',
		layout: 'hbox',
	},
	
	
	
	initialize: function() {
		this.callParent(arguments);
		
		var topTitle = {
			xtype:'toolbar',
			title:"Contacts",
			docked:'top',
			
		};
		
		var bottombar = {
			xtype:'toolbar',
			items:[
				{xtype:'button',align:'left',iconMask:true,iconCls:'refresh', handler: this.reloadContactClick, scope: this},				
			],
			docked:'bottom',
		};
		
		var eventsList = {
			xtype: 'contact_list',
			//flex: 1,
			store: Ext.getStore("Contacts").load(),
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
			xtype: 'contact_detail',
			flex: 2
		}
		
		this.add([leftPanel,eventDetail])		
	},
		
	onItemSelected: function(list,record,opt){
		this.fireEvent('contactDetailCommand',this,record);
	},
	
	reloadContactClick: function(){
		this.fireEvent('reloadContactCommand',this);		
	}, 
	
});
