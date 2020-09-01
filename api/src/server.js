"use strict";

const express = require("express");
const bodyParser = require("body-parser");
// var upload = require("multer")();

const cors = require("cors");
const logger = require("./startup/logger.js");
const app = express();

// app.use(upload.array());
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

//--- Routes
require("./startup/routes")(app);

//--- Services

// Constants
const PORT = process.env.PORT;
const HOST = process.env.HOST;
console.log(process.env);

// let server;
// if (process.env.NODE_ENV === "test") {
//   server = app.listen(3456, HOST);
// } else {
//   server = app.listen(PORT, HOST);
// }

let server = app.listen(process.env.NODE_ENV === "test" ? 3456 : PORT, HOST);

console.log(`Running WhatItLookLike Server on http://${HOST}:${PORT}`);

module.exports = server;
