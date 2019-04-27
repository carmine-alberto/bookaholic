'use strict';

const database = require("./DataLayer.js");
/**
 * get a single author
 *
 * author_id String The ID of the author whose information has to be returned
 * returns Author
 **/
exports.getAuthorById = function(author_id) {
  return new Promise(function(resolve, reject) {
    database.select("name", "picture", "short_bio")
    .from("author")
    .where("author_id", author_id)
    .then(data => resolve(data[0]))
    .catch(err => reject(err));
  });
}


/**
 * get all authors
 *
 * limit Integer The number of items to return. (optional)
 * offset Integer Items to skip before starting to collect the response set. (optional)
 * of String Specify the book whose authors have to be retrieved (optional)
 * returns Author
 **/
exports.getAuthors = function(limit, offset, of) {
  return new Promise(function(resolve, reject) {
    var query = database
      .select("author_id", "name", "picture", "short_bio")
      .from("author");

    if (of)
      query = query
      .whereIn("author_id",
        database
        .select("author_id")
        .from("written_by")
        .where("book_id", of));

    if (limit)
      query = query
      .limit(limit);

    if (offset)
      query = query
      .offset(offset);

    query
    .then(data =>
      data
      ? resolve(data)
      : Promise
        .reject("The specified book does not exist in the database")
        .catch(err => reject(err)))
    .catch(serverError => reject(serverError));
  });
}
