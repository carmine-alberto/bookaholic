const host = "https://bookaholic.herokuapp.com";
var i=0;


/*
 //Get id of author from URL
var Url = self.location.href;
var id= getUrlParameter(Url).author_id + '<br/>');
console.log(getUrlParameter(Url));


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
}*/

//HELPER
const appendData = function(selector, data) {
  selector
  .replaceWith('<section id="author_intro">' + '<h3 id="author_name">' + data["name"] + '</h3>'+
      '<img id="author_photo" src="assets/img/'+data["picture"] +'">' +
      '<h5 id="author_bio_title"> ' + data["short_bio"] + '</h5>' + '</section>'
  )
};

const appendDataforBook = function(selector, data) {
    var k=0; //contatore di autori 
    var l=0; //contatore di libri libro 
    var trovato = new Boolean("false");
    
    trovato=false;
    for(i=0;i<data.authors.length; i++)
        {
            if(data.authors[i].author_id==10000001)
            {
                trovato=true;
            } 
        }
    if(trovato==true)
    {
        l++;
        //for(i=0;i<data.authors.length; i++)
        
            k++;
            selector
            .append(
           '<div class="book">	'+
           '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+l+'_cover" alt="book_cover">'+
           '<h3 class="book_title" id="book'+l+'_title">' + data["title"] + '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author1">' + data.authors[0].author_name+ '</h6>' +
           '</div>' 
        );
        }
    
        
        
    };

    
    
        
             
        
   


/*const appendDataforEvents= function(id_book)
{
    fetch(host + "/api/events?offset=0&limit=5&about="+ id_book)
    .then(response => response.json())
    .then(event => 
         
         
         )
}*/


//MAIN
var authorIntro = $("#author_intro");
var books_containers= $(".books_containers")


fetch(host + "/api/authors/10000001")
.then(response => response.json())
.then(author => appendData(authorIntro, author))
.then(
    fetch(host + "/api/books?offset=0")
    .then(response => response.json())
    .then(data => data
    .forEach(book => appendDataforBook(books_containers, book)))
)




   



