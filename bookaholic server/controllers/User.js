'use strict';

const respondWithCode = require('../utils/writer.js');
const User = require('../service/UserService');

module.exports.getOrders = function getOrders (context) {
  const limit = context.params.query.limit;
  const offset = context.params.query.offset;
  const username = context.user;

  return Promise.resolve(
    User.getOrders(username,limit,offset)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, 500, err))
  )
};

module.exports.getProfile = function getProfile (context) {
  const username = context.user;

  return Promise.resolve(
    User.getProfile(username)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, err))
  )
};

module.exports.login = function login (context) {
  const username = context.requestBody.username;
  const password = context.requestBody.password;

  return Promise.resolve(
    User.login(username,password)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, 400, err))
  )
};

module.exports.logout = function logout (context) {
  const username = context.user;

  return Promise.resolve(
    User.logout(username)
    .then(response => respondWithCode(context, 204, response))
    .catch(err => respondWithCode(context, 403, err))
  )
};

module.exports.postToOrders = function postToOrders (context) {
  const username = context.user;

  return Promise.resolve(
    User.postToOrders(username)
    .then(response => respondWithCode(context, 201, response))
    .catch(err => respondWithCode(context, 403, err))
  )
};

module.exports.register = function register (context) {
  console.log(context.requestBody);
  const username = context.requestBody.username;
  const password = context.requestBody.password;
  const email = context.requestBody.email;

  return Promise.resolve(
    User.register(username,password,email)
    .then(response => respondWithCode(context, 204, response))
    .catch(err => respondWithCode(context, 403, err))
  )
};

module.exports.updateField = function updateField (context) {
  const username = context.user;
  const field = context.params.query.field;
  const body = context.requestBody.body;

  return Promise.resolve(
    User.updateField(username,field,body)
    .then(response => respondWithCode(context, 204, response))
    .catch(err => respondWithCode(context, err))
  )
};
