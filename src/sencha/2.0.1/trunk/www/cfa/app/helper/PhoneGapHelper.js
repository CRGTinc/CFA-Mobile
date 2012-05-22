Ext.define("cfa.app.helper.PhoneGapHelper",
	config:{
		
	}
	/*Begin Device wrapper*/
	isOnLine : function(){
		 return navigator.onLine;
	}
	/*End Device wrapper*/
	/*Begin Nofification wrapper*/
	showAlert : function(message, alertCallback, [title], [buttonName]){
		return navigator.nofification.alert(message, alertCallback, [title], [buttonName]);
	}
	showConfirm : function(message, confirmCallback, [title], [buttonLabels]){
		return navigator.notification.confirm(message, confirmCallback, [title], [buttonLabels])
	}
	doBeep : function(times){
		navigator.notification.beep(times);
	}
	doVibrate : function(milliseconds){
		navigator.notification.vibrate(milliseconds)
	}		
	/*End Nofification wrapper*/
	/*Begin Connection wrapper*/
	function checkConnection() {
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
)