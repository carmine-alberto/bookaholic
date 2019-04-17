'use strict';


/**
 * get a single author
 *
 * author_id String The ID of the author whose information has to be returned
 * returns Author
 **/
exports.getAuthorById = function(author_id) {
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
 * get all authors
 *
 * limit Integer The number of items to return. (optional)
 * offset Integer Items to skip before starting to collect the response set. (optional)
 * of String Specify the book whose authors have to be retrieved (optional)
 * returns Author
 **/
exports.getAuthors = function(limit,offset,of) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

