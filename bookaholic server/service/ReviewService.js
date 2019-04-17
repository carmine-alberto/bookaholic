'use strict';


/**
 * Delete a review
 *
 * about String Specify what book requested resources are related to (optional)
 * no response value expected for this operation
 **/
exports.deleteReview = function(about) {
  return new Promise(function(resolve, reject) {
    resolve();
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
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
exports.postReview = function(username,gist,content,rating,book_id,book_title,book_cover) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

