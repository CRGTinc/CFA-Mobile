Ext.define("cfa.helper.PhoneGapHelper", {
	singleton : true,
	alias : 'cfa.helper.PhoneGapHelper',
	config : {
	},
	/*Begin Device wrapper*/
	isOnLine : function() {
		return navigator.onLine;
	},
	/*End Device wrapper*/
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
	/*End Connection wrapper*/


	/*Begining of save file*/
	saveFile : function(jsonString, filename, callback, scope) {
		var me = this;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			fileSystem.root.getFile(filename, {
				create : true,
				exclusive : false
			}, function(fileEntry) {
				fileEntry.createWriter(function(writer) {
					writer.onwrite = function(evt) {
						if ( typeof callback == 'function') {
							Ext.callback(callback, scope || me);
						}
					};

					writer.write(jsonString);
				}, me.failOnSaveFile);
			}, me.failOnSaveFile);
		}, me.failOnSaveFile);
	},
	/*End of save file*/
	
	/*Fail on save file*/
	failOnSaveFile : function(error) {
		console.log(error.code);
	},
}); 