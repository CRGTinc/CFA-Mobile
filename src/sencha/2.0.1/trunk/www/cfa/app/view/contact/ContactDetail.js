Ext.define('cfa.view.contact.ContactDetail', {
	extend : 'Ext.form.Panel',
	alias : 'widget.contact_detail',
	requires : ['Ext.form.FieldSet'],

	config : {
		itemid : 'contactdetailpanel',
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
				id : 'email',
				name : 'email',
				label : 'Email',
				readOnly: true,
				listeners : {
					element : 'element',
					touchstart : function() {
						this.fireEvent('openmailcomposercommand', this);
					}
				}
			}, {
				xtype : 'textfield',
				name : 'office_phone',
				label : 'Office Phone',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'cell',
				label : 'Cell',
				readOnly : true
			}]
		}, {
			xtype : 'fieldset',
			items : [{
				xtype : 'textfield',
				name : 'SAC',
				label : 'SAC',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'RAC',
				label : 'RAC',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'street1',
				label : 'Street 1',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'street2',
				label : 'Street 2',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'city',
				label : 'City',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'state',
				label : 'State',
				readOnly : true
			}, {
				xtype : 'textfield',
				name : 'zip',
				label : 'Zip',
				readOnly : true
			}]
		}]
	}
})