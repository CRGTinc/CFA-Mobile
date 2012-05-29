Ext.define('cfa.controller.setting.SettingController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.setting.SettingView'],
	
	config: {
        routes: {
            'setting': 'showSettingPage'
        },

        refs: {
            main: 'main',
            resetDataButton: '#resetdatabtn'
        },
        
        control: {
            resetDataButton: {
                tap: 'resetData'
            }
        }
    },
	
	showSettingPage: function(){
		var caseView = Ext.create('cfa.view.setting.SettingView');
		this.getMain().push(caseView);        						
	},
    
    resetData: function() {
        Ext.Msg.confirm("Reset Data", "Do you want to reset data?", confirmResetData);
    }
})

function confirmResetData(button) {
    if (button == 'yes') {
        Ext.Msg.confirm("Reset Data", "This action can not be reverted, do you really want to reset data?", confirmResetData2);
    }
}

function confirmResetData2(button) {
    if (button == 'yes') {
        Ext.Msg.alert('Reset Data', 'Data has been reseted successfully.', Ext.emptyFn);
    }
}
