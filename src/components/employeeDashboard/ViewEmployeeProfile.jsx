import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosToastError } from '../../tools/axiosToastError'
import axiosSecure from '../../tools/axiosSecure'
const ViewEmployeeProfile = () => {
    const [data,setData]=useState({})
    const {id}=useParams()
    const fetchEmployee=async ()=>{
        try{
            const employee= await axiosSecure.get(`employee/get-singleEmployee/${id}`)
            if(employee?.data.success){
                setData(employee?.data.data)
            }

        }catch(e){
            axiosToastError(e)
        }
    }
    useEffect(()=>{
        fetchEmployee()
    },[id])

    if(!data){
        return <div>Loading......</div>
    }


    return (
        <div className="min-h-screen flex items-center justify-center ">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-center w-full">
                My Profile
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="w-40 h-40 rounded-full p-2 border border-primary-200 shadow-md">
                <img src={data?.userId?.profileImage} alt="Employee" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <div className="flex space-x-3 mb-5 items-center">
                  <p className="text-lg font-bold">Name:</p>
                  <p className="font-medium">{data?.userId?.name}</p>
                </div>
      
                <div className="flex space-x-3 mb-5 items-center">
                  <p className="text-lg font-bold">Employee ID: </p>
                  <p className="font-medium">{data?.employeeId}</p>
                </div>
      
                <div className="flex space-x-3 mb-5 items-center">
                  <p className="text-lg font-bold">Date Of Birth: </p>
                  <p className="font-medium">{new Date(data?.DOB).toLocaleDateString()}</p>
                </div>
      
                <div className="flex space-x-3 mb-5 items-center">
                  <p className="text-lg font-bold">Department: </p>
                  <p className="font-medium">{data?.department?.dept_name}</p>
                </div>
      
                <div className="flex space-x-3 mb-5 items-center">
                  <p className="text-lg font-bold">Marital Status: </p>
                  <p className="font-medium text-lg">{data?.maritalStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default ViewEmployeeProfile
