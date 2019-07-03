const host = "https://bookaholic.herokuapp.com";
var i=0;

//var name_author;

const addData= function(selector, data)
{
    
    i++
    selector.append(
    '<div class="event">'+	
'<img src="/assets/img/'+data["image"]+'" class="event_photo" id="event'+i+'_photo">'+
'<h4 class="date" id="event'+i+'_date">'+data["date"].slice(0,10)+' <br><span id="event'+i+'_place">'+data["place"]+'</span></h4>'+
'<h2 class="title" id="event'+i+'_title">'+data["title"]+'</h2>'+
'<h2 class="author" id="event'+i+'_author">with </h2>'+
'<a class="learn_more"'+
     'onclick="goToLink(event page, '+host+'/event?event_id='+data["event_id"]+')"'+
     'onkeydown="goToLink(profile, '+host+'/event?event_id='+data["event_id"]+')"'+
     'role="link"'+
    'href="'+host+'/event?event_id='+data["event_id"]+'">Learn more</a>'+
		

        
'</div>'	)

}


 


/*function returnAuthor(books, book_id)
    {
        for(var i=0; i<books.length; i++)
            {
                if(books[i].book_id==book_id) name_author= books[i].authors[0].author_name
            }
        name_author="CIAO"
    }

const lookForAuthor= function(event)
{
    fetch(host+"/api/books?offset=0")
    .then(response => response.json())
	.then(books => returnAuthor(books, event.book_id))
    .then(addData(events_container, event))
    
}*/





const handler = function() { 

    
events_container.empty();

var a3 = document.getElementById("where");
var c3 = a3.options[a3.selectedIndex].text;





    
fetch(host+"/api/events?offset=0&where="+c3)
.then(response => response.json())
.then(data => data
     .forEach(event=> addData(events_container,event)))
              
    
}


const addDataforPlaces= function(selector, data)
{
    for(var h=0;h<data.length;h++)
        {
            selector.append(
                '<option value="'+data[h]+'">'+data[h]+'</option>'
            )
        }
}



    

    


//MAIN

var where= $("#where")
var events_container= $("#events_container")

var buttons = document.getElementById("apply_filters");
buttons.addEventListener("click", handler);

fetch(host+"/api/events/places")
.then(response => response.json())
.then(places => addDataforPlaces(where, places))
.then(
	fetch(host+"/api/events?offset=0")
	.then(response => response.json())
	.then(data => data
	      .forEach(event => addData(events_container,event)))
	)
	






      
