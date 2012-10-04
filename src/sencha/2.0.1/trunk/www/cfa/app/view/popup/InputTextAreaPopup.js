Ext.define('cfa.view.popup.InputTextAreaPopup', {
	extend : 'Ext.Panel',
	alias: 'widget.popupnote',

	config : {
		layout : 'fit',
		scrollable : {
			direction : 'vertical',
			directionLock : true
		},
		modal : true,
		top : '60%',
		left : '10%',
		rigth : '10%',
		height : '40%',
		width : '80%',
		hideOnMaskTap : true,
		items : [{
			xtype : 'toolbar',
			itemId : 'topbar',
			docked : 'top',
			layout: {
				pack:'right',
				align: 'center'
			},
			items : [{
                xtype : 'button',
                text : 'Done',
                listeners : {
                    tap : {
                        fn : Formpod.FormEngine.Utils.hidePopup,
                        scope : Formpod.FormEngine.Utils
                    }
                }
            }]
		}, {
			xtype : 'textareafield',
			clearIcon : false,
			maxRows : 20,
			itemId : 'inputfield'
		}],

		listeners : {
			hide : {
				fn : Formpod.FormEngine.Utils.onHidePopup,
				scope : Formpod.FormEngine.Utils
			}

		}

	}

})
