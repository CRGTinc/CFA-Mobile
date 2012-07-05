Ext.define('cfa.view.contact.ContactDetail', {
	extend : 'Ext.form.Panel',
	alias : 'widget.contact_detail',
	requires : ['Ext.form.FieldSet'],

	config : {
		itemid: 'contactdetailpanel',
		items : [{
			xtype : "fieldset",
			items : [{
				xtype : 'textfield',
				name : 'firstname',
				label : 'First Name',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'lastname',
				label : 'Last Name',
				readOnly : true
			}, {
				xtype : 'urlfield',
				itemId: 'email',
				name : 'email',
				label : 'Email',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'office_phone',
				label : 'Office Phone',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'mobile_phone',
				label : 'Mobile Phone',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'department',
				label : 'Department',
				readOnly : true
			}]
		}, {
			xtype : 'toolbar',
			docked : 'bottom',
			layout: {
				pack: 'right',
				align: 'center'
			},
			items : [{
				xtype : 'button',
				text : 'Email',
				action : 'mailtoaction'
			}]
		}]

	}

})