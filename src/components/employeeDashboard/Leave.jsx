import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosSecure from '../../tools/axiosSecure';
import { axiosToastError } from '../../tools/axiosToastError';
import LeaveRequestDisplayTable from './LeaveRequestDisplayTable';

const Leave = () => {
    const [searchValue,setSearchValue]=useState("")
    const [data,setData]=useState([]);
    const fetchEmployeeLeaves=async ()=>{
      try{
        const res= await axiosSecure.get('employee/get-leave');
        setData(res?.data?.data)

      }catch(e){
        axiosToastError(e)
      }
     
    }

    useEffect(()=>{
      fetchEmployeeLeaves()
    },[])


    return (
      <div className='mt-10 p-5'>
         <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        </div>
        <div className='flex justify-between items-center'>
          <input type="text" name="" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search By Employee Name' className='px-4 py-0.5 outline-primary-200' id="" />
          <Link to={"/employee-dashboard/apply-leave"}  className='px-4 py-1 bg-primary-200 rounded text-white'>Add New Leave</Link>
        </div>
  
        <div className='mt-5'>
        <LeaveRequestDisplayTable data={data} searchValue={searchValue}/>
        </div>
      </div>
    )
}

export default Leave
