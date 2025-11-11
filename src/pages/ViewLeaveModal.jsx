import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import DescriptionModal from "../components/employeeDashboard/DescriptionModal";
import axiosSecure from "../tools/axiosSecure";
import { axiosToastError } from "../tools/axiosToastError";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ViewLeaveModal = ({ data, close,fetchAllLeaves }) => {
  const navigate=useNavigate()
  const [description,setDescription]=useState("")
  const [openDescriptionModal,setOpenDescriptionModal]=useState(false)
 
  const updateStatus=async(id,status)=>{
    try{
     
      const res=await axiosSecure.put('employee/update-status',{status,id})
      toast.success(res.data.message)
      fetchAllLeaves()
      close()
    }catch(e){
      axiosToastError(e)
    }

  }
  return (
    <div className="top-0 left-0 right-0 z-50 bottom-0 fixed bg-gray-900  flex items-center justify-center">
      <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-md shadow-md">
        <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold  text-center">
          View Details
        </h2>
        <IoIosClose onClick={close} size={26} className="text-primary-200 hover:cursor-pointer"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <div className="w-48 h-48 rounded-full p-2 border  border-primary-200 shadow-md">
            <img className="rounded-full object-cover w-full h-full" src={data?.employeeId?.userId?.profileImage} />
          </div>
          <div>
            <div className="flex space-x-3 mb-1 items-center">
              <p className="text-lg font-bold">Name:</p>
              <p className="font-medium">{data?.employeeId.userId?.name}</p>
            </div>

            <div className="flex space-x-3 mb-1 items-center">
              <p className="text-lg font-bold">Employee ID: </p>
              <p className="font-medium">{data?.employeeId?.employeeId}</p>
            </div>

             <div className="flex space-x-3 mb-1 items-center">
              <p className="text-lg font-bold">Leave Type: </p>
              <p className="font-medium">{data?.leaveType}</p>
            </div>

             <div className="flex space-x-3 mb-1 items-center">
              <p className="text-lg font-bold">Reason: </p>
              <p className={`font-medium  clamp-2-lines ${data?.description?.length>15 ? "hover:cursor-pointer":""} `} onClick={()=>{
                if(data?.description?.length>15){
                    setDescription(data?.description)
                setOpenDescriptionModal(true)
                }
              }}>{data?.description}</p>
            </div>

            <div className="flex space-x-3 mb-1 items-center">
              <p className="text-lg font-bold">Department: </p>
              <p className="font-medium">{data?.employeeId?.department?.dept_name}</p>
            </div>

            

            <div className="flex space-x-3 mb-1 items-center">
              <p className="text-lg font-bold">Start Date: </p>
              <p className="font-medium">{new Date(data?.FromDate).toLocaleDateString()}</p>
            </div>

            <div className="flex space-x-3 mb-1 items-center">
              <p className="text-lg font-bold">End Date: </p>
              <p className="font-medium">{new Date(data?.ToDate).toLocaleDateString()}</p>
            </div>

            <div className="flex space-x-3 mb-1 items-center">
              <p className="text-lg font-bold">Action: </p>
              <p className="font-medium">{data?.status==="Pending"?<div className="flex gap-x-2">
                <button onClick={()=>{
                 
                  updateStatus(data?._id,"Approved")
                }} className="bg-primary-200 text-white p-1 rounded">Approve</button>

                <button onClick={()=>{
                  updateStatus(data?._id,"Rejected")
                }} className="bg-red-500 text-white p-1 rounded">Reject</button>
              </div>:<>{data?.status}</>}</p>
            </div>

           
          </div>
        </div>
      </div>
      {openDescriptionModal && <DescriptionModal description={description} close={()=>setOpenDescriptionModal(false)}/>}
    </div>
  );
};

export default ViewLeaveModal;

