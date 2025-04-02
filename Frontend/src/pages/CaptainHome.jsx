import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails' // Component for displaying captain's details
import RidePopUp from '../components/RidePopUp' // Component for showing ride request popup
import { useGSAP } from '@gsap/react' // Hook for integrating GSAP animations in React
import gsap from 'gsap' // GSAP for animations
import ConfirmRidePopUp  from '../components/ConfirmRidePopUp' // Component for confirming ride requests
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'


const CaptainHome = () => {
  // State to control visibility of popups
  const [ ridePopupPanel, setRidePopupPanel ] = useState(true)  // Initially, ride popup is open
  const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false) // Initially, confirm ride popup is hidden
  
  // Refs for popup panels
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    //create an interval of 10sec this will send the location of the captain to the server via socket.io use event update-location-captain
  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        socket.emit('update-location-captain', {
          userId: captain._id,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    }
  }

  const locationInterval = setInterval(updateLocation, 10000)
  updateLocation()

  // return () => clearInterval(locationInterval)
  }, [])

  socket.on('new-ride', (data) => {
    console.log(data);  
  })
  
  
  // Animation effect for RidePopUp panel
  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)' // Bring panel into view
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)' // Move panel out of view
      })
    }
  }, [ridePopupPanel]) // Runs when `ridePopupPanel` state changes

  // Animation effect for ConfirmRidePopUp panel
  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)' // Bring panel into view
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)' // Move panel out of view
      })
    }
  }, [confirmRidePopupPanel]) // Runs when `confirmRidePopupPanel` state changes

  return (
    <div className='h-screen'>
      {/* Header Section */}
      <div className='fixed p-6 top-0 flex items-center justify-between w-full '>
        {/* Logo */}
        <img className='w-16' src='https://i.pinimg.com/736x/a1/55/fa/a155fa4e9ae945f9faf0bc2430b2a140.jpg' alt='' />
        
        {/* Logout Button/Icon */}
        <Link to='/captain-home' 
          className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map Image Section */}
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://thegadgetflow.com/wp-content/uploads/2020/03/Google-Maps-vs-Google-Earth-featured.jpg" alt= "" />
      </div>

      {/* Captain Details Section */}
      <div className='h-2/5 p-6'>
        <CaptainDetails /> {/* Displays captain's information */}
      </div>

      {/* Ride Request Popup */}
      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>

      {/* Confirm Ride Popup */}
      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome

/*
ref={confirmRidePopupPanelRef}:
// This assigns a reference (ref) to the div, which allows direct access to the DOM element via useRef
// It's useful for animations (like GSAP), where you need to manipulate the div's position

<ConfirmRidePopUp />: This is a React component that displays the ride confirmation UI inside this popup
Props Passed (setConfirmRidePopupPanel & setRidePopupPanel):
setConfirmRidePopupPanel: A function that controls whether this popup is visible
setRidePopupPanel: A function that can control another popup (the ride request popup)

*/