import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setRidePopupPanel(false)
      }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>

      <h3 className='text-2xl font-semibold'>Confirm this ride to start</h3>

      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-full object-cover' src='https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg' alt='image' />
          <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>

          <div className='flex items-center gap-5 p-3 border-b-1'>
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>563/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3 border-b-1'>
            <i class="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>5A, Sharang's cafe</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3 '>
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
        
        <div className='mt-6 w-full'>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <input 
              value = {otp}
              onChange={(e) => setOtp(e.target.value)}
              className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' 
              type='text' 
              placeholder='Enter OTP'/>
            <button className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
            <button onClick = {() => {
              props.setConfirmRidePopupPanel(false)
              props.setRidePopupPanel(false)
            }} className='w-full mt-2 bg-red-600 text-white text-lg font-semibold p-3 rounded-lg'>Cancel</button>
          </form>    
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp