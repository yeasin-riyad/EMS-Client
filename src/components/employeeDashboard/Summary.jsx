import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux';

const Summary = () => {
    const user = useSelector((state) => state?.user);

  return (
    <div className='rounded flex bg-gray-50 p-4 '>
        <div className={`text-3xl flex justify-center items-center bg-primary-200 text-white px-4`}>
                <FaUser/>
        </div>
        <div className='pl-4 py-1'>
            <p className="text-lg font-semibold">Welcome Back</p>
            <p className="text-xl font-bold">{user?.name}</p>
        </div>
    </div>
  )
}

export default Summary
