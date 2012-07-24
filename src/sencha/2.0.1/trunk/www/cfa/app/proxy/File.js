Ext.define('cfa.proxy.File', {
	extend : 'Ext.data.proxy.Client',

	alias : 'proxy.file',

	alternateClassName : 'cfa.data.FileProxy',

	config : {
		formId : null
	},

	constructor : function(config) {
		this.callParent(arguments);
	},
	
	//inherit docs
    create: function (operation, callback, scope) {
        var records = operation.getRecords();
        operation.setStarted();
        this.setRecord(records, function () {
            operation.setCompleted();
            operation.setSuccessful();

            if (typeof callback == 'function') {
                callback.call(scope || this, operation);
            }
        });
    },

	// inherit docs
	read : function(operation, callback, scope) {
		var records = [], me = this, data = {}, Model = this.getModel(), params = operation
				.getParams()
				|| {}, record;

		// read a single record
		var formId = this.getFormId();
		if (formId) {
			me.getImagesByFormId(formId, function(objs) {
						me.applyDataToModels(objs, Model, function(records) {
									me.completeRead(operation, callback, scope,
											records);
								});
					}, function(error) {
						console.log(error)
					});
		}

		operation.setSuccessful();
	},
	
	 //inherit docs
    update: function (operation, callback, scope) {
        var records = operation.getRecords();
        operation.setStarted();
        this.setRecord(records, function () {
            operation.setCompleted();
            operation.setSuccessful();

            if (typeof callback == 'function') {
                callback.call(scope || this, operation);
            }
        });
    },

    //inherit
    destroy: function (operation, callback, scope) {
        var records = operation.getRecords();
        this.removeRecord(records, function () {
            operation.setCompleted();
            operation.setSuccessful();

            if (typeof callback == 'function') {
                callback.call(scope || this, operation);
            }
        });
    },

	/**
	 * Destroys all records stored in the proxy and removes all keys and values
	 * used to support the proxy from the storage object.
	 */
	clear : function() {
		var me = this;

		var success = function() {
			console.log("remove successfully");
		}
		var fail = function(error) {
			console.log(error);
		}
		me.deleteAllImagesByFormId(formId, success, fail);
	},
	
	/**/

	getRecord : function(id) {
		return null;
	},

	/**
	 * Saves the given record in the Proxy. Runs each field's encode function
	 * (if present) to encode the data.
	 * 
	 * @param {Ext.data.Model}
	 *            record The model instance
	 * @param {String}
	 *            [id] The id to save the record under (defaults to the value of
	 *            the record's getId() function)
	 */

	setRecord : function(records, callback) {
		var me = this;
		var length = records.length;
		var record;
		var rawData;
		var data;
		var formId = this
				.getFormId();

		var fail = function(error) {
			console.log(error);
		};

		var setData = function(index) {
			if (index < length) {
				record = records[index];
				data = record.getData();
				me.addImageByFullPath(formId, data.srcImage, function() {
							index++;
							setData(index);
						}, fail);
			} else {
				if (typeof callback == 'function') {
					callback();
				}
			}

		};
		
		setData(0);
	},

	removeRecord : function(records, callback, scope) {
		var i = 0;
		var formId = this.getFormId();
		var length = records.length;
		var me = this;

		var fail = function(error) {
			console.log(error);
		}

		var remove = function(index) {
			if (index < length) {
				me.deleteImageByFullPath(formId,
						records[index].getData().fullPath, function() {
							index++;
							remove(index);
						}, fail);

			} else {
				if (typeof callback == 'function') {
					callback.call(scope || this);
				}
			}
		}
		remove(0);
	},

	applyDataToModels : function(objs, Model, callback) {
		if (!objs || objs == undefined) {
			objs = [];
		}
		var records = [], data = {}, length = objs.length, i = 0, obj, engine, formId = this
				.getFormId();

		var fail = function(error) {
			console.log(error);
			failCallBack(error);
		}

		var apply = function(index) {
			if (index < length) {
				obj = objs[index];
				data['formId'] = formId;
				data['fullPath'] = obj.fullPath;
				obj.file(function(file) {
							var reader = new FileReader();
							reader.onloadend = function(evt) {
								data['srcImage'] = evt.target.result;
								index++;
								record = new Model(data, index);
								records.push(record);
								apply(index);
							};
							reader.readAsText(file);
						}, fail);
			} else {
				if (typeof callback == 'function') {
					callback(records);
				}
			}
		}

		apply(0);
	},

	// Phonegap Helper
	getImagesByFormId : function(formId, success, failCallBack) {
		var fail = function(error) {
			console.log(error);
			failCallBack(error);
		}

		var onFileSystemSuccess = function(fileSytem) {
			var imagePath = "/images/";
			fileSytem.root.getDirectory(imagePath, {
						create : true
					});
			imagePath = imagePath + formId;
			fileSytem.root.getDirectory(imagePath, {
						create : true
					}, function(parent) {
						var directoryReader = parent.createReader();
						directoryReader.readEntries(function(entries) {
									success(entries);
								}, fail)
					}, fail);

		}

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				onFileSystemSuccess, fail);
	},

	deleteAllImagesByFormId : function(formId, success, failCallBack) {
		var imagePath = "/images/" + formId;

		var fail = function(error) {
			console.log(error);
			failCallBack(error);
		}

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(
						fileSys) {
					fileSys.root.getDirectory(imagePath, {
								create : false,
								exclusive : false
							}, function(directory) {
								directory.removeRecursively(success, fail);
							}, fail);
				}, fail);
	},

	deleteImageByFullPath : function(formId, fullPath, success, failCallBack) {
		var fail = function(error) {
			console.log(error);
			failCallBack(error);
		}

		var onFileSystemSuccess = function(fileSytem) {
			var imagePath = "/images/";
			fileSytem.root.getDirectory(imagePath, {
						create : false
					});
			imagePath = imagePath + formId;
			fileSytem.root.getDirectory(imagePath, {
						create : false
					}, function(directory) {
						var directoryReader = directory.createReader();
						directoryReader.readEntries(function(entries) {

									var i;
									for (i = 0; i < entries.length; i++) {
										if (entries[i].fullPath == fullPath) {
											entries[i].remove();
											success();
											break;
										}
									}
								}, fail)
					}, fail);

		}

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				onFileSystemSuccess, fail);
	},
	addImageByFullPath : function(formId, imageData, success, failCallBack) {
		var fail = function(error) {
			console.log(error);
			failCallBack(error);
		}

		var gotFileEntry = function(fileEntry) {
		
			fileEntry.createWriter(gotFileWriter, fail);
		}

		var gotFileWriter = function(writer) {
			writer.onwrite = function(evt) {
				success();
			};
			writer.onError = function(){
				
			}
			writer.write(imageData);
		}

		var onFileSystemSuccess = function(fileSytem) {
		
			var imagePath = "/images/";
			fileSytem.root.getDirectory(imagePath, {
						create : true
					});
			imagePath = imagePath + formId;
			fileSytem.root.getDirectory(imagePath, {
						create : true
					}, function(parent) {
						var fileName = "" + new Date().getTime() + ".cfaimage";
						parent.getFile( fileName,{
									create : true
								}, gotFileEntry, fail);
					}, fail);
		}
		
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				onFileSystemSuccess, fail);
	},

	completeRead : function(operation, callback, scope, records) {
		operation.setCompleted();
		operation.setResultSet(Ext.create('Ext.data.ResultSet', {
					records : records,
					total : records.length,
					loaded : true
				}));
		operation.setRecords(records);

		if (typeof callback == 'function') {
			callback.call(scope || this, operation);
		}
	}

});
