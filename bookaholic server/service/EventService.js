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
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get places where events will be held
 *
 * returns List
 **/
exports.getEventPlaces = function() {
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
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
