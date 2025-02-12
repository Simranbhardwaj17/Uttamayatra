import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState('');    

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();    // Prevent default form submission behavior(bydef action(reload))
    // setCaptainData({
    //   email: email,  
    //   password: password
    // })
    // console.log(captainData);    //1 time gap(captain not get login same time) (issue)
    
    {/* Fixed delayed state update in UserLogin by logging captain data instantly */}
    const newCaptainData = { email, password };  // Create new captain data object
    setCaptainData(newCaptainData);  // Update state with new captain data
    //console.log(newCaptainData);  // Log immediately without delay (fixes delayed state update issue)
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

        {/* Captain Registration Link */}
        <p 
          className='text-center'>Ready to join our fleet? 
          <Link 
            to='/captain-signup' 
            className='text-blue-600 ml-1'>
            Register as a Captain
          </Link>
        </p>
      </div>

      {/* User Sign-in Link */}
      <div>
        <Link 
          to='/login' 
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin;