'use strict';

const Event = require('../service/EventService');
const respondWithCode = require('../utils/writer.js');

module.exports.getEventById = function getEventById (context) {
  const event_id = context.params.query.event_id;

  return Promise.resolve(
    Event.getEventById(event_id)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, 404, err))
  )
};

module.exports.getEventPlaces = function getEventPlaces (context) {
  return Promise.resolve(
    Event.getEventPlaces()
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, 500, err))
  )
};

module.exports.getEvents = function getEvents (context) {
  const offset = context.params.query.offset;
  const limit = context.params.query.limit;
  const about = context.params.query.about;
  const where = context.params.query.where;
  const from = context.params.query.from;
  const to = context.params.query.to;

  return Promise.resolve(
    Event.getEvents(offset,limit,about,where,from,to)
    .then(response => respondWithCode(context, 200, response))
    .catch(err => respondWithCode(context, 500, err))
  )
};
