Ext.define('cfa.controller.case.CaseController', {
    extend: 'Ext.app.Controller',

    requires: [
        'cfa.view.case.CaseView',
        'cfa.view.case.CaseFormSelectionView'
    ],

    config: {
        routes: {
            'case': 'showCasePage'
        },

        refs: {
            main: 'main',
            casesList: 'nestedlist[id = "caseslist"]',
            caseContextPanel: 'panel[id = "casecontextpanel"]',
            caseContentPanel: 'panel[id = "casecontentpanel"]',
            caseFormPanel: 'panel[id = "caseformpanel"]',
            caseToolbar: 'toolbar[id = "casetoolbar"]',
            caseContextLabel: '#casecontextlabel',
            addCaseDataButton: 'button[action = addCaseData]',
            saveCaseDataButton: 'button[action = savecasedata]',
            cancelCaseDataButton: 'button[action = cancelcasedata]',
            caseFormList: 'list[id = "caseformlist"]',
            exportCaseData: 'button[action = exportcasedata]'
        },

        control: {
            casesList: {
                'itemtap': 'caseItemTap',
                'back': 'casesListBackTap'
            },

            addCaseDataButton: {
                'tap': 'addCaseData'
            },
            
            saveCaseDataButton: {
                'tap': 'saveCaseData'
            },
            
            cancelCaseDataButton: {
                'tap': 'cancelCaseData'
            },
            
            caseFormList: {
                'itemtap': 'caseFormSelected'
            },
            
            exportCaseData:{
            	'tap' : 'exportSingleData'            	
            }
        },
        
        currentRecord: null,
        
        recordsPath: [],
        
        formSelectionView: null
    },
    
    initForms: function() {
        if (!this.getFormSelectionView())
            this.setFormSelectionView(Ext.create('cfa.view.case.CaseFormSelectionView'));
    
        if (!Formpod.Forms) {
            Formpod.init(FD_Forms, Formpod.FormEngine.CodeGenerators.Sencha);
            Ext.getStore('CaseForms').setData(Formpod.Forms);
        }
        
        for (var formName in Formpod.FormTypes) {
            Formpod.FormTypes[formName].deleteForm();
        }

        this.setRecordsPath([]);
    },

    showCasePage: function () {
        this.initForms();
        var caseView = Ext.create('cfa.view.case.CaseView');
        this.getMain().push(caseView);
    },

    caseItemTap: function (nestedList, list, index, target, record, e, eOpts) {
        this.setCurrentRecord(record);
        this.showCurrentRecord();
        
        if (!record.isLeaf()) {
            var recordsPath = this.getRecordsPath();
            Ext.Array.insert(recordsPath, recordsPath.length, [record]);
        }
    },

    addCaseData: function () {
        var recordsPath = this.getRecordsPath();
            
        if (recordsPath.length) {
            var store = Ext.getStore('CaseForms'),
                lastRecord = recordsPath[recordsPath.length - 1],
                childForms = lastRecord.get('form').engineClass.childForms;
            
            store.clearFilter();
            store.filterBy(function(record) {
                return Ext.Array.contains(childForms, record.get('name'));
            });
            
            this.getFormSelectionView().showBy(this.getCasesList().getToolbar());
        } else {
            var record = Ext.create('cfa.model.Case'),
                engine = Formpod.FormTypes['Case Form'];
            
            record.set('form', {
                engineClass: engine
            });
            
            this.setCurrentRecord(record);
            this.showCurrentRecord();
        }
    },
    
    saveCaseData: function() {
        var currentRecord = this.getCurrentRecord();
        
        if (currentRecord) {
            var store = Ext.getStore('Cases'),
                phantomRecord = currentRecord.phantom;

            if (phantomRecord) {
                store.add(currentRecord);
            }
            
            var form = currentRecord.get('form'),
                engine = form.engineClass;
            
            form = engine.getFormObject();
            currentRecord.beginEdit();
            currentRecord.set('form', form);
            currentRecord.set('text', form[Formpod.FormTypes[engine.name].displayProperty]);
            currentRecord.endEdit();
            
            if (!phantomRecord) {
                currentRecord.setDirty(true);
            }

            store.sync();
            
            if (phantomRecord) {
                var parentId = currentRecord.get('parentId');
                
                if (parentId) {
                    store.getNodeById(parentId).appendChild(currentRecord);
                } else {
                    store.getNode().appendChild(currentRecord);
                }
            }

            this.setCurrentRecord(null);
            this.showCurrentRecord();
        }
    },
    
    cancelCaseData: function() {
        this.setCurrentRecord(null);
        this.showCurrentRecord();
    },
    
    casesListBackTap: function(nestedList, node, lastActiveList, detailCardActive, eOpts) {
        var recordsPath = this.getRecordsPath();
        Ext.Array.remove(recordsPath, recordsPath[recordsPath.length - 1]);
        
        this.setCurrentRecord(null);
        this.showCurrentRecord();
    },
    
    caseFormSelected: function(list, index, target, record, e, eOpts) {
        this.getFormSelectionView().hide();
        
        var formType = record.get('name'),
            data = Ext.create('cfa.model.Case'),
            engine = Formpod.FormTypes[formType];
            
            data.set('form', {
                engineClass: engine
            });
            
            if (engine.childForms && engine.childForms.length) {
                data.set('leaf', false);
            } else {
                data.set('leaf', true);
            }

            var recordsPath = this.getRecordsPath();
            
            if (recordsPath.length) {
                var currentNode = recordsPath[recordsPath.length - 1];
                data.set('parentId', currentNode.get('id'));
            }
            
            this.setCurrentRecord(data);
            this.showCurrentRecord();
    },
    
    showCurrentRecord: function() {
        var currentRecord = this.getCurrentRecord();
        
        if (currentRecord) {

            var formData = currentRecord.get('form');
            var engine = formData.engineClass;
            engine.resetForm();
            engine.loadForm(formData);

            var form = engine.getForm();
            this.getCaseFormPanel().removeAll(false);
            this.getCaseFormPanel().add(form);
            this.getCaseContentPanel().show();
            this.getCaseToolbar().show();
            
        } else {
            this.getCaseFormPanel().removeAll(false);
            this.getCaseContentPanel().hide();
            this.getCaseToolbar().hide();
        }
        
        this.showContextInfo(currentRecord);
    },
    
    showContextInfo: function(record) {
        if (record) {
            var contextString,
                engine = record.get('form').engineClass;
            
            if (record.phantom) {
                contextString = Ext.String.format('<div align="center">New {0}<br />{1}</div>', engine.name, engine.description);
            } else {
                contextString = Ext.String.format('<div align="center">{0}<br />{1}</div>', engine.name, engine.description);
            }
            
            this.getCaseContextLabel().setHtml(contextString);
        } else {
            this.getCaseContextLabel().setHtml('');
        }
    },
    
    exportSingleData: function(){
    	
    	var currentRecord = this.getCurrentRecord();    	
        this.getJsonString( currentRecord);
     },
     
     getFormInstanceData: function(formInstance){
     	var formdata = '{';
     	for(key in formInstance){
     		     		
     		if( typeof(formInstance[key]) != "object") {
     			formdata = formdata.concat('"' + key + '"' + ':' + '"' + formInstance[key] + '",');
     		}     		
     	}
     	
     	formdata = formdata.concat('}');
     	formdata = formdata.replace(',}', '}');
     	return formdata;
     },
    
    getJsonString: function(record) {    	
    	var form, engine, data;            
        form = record.getData().form;       
        data = this.getFormInstanceData(form);       
       	var jsonString =  data;           
        
        if (record.childNodes && record.childNodes.length) {        	   	
        	var childData = [], i;
        	for(i = 0; i < record.childNodes.length; i++){
        		var data = this.getJsonString(record.childNodes[i]);        		       		 
        		childData.push(data);        		
    		} 
    		jsonString = jsonString.replace("}", ',"childs":['+childData+']}'); 
        }
        console.log(jsonString);
        return jsonString;
    },
    
    
     exportData: function(jsonString) {
    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
	    		function(fileSystem) {
	        		fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, 
						function(fileEntry) {
			        		fileEntry.createWriter(
			        			function(writer) {
			        				writer.onwrite = function(evt) {
			            					console.log("write success");
			        				};
			        				writer.write(jsonString);
			        			}, this.fail);
			    		}, this.fail);
	    		},this.fail);	
   },   
   
   fail:function(error){   	  	
   	console.log(error.code);   	
   }
  
});

