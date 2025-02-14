const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

// Register a new captain
module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  // Check if the email already exists
  const existingCaptain = await captainModel.findOne({ email });
  if (existingCaptain) {
    return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
  }

  // Hash the password before saving
  const hashedPassword = await captainModel.hashPassword(password);

  // Create a new captain
  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType
  });

  // Generate authentication token
  const token = captain.generateAuthToken();

  res.status(201).json({ token, captain });
};

// Login a captain
module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
    
  // Find captain by email and include password field
  const captain = await captainModel.findOne({ email }).select('+password');
  if (!captain) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare the provided password with the hashed password
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate authentication token
  const token = captain.generateAuthToken();
  res.cookie('token', token);
  
  res.status(200).json({ token, captain });
};

// Get the captain's profile
module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

// Logout the captain by blacklisting the token
module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  await blacklistTokenModel.create({ token });
  res.clearCookie('token');

  res.status(200).json({ message: 'Logout successfully' });
};