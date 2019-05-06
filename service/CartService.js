'use strict';

const database = require("./DataLayer.js");
/**
 * Edit the amount of the specified book
 *
 * itemId itemId Parameters used to identify the resource whose amount has to be modified
 * amount BigDecimal New amount of the specified resource. A value of 0 is tantamount to removing the resource from the cart
 * no response value expected for this operation
 **/
exports.editAmount = function(username,itemId,amount) {  //NB: itemId is an object containing book_id and cover_type
  return new Promise(function(resolve, reject) {
    var query = amount > 0
      ? database("cart")
        .update("quantity", amount, ["book_id", "cover_type", "quantity as new_amount"])
        .where("username", username)
        .andWhere({book_id: itemId.book_id, cover_type: itemId.cover_type})
      : database
        .del(["book_id", "cover_type", "quantity as old_amount"])
        .from("cart")
        .where({"username": username, book_id: itemId.book_id, cover_type: itemId.cover_type})

    query
    .then(result => result[0]
        ? resolve(result[0])
        : reject("Resource to edit not found"))
    .catch(error => reject(error));
  })
}


/**
 * Delete every item in the cart
 *
 * no response value expected for this operation
 **/
exports.emptyCart = function(username) {
  return new Promise(function(resolve, reject) {
    database
    .del()
    .from("cart")
    .where("username", username)
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
}


/**
 * Get the items put in the cart by the user
 *
 * returns List
 **/
exports.getCart = function(username) {
  return new Promise(function(resolve, reject) {
      database
      .select("cart.book_id", "title as book_title", "cover", "cart.cover_type", "price", "quantity as amount", "in_storage")
      .from("cart")
      .join("book_details as bd", {"cart.book_id": "bd.book_id", "cart.cover_type": "bd.cover_type"})
      .join("book", "bd.book_id", "book.book_id")
      .where("username", username)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}


/**
 * Add a new book to the cart
 *
 * body CartBook Used to specify the book to be added
 * no response value expected for this operation
 **/
exports.postToCart = function(username, book_id, cover_type, amount) {
  return new Promise(function(resolve, reject) {
    database
    .insert({username: username, book_id: book_id, cover_type: cover_type, quantity: amount})
    .into("cart")
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
}
