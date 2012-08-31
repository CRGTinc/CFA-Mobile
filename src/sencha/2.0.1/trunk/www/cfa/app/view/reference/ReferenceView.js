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
		cfa.app.helpUrl = "ReferenceHelp";
		var referencesList = {
			xtype: 'references_list',
			itemId: 'referenceslist',
			listeners: {
				itemtap : {fn: this.onItemSelected, scope: this}
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
		
	onItemSelected: function(view, index, target, record,  e, eOpts) {
		this.fireEvent('openReferenceSourceCommand', this, target, record);
	},
});
