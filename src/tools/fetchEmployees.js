import axiosSecure from "./axiosSecure";

export const fetchEmployees = async(searchValue) =>{
    try{
        const res= await axiosSecure.get('employee/get-employee',{params:{searchValue}});
        return res?.data?.data
    }catch(e){
        console.error("Error fetching user details",e);
        throw new Error("Failed to fetch user details");

    }
}