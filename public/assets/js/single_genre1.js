const host="https://bookaholic.herokuapp.com";
var i=0;

function getUrlParameter(url) {
    var toReturn = {};
    var questionSplit = url.split('?');
    questionSplit.shift();
    var onlyParameters = questionSplit.join('?');
    var splittedParameters = onlyParameters.split('&');
    for (var c = 0; c < splittedParameters.length; c++) {
        var parts = splittedParameters[c].split('=');
        if ($.trim(parts[0]) != '') {
            toReturn[parts[0]] = parts[1];
        }
    }
    return toReturn;
}


const addData= function(selector, data)
{
    i++;
    if(data.authors.length==1)
        {
            selector.append(
    
        '<div class="book">	'+
        '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+i+'_cover" alt="book cover"'+
	    'role="link"'+
	 'onclick="goToLink(book page,'+host+'/book?id='+data["book_id"]+')"'+
     'onkeydown="goToLink(book page,'+host+'/book?id='+data["book_id"]+')">	'+
'<h2 class="book_title" id="book'+i+'_title">'+data["title"]+'</h2>'+
	
'<div class="authors_container">'+
	
'<h3 class="book_author" id="book'+i+'_author1">'+data.authors[0].author_name+'</h3>'+
	
'</div>'	
    )
        }
    else if(data.authors.length==2)
        {
            selector.append(
    
        '<div class="book">	'+
        '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+i+'_cover" alt="book cover"'+
	    'role="link"'+
	 'onclick="goToLink(book page,'+host+'/book?id='+data["book_id"]+')"'+
     'onkeydown="goToLink(book page,'+host+'/book?id='+data["book_id"]+')">	'+
'<h2 class="book_title" id="book'+i+'_title">'+data["title"]+'</h2>'+
	
'<div class="authors_container">'+
	
'<h3 class="book_author" id="book'+i+'_author1">'+data.authors[0].author_name+'</h3>'+
'<h3 class="book_author" id="book'+i+'_author2">'+data.authors[1].author_name+'</h3>'+

	
'</div>'	
    )
        }
    else if(data.authors.length==3)
        {
            selector.append(
    
        '<div class="book">	'+
        '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+i+'_cover" alt="book cover"'+
	    'role="link"'+
	 'onclick="goToLink(book page,'+host+'/book?id='+data["book_id"]+')"'+
     'onkeydown="goToLink(book page,'+host+'/book?id='+data["book_id"]+')">	'+
'<h2 class="book_title" id="book'+i+'_title">'+data["title"]+'</h2>'+
	
'<div class="authors_container">'+
	
'<h3 class="book_author" id="book'+i+'_author1">'+data.authors[0].author_name+'</h3>'+
'<h3 class="book_author" id="book'+i+'1_author2">'+data.authors[1].author_name+'</h3>'+
'<h3 class="book_author" id="book'+i+'1_author3">'+data.authors[2].author_name+'</h3>'+

	
'</div>'	
    )
        }
    else
        {
            selector.append(
    
        '<div class="book">	'+
        '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+i+'_cover" alt="book cover"'+
	    'role="link"'+
	 'onclick="goToLink(book page,'+host+'/book?id='+data["book_id"]+')"'+
     'onkeydown="goToLink(book page,'+host+'/book?id='+data["book_id"]+')">	'+
'<h2 class="book_title" id="book'+i+'_title">'+data["title"]+'</h2>'+
	
'<div class="authors_container">'+
	
'<h3 class="book_author" id="book'+i+'_author1">'+data.authors[0].author_name+'</h3>'+
'<h3 class="book_author" id="book1_author2">'+data.authors[1].author_name+'</h3>'+
'<h3 class="book_author" id="book1_author3">'+data.authors[2].author_name+'</h3>'+
'<h3 class="book_author" id="book1_author4">'+data.authors[3].author_name+'</h3>'+
	
'</div>'	
    )
        }
    
    
    

};

const handler = function() { 


books_containers.empty();
    
var a1 = document.getElementById("genre_dropdown");
var c1 = a1.options[a1.selectedIndex].text;
c = c1.toLowerCase();
var a2 = document.getElementById("publication_year");
var c2 = a2.options[a2.selectedIndex].text;

var suggestedBoolean=false;
if(document.suggested_by_us.cb.checked)
    suggestedBoolean= true;


    

fetch(host+"/api/books?published_after="+c2+"-01-01&suggested="+suggestedBoolean+"&genre="+genre+"&theme="+c+"&limit=10&offset=0")
.then(response => response.json())
.then(data => data
     .forEach(book=> addData(books_containers, book)))

    

};


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

var genre_list= $("#genre_list");
var themes_list= $("#themes_list");

 //Get id of author from URL
var Url = self.location.href;
var genre= getUrlParameter(Url).genre;

var books_containers= $(".books_containers");
var buttons = document.getElementById("apply_filters");
buttons.addEventListener("click", handler);



fetch(host+"/api/books/themes")
    .then(response => response.json())
    .then(themes=> appendDataForListThemes(themes_list, themes))

.then(

    fetch(host+"/api/books/genres")
    .then(response => response.json())
    .then(genres=> appendDataForListGenres(genre_list, genres))
)


 