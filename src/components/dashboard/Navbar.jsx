import React from 'react'
import { useSelector } from 'react-redux';

const Navbar = () => {
      const user = useSelector((state) => state?.user);
    
  return (
    <div className='flex fixed top-0 w-full items-center text-white px-5  justify-between h-12 bg-primary-200'>
      <p>Welcome, {user?.name}</p>
      {/* <button className='px-4 py-1 bg-teal-700'>Logout</button> */}
    </div>
  )
}

export default Navbar
