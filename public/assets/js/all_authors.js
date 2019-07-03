const appendDataForAuthors = function(selector, author)
{
    selector.append(
    '<a class="author" href="/author?author_id=' + author["author_id"] + '">' +
      '<img src="/assets/img/' + author["picture"] + '" class="author_photo" alt="author photo" role="link"' +
      '<h3 class="author_name">' + author["name"] + '</h3>' +
    '</a>'
    )
}

//MAIN
const authors_container = $(".authors-container");

fetch(host + "/api/authors?limit=100")
.then(response => response.json())
.then(data => data
  .forEach(author => appendDataForAuthors(authors_container, author))
)
