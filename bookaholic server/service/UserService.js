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
    .map(order => database
      .select("details.book_id", "title as book_title", "cover_type", "item_price as price", "quantity")
      .from("details")
      .join("book", "details.book_id", "book.book_id")
      .where("order_id", order.order_id)
      .then(order_details => order.details = order_details))
    .then(detailedOrders => resolve(detailedOrders))
    .catch(error => reject(error))
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
exports.postToOrders = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


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
exports.updateField = function(body,field) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}
