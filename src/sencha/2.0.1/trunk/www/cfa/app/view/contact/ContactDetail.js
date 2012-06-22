Ext.define('cfa.view.contact.ContactDetail',{
	extend: 'Ext.form.Panel',
	alias: 'widget.contact_detail',
	requires:['Ext.form.FieldSet'],

	initialize: function(){
		var contactName = {
			xtype: 'textfield',
			name: 'firstname',
			label: 'First Name',
			readOnly: true
		};

		var contactLastName = {
			xtype: 'textfield',
			name: 'lastname',
			label: 'Last Name',
			readOnly: true
		};
		
		var contactEmail = {
			xtype: 'urlfield',
			name: 'email',
			label: 'Email',
			readOnly: true
		}
		
		var contactOfficePhone = {
			xtype: 'textfield',
			name: 'office_phone',
			label: 'Office Phone',
			readOnly: true
		}
		
		var contactMobilePhone = {
			xtype: 'textfield',
			name: 'mobile_phone',
			label: 'Mobile Phone',
			readOnly: true
		}
		
		var contactDepartment = {
			xtype: 'textfield',
			name: 'department',
			label: 'Department',
			readOnly: true
		}
		
		this.add([
			{ 
				xtype: "fieldset",
	          	items: [contactName, contactLastName, contactEmail, contactOfficePhone, contactMobilePhone, contactDepartment]
			}			
		]);
	}
})