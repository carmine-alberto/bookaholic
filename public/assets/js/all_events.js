//const host set in navbar.js

(function() {
  const whereSelector = $("#where");
  const eventsContainerSelector = $("#events_container");
  const buttonSelector = $("#apply_filters");

  const appendEvents = (selector, data) => {
    selector.empty();
    data.forEach(event =>
      selector.append(
        '<div class="event">' +
          '<img src="' + createImgURL(event["image"]) + '" class="event_photo">' +
          '<h4 class="date">' + getFormattedDateTime(event["date"]) + ' <br><span>' + event["place"] + '</span></h4>' +
          '<h2 class="title">' + event["title"] + '</h2>' +
          '<h2 class="author">with ' + event["authors"][0]["name"] + '</h2>' +
          '<a class="learn_more"' +
              'role="link"' +
              'href="/event?id=' + event["event_id"] + '">Learn more</a>' +
        '</div>'
      )
    )
  };

  const addPlacesIntoSelector = (selector, data) => data.forEach(place =>
                                  selector.append(
                                    '<option value="' + place + '">' + place + '</option>'
                                  )
                                );

  const getAndAppendEvents = filters =>
    fetch(host + "/api/events?limit=100&" + filters)
  	.then(response => response.json())
  	.then(events => events
                    .map(async event => {  //This requires further investigation as well: works after many "console.log"s and reverse-engineering, but I don't know how
                      event.authors = await fetch(host + "/api/authors?of=" + event["book_id"])
                                            .then(response => response.json());

                      return event;
                    })
    )
    .then(eventsWithAuthorsInPromises => Promise
                                         .all(eventsWithAuthorsInPromises)
                                         .then(eventsWithAuthors => appendEvents(eventsContainerSelector, eventsWithAuthors))
    )
    .catch(error => alert("An error has occurred: " + error.message + ". Check your connection and try refreshing your page."));


  fetch(host + "/api/events/places")
  .then(response => response.json())
  .then(places => addPlacesIntoSelector(whereSelector, places));

  getAndAppendEvents("");

  buttonSelector.on("click touch", () => getAndAppendEvents("where=" + whereSelector.children("option:selected").html()));
})();
