"use strict";
var log = require("../../startup/logger");
var _ = require("lodash");

module.exports = function (message) {
  log.warn("Sending 404 response: " + "not found");
  log.warn(message);
  var req = this.req;
  var res = this;

  var response = { status: "error", message: message ? message : "not found" };
  this.status(404).json(response);
};
