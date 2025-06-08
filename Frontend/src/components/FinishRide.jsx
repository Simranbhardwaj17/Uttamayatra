import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
  
  const navigate = useNavigate()

  async function endRide() {
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId: props.ride._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.status === 200) {
      navigate('/captain-home')
    }

  }
  
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setFinishRidePanel(false)
      }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>

      <h3 className='text-2xl font-semibold'>Finish this ride</h3>

      <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-full object-cover' src='https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg' alt='image' />
          <h4 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h4>
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
        
        <div className='mt-10 w-full'>
          <button 
            onClick={endRide}
            className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>
            Finish Ride
          </button>             
        </div>
      </div>
    </div>
  )
}

export default FinishRide