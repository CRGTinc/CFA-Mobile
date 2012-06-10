Ext.define('cfa.controller.case.CaseController', {
    extend: 'Ext.app.Controller',

    requires: ['cfa.view.case.CaseView'],

    config: {
        routes: {
            'case': 'showCasePage'
        },

        refs: {
            main: 'main',
            casesList: '#caseslist',
            caseContextPanel: '#casecontextpanel',
            caseContentPanel: '#casecontentpanel',
            addCaseDataButton: 'button[action = addCaseData]'
        },

        control: {
            casesList: {
                'itemtap': 'caseItemTap'
            },

            addCaseDataButton: {
                'tap': 'addCaseData'
            }
        }
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
    }
});
