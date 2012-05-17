Ext.define('cfa.model.Dashboard', {
    extend: 'Ext.data.Model',   

    config: {
        fields: [
            'urlId',
            'label'
        ]       
    },

    toUrl: function() {
        return this.get('urlId');
    }
});

