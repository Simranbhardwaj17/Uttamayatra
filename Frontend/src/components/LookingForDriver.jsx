import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setVehicleFound(false)
      }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>

      <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <img className='h-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpgslkhHmZ9MvM1dVBrM9RDg-Ov-zcg23Vjg&s" alt="Car logo" />
        <div className='w-full mt-5'>

          <div className='flex items-cemter gap-5 p-3 border-b-1'>
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>563/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Sangam, Ayodhya</p>
            </div>
          </div>

          <div className='flex items-cemter gap-5 p-3 border-b-1'>
            <i class="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>5A, Sharang's cafe</h3>
              <p className='text-sm -mt-1 text-gray-600'>Sangam, Ayodhya</p>
            </div>
          </div>

          <div className='flex items-cemter gap-5 p-3 '>
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>₹180.93</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver