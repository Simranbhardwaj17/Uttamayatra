import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'    // Import CaptainDataContext to manage captain authentication
import { useNavigate } from 'react-router-dom'
import axios from 'axios'    // Import Axios for API requests


// This component acts as a wrapper to protect routes from unauthorized access
const UserProtectWrapper = ({ children }) => {
  // Instead of using/depend on captain data (which resets(captain get logged out) on page refresh/reload), rely on the token for authentication
  const token = localStorage.getItem('token')   // Retrieve authentication token from localStorage
  const navigate = useNavigate()   // Hook for navigation
  const { captain, setCaptain } = useContext(CaptainDataContext)   // Get captain data and setter function from context
  const [ isLoading, setIsLoading ] = useState(true)   // State variable to track loading state (default: true)

  // useEffect runs on component mount and whenever 'token' changes
  useEffect(() => {
    if (!token) {   // If token is not found, redirect the captain to the login page
      navigate('/captain-login')
    }
  }, [token])    // Dependency array ensures this runs when 'token' changes


  // Fetch captain profile data from backend API using stored token
  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
    headers: {
      Authorization: `Bearer ${token}`   // Send token in the Authorization header
    }
  }).then(response => {
    if (response.status === 200) {   // If request is successful
      setCaptain(response.data.captain)    // Update captain state with profile data
      setIsLoading(false)    // Set loading to false after data is fetched
    }
  })
    .catch (err => {  // Handle errors (e.g., expired/invalid token)
      console.log(err)   // Log the error for debugging
      localStorage.removeItem('token')  // Remove invalid token from localStorage
      navigate('/captain-login')  // Redirect captain to login page
    }) 

  if (isLoading) {
    return (
      <div>Loading...</div>   // Display a loading message while fetching data
    )
  }

  // If the captain is authenticated (token exists), render the protected content (children)
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper

// - This component ensures only authenticated captains can access protected routes
// - It first checks for a token in localStorage; if none exists, it redirects to the login page
// - It then fetches captain data from the backend and updates the context
// - If an error occurs (e.g., invalid/expired token), the token is removed, and the user is redirected
// - While data is being fetched, a "Loading..." message is displayed
// - Once authenticated, the protected route's content (children) is rendered

// Displays loading state: Prevents showing protected content before authentication is verified
// Uses Context API: Manages captain authentication globally