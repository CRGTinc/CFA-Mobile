Ext.define('cfa.controller.case.CaseController', {
    extend: 'Ext.app.Controller',

    requires: [
        'cfa.view.case.CaseView'
    ],

    config: {
        routes: {
            'case': 'showCasePage'
        },

        refs: {
            main: 'main',
            casesList: '#caseslist',
            caseContextPanel: '#casecontextpanel',
            caseContentPanel: '#casecontentpanel',
            caseFormPanel: '#caseformpanel',
            addCaseDataButton: 'button[action = addCaseData]',
            saveCaseDataButton: 'button[action = savecasedata]',
            cancelCaseDataButton: 'button[action = cancelcasedata]'
        },

        control: {
            casesList: {
                'itemtap': 'caseItemTap'
            },

            addCaseDataButton: {
                'tap': 'addCaseData'
            },
            
            saveCaseDataButton: {
                'tap': 'saveCaseData'
            },
            
            cancelCaseDataButton: {
                'tap': 'cancelCaseData'
            }
        },
        
        currentRecord: null
    },

    showCasePage: function () {
        var caseView = Ext.create('cfa.view.case.CaseView');
        this.getMain().push(caseView);
    },

    caseItemTap: function (nestedList, list, index, target, record, e, eOpts) {
        this.setCurrentRecord(record);

        var formData = record.get('form');
        var engine = formData.engineClass;
        engine.loadForm(formData);

        var form = engine.getForm();
        this.getCaseFormPanel().add(form);
        var p = this.getCaseContextPanel();
        p.getComponent(0).getComponent(0).setHtml('<div align="center"><strong><font size="+2">Case information</font></strong></div>');       
    },

    addCaseData: function () {
        var record = Ext.create('cfa.model.Case'),
            engine = Formpod.FormTypes['Case Form'];
        engine.resetForm();
        record.set('form', {
            engineClass: engine
        });

        this.setCurrentRecord(record);
        this.getCaseFormPanel().add(engine.getForm());
        //this.getCaseContextPanel().setHtml('Add new case');
        var p = this.getCaseContextPanel();
        p.getComponent(0).getComponent(0).setHtml('<div align="center"><strong><font size="+2">Add new case</font></strong></div>');
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
                var node = store.getNode();
                node.appendChild(currentRecord);
            }

            var engine = currentRecord.get('form').engineClass;
            this.getCaseFormPanel().remove(engine.getForm(), false);            
            this.setCurrentRecord(null);
        }
    },
    
    cancelCaseData: function() {
        var currentRecord = this.getCurrentRecord();

        if (currentRecord) {
            var engine = currentRecord.get('form').engineClass;
            this.getCaseFormPanel().remove(engine.getForm(), false);
            this.setCurrentRecord(null);
        }
    }
});
