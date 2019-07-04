// const host declared in navbar.js

const handlePostCartErrors = (response) => { if (response.ok) return response; else throw new Error(response.status); };


//To refactor inside appendBook
const addBookToCart = (data) => {
  const postParams = {
                      method: "POST",
                      headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + jwt
                               },
                      body: JSON.stringify({
                                            book_id: data["book_id"],
                                            cover_type: data["details"][0]["cover_type"],
                                            amount: 1
                                          })
                    };
  fetch(host + "/api/cart", postParams)
  .then(handlePostCartErrors)
  .then(response => alert("Book added successfully!"))
  .catch(error => {switch(parseInt(error.message)) {
                    case 500:
                      alert("The book is already in the cart! Get there to modify its quantity.");
                      break;
                    case 400:
                      alert("Invalid JWT, you'll be redirected to the login page.");
                      window.location.href = "/login";
                      break;
                    default:
                      alert("Unexpected error - check your connection and try refreshing the page");
                    }
                  });
}


//to refactor inside main - expects bookInfoSelector
const appendBookInfo = (selector, data) => {
  const bookTitleSelector = selector.children("#book_name");
  const bookImageSelector = selector.children("img");
  const bookAuthorsSelector = selector.children("#book_author");
  const bookPriceSelector = selector.children("#book_price");
  const bookSummarySelector = selector.children("#book_resume");
  const addToCartButtonSelector = selector.children("#add_to_cart_button");

  bookImageSelector.attr("src", data["cover"]);
  bookTitleSelector.text(data["title"]);
  data["authors"].forEach(author => bookAuthorsSelector.append('<p>' + author["name"] + '</p>'));
  bookPriceSelector.text(data["details"][0]["price"].toFixed(2) + " £");
  bookSummarySelector.text(data["abstract"]);

  if (jwt != null) {
    addToCartButtonSelector.removeClass("hidden");
    addToCartButtonSelector.on("click touch", addBookToCart(data));
  }
};


const appendFactsSheet = (selector, data) => {
  const releaseDateSelector = selector.find("#release_date");
  const bookLanguageSelector = selector.find("#book_language");
  const bookGenreSelector = selector.find("#book_genre");
  const isbnSelector = selector.find("#book_genre");
  const typeOfCoverSelector = selector.find("#type_of_cover");
  const releaseDate = new Date(data["publication_date"]);

  releaseDateSelector.text(releaseDate.toLocaleDateString('en-EN', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric' }));
  bookLanguageSelector.text(capitalizeString(data["language"]));
  bookGenreSelector.text(capitalizeString(data["genre"]));
  isbnSelector.text(capitalizeString(data["details"][0]["isbn"]));
  typeOfCoverSelector.text(capitalizeString(data["details"][0]["cover_type"]));
};


const appendAuthorsInfo = (selector, data) => data["authors"]
  .forEach(author => selector.append(
    '<div class="author">' +
      '<h5 class="author_bio">' + author["short_bio"].substring(0, 100) + '<span class="dots">...</span></h5>' +
      '<a class="author_page_button" href="'+ host +'/author?id=' + author["author_id"] + '"' +
      	 'role="link">' +
	      'Go to the author\'s page</a>' +
    '</div>'
    )
  );


const appendReviews = (selector, data) => data["reviews"]
  .forEach(review => selector.append(
      '<div class="single_review">' +
        '<img class="review_image" src="/assets/img/user.png" alt="user profile picture">' +
        '<h5 class="reviewer">' + review["username"] + '</h5>' +
        '<img class="stars" src="assets/img/stars_' + review["rating"] + '>' +
        '<h5 class="review">'+ review["content"] + '</h5>	' +
      '</div>'
    )
  );

//Selector should be .events_container
const appendDataforEvents = (selector, data) => data["events"]
  .forEach(event => {
    const eventDateTime = new Date(event["date"]);
    const dateTimeOptions = {year: 'numeric', month: 'long', day: 'numeric', hour: "2-digit", minute: "2-digit" }

    selector.append(
      '<div class="event">' +
        '<img src="/assets/img/' + event["image"]+'" class="book_image_event" alt="event_photo">' +
        '<h4 id="event_date">'+ eventDateTimedate.toLocaleTimeString('en-EN', dateTimeOptions) +
          '<br><span id="event_place">' + event["place"] + '</span>' +
        '</h4>' +
        '<h2 class="title" id="event_title">' + event["title"] + '</h2>' +
        '<h2 class="author" id="event_author">with' + data["authors"][0]["name"] + '</h2>' + //Assumption: only events with one author related or only one of them present
        '<a href="/event?id=' + event["event_id"] + '">' +
          '<button title="menu_icon"' +
                  'type="button"' +
                  'class="learn_more"' +
                  'role="link">' +
              'Learn more' +
          '</button>' +
        '</a>' +
      '</div>'
    )
  }
);

const appendSimilarBooks = (selector, data) => {
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
const eventsContainerSelector = $("#related_events");

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
