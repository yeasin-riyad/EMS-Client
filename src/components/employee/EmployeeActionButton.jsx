import React from 'react'
import { useState } from 'react'
import ViewEmployeeModal from './viewEmployeeModal'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import EditEmployeeModal from './EditEmployeeModal'
import { useNavigate } from 'react-router-dom'

const EmployeeActionButton = ({id}) => {
  const [openViewEmployeeModal,setOpenViewEmployeeModal]=useState(false)
  const [openEmployeeEdit,setOpenEmployeeEdit]=useState(false)
     const [data,setData]=useState({})
      const employees = useSelector((state) => state?.employee.employees);
      const navigate=useNavigate()

      useEffect(()=>{
             const specificeEmp= employees.find((emp)=>(
                  emp._id ===id
              ))
              setData(specificeEmp)
          },[employees])
  
  return (
    <div>
        <div className='flex items-center gap-x-3'>
        <button onClick={()=>setOpenViewEmployeeModal(true)}  className='bg-primary-200 text-white p-3 rounded'>View</button>


      <button onClick={()=>setOpenEmployeeEdit(true)}  className='bg-blue-500 text-white p-3 rounded'>Edit</button>
      <button onClick={()=>{
        navigate(`/admin-dashboard/salary-history/${id}`)
      }}  className='bg-yellow-500 text-white p-3 rounded'>Salary</button>

      <button onClick={()=>{
        navigate(`/admin-dashboard/leave-history/${id}`)
      }} className='bg-red-500 text-white p-3 rounded'>Leave</button>
    </div>


    {openViewEmployeeModal && <ViewEmployeeModal data={data} close={()=>setOpenViewEmployeeModal(false)}/>}
      {openEmployeeEdit && <EditEmployeeModal employee={data} close={()=>setOpenEmployeeEdit(false)}/>}

    
    </div>
  )
}

export default EmployeeActionButton
