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
        
        currentFormView: null
    },

    showCasePage: function () {
        var caseView = Ext.create('cfa.view.case.CaseView');
        this.getMain().push(caseView);
    },

    caseItemTap: function (nestedList, list, index, target, record, e, eOpts) {
        var engine = record.get('form').engineClass;
        engine.loadForm(record.get('form'));

        var form = engine.getForm();
        this.getCaseContentPanel().add(form);
    },

    addCaseData: function () {
        var caseForm = Formpod.FormTypes['Case Form'].getForm();
        this.getCaseFormPanel().add(caseForm);
        
        this.getCaseContextPanel().setHtml('Add new case');
        this.setCurrentFormView(caseForm);
    },
    
    saveCaseData: function() {
        console.log('save case data');
    },
    
    cancelCaseData: function() {
        this.getCaseFormPanel().removeAll();
    }
});
