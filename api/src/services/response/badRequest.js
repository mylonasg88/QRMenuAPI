"use strict";
// var log = require("../logger");
var _ = require("lodash");

module.exports = function (data, message) {
  // log.warn("Sending bad request response: ", data, message || "bad request");
  var req = this.req;
  var res = this;

  if (data !== undefined && data !== null) {
    if (
      Object.keys(data).length === 0 &&
      JSON.stringify(data) === JSON.stringify({})
    ) {
      data = data.toString();
    }
  }

  if (data) {
    this.status(400).json({
      status: "error",
      data,
      message: message ? message : "bad request",
    });
  } else {
    this.status(400).json({
      status: "error",
      message: message ? message : "bad request",
    });
  }
};
