const mongoose = require('mongoose'); // Import Mongoose to define the schema

// Define the schema for blacklisted tokens
const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String, // Store the JWT token as a string
    required: true, // Token is required
    unique: true  // Ensure no duplicate blacklisted tokens exist
  },
  createdAt: {
    type: Date, // Store the timestamp when the token was blacklisted
    default: Date.now, // Automatically set the current timestamp
    expires: 86400  // Token will be automatically deleted after 24 hours (86400 seconds)
  }
});

// Export the BlacklistToken model for use in other parts of the application
module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);


/* 
                    ********* 📌Explanation of Code ********

How This Works-----------------
1. When a user logs out, their JWT is stored in this collection.
2. Before authenticating any request, the system checks if the token is in the blacklist.
3. If the token is blacklisted, access is denied (401 Unauthorized).
4. After 24 hours, the blacklisted token is automatically deleted by MongoDB.

 Why Use a Token Blacklist?++++++++++++++++++
1. Enhances security by preventing JWT reuse after logout.
2. Supports manual token revocation (e.g., force logout for security reasons).
3. Automatically clears expired tokens, reducing database clutter.
4. This is a great way to secure user authentication in a JWT-based system!

*/