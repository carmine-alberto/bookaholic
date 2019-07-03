
const jwt = window.localStorage.getItem("jwt");

const handleErrors = function(response) {
  if (response.ok)
    return response;
  else
    switch(response.status) {
      case 401:
      case 400:
        throw new Error("Your access token is invalid or expired.\nYou'll be redirected to the login page.\nSelect OK to continue.");
        break;
      }
}

const calculateTotal = function(cartItemsSelector) {
  let total = 0.00;

  cartItemsSelector.find(".book_subtotal").each(function() {
                        //12.3 £ - we need just the number, which is the first item in the array
    total += parseFloat($(this).text().split(" ")[0]);
  });

  return total.toFixed(2);
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

    '<a href="/book?id=' + book["book_id"] + '"><img class="book_cover" src="/assets/img/' + book["cover"] + '" alt="book cover" /></a>' +

    '<div class="book_info">' +
      '<div class="column">' +
        '<h3 class="book_title">' + capitalizeString(book["book_title"]) + '</h3>' +
        '<h4 class="cover_type">' + capitalizeString(book["cover_type"]) + '</h4>' +
        '<h4 class="book_price">' + book["price"] + ' £</h4>' +
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
        '<h4 class="book_subtotal"></h4>' +
      '</div>' +
    '</div>' +
  '</li>'
)};

const postOrder = function() {
  $("#checkout_button").prop("disabled", true);
  
  const postParams = {
                      method: "POST",
                      headers: {"Content-Type": "text/plain",
                               "Authorization": "Bearer " + jwt
                              },
                      body: "Via del Carroccio, 33/F, 20032, Milano (MI)"
                    };

  fetch("/api/orders", postParams)
  .then(handleErrors)
  .then(
    fetch("/api/cart", {method: "DELETE", headers: {"Authorization": "Bearer " + jwt}})
    .then(handleErrors)
    .then(response => {
      alert("Your order has been registered correctly!\n You'll now return to the Homepage.")
      window.location.href = "/";
    })
  )
  .catch(error => {
    alert("There was an error during the request.\nIf your connection was not lost, it's probably due to an expired token.\nTry to login again.");
    window.location.href = "/login";
  })
}

//MAIN's HELPER
const populatePage = function(data) {
  const cartItemsSelector = $("#cart_items");
  const totalSelector = $("#subtotal_number");
  const checkoutButtonSelector = $("#checkout_button");

  //Add cart_items or "No Items"
  if (data.length != 0) {
    data.forEach(book => appendBookItem(book, cartItemsSelector));

    //TODO Weird behaviour of "this" in case of arrow functions - further investigation is needed; for now, classic notation will be used
    $("select").change(function() {
        const selected = $(this).find('option:selected');
        const affectedBook = $(this).parents(".book_info");
        const affectedBookPrice = parseFloat(affectedBook.find(".book_price").text());
        const multiplier = parseInt(selected.html());
        const subtotal = (affectedBookPrice * multiplier).toFixed(2);

        affectedBook.find(".book_subtotal").html( subtotal + " £");

        $("#subtotal_number").html(calculateTotal(cartItemsSelector) + " £");
     }).change();

    checkoutButtonSelector.click(postOrder);
  }
  else {
    cartItemsSelector.append('<li class="cart_item"><p>There are no books in your cart!</p></li>');
    totalSelector.html("0.00 £");
    checkoutButtonSelector.prop("disabled", true);
  }
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
  .then(response => response.json())
  .then(populatePage)
  .catch(error => {
      alert(error.message);
      window.location.href = "/login";
  });
}
