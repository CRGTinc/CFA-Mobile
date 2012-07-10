Ext.define("cfa.helper.PhoneGapHelper", {
	singleton : true,
	alias : 'cfa.helper.PhoneGapHelper',
	config : {},
	/* Begin Device wrapper */
	isOnLine : function() {
		return navigator.onLine;
	},
	/* End Device wrapper */
	checkConnection : function() {
		var networkState = navigator.network.connection.type;

		var states = {};
		states[Connection.UNKNOWN] = 'UNKNOWN';
		states[Connection.ETHERNET] = 'ETHERNET';
		states[Connection.WIFI] = 'WIFI';
		states[Connection.CELL_2G] = 'CELL_2G';
		states[Connection.CELL_3G] = 'CELL_3G';
		states[Connection.CELL_4G] = 'CELL_4G';
		states[Connection.NONE] = 'NONE';

		alert('Connection type: ' + states[networkState]);
		return states[networkState];
	},
	/* End Connection wrapper */

	/* Begining of save file */
	saveFile : function(jsonString, filename, callback, scope) {
		var me = this;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(
				fileSystem) {
			fileSystem.root.getFile(filename, {
						create : true,
						exclusive : false
					}, function(fileEntry) {
						fileEntry.createWriter(function(writer) {
									writer.onwrite = function(evt) {
										if (typeof callback == 'function') {
											Ext.callback(callback, scope || me);
										}
									};

									writer.write(jsonString);
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
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(
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
		var result = "[";
		var fail = function(error) {
			console.log(error);
			failCallBack(error);
		}

		var onFileSystemSuccess = function(fileSytem) {
			var importDataPath = "/importData/";
			fileSytem.root.getDirectory(importDataPath, {
						create : true
					});
			fileSytem.root.getDirectory(importDataPath, {
						create : true
					}, function(directory) {
						var directoryReader = directory.createReader();
						directoryReader.readEntries(function(entries) {
							console.log("Entries length "  + entries.length);
									for (var i = 0; i < entries.length; i++) {
										console.log("Entries length "  + entries.length);
										if (entries[i].isFile) {
											var data = "";
											if (entries[i].name.toUpperCase()
													.indexOf('CASE') === 0) {
												data += '{"type": "Case",';
											} else {
												data += '{"type": "Device",';
											}
											data += '"name": "'
													+ entries[i].name + '",';
											data += '"fullPath":"'
													+ entries[i].fullPath
													+ '"}';
											result += data + ",";
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

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				onFileSystemSuccess, fail);
	}
});
