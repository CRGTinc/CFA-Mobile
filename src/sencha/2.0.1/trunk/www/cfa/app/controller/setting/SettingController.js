Ext.define('cfa.controller.setting.SettingController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.setting.SettingView', 'cfa.model.User'],
	
	config: {
        routes: {
            'settings': 'showSettingPage'
        },

        refs: {
            main: 'main',
            resetDataButton: 'button[action = resetdatabtn]',
            saveUserDataButton: 'button[action = saveuserdata]'
        },
        
        control: {
            resetDataButton: {
                tap: 'resetData'
            },
            
            saveUserDataButton: {
            	'tap': 'saveUserData'
            }
        },
        settingView: null,
    },
	
	showSettingPage: function(){
		this.setSettingView(Ext.create('cfa.view.setting.SettingView'));
		this.getMain().push(this.getSettingView());
		Ext.getStore('Users').load({callback: function(records, e, opt){
			this.getSettingView().getComponent('settingformpanel').setRecord(records[0]);
		}, scope: this});
		
		       						
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
            var casesStore = Ext.getStore('Cases');
            casesStore.getProxy().clear();
            casesStore.load();
            
            var imageStore = Ext.create('cfa.store.LSImages');
            imageStore.load(function() {
                imageStore.removeAll();
                imageStore.sync();
            });
            
            Ext.Msg.alert('Reset Data', 'Data has been reset successfully.', Ext.emptyFn, this);
        }
    },
    
    saveUserData: function() {
    	var store = Ext.getStore('Users').load(),
    		firstname = this.getSettingView().getComponent('settingformpanel').getComponent(0).getComponent('firstname').getValue(),
    		lastname = this.getSettingView().getComponent('settingformpanel').getComponent(0).getComponent('lastname').getValue();
    	
    	store.removeAll(false);
    	store.add({'firstname': firstname, 'lastname': lastname});
    	store.sync();
    	Ext.Msg.alert('Save user data', 'Data has been saved successfully.', Ext.emptyFn, this);
    }
    
    

})