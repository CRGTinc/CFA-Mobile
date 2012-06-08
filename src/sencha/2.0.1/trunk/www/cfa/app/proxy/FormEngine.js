Ext.define('cfa.proxy.FormEngine', {
    extend: 'Ext.data.proxy.Client',
    
    alias: 'proxy.formengine',
    
    alternateClassName: 'cfa.data.FormEngineProxy',
    
    constructor: function(config) {
        this.callParent(arguments);

        if (Formpod === undefined) {
            Ext.Logger.error("Formpod is not available");
        }
    },

    //inherit docs
    create: function(operation, callback, scope) {
        var records = operation.getRecords(),
            length  = records.length,
            id, record, i;

        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];
            id = record.getId();
            this.setRecord(record);
        }

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    //inherit docs
    read: function(operation, callback, scope) {
        var records    = [],
            me         = this,
            data       = {},
            Model      = this.getModel(),
            idProperty = Model.getIdProperty(),
            params     = operation.getParams() || {},
            i, record, obj;
            
        //read a single record
        if (params[idProperty] !== undefined) {
            record = this.getRecord(params[idProperty]);
            
            if (record) {
                records.push(record);
                operation.setSuccessful();
            }
            
            records = this.encodeObjects(objs, Model);
            this.completeRead(operation, callback, scope, records);
        } else {
            if (params['node'] == 'root') {
                Formpod.findObjectsByClass('Case Form', function(objs) {
                    records = me.encodeObjects(objs, Model);
                    me.completeRead(operation, callback, scope, records);
                });
            } else {
            }
            
            operation.setSuccessful();
        }
    },
    
    completeRead: function(operation, callback, scope, records) {
        operation.setCompleted();
        operation.setResultSet(Ext.create('Ext.data.ResultSet', {
            records: records,
            total  : records.length,
            loaded : true
        }));
        operation.setRecords(records);
        
        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    //inherit docs
    update: function(operation, callback, scope) {
        var records = operation.getRecords(),
            length  = records.length,
            record, id, i;

        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];
            this.setRecord(record);
        }
        
        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    //inherit
    destroy: function(operation, callback, scope) {
        var records = operation.getRecords(),
            length  = records.length,
            i;

        for (i = 0; i < length; i++) {
            this.removeRecord(records[i], false);
        }

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    /**
     * @private
     * Fetches a model instance from the Proxy by ID. Runs each field's decode function (if present) to decode the data.
     * @param {String} id The record's unique ID
     * @return {Ext.data.Model} The model instance or undefined if the record did not exist in the storage.
     */
    getRecord: function(id) {
        return null;
    },

    /**
     * Saves the given record in the Proxy. Runs each field's encode function (if present) to encode the data.
     * @param {Ext.data.Model} record The model instance
     * @param {String} [id] The id to save the record under (defaults to the value of the record's getId() function)
     */
    setRecord: function(record, id) {
        if (id) {
            record.setId(id);
        } else {
            id = record.getId();
        }
        
        var me = this,
            rawData = record.getData(),
            cfaData;
            
        cfaData = rawData.cfa;
        Formpod.saveInstance(cfaData);
        record.id = cfaData.id;
        record.commit();
    },

    /**
     * @private
     * Physically removes a given record from the local storage. Used internally by {@link #destroy}, which you should
     * use instead because it updates the list of currently-stored record ids
     * @param {String/Number/Ext.data.Model} id The id of the record to remove, or an Ext.data.Model instance
     */
    removeRecord: function(id, updateIds) {
        if (id.isModel) {
            id = id.getId();
        }

        Formpod.deleteObjectWithId(id);
    },
    
    encodeObjects: function(objs, Model) {
        var records = [],
            data = {},
            length = objs.length,
            i, obj;
                    
        for (i = 0; i < length; i++) {
            obj = objs[i];
            data['id'] = obj.id;
            data['text'] = obj.text;
            data['cfa'] = obj;
                        
            record = new Model(data, obj.id);
            records.push(record);
        }
        
        return records;
    },

    /**
     * Destroys all records stored in the proxy and removes all keys and values used to support the proxy from the
     * storage object.
     */
    clear: function() {
        Formpod.deleteAllObjects();
    }
});
