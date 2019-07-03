const host = "https://bookaholic.herokuapp.com";

function getUrlParameter(url) {
    var toReturn = {};
    var questionSplit = url.split('?');
    questionSplit.shift();
    var onlyParameters = questionSplit.join('?');
    var splittedParameters = onlyParameters.split('&');
    for (var c = 0; c < splittedParameters.length; c++) {
        var parts = splittedParameters[c].split('=');
        if ($.trim(parts[0]) != '') {
            toReturn[parts[0]] = parts[1];
        }
    }
    return toReturn;
}



const addDataforEvent= function(selector1, data, selector2)
{
    selector1.replaceWith(
    
        '<div class="event">'+	
        '<img src="/assets/img/'+data["image"]+'" class="event_photo" id="event1_photo" alt="book cover">'+	
        '<h3 class="date" id="event1_date">'+ data["date"]+'<br><span id="event1_place">'+data["place"]+'</span></h3>'+
        '<h4 class="description" id="event1_description">'+data["info"]+'</h4>'+
        '</div>'
    )
    
    selector2.replaceWith(
        '<a id="book_details" href="'+host+'+/book?id="'+data.book_id+'">'+
	 'class="book_cover"'+ 
	 'alt="book cover"'+
	 'role="link"'+
	 'onclick="goToLink(book page, '+host+'+/book?id="'+data.book_id+')"'+
     'onkeydown="goToLink(book page, '+host+'+/book?id="'+data.book_id+')">See book details</a>'
        )
}

const appendDataForListThemes= function(selector, list)
{
    for(var i=0;i<list.length;i++)
        {
            selector.append(
                '<li id="theme_'+list[i]+'" role="option"><a href="https://bookaholic.herokuapp.com/theme?theme='+list[i]+'">'+list[i]+'</a></li>'
                )
                
        }
    
}

const appendDataForListGenres= function(selector, list)
{
    for(var k=0; k<list.length; k++)
        {
            selector.append(
               ' <li id="genre_'+list[k]+'"  role="option"> <a href="https://bookaholic.herokuapp.com/genre?genre='+list[k]+'">'+list[k]+'</a></li>'
            )
        }
    
}





//MAIN

var genre_list= $("#genre_list");
var themes_list= $("#themes_list");

var event_class= $(".event");
var book_details= $("#book_details");
 //Get id of author from URL
var Url = self.location.href;
var id= getUrlParameter(Url).event_id;



fetch(host + "/api/events/"+id)
.then(response => response.json())
.then(event=> addDataforEvent(event_class, event,book_details))
.then(
    fetch(host+"/api/books/themes")
    .then(response => response.json())
    .then(themes=> appendDataForListThemes(themes_list, themes))
)
.then(

    fetch(host+"/api/books/genres")
    .then(response => response.json())
    .then(genres=> appendDataForListGenres(genre_list, genres))
)

