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
			},
		}
    },
	
	goToAbout: function(){
        this.redirectTo('about');
	},
    
	goToBasic: function(){
	  this.getMain().push({
                    title: 'Basics Help Page',
                    html:  '<font color="white">Basics Help Page</font>'
                });
	},
    
	goToFed: function(){
        this.redirectTo('feedback');
	},		
});