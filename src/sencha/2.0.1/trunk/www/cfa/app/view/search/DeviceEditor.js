Ext.define("cfa.view.search.DeviceEditor", {
	extend : 'Ext.Panel',

	config : {
		id: 'deviceeditor',
		layout: 'fit',
		items : [{
			xtype: 'panel',
			itemId : 'editorpanel',
			layout : 'fit'
		}, {
			xtype : 'toolbar',
			docked : 'bottom',
			layout : {
				align : 'center',
				pack : 'right'
			},
			items : [{
				xtype : 'button',
				action : 'savedevicedata',
				text : 'Save',
				ui : 'confirm'
			}, {
				xtype : 'button',
				action : 'canceldevicedata',
				text : 'Cancel',
				ui : 'decline'
			}]
		}]
	}
});
