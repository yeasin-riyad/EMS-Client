import React from 'react'
import {useSelector} from "react-redux";

import { Outlet } from 'react-router-dom';


const AdminDashboard = () => {

  const user = useSelector((state) => state?.user);

  console.log(user,"user.....")

  return (
    <div className='flex'>
     HI Admin
     <Outlet/>

  
    </div>
  )
}

export default AdminDashboard
