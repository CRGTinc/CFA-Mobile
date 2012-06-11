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
            addCaseDataButton: 'button[action = addCaseData]',
            saveCaseDataButton: 'button[action = savecasedata]',
            cancelCaseDataButton: 'button[action = cancelcasedata]',
            caseFormList: 'list[id = "caseformlist"]'
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
            }
        },
        
        currentRecord: null,
        
        recordsPath: [],
        
        formSelectionView: Ext.create('cfa.view.case.CaseFormSelectionView')
    },

    showCasePage: function () {
        var caseView = Ext.create('cfa.view.case.CaseView');
        this.getMain().push(caseView);
    },

    caseItemTap: function (nestedList, list, index, target, record, e, eOpts) {
        var p = this.getCaseContextPanel();
        p.getComponent(0).getComponent(0).setHtml('<div align="center"><strong><font size="+2">Case information</font></strong></div>');       

        this.setCurrentRecord(record);
        this.showCurrentRecord();
        
        if (!record.isLeaf()) {
            var recordsPath = this.getRecordsPath();
            Ext.Array.insert(recordsPath, recordsPath.length, [record]);
        }
    },

    addCaseData: function () {
        var recordsPath = this.getRecordsPath(),
            record, engine;
            
        if (recordsPath.length) {
            this.getFormSelectionView().showBy(this.getCasesList().getToolbar());
        } else {
            record = Ext.create('cfa.model.Case');
            engine = Formpod.FormTypes['Case Form'];
            record.set('form', {
                engineClass: engine
            });
            
            this.setCurrentRecord(record);
            this.showCurrentRecord();
            var p = this.getCaseContextPanel();
            p.getComponent(0).getComponent(0).setHtml('<div align="center"><strong><font size="+2">Add new case</font></strong></div>');
        }
    },
    
    saveCaseData: function() {
        var currentRecord = this.getCurrentRecord();
        console.log('save current record', currentRecord);
        
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

            this.hideCurrentRecord();
            this.setCurrentRecord(null);
        }
    },
    
    cancelCaseData: function() {
        this.hideCurrentRecord();
        this.setCurrentRecord(null);
    },
    
    casesListBackTap: function(nestedList, node, lastActiveList, detailCardActive, eOpts) {
        var recordsPath = this.getRecordsPath();
        Ext.Array.remove(recordsPath, recordsPath[recordsPath.length - 1]);
    },
    
    caseFormSelected: function(list, index, target, record, e, eOpts) {
        this.getFormSelectionView().hide();
        
        var formType = record.get('formName'),
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
                console.log(data);
            }
            
            this.setCurrentRecord(data);
            this.showCurrentRecord();
    },
    
    showCurrentRecord: function() {
        this.hideCurrentRecord();
        var currentRecord = this.getCurrentRecord();
        
        if (currentRecord) {
            var formData = currentRecord.get('form');
            var engine = formData.engineClass;
            engine.resetForm();
            engine.loadForm(formData);

            var form = engine.getForm();
            this.getCaseFormPanel().add(form);
            this.getCaseToolbar().show();
        }
    },
    
    hideCurrentRecord: function() {
        var currentRecord = this.getCurrentRecord();
        
        if (currentRecord) {
            var formData = currentRecord.get('form');
            var engine = formData.engineClass;
            this.getCaseFormPanel().removeAll(false);
            this.getCaseToolbar().hide();
        }
    }
});
