
window.onload = function(){
  var newlink;
  var table = document.getElementById("links");
  var tr = document.createElement('tr');
  var i =1;
  var newlink = JSON.parse(localStorage.getItem(i-1));
  while(newlink!=null)
  {
        
    var title = newlink.title;
    var url = newlink.url;
    if (title.length > 50)
      title = title.substr(0, 35) + "...";
    if (url.length > 50)
      url = url.substr(0, 35) + "...";
    var date = newlink.date;
    var time = newlink.time;
    
    
    var row = table.insertRow(i).outerHTML="<tr id='row"+i+"'><td class='mdl-data-table__cell--non-numeric' id='title"+i+"'>"+title+"</td><td class='mdl-data-table__cell--non-numeric' id='url"+i+"'>"+url+"</td><td id='date"+i+"'>"+date+"</td><td id='time"+i+"'>"+time+"</td><td><input type='button' id='edit_button"+i+"' value='E' class='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored'> <input type='button' id='save_button"+i+"' value='S' class='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored' ></td></tr>";
    
    var domain = url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
	var imgUrl = "http://www.google.com/s2/favicons?domain_url=" + domain;
	var img = document.createElement("img");
	img.setAttribute('src', imgUrl);
	var firstRow=document.getElementById("links").rows[i];
    var x=firstRow.insertCell(0);
    x.appendChild(img);
    var eb = document.getElementById('edit_button'+i);
    if (typeof window.addEventListener === 'function'){
        (function (eb) {
            eb.addEventListener('click', function(){
                edit_row(eb.id.slice(-1));
                
            });
        })(eb);
    }
    var sb = document.getElementById('save_button'+i);
    if (typeof window.addEventListener === 'function'){
        (function (sb) {
            sb.addEventListener('click', function(){
                save_row(sb.id.slice(-1));
                var newlink = JSON.parse(localStorage.getItem(sb.id.slice(-1)-1));
                newlink.title=document.getElementById("title"+sb.id.slice(-1)).innerHTML;
		    	newlink.date=document.getElementById("date"+sb.id.slice(-1)).innerHTML;
		    	newlink.time=document.getElementById("time"+sb.id.slice(-1)).innerHTML;
		    	localStorage.removeItem(sb.id.slice(-1)-1);
		    	localStorage.setItem(sb.id.slice(-1)-1, JSON.stringify(newlink));
		    	var date = newlink.date;
			    var time = newlink.time;
			    var dl = date.split("-");
			    var tl = time.split(":");
			    
			    var g = new Date();
			    var f = new Date();
			    var currentTimeZoneOffsetInHours = f.getTimezoneOffset()*60000;
			    g = Date.UTC(+dl[0], dl[1]-1, +dl[2], +tl[0], +tl[1], +0, +0);
			    var lapse = (g - Date.now() + currentTimeZoneOffsetInHours);
			    if(lapse>-60000)
			    {
			    	chrome.alarms.create("notification_delay",{
				      "when": Date.now() + lapse

				    })
				    alert("Success");
			    }   
			    else
			    {
			    	alert("Please Enter Valid Time and Date Input");
			    }
            });
        })(sb);
    }
    i+=1;
    var newlink = JSON.parse(localStorage.getItem(i-1));
  }  
};
function edit_row(i)
{
	 
		
	 var title=document.getElementById("title"+i);
	 var date=document.getElementById("date"+i);
	 var time=document.getElementById("time"+i);
		
	 var title_data=title.innerHTML;
	 var date_data=date.innerHTML;
	 var time_data=time.innerHTML;
		
	 title.innerHTML="<input type='text' id='title_text"+i+"' value='"+title_data+"'>";
	 date.innerHTML="<input type='date' id='date_text"+i+"' value='"+date_data+"'>";
	 time.innerHTML="<input type='time' id='time_text"+i+"' value='"+time_data+"'>";
}

function save_row(i)
{
	 var title_val=document.getElementById("title_text"+i).value;
	 var date_val=document.getElementById("date_text"+i).value;
	 var time_val=document.getElementById("time_text"+i).value;

	 document.getElementById("title"+i).innerHTML=title_val;
	 document.getElementById("date"+i).innerHTML=date_val;
	 document.getElementById("time"+i).innerHTML=time_val;

}
