'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.editAmount = function editAmount (req, res, next) {
  var itemId = req.swagger.params['itemId'].value;
  var amount = req.swagger.params['amount'].value;
  Cart.editAmount(itemId,amount)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.emptyCart = function emptyCart (req, res, next) {
  Cart.emptyCart()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCart = function getCart (req, res, next) {
  Cart.getCart()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postToCart = function postToCart (req, res, next) {
  var body = req.swagger.params['body'].value;
  Cart.postToCart(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
