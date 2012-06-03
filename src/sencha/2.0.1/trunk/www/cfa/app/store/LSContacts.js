Ext.define('cfa.store.LSContacts',{
	extend: 'cfa.store.Contacts',
	storeId: 'LSContacts',
	config:{	
		proxy:{
			type: 'localstorage',
			id: 'contact'			
		}			
	}
});