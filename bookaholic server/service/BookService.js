'use strict';

const database = require("./DataLayer.js");
/**
 * get information on a single book
 * Returns all the information pertaining to a single book
 *
 * book_id String The ID of the book whose information have to be returned
 * returns DetailedBook
 **/


exports.getBookById = function(book_id) {
  return new Promise(function(resolve, reject) {
    database.select("isbn", "cover_type", "price", "in_storage")
    .from("book_details")
    .where({book_id: book_id})
    .then(details => {
      database.select("*")
      .from("book")
      .where({book_id: book_id})
      .then(data => {
          data[0].details = details;
          resolve(data[0]);
      })
    })
    .catch(err => reject(err))
  })
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
    var query = database.select("book_id","title", "cover")
    .from("book");

    if (published_after)
      query = query
      .where("publication_date", ">", published_after);

    if (suggested)
      query = query
      .where("is_suggested", true);

    if (starts_with)
      query = query
      .where("title", "like", starts_with+"%");

    if (genre)
      query = query
      .where("genre", genre)

    if (type)
      query = query
      .where("type", type)

    if (similar_to)
      query = query
      .whereIn("book_id",
        database({ a: 'book', b: 'book' })
        .whereRaw('"a".?? = "b".??', [similar_to.criterion, similar_to.criterion])
        .andWhere("a.book_id", similar_to.id)
        .andWhereNot("b.book_id", similar_to.id) //b: column for similar books
        .select("b.book_id")
      );

    if (limit)
      query = query
      .limit(limit);

    if (offset)
      query = query
      .offset(offset);

    query
    .then(data => resolve(data))
    .catch(err => reject(err));
  })
}
/*
*/

/**
 * get available genres
 * Return all the distinct available book genres in the database
 *
 * returns List
 **/
exports.getGenres = function() {
  return new Promise(function(resolve, reject) {
    database.distinct("genre")
    .from("book")
    .then(data => resolve(data.map( el => el["genre"] )));
  })
}


/**
 * get available types
 * Return all the distinct available book types in the database
 *
 * returns List
 **/
exports.getTypes = function() {
  return new Promise(function(resolve, reject) {
    database.distinct("type")
    .from("book")
    .then(data => resolve(data.map( el => el["type"] )));
  });
}
