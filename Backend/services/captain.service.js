const captainModel = require('../models/captain.model');  // Import the captain model to interact with the database


// Export an asynchronous function to create a new captain
module.exports.createCaptain = async({
  firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
  
  // Validate if all required fields are provided
  if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error('All fields are required');  // If any required field is missing, throw an error
  }  
 
  // Create a new captain entry in the database
  const captain = captainModel.create({   // Use Mongoose's create() method
    fullname: {   // Store captain's name in an object
      firstname,   
      lastname
    }, 
    email,  // Store captain's email
    password,  // Store password (should be hashed before saving)
    vehicle: {  // Store vehicle details as an embedded object
      color,   // Vehicle color
      plate,   // Vehicle plate number
      capacity,  // Maximum number of passengers
      vehicleType  // Type of vehicle (e.g., Car, Bike, Auto)
    }
  });
  
  return captain;  // Return the created captain object
};



/*
                    ********* 📌Explanation of Code ********

**  Validates Input: Ensures all required fields (firstname, email, password, color, plate, capacity, vehicleType) are provided.
**  Stores Captain's Information: Includes name, email, and password.
**  Stores Vehicle Details: The vehicle information (color, plate, capacity, type) is stored as an embedded object.
**  Uses Mongoose's create() Method: Saves the data in MongoDB

*/
