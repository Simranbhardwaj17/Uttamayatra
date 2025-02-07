const userModel = require('../models/user.model');

module.exports.createUser = async ({   //this fn create user
  firstname, lastname, email, password  //this fn accepts these 4 fields as a obj
}) => {
  if (!firstname || !email || !password) {
    throw new Error('All fields are required');    //if any fields empty then throw err
  }
  const user = userModel.create({
    fullname: {
      firstname,    
      lastname
    },
    email,
    password  //will convert to hash
  })

  return user;
}