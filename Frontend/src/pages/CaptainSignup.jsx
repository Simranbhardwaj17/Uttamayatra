import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  // State variables to store user input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({}) //Stores user data (create obj)

  // Handles form submission
  const submitHandler = (e) => {
    e.preventDefault()  // Prevents default form reload

    // Creating a new user object
    const newUser = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    }
    
    setUserData(newUser) // Updates state
    //console.log("User Signed Up:", newUser) // Logs directly

    // Clear input fields after submission & get in console
    setFirstName('')
    setLastName('')
    setEmail('')    
    setPassword('')
  }

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        {/* Logo */}
        <img className='w-16 mb-9 rounded' src="https://i.pinimg.com/736x/a1/55/fa/a155fa4e9ae945f9faf0bc2430b2a140.jpg" alt="Logo img" />
      
        {/* Signup Form */}
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-lg font-medium mb-2'>Join our team! What’s your name?</h3>
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
            to='/captain-login' 
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
  )
}

export default CaptainSignup