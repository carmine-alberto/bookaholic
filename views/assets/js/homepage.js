const host = "https://bookaholic.herokuapp.com";


  var latestProducts = $("#latest_products .MagicScroll");
  var ourSuggestions = $("#our_suggestions .MagicScroll");

  //Get and inject books into "Latest Products"
  $.get(host + "/api/books?published_after=2000-01-01")
  .done( json => {
    JSON
    .parse(json)
    .forEach(book => {
      console.log(book);
      console.log(latestProducts);
      latestProducts
      .append('<div>' +
                '<a href="/book?id=' + book["book_id"] +'">' +
                 '<img src="/assets/img/'+ book["cover"] +'" style="height: 300px">' +
                 '</a>' +
          		   '<div>' +
            		   '<h6>' + book["authors"][0]["author_name"] + '</h6>' +
            		   '<h6>' + book["title"] + '</h6>' +
          			 '</div>' +
        			 '</div>'
      );
    });

  //Get and inject books into "Our suggestions"; N. B. This is nested after "done" and occurs after the first get
    $.get(host + "/api/books?suggested=true")
    .done( json => {
      JSON
      .parse(json)
      .forEach(book => {
        console.log(book);
        console.log(ourSuggestions);
        ourSuggestions
        .append('<div>' +
                  '<a href="/book?id=' + book["book_id"] +'">' +
                   '<img src="/assets/img/'+ book["cover"] +'" style="height: 300px">' +
                   '</a>' +
            		   '<div>' +
              		   '<h6>' + book["authors"][0]["author_name"] + '</h6>' +
              		   '<h6>' + book["title"] + '</h6>' +
            			 '</div>' +
          			 '</div>'
        );
      });
      //Inject the magicscroll code; this is necessary to avoid race conditions (magiscroll loaded before data is served and injected) -- IMPORTANT
      var script = document.createElement('script');
      script.src = "/assets/js/magicscroll.js";
      script.defer = true;
      document.head.appendChild(script);
    })
})
