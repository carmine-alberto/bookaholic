'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService.js');

module.exports.getBookById = function getBookById (req, res, next) {
  var book_id = req.swagger.params['book_id'].value;
  Book.getBookById(book_id)
    .then(function (response) {
      console.log(response);
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBooks = function getBooks (req, res, next) {
  var published_after = req.swagger.params['published_after'].value;
  var suggested = req.swagger.params['suggested'].value;
  var starts_with = req.swagger.params['starts_with'].value;
  var genre = req.swagger.params['genre'].value;
  var type = req.swagger.params['type'].value;
  var similar_to = req.swagger.params['similar_to'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  console.log("Inside getBooks");
  Book.getBooks(published_after,suggested,starts_with,genre,type,similar_to,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGenres = function getGenres (req, res, next) {
  Book.getGenres()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTypes = function getTypes (req, res, next) {
  Book.getTypes()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
