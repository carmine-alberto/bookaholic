'use strict';

var utils = require('../utils/writer.js');
var Review = require('../service/ReviewService');

module.exports.deleteReview = function deleteReview (req, res, next) {
  var about = req.swagger.params['about'].value;
  var username = "carmine"; //req.user returned from authentication module to be added here
  Review.deleteReview(username, about)
    .then(function (response) {
      utils.writeJson(res, utils.respondWithCode(204));
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
  console.log(req.body);
  var username = "carmine"; //to be fetched from authentication module
  var gist = req.body.gist;
  var content = req.body.content;
  var rating = req.body.rating;
  var book_id = req.body.book_id;  //<input type="text" name="book_id" value="window.params.book_id" hidden />
  Review.postReview(username,gist,content,rating,book_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
