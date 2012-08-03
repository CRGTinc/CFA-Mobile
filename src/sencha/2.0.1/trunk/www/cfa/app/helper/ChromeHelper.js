Ext.define("cfa.helper.ChromeHelper", {
	singleton : true,
	alias : 'cfa.helper.ChromeHelper',
	config : {},
	/* Begin Device wrapper */
	isOnLine : function() {
		return true;
	},
	/* End Device wrapper */
	checkConnection : function() {
		return "";
	},
	/* End Connection wrapper */
	requestFileSystem : function(type, size, successCallBack, failCallBack){
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		requestFileSystem(type, size,successCallBack, failCallBack );
	},
	/* Begining of save file */
	saveFile : function(jsonString, filename, callback, scope) {
		var me = this;
		me.requestFileSystem(window.PERSISTENT, 0, function(
				fileSystem) {
			fileSystem.root.getFile(filename, {
						create : true,
						exclusive : false
					}, function(fileEntry) {
						fileEntry.createWriter(function(writer) {
									writer.onwriteend = function(evt) {
										if (typeof callback == 'function') {
											callback(fileEntry.toURL());
										}
									};
									if (!window.BlobBuilder && window.WebKitBlobBuilder)
    									window.BlobBuilder = window.WebKitBlobBuilder;
									var bb = new window.BlobBuilder(); 
									bb.append(jsonString);
									writer.write(bb.getBlob('text/plain'));
								}, me.failOnSaveFile);
					}, me.failOnSaveFile);
		}, me.failOnSaveFile);
	},
	/* End of save file */

	/* Fail on save file */
	failOnSaveFile : function(error) {
		console.log(error.code);
	},

	/* File size validation */

	fileSizeValidation : function(filename) {
		var me = this;
		me.requestFileSystem(window.PERSISTENT, 0, function(
						fileSystem) {
					fileSystem.root.getFile(filename, {
								create : false,
								exclusive : false
							}, function(fileEntry) {
								fileEntry.file(function(file) {
											if (file.size > (1024 * 10000)) {
												return false;
											}
										}, me.failOnSaveFile);
							}, me.failOnSaveFile);
				}, me.failOnSaveFile);
		return true;
	},

	loadImportedData : function(successCallBack, failCallBack) {
		var me = this;
		var result = "[";
		var fail = function(error) {
			console.log(error);
			failCallBack(error);
		}

		var onFileSystemSuccess = function(fileSytem) {
			var importDataPath = "/";
			fileSytem.root.getDirectory(importDataPath, {
						create : false
					}, function(directory) {
						var directoryReader = directory.createReader();
						directoryReader.readEntries(function(entries) {
									for (var i = 0; i < entries.length; i++) {
										if (entries[i].isFile) {
											var data = "";
											if (entries[i].name.toUpperCase().indexOf('CFADATA') > -1) {
												if (entries[i].name.toUpperCase().indexOf('CASE') === 0) {
													data += '{"type": "Case",';
												} else {
													data += '{"type": "Device",';
												}
												data += '"name": "' + entries[i].name + '",';
												data += '"fullPath":"' + entries[i].fullPath + '"}';
												result += data + ",";
											}
										}
									}
									if (result[result.length - 1] == ',') {
										result = result.slice(0, -1) + "]";
									}else{
										result += "]";
									}
									successCallBack(result);
								}, fail)
					}, fail);

		}

		me.requestFileSystem(window.PERSISTENT, 0, onFileSystemSuccess, fail);
	},
	
	loadDownloadedDocuments : function(successCallBack, failCallBack) {
		var me = this;
		var result = "[";
		var fail = function(error) {
			console.log(error);
			failCallBack(error);
		}

		var onFileSystemSuccess = function(fileSytem) {
			var importDataPath = "/";
			fileSytem.root.getDirectory(importDataPath, {
						create : false
					}, function(directory) {
						var directoryReader = directory.createReader();
						directoryReader.readEntries(function(entries) {
									for (var i = 0; i < entries.length; i++) {
										if (entries[i].isFile) {
											var data = "";
											if (entries[i].name.toUpperCase().indexOf('PDF') > -1) {
												data += '{"type": "DOCUMENT",';
												data += '"name": "' + entries[i].name + '",';
												data += '"fullPath":"' + entries[i].fullPath + '"}';
												result += data + ",";
											}
										}
									}
									if (result[result.length - 1] == ',') {
										result = result.slice(0, -1) + "]";
									}else{
										result += "]";
									}
									successCallBack(result);
								}, fail)
					}, fail);

		}

		me.requestFileSystem(window.PERSISTENT, 0, onFileSystemSuccess, fail);
	},
	
	getImagesByFormId : function(formId, successCallBack, failCallBack) {
		var me = this;
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
									successCallBack(entries);
								}, fail)
					}, fail);

		}

		me.requestFileSystem(window.PERSISTENT, 0,
				onFileSystemSuccess, fail);
	},
	
	getJsonStringFromImages : function(formId,newFormId, successCallBack, failCallBack) {
		var me = this;	
		var fail = function(error) {
			console.log(error);
			if (typeof failCallBack == 'function') {
				failCallBack(error);
			}

		}
		
		
		me.getImagesByFormId(formId, function(objs) {
					var length = objs.length;
					var obj;
					var result = "[";
					var apply = function(index) {
						if (index < length) {
							obj = objs[index];
							obj.file(function(file) {
										var reader = new FileReader();
										reader.onloadend = function(evt) {
											result += '{"name": "' + obj.name
													+ '",';
											result += '"formId": "' + newFormId
													+ '",';
											result += '"data": "'
													+ evt.target.result + '"},';
											index++;
											apply(index);
										};
										reader.readAsText(file);
									}, fail);
						} else {
							if (result[result.length - 1] == ',') {
								result = result.slice(0, -1) + "]";
							} else {
								result += "]";
							}
							if (typeof successCallBack == 'function') {
								successCallBack(result);
							}
						}
					}
					apply(0);
				}, fail);
	},
	
	addImageByFullPath : function(formId, imageData, success, failCallBack) {
		var me = this;
		
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
				console.log('error write');
			}
			
			if (!window.BlobBuilder && window.WebKitBlobBuilder)
				window.BlobBuilder = window.WebKitBlobBuilder;
			var bb = new window.BlobBuilder();
			bb.append(imageData);
			writer.write(bb.getBlob('text/plain'));
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
		
		me.requestFileSystem(window.PERSISTENT, 0,
				onFileSystemSuccess, fail);
	},
	
	saveImagesByJsonObjs: function(objArray,successCallBack,failCallBack){
		var data = objArray;
		var length = data.length;
		var me = this;	
		var fail = function(error) {
			console.log(error);
			if (typeof failCallBack == 'function') {
				failCallBack(error);
			}
		}
		var saveData = function(index) {
			if (index < length) {
				obj = data[index];
				me.addImageByFullPath(obj.formId,obj.data,function(){
					index++;
					saveData(index);
				},fail)
			} else {
				if (typeof successCallBack == 'function') {
					successCallBack();
				}
			}
		};
		saveData(0);
	},
	
	getFileData : function(path, callback) {
		var onFail = function(error) {
			console.log('Get file data error: ' + error.code);
		}

		var onFileSystemSuccess = function(fileSystem) {
			fileSystem.root.getFile(path, {	create : false},
					function(fileEntry) {
						fileEntry.file(
							function(file) {
							var reader = new FileReader();
								reader.onloadend = function(evt) {
									if (typeof callback == 'function') {
										callback(evt.target.result);
									}
								};
								reader.readAsText(file);
							});
					}, onFail)
		}

		window.requestFileSystem(window.PERSISTENT, 0,	onFileSystemSuccess, onFail);
	},
	
	saveDropFile: function(name, data, callback) {
		var me = this;
		var onFail = function(error) {
			console.log('Get file data error: ' + error.code);
		}

		var onFileSystemSuccess = function(fileSystem) {
			fileSystem.root.getFile(name, {create : true},
				function(fileEntry) {
					fileEntry.createWriter(function(writer) {
						writer.onwriteend = function(evt) {
							if (typeof callback == 'function') {
								callback(fileEntry.fullPath);
							}
						};
						
						if (!window.BlobBuilder && window.WebKitBlobBuilder)
							window.BlobBuilder = window.WebKitBlobBuilder;
							
						var bb = new window.BlobBuilder();
						bb.append(data);
						writer.write(bb.getBlob('text/plain'));
					}, onFail);
				}, onFail);
		};
		
		me.requestFileSystem(window.PERSISTENT, 0,	onFileSystemSuccess, onFail);
	},
	
	decodeBase64: function(string) {
		return atob(string);
	},
	
	
	downloadFile: function( fileName, url, callback) {
		
	},
	
	deleteFile: function(path) {
		var me = this;
		var onFail = function(error) {
			console.log('Delete file error: ' + error.code);
		}
		
		var onFileSystemSuccess =  function(fileSystem) {
			fileSystem.root.getFile(path, {create: false}, 
				function(fileEntry) {
					fileEntry.remove(
						function(){
							console.log("File deleted");
						}, 						
						function(error){
							console.log("File delete error: " + error);
						});
				}, onFail)
		}
		
		me.requestFileSystem(window.PERSISTENT, 0,	onFileSystemSuccess, onFail);
	}
});
