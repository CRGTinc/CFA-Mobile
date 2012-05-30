Ext.define('cfa.controller.feedback.FeedbackController',{
	extend: 'Ext.app.Controller',
    
	requires: ['cfa.view.feedback.FeedbackView'],
	
	config: {
        routes: {
            'feedback': 'showFeedbackPage'
        },

        refs: {
            main: 'main',
            sendFeedbackButton: '#sendfeedbackbtn',
            feedbackTextArea: '#feedbacktext'
        },
        
        control: {
            sendFeedbackButton: {
                tap: 'sendFeedback'
            }
        }
    },
	
	showFeedbackPage: function() {
        if (!this.feedbackView) {
            this.feedbackView = Ext.create('cfa.view.feedback.FeedbackView');
            Ext.Viewport.add(this.feedbackView);
        }
        
        this.feedbackView.show();
	},
    
    sendFeedback: function() {
        if (this.getFeedbackTextArea().getValue() == '') {
            Ext.Msg.alert('Feedback', 'Please enter your feedback before sending.', Ext.emptyFn);            
        } else {
            Ext.Msg.alert('Feedback', 'Thank you for your feedback.', sentFeedback);
        }
    },
    
})

function sentFeedback() {
    Ext.getCmp('feedbackview').hide();
    Ext.getCmp('feedbacktext').setValue('');
}

