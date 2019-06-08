const host = "https://bookaholic.herokuapp.com";

//HELPER
const appendData = function(selector, data) {
  selector
  .append('<a href="/book?id=' + data["book_id"] +'">' +
            '<img src="/assets/img/'+ data["cover"] +'" height="300px" width="150px">' +
            '<span>' + data["title"] + '<br>' +
              extractAuthors(data["authors"]) +
            '</span>' +
          '</a>'
  );
};

//HELPER
const extractAuthors = function(authors) {
  var formattedAuthors = "";

  authors.forEach( author => {
    formattedAuthors += author["author_name"] + '<br>';
  });

  console.log(formattedAuthors);
  return formattedAuthors;
}


//MAIN
var latestProducts = $("#freshly_released .MagicScroll");
var ourSuggestions = $("#our_suggestions .MagicScroll");
var script = document.createElement('script');

Promise.all(
  [
    fetch(host + "/api/books?published_after=2013-01-10&limit=52&offset=0")
    .then(response => response.json())
    .then(data => data
      .forEach(book => appendData(latestProducts, book))
    ),
    fetch(host + "/api/books?suggested=true")
    .then(response => response.json())
    .then(data => data
      .forEach(book => appendData(ourSuggestions, book))
    )
  ]
)
.then( () => {
  //Add script to modify injected data - by doing it here, we are guaranteed that data has been loaded and is ready to be modified
  script.src = "/assets/js/magicscroll.js";
  script.defer = true;
  document.head.appendChild(script);
});
