import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosToastError } from '../../tools/axiosToastError'
import axiosSecure from '../../tools/axiosSecure'

const AttendenceActionButton = ({id,fetchAttendence}) => {

    const markAttendence= async(status,id)=>{
      
        try{
            await axiosSecure.put(`/attendence/update-attendence/${id}`,{status,checkInTime:new Date().toTimeString()})
            fetchAttendence()

        }catch(e){
            axiosToastError(e)
        }

    }
 

    
  
  return (
    <div>
        <div className='flex items-center gap-x-3'>
        <button onClick={()=>markAttendence("Present",id)}   className='bg-primary-200 text-white p-3 rounded'>Present</button>

        <button onClick={()=>markAttendence("Absent",id)} className='bg-red-500 text-white p-3 rounded'>Absent</button>
        <button onClick={()=>markAttendence("Late",id)} className='bg-yellow-500 text-white p-3 rounded'>Late</button>


      <button onClick={()=>markAttendence("Leave",id)}   className='bg-blue-500 text-white p-3 rounded'>Leave</button>

    </div>


   

    
    </div>
  )
}

export default AttendenceActionButton
