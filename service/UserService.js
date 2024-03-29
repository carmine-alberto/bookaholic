'use strict';

const database = require("./DataLayer.js");
const getJWT = require("../authenticators/JWTAuth.js").getJWT();
const getHash = require("../authenticators/JWTAuth.js").getHash();
/**
 * Get the user's orders
 *
 * limit Integer The number of items to return. (optional)
 * offset Integer Items to skip before starting to collect the response set. (optional)
 * returns List
 **/
exports.getOrders = function(username,limit,offset) {
  return new Promise(function(resolve, reject) {
    var query = database
                .select("order_id", "emission_time", "status", "total", "address")
                .from("order")
                .where("username", username);

    if (limit)
      query = query.limit(limit);

    if (offset)
      query = query.offset(offset);

    query
    .then(data =>
      Promise.all(
        data.map(order => database
          .select("order_details.book_id", "title as book_title", "cover_type", "item_price as price", "quantity")
          .from("order_details")
          .join("book", "order_details.book_id", "book.book_id")
          .where("order_id", order.order_id)
          .then(order_details => { order.details = order_details; return order; })))
      .then(detailedOrders => resolve(detailedOrders))
      .catch(error => reject(error)))
  });

  /*to group them all:
  query
  .reduce((orders, order, []) =>  order.in(orders) ? orders = orders : orders.addObject(this
    .filter(item => item.book_id == order.book_id && item.cover_type == order.cover_type)
    .reduce((detailedOrder, singleOrder, {initialized with details: []}) => detailedOrder.details.add({book_id: singleOrder.book_id, etc...})*/
}


/**
 * Get the user profile
 *
 * returns User
 **/
exports.getProfile = function(username) {
  return new Promise(function(resolve, reject) {
    database
    .select("username", "email")
    .from("user")
    .where("username", username)
    .then(response => resolve(response[0]))
    .catch(error => reject(error));
  });
}


/**
 * Login facility
 *
 * username String
 * password String
 * returns User
 **/
exports.login = function(username,password) {     //to be passed to the authenticator
  return new Promise(function(resolve, reject) {
    database
    .select("username", "password_hash")
    .from("user")
    .where("username", username)
    .map(credentials => {credentials.password = password; return credentials;})
    .then(enrichedCredentials => getJWT(enrichedCredentials[0]))
    .then(jwt => resolve({username: username, access_token: jwt}))
    .catch(error => reject(error));
  });
}


/**
 * Log out the user
 *
 * no response value expected for this operation
 **/
exports.logout = function(username) {
  return new Promise(function(resolve, reject) {
    resolve("Delete the access-token in your local storage to ensure proper logout!");
  });
}


/**
 * Add a new order
 *
 * no response value expected for this operation
 **/
exports.postToOrders = function(username, address) {
  return new Promise(function(resolve, reject) {
    database
    .select("cart.book_id", "cart.cover_type", "quantity", "in_storage", "price")
    .from("cart")
    .join("book_details as bd", {"cart.book_id":"bd.book_id", "cart.cover_type": "bd.cover_type"})
    .where("username", username)
    .then(booksInCart => addOrder(database, booksInCart, address, username))
    .then(orderDetails => { return addOrderDetails(database, orderDetails.booksInCart, orderDetails.orderId);})
    .then(success => resolve(success))
    .catch(error => { reject(error)} );
  });
};

const addOrder = function(database,booksInCart, address, username) {
  return new Promise(function(resolve, reject) {
    booksInCart[0]
    ? booksInCart
      .reduce((promise, book) => promise.then(acc => {
         acc.total += book.price;
         acc.status = (acc.status == "pending" && book.quantity > book.in_storage)
                      ? "reservation"
                      : acc.status;

         return Promise.resolve(acc);
      }), Promise.resolve({total: 0, status: "pending"})) 
      .then(order => {
         database
         .insert({"status": order.status, "total": order.total, "address": address, "username": username})
         .into("order")
         .returning("order_id")
         .then(order_id => { resolve({orderId: order_id[0], booksInCart: booksInCart}); })
         .catch(orderInsertionError => { reject(orderInsertionError) })
       })
    : reject("There are no books in your cart!");
  })
}

const addOrderDetails = function(database, booksInCart, orderId) {
  return new Promise(function(resolve, reject) {
    booksInCart
    .filter(book => book.quantity <= book.in_storage)
    .forEach(bookInStorage => database
      .insert({"order_id": orderId, "book_id": bookInStorage.book_id, "cover_type": bookInStorage.cover_type, "item_price": bookInStorage.price, "quantity": bookInStorage.quantity})
      .into("order_details")
      .returning(["book_id", "cover_type", "quantity"])
      .then(returnedInfoAsArray => returnedInfoAsArray[0])
      .then(returnedInfo => database("book_details")
        .decrement("in_storage", returnedInfo.quantity)
        .where({"book_id": returnedInfo.book_id, "cover_type": returnedInfo.cover_type})
        .then( () => booksInCart                                                            //TO BE FIXED: i due filter avvengono in parallelo
          .filter(book => book.quantity > book.in_storage)
          .forEach(bookInStorage => database
            .insert({"order_id": orderId, "book_id": bookInStorage.book_id, "cover_type": bookInStorage.cover_type, "item_price": bookInStorage.price, "quantity": bookInStorage.quantity})
            .into("order_details")
            .catch(insertionError => reject(insertionError))))
        .catch(decrementError => reject(decrementError)))
      .catch(prevInsertionError => reject(prevInsertionError)));
      resolve("Order registered successfully!");
  })
}
// Issue: if a concurrent order resolves after order insertion, but before order_details insertion, and brings quantity below the threshold,
// an error is thrown by the database during second orders' details insertion, leaving the database in an inconsistent state.
// How do we encapsulate the atomic operations in a transaction?
//How it works: fetch all items in the cart and, for each, check availability in the book_details table. If quantity > in_storage,

/**
 * Create a new profile
 *
 * username String
 * password String
 * email String
 * returns User
 **/
exports.register = function(username,password,email) {
  return new Promise(function(resolve, reject) {
    getHash(password)
    .then(password_hash => database
      .insert({"username": username, "password_hash": password_hash, "email": email})
      .into("user")
      .then(response => resolve(response))
      .catch(error => reject(error)))
    .catch(error => reject(error));
  });
}


/**
 * Overwrite the specified resource
 *
 * body String
 * field String Specify the field to be updated
 * no response value expected for this operation
 **/
exports.updateField = function(username,field,body) {
  return new Promise(function(resolve, reject) {
    database("user")
    .update(field, body)
    .where("username", username)
    .then(response => resolve(field == "username"
                                ? "Operation successful. Delete your JWT and repeat the login procedure"
                                : "Operation successful"
                              ))
    .catch(error => reject(field+" already exists!"))
  });
}
