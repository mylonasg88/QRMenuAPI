const router = require("express").Router();
const RoutesList = require("../utils/routeList");

// Services
const response = require("../services/response");
router.use(response);
// Routes
const categories = require("../routes/categories");
const restaurants = require("../routes/restaurants");
const items = require("../routes/items");
const profile = require("../routes/profile");

// Independent routes. (Experimental)
const chickensRouter = require("../routes/chickens");

// Add Custom middleware for routes here
router.use(function (req, res, next) {
  // console.log("This is a middleware that is going to be used always");
  console.log(req.method, req.url);
  next();
});

module.exports = function (app) {
  // add router with middleware
  app.use("/", router);

  // add routes
  app.use("/categories", categories);
  app.use("/restaurants", restaurants);
  app.use("/profile", profile);
  app.use(items);

  // Independent routes
  app.use(chickensRouter);

  if (process.env.NODE_ENV === "development") {
  }
  console.log(RoutesList);
  RoutesList.web(app, "/route-list");
};
