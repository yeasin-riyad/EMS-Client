import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosPublic from "../../tools/axiosPublic";
import { axiosToastError } from "../../tools/axiosToastError";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";


const Setting = () => {
      const user = useSelector((state) => state?.user);
    
  const [data, setData] = useState({
    OldPassword:"",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword,setShowOldPassword]=useState(false)
  const [loading, setLoading] = useState(false); // Loading state
  

  const navigate = useNavigate();



  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();

      if (data?.password !== data?.confirmPassword ){
        setError("Password dit not match") 
        return
      } 
      setLoading(true); // Start loading

       await axiosPublic.put("user/update-password", {
        OldPassword:data.OldPassword,
        NewPassword:data.password,
        ConfirmNewPassword:data.confirmPassword,
        email:user?.email
      });
      if(user?.role=="admin"){
        navigate("admin-dashboard"); // Redirect to dashboard after success
      }else{
        navigate('employee-dashboard')
      }
      
    } catch (error) {
      setError(error?.response?.data?.message)
    } finally {
      setLoading(false);
    }
  };

  const onChangeValue = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className=" flex flex-col px-2 items-center min-h-screen justify-center bg-gradient-to-b from-primary-200 from-50% to-gray-100 to-50% space-y-4 ">
      <h2 className="font-pacifico text-2xl md:text-3xl text-white">
        Update Password
      </h2>
      <div className="border p-3   shadow sm:w-full  md:w-80 bg-white rounded">
        {/* <h2 className="text-2xl font-bold mb-2">Update Password</h2> */}
        <h2 className="mb-2 text-sm text-red-500">{error}</h2>

        <form onSubmit={onSubmitForm}>
        
        <div className="mb-2">
            <label className="block text-gray-700" htmlFor="OldPassword">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                onChange={onChangeValue}
                required
                className="w-full px-3 py-2 border outline-gray-300"
                name="OldPassword"
                id="OldPassword"
                placeholder="**********"
              />
              <span
                className="absolute top-2.5 right-3 cursor-pointer text-secondary-200"
                onClick={() => {
                  setShowOldPassword((prev) => !prev);
                }}
              >
                {showOldPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>


          <div className="mb-2">
            <label className="block text-gray-700" htmlFor="password">
             New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={onChangeValue}
                required
                className="w-full px-3 py-2 border outline-gray-300"
                name="password"
                id="password"
                placeholder="**********"
              />
              <span
                className="absolute top-2.5 right-3 cursor-pointer text-secondary-200"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-gray-700" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                onChange={onChangeValue}
                required
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-3 py-2 border outline-gray-300"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="**********"
              />
              <span
                className="absolute top-2.5 right-3 cursor-pointer text-secondary-200"
                onClick={() => {
                  setShowConfirmPassword((prev) => !prev);
                }}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

           <div className="mb-4 flex flex-col md:flex-row  items-center justify-between">
                      
          
                      <Link to={"/forgot-password"} className="text-primary-200">Forgot passowrd?</Link>
                    </div>

      

          <div className="mb-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 flex items-center justify-center text-white py-2 rounded"
            >
              {loading ? <Spinner /> : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;

