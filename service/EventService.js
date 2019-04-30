'use strict';

const database = require("./DataLayer.js");
/**
 * Get a single event's details
 *
 * event_id String Specify the ID of the event you want to know more about
 * returns Event
 **/
exports.getEventById = function(event_id) {
  return new Promise(function(resolve, reject) {
    database
    .select("event_id", "info", "place", "occurring as date", "image", "book_id")
    .from("event")
    .where({event_id: event_id})
    .then(data => resolve(data[0]))
    .catch(err => reject(err));
  });
}


/**
 * Get places where events will be held
 *
 * returns List
 **/
exports.getEventPlaces = function() {
  return new Promise(function(resolve, reject) {
    database
    .distinct("place")
    .from("event")
    .then(data => resolve(data.map(obj => obj["place"])))
    .catch(err => reject(err));
  });
}


/**
 * Get events details
 *
 * offset Integer Items to skip before starting to collect the response set. (optional)
 * limit Integer The number of items to return. (optional)
 * about String Specify what book requested resources are related to (optional)
 * where String Specify the place where the events shown will be held (optional)
 * from date Specify the minimum starting date for events shown; can be coupled with <<to>> parameter (optional)
 * to date Specify the maximum date for events shown; can be coupled with <<from>> parameter (optional)
 * returns List
 **/
exports.getEvents = function(offset,limit,about,where,from,to) {
  return new Promise(function(resolve, reject) {
    var query = database
    .select("event_id", "info", "place", "occurring as date", "image", "book_id")
    .from("event");

    if (about)
      query = query
      .where({book_id: about})

    if (where)
      query = query
      .where({place: where})

    if (from)
      query = query
      .where("occurring", ">", from);

    if (to)
      query = query
      .where("occurring", "<", to);

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
