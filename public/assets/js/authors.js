const host= "https://bookaholic.herokuapp.com";

const appendDataForAuthors = function(selector, author)
{
    selector.append(
    '<a class="author" href="/author?author_id=' + author["author_id"] + '">' +
      '<img src="/assets/img/' + author["picture"] + '" class="author_photo" alt="author photo" role="link"' +
            'onclick="goToLink(author page, /author?id=' + author["author_id"] + ')"' +
            'onkeydown="goToLink(author page, /author?id='+author["author_id"] + ')">' +
      '<h3 class="author_name" id="author1_name">' + author["name"] + '</h3>' +
    '</a>'
    )
}

const appendDataForListThemes = function(selector, list)
{
    for (var i = 0; i < list.length; i++)
    {
      selector.append(
        '<li id="theme_' + list[i] + '" role="option">' +
          '<a href="/theme?id=' + list[i] + '">' + list[i] + '</a>' +
        '</li>'
      )
    }
}

const appendDataForListGenres= function(selector, list)
{
  for (var i = 0; i < list.length; i++)
  {
    selector.append(
      '<li id="genre_' + list[i] + '" role="option">' +
        '<a href="/genre?id=' + list[i] + '">' + list[i] + '</a>' +
      '</li>'
    )
  }
}


//MAIN
var authors_container= $(".authors-container");
var genre_list= $("#genre_list");
var themes_list= $("#themes_list");


fetch(host + "/api/authors?limit=100")
.then(response => response.json())
.then(data => data
  .forEach(author => appendDataForAuthors(authors_container, author))
)
.then(
  fetch(host+"/api/books/themes")
  .then(response => response.json())
  .then(themes=> appendDataForListThemes(themes_list, themes))
)
.then(
  fetch(host+"/api/books/genres")
  .then(response => response.json())
  .then(genres => appendDataForListGenres(genre_list, genres))
)
