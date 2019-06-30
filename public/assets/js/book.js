const host = "https://bookaholic.herokuapp.com";
var i=0;


//HELPER

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


const appendDataforbookinfo = function(selector, data) {
  selector
  .replaceWith(
'<div id="book_info">' +
'<img id="book_image" alt="book_cover" src="assets/img/'+ data["cover"]+'" alt="book_cover">' +
'<h1 id="book_name">' + data["title"] + '</h1>' +
'<h2 id="book_author_1"> Book_author </h2>' +
'<h2 id="book_price">' + data["details"][0]["price"] + '</h2>' +
'<h5 id="book_resume">' + data["abstract"] + '</h5>' + 
'</div>	' +
'<div id="add_to_cart_button" role="link" onclick="goToLink(cart page, )" onkeydown="goToLink(cart page, )">add to cart</div> </div>'	
  );
    genreBook= data["genre"];
};




const appendDataforFactsheet = function(selector, data) {
  selector
  .replaceWith(
'<h4 class="section_title" id="fact_sheet_title"> Fact sheet </h4>' +	
'<div id="fact_sheet_content">' +
'<div class="column">' +
'<h4 class="fact_title"> Released : </h4>' + 
'<h5 id="release_date"> Release_date </h5>' +
'<h4 class="fact_title"> Language </h4>' +
'<h5 id="book_language">' + data["language"] + '</h5>' +
'<h4 class="fact_title"> Genre </h4>' +
'<h5 id="book_genre">' + data["genre"] + '</h5>' +
'</div>' +
'<div class="column">'	+
'<h4 class="fact_title"> Publisher : </h4>' +
'<h5 id="book_publisher">' + data["publication_date"] + '</h5>' +
'<h4 class="fact_title"> ISBN </h4>' +
'<h5 id="isbn">' + data["details"][0]["isbn"] + '</h5>' +
'<h4 class="fact_title"> Type of cover </h4>'+
'<h5 id="type_of_cover">' + data["details"][0]["cover_type"] + '</h5>'+
'</div>' +
'</div>' 
)};


const appendDataforAuthor = function(selector, data) {
    i++;
  selector
  .append('<div class="author">' +
'<h5 class="author_bio" id="author'+i+'_bio">' + data["short_bio"] + '<span class="dots">...</span></h5>' +
'<div class="author_page_button"'+
	 'role="link"'+
	 'onclick="goToLink(author page, '+host+'/author?author_id='+data["author_id"]+')"'+
     'onkeydown="goToLink(author page, '+host+'/author?author_id='+data["author_id"]+')">go to author s page</div>	'+
          '</div>'
  );
};




const appendDataforReview= function(selector, dat)
{
    
    var k;
    
    if(dat.lenght==0)
        {
            selector.append("NO REVIEWS")
        }
    else
        {
            //selector.append("<h>"+dat.lenght+"</h>");
            for(k=1;k<=dat.lenght; k++)
                {
                    
                    selector.append(
                    '<div class="single_review" id="review_'+k+'">' +
                    '<img class="review_image" src="/assets/img/user.png" alt="user profile picture">' + 	
                    '<h5 class="reviewer" id="reviewer_'+k+'">' + dat[k-1]["username"] + '</h5>'+
                    '<img class="stars" id="stars_'+k+'" src="assets/img/'+dat[k-1]["rating"]+' stelle.png">' +
                    '<h5 class="review" id="review_text_'+i+'">'+ dat[k-1]["gist"] + '</h5>	' +
                    '</div>'
                )
                }
                
            
        }
    
    
    
}

const appendDataforEvents= function(selector, data)
{
    
    if(data.length==0)
        {
            selector.replaceWith(
                '<section id="related_events">'+
	
                '<h2 class="section_title" id="related_events_title">Related events</h2>	'+
                "NO EVENTS"+
                '</section>'
            
            );
        }
    else{
        
        selector.replaceWith(
    '<section id="related_events">'+
'<h2 class="section_title" id="related_events_title">Related events</h2>'+	
        '<div class="events_container">'+	
        '<div class="event">	'+
'<img src="assets/img/'+data[0]["image"]+'" class="book_image_event" id="event1_photo" alt="event_photo">'+
'<h4 id="event_date">'+ data[0]["date"] + '<br><span id="event_place">'+data[0]["place"]+'</span></h4>' +
'<h2 class="title" id="event_title">The new mystery literature</h2>'+
'<h2 class="author" id="event_author">with Gillian Flynn</h2>'+
'<div id="learn_more">' + data[0]["info"] + '</div>'+

'</section>'
    
    
    )}
    
}

const appendDataforOtherBook= function(genre)
{
    
}





//MAIN

 //Get id of author from URL
var Url = self.location.href;
var id= getUrlParameter(Url).id;

var book_info = $("#book_info");
var fact_sheet = $("#fact_sheet");
var about_the_author = $("#about_the_author");
var reviews_container = $("#reviews_container");
var related_events = $("#related_events");
var genreBook = new String(""); //mi serve per poi creare i related books
var x = new Boolean("false");


fetch(host + "/api/books/"+id)
    .then(response => response.json())
    .then(book => appendDataforbookinfo(book_info, book))
    .then(
fetch(host + "/api/books/"+id)
    .then(response => response.json())
    .then(book => appendDataforFactsheet(fact_sheet, book))
    .then(
        fetch(host + "/api/authors?limit=5&offset=0&of="+id)
        .then(response => response.json())
        .then(data => data
        .forEach(author => appendDataforAuthor(about_the_author, author))))
    .then(
            fetch(host+"/api/reviews?limit=12&offset=0&about="+id)
            .then(response => response.json())
            .then(reviews => appendDataforReview(reviews_container,reviews))
        )
    .then(
        fetch(host+ "/api/events?offset=0&about="+id)
        .then(response => response.json()) 
        .then(events => appendDataforEvents(related_events, events))
            
        )
    
    )
        
    









  