Ext.define('cfa.controller.search.SearchController', {
	extend : 'Ext.app.Controller',
	requires : ['cfa.view.search.SearchView', 'cfa.model.SearchTemplate', 'cfa.view.search.DeviceEditor'],

	config : {
		routes : {
			'search' : 'showReportPage'
		},

		refs : {
			main : 'main',
			searchView : 'searchview',
			searchTemplateList : 'list[id = "searchtemplatelist"]',
			searchInputField : 'searchfield[id = "searchinputfield"]',
			onSaveDeviceButtonClick : 'button[action=savedevicedata]',
			onCancelDeviceButtonClick : 'button[action=canceldevicedata]'
		},

		control : {
			searchTemplateList : {
				'activate' : 'activateSearchTemplateList',
				'select' : 'searchByTemplate'
			},

			searchInputField : {
				'keyup' : 'setFilterByKey'
			},

			searchView : {
				'pop' : 'onPop'
			},

			onSaveDeviceButtonClick : {
				'tap' : 'saveDeviceData'
			},

			onCancelDeviceButtonClick : {
				'tap' : 'cancelDeviceData'
			}

		},

		currentRecord : null
	},

	showReportPage : function() {
		var reportView = Ext.create('cfa.view.search.SearchView');
		this.getMain().push(reportView);
	},

	launch : function() {
		Ext.getStore('SearchTemplates').load();
	},

	activateSearchTemplateList : function() {
		this.getSearchTemplateList().deselectAll();
		this.getSearchTemplateList().getStore().clearFilter(false);
	},

	searchByTemplate : function(list, record, opt) {
		var store = Ext.create('cfa.store.SearchCases', {
			queryType : record.getData().queryType,
			queryParam : record.getData().queryParam
		}).load();

		var resultlist = {
			id : 'resultlist',
			title : 'Search Results',
			xtype : 'list',
			listeners : {
				select : {
					fn : this.onResultsListItemTap,
					scope : this
				}
			},
			store : store
		}

		this.getSearchInputField().setValue('');
		this.getSearchView().push(resultlist);
	},

	setFilterByKey : function(field, event, opts) {
		var store, resultlist = Ext.getCmp('resultlist');

		if (resultlist) {
			store = resultlist.getStore();
		} else {
			store = this.getSearchTemplateList().getStore();
		}

		if (field.getValue() && field.getValue() != '') {
			store.filter('text', field.getValue(), true, false);
		} else {
			store.clearFilter(false);
		}

	},

	onResultsListItemTap : function(list, record, opts) {
		this.setCurrentRecord(record);
		var deviceEditor = Ext.create('cfa.view.search.DeviceEditor');
		var formData = record.get('form');
		data = formData;
		var engine = formData.engineClass;
		engine.resetForm();
		engine.loadForm(data);
		var form = engine.getForm();
		deviceEditor.getComponent('editorpanel').add(form);

		this.getSearchView().push(deviceEditor);
	},

	onPop : function(navigation, view, eOpts) {
		if (view.getId() == 'deviceeditor') {
			view.getComponent('editorpanel').removeAll(false);
		}

		view.destroy();
	},

	saveDeviceData : function() {
		var currentRecord = this.getCurrentRecord();

		if (currentRecord) {
			var errors = currentRecord.validate();

			if (!errors.isValid()) {
				var errorString = '';
				Ext.each(errors.items, function(rec, i) {
					errorString += rec.getMessage() + "<br>";
				});
				Ext.Msg.alert('Save Data', errorString, Ext.emptyFn);
				return false;
			}

			var store = Ext.getCmp('resultlist').getStore();
			var form = currentRecord.get('form'), engine = form.engineClass;

			form = engine.getFormObject();
			currentRecord.beginEdit();
			currentRecord.set('form', form);
			currentRecord.set('text', form[Formpod.FormTypes[engine.name].displayProperty]);
			currentRecord.endEdit();
			store.sync();
		}

		if (currentRecord) {
			var formData = currentRecord.get('form');
			var engine = formData.engineClass;
			engine.scrollFormToTop();
		}
	},

	cancelDeviceData : function() {
		var currentRecord = this.getCurrentRecord();
		if (currentRecord) {
			var formData = currentRecord.get('form');
			data = formData;
			var engine = formData.engineClass;
			engine.resetForm();
			engine.loadForm(data);

			var formData = currentRecord.get('form');
			var engine = formData.engineClass;
			engine.scrollFormToTop();
		}
	}
})