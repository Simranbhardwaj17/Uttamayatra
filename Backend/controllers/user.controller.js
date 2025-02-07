const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');      //require it here
const userService = require('../services/user.service');


module.exports.registerUser = async (req, res, next) => { //logic to reg user(create)
  const errors = validationResult(req);  //if anything wrong in validation u will get here
  if(!errors.isEmpty()) {   //if error is not empty(something wrong in those 3) then errors.array() contain err msg written in router
    return res.status(400).json({errors: errors.array() });    //send it to FE(or from where req come)
  }

  // const { firstname, lastname, email, password } = req.body;  //issue: 1st 2 is in obj form, not direct
  const { fullname, email, password } = req.body;  //pull out these from req.body

  //we never store passw in clean format, use hash method
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({  // u can reg particular user(new user created)
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword
  }); // generate auth token from that user

  const token = user.generateAuthToken();  //from model

  res.status(201).json({ token, user });  //send these in response
}


module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 
  const { email, password } = req.body;   //pull out from req.body

  //find user on basis of email, user exists or not(user already reg or not)
  const user = await userModel.findOne({ email }).select('+password');    //select('+password'):- to match password that is send by user, as in userModel, it is declare as false

  if(!user) {  //if user not found(either email or pw, send same msg)
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  //if user exist by email then check pw
  const isMatch = await user.comparePassword(password);     //comparePassword() from usermodel file

  if(!isMatch) {  //if pw not match(either email or pw, send same msg)
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = user.generateAuthToken();  //mthd from model

  res.status(200).json({ token, user });  //send these in response(generatedToken, userLogin)
} 