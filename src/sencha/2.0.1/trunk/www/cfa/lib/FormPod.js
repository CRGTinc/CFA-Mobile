/* 
  FormPod.js
  Object persistance for form creation and processing
  Copyright ©2012, DynAgility, LLC. All rights reserved.
  
*/

if (!window.openDatabase) {
	throw Error("Local Databases not supported.");
}

var Formpod = {
	FormEngine: {
		CodeGenerators: {
			Sencha: {
				generateForm: function(fields) {
					var n = 0;
					var fields = fields;
					var generateOneSenchaField = function() {
						var fitem;
						var finfo = fields[n];
	
						if (finfo.type == 'fieldset') {
							return generateSenchaFieldSet();
						}
						else if (finfo.type == 'endfieldset') {
							return null;
						}
						else if (finfo.type == 'selectfield') {
							fitem = {
								xtype: finfo.type,
								name: finfo.name,
								label: finfo.label,
								valueField: 'value',
								displayField: 'name',
								store: {
									data: finfo.value
								}
							};
						}
						else {
							fitem = {
								xtype: finfo.type,
								name: finfo.name,
								label: finfo.label,
								value: finfo.value,
								required: finfo.required
							};
						}

						return fitem;
					};
						
					var generateSenchaFieldSet = function() {
						var title = null;
						var instructions = null;
						var fitems = [];
						if (typeof fields[n].title !== 'undefined') {
							title = fields[n].title;
						}
						if (typeof fields[n].instructions !== 'undefined') {
							instructions = fields[n].instructions;
						}
						if (fields[n].type == 'fieldset') {
							//Step forward one for recursive calls.
							n++;
						}
						while (n < fields.length) {
							var item = generateOneSenchaField();
							if (item != null) {
								fitems.push(item);
							}
							else {
								break;
							}
							n++;
						}
						//build the fieldset object that wraps the items
						fieldSet = {
								xtype: 'fieldset',
								title: title,
								instructions: instructions,
								defaults: {
									required: true,
									labelAlign: 'left',
									labelWidth: '30%'
								},
								items: fitems
							};
						return fieldSet;					
					}
					
					var fitems = generateSenchaFieldSet();
				    var form = Ext.create ('Ext.form.Panel', {items: fitems});
					
				    return form;
				}, 
				getFormData: function(form) { return form.getValues(); },
				setFormData: function(form, obj) { form.setValues(obj); }
			},
			HTML: {
				generateForm: function(fields) { return null; }
			}
		}
	},
	FormTypes: {},
	init: function (formDefinitions, generator) {
		function FormClass(name, description, definition) {
			this.name = name;
			this.description = description;
			this.definition = definition;
			this.getInstance = function() {
				return Formpod.getInstance(this);
			};
			
			this.getSavedInstance = function(id, callback) {
				Formpod.getSavedInstance(this, id, callback);
			}
			this.getFormObject = function() {
				var obj = this.getInstance()
				var formObj = Formpod.generator.getFormData(this.getForm());
				if (typeof this.getForm().engineObjectId !== 'undefined') {
					obj.id = this.getForm().engineObjectId;
				}
				for (var attrName in formObj) {
					if (!formObj.hasOwnProperty(attrName)) continue;
					obj[attrName] = formObj[attrName];
				}
				return obj;
			}
			
			this.saveForm = function() {
				var obj = this.getFormObject();
				Formpod.saveInstance(obj);
			}
			
			this.loadForm = function(id) {
				var that = this;
				this.getSavedInstance(id, function(obj) { 
					Formpod.generator.setFormData(that.getForm(), obj); 
					if (typeof obj.id !== 'undefined') {
						that.getForm().engineObjectId = obj.id;
					}
				});
			}
			
			this.resetForm = function() {
				this.getForm().reset();
				delete this.getForm().engineObjectId;
			}
			
			this.getForm = function() {
				// Generate the code for the form specified in fdata. Returns various types depending
				// on the generator setting.
				if (typeof Formpod.generator === 'undefined' || Formpod.generator == null || typeof Formpod.generator.generateForm !== 'function') {
					throw Error("Form Generator not supported.");
				}	
				if (typeof this.form === 'undefined') {
					this.form = Formpod.generator.generateForm(this.definition);
				}
				return this.form;
			}
			return this;
		};
		var db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		var createDatabases = function () {
			db.transaction(function (t) {
				t.executeSql(
					"CREATE TABLE IF NOT EXISTS obj (" +
					" id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
					" class TEXT, " + 
					" version INTEGER NOT NULL DEFAULT 1)"
				);
				t.executeSql(
					"CREATE TABLE IF NOT EXISTS attr (" +
					" id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
					" objid INTEGER NOT NULL, " + 
					" name TEXT NOT NULL, value TEXT)"
				);
				t.executeSql(
					"CREATE TABLE IF NOT EXISTS rel (" +
					" id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
					" src INTEGER, dest INTEGER," + 
					" type TEXT)"
				);
			},
			function(e) { throw e }
			);
		};
		createDatabases();
		for (var idx in formDefinitions) {
			if (!formDefinitions.hasOwnProperty(idx)) continue;
			var def = formDefinitions[idx];
			this.FormTypes[def.formName] = new FormClass(def.formName, def.formDesc, def.formFields)
		}
		this.generator = generator;
	},
	getInstance: function(formClass) {
		if (typeof formClass === 'string') {
			formClass = this.FormTypes[formClass];
		}
		function FormInstance() {};
		if (typeof formClass.instance === 'undefined') {
			this.buildInstance(formClass);
		}
		var instance = new FormInstance();
		instance.prototype = formClass.instance;
		return instance;
	},
	getSavedInstance: function(formClass, id, callback) {
		if (typeof formClass === 'string') {
			formClass = this.FormTypes[formClass];
		}
		function FormInstance() {};
		var db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		var loadedObj = new FormInstance();
		if (typeof formClass.instance === 'undefined') {
			this.buildInstance(formClass);
		}
		loadedObj.prototype = formClass.instance;
		db.transaction(
			function (t) {
				t.executeSql("SELECT * FROM attr WHERE objid = ?", [id],
				function (t, rs) {
					for (var i = 0; i < rs.rows.length; i++) {
						var row = rs.rows.item(i);
						loadedObj[row.name] = row.value;
					}
					loadedObj.id = id;
				}
				);
			},
			null,
			function () {
				if (typeof callback === 'function')
				callback(loadedObj);
			}
		);
	},
	getMultipleInstances: function (formClass, ids, callback) {
		function FormInstance() {};
		var objectList = [];
		var db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		db.transaction(
			function (t) {
				for (var idx in ids) {
					if (!ids.hasOwnProperty(idx)) continue;
					var id = ids[idx];
					
					t.executeSql("SELECT * FROM attr WHERE objid = ?", [id],
					function (t, rs) {
						var loadedObj = new FormInstance();
						if (typeof formClass.instance === 'undefined') {
							Formpod.buildInstance(formClass);
						}
						loadedObj.prototype = formClass.instance;
						
						for (var i = 0; i < rs.rows.length; i++) {
							var row = rs.rows.item(i);
							loadedObj[row.name] = row.value;
							loadedObj.id = row.objid;
						}
						objectList.push(loadedObj);
					}
					);
				}
			},
			null,
			function () {
				if (typeof callback === 'function')
				callback(objectList);
			}
		);
	},
	saveInstance: function (o) {
		var insertClassAttrs = {};
		var modifyClassAttrs = {};
		var deleteClassAttrs = {};
		for (var attr in o) {
			if (typeof o[attr] !== 'function' && typeof o[attr] !== 'object') {
				insertClassAttrs[attr] = true;
			}
		}
		var db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		db.transaction(
			function (t) {
				if (typeof o.id !== "undefined") {
					t.executeSql("select name from attr where objid = ?", [o.id],
						function (t, rs) {
							for (var i = 0; i < rs.rows.length; i++) {
								var row = rs.rows.item(i);
								if (insertClassAttrs[row.name]) {
									insertClassAttrs[row.name] = false;
									modifyClassAttrs[row.name] = true;
								} else {
									deleteClassAttrs[row.name] = true;
								}
							}
							for (var attr in insertClassAttrs) {
								if (insertClassAttrs[attr] === true)
								t.executeSql("insert into attr(objid, name, value) values(?,?,?)", [o.id, attr, o[attr]]);
							};
							for (var attr in modifyClassAttrs) {
								if (modifyClassAttrs[attr] === true)
								t.executeSql("update attr set value=? where objid = ? and name = ?", [o[attr], o.id, attr]);
							}
							for (var attr in deleteClassAttrs) {
								if (deleteClassAttrs[attr] === true)
								t.executeSql("delete from attr where objid = ? and name = ?", [o.id, attr]);
							}
						}
					);
				} else {
					if (typeof o.engineClass === 'undefined') {
						o.engineClass = {name: "null"};
					}
					t.executeSql("insert into obj(class) values(?)", [o.engineClass.name], 
						function (t, rs) {
							o.id = rs.insertId;
							for (var attr in insertClassAttrs) {
								if (insertClassAttrs[attr] === true)
								t.executeSql("insert into attr(objid, name, value) values(?,?,?)", [o.id, attr, o[attr]]);
							};	
						}
					);
				}
			}
		); //Close transaction
	},
	relateObjects: function (src,dest,type) {
		if (typeof src.id === "undefined") {
			throw Error("relateObjects: Source object does not have an id. Save it first.")
		} else if (typeof dest.id === "undefined") {
			throw Error("relateObjects: Destination object does not have an id. Save it first.")
		}
		var db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		db.transaction( 
			function (t) {
				t.executeSql("INSERT INTO rel(src, dest, type) VALUES(?, ?, ?)", [src, dest, type]);
			}
		);
	},
	unrelateObjects: function (src,dest,type) {
		if (typeof src.id === "undefined") {
			throw Error("relateObjects: Source object does not have an id. Save it first.")
		} else if (typeof dest.id === "undefined") {
			throw Error("relateObjects: Destination object does not have an id. Save it first.")
		}
		var db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		db.transaction( 
			function (t) {
				t.executeSql("delete from rel where src = ? and dest = ?", [src, dest]);
			}
		);
	},
	deleteObject: function (o) {
		if (typeof o.id === "undefined") {
			throw "deleteObject: this object hasn't been saved yet. It cannot be deleted";
		}
   		var db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		db.transaction( function(t) {
			t.executeSql("delete from rel where src = ?", [o.id]);
			t.executeSql("delete from rel where dest = ?", [o.id]);
			t.executeSql("delete from attr where objid = ?", [o.id]);
			t.executeSql("delete from obj where id = ?", [o.id]);
		});//Close transaction
	},
	findObjectsByAttr: function(query, value, callback) {
		var objIds = [];
		var objects = [];
        var db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		db.transaction( 
			function(t) {
				t.executeSql("select objid from attr where name = ? and value = ?", [query, value],
							function(t, rs) {
								for (var row in rs.rows) ids.push(row.objid);
							}
				);
			},
			null, 
			function() { 
				this.getObjects(ids, callback);
			}	
		); //Close Transaction
	},
	findObjectsByClass: function(formClass, callback) {
		if (typeof formClass === 'string') {
			formClass = this.FormTypes[formClass];
		}
		var objIds = [];
		var objects = [];
		var db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		db.transaction( 
			function(t) {
				t.executeSql("select id from obj where class = ?", [formClass.name],
							function(t, rs) {
								for (var i = 0; i < rs.rows.length; i++) {
									var row = rs.rows.item(i);
									objIds.push(row.id);
								}
							}
				);
			},
			null, 
			function() { 
				Formpod.getMultipleInstances(formClass, objIds, callback);
			}	
		); //Close Transaction
	},
	findRelatedObjects: function(o, callback) {
		var objIds = [];
		var objects = [];
		if (typeof o.id !== 'number') {
			console.log("Formpod.FindRelatedObjects: The object provided has not been persisted.")
		}
        var db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		db.transaction( 
			function(t) {
				t.executeSql("select dest from rel where src = ?", [o.id],
							function(t, rs) {
								for (var row in rs.rows) ids.push(row.dest);
							}
				);
			},
			null, 
			function() { 
				this.getObjects(ids, callback);
			}	
		); //Close Transaction
		
	},
	buildInstance: function(formClass) {
		function FormInstance() {};
		var instance = new FormInstance();
		formClass.instance = instance 
		instance.engineClass = formClass;
		var def = formClass.definition;
		for (idx in def) {
			if (!def.hasOwnProperty(idx)) continue;
			var item = def[idx];
			if (typeof item.default !== 'undefined') {
				instance[item.source] = item.default;
			} else {
				instance[item.source] = item.value;
			}
		}
	}
}