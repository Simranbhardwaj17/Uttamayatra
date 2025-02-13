import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'    // Import Axios to handle HTTP requests for user authentication (login)
import { UserDataContext } from '../context/userContext'  // Import the context

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //to store user login data, so empty obj
  const [userData, setUserData] = useState({})   
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)  //pull out these 2 from UserContext(Used useContext(UserDataContext) to access user and setUser) 

  
  const submitHandler = async (e) => {   
    e.preventDefault()  // Stop default form submission behavior(bydef action(reload))
    // setUserData({
    //   email: email,
    //   password: password
    // })
    // console.log(userData)    //1 time gap(user not get login same time) (issue)
    
    {/* Fixed delayed state update in UserLogin by logging user data instantly */}
    const userData = {   // Create new user data object
      email: email,
      password: password
    }  
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if(response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home') 
    }

    // setUserData(userData)  // Update state with new user data
    //console.log(newUserData)  // Log immediately without delay
    setEmail('')    // Clear input fields after submission & get in console
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        {/* Logo */}
        <img className='w-16 mb-10 rounded' src="https://i.pinimg.com/736x/a1/55/fa/a155fa4e9ae945f9faf0bc2430b2a140.jpg" alt="Logo img" />
       
        {/* Login Form */}
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>Enter your registered email</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email" 
            placeholder='email@gmail.com' 
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input 
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password" 
            placeholder='password' 
          />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
            Login
          </button>

        </form>

        {/* Signup Link */}
        <p 
          className='text-center'>New here? 
          <Link 
            to='/signup' 
            className='text-blue-600 ml-1'>
            Create New Account
          </Link>
        </p>
      </div>

      {/* Captain Sign in Link */}
      <div>
        <Link 
          to='/captain-login' 
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin