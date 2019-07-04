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
    
        '<a class="book" href="'+host+'/book?id='+data.book_id+'"> '+
        '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+i+'_cover" alt="book cover"'+
     'role="link"'+
  'onclick="goToLink(book page,)"'+
     'onkeydown="goToLink(book page,)"> '+
'<h3 class="book_title" id="book'+i+'_title">'+data["title"]+'</h3>'+
 
'<div class="authors_container">'+
 
'<h4 class="book_author" id="book'+i+'_author1">'+data.authors[0].author_name+'</h4>'+
'</div>'+
'</a>'
    )
        }
    else if(data.authors.length==2)
        {
             selector.append(
    
        '<a class="book" href="'+host+'/book?id='+data.book_id+'">	'+
        '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+i+'_cover" alt="book cover"'+
	    'role="link"'+
	 'onclick="goToLink(book page,)"'+
     'onkeydown="goToLink(book page,)">	'+
'<h3 class="book_title" id="book'+i+'_title">'+data["title"]+'</h3>'+
	
'<div class="authors_container">'+
	
'<h4 class="book_author" id="book'+i+'_author1">'+data.authors[0].author_name+'</h4>'+
'<h4 class="book_author" id="book'+i+'_author2">'+data.authors[1].author_name+'</h4>'+

	
'</div>'+
		     '</a>'
    )
        }
    else if(data.authors.length==3)
        {
             selector.append(
    
        '<a class="book"  href="'+host+'/book?id='+data.book_id+'">	'+
        '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+i+'_cover" alt="book cover"'+
	    'role="link"'+
	 'onclick="goToLink(book page,)"'+
     'onkeydown="goToLink(book page,)">	'+
'<h3 class="book_title" id="book'+i+'_title">'+data["title"]+'</h3>'+
	
'<div class="authors_container">'+
	
'<h4 class="book_author" id="book'+i+'_author1">'+data.authors[0].author_name+'</h4>'+
'<h4 class="book_author" id="book'+i+'_author2">'+data.authors[1].author_name+'</h4>'+
'<h4 class="book_author" id="book'+i+'_author3">'+data.authors[2].author_name+'</h4>'+

	
'</div>'+
		     '</a>'
    )
        }
    
    else
        {
             selector.append(
    
        '<a class="book" href="'+host+'/book?id='+data.book_id+'">	'+
        '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+i+'_cover" alt="book cover"'+
	    'role="link"'+
	 'onclick="goToLink(book page,)"'+
     'onkeydown="goToLink(book page,)">	'+
'<h3 class="book_title" id="book'+i+'_title">'+data["title"]+'</h3>'+
	
'<div class="authors_container">'+
	
'<h4 class="book_author" id="book'+i+'_author1">'+data.authors[0].author_name+'</h4>'+
'<h4 class="book_author" id="book1_author2">'+data.authors[1].author_name+'</h4>'+
'<h4 class="book_author" id="book1_author3">'+data.authors[2].author_name+'</h4>'+
'<h4 class="book_author" id="book1_author4">'+data.authors[3].author_name+'</h4>'+
	
'</div>'+
		     '</a>'
    )
   
}
}


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



fetch(host+"/api/books?published_after="+c2+"-01-01&suggested="+suggestedBoolean+"&genre="+c+"&theme="+theme+"&offset=0")
.then(response => response.json())
.then(data => data
     .forEach(book=> addData(books_containers, book)))

}








//MAIN



 //Get id of author from URL
var Url = self.location.href;
var theme= getUrlParameter(Url).theme;

var books_containers= $(".books_containers");

var header_container= $(".header_container");

header_container.replaceWith(
	'<h1 class="header_text">'+theme+' </h1>'
);


var buttons = document.getElementById("apply_filters");
buttons.addEventListener("click", handler);

fetch(host+"/api/books?theme="+theme+"&offset=0")
.then(response => response.json())
.then(books => books
      .forEach(book => addData(books_containers, book)));





