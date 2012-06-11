Ext.Loader.setPath({
	'cfa' : 'app',
	'Deft' : 'app/lib/deft'
});
Ext.require(['Deft.*','cfa.helper.PhoneGapHelper']);
Ext.application({
	name : 'cfa',
	helpUrl: 'root',
	requires : [		
		'Ext.MessageBox'			
	],
	profiles : ['Tablet', 'Phone'],
	stores : ['Base','Dashboards', 'Events', 'Cases', 'Contacts', 'References','LSContacts', 'EventsLocal', 			'ReferencesLocal'],

	icon : {
		'57' : 'resources/icons/Icon.png',
		'72' : 'resources/icons/Icon~ipad.png',
		'114' : 'resources/icons/Icon@2x.png',
		'144' : 'resources/icons/Icon~ipad@2x.png'
	},

	isIconPrecomposed : true,

	startupImage : {
		'320x460' : 'resources/startup/320x460.jpg',
		'640x920' : 'resources/startup/640x920.png',
		'768x1004' : 'resources/startup/768x1004.png',
		'748x1024' : 'resources/startup/748x1024.png',
		'1536x2008' : 'resources/startup/1536x2008.png',
		'1496x2048' : 'resources/startup/1496x2048.png'
	},
	
	launch : function() {
		Formpod.init(FD_Forms, Formpod.FormEngine.CodeGenerators.Sencha);
		Deft.Injector.configure({
			contactStore: {
				fn: function() {
					if (cfa.helper.PhoneGapHelper.isOnLine()) {
						var store =  Ext.create('cfa.store.Contacts');	                
						store.setOfflineStore(Ext.create('cfa.store.LSContacts'));
						return store;	
					}	
					else {
						return Ext.create('cfa.store.LSContacts' );
					}
				},
				
			},
			
			eventStore: {
				fn: function() {
					if (cfa.helper.PhoneGapHelper.isOnLine()) {					
						var store =  Ext.create('cfa.store.Events');	                
						store.setOfflineStore(Ext.create('cfa.store.EventsLocal'));
						return store;	
					}	
					else {					
						return Ext.create('cfa.store.EventsLocal' );
					}
				},
					
			},
			
			referenceStore:{
				fn: function() {
					if (cfa.helper.PhoneGapHelper.isOnLine()) {					
						var store =  Ext.create('cfa.store.References');	                
						store.setOfflineStore(Ext.create('cfa.store.ReferencesLocal'));
						return store;	
					}	
					else {					
						return Ext.create('cfa.store.ReferencesLocal' );
					}
				},
			}
		   	
    	});
    	
    	if(!window.plugins) {
        	window.plugins = {};
    	}
        if ( ! window.plugins.childBrowser ) {
       		window.plugins.childBrowser = new ChildBrowser();
    	}
	    //Destroy the #appLoadingIndicator element		
    	Ext.fly('appLoadingIndicator').destroy();
	},
	onUpdated : function() {
		Ext.Msg
				.confirm(
						"Application Update",
						"This application has just successfully been updated to the latest version. Reload now?",
						function(buttonId) {
							if (buttonId === 'yes') {
								window.location.reload();
							}
						});
	}			
});
