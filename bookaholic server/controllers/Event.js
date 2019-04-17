'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.getEventById = function getEventById (req, res, next) {
  var event_id = req.swagger.params['event_id'].value;
  Event.getEventById(event_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventPlaces = function getEventPlaces (req, res, next) {
  Event.getEventPlaces()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEvents = function getEvents (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var about = req.swagger.params['about'].value;
  var where = req.swagger.params['where'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Event.getEvents(offset,limit,about,where,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
