Ext.define('cfa.view.popup.InputTextAreaPopup', {
	extend : 'Ext.Panel',

	config : {
		referenceView : null,
		modal : true,
		width : '60%',
		height : '80%',
		hideOnMaskTap : true,
		centered : true,
		title : 'Input you text',
		items : [{
			xtype : 'toolbar',
			docked : 'top',
			title : 'Enter you text'
		}, {
			xtype : 'textareafield',
			maxRows : 18,
			listeners: {
				keyup: {fn:Formpod.FormEngine.Utils.updateText, scope: Formpod.FormEngine.Utils}
			},
			itemId: 'inputfield'
		}]
	},
	
})
