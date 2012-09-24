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
		if (Ext.os.is.Desktop) {
			Ext.Msg.alert("Feedback", "Currently support only for iPad.");
		} else {
			window.plugins.emailComposer.showEmailComposer("CFA users' feedback", null, null, 'c3appfeedback@gmail.com', null, null, null);
		}
       
	},
})


