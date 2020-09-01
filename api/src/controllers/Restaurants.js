const con = require("../services/db").mongoose;
const Mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const { writeImageBase64 } = require("../utils/utils");
const logger = require("../startup/logger");
const { ObjectId } = require("mongoose");
const { formSchema } = require("../Models/Restaurant");

const restaurantController = {};

restaurantController.create = async (req, res) => {
  try {
    console.log("Create");

    // validate form
    const { error, value } = formSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.badRequest("Please provide with more data");
    }

    req.body = value;

    const _id = new Mongoose.Types.ObjectId();

    console.log("req.body.name: ", req.body.name);
    console.log("req.body.image: ", typeof req.body.image);
    console.log("req.body.filename: ", req.body.filename);
    console.log(process.env);

    // Upload picture to restaurant directory
    const imagePath = writeImageBase64(
      req.body.image,
      `public/uploads/restaurants/${_id}`,
      req.body.filename
    );
    console.log("imagePath: " + imagePath);

    const restaurant = new Restaurant({
      _id: _id,
      name: req.body.name,
      image: imagePath,
    });

    restaurant.save();
    console.log(restaurant);

    res.status(200).send({ _id: restaurant._id });
  } catch (err) {
    console.log(err.message.red);
    res.badRequest(err.message);
  }
};

restaurantController.list = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.ok(restaurants);
  } catch (err) {
    console.log(err);
    res.badRequest("Error accurred " + err.message);
  }
};

restaurantController.findOne = async (req, res) => {
  try {
    console.log(req.params.id);
    const restaurant = await Restaurant.findOne({ _id: req.params.id });

    if (!restaurant)
      res.notFound(`Restaurant with id: ${req.params.id} was not found`);

    res.ok(restaurant);
  } catch (err) {
    logger.log(err.message);
    res.badRequest(err.message);
  }
};

restaurantController.updateOne = async (req, res) => {
  try {
    Restaurant.findById(req.params.id, function (err, doc) {
      if (err) throw err;
      if (!doc) return res.notFound(`Document no found.`);
      doc.name = req.body.name;
      doc.save((err) => {
        console.log(err);

        return res.ok("Super good");
      });
    });
  } catch (err) {
    logger.log(err.message);
    req.badRequest(err.message);
  }
};

restaurantController.delete = async (req, res) => {
  const id = req.params.id;
  logger.info("Restaurant to be deleted: " + id);
  try {
    Restaurant.findOneAndDelete({ _id: id }, (err, result) => {
      if (err) return res.badRequest(err.message);

      if (!result)
        return res.notFound(`Restaurant with id '${id}' was not found`);

      return res.ok(result);
    }).catch((err) => {
      // This code should be unreachable.
      logger.warn("Error happened", err.message);
      return res.badRequest("Please try again later");
    });
  } catch (err) {
    logger.warn("Error caught", err.message);
    return res.serverError("Please try again later");
  }
};

module.exports = restaurantController;
