'use strict';

const respondWithCode = require('../utils/writer.js');
const Author = require('../service/AuthorService');

module.exports.getAuthorById = function getAuthorById (context) {
  const author_id = context.params.query.author_id;

  return Promise.resolve(
    Author.getAuthorById(author_id)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, 404, err))
  )
};

module.exports.getAuthors = function getAuthors (context) {
  const limit = context.params.query.limit;
  const offset = context.params.query.offset;
  const of = context.params.query.of;

  return Promise.resolve(
    Author.getAuthors(limit,offset,of)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, 404, err))
  )
};
