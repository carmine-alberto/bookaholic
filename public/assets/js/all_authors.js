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

//MAIN
var authors_container= $(".authors-container");

fetch(host + "/api/authors?limit=100")
.then(response => response.json())
.then(data => data
  .forEach(author => appendDataForAuthors(authors_container, author))
)
