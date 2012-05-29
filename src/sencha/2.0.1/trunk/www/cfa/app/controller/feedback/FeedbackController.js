Ext.define('cfa.controller.feedback.FeedbackController',{
	extend: 'Ext.app.Controller',
	requires: ['cfa.view.feedback.FeedbackView'],
	
	config: {
        routes: {
            'feedback': 'showFeedbackPage'
        },

        refs: {
            main: 'main',
            sendFeedbackButton: '#sendfeedbackbtn'
        },
        
        control: {
            sendFeedbackButton: {
                tap: 'sendFeedback'
            }
        }
    },
	
	showFeedbackPage: function(){
		var feedbackView = Ext.create('cfa.view.feedback.FeedbackView');
        this.getMain().push(feedbackView);
	},
    
    sendFeedback: function() {
        Ext.Msg.alert('Feedback', 'Thank you for your feedback.', Ext.emptyFn);
    },
    
})


