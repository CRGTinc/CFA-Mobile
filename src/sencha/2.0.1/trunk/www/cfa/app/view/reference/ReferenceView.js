Ext.define("cfa.view.reference.ReferenceView", {
    extend: 'Ext.Panel',
	mixins: ['Deft.mixin.Injectable' ],
    inject: [ 'referenceStore' ],
	alias: 'widget.reference_view_container',
	
	requires:['cfa.view.reference.ReferencesList','cfa.model.Reference','cfa.reader.Csv'],	
	
	config: {
		layout: 'fit',
		title: 'References',
		referenceStore: null
	},
	
	initialize: function() {
		this.callParent(arguments);
		cfa.app.helpUrl = "Reference";
		var referencesList = {
			xtype: 'references_list',
			itemId: 'referenceslist',
			store: this.getReferenceStore().load(),
			listeners: {
				select : {fn: this.onItemSelected, scope: this}
        	}
		};
		
		var contentPanel = {
			xtype: 'panel',
			itemId: 'contentpanel',
			layout: 'fit',
			flex: 1,
			items: [
				{
					xtype: 'searchfield',
					id: 'referencesearchfield',
					docked: 'top',
					clearIcon: false
				},
				referencesList
			]			
		};
		this.add(contentPanel);
	},
		
	onItemSelected: function(list, record, opt) {
		this.fireEvent('openReferenceSourceCommand', this, record);
	},
});
