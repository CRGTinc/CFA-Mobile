Ext.define('cfa.controller.search.SearchController', {
	extend : 'Ext.app.Controller',
	requires : ['cfa.view.search.SearchView', 'cfa.model.SearchTemplate', 'cfa.view.search.DeviceEditor', 'cfa.view.search.SearchResultList', 'cfa.view.search.AllDeviceView'],

	config : {
		routes : {
			'search' : 'showReportPage'
		},

		refs : {
			main : 'main',
			searchView : 'searchview',
			allDeviceView : 'alldeviceview',
			searchTemplateList : 'list[id = "searchtemplatelist"]',
			resultList : 'list[id = "resultlist"]',
			searchInputField : 'searchfield[id = "searchinputfield"]',
			onSaveDeviceButtonClick : 'button[action=savedevicedata]',
			onCancelDeviceButtonClick : 'button[action=canceldevicedata]',
			onExportDeviceDataClick : 'button[action=exportdevicedata]',
			onResetSelectionClick : 'button[action=resetselection]',
			onDeleleDeviceClick : 'button[action=deletedevicedata]'
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
				'pop' : 'onPop',
				'back' : 'onBack',
			},

			allDeviceView : {
				'activeitemchange' : 'onActiveItemChange'
			},

			onSaveDeviceButtonClick : {
				'tap' : 'saveDeviceData'
			},

			onCancelDeviceButtonClick : {
				'tap' : 'cancelDeviceData'
			},

			onExportDeviceDataClick : {
				'tap' : 'exportDeviceData'
			},

			onResetSelectionClick : {
				'tap' : 'resetSelection'
			},

			onDeleleDeviceClick : {
				'tap' : 'deleteDeviceData'
			}

		},

		currentRecord : null,
		currentView : '',
		currentListView : '',
		resultListView : null
	},

	showReportPage : function() {
		var reportView = Ext.create('cfa.view.search.SearchView');
		this.getMain().push(reportView);
		this.setCurrentView('SearchTemplate');
	},

	launch : function() {
		Ext.getStore('SearchTemplates').load();
	},

	activateSearchTemplateList : function() {
		this.getSearchTemplateList().deselectAll();
		this.getSearchTemplateList().getStore().clearFilter(false);
	},

	searchByTemplate : function(list, record, opt) {

		var listener = {
			disclose : {
				fn : this.onResultsListItemDisclosure,
				scope : this
			},
		};

		if (record.getData().queryParam == 'all') {

			var deviceStore = Ext.create('cfa.store.SearchCases', {
				queryType : 'class',
				queryParam : 'System'
			}).load();

			var storageStore = Ext.create('cfa.store.SearchCases', {
				queryType : 'class',
				queryParam : 'Storage'
			}).load();

			var mediaStore = Ext.create('cfa.store.SearchCases', {
				queryType : 'class',
				queryParam : 'Media'
			}).load();

			var mobileStore = Ext.create('cfa.store.SearchCases', {
				queryType : 'class',
				queryParam : 'Mobile'
			}).load();

			this.setResultListView(Ext.create('cfa.view.search.AllDeviceView'));
			this.getResultListView().getComponent('devicelistview').getComponent('resultlist').setStore(deviceStore);
			this.getResultListView().getComponent('storagelistview').getComponent('resultlist').setStore(storageStore);
			this.getResultListView().getComponent('medialistview').getComponent('resultlist').setStore(mediaStore);
			this.getResultListView().getComponent('mobilelistview').getComponent('resultlist').setStore(mobileStore);

			this.getResultListView().getComponent('devicelistview').getComponent('resultlist').setListeners(listener);
			this.getResultListView().getComponent('storagelistview').getComponent('resultlist').setListeners(listener);
			this.getResultListView().getComponent('medialistview').getComponent('resultlist').setListeners(listener);
			this.getResultListView().getComponent('mobilelistview').getComponent('resultlist').setListeners(listener);

			this.setCurrentView('AllDeviceView');
			this.setCurrentListView('devicelistview');

		} else {
			var store = Ext.create('cfa.store.SearchCases', {
				queryType : record.getData().queryType,
				queryParam : record.getData().queryParam
			}).load();

			this.getResultListView().getComponent('resultlist').setStore(store);
			this.getResultListView().getComponent('resultlist').setListeners(listener);
			this.setCurrentView('ResultList');
		}

		this.getSearchInputField().setValue('');
		this.getSearchView().push(this.getResultListView());

	},

	setFilterByKey : function(field, event, opts) {
		var store;

		if (this.getResultListView()) {
			store = this.getResultListView().getComponent('resultlist').getStore();
		} else {
			store = this.getSearchTemplateList().getStore();
		}

		store.clearFilter(false);
		if (field.getValue() && field.getValue() != '') {
			if (this.getResultListView()) {
				store.filterBy(function(record) {
					var found = false;
					var formdata = record.getData().form;
					for (key in formdata) {

						if ( typeof formdata[key] == 'string') {

							if (formdata[key].toLowerCase().indexOf(field.getValue().toLowerCase()) > -1) {
								found = true;
							}

						} else if ( typeof formdata[key] == 'object') {
							if (key != 'engineClass' && key != 'prototype') {
								if (formdata[key] instanceof Date) {
									if (formdata[key].toString().indexOf(field.getValue()) > -1)
										found = true;
								}
							}
						}
					}

					if (found) {
						return record;
					}
				});
			} else {
				store.filter('text', field.getValue(), false, false);
			}

		}
	},

	onResultsListItemDisclosure : function(list, record, target, index, event, eOpts) {
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
		this.setCurrentView('DeviceEditor');
	},

	onPop : function(navigation, view, eOpts) {
		if (view.getId() == 'deviceeditor') {
			view.getComponent('editorpanel').removeAll(false);
			if (this.getCurrentView() == 'ResultList') {
				this.getResultListView().getComponent('resultlist').deselectAll();
			} else if (this.getCurrentView() == 'AllDeviceView') {
				this.getResultListView().getComponent(this.getCurrentListView()).getComponent('resultlist').deselectAll();
			}

		} else {
			this.setResultListView(null);
		}

		view.destroy();
	},

	onActiveItemChange : function(view, value, oldValue, eOpts) {
		this.setCurrentListView(value.getItemId());
	},

	saveDeviceData : function() {
		var currentRecord = this.getCurrentRecord(),
			store;

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
			
			if (this.getCurrentView() == 'AllDeviceView') {
				store = this.getResultListView().getComponent(this.getCurrentListView()).getComponent('resultlist').getStore();
			} else {
				store = this.getResultListView().getComponent('resultlist').getStore();
			}
			
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
	},

	onBack : function() {
		if (this.getCurrentView() == 'DeviceEditor') {
			var currentRecord = this.getCurrentRecord();
			var changed = false;

			if (currentRecord) {
				var currentData = currentRecord.getData().form;
				var engine = currentData.engineClass, formData = engine.getFormObject();

				for (key in formData) {
					if (formData[key] == '' && currentData[key] == null)
						continue;

					if (formData[key] == null && currentData[key] == '')
						continue;

					if (formData[key] != currentData[key]) {
						changed = true;
						break;
					}
				}
			}

			if (changed) {
				Ext.Msg.confirm("Data Changed", "Do you want to save changes before adding new data?", this.confirmFormChanged, this);
			}
		}

		if (this.getCurrentView() == 'DeviceEditor') {
			
			if (this.getCurrentListView())
				this.setCurrentView('AllDeviceView');
			else 
				this.setCurrentView('ResultList')
				
		} else if (this.getCurrentView() == 'ResultList') {
			this.setCurrentView('SearchTemplate');
		}
	},

	confirmFormChanged : function(button) {
		if (button == 'yes') {
			if (!this.saveDeviceData()) {
				return;
			}
		}
	},

	resetSelection : function() {
		if (this.getCurrentView() == 'ResultList')
			this.getResultListView().getComponent('resultlist').deselectAll();
		else
			this.getResultListView().getComponent(this.getCurrentListView()).getComponent('resultlist').deselectAll();
	},

	exportDeviceData : function() {
		if (Ext.os.is.Desktop) {
			Ext.Msg.alert("Export Data", "Currently support only for iPad.");
		} else {
			var me = this;
			var selectedItems;
			var filename = Ext.util.Format.date(new Date(), 'Ymd');
			
			if (this.getCurrentView() == 'AllDeviceView') {
				selectedItems = this.getResultListView().getComponent(this.getCurrentListView()).getComponent('resultlist').getSelection();
			} else {
				selectedItems = this.getResultListView().getComponent('resultlist').getSelection();
			}

			if (!(selectedItems && selectedItems.length > 0)) {
				Ext.Msg.alert("Export Data", "Please select item(s) you want to export first.");
				return;
			}
			
			var actionSheet = Ext.create('Ext.ActionSheet', {
				modal : false,
				left : "60%",
				right : "20%",
				bottom : "6%",
				items : [{
					text : 'Via email',
					handler : function() {
						var jsonArray = '[', i, count = 0, ids = '';

						for ( i = 0; i < selectedItems.length; i++) {
							ids = i + '-' + selectedItems[i].getData().form.id;

							Formpod.exportData(selectedItems[i].getData().form, function(jsonString) {
								jsonArray = jsonArray + jsonString + ',';
								count++;

								if (count == (selectedItems.length)) {
									filename = filename + '-' + ids + ".cfadata";

									if (jsonArray[jsonArray.length - 1] == ',') {
										jsonArray = jsonArray.slice(0, -1);
									}

									jsonArray = jsonArray + ']';
									cfa.helper.PhoneGapHelper.saveFile(jsonArray, filename, function() {
										window.plugins.emailComposer.showEmailComposer("CFA Data", null, filename, null, null, null, null);
									});
								}

							});
						}
						actionSheet.hide();
					}
				}, {
					text : 'To iTunes',
					handler : function() {
						var jsonArray = '[', i, count = 0, ids = '';
						for ( i = 0; i < selectedItems.length; i++) {
							ids = i + '-' + selectedItems[i].getData().form.id;
							Formpod.exportData(selectedItems[i].getData().form, function(jsonString) {
								jsonArray = jsonArray.concat(jsonString + ',');

								count++;
								if (count == (selectedItems.length)) {
									filename = filename + '-' + ids + ".cfadata";

									if (jsonArray[jsonArray.length - 1] == ',') {
										jsonArray = jsonArray.slice(0, -1);
									}

									jsonArray = jsonArray + ']';
									cfa.helper.PhoneGapHelper.saveFile(jsonArray, filename, function() {
										Ext.Msg.alert("Export Data", "Data has been exported successfully.");
									});
								}

							});
						}
						actionSheet.hide();
					}
				}, {
					text : 'Cancel',
					ui : 'confirm',
					handler : function() {
						actionSheet.hide();
					}
				}]
			});

			Ext.Viewport.add(actionSheet);
			actionSheet.show();
		}
	},

	deleteDeviceData : function() {
		var selectedItems;

		if (this.getCurrentView() == 'AllDeviceView') {
			selectedItems = this.getResultListView().getComponent(this.getCurrentListView()).getComponent('resultlist').getSelection();
		} else {
			selectedItems = this.getResultListView().getComponent('resultlist').getSelection();
		}

		if (selectedItems && selectedItems.length > 0) {
			Ext.Msg.confirm("Delete Data", "Do you want to delete this data?", this.confirmDeleteData, this);
		} else {
			Ext.Msg.alert("Export Data", "Please select item(s) you want to delete first.");
		}
	},

	confirmDeleteData : function(button) {
		if (button == 'yes') {
			var selectedItems, store;
			
			if (this.getCurrentView() == 'AllDeviceView') {
				selectedItems = this.getResultListView().getComponent(this.getCurrentListView()).getComponent('resultlist').getSelection();
				store = this.getResultListView().getComponent(this.getCurrentListView()).getComponent('resultlist').getStore();
			} else {
				selectedItems = this.getResultListView().getComponent('resultlist').getSelection();
				store = this.getResultListView().getComponent('resultlist').getStore();
			}
			
			
			for (var i = 0; i < selectedItems.length; i++) {
				store.remove(selectedItems[i]);
				store.sync();
			}
		}
	}
})