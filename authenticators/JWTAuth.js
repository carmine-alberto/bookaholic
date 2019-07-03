
const jwtParser = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const secretKey = require("../secretKey.js");

module.exports = function(pluginContext, info) {
  return new Promise((resolve, reject) => {
    const authorizationHeader = /^Bearer (.+)$/.exec(pluginContext.req.headers.authorization);

    if (authorizationHeader && authorizationHeader[1]) //the second parameter represents the remembered string, i.e. the token
      jwtParser.verify(authorizationHeader[1], secretKey, (err, accessToken) => {
        if (err)
          reject({type: "invalid", challenge: info.schema, status: 400, message: "Invalid JWT"});
        else
          resolve({type: "success", user: accessToken.username, roles: [], scopes: []});
      })
    else
      reject({type: "missing", challenge: info.schema, status: 401, message: "Authentication header not provided. This is probably due to not being logged in."});
  })
}

module.exports.getJWT = function() {
  return function(credentials) {
    return new Promise((resolve, reject) => {
      bcrypt
      .compare(credentials.password, credentials.password_hash)
      .then(valid => valid
        ? resolve(jwtParser.sign({username: credentials.username}, secretKey, {expiresIn: "24h"}))
        : reject("Wrong username or password"))
    })
  }
}

module.exports.getHash = function() {
  return function(password) {
    return bcrypt.hash(password, 10);
  }
}
