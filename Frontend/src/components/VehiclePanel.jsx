import React from 'react'

export const VehiclePanel = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=> {
        props.setVehiclePanel(false)
      }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
      }} className='flex border-1 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
        <img className='h-9' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpgslkhHmZ9MvM1dVBrM9RDg-Ov-zcg23Vjg&s" alt="Car logo" />
        <div className='ml-1 w-1/2'>
          <h4 className='font-medium text-base'>UttamayatraCab <span><i className="ri-user-3-fill"></i>4</span></h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹180.93</h2>
      </div>

      <div onClick={() => {
        props.setConfirmRidePanel(true)
      }} className='flex border-1 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
        <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxja_AqY5-rWAAJbRkku-5g97ipzp2OgMuaA&s" alt="Motorcycle logo" />
        <div className='-ml-7 w-1/2'>
          <h4 className='font-medium text-base'>Motorcycle <span><i className="ri-user-3-fill"></i>1</span></h4>
          <h5 className='font-medium text-sm'>3 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
        </div> 
        <h2 className='text-lg font-semibold'>₹50</h2>
      </div>

      <div onClick={() => {
        props.setConfirmRidePanel(true)
      }} className='flex border-1 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
        <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyDyAJoUD2zBBgcNTZLUnFTWM_PJlC1ieUPQ&s" alt="Taxi logo" />
        <div className='ml-2 w-1/2'>
          <h4 className='font-medium text-base'>UttamayatraAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
          <h5 className='font-medium text-sm'>3 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable auto rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹110.23</h2>
      </div>
    </div>
  )
}

export default VehiclePanel