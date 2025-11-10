import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { fetchUserDetails } from "../tools/fetchUserDetails";
import { setDepartments, setLoadingDepartments } from "../store/departmentSlice";
import { axiosToastError } from "../tools/axiosToastError";
import { fetchDepartment } from "../tools/fetchDepartment";
import { setEmployees, setLoadingEmployees } from "../store/employeeSlice";
import { fetchEmployees } from "../tools/fetchEmployees";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }) => {
  const [userIsLoading, setUserIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    setUserIsLoading(true);
    try {
      const user = await fetchUserDetails();
      dispatch(setUser(user));
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(setUser(null)); // Clear user if needed
    } finally {
      setUserIsLoading(false);
    }
  };


  // Fetch Department Details
  const fetchDepartmentDetails=async (searchValue)=>{
    try{
      dispatch(setLoadingDepartments(true))
      const departments= await fetchDepartment(searchValue)
      dispatch(setDepartments(departments))
    }catch(e){
      console.error(e)
    }finally{
      dispatch(setLoadingDepartments(false))

    }
  }

  // Fetch Employee Details
  const fetchEmployeeDetails=async (searchValue)=>{
    try{
      dispatch(setLoadingEmployees(true))
      const employees= await fetchEmployees(searchValue)
      dispatch(setEmployees(employees))
    }catch(e){
      // axiosToastError(e)
      console.error(e)
    }finally{
      dispatch(setLoadingEmployees(false))

    }
  }

  useEffect(() => {
    fetchUser();
    fetchDepartmentDetails()
    fetchEmployeeDetails()
  }, []);

  return (
    <GlobalContext.Provider value={{ userIsLoading,fetchDepartmentDetails,fetchEmployeeDetails}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
