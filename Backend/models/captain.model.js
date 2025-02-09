// The schema defines what fields a captain document must have and includes validation rules.
const mongoose = require('mongoose');   // Import Mongoose for schema and model creation
const bcrypt = require('bcrypt');       // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');    // Import JWT for authentication


// Mongoose schema for captains(Fields & Validation)
const captainSchema = new mongoose.Schema({
  fullname: { // Object containing first and last name
    firstname: {
      type: String,
      required: true, // First name is required
      minlength: [3, 'First name must be at least 3 characters long'] // Validation: Minimum 3 characters
    },
    lastname: {   //lastname is optional 
      type: String,
      minlength: [3, 'Last name must be at least 3 characters long'] // Validation: Minimum 3 characters (optional field)
    }
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Ensures email is unique in the database
    lowercase: true,  // Converts email to lowercase before storing
    match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]  // Regex to validate email format
  },
  password: {
    type: String,
    required: true, // Password is required
    select: false // Exclude password from query results by default(select: false ensures the password is never returned in queries, making it more secure. )
  }, 
  socketId: { // Stores a unique socket ID for real-time tracking features (e.g., WebSocket chat, live location updates).
    type: String
  },

  //Add fields other than user( Captain Status)
  status: {
    type: String,
    enum: [ 'active', 'inactive' ],   // Only allows 'active' or 'inactive'
    default: 'inactive',  //By default, captains are inactive when they register
  },

  //Vehicle Details (Stored as an Object)
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [ 3, 'Color must be at least 3 characters long' ],
    },
    plate: {
      type: String,
      required: true,
      minlength: [ 3, 'Plate must be at least 3 characters long' ],
    },
    capacity: {
      type: Number,
      required: true,
      min: [ 1, 'Capacity must be at least 1' ],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: [ 'car', 'motorcycle', 'auto' ],   // Only allows these values
    }
  },

  // Location (GPS Coordinates)
  // Stores captain’s live location (latitude & longitude)
  location: {
    ltd: {
      type: Number,  //not req coz initially captain maybe inactivate
    },
    lng: {
      type: Number,  // Longitude, not required initially(Captain may not be active immediately)
    }
  }
});


// Mongoose allows us to add custom methods to our schema

// Method to generate an authentication token using JWT
captainSchema.methods.generateAuthToken = function () {    
  // Create a JWT token with the captain’s ID (_id) as payload
  const token = jwt.sign(
    { _id: this._id }, // Payload contains the captain’s _id
    process.env.JWT_SECRET, // Secret key stored in environment variables
    { expiresIn: '24h' } // Token expires in 24 hours
  );     
  return token; // Return the generated token
};

// Method to compare input password with the hashed password in DB
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Returns true if passwords match(Uses bcrypt.compare() to verify)
};

// Static method to hash password before storing in DB
captainSchema.statics.hashPassword = async function (password) {   
  return await bcrypt.hash(password, 10); // Hash password with a salt factor of 10 (higher salt = more security)
};


// Creating and Exporting the Model
const captainModel = mongoose.model('captain', captainSchema); // Create a Mongoose model from the schema

module.exports = captainModel; // Export the model for use in other files



/*

                    ********* 📌Explanation of Code ********

This file defines the Mongoose schema and model for the captain collection in MongoDB. 
It also includes methods for authentication, password encryption, and validation


Feature	                             Description
Full Name	           Stored as an object (firstname, lastname) with validation.
Email	               Required, unique, and validated with regex.
Password	          Required and stored securely (hashed).
Socket ID	          Used for real-time tracking (WebSockets).
Status	            Can be 'active' or 'inactive' (default: inactive).
Vehicle Details	     Stored as an object (color, plate, capacity, vehicleType).
Location	          Stores GPS coordinates (ltd, lng).
Authentication Methods	Generate JWT token, compare passwords, and hash passwords.
                             

*/