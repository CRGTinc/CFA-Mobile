Ext.define("cfa.view.reference.ReferenceView", {
    extend: 'Ext.Panel',
	alias: 'widget.reference_view_container',
	
	requires:['cfa.view.reference.ReferencesList','cfa.model.Reference', 'cfa.view.reference.ReferenceDetail','cfa.reader.Csv'],	
	
	config: {
		layout: 'fit',
	},
	
	initialize: function() {
		this.callParent(arguments);
		
		var referencesList = {
			xtype: 'references_list',
			store: Ext.getStore("References").load(),
			listeners:{
				select : {fn:this.onItemSelected, scope:this}
        	}
		};
		
		var leftPanel = {
			xtype:'panel',
			layout:'fit',
			flex:1,
			items:[
				referencesList,
			]			
		};
		
		this.add(leftPanel);
	},
		
	onItemSelected: function(list,record,opt) {
		this.fireEvent('openReferenceSourceCommand',this,record);
	},
	
	 
	
});
