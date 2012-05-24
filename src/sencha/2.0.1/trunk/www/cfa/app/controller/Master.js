Ext.define('cfa.controller.Master', {
   extend: 'Ext.app.Controller',
      
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
	  this.getMain().push({
                    title: 'About Page',
                    html:  '<font color="white">About Page</font>'
                });
	},				
	goToBasic: function(){
	  this.getMain().push({
                    title: 'Basics Help Page',
                    html:  '<font color="white">Basics Help Page</font>'
                });
	},		
	goToFed: function(){
	  this.getMain().push({
                    title: 'Feedback Page',
                    html:  '<font color="white">Feedback Page</font>'
                });
	},		
});