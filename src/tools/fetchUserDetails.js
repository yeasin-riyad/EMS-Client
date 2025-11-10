import axiosSecure from "./axiosSecure";

export const fetchUserDetails = async() =>{
    try{
        const res= await axiosSecure.get('user/get-user');
        return res?.data?.data
    }catch(e){
        console.error("Error fetching user details",e);
        throw new Error("Failed to fetch user details");

    }
}