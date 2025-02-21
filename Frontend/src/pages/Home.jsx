import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)  //for naming the div
  const panelCloseRef = useRef(null)

  const submitHandler = () => {
    e.preventDefault()
  }

  useGSAP(function () {
    if(panelOpen) {
      gsap.to(panelRef.current, {
        height:'70%',
        padding: 24
      })
      gsap.to(panelCloseRef.current, {
        opacity:1
      })
    } else {
      gsap.to(panelRef.current, {
        height:'0%',
        padding: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity:0
      })
    }
  }, [panelOpen])


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://i.pinimg.com/736x/a1/55/fa/a155fa4e9ae945f9faf0bc2430b2a140.jpg" alt= "" />
      <div className='h-screen w-screen'>
      <img className='h-full w-full object-cover' src="https://thegadgetflow.com/wp-content/uploads/2020/03/Google-Maps-vs-Google-Earth-featured.jpg" alt= "" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={ panelCloseRef }    //ref used to select ele
          onClick={() => {
            setPanelOpen(false)
          }}  
          className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full'></div>
            <input 
            onClick= {()=> {
              setPanelOpen(true)
            }}
            value = {pickup}
            onChange={(e) => {
              setPickup(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' 
            type ="text" 
            placeholder='Add a pick-up location' /> 
            <input 
            onClick= {()=> {
              setPanelOpen(true)
            }}
            value = {destination}
            onChange={(e) => {
              setDestination(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' 
            type ="text" 
            placeholder='Enter your destination' /> 
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel />
        </div>
      </div>
      <div className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8'>
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-9' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpgslkhHmZ9MvM1dVBrM9RDg-Ov-zcg23Vjg&s" alt="Car logo" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-sm'>UttamayatraCab <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>180.93</h2>
        </div>

        <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>active:
          <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxja_AqY5-rWAAJbRkku-5g97ipzp2OgMuaA&s" alt="Motorcycle logo" />
          <div className='-ml-7 w-1/2'>
            <h4 className='font-medium text-sm'>Motorcycle <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
          </div> 
          <h2 className='text-lg font-semibold'>50</h2>
        </div>

        <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyDyAJoUD2zBBgcNTZLUnFTWM_PJlC1ieUPQ&s" alt="Taxi logo" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-sm'>UttamayatraAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className='font-medium text-sm'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>110.23</h2>
        </div>

      </div>
    </div>
  )
} 

export default Home