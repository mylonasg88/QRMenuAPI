// const mongod = require('../db/index');
const mongoose = require('mongoose');

const connection = require('../db/index');

const restaurantSchema = mongoose.Schema({
    name: {type: String, maxLength: 255, required: true},
    img: {
        type: String,
    }
});

try {
    const Restaurant = connection.model('Restaurant', restaurantSchema);
    const r = new Restaurant();
    r.name = 'Tropical';
    r.save();
} catch (e) {
    console.log(e);
}

const findAll = async () => {
    console.log('Looking for all ;)');
    const res = await Restaurant.find();
    console.log(res);
}
findAll();

exports.Restaurant = Restaurant;
