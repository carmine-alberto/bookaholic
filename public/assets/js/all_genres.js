const host="https://bookaholic.herokuapp.com";
var a=1; //contatore per i libri
var b=1;
var c=1;
var d=1;
var e=1;

const appendData= function(selector, data, identifier, dim, i,link)
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
     '<h4 class="book_author" id="book'+i+'_author2_'+identifier+'">' +data.authors[1].author_name+'</h4>'+
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
	 		'onclick="goToLink(fiction page, '+host+'/genre?genre='+link+')"'+
     		'onkeydown="goToLink(fiction page, '+host+'/genre?genre='+link+')"'+
     		'href="'+host+'/genre?genre='+link+'">Show more</a>')
        }

}

const appendDataForListThemes= function(selector, list)
{
    for(var i=0;i<list.length;i++)
        {
            selector.append(
                '<li id="theme_'+list[i]+'" role="option"><a href="https://bookaholic.herokuapp.com/theme?theme='+list[i]+'">'+list[i]+'</a></li>'
                )
                
        }
    
}

const appendDataForListGenres= function(selector, list)
{
    for(var k=0; k<list.length; k++)
        {
            selector.append(
               ' <li id="genre_'+list[k]+'"  role="option"> <a href="https://bookaholic.herokuapp.com/genre?genre='+list[k]+'">'+list[k]+'</a></li>'
            )
        }
    
}







//MAIN

var books_container1= $(".books_container_1");
var books_container2= $(".books_container_2");
var books_container3= $(".books_container_3");
var books_container4= $(".books_container_4");
var books_container5= $(".books_container_5");
var genre_list= $("#genre_list");
var themes_list= $("#themes_list");


fetch(host+"/api/books?genre=art%20and%20design&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container1, book, "art", data.length,a++, "art%20and%20design")))
.then(fetch(host+"/api/books?genre=fiction&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container2, book, "fiction", data.length,b++, "fiction"))))
.then(fetch(host+"/api/books?genre=mystery&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container3, book, "mystery",data.length,c++, "mystery"))))
.then(fetch(host+"/api/books?genre=nonfiction&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container4, book, "non_fiction",data.length,d++, "non%20fiction"))))
.then(fetch(host+"/api/books?genre=science%20fiction&limit=5&offset=0")
.then(response => response.json())
.then(data => data
      .forEach(book => appendData(books_container5, book, "science_fiction",data.length,e++, "science%20fiction"))))
.then(
    fetch(host+"/api/books/themes")
    .then(response => response.json())
    .then(themes=> appendDataForListThemes(themes_list, themes))
)
.then(

    fetch(host+"/api/books/genres")
    .then(response => response.json())
    .then(genres=> appendDataForListGenres(genre_list, genres))
)
