Ext.define('cfa.controller.Master', {
   extend: 'Ext.app.Controller',
   
   requires: ['cfa.view.feedback.FeedbackView'],
   
   config:{
        refs:{
			main: 'main',			
	        aboutbtn :'#about-btn',
			basicbtn :'#basic-btn',
			fedbtn  :'#fed-btn'
        },
		
		control:{
			aboutbtn: {
			   tap: 'goToAbout'
			},
			basicbtn: {
			   tap: 'goToBasic'
			},
			fedbtn: {
			   tap: 'goToFed'
			}
		}
    },
	
	goToAbout: function(){
        this.redirectTo('about');
	},
    
	goToBasic: function(){
		if( cfa.app.helpUrl == "root" ){
			this.redirectTo('help');
		} else {
			this.redirectTo('help/'+ cfa.app.helpUrl);
		}
		
	},
    
	goToFed: function(){
        this.redirectTo('feedback');
	}
	
});