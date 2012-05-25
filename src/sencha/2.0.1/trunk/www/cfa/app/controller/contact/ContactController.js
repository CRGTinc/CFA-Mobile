Ext.define('cfa.controller.contact.ContactController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.contact.ContactView'],
	
	config: {
        routes: {
            'contact': 'showContactPage'
        },

        refs: {
            main: 'main',
			contactContainer : 'contact_view_container',
			contactDetailView :  'contact_detail'
        },
		
		control:{
			contactContainer:{
				contactDetailCommand : 'displayContactDetail'
			}
			
		}
    },
	
	displayContactDetail: function(list,record){
		
		var contactDetail = this.getContactDetailView();
		contactDetail.setRecord(record);
	},
	
	showContactPage: function(){
		console.log("Go to contacts page");
		var contactView = Ext.create('cfa.view.contact.ContactView');
		this.getMain().push(contactView);        						
	}
	
			
})