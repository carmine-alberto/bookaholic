var books_in_cart = {};
var book_data = get_book_id;

for (item in book_data.details)
  books_in_cart.add(key: item.cover_type, value: 0);

if (getCart.successful) {
  for (item in cart)
    if(this_book_id)
      for(item in this_book_id)
        books_in_cart.add(key:item.cover_type, value:item.amount})
  cartIcon: cart.length;
}



for (item in book_data.details)                        //check da fare all'inizio e quando schiaccio il bottone per modificare la quantità; dopo averla settata, non mostro né addToCart,
  if (item.quantity > books_in_cart[item.cover_type])  //né addToReservation, dal momento che l'operazione è già stata eseguita.
    button: "addToCart"
  else
    button: "addAsReservation"
}
