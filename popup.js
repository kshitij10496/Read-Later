/*document.getElementById("submit").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("submit").click();
    }
});

*/


var count=0;
var storage = chrome.storage.sync;
var sumbit = document.getElementById("submit");

submit.addEventListener("click", function(){
  chrome.tabs.getSelected(null, function(tab){
    var i =0;
    var oldlink = JSON.parse(localStorage.getItem(i));
    while(oldlink!=null)
    {
      console.log(i);
      i+=1;   
      var oldlink = JSON.parse(localStorage.getItem(i));
      
    }
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var title = document.getElementById("title").value;
    var url = tab.url;
    var comments = document.getElementById("comments").value;
    var newlink;
    var dl = date.split("-");
    var tl = time.split(":");
    var g = new Date();
    var f = new Date();
    var currentTimeZoneOffsetInHours = f.getTimezoneOffset()*60000;
    
    g = Date.UTC(+dl[0], dl[1]-1, +dl[2], +tl[0], +tl[1], +0, +0);
    //alert(Date(f.getTime()));
    var lapse = (g - Date.now() + currentTimeZoneOffsetInHours);
    if(lapse>-60000)
    {
    	chrome.alarms.create("notification_delay",{
	      "when": Date.now() + lapse

	    })
	    newlink = {"count":i, "url": url ,"title":title,"time":time,"date":date,"comments":comments,"value":0,"epoch":(Date.now() + lapse)};
	    localStorage.setItem(i, JSON.stringify(newlink));
	    alert("Success");

    }   
    else
    {
    	alert("Please Enter Valid Time and Date Input");

    } 
  });
});


window.onload = function(){
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    document.getElementById("title").value = (tabs[0].title);
  });
  /*var date = new Date();
  dateFormat(date, "mm, dd, yyyy, hh:MM ");
  document.getElementById("time").value = date.setTime(date.getTime());
  document.getElementById("date").value = date.setDate(date.getDate() + 1);
  */
    
  };

/*function myFunction(url,title) {
	chrome.bookmarks.create({url: url, title: title});
	console.log(url);  
}*/



	
	










