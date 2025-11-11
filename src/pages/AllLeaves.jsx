import React, { useEffect, useState } from 'react'
import axiosSecure from '../tools/axiosSecure'
import LeavesDisplayTable from './LeavesDisplayTable'

const AllLeaves = () => {
    const [data,setData]=useState([])
    const [searchValue,setSearchValue]=useState("")
    const [status,setStatus]=useState("")
  const fetchAllLeaves =async ()=>{
       const response= await axiosSecure.get('employee/getAll-leaves',{
        params:{searchValue,status}
       });
        if (response?.data?.data) {
              let SI = 1;
              const modData = response?.data?.data.map((leave) => (
                {...leave,SI:SI++}
              ));
              setData(modData)
            }
        
       
    }
    useEffect(()=>{
        fetchAllLeaves()
    },[status,searchValue])

    console.log("data..",data)
  return (
    <div className='p-5 mt-10'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Leaves</h3>
      </div>

      <div className='flex justify-between items-center'>
        <input type="text" name="" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search By Employee Name' className='px-4 py-0.5 outline-primary-200' id="" />
        <div className='flex gap-x-2'>
        <button onClick={()=>setStatus("")}  className='px-4 py-1 bg-primary-200 rounded text-white'>All</button>

        <button onClick={()=>setStatus("Pending")}  className='px-4 py-1 bg-primary-200 rounded text-white'>Pending</button>
        <button onClick={()=>setStatus("Approved")}  className='px-4 py-1 bg-primary-200 rounded text-white'>Approved</button>
        <button onClick={()=>setStatus("Rejected")}  className='px-4 py-1 bg-primary-200 rounded text-white'>Rejected</button>
        </div>
      </div>

     <div className='mt-5'>
     <LeavesDisplayTable data={data} fetchAllLeaves={fetchAllLeaves}/>
     </div>
    </div>
  )
}

export default AllLeaves
