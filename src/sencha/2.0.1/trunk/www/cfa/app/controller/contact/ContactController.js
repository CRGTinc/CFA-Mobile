Ext.define('cfa.controller.contact.ContactController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.contact.ContactView'],
	
	config: {
        routes: {
            'contacts': 'showContactPage'
        },

        refs: {
            main: 'main',
			contactContainer : 'contact_view_container',
			contactDetailView :  'contact_detail'
        },
		
		control:{
			contactContainer:{
				contactDetailCommand : 'displayContactDetail',
				reloadContactCommand : 'reloadContact',
			}			
		}
    },
	
	displayContactDetail: function(list,record){		
		var contactDetail = this.getContactDetailView();
		contactDetail.setRecord(record);
	},
	
	reloadContact: function(obj){
		obj.getContactStore().load();			
	},
	
	showContactPage: function(){
		var contactView = Ext.create('cfa.view.contact.ContactView');
		this.getMain().push(contactView);        						
	},

})