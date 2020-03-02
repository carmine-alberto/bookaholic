// const host declared in navbar.js

const bookId = getUrlParametersAsObject(self.location.href).id;

const handlePostCartErrors = (response) => { if (response.ok) return response; else throw new Error(response.status); }; //Defined in navbar, should be removed and the code refactored to use that one


//To refactor inside appendBook
const addBookToCart = function() {
  const postParams = {
                      method: "POST",
                      headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + jwt
                               },
                      body: JSON.stringify({
                                            book_id: bookId,
                                            cover_type: $("#type_of_cover").text().toLowerCase(),
                                            amount: 1
                                          })
                    };
  $("#add_to_cart_button").blur();
  fetch(host + "/api/cart", postParams)
  .then(handlePostCartErrors)
  .then(response => {alert("Book added successfully!"); populateNavbar(); })
  .catch(error => {switch(parseInt(error.message)) {
                    case 500:
                      alert("The book is already in your cart! Get there to modify its quantity.");
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
  //Used to change the background-color according to the genre of the book. May be uncommented in the future
  //const bookSection = selector.parent();
  const bookTitleSelector = selector.children("#book_title");
  const bookImageSelector = selector.siblings("img");
  const bookPriceSelector = selector.children("#book_price");
  const bookSummarySelector = selector.children("#book_resume");
  //Used to change the background-color according to the genre of the book. May be uncommented in the future
  // const colourMap = {
  //   "mystery": "#b4f7af",
  //   "art and design": "#fbe8ff",
  //   "fiction": "#cafaf6",
  //   "science fiction": "#a49ddb6e",
  //   "nonfiction": "#faecb6"
  // }

  //Used to change the background-color according to the genre of the book. May be uncommented in the future
  // bookSection.css("background-color", colourMap[data["genre"]]);
  bookImageSelector.attr("src", createImgURL(data["cover"]));
  bookTitleSelector.text(data["title"]);
  data["authors"].forEach(author => bookTitleSelector.append('<h2>' + author["name"] + '</h2>'));
  bookPriceSelector.text(data["details"][0]["price"].toFixed(2) + " £");
  bookSummarySelector.text(data["abstract"]);

  if (jwt != null)
    $("#add_to_cart_button").prop("disabled", false);
};

//expects factsSheetSelector
const appendFactsSheet = (selector, data) => {
  const releaseDateSelector = selector.find("#release_date");
  const bookLanguageSelector = selector.find("#book_language");
  const bookGenreSelector = selector.find("#book_genre");
  const isbnSelector = selector.find("#isbn");
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

//expects aboutTheAuthorSelector
const appendAuthorsInfo = (selector, data) => data["authors"].forEach(author =>
  selector.append(
    '<div class="author">' +
      '<img class="author_picture" src="' + createImgURL(author["picture"]) + '" alt="' + author["name"] + ' picture" />' +
      '<h5 class="author_bio">' + author["short_bio"].substring(0, 200) + '<span class="dots">...</span></h5>' +
      '<a class="author_page_button" href="/author?author_id=' + author["author_id"] + '"' +
      	 'role="link">' +
	      'Go to the author\'s page</a>' +
    '</div>'
    )
  );

//expects reviewsContainerSelector
const appendReviews = (selector, data) => {
  if (data["reviews"].length != 0)
    selector.empty();
  data["reviews"]
  .forEach(review => selector.append(
      '<div class="single_review">' +
        '<img class="review_image" src="' + createImgURL("user.png") + '" alt="user_profile_picture">' +
        '<h5 class="reviewer" alt="reviewer_image">' + review["username"] + '</h5>' +
        '<img class="stars" src="/assets/img/stars_' + review["rating"] + '.png" />' +
        '<h5 class="review_title">' + review["gist"] + '</h5>' +
        '<h5 class="review">'+ review["content"] + '</h5>	' +
      '</div>'
    )
  )
};

//expects .events_container
const appendEvents = (selector, data) => {
  if (data["events"].length != 0)
    selector.empty();
  data["events"]
  .forEach(event =>
    selector.append(
      '<div class="event">' +
        '<img src="' + createImgURL(event["image"]) + '" class="book_image_event" alt="event_photo">' +
        '<h4 class="event_date">' + getFormattedDateTime(event["date"]) +
          '<br><span class="event_place">' + event["place"] + '</span>' +
        '</h4>' +
        '<h2 class="event_title">' + event["title"] + '</h2>' +
        '<h2 class="event_author">with ' + data["authors"][0]["name"] + '</h2>' + //Assumption: only events with one author related or only one of them present
        '<button title="menu_icon"' +
                'type="button"' +
                'class="learn_more"' +
                'role="link">' +
                '<a href="/event?id=' + event["event_id"] + '">' +
            'Learn more' +
            '</a>' +
        '</button>' +
      '</div>'
    )
)};

const appendSimilarBooks = data => {
    const relatedBooksSelector = $("#related_books").children(".scrolling-wrapper");
    const slidesContainerSelector = $(".slides");

    appendScrollingWrapperContent(relatedBooksSelector, data);
    appendCarouselSlides(slidesContainerSelector, data);
  }
//MAIN

(function() {

  const bookInfoSelector = $("#book_info");
  const factsSheetSelector = $("#fact_sheet");
  const aboutTheAuthorSelector = $("#about_the_authors");
  const reviewsContainerSelector = $("#reviews_container");
  const eventsContainerSelector = $(".events_container");

  fetch(host + "/api/books/" + bookId)
  .then(response => response.json())
  .then(data => {
      const bookData = data;

      Promise.all([
        fetch(host + "/api/authors?of=" + bookId)
        .then(response => response.json())
        .then(authors => {
            bookData.authors = authors;
        }),

        fetch(host + "/api/books?similar_to[id]=" + bookId + "&similar_to[criterion]=genre")
        .then(response => response.json())
        .then(relatedBooks => appendSimilarBooks(relatedBooks)),

        fetch(host + "/api/reviews?about=" + bookId)
        .then(response => response.json())
        .then(reviews => {
            bookData.reviews = reviews;
        }),

        fetch(host + "/api/events?about=" + bookId)
        .then(response => response.json())
        .then(events => {
            bookData.events = events;
        })
      ])
      .then(() => {
        appendBookInfo(bookInfoSelector, bookData);
        appendFactsSheet(factsSheetSelector, bookData);
        appendAuthorsInfo(aboutTheAuthorSelector, bookData);
        appendReviews(reviewsContainerSelector, bookData);
        appendEvents(eventsContainerSelector, bookData);
      })
    });

    $("#add_to_cart_button").on("click touch", addBookToCart);

})();
