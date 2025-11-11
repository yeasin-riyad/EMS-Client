import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosSecure from '../../tools/axiosSecure'
import { axiosToastError } from '../../tools/axiosToastError'
import SalaryDisplayTable from './SalaryDisplayTable'

const SalaryHistory = () => {
    const [salary,setSalary]=useState([])
    const [searchValue,setSearchValue]=useState("")
    const {id}=useParams()
    useEffect(()=>{
        const getEmpSalary= async()=>{
            try{
                const empSalary=await axiosSecure.get(`salary/get-salary/${id}`)
            if(empSalary.data.success){
                let SI=1;
               const modifiedSalary= empSalary.data.data.map((emp)=>{
                return (
                    {...emp,SI:SI++}

                )
               })
               setSalary(modifiedSalary)
            }
            }catch(e){
                axiosToastError(e)
            }
        
        }

        getEmpSalary()

    },[id])


    
  return (
    <div className='mt-10 p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Salary History</h3>
      </div>
      <div className='flex justify-end items-center'>
        <input type="text" name="" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search By Employee Id' className='px-4 py-0.5 outline-primary-200' id="" />
      </div>

      <div className='mt-5'>
      <SalaryDisplayTable salary={salary}/>
      </div>
    </div>
  )
}

export default SalaryHistory
