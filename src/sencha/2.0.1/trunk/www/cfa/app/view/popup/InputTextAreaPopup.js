Ext.define('cfa.view.popup.InputTextAreaPopup', {
	extend : 'Ext.Panel',

	config : {
		layout : 'fit',
		scrollable : {
			direction : 'vertical',
			directionLock : true
		},
		modal : true,
		top: '60%',
		left: '10%',
		rigth: '10%',
		height : '40%',
		width : '80%',
		hideOnMaskTap : true,
		items : [{
			xtype : 'toolbar',
			docked : 'top',
			title : 'Notes'
		}, {
			xtype : 'textareafield',
			maxRows : 20,
			listeners : {
				keyup : {
					fn : Formpod.FormEngine.Utils.updateText,
					scope : Formpod.FormEngine.Utils
				}
			},
			itemId : 'inputfield'
		}],
		
	},
})
