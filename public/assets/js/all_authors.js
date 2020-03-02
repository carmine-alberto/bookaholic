(function() {
  const authorsContainerSelector = $(".authors-container");
  const suggestedByUsSelector = $('form[name="suggested_by_us"]');

  const appendDataForAuthors = (selector, data) => {
    selector.empty();
    data.forEach(author => selector.append(
      '<a class="author" href="/author?author_id=' + author["author_id"] + '">' +
        '<img src="' + createImgURL(author["picture"]) + '" class="author_photo" alt="author photo" role="link" />' +
        '<h3 class="author_name">' + author["name"] + '</h3>' +
      '</a>'
      )
    )
  };


  fetch(host + "/api/authors?limit=100")
  .then(response => response.json())
  .then(data =>  {
    appendDataForAuthors(authorsContainerSelector, data);
    fetch(host + "/api/books?suggested=true&limit=100")
    .then(response => response.json())
    .then(suggestedBooks => suggestedBooks
                            .map(book => book["authors"]) //[ [aut1, aut2], [aut3], ...]
                            .flat()
                            .map(authorObject => authorObject["author_id"])
    )
    .then(suggestedAuthorsIDs =>
      suggestedByUsSelector.children("input").change(function() {
        if ($(this).prop("checked"))
          appendDataForAuthors(authorsContainerSelector, data.filter((author) => suggestedAuthorsIDs.includes(author["author_id"])));
        else
          appendDataForAuthors(authorsContainerSelector, data);
      })
    )
  })
  .catch(error => alert("The following error occurred: " + error.message +". Please check your connection and refresh the page."));
})();
