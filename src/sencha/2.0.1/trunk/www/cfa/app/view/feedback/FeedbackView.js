Ext.define('cfa.view.feedback.FeedbackView', {
    extend: 'Ext.Panel',
	xtype: 'feedback',
	
    config: {
        id: 'feedbackview',
        modal: true,
        centered: true,
        hideOnMaskTap: true,
        height: '80%',
        width: '80%',
        title: 'Feedback',
        layout: 'fit',
		items:[{
                xtype: 'formpanel',
                items: [{
                        xtype: 'fieldset',
                        title: 'Please enter your feedback below:',
                        defaults: {
                            required: true
                        },
                        items: [{
                                xtype: 'textareafield',
                                id: 'feedbacktext',
                                maxRows: 12
                            }
                        ]
                    }, {
                        xtype: 'panel',
                        height: 40,
                        items: [{
                                xtype: 'button',
                                centered: true,
                                id: 'sendfeedbackbtn',
                                width: 200,
                                text: 'Send'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
