Ext.define("cfa.utils.FileUtils", {
	singleton : true,
	alias : 'cfa.utils.FileUtils',
	
	config : {
		XORKey: 01081989,
	},
	

	XOREncode:function(data) {
		var encodedData = '';
		var key = this.getXORKey();
		
	    for(i = 0; i < data.length; ++i) {
	        encodedData += String.fromCharCode(key ^ data.charCodeAt(i));
	    }
	    
	   	return encodedData;
	},

	XORDecode: function(data) {
	    
	    var decodedData = '';
		var key = this.getXORKey();
		
	    for(i = 0; i < data.length; i++) {
	       decodedData += String.fromCharCode(key ^ data.charCodeAt(i));
	    }
	    
	    return decodedData;
	},
	
	isEncryptedData: function(data) {
		try {
			 json = JSON.parse(data);
			 return false;
		}catch(error) {

		}		
		return true

	},
	
	isBase64: function(str) {
        var invalid = str.replace(/[A-Za-z0-9\+\/\=]/g, "");
        return str.length > 0 && /^\s*$/.test(invalid) && (invalid.length / str.length <= 0.05);
   },
	
	decodeBase64: function(str) {
		
		if (this.isBase64(str)) {
			var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var res = [];
			str = str.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			var i = 0;
			while (i < str.length) {
				var enc1 = base64Chars.indexOf(str.charAt(i++));
				var enc2 = base64Chars.indexOf(str.charAt(i++));
				var enc3 = base64Chars.indexOf(str.charAt(i++));
				var enc4 = base64Chars.indexOf(str.charAt(i++));
				var b1 = (enc1 << 2) | (enc2 >> 4);
				var b2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				var b3 = ((enc3 & 3) << 6) | enc4;
				res.push(String.fromCharCode(b1));
				if (enc3 != 64) {
					res.push(String.fromCharCode(b2));
				}
				if (enc4 != 64) {
					res.push(String.fromCharCode(b3));
				}
			}
			return res.join("");
		} else {
			console.log("Invalid Base64");
		}
   },
	
	constructor: function(config) {
        this.initConfig(config);

        return this;
    }
})