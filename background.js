//window.onload = function()

chrome.windows.onCreated.addListener(function() 
{
	  var tzoffset = (new Date()).getTimezoneOffset() * 60000; 
      var date2 = (Date.now() - tzoffset)
      var comments="You were scheduled to visit this link";
	  var i = 0;
	  var oldlink = JSON.parse(localStorage.getItem(i));
	  while(oldlink!=null)
	  {

	    var date = oldlink.date;
	    var time = oldlink.time;
	    if(oldlink.epoch < date2 && oldlink.value==0)
	    {
	    	console.log(oldlink);
	    	var title = oldlink.title;
            var url = oldlink.url;
            
	    	var options = {
				type: "image",
				title: "Read-Later",
				message: title,
				contextMessage :comments,
				iconUrl: "icon.png",
				buttons: [{
					title: "Not Now"
				}],
				imageUrl: "icon.png",
				requireInteraction: true,
				isClickable : true
			  };
			chrome.notifications.create(options);
			chrome.notifications.onClicked.addListener(function(){
		    	window.open(url);
		      });
			chrome.notifications.onButtonClicked.addListener(function(){
		    	window.open("settings.html"); //needs to be replaced by url of site...
		      });
			localStorage.removeItem(i);
		    var newlink = {"count":i, "url": url ,"title":title,"time":time,"date":date,"comments":comments,"value":1,"epoch":-1};
		    localStorage.setItem(i, JSON.stringify(newlink));
	   
	    }
	    i+=1;
	    oldlink = JSON.parse(localStorage.getItem(i));
	     
	    
	  }
	 	
});

chrome.alarms.onAlarm.addListener(function(e)
{
	if(e.name== "notification_delay")
	{
	  var tzoffset = (new Date()).getTimezoneOffset() * 60000; 
      var date2 = (new Date(Date.now() - tzoffset)).toISOString().substr(0, 16).replace('T', ' ');
      var comments="You are scheduled to visit this link now";
	  var i = 0;
	  var oldlink = JSON.parse(localStorage.getItem(i));
	  while(oldlink!=null )
	  {
	  	//console.log(oldlink);

	    var date = oldlink.date;
	    var time = oldlink.time;
	    var combo = date+" "+time;
	    if(combo == date2 && oldlink.value==0 )
	    {
	    	alert("Yo");

	    	var title = oldlink.title;
            var url = oldlink.url;
            

            if(oldlink.comments!=="undefined")
            {
            	if(oldlink.comments.length!==0)
            	{

            		comments=oldlink.comments;
            	}1
            }
            var options = {
				type: "image",
				title: "Read-Later",
				message: title,
				contextMessage :comments,
				buttons: [{
					title: "Not Now"
				}],
				iconUrl: "icon.png",
				imageUrl: "icon.png",
				requireInteraction: true,
				isClickable : true
		    };
		    chrome.notifications.create(options);
		    chrome.notifications.onClicked.addListener(function(){
		  	   window.open(url);
	        });
	        chrome.notifications.onButtonClicked.addListener(function(){
		    	window.open("settings.html"); //needs to be replaced by url of site...
		      });
	        localStorage.removeItem(i);
	        var newlink = {"count":i, "url": url ,"title":title,"time":time,"date":date,"comments":comments,"value":1,"epoch":-1};
	        localStorage.setItem(i, JSON.stringify(newlink));
	        break;
	        
	    }

	    else
	    {
	    	i+=1;
	    	oldlink = JSON.parse(localStorage.getItem(i));

	    }
	    
	  }
	  
      

	}
	
});


