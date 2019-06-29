'use strict';

const respondWithCode = require('../utils/writer.js');
const Book = require('../service/BookService.js');

module.exports.getBookById = function getBookById (context) {
  const book_id = context.params.path.book_id;

  return Promise.resolve(
    Book.getBookById(book_id)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, 404, err))
  )
};

module.exports.getBooks = function getBooks (context) {
  const published_after = context.params.query.published_after;
  const suggested = context.params.query.suggested;
  const bestseller = context.params.query.bestseller;
  const starts_with = context.params.query.starts_with;
  const genre = context.params.query.genre;
  const theme = context.params.query.theme;
  const similar_to = context.params.query.similar_to;
  const limit = context.params.query.limit;
  const offset = context.params.query.offset;

  return Promise.resolve (
    Book.getBooks(published_after,suggested,bestseller,starts_with,genre,theme,similar_to,limit,offset)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, 500, err))
  );
};

module.exports.getGenres = function getGenres (context) {
  return Promise.resolve(
    Book.getGenres()
      .then(response => respondWithCode(context, 200, response))
      .catch(err => respondWithCode(context, 500, err))
    )
};

module.exports.getThemes = function getThemes (context) {
  return Promise.resolve(
    Book.getThemes()
      .then(response => respondWithCode(context, 200, response))
      .catch(err => respondWithCode(context, 500, err))
    )
};
