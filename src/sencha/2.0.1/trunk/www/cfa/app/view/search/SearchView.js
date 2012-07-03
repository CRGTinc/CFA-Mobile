var store = Ext.getStore("Contacts");
Ext.define('cfa.view.search.SearchView', {
    extend: 'Ext.navigation.View',
    xtype: 'searchview',

	config:{
		title: 'Search',
		autoDestroy: false,
		navigationBar:{
			items: [
				{
					xtype: 'searchfield',
					id: 'searchinputfield',
					align: 'right'
				}
			],
			
			
					
		},
		
		items: [
			{
				xtype: 'list',
				title: 'Search Templates',
				id: 'searchtemplatelist',
				itemTpl: '</pre><div>{text}</div><div><font size="-1">{description}</font></div><pre>',
				store: 'SearchTemplates',
			},
		]
	},
	
	pop: function() {
		this.callParent(arguments);
		Ext.getCmp("searchinputfield").setValue('');
	},

});



