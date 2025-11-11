import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axiosSecure from "../tools/axiosSecure";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalContextProvider";


const EditDepartmentModal = ({ close,data:SpecificDep }) => {
    const [departmentUploading,setDepartmentUploading]=useState(false)
    const [error,setError]= useState("")
      const { fetchDepartmentDetails } = useGlobalContext();
    
    const [data,setData]=useState({
        dept_name:SpecificDep?.dept_name,
        description:SpecificDep?.description
    })
    const handleValueCahnge= (e)=>{
        e.preventDefault()
        setData({
            ...data,[e.target.name]:e.target.value
        })
    }

    const handleDepartmentSubmit=async(e)=>{
        e.preventDefault()
        try{
            setDepartmentUploading(true)
            const saveDepartment= await axiosSecure.put(`department/update-department/${SpecificDep?._id}`,data)
            toast.success(saveDepartment.data.message)
            fetchDepartmentDetails()
            
            close()
        }catch(e){
            setError(e?.response?.data?.message)
        }finally{
            setDepartmentUploading(false)
        }

    }

  return (
    <div className="top-0 z-50 fixed left-0 right-0 bottom-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white w-full p-2 rounded max-w-2xl">
        <div className="flex items-center justify-between">
          <button className="text-primary-200 block ml-auto" onClick={close}>
            <IoIosCloseCircleOutline size={23} />
          </button>
        </div>

        <form onSubmit={handleDepartmentSubmit}>
            <div className="mb-3 text-red-500">
                {error}
            </div>
          <div className="flex flex-col gap-y-1  mb-3">
            <label className="font-semibold " htmlFor="dept_name">Department Name :-</label>
            <input
            onChange={handleValueCahnge}
              type="text"
              name="dept_name"
              value={data?.dept_name}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              id="dept_name"
              placeholder="Enter New Department Name"
              required
            />
          </div>
          <div>
            <div className="flex flex-col gap-y-1">
              <label className="font-semibold" htmlFor="description">Description :-</label>
              <textarea
              onChange={handleValueCahnge}
                rows={5}
                required
                value={data?.description}
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
                type="text"
                name="description"
                id="descriptionn"
                placeholder="Write Description Here"
              />
            </div>
          </div>
          <button disabled={departmentUploading }  type="submit" className="mt-4 w-full bg-primary-200 text-white font-semibold py-2 px-4 rounded disabled:cursor-not-allowed">
            Update Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartmentModal;
