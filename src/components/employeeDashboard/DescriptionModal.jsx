import React from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

const DescriptionModal = ({description,close}) => {
  return (
    <div className='z-50 top-0 left-0 bottom-0 right-0 fixed bg-gray-800  flex items-center justify-center'>
      <div className='max-w-3xl bg-gray-900 text-white p-6 rounded-md'>
        <button onClick={()=>close()} className='block ml-auto text-primary-200'><IoMdCloseCircle size={23}/></button>
       <div>{description}</div>
      </div>
    </div>
  )
}

export default DescriptionModal
