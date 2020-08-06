const router = require('express').Router();
const Restaurants = require('../Models/Restaurant');
const {writeImageBase64} = require('../utils/utils');

router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurants.find();
        console.log(restaurants);
        res.send(restaurants);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error accurred ' + err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const restaurant = await Restaurants.findOne({_id: req.params.id});

        if (!restaurant) res.status(404).send(`Restaurant with id: ${req.params.id} was not found`);

        res.send(restaurant);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error accurred: ' + err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const restaurant = new Restaurants({
            name: req.body.name,
            image: req.body.image ?? ''
        })
        restaurant.save();

        res.status(201).send(restaurant);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/picture', async (req, res) => {
    try {
        const image = req.body.image;
        const fres = writeImageBase64(image, 'public/uploads/restaurants/1', req.body.filename);
        console.log(fres);
        res.send({image: fres});
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})

module.exports = router;
