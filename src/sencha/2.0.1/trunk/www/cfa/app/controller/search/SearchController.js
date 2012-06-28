Ext.define('cfa.controller.search.SearchController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.search.SearchView','cfa.model.SearchTemplate',],
	
	config: {
        routes: {
            'search': 'showReportPage'
        },

        refs: {
        	main: 'main',
            searchView: 'searchview',
            searchTemplateList: 'list[id = "searchtemplatelist"]',
            searchInputField: '#searchinputfield'
        },
        
        control: {
        	searchTemplateList:{
        		'activate': 'activateSearchTemplateList',
        		'select' : 'searchByTemplate'
        	},
        	
        	searchInputField:{
        		'keyup': 'setFilterByKey'
        	}
        }
    },
	
	showReportPage: function() {
		var reportView = Ext.create('cfa.view.search.SearchView');
		this.getMain().push(reportView); 
		
		
	},
	
	launch: function() {
		Ext.getStore('SearchTemplates').load();
	},
	
	activateSearchTemplateList: function() {
		this.getSearchTemplateList().deselectAll();
	},
	
	searchByTemplate: function(list, record, opt) {
		var store = Ext.create('cfa.store.SearchCases', {
			queryType: record.getData().queryType,
			queryParam: record.getData().queryParam
		}).load();
		
		var resultlist = {
			id:'resultlist',
			title: 'Search Results',
			xtype: 'list',
			store: store
		}
		
		this.getSearchView().push(resultlist);
	},
	
	setFilterByKey: function(field, event, opts) {
		var store,
			resultlist = Ext.getCmp('resultlist');
		
		if(resultlist){
			store = resultlist.getStore();
		} else {
			store = this.getSearchTemplateList().getStore();
		}
		
		
		if( field.getValue() && field.getValue()!= '') {
			store.filter('text',field.getValue(), true, false);
		} else {
			store.clearFilter(false);
		}	
		
	}

			
})