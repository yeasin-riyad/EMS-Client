import React from "react";
import { useState } from "react";
import axiosSecure from "../../tools/axiosSecure";
import { axiosToastError } from "../../tools/axiosToastError";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaCloudUploadAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useGlobalContext } from "../../provider/GlobalContextProvider";

const EditEmployeeModal = ({ employee, close }) => {
  const departments = useSelector((state) => state?.department.departments);
  const { fetchEmployeeDetails } = useGlobalContext();

  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState({
    userId: employee?.userId?._id,
    name: employee?.userId?.name,
    email: employee?.userId?.email,
    employeeId: employee?.employeeId,
    DOB: employee?.DOB,
    gender: employee?.gender,
    maritalStatus: employee?.maritalStatus,
    designation: employee?.designation,
    department: employee?.department?._id,
    salary: employee?.salary,

    role: employee?.userId?.role,
    imagePreview: employee?.userId.profileImage,
    image: employee?.userId.profileImage,
  });
  // const [showPassword, setShowPassword] = useState(false);
  const handleDataChange = (e) => {
    e.preventDefault();
    setDisabled(false);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      setDisabled(true);
      if (!data.image) {
        return setError("Image is required");
      }

      // Create a form data object to send the Employee profile image along with the other data.
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const updateEmployee = await axiosSecure.put(
        "employee/update-employee",
        formData
      );
      if (updateEmployee?.data?.success) {
        close();
        fetchEmployeeDetails();
      }
    } catch (e) {
      console.log(e, "error.........");
      axiosToastError(e);
    } finally {
      setDisabled(false);
    }
  };

  const handleProductImage = (e) => {
    e.preventDefault();
    setDisabled(false);
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setData({
      ...data,
      [e.target.name]: file,
      imagePreview: url,
    });
    setError("");
  };
  return (
    <div className="top-0  overflow-y-scroll inset-0 left-0 right-0  z-50 bottom-0 fixed  bg-gray-900  flex items-center justify-center bg-opacity-80">
      <div className="mt-24 p-5 max-w-4xl mx-auto bg-white rounded-md shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold ">Update Employee</h2>
          <IoIosClose
            onClick={close}
            size={26}
            className="text-primary-200 hover:cursor-pointer"
          />
        </div>

        <form onSubmit={handleSubmitForm}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Employee Name
              </label>
              <input
                type="text"
                onChange={handleDataChange}
                name="name"
                id="name"
                value={data?.name}
                placeholder="insert employee name"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Employee Email
              </label>
              <input
                onChange={handleDataChange}
                type="email"
                value={data?.email}
                name="email"
                id="email"
                placeholder="insert employee email"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Employee ID */}
            <div>
              <label
                htmlFor="employeeId"
                className="block text-sm font-medium text-gray-700"
              >
                Employee ID
              </label>
              <input
                onChange={handleDataChange}
                type="text"
                value={data.employeeId}
                name="employeeId"
                id="employeeId"
                placeholder="Insert Employee Id"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Employee DOB */}
            <div>
              <label
                htmlFor="DOB"
                className="block text-sm font-medium text-gray-700"
              >
                Date Of Birth
              </label>
              <input
                onChange={handleDataChange}
                type="date"
                value={data.DOB ? data.DOB.split("T")[0] : ""}
                name="DOB"
                id="DOB"
                placeholder="Insert Employee DOB"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Employee Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                onChange={handleDataChange}
                name="gender"
                value={data.gender}
                id="gender"
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option disabled value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Marital Status */}
            <div>
              <label
                htmlFor="maritalStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Marital Status
              </label>
              <select
                onChange={handleDataChange}
                name="maritalStatus"
                id="maritalStatus"
                value={data.maritalStatus}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option disabled value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            {/* Designation */}
            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-gray-700"
              >
                Designation
              </label>
              <input
                onChange={handleDataChange}
                type="text"
                name="designation"
                value={data.designation}
                id="designation"
                placeholder="Insert Employee Designation"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Select Department*/}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <select
                onChange={handleDataChange}
                name="department"
                id="department"
                value={data.department}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option disabled value="">Select Department</option>
                {departments.map((dep) => {
                  return <option value={dep?._id}>{dep?.dept_name}</option>;
                })}
              </select>
            </div>

            {/* Salary*/}
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                onChange={handleDataChange}
                type="number"
                disabled
                value={data.salary}
                name="salary"
                id="salary"
                placeholder="insert employee Salary"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Password*/}
            {/* <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password 
                  </label>
                  <div className="flex items-center">
                  <input
                  onChange={handleDataChange}
                    type={showPassword ? "text":"password"}
                    name="password"
                    id="password"
                    placeholder="*********"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                  />
                  <span onClick={()=>setShowPassword(!showPassword)} className="-ml-7">{showPassword ? <FaEye/> :<FaEyeSlash/>}</span>
                  </div>
                
                </div> */}

            {/* Role*/}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                onChange={handleDataChange}
                name="role"
                id="role"
                value={data.role}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option disabled value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* employee profile image*/}
            <div>
              <label
                htmlFor="image"
                className="block  text-sm font-medium text-gray-700"
              >
                <div className="mb-2">
                  Upload Image <span className="text-red-500">***</span>
                </div>
                <div className="flex flex-col items-center justify-center h-20 border rounded">
                  {data?.imagePreview ? (
                    <div className="flex items-center  relative">
                      <img
                        src={data.imagePreview}
                        alt="Employee Image"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div
                        onClick={() => {
                          return setData({
                            ...data,
                            imagePreview: null,
                            image: "",
                          });
                        }}
                        className="absolute top-0 right-0 hover:text-primary-200"
                      >
                        <MdDelete />
                      </div>
                    </div>
                  ) : (
                    <>
                      <FaCloudUploadAlt size={35} />
                      <p>Select Employee Image</p>

                      <input
                        type="file"
                        onChange={handleProductImage}
                        name="image"
                        value={data.image}
                        id="image"
                        accept="image/*"
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
          <div className="text-red-500 text-xl">{error}</div>
          <button
            disabled={disabled}
            type="submit"
            className={`w-full text-lg hover:text-xl mt-6 font-bold py-2 px-4 rounded 
    ${
      disabled
        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
        : "bg-primary-200 text-white"
    }`}
          >
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
