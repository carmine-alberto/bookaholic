// const host set in navbar.js, as well as utility functions(createImgURL, ...)

//MAIN

(function() {
  const eventId = getUrlParametersAsObject(window.location.href).id;

  const addEventData = data => {
    const titleSelector = $(".header_text");
    const authorNameSelector = $(".author");
    const eventBoxSelector = $(".event");
    const bookDetailsButtonSelector = $("#book_details");

    titleSelector.text(data["title"]);
    authorNameSelector.children("a").text("with " + data["authors"][0]["name"]);
    authorNameSelector.children("a").attr("href", "/author?author_id=" + data["authors"][0]["author_id"]);

    eventBoxSelector.children(".event_photo").attr("src", createImgURL(data["image"]));
    eventBoxSelector.find("#event_place").text();
    eventBoxSelector.children(".date").append(getFormattedDateTime(data["date"]) + '<br><span id="event_place">' + data["place"] + '</span>');
    eventBoxSelector.children(".description").text(data["info"]);
    bookDetailsButtonSelector.attr("href", "/book?id=" + data["book_id"]);
  };

  fetch(host + "/api/events/" + eventId)
  .then(response => response.json())
  .then(data => fetch(host + "/api/authors?of=" + data["book_id"])
                .then(response => response.json())
                .then(authors => { data.authors = authors; return data; })
  )
  .then(addEventData)
  .catch(error => alert("An error (" + error.message +  ") has occurred. Check your connection and refresh the page."));
})();
