Ext.define('cfa.view.setting.ImportDataView', {
	extend : 'Ext.Panel',

	config : {
		modal : true,
		layout : 'fit',
		hideOnMaskTap : true,
		hidden : true,
		centered: true,
		width : '40%',
		height :' 60%',
		fullScreen: true,
		items : [
		{
			xtype : 'navigationview',
			itemId: 'container',
		}, {
			xtype: 'textareafield',
			hidden: true,
			id: 'dragfilefield',
			docked: 'bottom',
			placeHolder: 'Drag import file in here'
		},{
			xtype: 'toolbar',
			itemId: 'actionbar',
			hidden: true,
			docked: 'bottom',
			items: [
				{
					xtype: 'button',
					text: 'Delete',
					action: 'deletefile'
				}
			]
			
		}]

	}

})