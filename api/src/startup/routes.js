var router = require("express").Router();
// Services
const response = require("../services/response");
router.use(response);
// Routes
const categories = require("../routes/categories");
const restaurants = require("../routes/restaurants");
const items = require("../routes/items");
const chickensRouter = require("../routes/chickens");

// Add Custom middleware for routes here
router.use(function (req, res, next) {
  console.log("This is a middleware that is going to be used always");
  next();
});

module.exports = function (app) {
  // add router with middleware
  app.use("/", router);

  // add routes
  app.use("/categories", categories);
  app.use("/restaurants", restaurants);
  app.use(chickensRouter);
};
