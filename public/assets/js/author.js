// const host set in navbar.js
var i=0;
var c=0;
books_id = new Array();
var count=0; //contatore numero iterazioni funzione appendDataforBook
var trov = new Boolean("false");

//HELPER
const appendData = function(selector, data) {
  selector
  .replaceWith('<section id="author_intro">' + '<h3 id="author_name">' + data["name"] + '</h3>'+
      '<img id="author_photo" src="/assets/img/'+data["picture"] +'">' +
      '<h5 id="author_bio_title"> ' + data["short_bio"] + '</h5>' + '</section>'
  )
};

const appendDataforBook = function(selector, data, selector1, dim_books) {
    var k=0; //contatore di autori
    var l=0; //contatore di libri libro
    var trovato = new Boolean("false");
   

    count ++;
    trovato=false;
    for(i=0;i<data.authors.length; i++)
        {
            console.log(data.authors[i].author_id + "  " + id);
            if(data.authors[i].author_id==id)
            {
                trovato=true;
            }
        }
    if(trovato==true)
    {
        console.log("Trovato");
        if(data.authors.length==1)
            {
                l++;

            k++;
            selector
            .append(
           '<a class="book" href="'+host+'/book?id='+data["book_id"]+'">	'+
           '<img src="/assets/img/'+data["cover"]+'" class="book_cover" id="book'+l+'_cover" alt="book_cover">'+
           '<h3 class="book_title" id="book'+l+'_title">' + data["title"] + '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author1">' + data.authors[0].author_name+ '</h6>' +
           '</a>'
                   );
            }
        else if(data.authors.length==2)
            {
                 l++;

            k++;
            selector
            .append(
           '<a class="book" href="'+host+'/book?id='+data["book_id"]+'">	'+
           '<img src="/assets/img/'+data["cover"]+'" class="book_cover" id="book'+l+'_cover" alt="book_cover">'+
           '<h3 class="book_title" id="book'+l+'_title">' + data["title"] + '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author1">' + data.authors[0].author_name+ '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author2">'+data.authors[1].author_name+'</h3>'+
           '</a>'
                   );
            }
        else if(data.authors.length==3)
            {
                 l++;

            k++;
            selector
            .append(
         '<a class="book" href="'+host+'/book?id='+data["book_id"]+'">	'+
           '<img src="/assets/img/'+data["cover"]+'" class="book_cover" id="book'+l+'_cover" alt="book_cover">'+
           '<h3 class="book_title" id="book'+l+'_title">' + data["title"] + '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author1">' + data.authors[0].author_name+ '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author2">'+data.authors[1].author_name+'</h3>'+
            '<h3 class="book_author" id="book'+l+'_author3">'+data.authors[2].author_name+'</h3>'+
           '</a>'
                   );
            }
        else
            {
                 l++;

            k++;
            selector
            .append(
            '<a class="book" href="'+host+'/book?id='+data["book_id"]+'">	'+
           '<img src="/assets/img/'+data["cover"]+'" class="book_cover" id="book'+l+'_cover" alt="book_cover">'+
           '<h3 class="book_title" id="book'+l+'_title">' + data["title"] + '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author1">' + data.authors[0].author_name+ '</h3>' +
           '<h3 class="book_author" id="book'+l+'_author2">'+data.authors[1].author_name+'</h3>'+
            '<h3 class="book_author" id="book'+l+'_author3">'+data.authors[2].author_name+'</h3>'+
           '<h3 class="book_author" id="book'+l+'_author4">'+data.authors[3].author_name+'</h3>'+
           '</a>'
                   );
            }

         
          books_id.push(data["book_id"]);
      
         

        }
  
  if(count==dim_books)
  {
    appendDataforEvents(selector1, books_id);
  }
      

    };

const appendDataforEvents= function(selector, data)
{
   trov=false;
    

    for(c=0;c<data.length;c++)
    {
      fetch(host+"/api/events?offset=0&about="+data[c])
      .then(response => response.json())
      .then(events => events
            .forEach(data =>
                     
    selector.append(
            '<div class="event">'+
            '<img src="/assets/img/'+data["image"]+'" class="book_image_event" id="event'+c+'_photo" alt="event_photo">'+
            '<h3 class="event_date" id="event'+c+'_date">'+data["date"].slice(0,10)+'<br><span id="event_place">'+data["place"]+'</span></h3>'+
            '<h3 class="event_title" id="event'+c+'_title">The new mystery literature</h3>'+
            '<h3 class="event_author" id="event'+c+'_author">with Gillian Flynn</h3>'+
            '<a href="'+host+'/event?event_id='+data["event_id"]+'" title="menu_icon" type="button" role="button" class="learn_more">Learn more</a>'+

           '</div>'
        )
               trov=true;
                     ))
    
                     
  }
  
  if(!trov)
  {
    selector.append('<h3 id="no_events"> NO EVENTS </h3>')
  }
}













//MAIN
var authorIntro = $("#author_intro");
var books_containers= $(".books_containers")
var events_container= $(".events_container")

 //Get id of author from URL
var url = self.location.href;
var id= getUrlParametersAsObject(url).author_id;




fetch(host + "/api/authors/"+id)
.then(response => response.json())
.then(author => appendData(authorIntro, author))
.then(
    fetch(host + "/api/books?limit=100")
    .then(response => response.json())
    .then(data => data
    .forEach(book => appendDataforBook(books_containers, book, events_container, data.length)))
)
