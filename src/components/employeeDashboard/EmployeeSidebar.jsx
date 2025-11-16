import React from 'react'
import { FaTachometerAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { SlCalender } from "react-icons/sl";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';
import toast from 'react-hot-toast';
import axiosSecure from '../../tools/axiosSecure';
import { axiosToastError } from '../../tools/axiosToastError';
const EmployeeSidebar = ({id}) => {
  const ApplyLeave=window.location.pathname.includes('/employee-dashboard/apply-leave')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout = async () => {
    try {
      const response = await axiosSecure.post("user/logout");
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();

        toast.success(response.data.message);
        navigate("/login");
        // window.history.back();
      }
    } catch (e) {
      console.log(e);
      axiosToastError(e);
    }
  };
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 flex flex-col'>
      <div className='bg-primary-200 h-12 flex items-center justify-center'>
        <h3 className='text-2xl text-center font-pacifico'>Employee MS</h3>

      </div>

      <div className='flex flex-col justify-between flex-1'>
        <div className=''>
        <NavLink end className={({isActive}) =>`${isActive ?"bg-primary-200 rounded":""} flex mx-2 px-3 items-center space-x-4  py-2`} to="/employee-dashboard">
            <FaTachometerAlt/>
            <span>Dashboard</span>
        </NavLink>

        <NavLink className={({isActive}) =>`${isActive ?"bg-primary-200  rounded":""} flex mx-2 px-3 items-center space-x-4  py-2`} to={`/employee-dashboard/view-employee-profile/${id}`}>
            <FaUsers/>
            <span>My Profile</span>
        </NavLink>

        <NavLink className={({isActive}) =>`${isActive || ApplyLeave ?"bg-primary-200  rounded":""} flex mx-2 px-3 items-center space-x-4  py-2`} to={"/employee-dashboard/leaves"}>
            <FaBuilding/>
            <span>Leave</span>
        </NavLink>



        <NavLink className={({isActive}) =>`${isActive ?"bg-primary-200  rounded":""} flex mx-2 px-3 items-center space-x-4  py-2`} to="/employee-dashboard/employee-salary">
        <FaMoneyBillWave />
            <span>Salary</span>
        </NavLink>

        <NavLink className={({isActive}) =>`${isActive ?"bg-primary-200  rounded":""} flex mx-2 px-3 items-center space-x-4  py-2`} to="/employee-dashboard/setting">
        <FaCogs/>
            <span>Setting</span>
        </NavLink>
        </div>

       
            
                <button onClick={handleLogout} className='mb-4 flex items-center justify-start text-lg rounded p-2 bg-red-500 text-white mx-2 px-3 py-2 space-x-4'>
                <RiLogoutCircleLine size={23}/>
                <span>Logout</span>
            </button>
            

      </div>
    </div>
  )
}

export default EmployeeSidebar
