const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//create schema
const userSchema = new mongoose.Schema({
  fullname: {   //obj
    firstname: {
      type: String,
      required: true,  //req
      minlength: [ 3, 'First name must be at least 3 characters long']
    },
    lastname: {
      type: String,
      minlength: [ 3, 'First name must be at least 3 characters long']
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters long']
  },
  password: {
    type: String,
    required: true,   //need jwt
    select: false   //when u find user that particular field should not visible by def
  },
  socketId: {   //live tracking of captain
    type: String
  }
})

//3 methods
userSchema.methods.generateAuthToken = function () {    // return jwt token
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {   // to hash the password to store in DB
  return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;