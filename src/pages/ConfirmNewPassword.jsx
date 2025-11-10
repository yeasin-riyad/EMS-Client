import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosPublic from "../tools/axiosPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { axiosToastError } from "../tools/axiosToastError";

const ConfirmNewPassword = () => {
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const location=useLocation()
  const email=location?.state?.email;
  const success= location?.state?.data;

   console.log(email,success,"Hi....")

  const navigate = useNavigate();

  useEffect(()=>{
    if(!(email && success)){
      navigate('forgot-password')
    }

  },[email,success,navigate])

  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();

      if (data?.password !== data?.confirmPassword ){
        setError("Password dit not match") 
        return
      } 
      setLoading(true); // Start loading

       await axiosPublic.put("user/update-password", {
        NewPassword:data.password,
        ConfirmNewPassword:data.confirmPassword,
        email
      });
      //   toast.success("Registration successful!");
      navigate("/login"); // Redirect to login after success
    } catch (error) {
      axiosToastError(error)
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
        Employee Management System
      </h2>
      <div className="border p-3   shadow sm:w-full  md:w-80 bg-white rounded">
        <h2 className="text-2xl font-bold mb-2">Enter New Password</h2>
        <h2 className="mb-2 text-sm text-red-500">{error}</h2>

        <form onSubmit={onSubmitForm}>
        


          <div className="mb-2">
            <label className="block text-gray-700" htmlFor="password">
              Password
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
              Confirm Password
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

export default ConfirmNewPassword;
