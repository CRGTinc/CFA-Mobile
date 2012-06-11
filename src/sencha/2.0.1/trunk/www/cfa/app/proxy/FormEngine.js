Ext.define('cfa.proxy.FormEngine', {
    extend: 'Ext.data.proxy.Client',

    alias: 'proxy.formengine',

    alternateClassName: 'cfa.data.FormEngineProxy',

    constructor: function (config) {
        this.callParent(arguments);

        if (Formpod === undefined) {
            Ext.Logger.error("Formpod is not available");
        }
    },

    //inherit docs
    create: function (operation, callback, scope) {
        console.log('create operation', operation);
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

    //inherit docs
    read: function (operation, callback, scope) {
        console.log('read operation', operation);
        var records = [],
            me = this,
            data = {},
            Model = this.getModel(),
            idProperty = Model.getIdProperty(),
            params = operation.getParams() || {},
            record;

        //read a single record
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
            } else if (params['node'] == 'devices') {
                Formpod.findObjectsByClass('Device Form', function (objs) {
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

            operation.setSuccessful();
        }
    },

    //inherit docs
    update: function (operation, callback, scope) {
        console.log('update operation', operation);
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
        console.log('destroy operation', operation);
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
        console.log('clear operation');
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
    setRecord: function (records, callback) {
        var me = this,
            length = records.length,
            record, formData, i;

        for (i = 0; i < length; i++) {
            record = records[i];
            formData = record.getData().form;
            
            if (i == length - 1) {
                Formpod.saveInstance(formData, function(obj) {
                    record.set('id', obj.id);
                    record.commit();
                    
                    if (formData.parentId)
                        Formpod.relateObject(formData.parentId, formData.id, 'hasChild');
                });
                
                if (typeof callback == 'function')
                    callback();
                    
                return;

            } else {
                Formpod.saveInstance(formData, function(obj) {
                    record.id = obj.id;
                    record.commit();
                    
                    if (formData.parentId)
                        Formpod.relateObject(formData.parentId, formData.id, 'hasChild');
                });
            }
        }

        if (typeof callback == 'function') {
            callback();
        }
    },

    /**
    * @private
    * Physically removes a given record from the local storage. Used internally by {@link #destroy}, which you should
    * use instead because it updates the list of currently-stored record ids
    * @param {String/Number/Ext.data.Model} id The id of the record to remove, or an Ext.data.Model instance
    */
    removeRecord: function (id) {
        if (id.isModel) {
            id = id.getId();
        }

        Formpod.deleteObjectWithId(id);
    },

    applyDataToModels: function (objs, Model, callback) {
        var records = [],
            data = {},
            length = objs.length,
            i, obj;

        for (i = 0; i < length; i++) {
            obj = objs[i];
            data['id'] = obj.id;
            data['text'] = obj[Formpod.FormTypes[obj.engineClass.name].displayProperty];
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
