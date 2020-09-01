const router = require("express").Router();

const Category = require("../models/Category");
const { writeImageBase64 } = require("../utils/utils");
const logger = require("../startup/logger");

const restaurantController = require("../controllers/Restaurants");

router.get("/", restaurantController.list);

router.get("/:id", restaurantController.findOne);

router.post("/", restaurantController.create);

router.patch("/:id", restaurantController.updateOne);

router.delete("/:id", restaurantController.delete);

router.post("/picture", async (req, res) => {
  try {
    const image = req.body.image;
    const fres = writeImageBase64(
      image,
      "public/uploads/restaurants/1",
      req.body.filename
    );
    console.log(fres);
    res.send({ image: fres });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

router.get("/:id/categories", async (req, res) => {
  try {
    const categories = await Category.find({ restaurant: req.params.id });
    res.send(categories);
  } catch (err) {
    logger.info(err);
    return res
      .status(500)
      .json({ error: true, message: "Something went very wrong!" });
  }
});

module.exports = router;
