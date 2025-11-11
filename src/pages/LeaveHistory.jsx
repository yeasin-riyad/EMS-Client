import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmployeeLiveHistoryTable from './EmployeeLiveHistoryTable';
import axiosSecure from '../tools/axiosSecure';
import { axiosToastError } from '../tools/axiosToastError';

const LeaveHistory = () => {
    const [searchValue,setSearchValue]=useState("")
    const {id}=useParams()
   
    const [data,setData]=useState([]);
    const fetchEmployeeLeaves=async ()=>{
      try{
        const res= await axiosSecure.get(`employee/get-leave-history/${id}`);
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
          <h3 className='text-2xl font-bold'>Leave History</h3>
        </div>
        <div className='flex justify-between items-center'>
          <input type="text" name="" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search By Leave Type' className='px-4 py-0.5 outline-primary-200' id="" />
        </div>
  
        <div className='mt-5'>
        <EmployeeLiveHistoryTable data={data} searchValue={searchValue}/>
        </div>
      </div>
    )
}

export default LeaveHistory
