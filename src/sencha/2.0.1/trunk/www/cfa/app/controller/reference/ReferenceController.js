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
		downloadedDocumentStore: null,
		isOnline: cfa.helper.PhoneGapHelper.isOnLine(),
		isDesktop: Ext.os.is.Desktop
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
			if (!this.getIsOnline()) {
				
				if (!this.getIsDesktop()) {
					var me = this;
					window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
						fileSystem.root.getFile(record.getData().title, {
							create : true
						}, function(fileEntry) {
							var path = fileEntry.toURI();
							window.plugins.childBrowser.showWebPage(path + ".pdf")
						}, me.onError);
					}, me.onError);
				} else {
					Ext.Msg.alert("References ","You are in offline mode. Please open the document on you PC if you downloaded it.");
				}
				
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
			this.getDownloadedDocumentStore().remove(this.getCurrentRecord());
			this.doDownload();
		}
	},
	
	doDownload: function(button) {
		var me = this;
		var	downloadedDocumentStore = Ext.getStore('ReferencesDownloaded'),
			currentRecord = this.getCurrentRecord();
			
		var name = currentRecord.getData().title,
			url = currentRecord.getData().url;
			
		me.getCurrentActionSheet().hide();
		if (!this.getIsDesktop()){
			me.getReferenceView().setMasked({
				xtype : 'loadmask',
				message : 'Downloading...'
			});
			
			cfa.helper.PhoneGapHelper.downloadFile(name, url,
				function() {
					me.getDownloadedDocumentStore().add(currentRecord.copy());
					me.getDownloadedDocumentStore().sync({
						callback : function() {
							me.getReferenceView().unmask();
							currentRecord.beginEdit();
							currentRecord.set('downloaded', 'Downloaded');
							currentRecord.endEdit();
							Ext.Msg.alert("Download Reference", "Document downloaded");
						}
					});
				}
			); 
		} else {
			var linkFile = document.createElement('a');
			linkFile.href = url;
			linkFile.download = name;
			document.body.appendChild(linkFile);
			linkFile.click();
			document.body.removeChild(linkFile);
		}
		
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
		this.setDownloadedDocumentStore(Ext.getStore('ReferencesDownloaded'));
		
		var referenceStore = this.getReferenceView().getReferenceStore();
		referenceStore.load({
			callback: function(records, operation, success) {
				var dataOnline = records;
				this.getDownloadedDocumentStore().load({
					callback: function(records, operation, success) {
						for(var i = 0; i < dataOnline.length; i++) {
							if (this.getDownloadedDocumentStore().findRecord('title', dataOnline[i].getData().title)) {
								dataOnline[i].beginEdit();
								dataOnline[i].set('downloaded', 'Downloaded');
								dataOnline[i].endEdit();
							} else {
								dataOnline[i].beginEdit();
								dataOnline[i].set('downloaded', '');
								dataOnline[i].endEdit();;
							}
						}
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