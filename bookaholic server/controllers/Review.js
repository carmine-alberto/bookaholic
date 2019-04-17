'use strict';

var utils = require('../utils/writer.js');
var Review = require('../service/ReviewService');

module.exports.deleteReview = function deleteReview (req, res, next) {
  var about = req.swagger.params['about'].value;
  Review.deleteReview(about)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviews = function getReviews (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  var about = req.swagger.params['about'].value;
  var by_rating = req.swagger.params['by_rating'].value;
  var by_user = req.swagger.params['by_user'].value;
  Review.getReviews(limit,offset,about,by_rating,by_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postReview = function postReview (req, res, next) {
  var username = req.swagger.params['username'].value;
  var gist = req.swagger.params['gist'].value;
  var content = req.swagger.params['content'].value;
  var rating = req.swagger.params['rating'].value;
  var book_id = req.swagger.params['book_id'].value;
  var book_title = req.swagger.params['book_title'].value;
  var book_cover = req.swagger.params['book_cover'].value;
  Review.postReview(username,gist,content,rating,book_id,book_title,book_cover)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
