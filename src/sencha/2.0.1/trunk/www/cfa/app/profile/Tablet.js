Ext.define('cfa.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'tablet',
        namespace: 'tablet',
        controllers: [
		'Dashboard','cfa.controller.Master',
		'cfa.controller.case.CaseController',
		'cfa.controller.contact.ContactController',
		'cfa.controller.event.EventController',
		'cfa.controller.reference.ReferenceController',
		'cfa.controller.report.ReportController',
		'cfa.controller.setting.SettingController',
		'cfa.controller.feedback.FeedbackController',
		'cfa.controller.about.AboutController'        
		],
        views: ['Main']
    },

    isActive: function() {
        return !Ext.os.is.Phone;
    },

    launch: function() {
        Ext.create('cfa.view.tablet.Main');
    }
});
