"use strict";
var _ = require("lodash");

module.exports = function (req, res, next) {
  var responseTypes = {
    ok: require("./ok"),
    badRequest: require("./badRequest"),
    notFound: require("./notFound"),
    serverError: require("./serverError"),
    // forbidden: require('./forbidden'),
    // unauthorized: require('./unauthorized'),
    // unprocessable: require('./unprocessable')
  };

  res = _.extend(res, responseTypes);
  next();
};
