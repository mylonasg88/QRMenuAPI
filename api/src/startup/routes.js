const categories = require('../routes/categories');
const restaurants = require('../routes/restaurants');

module.exports = function (app) {
    app.use('/categories', categories);
    app.use('/restaurants', restaurants);
}
