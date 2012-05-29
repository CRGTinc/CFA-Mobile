Ext.define('cfa.view.feedback.FeedbackView', {
    extend: 'Ext.Panel',
	xtype: 'feedback',
	
    config: {
        title: 'Feedback',
        layout: 'fit',
		items:[{
                xtype: 'formpanel',
                items: [{
                        xtype: 'fieldset',
                        title: 'Please enter your feedback below, then hit send button:',
                        defaults: {
                            required: true,
                            labelWidth: '20%'
                        },
                        items: [{
                                xtype: 'textareafield',
                                name: 'feedbacktext',
                                maxRows: 10
                            }
                        ]
                    }, {
                        xtype: 'panel',
                        items: [{
                                xtype: 'button',
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
