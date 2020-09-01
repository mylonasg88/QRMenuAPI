const mongoose = require("mongoose");
const connection = require("../services/db/mongo");
const Joi = require("joi");

const logger = require("../startup/logger");

const restaurantSchema = mongoose.Schema({
  name: { type: String, maxLength: 255, required: true },
  image: {
    type: String,
  },
  createdAt: {
    type: "Date",
    default: Date.now,
  },
  updatedAt: {
    type: "Date",
    default: new Date().toISOString(),
  },
});

restaurantSchema.pre("findOneAndUpdate", function (next) {
  console.log("Updating document findOneAndUpdate");

  const doc = this._update;
  // console.log(doc);

  // console.log(doc.image);
  // console.log(doc.name.name);

  doc.updatedAt = new Date(Date.now()).toISOString();
  next();
});

restaurantSchema.pre("save", function (next, doc) {
  logger.warn("Pre Save");

  const ourDoc = this;

  next();
});

// restaurantSchema.post("save", function (doc, next) {
//   console.log("Post Save");
//   // console.log(doc);
//   const ourDoc = this;
//   console.log(ourDoc);
//   next();
// });

// restaurantSchema.post("create", function (next, b) {
//   console.log("Post Create");
//   console.log(next, b);
//   next();
// });

const formSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const Restaurant = connection.model("Restaurant", restaurantSchema);

exports = formSchema;
module.exports = Restaurant;
