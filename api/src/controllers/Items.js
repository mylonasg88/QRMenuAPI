const con = require("../services/db").mongoose;

const { writeImageBase64 } = require("../utils/utils");

const ItemsController = {};

ItemsController.create = async () => {
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

ItemsController.list = async () => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (e) {
    console.log(e);
    return res.send([]);
  }
};

ItemsController.findOne = () => {
  try {
  } catch (err) {
    console.log(err);
  }
};

ItemsController.update = () => {
  try {
  } catch (err) {
    console.log(err);
  }
};

ItemsController.delete = () => {
  try {
  } catch (err) {
    console.log(err);
  }
};

module.exports = ItemsController;
