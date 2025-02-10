const captainController = require('../controllers/captain.controller'); // Import captain controller
const express = require('express'); // Import Express framework(Express is a Node.js framework for handling routes)
const router = express.Router(); // Create an Express router instance(express.Router() creates a modular, mountable route handler)
const { body } = require('express-validator'); // Import express-validator for input validation
const authMiddleware = require('../middlewares/auth.middleware'); // Import authentication middleware


// Route for captain registration with validation rules
router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'), // Validate email format
  body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
  body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
], 
  captainController.registerCaptain // Call register function from controller
);


// Route for captain login with basic validation
router.post('/login', [  //exp-val only on 2 fields
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
  captainController.loginCaptain // Call login function from controller
);


// Route to get the captain's profile (protected route - requires authentication)
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);


// Route to logout captain (protected route - requires authentication)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;  // Export router for use in app.js
