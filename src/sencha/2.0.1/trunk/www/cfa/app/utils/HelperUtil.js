Ext.define("cfa.utils.HelperUtil", {
	singleton : true,
	alias : 'cfa.utils.HelperUtil',
	config : {},
	
	getHelper: function() {
		return Ext.os.is.Desktop?cfa.helper.ChromeHelper:cfa.helper.PhoneGapHelper;
	}
})