Ext.define('cfa.model.Case', {
	extend : 'Ext.data.Model',

	requires : ['cfa.proxy.FormEngine'],

	config : {
		fields : ['id', 'form', {
			name : 'text',
			type : 'string'
		}],

		validations : [{
			type : 'formdata',
			field : 'form'
		}],

		proxy : {
			type : 'formengine'
		}
	},

	validate : function() {
		 var errors      = Ext.create('Ext.data.Errors'),
            validations = this.getValidations().items,
            validators  = Ext.data.Validations,
            length, validation, field, valid, type, i;

        if (validations) {
            length = validations.length;

            for (i = 0; i < length; i++) {
                validation = validations[i];
                field = validation.field || validation.name;
                type  = validation.type;
                
                if(type == 'formdata') {
                	var engineClass = this.get(field).engineClass;
                	var formFields = engineClass.definition;
                	var formData = Formpod.generator.getFormData(engineClass.getForm());
                	for (var i = 0 ; i < formFields.length; i++) {
						if (formFields[i].type == "textfield" && formFields[i].required) {
							valid = !!formData[formFields[i].name] || formData[formFields[i].name] === 0;
														
							if (!valid) {
			                    errors.add(Ext.create('Ext.data.Error', {
			                        field: formFields[i].name,
			                        message: formFields[i].label + " is required."
			                    }));
	                		}							
						} else if (formFields[i].type == 'emailfield' && (formData[formFields[i].name] != '' || formFields[i].required)) {
							valid = Ext.data.validations.emailRe.test(formData[formFields[i].name]);
							
							if (!valid) {
			                    errors.add(Ext.create('Ext.data.Error', {
			                        field: formFields[i].name,
			                        message: "Please enter a valid email address for " + formFields[i].label + " field."
			                    }));
	                		}
						}             		
                	}
                } else {
                	valid = validators[type](validation, this.get(field));

	                if (!valid) {
	                    errors.add(Ext.create('Ext.data.Error', {
	                        field: field,
	                        message: validation.message || validators.getMessage(type)
	                    }));
	                }
                }
               
            }
        }

        return errors;
	}
});

