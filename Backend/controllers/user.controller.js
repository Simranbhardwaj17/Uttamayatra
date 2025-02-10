// Import required modules
const { validationResult } = require('express-validator');  // For validating user input
const userModel = require('../models/user.model');          // User model to interact with DB
const userService = require('../services/user.service');    // Business logic for user creation
const blackListTokenModel = require('../models/blacklistToken.model');  // Stores blacklisted tokens


//  LOGICS TO REGISTER USER (SIGN UP)
module.exports.registerUser = async (req, res, next) => { 
  // Validate request input using express-validator(if anything wrong in validation u will get here)
  const errors = validationResult(req);     
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });  // Send validation errors to FE or from where req come(errors.array() contain err msg written in router)
  }

  // Extract(pull out these) data from request body
  // const { firstname, lastname, email, password } = req.body;  //issue: 1st 2 is in obj form, not direct
  const { fullname, email, password } = req.body;  

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already registered. Please log in.' });
  }


  // Hash password before storing it in the database
  const hashedPassword = await userModel.hashPassword(password);

  // Create new user using the service layer
  const user = await userService.createUser({
    firstname: fullname.firstname,  // Extract firstname from fullname object
    lastname: fullname.lastname,    // Extract lastname
    email,
    password: hashedPassword,       // Store hashed password for security
  });

  // Generate authentication token for the new user
  const token = user.generateAuthToken(); 

  // Respond with token and user data(send these in response)
  res.status(201).json({ token, user });
};


//  LOGIN USER (SIGN IN)
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });  // Send validation errors
  }
 
  // Extract email and password from request body
  const { email, password } = req.body;   

  // Find user by email, including password field (hidden by default in schema)
  const user = await userModel.findOne({ email }).select('+password');

  // If user not found, return error
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare provided password with stored hashed password
  const isMatch = await user.comparePassword(password);
  
  // If password does not match, return error(same msg for email & pw)
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token for the user
  const token = user.generateAuthToken();  

  // Store the token in cookies for session management
  res.cookie('token', token);  

  // Send response with token and user data
  res.status(200).json({ token, user });
};


//  GET USER PROFILE
module.exports.getUserProfile = async (req, res, next) => {
  // This route is protected using authentication middleware
  // The authenticated user's data is attached to `req.user`
  res.status(200).json(req.user);   //req.user(user) set in middleware, transfer in pfp as a res 
};


//  LOGOUT USER
module.exports.logoutUser = async (req, res, next) => {
  // Clear authentication cookie
  res.clearCookie('token');

  // Retrieve the token from cookies or authorization header
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; 

  // Add the token to the blacklist database to prevent reuse
  await blackListTokenModel.create({ token });   //no need to pass createdAt(coz it take time by def )

  // Respond with success message
  res.status(200).json({ message: 'Logged out' });
};




/*

Explanation of User Authentication Controller---------
This file handles user authentication (Register, Login, Logout, and Profile retrieval).

It interacts with:
1. User Model (userModel) → Manages user data.
2. User Service (userService) → create newUser logic.
3. Blacklist Token Model (blackListTokenModel) → Prevents reuse of logged-out tokens.


*/