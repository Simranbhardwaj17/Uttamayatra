import React from 'react'
import axios from 'axios'   // Import Axios to make an HTTP request for captain logout  
import { useNavigate } from 'react-router-dom'  // Import useNavigate for redirecting after logout 

export const CaptainLogout = () => {
  const token = localStorage.getItem('token')    // Retrieve authentication token from local storage 
  const navigate = useNavigate()   // Hook for navigation after logout 

  // Send a logout request to the backend API with the captain's token 
  axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
    headers: {
      Authorization: `Bearer ${token}`  //send token in header(Attach token in Authorization header)
    }
  }).then((response) => {
      if (response.status === 200) {  // If logout is successful  
        localStorage.removeItem('token')   // Remove token from local storage
        navigate('/captain-login')   // Redirect captain to login page  
      }
    })

    return (
      <div>Captain get logged out</div>  // Display a simple logout message 
    )
}

export default CaptainLogout  // Export the component 