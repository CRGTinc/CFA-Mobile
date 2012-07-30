Ext.define('cfa.view.setting.ImportDataView', {
	extend : 'Ext.Panel',

	config : {
		modal : true,
		layout : 'fit',
		hideOnMaskTap : true,
		hidden : true,
		centered: true,
		width : '50%',
		height :' 60%',
		scrollable : true,
		fullScreen: true,
		items : [{
			xtype : 'navigationview',
			itemId: 'container',
		}, {
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