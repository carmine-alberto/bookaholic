'use strict';

const database = require("./DataLayer.js");
/**
 * Edit the amount of the specified book
 *
 * itemId itemId Parameters used to identify the resource whose amount has to be modified
 * amount BigDecimal New amount of the specified resource. A value of 0 is tantamount to removing the resource from the cart
 * no response value expected for this operation
 **/
exports.editAmount = function(itemId,amount) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete every item in the cart
 *
 * no response value expected for this operation
 **/
exports.emptyCart = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get the items put in the cart by the user
 *
 * returns List
 **/
exports.getCart = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add a new book to the cart
 *
 * body CartBook Used to specify the book to be added
 * no response value expected for this operation
 **/
exports.postToCart = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}
