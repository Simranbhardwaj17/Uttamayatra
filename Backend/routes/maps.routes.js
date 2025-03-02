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




module.exports = router;