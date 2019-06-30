const host = "https://bookaholic.herokuapp.com";
var i=0;
var c=0;





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

//HELPER
const appendData = function(selector, data) {
  selector
  .replaceWith('<section id="author_intro">' + '<h3 id="author_name">' + data["name"] + '</h3>'+
      '<img id="author_photo" src="assets/img/'+data["picture"] +'">' +
      '<h5 id="author_bio_title"> ' + data["short_bio"] + '</h5>' + '</section>'
  )
};

const appendDataforBook = function(selector, data, selector1) {
    var k=0; //contatore di autori 
    var l=0; //contatore di libri libro 
    var trovato = new Boolean("false");
    
    trovato=false;
    for(i=0;i<data.authors.length; i++)
        {
            if(data.authors[i].author_id==id)
            {
                trovato=true;
            } 
        }
    if(trovato==true)
    {
        if(data.authors.length==1)
            {
                l++;
        
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
        else if(data.authors.length==2)
            {
                 l++;
        
            k++;
            selector
            .append(
           '<div class="book">	'+
           '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+l+'_cover" alt="book_cover">'+
           '<h3 class="book_title" id="book'+l+'_title">' + data["title"] + '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author1">' + data.authors[0].author_name+ '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author2">'+data.authors[1].author_name+'</h3>'+ 
           '</div>' 
                   );
            }
        else if(data.authors.length==3)
            {
                 l++;
        
            k++;
            selector
            .append(
           '<div class="book">	'+
           '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+l+'_cover" alt="book_cover">'+
           '<h3 class="book_title" id="book'+l+'_title">' + data["title"] + '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author1">' + data.authors[0].author_name+ '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author2">'+data.authors[1].author_name+'</h3>'+ 
            '<h3 class="book_author" id="book'+l+'_author3">'+data.authors[2].author_name+'</h3>'+
           '</div>' 
                   );
            }
        else
            {
                 l++;
        
            k++;
            selector
            .append(
           '<div class="book">	'+
           '<img src="assets/img/'+data["cover"]+'" class="book_cover" id="book'+l+'_cover" alt="book_cover">'+
           '<h3 class="book_title" id="book'+l+'_title">' + data["title"] + '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author1">' + data.authors[0].author_name+ '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author2">'+data.authors[1].author_name+'</h3>'+ 
            '<h3 class="book_author" id="book'+l+'_author3">'+data.authors[2].author_name+'</h3>'+
           '<h3 class="book_author" id="book'+l+'_author4">'+data.authors[3].author_name+'</h3>'+
           '</div>' 
                   );
            }
        
         fetch(host+"/api/events?about="+data["book_id"])
         .then(response => response.json())
         .then(data=> data
               .forEach(event => appendDataforEvents(selector1, event)))
        
        }
        
    };

const appendDataforEvents= function(selector, data)
{
    c++;
    selector.append(
            '<div class="event">'+
            '<img src="assets/img/'+data["image"]+'" class="book_image_event" id="event'+c+'_photo" alt="event_photo">'+
            '<h3 class="event_date" id="event'+c+'_date">'+data["date"]+'<br><span id="event_place">'+data["place"]+'</span></h3>'+
            '<h3 class="event_title" id="event'+c+'_title">The new mystery literature</h3>'+
            '<h3 class="event_author" id="event'+c+'_author">with Gillian Flynn</h3>'+
            '<button title="menu_icon" type="button" role="button" class="learn_more">Learn more</button>'+		
	
           '</div>'	
        )
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
var authorIntro = $("#author_intro");
var books_containers= $(".books_containers")
var events_container= $(".events_container")
var genre_list= $("#genre_list");
var themes_list= $("#themes_list");
 //Get id of author from URL
var Url = self.location.href;
var id= getUrlParameter(Url).author_id;




fetch(host + "/api/authors/"+id)
.then(response => response.json())
.then(author => appendData(authorIntro, author))
.then(
    fetch(host + "/api/books?offset=0")
    .then(response => response.json())
    .then(data => data
    .forEach(book => appendDataforBook(books_containers, book, events_container)))
)
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



