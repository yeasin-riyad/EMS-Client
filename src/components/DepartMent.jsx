import React, { useState } from 'react'
import AddNewDepartmentModal from './AddNewDepartmentModal'
import DepartmentDisplayTable from './DepartmentDisplayTable'

const DepartMent = () => {
  const [openAddDepartment,setOpenAddDepartment]=useState(false)
  const [searchValue,setSearchValue]=useState("")
  
 

  return (
    <div className='p-5 mt-10'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" name="" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search By Dept Name' className='px-4 py-0.5 outline-primary-200' id="" />
        <button onClick={()=>setOpenAddDepartment(true)}  className='px-4 py-1 bg-primary-200 rounded text-white'>Add New Department</button>
      </div>


      <div className='mt-5'>
        <DepartmentDisplayTable searchValue={searchValue}/>
      </div>

      {openAddDepartment && <AddNewDepartmentModal close={()=>setOpenAddDepartment(false)}/>}
    </div>
  )
}

export default DepartMent
