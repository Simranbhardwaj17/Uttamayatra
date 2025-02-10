const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

// Middleware to authenticate a user
module.exports.authUser = async (req, res, next) => {
  // Retrieve/Get token from cookies or headers (cookies checked first)
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];    //create middleware(cookie-parser) that interact with cookies in the server
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if token is blacklisted (i.e., logged out)
  const isBlacklisted = await blackListTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Decode the token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    req.user = user; // Attach user data to request object
    return next(); // Move to the next middleware or controller
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


// Middleware to authenticate a captain
module.exports.authCaptain = async (req, res, next) => {
  // Retrieve token from cookies or headers
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if token is blacklisted
  const isBlacklisted = await blackListTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Decode token to get captain ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    req.captain = captain; // Attach captain data to request object
    return next(); // Move to the next middleware or controller(call next fn & ret it/frwd ctrl to pfp ctrler(to next one))

  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
