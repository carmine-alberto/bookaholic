// const host declared in navbar.js

(function() {
  const bestsellerScrollingWrapperSelector = $("#best_sellers").children(".scrolling-wrapper");
  const bestsellerCarouselSelector = $("#best_sellers").find(".slides");
  const ourSuggestionsSelector = $("#our_suggestions_container");

  const appendOurSuggestionsContent = data => {
    const suggestors = ["Laura", "Carmine", "Giuseppe"];

    data.forEach((book, index) => ourSuggestionsSelector.append(
      '<a href="/book?id=' + book["book_id"] + '">' +
        '<div class="book">' +
          '<h4 class="suggestion">suggested by<span class="suggestor_name">  ' + suggestors[index%3] + '</span></h4>' +
          '<img src="' + createImgURL(book["cover"]) + '" class="book_cover_suggested" alt="' + book["title"] + ' Image">' +
          '<h4 class="book_title_suggested">' + book["title"] + '</h4>' +
          createAuthorsTag(book["authors"], "h4") +
        '</div>' +
      '</a>'
      )
    )
  };

  //MAIN BODY
  fetch(host + "/api/books?bestseller=true&limit=100")
  .then(response => response.json())
  .then(bestseller => {
    appendScrollingWrapperContent(bestsellerScrollingWrapperSelector, bestseller);
    appendCarouselSlides(bestsellerCarouselSelector, bestseller);
  });

  fetch(host + "/api/books?suggested=true&limit=5")
  .then(response => response.json())
  .then(ourSuggestions => appendOurSuggestionsContent(ourSuggestions));

  $("button").on("click touch", function() {$(this).blur();});
})();
