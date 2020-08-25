const con = require("../services/db").mongoose;
const logger = require("../startup/logger");

const Restaurant = require("../models/Restaurant");
const Category = require("../models/Category");
const { writeImageBase64 } = require("../utils/utils");

const categoriesController = {};

/**
 *
 * @param {string} name
 * @param {string} image
 * @param {string} restaurant
 */
categoriesController.create = async (req, res) => {
  try {
    console.log(req.body.restaurant);
    const restaurant = await Restaurant.findById(req.body.restaurant);
    console.log(restaurant);

    if (!restaurant)
      return res
        .status(404)
        .send(`Restaurant with id: ${req.body.restaurant} was not found.`);

    // Upload picture to restaurant directory
    const imagePath = writeImageBase64(
      req.body.image,
      `public/uploads/restaurants/${req.body.restaurant}`,
      req.body.filename
    );
    console.log(imagePath);

    // make sure that restaurant doesn't have that Category already
    const duplicate = await Category.findOne({
      name: req.body.name,
      restaurant: restaurant._id,
    });
    if (duplicate)
      return res
        .status(409)
        .send(
          `Restaurant with id: ${req.body.restaurant} already has '${req.body.name}' category.`
        );

    const category = new Category({
      name: req.body.name,
      image: imagePath,
      restaurant: restaurant._id,
    });

    category.save();

    res.status(201).send({ _id: category._id });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ error: true, message: "Something went very wrong!" });
  }
};

categoriesController.list = async (req, res) => {
  try {
    // throw new Error("Error");
    logger.info("Getting all Categories");
    const categories = await Category.find();

    res.ok(categories);
  } catch (err) {
    return res.badRequest(err);
  }
};

categoriesController.findOne = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      throw new Error(`Category with id ${req.params.id} does not exist.`);
  } catch (err) {
    console.log(err);
    next(err.message);
  }
};

categoriesController.update = async (req, res) => {
  try {
    console.log(req.body);
    const body = req.body;
    Category.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name, image: req.body.image },
      {},
      (err) => {
        console.log("Updating...");
        console.log(err);
        res.ok("Updated");
      }
    ).catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

categoriesController.delete = async (req, res) => {
  console.log(req.params.id.red);
  return res.ok("Deeltedddd");

  Category.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.badRequest(err.message);
    else res.ok("Deleted");
  });
};

module.exports = categoriesController;
