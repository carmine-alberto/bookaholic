const host = "https://bookaholic.herokuapp.com";

const appendData = function(selector, data) {
  selector
  .append('<li>' +
            '<a href="/book?id=' + data["book_id"] +'">' +
             '<img src="/assets/img/'+ data["cover"] +'" style="height: 250px; width: 150px">' +
             '</a>' +
             '<h4 style="text-align: center">' + data["title"] + '</h4>' +
             extractAuthors(data["authors"]) +
           '</li>'
  );
};

const extractAuthors = function(authors) {
  var formattedAuthors = "";

  authors.forEach( author => {
    formattedAuthors += '<h5 style="text-align: center">' + author["author_name"] + '</h5>';
  });

  return formattedAuthors;
}



var main = $(".my-flipster ul");
var script = document.createElement('script');

fetch(host + "/api/books?published_after=2000-01-01")
.then(response => response.json())
.then(data => data
  .forEach(book => appendData(main, book))
)
.then( () => {
  //Add script to modify injected data - by doing it here, we are guaranteed that data has been loaded and is ready to be modified
  script.src = "/assets/js/jquery.flipster.js";
  script.defer = true;
  document.head.appendChild(script);
});
