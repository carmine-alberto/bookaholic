const host= "https://bookaholic.herokuapp.com";

const appendDataForListThemes= function(selector, list)
{
    for (var i=0; i < list.length; i++)
        {
            selector.append(
                '<li id="theme_'+list[i]+'" role="option"><a href="https://bookaholic.herokuapp.com/theme?theme='+list[i]+'">'+list[i]+'</a></li>'
                )

        }

}

const appendDataForListGenres = function(selector, list)
{
    for(var k = 0; k < list.length; k++)
        {
            selector.append(
               ' <li id="genre_'+list[k]+'"  role="option"> <a href="https://bookaholic.herokuapp.com/genre?genre='+list[k]+'">'+list[k]+'</a></li>'
            )
        }

}


//MAIN
var genre_list= $("#genre_list");
var themes_list= $("#themes_list");


fetch(host+"/api/books/themes")
.then(response => response.json())
.then(themes => appendDataForListThemes(themes_list, themes))
.then(

    fetch(host+"/api/books/genres")
    .then(response => response.json())
    .then(genres=> appendDataForListGenres(genre_list, genres))
)
