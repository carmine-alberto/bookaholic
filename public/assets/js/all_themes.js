const appendData = (selector, data, theme) => {
  data.forEach((book, index) => {
    console.log(index + " " + data.length);
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
        '<a href="/theme?theme=' + theme + '">' +
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
var books_container6= $(".books_container_6");
var books_container7= $(".books_container_7");


fetch(host+"/api/books?theme=family&limit=6&offset=0")
.then(response => response.json())
.then(data => appendData(books_container1, data, "family"))
.then(fetch(host+"/api/books?theme=friendship&limit=6&offset=0")
.then(response => response.json())
.then(data =>appendData(books_container2, data, "friendship")))
.then(fetch(host+"/api/books?theme=fear&limit=6&offset=2")
.then(response => response.json())
.then(data => appendData(books_container3, data, "fear")))
.then(fetch(host+"/api/books?theme=justice&limit=6&offset=0")
.then(response => response.json())
.then(data => appendData(books_container4, data, "justice")))
.then(fetch(host+"/api/books?theme=love&limit=6&offset=0")
.then(response => response.json())
.then(data => appendData(books_container5, data, "love")))
.then(fetch(host+"/api/books?theme=philosophical&limit=6&offset=0")
.then(response => response.json())
.then(data => appendData(books_container6, data, "philosophical")))
.then(fetch(host+"/api/books?theme=war&limit=6&offset=0")
.then(response => response.json())
.then(data => appendData(books_container7, data, "war")))
