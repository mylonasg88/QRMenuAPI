const con = require("../services/db").mongoose;

const { writeImageBase64 } = require("../utils/utils");
const Item = require("../models/Item");
const Category = require("../models/Category");
const logger = require("../startup/logger");

const ItemsController = {};

/**
 * Create an item that belongs to a restaurant.
 *
 * @param restaurant
 * @param image
 * @param name
 */
ItemsController.create = async (req, res) => {
  try {
    console.log(req.body.category);

    if (!req.body.category) res.badRequest("restaurant must be defined.");
    const category = await Category.findById(req.body.category);
    console.log(category);

    if (!category)
      return res.notFound(
        `Restaurant with id: ${req.body.category} was not found.`
      );

    // Upload picture to restaurant directory
    const imagePath = writeImageBase64(
      req.body.image,
      `public/uploads/restaurants/${req.body.category}`,
      req.body.filename
    );
    console.log(imagePath);

    // make sure that restaurant doesn't have that Category already
    const duplicate = await Item.findOne({
      name: req.body.name,
      category: category._id,
    });

    if (duplicate)
      return res
        .status(409)
        .send(
          `Restaurant with id: ${req.body.category} already has '${req.body.name}' category.`
        );

    const item = new Item({
      name: req.body.name,
      image: imagePath,
      category: category._id,
    });

    await item.save();

    return res.status(201).send({ _id: item._id });
  } catch (err) {
    console.log(err.message);
    return res.serverError(err.message);
  }
};

ItemsController.list = async (req, res) => {
  try {
    const items = await Item.find();
    res.ok(items);
  } catch (err) {
    console.log(err);
    return res.serverError(err.message);
  }
};

ItemsController.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);

    if (!item) return res.notFound(`Item with '${id}' id was not found.`);

    return res.ok(item);
  } catch (err) {
    console.log(err);
    return res.serverError(err.message);
  }
};

ItemsController.patch = async (req, res) => {
  try {
    Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        // image: req.body.image ?? null,
      },
      (err, item) => {
        logger.info("Updated item");
        logger.info(item);

        if (err) throw new Error(err.message);
        res.ok();
      }
    );
  } catch (err) {
    logger.error(err);
    return res.serverError(err.message);
  }
};

ItemsController.delete = async (req, res) => {
  try {
    const id = req.params.id;
    // return res.ok();
    Item.findOneAndDelete({ _id: id }, function (err) {
      logger.debug("Deleting an item");
      if (err) throw new Error(err.message);
      return res.ok();
    });

    // Item.deleteOne({ _id: id }, (err) => {
    //   if (err) throw new Error(err.message);
    //   return res.ok();
    // });
  } catch (err) {
    logger.info(err);
    return res.serverError(err.message);
  }
};

module.exports = ItemsController;
