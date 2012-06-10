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
        console.log('case item tapped');
    },

    addCaseData: function () {
        console.log('case data add');
        var store = Ext.getStore('Cases');
        store.add({
            cfa: {
                CaseTitle: 'test',
                engineClass: {
                    name: 'Case Form'
                }
            }
        });
        store.sync();
    }
});
