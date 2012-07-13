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
			itemId: 'importlistcontainer',
			items : [{
				xtype : 'list',
				mode: 'MULTI',
				title: 'Import List',
				id: 'importlist',
				itemTpl : "{name}",
				onItemDisclosure: true,
				grouped : true
			}]
		}]

	}

})