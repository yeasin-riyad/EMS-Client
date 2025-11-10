import toast from "react-hot-toast";

export const axiosToastError=(error)=>{
    console.log(error?.response?.data?.message )
    toast.error(error?.response?.data?.message || error.message);

}