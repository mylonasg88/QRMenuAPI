"use strict";

// var db = require('../services/database').mongo;
var db = require("../services/db/index");
// var queue = require('../services/queue');

var collection = "Items";

var schemaObject = {
  // ++++++++++++++ Modify to your own schema ++++++++++++++++++
  name: {
    type: "String",
  },
  image: {
    type: "String",
  },
  category: {
    type: db.mongoose.Schema.Types.ObjectId,
  },

  toPop: {
    type: db.mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },

  // ++++++++++++++ Modify to your own schema ++++++++++++++++++
};

schemaObject.createdAt = {
  type: "Date",
  default: Date.now,
};

schemaObject.updatedAt = {
  type: "Date",
  // default: new Date().toISOString()
};

schemaObject.owner = {
  type: db.mongoose.Schema.Types.ObjectId,
  ref: "Accounts",
};

schemaObject.createdBy = {
  type: db.mongoose.Schema.Types.ObjectId,
  ref: "Accounts",
};

schemaObject.client = {
  type: db.mongoose.Schema.Types.ObjectId,
  ref: "Clients",
};

schemaObject.developer = {
  type: db.mongoose.Schema.Types.ObjectId,
  ref: "Users",
};

schemaObject.tags = {
  type: [String],
  index: "text",
};

// Let us define our schema
var Schema = db.mongoose.Schema(schemaObject);

// Index all text for full text search
// MyModel.find({$text: {$search: searchString}})
//    .skip(20)
//    .limit(10)
//    .exec(function(err, docs) { ... });
// Schema.index({'tags': 'text'});

Schema.statics.search = function (string) {
  return this.find(
    { $text: { $search: string } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } });
};

// assign a function to the "methods" object of our Schema
// Schema.methods.someMethod = function (cb) {
//     return this.model(collection).find({}, cb);
// };

// assign a function to the "statics" object of our Schema
// Schema.statics.someStaticFunction = function(query, cb) {
// eg. pagination
// this.find(query, null, { skip: 10, limit: 5 }, cb);
// };

// Adding hooks

Schema.pre("save", function (next) {
  // Indexing for search
  // var ourDoc = this._doc;
  //
  // ourDoc.model = collection;
  //
  // // Dump it in the queue
  // queue.create('searchIndex', ourDoc)
  // .save();

  next();
});

Schema.post("init", function (doc) {});

Schema.post("validate", function (doc) {});

Schema.post("save", function (doc) {});

Schema.post("remove", function (doc) {});

Schema.pre("validate", function (next) {
  next();
});

Schema.post("validate", function () {});

Schema.pre("find", function (next) {
  this.start = Date.now();
  next();
});

Schema.post("find", function (result) {
  // prints returned documents
  // prints number of milliseconds the query took
});

Schema.pre("update", function (next) {
  // Indexing for search
  // var ourDoc = this._update;
  // ourDoc.model = collection;
  // ourDoc.update = true;
  // if(ourDoc.updatedAt || ourDoc.tags){ /* jslint ignore:line */
  //     // Move along! Nothing to see here!!
  // }else{
  //     // Dump it in the queue
  //     queue.create('searchIndex', ourDoc)
  //     .save();
  // }
  //
  // ourDoc.updatedAt = new Date(Date.now()).toISOString();

  next();
});

var Model = db.connection.model(collection, Schema);
Model.mongoose = db.mongoose;

module.exports = Model;
