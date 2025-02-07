const express = require('express');
const router = express.Router();   //call express.Router()
const { body } = require('express-validator');   // need only body from it
const userController = require('../controllers/user.controller');   //logic of writing user create & reg is written in "controller"

//Desc:- Register route
//here exp-val is only checking, to perform action on anything wrong then do in "user.cont" file. so need valRes there
//validate the data that come to that particular route using express-validator & in that pass array(seq of callbk)
router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),   //if not email then show msg..    checks:- isEmail() 
  body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 characters long'),   //name is in obj form. lastname is optional
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
  userController.registerUser   //pass regUser as controller
);


//Desc:- Login route 
router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),   //checks:- isEmail(), if not email then show msg..   
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
  userController.loginUser   
);

module.exports = router;     //create & export