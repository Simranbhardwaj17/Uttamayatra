const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//create middleware to authenticate user
module.exports.authUser = async (req, res, next) => {
  //get token from cookies or header. So check in both(1st in cookie then in header)
  
  const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];   //get token  //split authorization then get token    create middleware(cookie-parser) that interact with cookies in the server
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const isBlacklisted = await userModel.findOne({ token: token }); 

  if(isBlacklisted) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
    
  //decrypt/decode the token, if get token
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);   //decode using jwt.verify
    const user = await userModel.findById(decoded._id);

    req.user = user  //set that user to req.user  //go as a res to getUserProfile

    return next();  //call next & ret it

  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized'});  //again err msg
  }
}

 