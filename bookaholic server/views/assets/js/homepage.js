$("document").ready(function() {
  $.get("/books/8935171470")
  .done( json => {
    $(".book_title").text(json.title);
    $("#slide1_img1").attr("src", json.cover);
  });
});
