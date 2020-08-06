// const mysql = require('mysql');
const mongoose = require('mongoose');

// const connect = async () => await mongoose.connect('mongodb://localhost/my_database', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

const username = 'myUserAdmin';
const password = 'abc123';
const port = 21017;
const host = 'mongodb';

const constr = `mongodb://${username}:${password}@${host}:${port}`;
const noauth = `mongodb://mongodb:27017/admin`;
const smplconn = `mongodb://user:secret@mongodb2/qrapp`;
console.log(constr);
console.log(noauth);

var mongoURI = "mongodb://localhost:27017/test";

// ============ THIS PART WORKS ==============
// mongoose.connect(smplconn, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
//
// var MongoDB = mongoose.connection;
// MongoDB.on('error', function(err) { console.log(err.message); });
// MongoDB.once('open', function() {
//
//     console.log("mongodb connection open");
// });
//=============================================

const connection = mongoose.createConnection(smplconn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, connection) => {
    if (err) console.log('Error connecting to DB', err.message);
    else
        console.log('====> Connected to Mongo DB! <====');
});

// var User = connection.model('User', {
//     name: {type: String, required: false}
// })
//
// try {
//     const u = new User();
//     u.name = 'Tropical';
//     u.save();
// } catch (err) {
//     console.log(err);
// }

module.exports = connection;
