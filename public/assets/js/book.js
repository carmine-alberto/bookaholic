// const host declared in navbar.js
var i=0;
var libro=0;


//To refactor inside appendBook
const addBookToCart = () => {
  const postParams = {
                      method: "POST",
                      headers: {"Content-Type": "text/plain",
                               "Authorization": "Bearer " + jwt
                              },
                      body: "Via del Carroccio, 33/F, 20032, Milano (MI)"
                    };

  }
}

//to refactor inside main
const appendBookInfo = (selector, data) => {
  const bookTitleSelector = selector.children("#book_name");
  const bookImageSelector = selector.children("img");
  const bookAuthorsSelector = selector.children("#book_author");
  const bookPriceSelector = selector.children("#book_price");
  const bookSummarySelector = selector.children("#book_resume");
  const addToCartButtonSelector = selector.children("#add_to_cart_button");

  bookImageSelector.attr("src", data["cover"]);
  bookTitleSelector.text(data["title"]);
  //Handle authors
  bookPriceSelector.text(data["details"][0]["price"].toFixed(2) + " £");
  bookSummarySelector.text(data["abstract"]);

  if (jwt != null) {
    addToCartButtonSelector.prop("hidden", false);
    addToCartButtonSelector.on("click touch", addBookToCart);
  }
}



                        );





const appendFactsSheet = (selector, data) => selector.append(
                          '<h4 class="section_title" id="fact_sheet_title"> Facts Sheet </h4>' +
                          '<div id="fact_sheet_content">' +
                            '<div class="column">' +
                              '<h4 class="fact_title"> Released : </h4>' +
                              '<h5 id="release_date"> ' + data["publication_date"] + ' </h5>' +
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
                        );



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
'<h4 id="event_date">'+ data[0]["date"] + '<br><span id="event_place">'+data[0]["place"]+'</span></h4>' +
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


const bookId = getUrlParametersAsObject(self.location.href).id;

const bookInfoSelector = $("#book_info");
const factsSheetSelector = $("#fact_sheet");
const aboutTheAuthorSelector = $("#about_the_author");
const reviewsContainerSelector = $("#reviews_container");
const relatedEventsSelector = $("#related_events");
const genreBook = new String(""); //mi serve per poi creare i related books
const x = new Boolean("false");




fetch(host + "/api/books/"+bookId)
    .then(response => response.json())
    .then(book => appendDataforbookinfo(book_info, book))
    .then(
fetch(host + "/api/books/"+bookId)
    .then(response => response.json())
    .then(book => appendFactsSheet(fact_sheet, book))
    .then(
        fetch(host + "/api/authors?limit=5&offset=0&of="+bookId)
        .then(response => response.json())
        .then(data => data
        .forEach(author => appendDataforAuthor(about_the_author, author))))
    .then(
        fetch(host+"/api/books?similar_to[id]="+bookId+"&similar_to[criterion]=genre&limit=15&offset=0")
         .then(response => response.json())
        .then(books_related => appendDataforOtherBook(books_related)))
    )
    .then(
            fetch(host+"/api/reviews?limit=12&offset=0&about="+bookId)
            .then(response => response.json())
            .then(reviews => appendDataforReview(reviews_container,reviews))
        )
    .then(
        fetch(host+ "/api/events?offset=0&about="+bookId)
        .then(response => response.json())
        .then(events => appendDataforEvents(related_events, events))

        )
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
