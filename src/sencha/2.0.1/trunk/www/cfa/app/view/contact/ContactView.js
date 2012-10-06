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
					handler: this.reloadContactClick, 
					scope: this
				},				
			],
		};
		
		
		var contactSearchField = {
			xtype: 'searchfield',
			id: 'searchcontacinput',
			clearIcon: false
		};
		
		var searchOption = {
		   xtype: 'selectfield',
		   label: 'By:',
		   id: 'contact-option',
		   style: 'width: 120px; font-size: 0.9em',
           options: [
              {text: 'Name',  value: 'name'},
              {text: 'SAC', value: 'sac'},
              {text: 'RAC',  value: 'rac'}
           ]
		}
		
		var searchBar = {
            xtype: 'toolbar',
            docked: 'top',
            id: "search-bar",
            items:[
                contactSearchField,
                searchOption
            ]
        }
		
		var contactsList = {
			xtype: 'contact_list',
			itemId: 'contactlist',
			store: this.getContactStore().load(),
			listeners: {
				select : {fn:this.onItemSelected, scope:this}
        	}
		};
		
		var bottomBar = {
			xtype: 'toolbar',
			docked: 'bottom',
			layout: {
			    align: 'center',
			    pack: 'right'
			},
			items: [
    			{
                        xtype: 'button',
                        text: 'Name',
                        handler: this.onNameGroupClick,
                        scope: this,
                        
                },{
                        xtype: 'spacer',
                        
                },{
                        xtype: 'button',
                        text: 'SAC',
                        handler: this.onSacGroupClick,
                        scope: this,
                        
                }, {
					xtype: 'button',
					text: 'RAC',
					handler: this.onRacGroupClick,
					scope: this
				},
			]
		};
		
		var leftPanel = {
			xtype: 'panel',
			itemId: 'contactleftpanel',
			layout: 'fit',
			flex: 1,
			items: [
				topTitle,
				searchBar,
				contactsList,
				bottomBar
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
	},
	
	onNameGroupClick: function(){
		this.fireEvent('nameGroupClick', this);
	},
	
	onSacGroupClick: function(){
		this.fireEvent('sacGroupClick', this);
	},
	
	onRacGroupClick: function(){
		this.fireEvent('racGroupClick', this);
	}
	
});
