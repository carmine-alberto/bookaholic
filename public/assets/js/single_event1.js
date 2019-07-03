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
        '<a id="book_details" href="'+host+'/book?id='+data.book_id+'"'+
	 'class="book_cover"'+ 
	 'alt="book cover"'+
	 'role="link"'+
	 'onclick="goToLink(book page, '+host+'+/book?id="'+data.book_id+')"'+
     'onkeydown="goToLink(book page, '+host+'+/book?id="'+data.book_id+')">See book details</a>'
        )
}







//MAIN



var event_class= $(".event");
var book_details= $("#book_details");
 //Get id of author from URL
var Url = self.location.href;
var id= getUrlParameter(Url).event_id;



fetch(host + "/api/events/"+id)
.then(response => response.json())
.then(event=> addDataforEvent(event_class, event,book_details))


