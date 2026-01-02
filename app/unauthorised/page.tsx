import React from 'react'

function Unauthorised() {
  return (
    <div className='flex flex-col items-center justify-center bg-black' >
      <h1 className='text-4xl md:text-5xl text-red-500' >Access Denied</h1>
      <p>You can not access this page</p>
    </div>
  )
}

export default Unauthorised
