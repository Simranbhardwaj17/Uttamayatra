const userModel = require('../models/user.model');  // Import the user model to interact with the database

// Export a function that creates a new user
module.exports.createUser = async ({   
  firstname, lastname, email, password  // The function accepts an object with these four fields
}) => {
  
  // Check if the required fields are present
  if (!firstname || !email || !password) {
    throw new Error('All fields are required');  // If any required field is missing, throw an error
  }

  // Create a new user in the database
  const user = userModel.create({   // Using Mongoose's create() method to insert a new user
    fullname: {  // Storing the first and last name inside a 'fullname' object
      firstname,  // Assign the given firstname
      lastname    // Assign the given lastname (optional)
    },
    email,    // Assign the given email
    password  // Assign the given password (should be hashed before saving)
  });

  return user;  // Return the created user object
};




/*
                    ********* 📌Explanation of Code ********

**  Function Purpose: Creates a new user in the database.
**  Input Parameters: Accepts an object { firstname, lastname, email, password }.
**  Validation: Ensures firstname, email, and password are not empty.
**  Database Interaction: Uses userModel.create() to insert the user into the database.
**  Password Hashing: The password should be hashed before being stored in the database (likely handled elsewhere).
**  Return Value: The function returns the created user object.

*/