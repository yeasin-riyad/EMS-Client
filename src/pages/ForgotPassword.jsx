import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosPublic from "../tools/axiosPublic";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";

const ForgotPassword= () => {
    const user = useSelector((state) => state?.user);
  
    const [email,setEmail]=useState(user?.email)
    const [error,setError]=useState("")
    const navigate=useNavigate();



  
  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();
      setError("")

      
      setLoading(true); // Start loading

      const response = await axiosPublic.post("user/forgot-password",{email});
        if(response?.data.success){
          navigate("/verify-otp", { state: { email } });

        }
     
      //   toast.success("Registration successful!");
      // navigate("/login"); // Redirect to login after success
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };


  const [loading,setLoading]=useState(false)
  return (
    <div className="flex px-2 flex-col items-center h-screen justify-center bg-gradient-to-b from-primary-200 from-50% to-gray-100 to-50% space-y-6 ">
      <h2 className="font-pacifico text-3xl text-white">
        Employee Management System
      </h2>
      <h2 className="mb-2 text-sm text-red-500">{error}</h2>

      <div className="border p-3   shadow sm:w-full  md:w-80 bg-white rounded">


        <form onSubmit={onSubmitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 " htmlFor="email">
            Enter Your Email Here
            </label>
            <input
              required
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-3 py-2 border outline-gray-300"
              type="email"
              value={email ?email :""}
              id="email"
              name="email"
              placeholder="Enter Email"
            />
          </div>


          <div className="mb-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-primary-200 text-white py-2 rounded"
            >
              {" "}
              {loading ? <Spinner /> : "Send OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
