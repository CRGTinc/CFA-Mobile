Ext.define('cfa.view.contact.ContactDetail',{
	extend: 'Ext.form.Panel',
	alias: 'widget.contact_detail',
	requires:['Ext.form.FieldSet'],

	initialize: function(){
		console.log("init detail");
		console.log(this.getRecord());

		var contactName = {
			xtype: 'textfield',
			name: 'firstname',
			label: 'Name',
			disabled: true
		};
		
		var contactEmail = {
			xtype: 'urlfield',
			name: 'email',
			label: 'Email',
			disabled: true
		}
		
		var contactOfficePhone = {
			xtype: 'textfield',
			name: 'office_phone',
			label: 'Office Phone',
			disabled: true
		}
		
		var contactMobilePhone = {
			xtype: 'textfield',
			name: 'mobile_phone',
			label: 'Mobile Phone',
			disabled: true
		}
		
		var contactDepartement = {
			xtype: 'textfield',
			name: 'departement',
			label: 'Departement',
			disabled: true
		}
		
		
		this.add([
			{ 
				xtype: "fieldset",
	          	items: [contactName, contactEmail, contactOfficePhone, contactMobilePhone, contactDepartement],
				
			}			
			
		]);
			
		
		
	}
	

})