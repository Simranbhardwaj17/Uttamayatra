const dotenv = require('dotenv');  //try to config these 1st
dotenv.config();    
const express = require('express');
const cors = require('cors');
const app = express();  //create var & call exp
const connectToDb = require('./db/db');

connectToDb();

//cors setup
app.use(cors());  //at that time(dev only), we accept req from all website but at production time accept req from only that particular domain, block else

//create route for testing purpose 
app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;  //export the var