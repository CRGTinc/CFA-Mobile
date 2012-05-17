Ext.define('cfa.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'phone',
        namespace: 'phone',
        controllers: ['Dashboard','cfa.controller.Master'],
        views: ['Main']
    },

    isActive: function() {
        return Ext.os.is.Phone;
    },

    launch: function() {
        Ext.create('cfa.view.phone.Main');
    }
});
