import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import EditDepartmentModal from './EditDepartmentModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import axiosSecure from '../tools/axiosSecure';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/GlobalContextProvider';
import { axiosToastError } from '../tools/axiosToastError';

const ActionButton = ({id}) => {
    const [openDepartmentEdit,setOpenDepartmentEdit]=useState(false)
    const [openDeleteConfirm,setOpenDeleteConfirm]=useState(false)
    const [data,setData]=useState({})
    const departments = useSelector((state) => state?.department.departments);
   const { fetchDepartmentDetails } = useGlobalContext();
      
    const specificeDep= async()=>{
      try{
        const response= await axiosSecure.get(`department/get-employee-department/${id}`)
        setData(response?.data?.data)
      }catch(err){
        axiosToastError(err)
      }

    }

    useEffect(()=>{
      //  const specificeDep= departments.find((dept)=>(
      //       dept._id ===id
      //   ))
      //   setData(specificeDep)
      specificeDep()
    
    },[departments])

   
  const confirm=async()=>{
    try{
     const response = await axiosSecure.delete(`department/delete-department/${id}`);
     
            if(response.data.success){
     toast.success(response?.data?.message)
     fetchDepartmentDetails()
    //  dispatch(removeSubCategory(selectedSubCategoryId));
     
     setOpenDeleteConfirm(false)
    }
    }catch(err){
     axiosToastError(err)
     setOpenDeleteConfirm(false)
     
    }
 }


  return (
    <div>
        <div className='flex items-center gap-x-3'>
      <button onClick={()=>setOpenDepartmentEdit(true)} className='bg-primary-200 text-white p-2 rounded'>Edit</button>
      <button onClick={()=>setOpenDeleteConfirm(true)} className='bg-red-500 text-white p-2 rounded'>Delete</button>
    </div>

    {openDepartmentEdit && <EditDepartmentModal data={data} close={()=>setOpenDepartmentEdit(false)}/>}
        {openDeleteConfirm && <DeleteConfirmModal close={()=>setOpenDeleteConfirm(false)} confirm={confirm}/>}
    </div>
  )
}

export default ActionButton
