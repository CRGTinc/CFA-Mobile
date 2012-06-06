Ext.define('cfa.store.Dashboards', {
    extend: 'Ext.data.TreeStore',
    requires: ['cfa.model.Dashboard'],

    config :{
        model: 'cfa.model.Dashboard',
        autoLoad: true,
        root: {
            expanded: true
        },
		data:[
				  {
					 "label":"Cases",
					 "urlId":"case"         
				  },
				  {
					 "label":"Contacts",
					 "urlId":"contacts"         
				  },
				  {
					 "label":"Events",
					 "urlId":"events"         
				  },
				  {
					 "label":"Reference",
					 "urlId":"reference"         
				  },
				  {
					 "label":"Search",
					 "urlId":"search"         
				  },
				  {
					 "label":"Setting",
					 "urlId":"setting"         
				  }
			   ]
    }		
});
