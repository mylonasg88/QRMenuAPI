const router = require("express").Router();
const categoriesController = require("../controllers/Categories");

router.get("/", categoriesController.list);

router.get("/restaurant/:id", categoriesController.list);

router.post("/", categoriesController.create);

router.get("/:id", categoriesController.findOne);

router.patch("/:id", categoriesController.update);

router.delete("/:id", categoriesController.delete);

module.exports = router;
