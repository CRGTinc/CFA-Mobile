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
								},
								labelWrap : true,
							};
						}
						else {
                            fitem = {
                                xtype: finfo.type,
								name: finfo.name,
								label: finfo.label,
								value: finfo.value,
								required: finfo.required,
	                            placeHolder: finfo.placeHolder,
	                            autoCapitalize: finfo.autoCapitalize,
	                            autoCorrect: finfo.autoCorrect,
	                            autoComplete: finfo.autoComplete,
	                            labelWrap: true
                            }

							if (finfo.textType == 'pascalcase') {
								fitem.listeners = {
                                	change: { fn:Formpod.FormEngine.Utils.pascalCase, scope:Formpod.FormEngine.Utils }
                                }
							}
                            else if(finfo.textType == 'allcap') {
								fitem.listeners = {
                                	change: { fn:Formpod.FormEngine.Utils.allCap, scope:Formpod.FormEngine.Utils }
                                }
							}
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
					var form = Ext.create ('Ext.form.Panel', { flex: 1, items: fitems });
					
					return form;
				}, 
				getFormData: function(form) { return form.getValues(); },
				setFormData: function(form, obj) { form.setValues(obj); }
			},
			HTML: {
				generateForm: function(fields) { return null; }
			}
		},
        
        Utils: {
            pascalCase: function(field, newVal, oldVal, opts) {
				var str = newVal.replace(/(\S)(\S*)/g, function(g0,g1,g2) { 
					return g1.toUpperCase() + g2.toLowerCase();
				});
				field.setValue(str);
			},

            allCap: function(field, newVal, oldVal, opts) {
                var str = newVal.toUpperCase(); 
                field.setValue(str);
            }
        }
	},
	FormTypes: {},
    dateFormat: 'm/d/Y',
	randomUUID: function () {
		var s = [], itoh = '0123456789ABCDEF';
 
		// Make array of random hex digits. The UUID only has 32 digits in it, but we
		// allocate an extra items to make room for the '-'s we'll be inserting.
		for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);

		// Conform to RFC-4122, section 4.4
		s[14] = 4;  // Set 4 high bits of time_high field to version
		s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence

		// Convert to hex chars
		for (var i = 0; i <36; i++) s[i] = itoh[s[i]];

		// Insert '-'s
		s[8] = s[13] = s[18] = s[23] = '-';

		return s.join('');
	},
 
	init: function (formDefinitions, generator) {
		function FormClass(name, description, definition) {
			this.name = name;
			this.description = description;
			this.definition = definition;
            this.fields = {};
            
            var i = 0,
                length = definition.length;
            
            for (; i < length; i++) {
                var field = definition[i];
                this.fields[field.name] = field;
            }
            
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

					if (this.fields[attrName].type == 'hiddenfield') {
						obj[attrName] = Formpod.randomUUID();
					}
				}
				this.loadForm(obj);
				return obj;
			}
			
			this.saveForm = function() {
				var obj = this.getFormObject();
				Formpod.saveInstance(obj);
			}
			
			this.loadForm = function(obj) {
				var that = this;
                var callback = function(instance) {
					Formpod.generator.setFormData(that.getForm(), instance); 
					if (typeof instance.id !== 'undefined') {
						that.getForm().engineObjectId = instance.id;
					}
				};

                if (typeof obj === 'string') {
                    this.getSavedInstance(id, callback);
                } else {
                    callback(obj);
                }
			}
			
			this.resetForm = function() {
				this.getForm().reset();
				delete this.getForm().engineObjectId;
			}
			
			this.scrollFormToTop = function() {
				var form = this.getForm();
				form.getScrollable().getScroller().scrollTo(0, 0, true);
			}
            
            this.deleteForm = function() {
                if (this.form) {
                    delete this.form;
                }
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
		this.db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		var me = this;
		var createDatabases = function () {
			me.db.transaction(function (t) {
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
					" src INTEGER NOT NULL, dest INTEGER NOT NULL," + 
					" type TEXT NOT NULL," +
                    " PRIMARY KEY(src, dest, type))"
				);
			},
			function(e) { throw e }
			);
		};
		createDatabases();
        this.Forms = [];
		for (var idx in formDefinitions) {
			if (!formDefinitions.hasOwnProperty(idx)) continue;
			var def = formDefinitions[idx];
			this.FormTypes[def.formName] = new FormClass(def.formName, def.formDesc, def.formFields)
			this.FormTypes[def.formName].displayProperty = def.displayProperty;
			this.FormTypes[def.formName].childForms = def.childForms;
			this.FormTypes[def.formName].attachment = def.attachment;
            this.Forms.push(this.FormTypes[def.formName]);
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
		instance.engineClass = formClass;
		return instance;
	},
	getSavedInstance: function(formClass, id, callback) {
		if (typeof formClass === 'string') {
			formClass = this.FormTypes[formClass];
		}
		function FormInstance() {};
		
		var loadedObj = new FormInstance();
		if (typeof formClass.instance === 'undefined') {
			this.buildInstance(formClass);
		}
		loadedObj.prototype = formClass.instance;
		loadedObj.engineClass = formClass;
		this.db.transaction(
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
		this.db.transaction(
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
						loadedObj.engineClass = formClass;
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
	saveInstance: function (o, callback) {
		var insertClassAttrs = {};
		var modifyClassAttrs = {};
		var deleteClassAttrs = {};
		for (var attr in o) {
			if (typeof o[attr] !== 'function' && typeof o[attr] !== 'object') {
				insertClassAttrs[attr] = true;
			}
		}
				
		this.db.transaction(
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
                            
                            if (typeof callback === 'function')
                                callback(o);
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
								t.executeSql("insert into attr(objid, name, value) values(?,?,?)", [o.id, attr, o[attr]],
                                    function(t, rs) {
                                        if (typeof callback === 'function')
                                            callback(o);
                                    });
							};	
						}
					);
				}
			}
		); //Close transaction
	},
	relateObject: function (src, dest, type) {
		if (typeof src.id === "undefined") {
			throw Error("relateObject: Source object does not have an id. Save it first.")
		} else if (typeof dest.id === "undefined") {
			throw Error("relateObject: Destination object does not have an id. Save it first.")
		}
      	Formpod.relateObjectById(src.id, dest.id, type);
	},
	relateObjectById: function (srcId, destId, type) {		
		this.db.transaction( 
			function (t) {
				t.executeSql("INSERT OR REPLACE INTO rel(src, dest, type) VALUES(?, ?, ?)", [srcId, destId, type]);
			}
		);
	},
	unrelateObject: function (src, dest, type) {
		if (typeof src.id === "undefined") {
			throw Error("unrelateObject: Source object does not have an id. Save it first.")
		} else if (typeof dest.id === "undefined") {
			throw Error("unrelateObject: Destination object does not have an id. Save it first.")
		}
		//this.db = openDatabase("MDR", "", "object Metadata Repository", 1048576);
		this.db.transaction( 
			function (t) {
				t.executeSql("delete from rel where src = ? and dest = ?", [src.id, dest.id]);
			}
		);
	},
	deleteObjectWithId: function(id) {
		var me = this;
		this.db.transaction( function(t) {
			t.executeSql("delete from attr where objid = ?", [id]);
			t.executeSql("delete from obj where id = ?", [id]);
		});//Close transaction
		
		Formpod.findRelatedIdsWithType(id, 'hasChild',function(objs) {
			me.db.transaction( function(t) {
				t.executeSql("delete from rel where src = ?", [id]);
				t.executeSql("delete from rel where dest = ?", [id]);
			});//Close transaction			
			var length = objs.length,
   				i;
   		
   			for (i = 0; i < length; i++) {
   				Formpod.deleteObjectWithId(objs[i][0]);
   			}
		})
	},
	
	deleteObject: function (o) {
		if (typeof o.id === "undefined") {
			throw "deleteObject: this object hasn't been saved yet. It cannot be deleted";
		}
		this.deleteObjectWithId(o.id);
	},
	
	deleteAllObjects: function() {		
		this.db.transaction( function(t) {
			t.executeSql("delete from rel");
			t.executeSql("delete from attr");
			t.executeSql("delete from obj");
		});//Close transaction
	},
	
	findObjectsByAttr: function(query, value, callback) {		
		var objIds = [];
		var objects = [];
		this.db.transaction( 
			function(t) {
				t.executeSql("select a.objid, o.class as clsname from attr a, obj o where a.name = ? and a.value = ? and o.id = a.objid", [query, value],
							function(t, rs) {
								for (var i = 0; i < rs.rows.length; i++) {
									var row = rs.rows.item(i);
									ids.push([row.objid, row.clsname]);
								}
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
			formClass = Formpod.FormTypes[formClass];
		}
		var objIds = [];
		var objects = [];
		this.db.transaction( 
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
		if (typeof o.id !== 'number') {
			console.log("Formpod.FindRelatedObjects: The object provided has not been persisted.")
		}
		this.db.transaction( 
			function(t) {
				t.executeSql("select distinct r.dest, o.class as clsname from rel r, obj o where r.src = ? and r.dest = o.id", [o.id],
							function(t, rs) {
								for (var i = 0; i < rs.rows.length; i++) {
									var row = rs.rows.item(i);
									objIds.push([row.dest, row.clsname]);
								}
							}
				);
			},
			null,
			function() {
				Formpod.getObjects(objIds, callback);
			}	
		); //Close Transaction
	},
	findRelatedIdsWithType: function(id, type, callback) {
		var objIds = [];		
		this.db.transaction( 
			function(t) {
				t.executeSql("select distinct r.dest, o.class as clsname from rel r, obj o where r.src = ? and r.type = ? and r.dest = o.id", [id, type],
					function(t, rs) {
						for (var i = 0; i < rs.rows.length; i++) {
							var row = rs.rows.item(i);
							objIds.push([row.dest, row.clsname]);
						}
					}
				);
			},
			null, 
			function() {
				if (typeof callback === 'function')
					callback(objIds);
			}
		); //Close Transaction
	},
	
	findRelatedObjectsWithType: function(obj, type, details, callback) {
		if (typeof obj.id !== 'number') {
			console.log("Formpod.findRelatedObjectsWithType: The object provided has not been persisted.")
		}
		Formpod.findRelatedObjectsFromIdWithType(obj.id, type, details, callback);
	},
	
	findRelatedObjectsFromIdWithType: function(id, type, details, callback) {
		if (details) {
			Formpod.findRelatedIdsWithType(id, type, function(ids) {
				Formpod.getObjects(ids, callback);
			});
		} else {
			Formpod.findRelatedIdsWithType(id, type, callback);
		}
	},
	
	buildInstance: function(formClass) {
		function FormInstance() {};
		var instance = new FormInstance();
		formClass.instance = instance;
		instance.engineClass = formClass;
		var def = formClass.definition;
		for (idx in def) {
			if (!def.hasOwnProperty(idx)) continue;
			var item = def[idx];
			if (typeof item.defaultValue !== 'undefined') {
				instance[item.source] = item.defaultValue;
			} else {
				instance[item.source] = item.value;
			}
		}
	},
	getObjects: function(ids, callback) {
		var objectList = [],
            length = ids.length,
            i;
            
        for (i = 0; i < length; i++) {
            var id = ids[i];
            
            if (i == length - 1) {
                Formpod.getSavedInstance(id[1], id[0], function(obj) {
                    objectList.push(obj);

                    if (typeof callback === 'function')
                        callback(objectList);
                });
                
                    
                return;
            } else {
                Formpod.getSavedInstance(id[1], id[0], function(obj) {
                    objectList.push(obj);
                });
            }
        }
        
        if (typeof callback === 'function')
            callback(objectList);
	},
    
    importData: function(data, callback) {
        var me = this,
            importData = data;
        
        try {
            if (typeof importData == 'string')
                importData = Ext.decode(importData);
        } catch(error) {
            return '1';
        }
        
        delete importData.id;
            
        me.saveInstance(importData, function(obj) {
            
            var length = obj.children ? obj.children.length : 0,
                i, count = 0;

            var childCallback = function(childObj) {
                count++;
                me.relateObject(obj, childObj, 'hasChild');
                
                if (count != length)
                    return;
                
                if (typeof callback == 'function')
                    callback(obj);
            }
            
            for (i = 0; i < length; i++) {
                var child = obj.children[i];
                me.importData(child, childCallback);
            }
            
            if (length == 0 && typeof callback == 'function') {
                callback(obj);
            }

        });
        
        return '0';
    },
	
	exportData: function(form, callback) {
		var jsonString = Formpod.getFormInstanceData(form);
		
    	Formpod.findRelatedObjectsWithType(form, 'hasChild', true, function(objs) {    		
   			var childData = [],
   				processed = 0,
   				length = objs.length,
   				i;
   			  			
   			for (i = 0; i < length; i++){
   				Formpod.exportData(objs[i], function(data) {
    				childData.push(data);
    				processed++;
    				
    				if (processed == length) {
                        jsonString = jsonString.slice(0, -1);
			   			jsonString = jsonString.concat(', "children": [' + childData + ']}');
			   			
				        if (typeof callback === 'function')
            				callback(jsonString);
    				}
   				});
   			}
   			
	        if (length == 0 && typeof callback === 'function') {
	        	callback(jsonString);
   			}
    	}); 
	},
	
	getFormInstanceData: function(formInstance) {
    	var formdata = '{',
            engine = formInstance.engineClass,
            definition = engine.definition,
            index;
        
		formdata = formdata.concat('"id": "' + formInstance['id'] + '",');
		formdata = formdata.concat('"engineClass": { "name": "' + formInstance['engineClass'].name + '" },');

        for (index in definition) {
			var field = definition[index];
            
            if (field.type == 'fieldset' || field.type == 'endfieldset')
                continue;
                
            var value = formInstance[field.name];
            
            if (!value) {
                value = '';
            }
            
            if (typeof value == 'object') {
                if (field.type == 'datepickerfield') {
                    value = Ext.Date.format(value, this.dateFormat);
                    formdata = formdata.concat('"' + field.name + '": "' + value + '",');
                }
            } else {
                formdata = formdata.concat('"' + field.name + '": "' + value + '",');
            }
		}
        
        if (formdata[formdata.length - 1] == ',') {
            formdata = formdata.slice(0, -1);
        }
        
     	formdata = formdata.concat('}');
     	return formdata;
    },
    
    deleteCaseData: function(node) { 
    	Formpod.deleteObjectWithId(node.id)
    }
}
