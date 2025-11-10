import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosPublic from "../tools/axiosPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "../components/Spinner";

const Login = () => {
  const [data,setData]=useState({
    email:"",
    password:""
  })

  const navigate=useNavigate()


  
  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();
      setError("")

      
      setLoading(true); // Start loading

      const response = await axiosPublic.post("user/login-user", data);
      console.log("Login successful:", response.data);
      localStorage.setItem("access_token", response?.data?.data?.access_token); // Store access token in local storage
      localStorage.setItem("refresh_token", response?.data?.data?.refresh_token); // Store refresh token in local storage
      //   toast.success("Registration successful!");
      // navigate("/login"); // Redirect to login after success
      if(response?.data?.data?.user.role==="employee"){
        navigate('/employee-dashboard')
      }else{
        navigate('/admin-dashboard')
      }
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChangeValue = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  return (
    <div className="flex px-2 flex-col items-center h-screen justify-center bg-gradient-to-b from-primary-200 from-50% to-gray-100 to-50% space-y-6 ">
      <h2 className="font-pacifico text-3xl text-white">
        Employee Management System
      </h2>
      <div className="border p-3   shadow sm:w-full  md:w-80 bg-white rounded">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <h2 className="mb-2 text-sm text-red-500">{error}</h2>


        <form onSubmit={onSubmitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 " htmlFor="email">
              Email
            </label>
            <input
              required
              onChange={onChangeValue}
              className="w-full px-3 py-2 border outline-gray-300"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="passowrd">
              Password
            </label>
            <div className="relative">
              <input
              onChange={onChangeValue}
              id="password"
              name="password"
                required
                className="w-full px-3 py-2 border outline-gray-300"
                type={showPassword ? "text" : "password"}
                placeholder="**********"
              />
              <span
                className="absolute top-2.5 right-3 cursor-pointer text-secondary-200"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="mb-4 flex flex-col md:flex-row  items-center justify-end">
            {/* <label htmlFor="" className="inline-flex items-center">
              <Link className="text-primary-200" to={"/register"}>
                Doesn't Registered?
              </Link>
            </label> */}

            <Link to={"/forgot-password"} className="text-primary-200">Forgot passowrd?</Link>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-primary-200 text-white py-2 rounded text-xl"
            >
              {" "}
              {loading ? <Spinner /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
