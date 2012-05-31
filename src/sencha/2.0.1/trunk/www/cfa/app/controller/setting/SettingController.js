Ext.define('cfa.controller.setting.SettingController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.setting.SettingView'],
	
	config: {
        routes: {
            'setting': 'showSettingPage'
        },

        refs: {
            main: 'main',
            resetDataButton: 'button[action=resetdatabtn]'
        },
        
        control: {
            resetDataButton: {
                tap: 'resetData'
            }
        }
    },
	
	showSettingPage: function(){
		console.log('Show setting page');
		var caseView = Ext.create('cfa.view.setting.SettingView');
		this.getMain().push(caseView);        						
	},
    
    resetData: function() {
        Ext.Msg.confirm("Reset Data", "Do you want to reset data?", this.confirmResetData, this);
    },
    
    confirmResetData: function(button) {
        if (button == 'yes') {
            Ext.Msg.confirm("Reset Data", "This action can not be reverted, do you really want to reset data?", this.confirmResetData2, this);
        }
    },

    confirmResetData2: function(button) {
        if (button == 'yes') {
            Ext.Msg.alert('Reset Data', 'Data has been reseted successfully.', Ext.emptyFn, this);
        }
    }

})