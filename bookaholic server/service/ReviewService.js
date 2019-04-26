'use strict';

const database = require("./DataLayer.js");
/**
 * Delete a review
 *
 * about String Specify what book requested resources are related to (optional)
 * no response value expected for this operation
 **/
exports.deleteReview = function(username, about) { //Controller must provide username
  return new Promise(function(resolve, reject) {
    database
    .del()
    .from("review")
    .where({username: username, book_id: about})
    .then(rows_deleted => resolve(rows_deleted))
    .catch(err => reject(err));
  });
}


/**
 * Get a set of reviews
 *
 * limit Integer The number of items to return. (optional)
 * offset Integer Items to skip before starting to collect the response set. (optional)
 * about String Specify what book requested resources are related to (optional)
 * by_rating BigDecimal Specify rating by which reviews have to be filtered (optional)
 * by_user String Specify the received reviews' author. If this query parameter is used, book_title and book_cover will be added to the response object. (optional)
 * returns Review
 **/
exports.getReviews = function(limit,offset,about,by_rating,by_user) {
  return new Promise(function(resolve, reject) {
    var query = database
    .select("username", "gist", "content", "rating", "book_id")
    .from("review")

    if (about)
      query = query
      .where("book_id", about);

    if (by_rating)
      query = query
      .where("rating", by_rating);

    if (by_user)
      query = query
      .clearSelect()
      .select("username", "gist", "content", "rating", "book_id", "book_title", "book_cover")
      .join("book", "review.book_id", "book.book_id")
      .where("username", by_user);

    if (limit)
      query = query
      .limit(limit);

    if (offset)
      query = query
      .offset(offset);

    query
    .then(data => resolve(data))
    .catch(err => reject(err));
  });
}


/**
 * Add a review
 *
 * username String
 * gist String
 * content String
 * rating BigDecimal
 * book_id String
 * book_title String
 * book_cover String
 * no response value expected for this operation
 **/
exports.postReview = function(username,gist,content,rating,book_id) {
  return new Promise(function(resolve, reject) {
    database
    .insert({username: username, gist: gist, content: content, rating: rating, book_id: book_id})
    .into("review")
    .returning("")
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
}
