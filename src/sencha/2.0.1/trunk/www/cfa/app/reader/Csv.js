Ext.define('cfa.reader.Csv', {
    extend: 'Ext.data.reader.Json',
    alternateClassName: 'cfa.reader.CsvReader',
    alias : 'reader.csv',

    getResponseData: function(response) {				
		var me = this,
            model = me.getModel(),
            fields = model.getFields(),
            ln = fields.length,
			json = [],			
			lines = response.responseText.split('\n');
			for (var i = 0, l = lines.length; i < l; ++i) {
				var dataFields = lines[i].split(','),jsonElement = {};				
				for (var j = 0; j < ln; j++) {
					field = fields.items[j];
					fieldName = field.getName();					
					jsonElement[fieldName] = dataFields[j];					
				}				
				json.push(jsonElement);
			};		
		return json;		
	}		
});