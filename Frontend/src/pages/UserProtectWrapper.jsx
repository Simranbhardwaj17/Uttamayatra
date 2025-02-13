import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


// This component acts as a wrapper to protect routes from unauthorized access
const UserProtectWrapper = ({ children }) => {
  //const { user } = useContext(UserDataContext) //create var
  // Instead of using/depend on user data (which resets(user get logged out) on page refresh/reload), rely on the token for authentication
  const token = localStorage.getItem('token')   // Get authentication token from localStorage
  const navigate = useNavigate()

  // useEffect runs on component mount and whenever 'token' changes
  useEffect(() => {
    if (!token) {   // If token is not found, redirect the user to the login page
      navigate('/login')
    }
  }, [token])

  // If the user is authenticated (token exists), render the protected content (children)
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper

// - This component ensures only authenticated users can access protected routes
// - If no token is found, it redirects the user to the login page
// - Helps maintain authentication persistence after page refresh
// Added protected routes using UserProtectWrapper (redirects unauthorized users)