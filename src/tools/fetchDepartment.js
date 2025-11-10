import axiosSecure from "./axiosSecure";

export const fetchDepartment = async(searchValue) =>{
    try{
        const res= await axiosSecure.get('department/get-department',{params:{searchValue}});
        return res?.data?.data
    }catch(e){
        console.error("Error fetching user details",e);
        throw new Error("Failed to fetch user details");

    }
}