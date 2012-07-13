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
			referenceDetail: 'reference_detail',
			referenceSearhField: 'searchfield[id = "referencesearchfield"]'
        },
		
		control:{
			referenceViewContainer:{
				openReferenceSourceCommand: 'openReferenceResource'	
			},
			
			referenceSearhField: {
				'keyup' : 'searchReferencesByKey'
			}
		},
		
		referenceView: null
    },
	
	openReferenceResource: function(list, record) {
        if (Ext.os.is.Desktop) {
            window.open(record.getData().url);
        } else {
            window.plugins.childBrowser.showWebPage(record.getData().url);
        }
	},
	
	showReferencePage: function(){
		this.setReferenceView(Ext.create('cfa.view.reference.ReferenceView'));
		this.getMain().push(this.getReferenceView());        						
	},
	
	searchReferencesByKey: function(view, e, eOpts) {
		var store = this.getReferenceView().getComponent('contentpanel').getComponent('referenceslist').getStore();
		store.clearFilter();
		store.filterBy(function(record){
			if (record.getData().title.toLowerCase().indexOf(view.getValue()) > -1) {
				return record;
			}
		});
		
	}		
})