const host = "https://bookaholic.herokuapp.com";
var i=0;
var libro=0;


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
'<img id="book_image" alt="book_cover" src="/assets/img/'+ data["cover"]+'" alt="book_cover">' +
'<h1 id="book_name">' + data["title"] + '</h1>' +
'<h2 id="book_author_1">   </h2>' +
'<h2 id="book_author_2"> </h2>'+
'<br>'+
'<h2 id="book_author_3"> </h2>'+
'<h2 id="book_author_4"> </h2>'+	  
'<h2 id="book_price">' + data["details"][0]["price"] + ' euro</h2>' +
'<h5 id="book_resume">' + data["abstract"] + '</h5>' +
'</div>	' +
'<div id="add_to_cart_button" role="link" onclick="goToLink(cart page, )" onkeydown="goToLink(cart page, )">add to cart</div> </div>'
  );
    genreBook= data["genre"];
	
	fetch(host+"/api/books?offset=0")
	.then(response => response.json())
	.then(books => appendDataForNameAuthor(books))
};


const appendDataForNameAuthor= function(books)
{
	
	var book_author_1= $("#book_author_1")
	var book_author_2= $("#book_author_2")
	var book_author_3= $("#book_author_3")
	var book_author_4= $("#book_author_4")
	
	if(books.lenght==0) book_author_1.append("CIAO")
	
	for(var t=0;t<books.lenght;t++)
	{
		
		if(books[t].book_id==id)
		{
			
			for(var f=0;f<books[t].authors.lenght;f++)
			{
				
				if(f==0) book_author_1.append(books[t].authors[0].author_name)
				if(f==1) book_author_2.append(books[t].authors[1].author_name)
				if(f==2) book_author_3.append(books[t].authors[2].author_name)
				if(f==3) book_author_4.append(books[t].authors[3].author_name)
			}
		}
	}
}
					
			



const appendDataforFactsheet = function(selector, data) {
  selector
  .replaceWith(
'<h4 class="section_title" id="fact_sheet_title"> Fact sheet </h4>' +
'<div id="fact_sheet_content">' +
'<div class="column">' +
'<h4 class="fact_title"> Released : </h4>' +
'<h5 id="release_date"> ' + data["publication_date"].slice(0,10) + ' </h5>' +
'<h4 class="fact_title"> Language </h4>' +
'<h5 id="book_language">' + data["language"] + '</h5>' +
'<h4 class="fact_title"> Genre </h4>' +
'<h5 id="book_genre">' + data["genre"] + '</h5>' +
'</div>' +
'<div class="column">'	+
'<h4 class="fact_title"> Publisher : </h4>' +
'<h5 id="book_publisher"> Penguin </h5>' +
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
'<h5 class="author_bio" id="author'+i+'_bio">' + data["short_bio"].substring(0, 100) + '<span class="dots">...</span></h5>' +
'<a class="author_page_button" href="'+host+'/author?author_id='+data["author_id"]+'"'+
	 'role="link"'+
	 'onclick="goToLink(author page, '+host+'/author?author_id='+data["author_id"]+')"'+
     'onkeydown="goToLink(author page, '+host+'/author?author_id='+data["author_id"]+')">go to author s page</a>	'+
          '</div>'
  );
};




const appendDataforReview= function(selector, dat)
{

    var k;

    if(dat.lenght==0)
        {
            selector.append('<h3 id=no_reviews> NO REVIEWS </h3>')
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
                '<h3 id="no_Events"> NO EVENTS </h3>'+
                '</section>'

            );
        }
    else{

        selector.replaceWith(
    '<section id="related_events">'+
'<h2 class="section_title" id="related_events_title">Related events</h2>'+
        '<div class="events_container">'+
        '<div class="event">	'+
'<img src="/assets/img/'+data[0]["image"]+'" class="book_image_event" id="event1_photo" alt="event_photo">'+
'<h4 id="event_date">'+ data[0]["date"].slice(0,10) + '<br><span id="event_place">'+data[0]["place"]+'</span></h4>' +
'<h2 class="title" id="event_title">The new mystery literature</h2>'+
'<h2 class="author" id="event_author">with Gillian Flynn</h2>'+
'<div id="learn_more">' + data[0]["info"] + '</div>'+

'</section>'


    )}

}

const appendDataforOtherBook= function(data)
{

    var slide_container= $("#slide_container_1");
    if(data.length<6)
        {
            var slide_2= $("#slide_2")
            var img_2=$("#img-2")
            var slide_3= $("#slide_3")
            var img_3=$("#img-3")
            img_2.remove();
            img_3.remove();
            slide_2.remove();
            slide_3.remove();
        }
    else(data.length<11)
    {
        var slide_3= $("#slide_3")
        var img_3=$("#img-3")
        slide_3.remove();
        img_3.remove();
    }

    for(var y=0;y<data.length;y++)
        {
            libro++;

            if(data[y].authors.length==1)
                {
                   slide_container.append(
                '<a class="image_and_caption" href="'+host+'/book?id='+data[y].book_id+'">'+
 	       '<img src="/assets/img/'+data[y]["cover"]+'"'+
				'id="slide1_img1"'+
	 			'alt="book cover"'+
	 			'role="link"'+
	 			'onclick="goToLink(book page, '+host+'/book?id='+data[y].book_id+')"'+
     			'onkeydown="goToLink(book page, '+host+'/book?id='+data[y].book_id+')">	'+
		   '<div class="caption_container">'+
		   '<h6 class="book_title">'+data[y]["title"]+'</h6>	'+
   		   '<h6 class="book_author" id="book'+libro+'_author1">'+data[y].authors[0].author_name+'</h6>'+

			'</div>'+
			'</a>'
            )
                }

            else if(data[y].authors.length==2)
            {
                slide_container.append(
                '<a class="image_and_caption" href="'+host+'/book?id='+data[y].book_id+'">'+
 	       '<img src="/assets/img/'+data[y]["cover"]+'"'+
				'id="slide1_img1"'+
	 			'alt="book cover"'+
	 			'role="link"'+
	 			'onclick="goToLink(book page, '+host+'/book?id='+data[y].book_id+')"'+
     			'onkeydown="goToLink(book page, '+host+'/book?id='+data[y].book_id+')">	'+
		   '<div class="caption_container">'+
		   '<h6 class="book_title">'+data[y]["title"]+'</h6>	'+
   		   '<h6 class="book_author" id="book'+libro+'_author1">'+data[y].authors[0].author_name+'</h6>'+
   		   '<h6 class="book_author" id="book'+libro+'_author2">'+data[y].authors[1].author_name+'</h6>'+
			'</div>'+
			'</a>'
            )
            }

            else if(data[y].authors.length==3)
                {
                    slide_container.append(
                '<a class="image_and_caption" href="'+host+'/book?id='+data[y].book_id+'">'+
 	       '<img src="/assets/img/'+data[y]["cover"]+'"'+
				'id="slide1_img1"'+
	 			'alt="book cover"'+
	 			'role="link"'+
	 			'onclick="goToLink(book page, '+host+'/book?id='+data[y].book_id+')"'+
     			'onkeydown="goToLink(book page, '+host+'/book?id='+data[y].book_id+')">	'+
		   '<div class="caption_container">'+
		   '<h6 class="book_title">'+data[y]["title"]+'</h6>	'+
   		   '<h6 class="book_author" id="book'+libro+'_author1">'+data[y].authors[0].author_name+'</h6>'+
   		   '<h6 class="book_author" id="book'+libro+'_author2">'+data[y].authors[1].author_name+'</h6>'+
           '<h6 class="book_author" id="book'+libro+'_author3">'+data[y].authors[2].author_name+'</h6>'+
			'</div>'+
			'</a>'
            )
                }
            else
            {
                slide_container.append(
                '<a class="image_and_caption" href="'+host+'/book?id='+data[y].book_id+'">'+
 	       '<img src="/assets/img/'+data[y]["cover"]+'"'+
				'id="slide1_img1"'+
	 			'alt="book cover"'+
	 			'role="link"'+
	 			'onclick="goToLink(book page, '+host+'/book?id='+data[y].book_id+')"'+
     			'onkeydown="goToLink(book page, '+host+'/book?id='+data[y].book_id+')">	'+
		   '<div class="caption_container">'+
		   '<h6 class="book_title">'+data[y]["title"]+'</h6>	'+
   		   '<h6 class="book_author" id="book'+libro+'_author1">'+data[y].authors[0].author_name+'</h6>'+
   		   '<h6 class="book_author" id="book'+libro+'_author2">'+data[y].authors[1].author_name+'</h6>'+
           '<h6 class="book_author" id="book'+libro+'_author3">'+data[y].authors[2].author_name+'</h6>'+
            '<h6 class="book_author" id="book'+libro+'_author4">'+data[y].authors[3].author_name+'</h6>'+
			'</div>'+
			'</a>'
            )
            }

            if(y==4) slide_container= $("#slide_container_2");
            else if(y==9) slide_container= $("#slide_container_3");

        }



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
        fetch(host+"/api/books?similar_to[id]="+id+"&similar_to[criterion]=genre&limit=15&offset=0")
         .then(response => response.json())
        .then(books_related => appendDataforOtherBook(books_related)))
    )
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

