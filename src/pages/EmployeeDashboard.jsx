import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../components/employeeDashboard/Navbar';
import EmployeeSidebar from '../components/employeeDashboard/EmployeeSidebar';
import { Outlet } from 'react-router-dom';

const EmployeeDashboard = () => {
  const user = useSelector((state) => state?.user);
  console.log(user,"usr......")

  return (
    <div className='flex'>
      <EmployeeSidebar id={user?._id}/>
      <div className='ml-64 w-full'>
      <Navbar/>
      <div className='mt-10'>
      <Outlet/>
      </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
