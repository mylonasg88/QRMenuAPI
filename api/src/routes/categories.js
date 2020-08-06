const router = require("express").Router();
const {categoryItems} = require("../data/categories");
const Category = require('../Models/Category');
const Restaurant = require('../Models/Restaurant');

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (e) {
        console.log(e);
        return res.send([]);
    }
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body.restaurant);
        const restaurant = await Restaurant.findById(req.body.restaurant);
        console.log(restaurant);

        if (!restaurant) return res.status(404).send(`Restaurant with id: ${req.body.restaurant} was not found.`);

        // make sure that restaurant doesn't have that Category already
        const duplicate = await Category.findOne({name: req.body.name, restaurant: restaurant._id});
        if(duplicate) return res.status(409).send(`Restaurant with id: ${req.body.restaurant} already has '${req.body.name}' category.`);

        const category = new Category({
            name: req.body.name,
            image: req.body.image,
            restaurant: restaurant._id
        });

        category.save();

        res.status(201).send({_id: category._id});
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Error: Something went very wrong!');
    }
});

router.get("/items", (req, res) => {
    res.send(categoryItems);
});

module.exports = router;
