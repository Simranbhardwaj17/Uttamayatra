const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware'); // Import authentication middleware
const mapController = require('../controllers/map.controller');
const { query } = require('express-validator');


//it is only for auth user coz of charges by google
router.get('/get-coordinates',
  query('address').isString().isLength({ min:3 }),
  authMiddleware.authUser, 
  mapController.getCoordinates
);


//Desc: Router to get-distance-time
router.get('/get-distance-time',
  query('origin').isString().isLength({ min: 3 }),
  query('destination').isString().isLength({ min: 3 }),
  authMiddleware.authUser,  //Middleware for only auth user
  mapController.getDistanceTime
);


//Desc: Router for suggestion of address
router.get('/get-suggestions',
  query('input').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
);


module.exports = router;