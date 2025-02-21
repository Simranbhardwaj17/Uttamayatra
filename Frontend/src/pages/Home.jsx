import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const panelRef = useRef(null)  //for naming the div
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)  //open when u click on location(in LSP)

  const submitHandler = () => {
    e.preventDefault()
  }

  useGSAP(function () {
    if (panelOpen) {
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


  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel]) //pass value as depemdency


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
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />   //data pass in this way
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14'>
        <VehiclePanel setVehiclePanel={setVehiclePanel} />
      </div>
    </div>
  )
} 

export default Home