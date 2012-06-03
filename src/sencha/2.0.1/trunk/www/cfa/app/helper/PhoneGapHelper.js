Ext.define("cfa.helper.PhoneGapHelper",{	
	singleton: true,
	alias:'cfa.helper.PhoneGapHelper',
	config:{
	},	
	/*Begin Device wrapper*/
	isOnLine : function(){
		 return navigator.onLine;
	},
	/*End Device wrapper*/
	checkConnection : function() {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'UNKNOWN';
        states[Connection.ETHERNET] = 'ETHERNET';
        states[Connection.WIFI]     = 'WIFI';
        states[Connection.CELL_2G]  = 'CELL_2G';
        states[Connection.CELL_3G]  = 'CELL_3G';
        states[Connection.CELL_4G]  = 'CELL_4G';
        states[Connection.NONE]     = 'NONE';

        alert('Connection type: ' + states[networkState]);		
		return states[networkState];
    }
	/*End Connection wrapper*/
});