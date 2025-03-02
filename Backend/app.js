const dotenv = require('dotenv');  //try to config these 1st
dotenv.config();    
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();  //create var & call exp
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');  //require it(import) & config
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectToDb();

//cors setup
app.use(cors());  //at that time(dev only), we accept req from all website but at production time accept req from only that particular domain, block else
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//create route for testing purpose 
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/users', userRoutes);    //config user route
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);


module.exports = app;  //export the var