// const host set inside navbar.js

const appendData = (selector, data, genre) => {
  data.forEach((book, index) => {
    if (index < 5)
      selector.append(
        '<a class="book" '+
        		'href="/book?id=' + book["book_id"] + '">' +
          '<img src="' + createImgURL(book["cover"]) + '"' +
                'class="book_cover" ' +
                'alt="book cover" ' +
                'role="link" />' +
          '<h3 class="book_name">' + book["title"] + '</h3>' +
          createAuthorsTag(book["authors"], "h4") +
        '</a>'
      );
    else
      selector.append(
        '<a href="/genre?genre=' + genre + '">' +
          '<button class="show_more_button"' +
                  'role="link" >' +
            'Show more' +
            '</button>' +
        '</a>'
      );
    })
}


//MAIN

var books_container1= $(".books_container_1");
var books_container2= $(".books_container_2");
var books_container3= $(".books_container_3");
var books_container4= $(".books_container_4");
var books_container5= $(".books_container_5");


fetch(host+"/api/books?genre=art%20and%20design&limit=6&offset=0")
.then(response => response.json())
.then(data => appendData(books_container1, data, "art%20and%20design"))
.then(fetch(host+"/api/books?genre=fiction&limit=6&offset=0")
.then(response => response.json())
.then(data => appendData(books_container2, data, "fiction")))
.then(fetch(host+"/api/books?genre=mystery&limit=6&offset=0")
.then(response => response.json())
.then(data => appendData(books_container3, data,"mystery")))
.then(fetch(host+"/api/books?genre=nonfiction&limit=6&offset=0")
.then(response => response.json())
.then(data => appendData(books_container4, data, "non%20fiction")))
.then(fetch(host+"/api/books?genre=science%20fiction&limit=6&offset=0")
.then(response => response.json())
.then(data => appendData(books_container5, data, "science%20fiction")))
