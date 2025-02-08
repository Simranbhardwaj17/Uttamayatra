const mongoose = require('mongoose'); // Import Mongoose to interact with MongoDB
const bcrypt = require('bcrypt'); // Import bcrypt to hash passwords
const jwt = require('jsonwebtoken'); // Import JWT to generate authentication tokens

// Create the User Schema
const userSchema = new mongoose.Schema({
  fullname: { // Object containing first and last name
    firstname: {
      type: String,
      required: true, // First name is required
      minlength: [3, 'First name must be at least 3 characters long'] // Validation: Minimum 3 characters
    },
    lastname: {
      type: String,
      minlength: [3, 'Last name must be at least 3 characters long'] // Validation: Minimum 3 characters (optional field)
    }
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Ensures email is unique in the database
    minlength: [5, 'Email must be at least 5 characters long'] // Validation: Minimum 5 characters
  },
  password: {
    type: String,
    required: true, // Password is required
    select: false // Exclude password from query results by default
  }, 
  socketId: { // Used for real-time tracking (e.g., for a chat or live tracking system)
    type: String
  }
});


//        Methods(3) in User Schema

// Method to generate an authentication token
userSchema.methods.generateAuthToken = function () {    
  // Create a JWT token with the user’s ID (_id) as payload
  const token = jwt.sign(
    { _id: this._id }, // Payload (user ID)
    process.env.JWT_SECRET, // Secret key stored in environment variables
    { expiresIn: '24h' } // Token expires in 24 hours
  );     
  return token; // Return the generated token
};

// Method to compare input password with the hashed password in DB
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Returns true if passwords match
};

// Static method to hash password before storing in DB
userSchema.statics.hashPassword = async function (password) {   
  return await bcrypt.hash(password, 10); // Hash password with a salt factor of 10
};


// Creating and Exporting the Model
const userModel = mongoose.model('user', userSchema); // Create a Mongoose model from the schema

module.exports = userModel; // Export the model for use in other files



/*
📌Explanation of Code-----------
This file defines a Mongoose schema for a user model, including:
* Schema structure (name, email, password, etc.)
* Data validation
* Methods for hashing passwords & generating authentication tokens


🛠 Methods in User Schema
The schema defines three methods:

generateAuthToken → Creates a JWT token
comparePassword → Compares user-entered password with the stored hash
hashPassword → Hashes the password before saving it to the database


****** How This Works ********
1. User Registration:-
Password is hashed before being saved.
User details are stored in MongoDB.

2. User Login
Email & password are verified.
If successful, a JWT token is generated.

3. Authentication
Every protected route checks if the user has a valid token.


Why This is Useful✅
 Secure storage of user passwords using bcrypt hashing
 JWT authentication to handle user sessions
 Scalable and flexible schema structure

This schema forms the core of a secure user authentication system in a Node.js + MongoDB backend

*/