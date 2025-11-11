import React from 'react'
import {useSelector} from "react-redux";
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';


const AdminDashboard = () => {

  const user = useSelector((state) => state?.user);

  console.log(user,"user.....")

  return (
    <div className='flex'>
     <AdminSidebar/>
     <div className='flex-1 ml-64 '>
     <Navbar/>
     <Outlet/>

     </div>
    </div>
  )
}

export default AdminDashboard
