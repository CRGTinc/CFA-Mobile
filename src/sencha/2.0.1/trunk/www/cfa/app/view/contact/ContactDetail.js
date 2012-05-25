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
			xtype: 'textfield',
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
		
		var contactCell = {
			xtype: 'textfield',
			name: 'cell',
			label: 'Cell',
			disabled: true
		}
		
		var conctactSAC = {
			xtype: 'textfield',
			name: 'sac',
			label: 'SAC',
			disabled: true
		}
		
		var conctactRAC = {
			xtype: 'textfield',
			name: 'rac',
			label: 'RAC',
			disabled: true
		}
		
		var conctactAddress = {
			xtype: 'textfield',
			name: 'address',
			label: 'Address',
			disabled: true
		}
		
		this.add([
			{ 
				xtype: "fieldset",
	          	items: [contactName, contactEmail, contactOfficePhone, contactCell],
				
			},{
				xtype: "fieldset",
				items: [conctactSAC,conctactRAC,conctactAddress],
			}
			
			
		]);
			
		
		
	}
	

})