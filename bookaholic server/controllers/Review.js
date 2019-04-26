'use strict';

const respondWithCode = require('../utils/writer.js');
const Review = require('../service/ReviewService');

module.exports.deleteReview = function deleteReview (context) {
  const about = context.params.query.about;
  const username = context.user;

  return Promise.resolve(
    Review.deleteReview(username, about)
    .then(response => respondWithCode(context, 204, response))
    .catch(err => respondWithCode(context, 404, err))
  )
};

module.exports.getReviews = function getReviews (context) {
  const limit = context.params.query.limit;
  const offset = context.params.query.offset;
  const about = context.params.query.about;
  const by_rating = context.params.query.by_rating;
  const by_user = context.params.query.by_user;

  return Promise.resolve(
    Review.getReviews(limit,offset,about,by_rating,by_user)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, 500, err))
  )
};

module.exports.postReview = function postReview (context) {
  const username = context.user; //to be fetched from authentication module
  const gist = context.requestBody.gist;
  const content = context.requestBody.content;
  const rating = context.requestBody.rating;
  const book_id = context.requestBody.book_id;  //<input type="text" name="book_id" value="window.params.book_id" hidden />

  return Promise.resolve(
    Review.postReview(username,gist,content,rating,book_id)
    .then(response => respondWithCode(context, 204, response))
    .catch(err => respondWithCode(context, 403, err))
  )
};
