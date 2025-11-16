import React, { useState } from 'react'
import axiosSecure from '../../tools/axiosSecure'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const ApplyLeaveForm = () => {
  const [data,setData]=useState({
    leaveType:"",
    FromDate:"",
    ToDate:"",
    description:""

  })
    const [disabled,setDisabled]=useState(false)
    const [error,setError]=useState(false)


    const navigate=useNavigate()
    const handleDataChange=(e)=>{
        e.preventDefault()
        setError("")
        setData({
          ...data,[e.target.name]:e.target.value
        })
    }

    const handleSubmitForm=async (e)=>{
      e.preventDefault()
      setError("")

       try{
        setDisabled(true)
        const response= await axiosSecure.post('employee/leave-request',data)
        toast.success(response.data.message)
        navigate("/employee-dashboard/leaves")
        
       }catch(e){
        setError(e.response?.data?.message)
       }finally{
        setDisabled(false)
       }

    }
  return (
      <div className="mt-16 p-5 max-w-4xl mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Request For Leave</h2>
        <form onSubmit={handleSubmitForm}>
          <div className="flex flex-col gap-4">

             {/* Leave Type */}
             <div>
              <label
                htmlFor="leaveType"
                className="block mb-1  font-semibold"
              >
                Leave Type
              </label>
              <select
                onChange={handleDataChange}
                name="leaveType"
                id="leaveType"
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>

  
           <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>

             {/* From Date*/}
             <div>
              <label
                htmlFor="FromDate"
                className="block font-semibold mb-1"
              >
                From Date
              </label>
              <input
                onChange={handleDataChange}
                type="date"
                name="FromDate"
                id="FromDate"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            {/* To Date*/}
            <div>
              <label
                htmlFor="ToDate"
                className="block font-semibold mb-1"
              >
                To Date
              </label>
              <input
                onChange={handleDataChange}
                type="date"
                name="ToDate"
                id="ToDate"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

           </div>

            {/* Add Description */}        
            <div>
              <label className="font-semibold block mb-1" htmlFor="description">Description </label>
              <textarea
              onChange={handleDataChange}
                rows={5}
                required
                className="bg-blue-50 block w-full grid-flow-row p-2 outline-none border  rounded resize-none"
                type="text"
                name="description"
                id="descriptionn"
                placeholder="Write Description Here"
              />
            </div>
  
          </div>
          <div className="text-red-500 text-xl">{error}</div>
          <button
            disabled={disabled}
            type="submit"
            className={`w-full text-lg hover:text-xl mt-6 font-bold py-2 px-4 rounded 
      ${
        disabled
          ? "bg-gray-500 text-gray-300 cursor-not-allowed"
          : "bg-primary-200 text-white"
      }`}
          >
            Send Request
          </button>
        </form>
      </div>
    );
}

export default ApplyLeaveForm
