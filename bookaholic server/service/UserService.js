'use strict';


/**
 * Get the user's orders
 *
 * limit Integer The number of items to return. (optional)
 * offset Integer Items to skip before starting to collect the response set. (optional)
 * returns List
 **/
exports.getOrders = function(limit,offset) {
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
 * Get the user profile
 *
 * returns User
 **/
exports.getProfile = function() {
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
 * Login facility
 *
 * username String 
 * password String 
 * returns User
 **/
exports.login = function(username,password) {
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
 * Log out the user
 *
 * no response value expected for this operation
 **/
exports.logout = function() {
  return new Promise(function(resolve, reject) {
    resolve();
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
 * eMail String 
 * returns User
 **/
exports.register = function(username,password,eMail) {
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

