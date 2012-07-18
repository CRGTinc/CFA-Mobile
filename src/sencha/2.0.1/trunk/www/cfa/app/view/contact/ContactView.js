Ext.define("cfa.view.contact.ContactView", {
    extend: 'Ext.Container',
    mixins: ['Deft.mixin.Injectable' ],
    inject: [ 'contactStore' ],
	alias: 'widget.contact_view_container',	
	requires:['cfa.view.contact.ContactsList','cfa.model.Contact', 'cfa.view.contact.ContactDetail','cfa.reader.Csv'],	
	
	config: {
		title:'Contacts',
		layout: 'hbox',
		contactStore: null
	},
	
	initialize: function() {
		this.callParent(arguments);
		cfa.app.helpUrl = "ContactHelp";
		var topTitle = {
			xtype: 'toolbar',
			title: "Contacts",
			docked: 'top',
			layout : {
				pack: 'right',
				align: 'center'	
			},
			items:[
				{
					xtype: 'button',
					iconMask: true,
					iconCls: 'refresh',
					handler: this.reloadContactClick, scope: this
				},				
			],
		};
		
		var contactSearchField = {
			xtype: 'searchfield',
			id: 'searchcontacinput',
			docked: 'top'
		};
		
		var contactsList = {
			xtype: 'contact_list',
			itemId: 'contactlist',
			store: this.getContactStore().load(),
			listeners: {
				select : {fn:this.onItemSelected, scope:this}
        	}
		};
		
		var leftPanel = {
			xtype: 'panel',
			itemId: 'contactleftpanel',
			layout: 'fit',
			flex: 1,
			items: [
				topTitle,
				contactSearchField,
				contactsList
			]			
		};
		
		var contactDetail = {
			xtype: 'contact_detail',
			flex: 2
		}
		
		this.add([leftPanel, contactDetail]);
				
	},
		
	onItemSelected: function(list, record, opt){
		this.fireEvent('contactDetailCommand', this, record);
	},
	
	reloadContactClick: function(){
		this.fireEvent('reloadContactCommand', this);	
	}
	
});
