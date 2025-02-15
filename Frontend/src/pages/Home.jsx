import React from 'react'

const Home = () => {
  return (
    <div className='h-screen relative'>
      <img className='w-16 absolute left-5 top-5' src="https://i.pinimg.com/736x/a1/55/fa/a155fa4e9ae945f9faf0bc2430b2a140.jpg" alt= "" />
      <div className='h-screen w-width'>
      <img className='h-full w-full object-cover' src="https://thegadgetflow.com/wp-content/uploads/2020/03/Google-Maps-vs-Google-Earth-featured.jpg" alt= "" />
      </div>
      <div className='bg-white absolute top-0'>
        <h4>Find a trip</h4>
        <form>
          <input type ="text" placeholder='Add a pick-up location' /> 
          <input type ="text" placeholder='Enter your destination' /> 
        </form>
      </div>
    </div>
  )
} 

export default Home