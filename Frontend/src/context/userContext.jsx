import React, { createContext, useState } from 'react';

// Create a context for user data
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  // State to store user details
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    }
  });

  return (
    // Provide user data and update function to the entire app (use obj)
    <UserDataContext.Provider value={{ user, setUser }}> 
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
