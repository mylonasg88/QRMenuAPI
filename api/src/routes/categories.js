const router = require("express").Router();
const { categories, categoryItems } = require("../data/categories");

router.get("/", (req, res) => {
  res.send(categories);
  // res.send([{ id: 1, name: "Pizzas" }]);
});

router.get("/items", (req, res) => {
  res.send(categoryItems);
});

module.exports = router;
