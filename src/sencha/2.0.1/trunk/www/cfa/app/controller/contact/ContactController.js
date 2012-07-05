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
			searchInputField : 'searchfield[id = "searchcontacinput"]'
		},

		control : {
			contactContainer : {
				contactDetailCommand : 'displayContactDetail',
				reloadContactCommand : 'reloadContact',
			},

			searchInputField : {
				'keyup' : 'searchContactByKey'
			}
		},

		contactView : null,
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

	searchContactByKey : function(view, e, opts) {
		var store = this.getContactView().getComponent('contactleftpanel').getComponent('contactlist').getStore();
		store.clearFilter();

		if (view.getValue && view.getValue != '') {
			store.filterBy(function(record) {
				if (record.getData().firstname.toLowerCase().indexOf(view.getValue().toLowerCase()) > -1)
					return record;
				else if (record.getData().lastname.toLowerCase().indexOf(view.getValue().toLowerCase()) > -1)
					return record;
			});
		}
	}
})