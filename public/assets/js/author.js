// const host set in navbar.js

(function() {
  const authorIntroSelector = $("#author_intro");
  const booksContainersSelector = $(".books_containers");
  const eventsContainerSelector = $(".events_container");
  const authorId = getUrlParametersAsObject(self.location.href).author_id;

  //Defined 2 different identifiers for the same resource: name and author_name. ADNOTANDA: Always be consistent with identifiers for the same resources, to avoid complexity &/| code duplication
  const getAuthors = (authors, tag) => authors.reduce(
    (taggedAuthors, author) => taggedAuthors + '<' + tag + ' class="book_author">' + author["name"] + '</' + tag +'>', "");

  const appendAuthorData = (data) => authorIntroSelector.replaceWith(
      '<section id="author_intro">' +
        '<h3 id="author_name">' + data["name"] + '</h3>' +
        '<img id="author_photo" src="' + createImgURL(data["picture"]) + '"/>' +
        '<h5 id="author_bio_title"> ' + data["short_bio"] + '</h5>' +
      '</section>'
  );

  const appendBookData = (selector, data) => data.writtenBooks.forEach(book =>
    selector.append(
      '<a class="book" href="/book?id=' + book["book_id"] + '">	' +
        '<img src="' + createImgURL(book["cover"]) + '" class="book_cover" alt="book_cover">' +
        '<h3 class="book_title">' + book["title"] + '</h3>' +
        getAuthors(book["authors"], "h3") +
      '</a>'
    )
  );

  const appendEventsData = (data) => {
    if (data["events"].length != 0)
      eventsContainerSelector.empty();

    data["events"].forEach(event =>
      eventsContainerSelector.append(
        '<div class="event">' +
          '<img src="' + createImgURL(event["image"]) + '" class="book_image_event" alt="event_photo" />' +
          '<h3 class="event_date">' + getFormattedDateTime(event["date"]) + '<br><span id="event_place">' + event["place"] + '</span></h3>' +
          '<h3 class="event_title">' + event["title"] + '</h3>' +
          '<h3 class="event_author">with ' + data["name"] + '</h3>' +
          '<a href="/event?id=' + event["event_id"] + '" title="menu_icon" type="button" role="button" class="learn_more">' +
            'Learn more' +
          '</a>' +
        '</div>'
      )
    )
  };


  fetch(host + "/api/authors/" + authorId)
  .then(response => response.json())
  .then(authorData => {
      appendAuthorData(authorData);

      Promise.all(
        authorData["written_books_id"].map(book_id =>
          Promise.all([
            fetch(host + '/api/books/' + book_id)
            .then(response => response.json())
            ,
            fetch(host + '/api/authors?of=' + book_id)
            .then(response => response.json())
          ])
          .then(bookObjectAndAuthors => {
            bookObjectAndAuthors[0].authors = bookObjectAndAuthors[1];
            return bookObjectAndAuthors[0]
          })
        )
      )
      .then(writtenBooks => {
        authorData.writtenBooks = writtenBooks;
        appendBookData(booksContainersSelector, authorData);
      });

      Promise.all(
        authorData["written_books_id"].map(book_id => fetch(host + "/api/events?about=" + book_id)
                                                      .then(response => response.json())
                                      )
      )
      .then(clusteredEvents => {
        authorData.events = clusteredEvents.flat();
        appendEventsData(authorData);
      })
  })
  .catch(error => alert("An error (message: " + error.message + ") occurred. Please check your connection and refresh your page."));
})()
