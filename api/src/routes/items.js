"use strict";
var express = require("express");
var router = express.Router();
// var validator = require('../services/validator');
var itemsController = require("../controllers/Items");

var service = "items";

// get items or search items
router.get("/" + service, itemsController.list);

// get chicken
router.get("/" + service + "/:id", itemsController.findOne);

// create chicken(s) a single chicken object will create one chicken while an array of items will create multiple items
router.post("/" + service, itemsController.create);

// // update all records that matches the query
router.put("/" + service, itemsController.update);

// // update a single record
// router.patch("/" + service + "/:id", itemsController.updateOne);

// // delete all records that matches the query
router.delete("/" + service, itemsController.delete);

// // Delete a single record
// router.delete("/" + service + "/:id", itemsController.deleteOne);

// // restore a previously deleted record
// router.post("/" + service + "/:id/restore", itemsController.restore);

module.exports = router;
