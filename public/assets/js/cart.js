
const jwt = window.localStorage.getItem("jwt");

const handleErrors = function(response) {
  if (response.ok)
    return response;
  else
    throw new Error("Your access token is invalid or expired.\nYou'll be redirected to the login page.\nSelect OK to continue.");
}

const appendBookItem = function(book, selector) {
  selector.append(
    '<li class="cart_item">' +
    '<button aria-label="Remove from cart"' +
        		'class="close_button"' +
        		'type="button"' +
        		'role="button">' +
      '<div class="outer">' +
        '<div class="inner">' +
        '</div>' +
      '</div>' +
    '</button>' +

    '<img class="book_cover" src="/assets/img/east_of_eden.jpg" alt="book cover">' +

    '<div class="book_info">' +
      '<div class="column">' +
        '<h3 class="book_title">East of Eden</h3>' +
        '<h4 class="cover_type">John Steinbeck</h4>' +
        '<h4 class="book_price">23.79 eur</h4>' +
      '</div>' +

      '<div class="column">' +
        '<div class="quantity_menu">' +
          '<h4 class="quantity">Quantity</h4>' +
          '<div>' +
            '<label for="quantity">' +
              '<select id="quantity"' +
                  		'name="quantity"' +
                  		'class="quality_form">' +
                '<option value="1">1</option>' +
                '<option value="2">2</option>' +
                '<option value="3">3</option>' +
                '<option value="4">4</option>' +
                '<option value="5">5</option>' +
                '<option value="6">6</option>' +
                '<option value="7">7</option>' +
                '<option value="8">8</option>' +
                '<option value="9">9</option>' +
                '<option value="10">10</option>' +
              '</select>' +
            '</label>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="column">' +
        '<h4 class="book_subtotal_title">Subtotal</h4>' +
        '<h4 class="book_subtotal">23.99 eur</h4>' +
      '</div>' +
    '</div>' +
  '</li>'
)};

//MAIN's HELPER
const populatePage = function(response) {
  const data = response.json();
  console.log(data);
  const cartItemsSelector = $("#cart_items");

  //Add cart_items or "No Items"
  if (data.length != 0)
    data.forEach(book => appendBookItem(book, cartItemsSelector));
  else
    cartItemsSelector.append('<li class="cart_item"><p>There are no books in your cart.</p></li>');

  //Add event handlers
  $('select').change(() => {
      const selected = $(this).find('option:selected');
      $('#text').html(selected.parent().attr("id"));
      $('#value').html(selected.val());
      $('#foo').html(selected.data('foo'));
   });
}

//MAIN
if (jwt == null) {
  alert("You must be logged in to see this page!\nYou'll be redirected to the login page.\nClick OK to continue.");
  window.location.href = "/login";
}
else {
  const requestParams = {
                          method: "GET",
                          headers: {"Authorization": "Bearer " + jwt}
                        };


  fetch(host + "/api/cart", requestParams)
  .then(handleErrors)
  .then(populatePage)
  .catch(error => {
      alert(error.message);
      window.location.href = "/login";
  });
}
