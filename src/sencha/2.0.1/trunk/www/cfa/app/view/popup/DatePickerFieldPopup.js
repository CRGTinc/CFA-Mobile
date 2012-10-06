Ext.define('cfa.view.popup.DatePickerFieldPopup', {
	extend : 'Ext.picker.Date',

	config : {
		listeners : {
			change : {
				fn : Formpod.FormEngine.Utils.onChangeDatePickerPopup,
				scope : Formpod.FormEngine.Utils
			}
		},
	},

})
