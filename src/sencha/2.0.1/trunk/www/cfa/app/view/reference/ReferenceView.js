Ext.define("cfa.view.reference.ReferenceView", {
    extend: 'Ext.Container',
	alias: 'widget.reference_view_container',
	
	requires:['cfa.view.reference.ReferencesList','cfa.model.Reference', 'cfa.view.reference.ReferenceDetail','cfa.reader.Csv'],	
	
	config: {
		layout: 'hbox',
	},
	
	
	
	initialize: function() {
		this.callParent(arguments);
		
		var topTitle = {
			xtype:'toolbar',
			title:"References",
			docked:'top',
			
		};
				
		var referencesList = {
			xtype: 'references_list',
			//flex: 1,
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
				topTitle,
				referencesList,
			]			
		};
		
		var referenceDetail = {
			xtype: 'reference_detail',
			id: 'reference_detail_view',
			flex: 2
		}
		
		this.add([leftPanel,referenceDetail])		
	},
		
	onItemSelected: function(list,record,opt){
		console.log("open website");
		this.fireEvent('openReferenceSourceCommand',this,record);
	},
	
	 
	
});
