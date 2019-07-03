const host = "https://bookaholic.herokuapp.com";
var l=0;

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

/*
const appendDataForBook= function (books)
{
    l++;
    var slide_1= $("#slide_1")
    var slide_2= $("#slide_2")
    var slide_3= $("#slide_3")
    var slide;
    
    
    for(var i=0;i<books.lenght;i++)
        {
            if(i<5) slide= slide_1;
            else if(i<10) slide= slide_2;
            else slide= slide_3;
            
            if(books[i].authors.length==1)
            {
                slide.append(
                    '<div class="image_and_caption">'+
 	       '<img src="/assets/img/'+books[i].cover+'" class="book_cover" id="slide1_img1" alt="chronicles of a radical hag">'+
		   '<div class="caption_container">'+
		   '<h6 class="book_title">'+books[i].title+'</h6>'+
			'<div class="authors_container">'+
			 '<h6 class="book_author" id="book'+l+'_author1">'+books[i].authors[0].author_name+'</h6>'+

			'</div> </div> </div>'
            )}
            else if(books[i].authors.length==2)
                {
                     slide.append(
                    '<div class="image_and_caption">'+
 	       '<img src="/assets/img/'+books[i].cover+'" class="book_cover" id="slide1_img1" alt="chronicles of a radical hag">'+
		   '<div class="caption_container">'+
		   '<h6 class="book_title">'+books[i].title+'</h6>'+
			'<div class="authors_container">'+
			 '<h6 class="book_author" id="book'+l+'_author1">'+books[i].authors[0].author_name+'</h6>'+
            '<h6 class="book_author" id="book'+l+'_author2">'+books[i].authors[1].author_name+'</h6>'+
			'</div> </div> </div>'
            )
                }
            else if(books[i].authors.length==3)
                {
                    slide.append(
                    '<div class="image_and_caption">'+
 	       '<img src="/assets/img/'+books[i].cover+'" class="book_cover" id="slide1_img1" alt="chronicles of a radical hag">'+
		   '<div class="caption_container">'+
		   '<h6 class="book_title">'+books[i].title+'</h6>'+
			'<div class="authors_container">'+
			 '<h6 class="book_author" id="book'+l+'_author1">'+books[i].authors[0].author_name+'</h6>'+
            '<h6 class="book_author" id="book'+l+'_author2">'+books[i].authors[1].author_name+'</h6>'+
            ' <h6 class="book_author" id="book'+l+'_author3">'+books[i].authors[2].author_name+'</h6>'+
			'</div> </div> </div>'
            )
                }
            
            else{
                slide.append(
                    '<div class="image_and_caption">'+
 	       '<img src="/assets/img/'+books[i].cover+'" class="book_cover" id="slide1_img1" alt="chronicles of a radical hag">'+
		   '<div class="caption_container">'+
		   '<h6 class="book_title">'+books[i].title+'</h6>'+
			'<div class="authors_container">'+
			 '<h6 class="book_author" id="book'+l+'_author1">'+books[i].authors[0].author_name+'</h6>'+
            '<h6 class="book_author" id="book'+l+'_author2">'+books[i].authors[1].author_name+'</h6>'+
            ' <h6 class="book_author" id="book'+l+'_author3">'+books[i].authors[2].author_name+'</h6>'+
            '<h6 class="book_author" id="book1_author4">'+books[i].authors[3].author_name+'</h6>'+
			'</div> </div> </div>')
            }
            
            
            if(1==4)
                {
                    slide.append(
                        '<div class="carousel-controls">'+
                    '<label for="img-3" class="prev-slide">'+
                        '<span>&lsaquo;</span>'+
                    '</label>'+
                    '<label for="img-2" class="next-slide">'+
                      '<span>&rsaquo;</span>'+
                    '</label>'+
                '</div>'
                    )
                }
            if(i==9)
                {
                    slide.append('<div class="carousel-controls">'+
                    '<label for="img-1" class="prev-slide">'+
                        '<span>&lsaquo;</span>'+
                    '</label>'+
                    '<label for="img-3" class="next-slide">'+
                        '<span>&rsaquo;</span>'+
                    '</label>'+
                '</div>')
                }
            if(i==14)
                {
                    slide.append(
                    '<div class="carousel-controls">'+
                    '<label for="img-2" class="prev-slide">'+
                        '<span>&lsaquo;</span>'+
                    '</label>'+
                    '<label for="img-1" class="next-slide">'+
                        '<span>&rsaquo;</span>'+
                    '</label>'+
                '</div>'
                    )
                }
            
        }
    
}*/




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
    /*,
      fetch(host+"/api/books?bestseller=true&limit=15&offset=0")
      .then(response => response.json())
      .then(books => appendDataForBook(books)
    )*/
  ]
)
.then( () => {
  //Add script to modify injected data - by doing it here, we are guaranteed that data has been loaded and is ready to be modified
  script.src = "assets/js/magicscroll.js";
  script.defer = true;
  document.head.appendChild(script);
});

