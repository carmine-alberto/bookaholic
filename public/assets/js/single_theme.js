// const host set in navbar.js

const appendBooksData = (selector, data) => {
  selector.empty();
  if (data.length == 0)
    selector.append('<h2 class="no_books">There are no books adhering to the provided constraints. Try a different combination.</h2>');
  data.forEach(book =>
    selector.append(
        '<a class="book" href="/book?id='+book.book_id+'">' +
          '<img src="' + createImgURL(book["cover"]) + '" class="book_cover" alt="book cover"'+
                'role="link" />	' +
          '<h2 class="book_title">' + book["title"] + '</h2>' +
          '<div class="authors_container">' +
            createAuthorsTag(book["authors"], "h2") +
          '</div>'+
        '</a>'
    )
  );
}

const handler = () => {

  const genreDropdownSelector = $("#genre_dropdown");
  const publicationYearSelector = $("#publication_year");
  const suggestedByUsSelector = $("")

  const selectedGenre = genreDropdownSelector.find("option:selected").html().toLowerCase();
  const selectedPublicationYear = publicationYearSelector.find("option:selected").html();

  const suggestedBoolean = $('form[name="suggested_by_us"]').children("input").prop("checked");
  const availableBoolean = $('form[name="available"]').children("input").prop("checked");

  var requestURL = host + "/api/books?theme=" + pageTheme;

  if (selectedGenre != "")
    requestURL += "&genre=" + selectedGenre;

  if (selectedPublicationYear != "")
    requestURL += "&published_after=" + selectedPublicationYear + "-01-01";

  if (suggestedBoolean)
    requestURL += "&suggested=" + suggestedBoolean;

  fetch(requestURL + "&limit=100")
  .then(response => response.json())
  .then(filteredBooks => appendBooksData(booksContainersSelector, filteredBooks));
 };

//MAIN

const pageTheme = getUrlParametersAsObject(self.location.href).theme;
const headerTextSelector = $(".header_text");
const booksContainersSelector = $(".books_containers");
const buttonSelector = $("#apply_filters");

headerTextSelector.text(capitalizeString(decodeURIComponent(pageTheme)));
buttonSelector.on("click touch", handler);

fetch(host+"/api/books?theme=" + pageTheme + "&limit=100")
.then(response => response.json())
.then(books => appendBooksData(booksContainersSelector, books));
