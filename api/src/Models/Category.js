const mongoose = require('mongoose');
const connection = require('../db/index');
// const Restaurant = require('./Restaurant');

const categorySchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String},
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
})

const Category = connection.model('Category', categorySchema);

module.exports = Category;
