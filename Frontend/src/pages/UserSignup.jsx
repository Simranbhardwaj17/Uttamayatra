import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'  // Import the context

const UserSignup = () => {
  // State variables to store user input
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('') 
  const [ lastName, setLastName ] = useState('')
  const [ userData, setUserData ] = useState({}) //Stores user data (create empty obj)
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)  //pull out these 2 from UserContext(Used useContext(UserDataContext) to access user and setUser)

  // Handles form submission
  const submitHandler = async (e) => {
    e.preventDefault()  // Prevents default form reload
    // Creating a new user object
    const newUser = {
      fullname: { 
        firstname: firstName,
        lastname: lastName 
      },
      email: email,
      password: password
    } 
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home') 
    }

    // try {
    //   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    //   console.log("Response:", response.data);
    //   if (response.status === 201) {
    //     setUser(response.data.user);
    //     navigate('/home');
    //   }
    // } catch (error) {
    //   console.error("Signup Error:", error.response?.data || error.message);
    //   alert(error.response?.data?.message || "Signup failed. Please try again.");
    // }
    
    // console.log(import.meta.env.VITE_BASE_URL);


  
    // setUser(newUser) // Update user in context (Updated setUser with new user data)
    // setUserData(newUser)  // Updates state with new user data
    //console.log("User Signed Up:", newUser) // Logs directly
    // Clear input fields after submission & get in console
    setFirstName('')
    setLastName('')
    setEmail('')    
    setPassword('')
  }

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          {/* Logo */}
          <img className='w-16 mb-9 rounded' src="https://i.pinimg.com/736x/a1/55/fa/a155fa4e9ae945f9faf0bc2430b2a140.jpg" alt="Logo img" />
        
          {/* Signup Form */}
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>

            <h3 className='text-lg font-medium mb-2'>Enter your name to book a ride</h3>
            <div className='flex gap-4 mb-5'>
              <input
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                required 
                type="text" 
                value={firstName}
                placeholder='Firstname' 
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
              <input
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                required 
                type="text" 
                placeholder='Lastname'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }} 
              />
            </div>

            <h3 className='text-lg font-medium mb-2'>Enter your email</h3>
            <input
              className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              required 
              type="email" 
              placeholder='email@gmail.com' 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input 
              className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              required 
              type="password" 
              placeholder='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }} 
            />

            <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <p 
            className='text-center'>Already have a account? 
            <Link 
              to='/login' 
              className='text-blue-600'>
              Login here
            </Link>
          </p>
        </div>

        {/* Privacy Notice */}  
        <p className='text-[10px] leading-tight '>
          For safety and security of your details. Please go through the <span className='underline'>Google privacy</span> and <span className='underline'>Terms & Conditions apply</span>
        </p>
      </div>
    </div>
  )
}

export default UserSignup