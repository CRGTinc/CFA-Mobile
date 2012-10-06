Ext.define('cfa.controller.contact.ContactController', {
	extend : 'Ext.app.Controller',
	requires : ['cfa.view.contact.ContactView'],

	config : {
		routes : {
			'contacts' : 'showContactPage'
		},

		refs : {
			main : 'main',
			contactContainer : 'contact_view_container',
			contactDetailView : 'contact_detail',
			searchInputField : 'searchfield[id = "searchcontacinput"]',
			emailField : 'urlfield[id = email]',
			searchOptionField: 'selectfield[id="contact-option"]'
		},

		control : {
			contactContainer : {
				contactDetailCommand : 'displayContactDetail',
				reloadContactCommand : 'reloadContact',
				nameGroupClick: 'onNameGroupClick',
				sacGroupClick: 'onSacGroupClick',
				racGroupClick: 'onRacGroupClick',
			},

			searchInputField : {
				'keyup' : 'searchContactByKey',
			},

			emailField : {
				openmailcomposercommand : 'openEmailComposer'
			},
			
			searchOptionField: {
			    'change': 'changeSearchOption'
			}
		},
		
		searchOption: 'name',
		contactView : null
	},

	displayContactDetail : function(list, record) {
		var contactDetail = this.getContactDetailView();
		contactDetail.setRecord(record);
	},

	reloadContact : function(obj) {
		obj.getContactStore().load();
	},

	showContactPage : function() {
		this.setContactView(Ext.create('cfa.view.contact.ContactView'));
		this.getMain().push(this.getContactView());
	},
	
	changeSearchOption: function(optionfield, newValue, oldValue, eOpts){
	    var store = this.getContactView().getComponent('contactleftpanel').getComponent('contactlist').getStore();
	    store.clearFilter();
	    this.getSearchInputField().setValue('');
	    this.setSearchOption(newValue);
	},
    
	searchContactByKey : function(view, e, opts) {
	    var me = this;
		var store = this.getContactView().getComponent('contactleftpanel').getComponent('contactlist').getStore();
		store.clearFilter();

		if (view.getValue() && view.getValue() != '') {
			var temp = view.getValue().toLowerCase();
			store.filterBy(function(record) {
			    
			    if (me.getSearchOption() == "name") {
			        var fullname = record.getData().firstname + ' ' + record.getData().lastname;
			        if (record.getData().firstname.toLowerCase().indexOf(temp) > -1 || record.getData().lastname.toLowerCase().indexOf(temp) > -1)
                        return record;
                    else if (fullname.toLowerCase().indexOf(temp) > -1)
                        return record;
			    } else if (me.getSearchOption() == "sac"){
			        if (record.getData().SAC.toLowerCase().indexOf(temp) > -1) 
                        return record;
			    } else{
			        if (record.getData().RAC.toLowerCase().indexOf(temp) > -1) 
                        return record;
			    }
			});
		}
	},

	openEmailComposer : function() {
		var emailAddress = this.getContactDetailView().getComponent(0).getComponent('email').getValue();

		if (emailAddress)
			window.plugins.emailComposer.showEmailComposer(null, null, null, emailAddress, null, null, null);
		else
			Ext.Msg.alert("Send mail", "Please chose a contact that you want to send mail to.");
	},
	
	onNameGroupClick: function(obj){
		var store = obj.getContactStore().load();
		store.clearFilter();
		var grouper = {
			groupFn : function(record) {
				return record.get('lastname')[0];
			},
			sortProperty: 'lastname',
			direction: 'ASC'
		};
		store.setGrouper(grouper);
		Ext.getStore('Contacts').load();
	},
	
	onSacGroupClick: function(obj){
		var store = obj.getContactStore().load();
		store.clearFilter();
		var grouper = {
			groupFn: function(record){
				return record.get('SAC');
			},
			sortProperty: 'SAC',
			direction: 'ASC'
		};
		store.setGrouper(grouper);
		Ext.getStore('Contacts').load();
	},
	
	onRacGroupClick: function(obj){
		var store = obj.getContactStore().load();
		store.clearFilter();
		var grouper = {
			groupFn: function(record){
				return record.get('RAC');
			},
			sortProperty: 'RAC',
			direction: 'ASC'
		};
		store.setGrouper(grouper);
		Ext.getStore('Contacts').load();
	}
})