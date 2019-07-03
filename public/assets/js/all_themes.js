const host="https://bookaholic.herokuapp.com";
var a=1; //contatore per i libri
var b=1;
var c=1;
var d=1;
var e=1;
var f=1;
var g=1;


const appendData= function(selector, data, identifier, dim, i)
{
    
    
    
    if(data.authors.length==1)
        {
            selector.append(
    '<a class="book" '+
		'href="'+host+'/book?id='+data["book_id"]+'">'+
    '<img src="assets/img/'+data["cover"]+'"' + 
    'id="book'+i+'_photo_+'+identifier+'" '+
    'class="book_cover" '+ 
	 'alt="book cover"'+
	 'role="link"'+
	 'onclick="goToLink(book page, '+host+ '/book?id='+data["book_id"]+')"'+
     'onkeydown="goToLink(book page, '+host+ '/book?id='+data["book_id"]+')">'+	
     '<h3 class="book_name" id="book'+i+'_name_'+identifier+'">'+data["title"]+'</h3>'+
     '<h4 class="book_author" id="book'+i+'_author1_'+identifier+'">'+data.authors[0].author_name +'</h4>'+
     '</a>'
)
        }
    else if(data.authors.length==2)
        {
            selector.append(
    '<a class="book" '+
		'href="'+host+'/book?id='+data["book_id"]+'">'+
    '<img src="assets/img/'+data["cover"]+'"' + 
    'id="book'+i+'_photo_+'+identifier+'" '+
    'class="book_cover" '+ 
	 'alt="book cover"'+
	 'role="link"'+
	 'onclick="goToLink(book page,'+host+ '/book?id='+data["book_id"]+' )"'+
     'onkeydown="goToLink(book page, '+host+ '/book?id='+data["book_id"]+')">'+	
     '<h3 class="book_name" id="book'+i+'_name_'+identifier+'">'+data["title"]+'</h3>'+
     '<h4 class="book_author" id="book'+i+'_author1_'+identifier+'">'+data.authors[0].author_name +'</h4>'+
     '<h4 class="book_author" id="book'+i+'_author2_'+identifier+'">'+data.authors[1].author_name+'</h4>'+
     '</a>'
)
        }
    else if(data.authors.length==3)
        {
            selector.append(
    '<a class="book" '+
		'href="'+host+'/book?id='+data["book_id"]+'">'+
    '<img src="assets/img/'+data["cover"]+'"' + 
    'id="book'+i+'_photo_+'+identifier+'" '+
    'class="book_cover" '+ 
	 'alt="book cover"'+
	 'role="link"'+
	 'onclick="goToLink(book page,'+host+ '/book?id='+data["book_id"]+' )"'+
     'onkeydown="goToLink(book page, '+host+ '/book?id='+data["book_id"]+')">'+	
     '<h3 class="book_name" id="book'+i+'_name_'+identifier+'">'+data["title"]+'</h3>'+
     '<h4 class="book_author" id="book'+i+'_author1_'+identifier+'">'+data.authors[0].author_name +'</h4>'+
     '<h4 class="book_author" id="book'+i+'_author2_'+identifier+'">'+data.authors[1].author_name+'</h4>'+
     '<h4 class="book_author" id="book'+i+'_author3_'+identifier+'">'+data.authors[2].author_name+'</h4>'+
     '</a>'
)
        }
    else
        {
            selector.append(
    '<a class="book" '+
		'href="'+host+'/book?id='+data["book_id"]+'">'+
    '<img src="assets/img/'+data["cover"]+'"' + 
    'id="book'+i+'_photo_+'+identifier+'" '+
    'class="book_cover" '+ 
	 'alt="book cover"'+
	 'role="link"'+
	 'onclick="goToLink(book page, '+host+ '/book?id='+data["book_id"]+')"'+
     'onkeydown="goToLink(book page, '+host+ '/book?id='+data["book_id"]+')">'+	
     '<h3 class="book_name" id="book'+i+'_name_'+identifier+'">'+data["title"]+'</h3>'+
     '<h4 class="book_author" id="book'+i+'_author1_'+identifier+'">'+data.authors[0].author_name +'</h4>'+
     '<h4 class="book_author" id="book'+i+'_author2_'+identifier+'">'+data.authors[1].author_name+'</h4>'+
     '<h4 class="book_author" id="book'+i+'_author3_'+identifier+'">'+data.authors[2].author_name+'</h4>'+
     '<h4 class="book_author" id="book'+i+'_author4_'+identifier+'">'+data.authors[3].author_name+'</h4>'+
     '</a>'
)
        }
    

    if(i==dim)
        {
            selector.append(
            '<a class="show_more_button"'+
	 	 	'role="link"'+
	 		'onclick="goToLink(fiction page, '+host+'/theme?theme='+identifier+')"'+
     		'onkeydown="goToLink(fiction page, '+host+'/theme?theme='+identifier+')"'+
     		'href="'+host+'/theme?theme='+identifier+'">Show more</a>')
        }
}











//MAIN

var books_container1= $(".books_container_1");
var books_container2= $(".books_container_2");
var books_container3= $(".books_container_3");
var books_container4= $(".books_container_4");
var books_container5= $(".books_container_5");
var books_container6= $(".books_container_6");
var books_container7= $(".books_container_7");


fetch(host+"/api/books?theme=family&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container1, book, "family",data.length,a++)))
.then(fetch(host+"/api/books?theme=friendship&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container2, book, "friendship",data.length,b++))))
.then(fetch(host+"/api/books?theme=fear&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container3, book, "fear",data.length,c++))))
.then(fetch(host+"/api/books?theme=justice&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container4, book, "justice",data.length,d++))))
.then(fetch(host+"/api/books?theme=love&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container5, book, "love",data.length,e++))))
.then(fetch(host+"/api/books?theme=philosophical&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container6, book, "philosophical",data.length,f++))))
.then(fetch(host+"/api/books?theme=war&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container7, book, "war",data.length,g++))))

