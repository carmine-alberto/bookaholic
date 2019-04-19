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
  console.log("Inside getBooks");
  return new Promise(function(resolve, reject) {
    if (published_after)
      database.select("book_id","title", "cover")
      .from("book")
      .where("publication_date", ">", published_after)
      .limit(limit)
      .offset(offset)
      .then(data => resolve(data));

    else if (suggested)
      database.select("book_id","title", "cover")
      .from("book")
      .where("is_suggested", true)
      .limit(limit)
      .offset(offset)
      .then(data => resolve(data));

    else if (starts_with)
      database.select("book_id","title", "cover")
      .from("book")
      .where("title", "like", starts_with+"%")
      .limit(limit)
      .offset(offset)
      .then(data => resolve(data));

    else if (similar_to)
      database({ a: 'book', b: 'book' })
      .whereRaw('"a".?? = "b".??', [similar_to.criterion, similar_to.criterion])
      .andWhere("a.book_id", similar_to.id)
      .andWhereNot("b.book_id", similar_to.id)
      .select( "b.book_id", "b.title", "b.cover")
      .limit(limit)
      .offset(offset)
      .then(data => resolve(data));

    else if (genre)
      database.select("book_id","title", "cover")
      .from("book")
      .where("genre", genre)
      .limit(limit)
      .offset(offset)
      .then(data => resolve(data));

    else if (type)
      database.select("book_id","title", "cover")
      .from("book")
      .where("type", type)
      .limit(limit)
      .offset(offset)
      .then(data => resolve(data));

    else
      database.select("book_id","title", "cover")
      .from("book")
      .limit(limit)
      .offset(offset)
      .then(data => resolve(data));
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
