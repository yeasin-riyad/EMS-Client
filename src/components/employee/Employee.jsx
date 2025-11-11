import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeDisplayTable from './EmployeeDisplayTable'

const Employee = () => {
    const [searchValue,setSearchValue]=useState("")
  return (
    <div className='mt-10 p-5'>
       <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" name="" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search By Employee Name' className='px-4 py-0.5 outline-primary-200' id="" />
        <Link to={"/admin-dashboard/add-employee"}  className='px-4 py-1 bg-primary-200 rounded text-white'>Add New Employee</Link>
      </div>

      <div className='mt-5'>
      <EmployeeDisplayTable searchValue={searchValue}/>
      </div>
    </div>
  )
}

export default Employee
