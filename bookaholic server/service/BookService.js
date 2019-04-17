'use strict';


/**
 * get information on a single book
 * Returns all the information pertaining to a single book
 *
 * book_id String The ID of the book whose information have to be returned
 * returns DetailedBook
 **/
exports.getBookById = function(book_id) {
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
 * Get a set of books
 *
 * published_after date Return a subset of books: published after the given date (optional)
 * suggested Boolean Return a subset of books: suggested by us (optional)
 * starts_with String Return a subset of books: title starts with the provided string (optional)
 * genre String Return a subset of books: having provided genre (optional)
 * type String Return a subset of books: having provided type (optional)
 * similar_to similar_to Return a subset of books: having the same property specified in criterion as the book provided (optional)
 * limit Integer The number of items to return. (optional)
 * offset Integer Items to skip before starting to collect the response set. (optional)
 * returns List
 **/
exports.getBooks = function(published_after,suggested,starts_with,genre,type,similar_to,limit,offset) {
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
 * get available genres
 * Return all the distinct available book genres in the database
 *
 * returns List
 **/
exports.getGenres = function() {
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
 * get available types
 * Return all the distinct available book types in the database
 *
 * returns List
 **/
exports.getTypes = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

