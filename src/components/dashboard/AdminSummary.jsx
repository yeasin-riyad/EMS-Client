import React, { useEffect, useState } from 'react'
import SummaryCard from '../SummaryCard'
import {  FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import { axiosToastError } from '../../tools/axiosToastError'
import axiosSecure from '../../tools/axiosSecure'
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const AdminSummary = () => {
  const [summary,setSummary]=useState({})
  const fetchSummary=async ()=>{
    try{
      const data= await axiosSecure.get('summary/get-summary')
      setSummary(data?.data)
      console.log(data?.data)

    }catch(e){
      axiosToastError(e)
    }

  }
  useEffect(()=>{
    fetchSummary()
  },[])
  return (
    <div className='p-6 mt-7'>
      <h3 className='text-2xl font-bold text-center py-2'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-6'>
        <SummaryCard icon={<FaUsers/>} text={"Total Employees"} number={summary?.totalEmployees} color="bg-primary-200"/>
        <SummaryCard icon={<FaBuilding/>} text={"Total Departments"} number={summary?.totalDepartments} color="bg-yellow-600"/>
        <SummaryCard icon={<FaMoneyBillWave/>} text={"Monthly Salary"} number={"৳"+summary?.totalSalaries} color="bg-red-600"/>



      </div>

      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <SummaryCard icon={<FaFileAlt/>} text={"Leave Applied"} number={summary?.leaveSummary?.employeeAppliedForLeave.length} color="bg-primary-200"/>
        <SummaryCard icon={<FaCheckCircle/>} text={"Leave Approved"} number={summary?.leaveSummary?.approved} color="bg-green-600"/>
        <SummaryCard icon={<FaHourglassHalf/>} text={"Leave Pending"} number={summary?.leaveSummary?.pending} color="bg-yellow-600"/>

        <SummaryCard icon={<FaTimesCircle/>} text={"Leave Rejected"} number={summary?.leaveSummary?.rejected} color="bg-red-600"/>



        </div>

      </div>
    </div>
  )
}

export default AdminSummary
