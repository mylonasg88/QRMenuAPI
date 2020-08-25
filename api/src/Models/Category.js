const mongoose = require("mongoose");
const connection = require("../services/db/mongo");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  createdAt: {
    type: "Date",
    default: Date.now,
  },
  updatedAt: {
    type: "Date",
    default: new Date().toISOString(),
  },
});

categorySchema.pre("deleteOne", function (next) {
  console.log("You are deleting one");
  next();
});

// categorySchema.pre("update", (next) => {
//   console.log("Updating document");

//   const doc = this._update;
//   doc.updatedAt = new Date(Date.now()).toISOString();
//   next();
// });

categorySchema.pre("updateOne", function (next) {
  console.log("Updating document findOneAndUpdate");

  const doc = this._update;

  doc.updatedAt = new Date(Date.now()).toISOString();
  next();
});

categorySchema.pre("findOneAndUpdate", function (next) {
  console.log("Updating document findOneAndUpdate");

  const doc = this._update;

  doc.updatedAt = new Date(Date.now()).toISOString();
  next();
});

const Category = connection.model("Category", categorySchema);

module.exports = Category;
