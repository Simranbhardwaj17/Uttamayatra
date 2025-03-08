import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


// This component acts as a wrapper to protect routes from unauthorized access
const UserProtectWrapper = ({ children }) => {
  //const { user } = useContext(UserDataContext) //create var
  // Instead of using/depend on user data (which resets(user get logged out) on page refresh/reload), rely on the token for authentication
  const token = localStorage.getItem('token')   // Get authentication token from localStorage
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)
  const [ isLoading, setIsLoading ] = useState(true)

  // useEffect runs on component mount and whenever 'token' changes
  useEffect(() => {
    if (!token) {   // If token is not found, redirect the user to the login page
      navigate('/login')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
        setUser(response.data)
        setIsLoading(false)
      }
    })
      .catch (err => {
        console.log(err)
        localStorage.removeItem('token')
        navigate('/login')       
      })
  }, [token])

  if (isLoading) {
    return (
      <div>Loading...</div> //if L ret Load..
    )
  }

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