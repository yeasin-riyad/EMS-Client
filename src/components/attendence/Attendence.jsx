import React, { useEffect, useState } from 'react'
import axiosSecure from '../../tools/axiosSecure'
import { axiosToastError } from '../../tools/axiosToastError'
import AttendenceDisplayTable from './AttendenceDisplayTable'
import { Link } from 'react-router-dom'

const Attendence = () => {
    const [allAttendence,setAllAttendence]=useState([])
    const [searchValue,setSearchValue]=useState("")
    const fetchAttendence= async ()=>{
        try{
            const attendence= await axiosSecure.get('/attendence/get-all-attendence')
        setAllAttendence(attendence.data.data)
        }catch(e){
            axiosToastError(e)
        }
    }
    useEffect(()=>{
        fetchAttendence()
    },[])

    console.log(allAttendence,"Attat")
    return (
        <div className='mt-10 p-5'>
           <div className='text-center'>
           <p className='text-2xl font-bold '>Attendence For :- "{new Date().toISOString().split("T")[0]}"</p>

          </div>
          <div className='flex justify-between items-center my-5'>
            <input type="text" name="" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search By Employee Name' className='px-4 py-0.5 outline-primary-200' id="" />
            <Link to={"/admin-dashboard/attendence-report"}  className='px-4 py-1 bg-primary-200 rounded text-white'>Attendence Report</Link>
          </div>
    
          <div className='mt-5'>
          <AttendenceDisplayTable searchValue={searchValue} allAttendence={allAttendence} fetchAttendence={fetchAttendence}/>
          </div>
        </div>
      )
}

export default Attendence
