Ext.define('cfa.controller.search.SearchController', {
	extend : 'Ext.app.Controller',
	requires : ['cfa.view.search.SearchView', 'cfa.model.SearchTemplate', 'cfa.view.search.DeviceEditor', 'cfa.view.search.SearchResultList', 'cfa.view.search.NotesReportView'],

	config : {
		routes : {
			'search' : 'showReportPage'
		},

		refs : {
			main : 'main',
			searchView : 'searchview',
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

			main : {
				beforepopcommand : 'onMainBack',
			},

			searchTemplateList : {
				'activate' : 'activateSearchTemplateList',
				'select' : 'searchByTemplate'
			},

			searchInputField : {
				'keyup' : 'setFilterByKey'
			},

			searchView : {
				'pop' : 'onPop',
				'back' : 'onBack'
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
		resultListView : null,
		currentList : '',
		currentActionSheet : null
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
			}
		};

		var store = Ext.create('cfa.store.SearchCases', {
			queryType : record.getData().queryType,
			queryParam : record.getData().queryParam
		}).load();

		this.setResultListView(Ext.create('cfa.view.search.SearchResultList'));
		this.getResultListView().getComponent('resultlist').setStore(store);
		this.getResultListView().getComponent('resultlist').setListeners(listener);
		this.setCurrentView('ResultList');
		if (record.getData().queryParam != 'Case Form') {
			this.setCurrentList('DeviceList');
		} else {
			this.setCurrentList('CaseList');
			this.getResultListView().getComponent('actionbar').hide();
			this.getResultListView().getComponent('resultlist').setMode('SINGLE');
		}

		this.getSearchInputField().show();
		this.getSearchInputField().setValue('');
		this.getSearchView().push(this.getResultListView());

	},

	setFilterByKey : function(field, event, opts) {
		var store;

		if (this.getResultListView()) {
			store = this.getResultListView().getComponent('resultlist').getStore();
		}

		store.clearFilter(false);
		if (field.getValue() && field.getValue() != '') {
			if (this.getResultListView()) {
				store.filterBy(function(record) {
					var temp = field.getValue().toLowerCase();
					var found = false;
					var formdata = record.getData().form;
					for (key in formdata) {

						if ( typeof formdata[key] == 'string') {
							if (formdata[key].trim() != 'N/A') {
								if (formdata[key].toLowerCase().indexOf(temp) > -1) {
									found = true;
								}
							}
						} else if ( typeof formdata[key] == 'object') {
							if (key != 'engineClass' && key != 'prototype') {
								if (formdata[key] instanceof Date) {
									if (formdata[key].toDateString().indexOf(temp) > -1)
										found = true;
								}
							}
						}
					}

					if (found) {
						return record;
					}
				});
			}
		}
	},

	onPop : function(navigation, view, eOpts) {
		if (view.getId() == 'deviceeditor') {
			view.getComponent('editorpanel').removeAll(false);
			if (this.getCurrentView() == 'ResultList')
				this.getResultListView().getComponent('resultlist').deselectAll();
		} else {
			this.setResultListView(null);
		}

		view.destroy();
	},

	onMainBack : function() {
		if (this.getCurrentActionSheet()) {
			this.getCurrentActionSheet().hide();
		}
	},

	saveDeviceData : function() {
		if (this.formChanged()) {
			var currentRecord = this.getCurrentRecord(), store, me = this;

			if (currentRecord) {
				var view;
				if (this.getCurrentView() == 'DeviceEditor') {
					view = this.getSearchView().getComponent('deviceeditor')
				} else if (this.getCurrentView() == 'ResultList') {
					view = this.getResultListView();
				}

				if (view) {
					view.setMasked({
						xtype : 'loadmask',
						message : 'Saving...'
					});
				}

				var errors = currentRecord.validate();

				if (!errors.isValid()) {
					var errorString = '';
					Ext.each(errors.items, function(rec, i) {
						errorString += rec.getMessage() + "<br>";
					});
					Ext.Msg.alert('Save Data', errorString, Ext.emptyFn);
					return false;
				}

				store = this.getResultListView().getComponent('resultlist').getStore();

				var form = currentRecord.get('form'), engine = form.engineClass;
				form = engine.getFormObject();
				currentRecord.beginEdit();
				currentRecord.set('form', form);
				currentRecord.set('text', form[Formpod.FormTypes[engine.name].displayProperty]);
				currentRecord.endEdit();

				store.sync({
					callback : function() {
						if (view) {
							view.unmask();
						}
						engine.scrollFormToTop();
						Ext.Msg.alert("Save Data", "Data saved successfully");
					}
				});
			}
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
			engine.scrollFormToTop();
		}
	},

	onBack : function() {
		if (this.getCurrentView() == 'DeviceEditor') {
			if (this.formChanged()) {
				Ext.Msg.confirm("Data Changed", "Do you want to save changes information?", this.confirmFormChanged, this);
			}
		}

		if (this.getCurrentView() == 'DeviceEditor' || this.getCurrentView() == 'NotesReport') {
			this.setCurrentView('ResultList')
			this.getResultListView().getComponent('resultlist').getStore().clearFilter(false);
			this.getSearchInputField().show();
		} else if (this.getCurrentView() == 'ResultList') {
			this.setCurrentView('SearchTemplate');
			this.getSearchInputField().hide();
		}

		if (this.getCurrentActionSheet()) {
			this.getCurrentActionSheet().hide();
		}
	},

	formChanged : function() {
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

				if ( typeof formData[key] == 'object') {
					if (formData[key] instanceof Date) {
						if ( typeof currentData[key] != 'undefined' && currentData[key] != null) {
							if (Ext.Date.format(formData[key], Formpod.dateFormat) != Ext.Date.format(currentData[key], Formpod.dateFormat))
								changed = true;
						} else {
							changed = true;
						}
					}
				} else if ( typeof formData[key] == 'string') {
					if (formData[key] != currentData[key]) {
						changed = true;
						break;
					}
				}
			}
		}

		return changed;
	},

	confirmFormChanged : function(button) {
		if (button == 'yes') {
			if (!this.saveDeviceData()) {
				return;
			}
		}
	},

	resetSelection : function() {
		this.getResultListView().getComponent('resultlist').deselectAll();
	},

	exportDeviceData : function() {
		if (Ext.os.is.Desktop) {
			Ext.Msg.alert("Export Data", "Currently support only for iPad.");
		} else {
			var me = this;
			var selectedItems;
			var filename = 'Device-' + Ext.util.Format.date(new Date(), 'Ymd');

			selectedItems = this.getResultListView().getComponent('resultlist').getSelection();

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
							ids = ids + '-' + selectedItems[i].getData().form.id;

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
							ids = ids + '-' + selectedItems[i].getData().form.id;
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
			this.setCurrentActionSheet(actionSheet);
		}
	},

	deleteDeviceData : function() {
		var selectedItems;

		selectedItems = this.getResultListView().getComponent('resultlist').getSelection();

		if (selectedItems && selectedItems.length > 0) {
			Ext.Msg.confirm("Delete Data", "Do you want to delete this data?", this.confirmDeleteData, this);
		} else {
			Ext.Msg.alert("Export Data", "Please select item(s) you want to delete first.");
		}
	},

	confirmDeleteData : function(button) {
		var selectedItems, store;
		if (button == 'yes') {
			selectedItems = this.getResultListView().getComponent('resultlist').getSelection();
			store = this.getResultListView().getComponent('resultlist').getStore();

			for (var i = 0; i < selectedItems.length; i++) {
				store.remove(selectedItems[i]);
				store.sync();
			}
		}
	},

	showNotesForCase : function(formData) {
		var me = this;
		this.setCurrentView("NotesView")
		var notesView = Ext.create('cfa.view.search.NotesReportView');

		var setView = function(formData, level) {
			for (var i = 0; i < formData.length; i++) {
				var view = Ext.create('Ext.form.FieldSet', {
					title : formData[i].data.name.replace(/"/g, ''),
					margin : '0 0 0 ' + level * 25,
					padding : 10
				});

				var notes = formData[i].data.values;
				view = me.createNotePanel(notes, view);

				notesView.add(view);

				if (formData[i].childs) {
					level++;
					setView(formData[i].childs, level);
				}
			}
		}
		setView(formData, 1);
		me.getSearchView().push(notesView);
	},

	createNotePanel : function(caseNotes, view) {
		var notesView = view;
		for (key in caseNotes) {
			var notesSection = {
				xtype : 'fieldset',
				title : key.replace(/"/g, ''),
				items : [{
					xtype : 'textareafield',
					readOnly : true,
					value : caseNotes[key]
				}]
			};
			notesView.add(notesSection);
		}
		return notesView;
	},

	onResultsListItemDisclosure : function(list, record, target, index, event, eOpts) {
		var me = this;
		this.setCurrentRecord(record);

		if (this.getCurrentList() == 'DeviceList') {
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
			this.getSearchInputField().hide();
		} else {
			me.getNotesForCase(this.getCurrentRecord().getData().form, function(formsArray) {
				var formData = [];
				formData.push(formsArray);
				me.showNotesForCase(formData);
			});
			this.setCurrentView('NotesReport');
			this.getSearchInputField().hide();
		}
	},

	getFormNotes : function(formData, callback) {
		var values = {};
		var formArray = {};
		for (key in formData) {
			if ( typeof formData[key] != 'object') {
				if (key.indexOf('Notes') > -1) {
					values['"' + this.getSectionNameForKey(key) + '"'] = formData[key];
				}
			}
		}
		formArray['data'] = {};

		formArray['data']['values'] = values;

		if (formData.engineClass.name == "Case Form") {
			formArray['data']['name'] = formData['CaseTitle'];
		} else if (formData.engineClass.name == "System" || formData.engineClass.name == "Storage" || formData.engineClass.name == "Media" || formData.engineClass.name == "Mobile") {
			formArray['data']['name'] = formData['DevName'];
		} else if (formData.engineClass.name == "Photo/Attachment") {
			formArray['data']['name'] = formData['AlbumName'];
		} else if (formData.engineClass.name == "Assistance Request Form") {
			formArray['data']['name'] = formData['ProsecutorName'];
		} else if (formData.engineClass.name == "Border Response Form") {
			formArray['data']['name'] = formData['SubjectName'];
		}

		if ( typeof callback === 'function') {
			callback(formArray);
		}
	},

	getSectionNameForKey : function(key) {
		if (key == 'GeneralNotes')
			return 'General';
		else if (key == 'OnsiteNotes')
			return 'Onsite';
		else if (key == 'CompletionNotes')
			return 'Completion';
		else if (key == 'SystemNotes')
			return 'System';
		else if (key == 'SeizureNotes')
			return 'Seizure';
		else if (key == 'SystemInformationNotes')
			return 'System Information';
		else if (key == 'StorageNotes')
			return 'Storage';
		else if (key == 'MediaNotes')
			return 'Media';
		else if (key == 'MobileNotes')
			return 'Mobile';
		else if (key == 'Notes')
			return 'Notes';
	},

	getNotesForCase : function(formData, callback) {
		var me = this;
		this.getFormNotes(formData, function(formArray) {
			Formpod.findRelatedObjectsWithType(formData, 'hasChild', true, function(objs) {
				var processed = 0, i;
				var length = objs.length;
				var childData = [];

				if (length > 0) {
					var getChildNodes = function(index) {
						if (index == length && typeof callback === 'function') {
							formArray['childs'] = childData;
							callback(formArray);
						} else {
							me.getNotesForCase(objs[index], function(childFormNotes) {
								childData.push(childFormNotes);
								index++;
								getChildNodes(index);

							});
						}
					}
					getChildNodes(0);
				}

				if (processed == length && typeof callback === 'function') {
					callback(formArray);
				}
			});
		});
	}
})