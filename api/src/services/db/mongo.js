// const mysql = require('mysql');
const mongoose = require("mongoose");
const config = require("../../config");

mongoose.set("useFindAndModify", false);

// const username = "myUserAdmin";
// const password = "abc123";
// const port = 21017;
// const host = "mongodb";

// const constr = `mongodb://${username}:${password}@${host}:${port}`;
// const noauth = `mongodb://mongodb:27017/admin`;
const smplconn = `mongodb://user:secret@mongodb2/qrapp`;

// ============ THIS PART WORKS ==============
// mongoose.connect(smplconn, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
//
// var MongoDB = mongoose.connection;
// MongoDB.on('error', function(err) { console.log(err.message); });
// MongoDB.once('open', function() {
//
//     console.log("mongodb connection open");
// });
//=============================================

const connection = mongoose.createConnection(
  config.connStr,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, connection) => {
    if (err) console.log("Error connecting to DB", err.message);
    else console.log("====> Connected to Mongo DB! <====");
  }
);

module.exports = connection;
module.exports._mongoose = mongoose;
