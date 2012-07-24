Ext.define('cfa.view.search.SearchResultList',{
	extend: 'Ext.Panel',
	alias: 'widget.searchsesultlist',
	
	config:{
		title: 'Search Results',
		layout:'fit',
		items:[
			{
				xtype: 'list',
				itemId: 'resultlist',
				mode: 'MULTI',
				onItemDisclosure: true
			}, {
				xtype: 'toolbar',
				itemId: 'actionbar',
				docked: 'bottom',
				layout: {
					align: 'center',
					pack: 'right'
				},
				items:[
					{
						xtype: 'button',
						text: 'Export',
						action: 'exportdevicedata'
					},{
						xtype: 'button',
						text: 'Delete',
						action: 'deletedevicedata'
					},{
						xtype: 'button',
						text: 'Reset',
						action: 'resetselection'
					}
				]
			}
		]
	}
})
