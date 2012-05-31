Ext.define('cfa.controller.reference.ReferenceController',{
	extend: 'Ext.app.Controller',
    
	requires: ['cfa.view.reference.ReferenceView'],
	
	config: {
        routes: {
            'reference': 'showReferencePage'
        },

        refs: {
            main: 'main',
			referenceViewContainer: 'reference_view_container',
			referenceDetail: 'reference_detail'
        },
		
		control:{
			referenceViewContainer:{
				openReferenceSourceCommand: 'openReferenceResource'	
			}
		}
		
    },
	
	openReferenceResource: function(list, record) {
        window.plugins.childBrowser.showWebPage(record.getData().url);
	},
	
	showReferencePage: function(){
		var referenceView = Ext.create('cfa.view.reference.ReferenceView');
		this.getMain().push(referenceView);        						
	}		
})