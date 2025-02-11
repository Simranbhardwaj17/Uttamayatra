import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='relative min-h-screen'>
        {/* Background Image */}
        <div className='absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url(https://images.stockcake.com/public/8/d/7/8d752f61-3a2d-4b3e-aadc-8167a741b613_large/city-traffic-lights-stockcake.jpg)]'></div>

        {/* Content */}
        <div className='relative z-10 pt-8 flex flex-col justify-between w-full min-h-screen'>
          <img className='w-16 ml-8 rounded' src="https://i.pinimg.com/736x/a1/55/fa/a155fa4e9ae945f9faf0bc2430b2a140.jpg" alt="Logo img" />
          <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-3xl font-bold'>Get started with Uttamayatra</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home