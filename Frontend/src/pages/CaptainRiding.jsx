import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)

  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])

  return (
    <div className='h-screen relative'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-full '>
        <img className='w-16' src='https://i.pinimg.com/736x/a1/55/fa/a155fa4e9ae945f9faf0bc2430b2a140.jpg' alt='' />
        <Link to ='/captain-home' 
          className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-3xl font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-4/5'>
        <img className='h-full w-full object-cover' src="https://thegadgetflow.com/wp-content/uploads/2020/03/Google-Maps-vs-Google-Earth-featured.jpg" alt= "" />
      </div>

      <div className='h-1/5 p-6 flex items-center justify-between relative pt-10 bg-yellow-400'
      onClick = {() => {
        setFinishRidePanel(true)
      }}>
        <h5 className='p-1 text-center w-[95%] absolute top-0'>
        <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className='text-xl font-semibold'>4 KM away</h4> 
        <button className='bg-green-500 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
      </div>

      <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding