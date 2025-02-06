const mongoose = require('mongoose');

function connectToDb() {
  mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log('DB connected...'))
    // .catch(err => console.log(err));
    .catch(err => console.error('DB connection error:', err));
}

module.exports = connectToDb;

//to connect to db