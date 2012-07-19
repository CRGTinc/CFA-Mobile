Ext.define('cfa.view.Dashboards', {
    extend: 'Ext.dataview.DataView',
    xtype: 'dashboards',
	
	config: {
        title: 'CFA Mobile',
        id: 'dashboard',
        scrollable: false,

		refs: {
            main: 'main'
        },
		
        baseCls: 'dashboards-list',

        itemTpl: [
            '<div class="image" style="background-image:url(resources/icons/{urlId}.png)"></div>',
            '<div class="name">{label}</div>'
        ].join('')
    },

    applyData: function(data) {
        this.setRecords(data);
        return Ext.pluck(data || [], 'data');
    }
});
