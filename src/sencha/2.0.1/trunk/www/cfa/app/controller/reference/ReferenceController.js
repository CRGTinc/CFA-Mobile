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
			},
			
			main : {
				beforepopcommand : 'onMainBack',
			}
		},
		
		referenceView: null,
		currentRecord: null,
		currentActionSheet: null,
    },
    
    onError: function(error) {
    	console.log(error);
    },
    
    onMainBack: function() {
    	if (this.getCurrentActionSheet()) {
			this.getCurrentActionSheet().hide();
		}
    },
	
	openReferenceResource: function( view, target, record) {
		this.setCurrentRecord(record);
		
		if (this.getCurrentActionSheet()) {
			this.getCurrentActionSheet().hide()	
		}
		
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
				var actionSheet = Ext.create('Ext.Panel',{
					modal: false,
					layout: 'fit',
					height: '50px',
					width: '235px',
					items: [
						{
							xtype: 'toolbar',
							items: [{
									xtype: 'button',
									text: 'View',
									ui:'confirm',
									handler: function() {me.openReferenceInWebview()}
								}, {
									xtype: 'button',
									text: 'Download',
									handler: function(){me.saveReferenceToLocal();}
								},{
									xtype: 'button',
									text: 'Cancel',
									handler: function(){actionSheet.hide();}
								}]
						}
					]
				});
			
				Ext.Viewport.add(actionSheet);
				this.setCurrentActionSheet(actionSheet);
				actionSheet.showBy(target);
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
        
        this.getCurrentActionSheet().hide();
	},
	
	saveReferenceToLocal: function() {
		if (Ext.os.is.Desktop) {
			Ext.Msg.alert("Download Reference", "Currently support only for iPad.");
			this.getCurrentActionSheet().hide();
			return;
		}
		var currentRecord = this.getCurrentRecord();
		
		if(this.isDownloaded(currentRecord)) {
			this.getCurrentActionSheet().hide();
			Ext.Msg.confirm("Download Reference", "This document is already downloaded.<br> Do you want to re-download it?", this.cofirmDownload, this);
		} else {
			this.doDownload();
		}
		
	},
	
	cofirmDownload: function(button) {
		if(button == 'yes') {
			this.doDownload();
		}
	},
	
	doDownload: function(button) {
		var me = this;
		var localReferenceStore = Ext.getStore('ReferencesDownloaded');
		var currentRecord = this.getCurrentRecord();

		me.getReferenceView().setMasked({
			xtype : 'loadmask',
			message : 'Downloading...'
		});

		me.getCurrentActionSheet().hide();
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			fileSystem.root.getFile(currentRecord.getData().title, {
				create : true
			}, function(fileEntry) {
				var path = fileEntry.fullPath.replace(currentRecord.getData().title, "");
				fileEntry.remove();
				path = path + "Document-" + currentRecord.getData().title + ".pdf";
				var fileTransfer = new FileTransfer();
				fileTransfer.download(currentRecord.getData().url, path, function(file) {
					if (localReferenceStore.getData().all.indexOf(currentRecord) > -1) {
						me.getReferenceView().unmask();
						Ext.Msg.alert("Download Reference", "Document downloaded");
					} else {
						localReferenceStore.add(currentRecord.copy());
						localReferenceStore.sync({
							callback : function() {
								me.getReferenceView().unmask();
								currentRecord.beginEdit();
								currentRecord.set('downloaded', 'Downloaded');
								currentRecord.endEdit();
								Ext.Msg.alert("Download Reference", "Document downloaded");
							}
						});
					}
				}, function(error) {
					console.log("Download error: " + error);
				});
			}, me.onError);
		}, me.onError); 
	},

	isDownloaded: function(document) {
		if(document.getData().downloaded.toLowerCase() == 'downloaded')
			return true;
		else
			return false;
	},
	
	showReferencePage: function(){
		var me = this;
		this.setReferenceView(Ext.create('cfa.view.reference.ReferenceView'));
		this.getMain().push(this.getReferenceView());
		var localReferenceStore = Ext.getStore('ReferencesDownloaded');
		var referenceStore = this.getReferenceView().getReferenceStore().load({
			callback: function(records, operation, success) {
				var dataOnline = records;
				localReferenceStore.load({
					callback: function(records, operation, success) {
						for(var i = 0; i < dataOnline.length; i++) {
							if (localReferenceStore.findRecord('title', dataOnline[i].getData().title)) {
								dataOnline[i].getData().downloaded = 'Downloaded';
							} else {
								dataOnline[i].getData().downloaded = '';
							}
						}
						referenceStore.setData(dataOnline);
						this.getReferenceView().getComponent('contentpanel').getComponent('referenceslist').setStore(referenceStore);
					},scope: me
				});
			}, scope: me
		});						
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