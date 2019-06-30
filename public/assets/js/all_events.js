const host = "https://bookaholic.herokuapp.com";
var i=0;

const addData= function(selector, data)
{
    
    i++
    selector.append(
    '<div class="event">'+	
'<img src="assets/img/'+data["image"]+'" class="event_photo" id="event'+i+'_photo">'+
'<h4 class="date" id="event'+i+'_date">'+data["date"]+' <br><span id="event'+i+'_place">'+data["place"]+'</span></h4>'+
'<h2 class="title" id="event'+i+'_title">The new mystery literature</h2>'+
'<h2 class="author" id="event'+i+'_author">with Gillian Flynn</h2>	'+
'<div class="learn_more"'+
     'onclick="goToLink(event page, '+host+'/event?event_id='+data["event_id"]+')"'+
     'onkeydown="goToLink(profile, '+host+'/event?event_id='+data["event_id"]+')"'+
     'role="link">Learn more</div>'+
		
'</div>'	

)}




const handler = function() { 
    
var a1 = document.getElementById("month_from");
var from = a1.options[a1.selectedIndex].text;


var a2 = document.getElementById("month_to");
var to = a2.options[a2.selectedIndex].text;


var a3 = document.getElementById("where");
var c3 = a3.options[a3.selectedIndex].text;
where = c3.toLowerCase();
if(where=="bookaholic greenwich")
    where="Greenwich";
else where="Mudchute"

if(from=="May")
    from=05;
else if(from=="June")
    from=06;
else if(from=="July")
    from=07;
else from=08;

if(to=="May")
    to=05;
else if(to=="June")
    to=06;
else if(to=="July")
    to=07;
else to=08;



fetch(host+"/api/events?offset=0&where="+where+"&from=2019-0"+from+"-01&to=2019-0"+to+"-30")
.then(response => response.json())
.then(data => data
     .forEach(event=> addData(events_container, event)))
    
}


//MAIN
var events_container= $("#events_container")
var buttons = document.getElementById("apply_filters");
buttons.addEventListener("click", handler);


      
