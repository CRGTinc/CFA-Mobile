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
					 "urlId":"contact"         
				  },
				  {
					 "label":"Events",
					 "urlId":"event"         
				  },
				  {
					 "label":"References",
					 "urlId":"reference"         
				  },
				   {
					 "label":"Reports",
					 "urlId":"report"         
				  },
				  {
					 "label":"Settings",
					 "urlId":"setting"         
				  }
			   ]
    }		
});
