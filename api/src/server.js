"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
// require('./startup/logger.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

//--- Routes
require('./startup/routes')(app);

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Constants
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST);
console.log(`Running WhatItLookLike Server on http://${HOST}:${PORT}`);
