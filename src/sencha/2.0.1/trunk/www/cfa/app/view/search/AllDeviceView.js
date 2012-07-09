Ext.define('cfa.view.search.AllDeviceView', {
	extend: 'Ext.TabPanel',
	xtype: 'alldeviceview',

	config: {
		
		tabBarPosition: 'bottom',
		title: 'Search Result',
		items: [
			{	
				title: 'System',
				itemId: 'devicelistview',
				xtype: 'searchsesultlist',
			},
			{
				title: 'Storage',
				itemId: 'storagelistview',
				xtype: 'searchsesultlist',
			},
			{
				title: 'Media',
				itemId: 'medialistview',
				xtype: 'searchsesultlist',
			},
			{
				title: 'Mobile',
				itemId: 'mobilelistview',
				xtype: 'searchsesultlist',
			}
		]
	}
	
})
