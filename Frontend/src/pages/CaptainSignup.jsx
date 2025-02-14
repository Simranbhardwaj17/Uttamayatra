import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'  

const CaptainSignup = () => {
  const navigate = useNavigate()  //var

  // State variables to store user input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)


  // Handles form submission
  const submitHandler = async (e) => {
    e.preventDefault()  // Prevents default form reload
    // Creating a captain data object
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    //take accepted data to server using axios
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data //create var & fetch data send by server
      setCaptain(data.captain)  //in res(server docs), we get capt & token. so 1st setCaptain then set token
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    
    // Clear input fields after submission
    setFirstName('')
    setLastName('')
    setEmail('')    
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
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

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>

          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
          Create Captain Account
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