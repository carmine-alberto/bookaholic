
var host = "";

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
var genre_list= $("#genre_list");
var themes_list= $("#themes_list");


fetch(host+"/api/books/themes")
  .then(response => response.json())
  .then(themes=> appendDataForListThemes(themes_list, themes)
)
.then(
  fetch(host+"/api/books/genres")
  .then(response => response.json())
  .then(genres => appendDataForListGenres(genre_list, genres))
);
