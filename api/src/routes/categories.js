const router = require("express").Router();
const {categories, categoryItems} = require("../data/categories");
// const mongoose = require('mongoose');
const mongoose = require('../db/index');
// const Categories = require('../controllers/categories');
const {Restaurant} = require('../Models/Restaurant');

router.get("/", async (req, res) => {
    // const Restaurant = mongoose.model('Restaurant');

    try {
        console.log(Restaurant);
        // const restaurants = await Restaurant.find();
        Restaurant.find({}, (err, docs) => {
            console.log(err);
            console.log(docs);
            res.send([]);
        });

    } catch (e) {
        console.log(e);
        return res.send([]);
    }

});

router.post('/', (req, res) => {

});

router.get("/items", (req, res) => {
    res.send(categoryItems);
});

module.exports = router;
