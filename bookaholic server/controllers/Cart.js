'use strict';

const Cart = require('../service/CartService');
const respondWithCode = require('../utils/writer.js');

module.exports.editAmount = function editAmount (context) {
  const username = context.user;
  const itemId = context.params.path.itemId  //NB: this one is an object containing book_id and cover_type
  const amount = context.params.query.amount;

  return Promise.resolve(
    Cart.editAmount(username,itemId,amount)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, 404, err))
  )
};

module.exports.emptyCart = function emptyCart (context) {
  const username = context.user;

  return Promise.resolve(
    Cart.emptyCart(username)
    .then(response => respondWithCode(context, 204, response))
    .catch(err => respondWithCode(context, err))
  )
};

module.exports.getCart = function getCart (context) {
  const username = context.user;

  return Promise.resolve(
    Cart.getCart(username)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, err))
  )
};

module.exports.postToCart = function postToCart (context) {
  const username = context.user;
  const book_id = context.requestBody.book_id;
  const cover_type = context.requestBody.cover_type;
  const amount = context.requestBody.amount;

  return Promise.resolve(
    Cart.postToCart(username, book_id, cover_type, amount)
    .then(response => respondWithCode(context, 204, response))
    .catch(err => respondWithCode(context, 403, err))
  )
};
