"use strict";
var log = {}; //require('../logger');
// var config = require("../../config");
var encryption = require("../encryption");
var _ = require("lodash");
// var queue = require("../queue");

module.exports = function (data, cache, extraData) {
  var req = this.req;
  var res = this;

  // Dump it in the queue
  var response = {};
  if (cache) {
    response.response = data;
    response.response.cached = cache;
  } else {
    response.response = { status: "success", data: data };
  }

  if (extraData) {
    response.response = _.extend(response.response, extraData);
  }

  response.requestId = req.requestId;
  const secureMode = true;
  // Encrypt response here
  if (
    req.get("x-tag") &&
    req.method === "POST" &&
    secureMode &&
    req.body.secure === true &&
    data
  ) {
    var key = req.get("x-tag");

    var text = JSON.stringify(data);

    encryption
      .encrypt(text, key)
      .then(function (resp) {
        // log.info("Sending ok response: ", response.response);
        response.response.secure = true;
        response.response.data = resp.encryptedText;
        response.response.truth = resp.truth;
        res.status(200).json(response.response);
      })
      .catch(function (err) {
        res.serverError(err, "Error encrypting response.");
      });
  } else {
    // log.info("Sending ok response: ", response.response);
    if (data) {
      // Only cache GET calls
      if (req.method === "GET" && "no" !== "yes") {
        res.status(200).json(response.response);
      } else {
        res.status(200).json(response.response);
      }
    } else {
      res.status(200).json(response.response);
    }
  }
};
