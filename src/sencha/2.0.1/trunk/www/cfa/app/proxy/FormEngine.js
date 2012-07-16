Ext.define('cfa.proxy.FormEngine', {
    extend: 'Ext.data.proxy.Client',

    alias: 'proxy.formengine',

    alternateClassName: 'cfa.data.FormEngineProxy',
    
    config: {
    	queryType: null,
    	queryParam: null
    },

    constructor: function (config) {
        this.callParent(arguments);

        if (Formpod === undefined) {
            Ext.Logger.error("Formpod is not available");
        }
    },

    //inherit docs
    create: function (operation, callback, scope) {
        var records = operation.getRecords();
        operation.setStarted();
        this.setRecords(records, function () {
            operation.setCompleted();
            operation.setSuccessful();

            if (typeof callback == 'function') {
                callback.call(scope || this, operation);
            }
        });
    },

    //inherit docs
    read: function (operation, callback, scope) {
        var records = [],
            me = this,
            data = {},
            Model = this.getModel(),
            idProperty = Model.getIdProperty(),
            params = operation.getParams() || {},
            record;

        //read a single record
        var queryType = this.getQueryType(),
        	queryParam = this.getQueryParam();

        if (queryType) {
        	 if (queryType == 'class') {
        	 	if (queryParam == 'all') {
        	 		var formClasses = ['System', 'Storage', 'Mobile', 'Media'];
        	 		Formpod.findAllObjectsByClasses(formClasses, [],function (objs) {
	                    me.applyDataToModels(objs, Model, function (records) {
	                        me.completeRead(operation, callback, scope, records);
	                    });
	                }); 
        	 	} else {
        	 		Formpod.findObjectsByClass(queryParam, function (objs) {
	                    me.applyDataToModels(objs, Model, function (records) {
	                        me.completeRead(operation, callback, scope, records);
	                    });
	                }); 
        	 	}
                       	
        	 }
        } else {
	        if (params[idProperty] !== undefined) {
	            record = this.getRecord(params[idProperty]);
	
	            if (record) {
	                records.push(record);
	                operation.setSuccessful();
	            }
	
	            records = this.applyDataToModels(objs, Model);
	            this.completeRead(operation, callback, scope, records);
	        } else {
	            if (params['node'] == 'cases') {
	                Formpod.findObjectsByClass('Case Form', function (objs) {
	                    me.applyDataToModels(objs, Model, function (records) {
	                        me.completeRead(operation, callback, scope, records);
	                    });
	                });
	            } else {
	                Formpod.findRelatedIdsWithType(params['node'], 'hasChild', function (ids) {
	                    Formpod.getObjects(ids, function (objs) {
	                        me.applyDataToModels(objs, Model, function (records) {
	                            me.completeRead(operation, callback, scope, records);
	                        });
	                    });
	                });
	            }
	        }
        }
        
        operation.setSuccessful();
    },

    //inherit docs
    update: function (operation, callback, scope) {
        var records = operation.getRecords();
        operation.setStarted();
        this.setRecords(records, function () {
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
    * Destroys all records stored in the proxy and removes all keys and values used to support the proxy from the
    * storage object.
    */
    clear: function () {
        Formpod.deleteAllObjects();
    },

    /**
    * @private
    * Fetches a model instance from the Proxy by ID. Runs each field's decode function (if present) to decode the data.
    * @param {String} id The record's unique ID
    * @return {Ext.data.Model} The model instance or undefined if the record did not exist in the storage.
    */
    getRecord: function (id) {
        return null;
    },

    /**
    * Saves the given record in the Proxy. Runs each field's encode function (if present) to encode the data.
    * @param {Ext.data.Model} record The model instance
    * @param {String} [id] The id to save the record under (defaults to the value of the record's getId() function)
    */
    setRecords: function (records, callback) {
        var me = this,
            length = records.length,
            record, rawData, formData, i, engine;
            
        for (i = 0; i < length; i++) {
            if (i == length - 1) {
            	this.setRecord(records[i], function() {
			        if (typeof callback == 'function') {
			            callback();
        			}
            	});
            	
                return;
            } else {
            	this.setRecord(records[i]);
            }
        }

        if (typeof callback == 'function') {
            callback();
        }
    },
    
    setRecord: function (record, callback) {
    	var rawData = {},
        	formData = record.getData().form,
        	engine = formData.engineClass;
        
        for (var attr in formData) {
            var field = engine.fields[attr];
            rawData[attr] = formData[attr];

            if (field && field.type == 'datepickerfield')
                if (rawData[attr])
                    rawData[attr] = Ext.Date.format(rawData[attr], Formpod.dateFormat);
        }
        
		Formpod.saveInstance(rawData, function(obj) {
        	formData['id'] = obj.id;
        	record.set('id', obj.id);
        	record.commit();
                    
        	if (record.get('parentId')) {
        		var parentId = parseInt(record.get('parentId'));
        		
        		if (parentId != NaN) {
	        		Formpod.relateObjectById(parentId, obj.id, 'hasChild');
	        	}
	        }

	        if (typeof callback == 'function') {
    	        callback(record);
	        }
        });
    },

    /**
    * @private
    * Physically removes a given record from the local storage. Used internally by {@link #destroy}, which you should
    * use instead because it updates the list of currently-stored record ids
    * @param {String/Number/Ext.data.Model} id The id of the record to remove, or an Ext.data.Model instance
    */
    removeRecord: function (records, callback, scope) {
	   	for (var i = 0; i < records.length; i++) {
    		Formpod.deleteObjectWithId(records[i].getData().form.id);
    		records[i].commit();
    	}   	 

        if (typeof callback == 'function') {
            callback.call(scope || this);
        }
    },

    applyDataToModels: function (objs, Model, callback) {
        var records = [],
            data = {},
            length = objs.length,
            i, obj, engine;

        for (i = 0; i < length; i++) {
            obj = objs[i];
            engine = obj.engineClass;
            
            for (var attr in obj) {
                var field = engine.fields[attr];
                
                if (field && field.type == 'datepickerfield')
                    if (obj[attr])
                        obj[attr] = Ext.Date.parse(obj[attr], Formpod.dateFormat);
            }
            
            data['id'] = obj.id;
            data['text'] = obj[engine.displayProperty];
            data['form'] = obj;
            record = new Model(data, obj.id);

            if (i == length - 1) {
                this.updateLeaf(record, function (record) {
                    records.push(record);

                    if (typeof callback == 'function') {
                        callback(records);
                    }
                });

                return;
            } else {
                this.updateLeaf(record, function (record) {
                    records.push(record);
                });
            }
        }

        if (typeof callback == 'function') {
            callback(records);
        }
    },

    updateLeaf: function (record, callback) {
        var engine = record.get('form').engineClass,
            childForms = Formpod.FormTypes[engine.name].childForms;
        
        if (childForms && childForms.length) {
            record.set('leaf', false);
        } else {
            record.set('leaf', true);
        }
        
        if (typeof callback == 'function') {
            callback(record);
        }
    },

    completeRead: function (operation, callback, scope, records) {
        operation.setCompleted();
        operation.setResultSet(Ext.create('Ext.data.ResultSet', {
            records: records,
            total: records.length,
            loaded: true
        }));
        operation.setRecords(records);

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    }
});
