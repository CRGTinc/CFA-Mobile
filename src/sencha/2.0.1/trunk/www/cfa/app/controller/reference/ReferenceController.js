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
	
	openReferenceResource: function(list,record){	
		var v = this.getReferenceDetail();
		v.setUrl(record.getData().url);		
		v.getHTMLContentByUrl(v);
	},
	
	showReferencePage: function(){
		console.log("Go to references page");
		var caseView = Ext.create('cfa.view.reference.ReferenceView');
		this.getMain().push(caseView);        						
	}		
})