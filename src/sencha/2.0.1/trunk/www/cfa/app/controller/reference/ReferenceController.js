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
		
		referenceView: null,
		currentRecord: null,
		currentActionSheet: null,
    },
    
    onError: function(error) {
    	console.log(error);
    },
	
	openReferenceResource: function(list, record) {
		this.setCurrentRecord(record);
		if (record.getData().url.toLowerCase().indexOf('.pdf') > -1){
			if (!cfa.helper.PhoneGapHelper.isOnLine()) {
				var me = this;
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
					function(fileSystem) {
						fileSystem.root.getFile(record.getData().title, {create : true},
							function(fileEntry) {
								var path = fileEntry.toURI();
								window.plugins.childBrowser.showWebPage(path + ".pdf")
							}, me.onError);
				}, me.onError);
			} else {
				var me = this;
				var actionSheet = Ext.create('Ext.ActionSheet',{
					items: [{
						text: 'View in CFA',
						ui:'confirm',
						handler: function() {me.openReferenceInWebview()}
					}, {
						text: 'Download to local',
						handler: function(){me.saveReferenceToLocal();}
					},{
						text: 'Cancle',
						handler: function(){actionSheet.hide();}
					}]
				});
			
				Ext.Viewport.add(actionSheet);
				this.setCurrentActionSheet(actionSheet);
				actionSheet.show();
			}
		} else {
			this.openReferenceInWebview();
		}
		
		
	},
	
	openReferenceInWebview: function() {
		currentRecord = this.getCurrentRecord();
		if (Ext.os.is.Desktop) {
            window.open(currentRecord.getData().url);
        } else {
            window.plugins.childBrowser.showWebPage(currentRecord.getData().url);
        }
        
        this.getCurrentActionSheet().hide()
	},
	
	saveReferenceToLocal: function() {
		if (Ext.os.is.Desktop) {
			Ext.Msg.alert("Download Reference", "Currently support only for iPad.");
			this.getCurrentActionSheet().hide();
			return;
		}
		var me = this;
		currentRecord = this.getCurrentRecord();
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
			function(fileSystem) {
				fileSystem.root.getFile(currentRecord.getData().title, {create : true},
					function(fileEntry) {
						var path = fileEntry.fullPath.replace(currentRecord.getData().title, "");
						fileEntry.remove();
						path = path + currentRecord.getData().title + ".pdf";
						var fileTransfer = new FileTransfer();
						fileTransfer.download(
							currentRecord.getData().url,
							path,
							function(file) {
								console.log("Download complete");
								me.getCurrentActionSheet().hide()
							},
							function(error){
								console.log("Download error: " + error);
							}
						);
					}, me.onError);
		}, me.onError);
	},
	
	showReferencePage: function(){
		this.setReferenceView(Ext.create('cfa.view.reference.ReferenceView'));
		this.getMain().push(this.getReferenceView());        						
	},
	
	searchReferencesByKey: function(view, e, eOpts) {
		var store = this.getReferenceView().getComponent('contentpanel').getComponent('referenceslist').getStore();
		store.clearFilter();
		store.filterBy(function(record){
			if (record.getData().title.toLowerCase().indexOf(view.getValue().toLowerCase()) > -1) {
				return record;
			}
		});
		
	}		
})