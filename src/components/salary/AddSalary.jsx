import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaCloudUploadAlt } from "react-icons/fa";
import axiosSecure from "../../tools/axiosSecure";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosToastError } from "../../tools/axiosToastError";
import { MdDelete } from "react-icons/md";
import { useGlobalContext } from "../../provider/GlobalContextProvider";

const AddSalary = () => {
  const { fetchEmployeeDetails } = useGlobalContext();
  const [modifiedEmployees, setModifiedEmployees] = useState([]);
 
  const departments = useSelector((state) => state?.department.departments);
  const employees = useSelector((state) => state?.employee?.employees);

  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState({
    employeeId: "",
    payDate: "",
    department: "",
    basicSalary:0,
    allowances:0,
    deductions:0
  });

  const navigate = useNavigate();
  const handleDataChange = (e) => {
    e.preventDefault();
    setDisabled(false);
  
    if (e.target.name === "department") {
      setData((prevData) => ({
        ...prevData,
        basicSalary: 0,
        department: e.target.value,
        employeeId: "", // নতুন ডিপার্টমেন্ট সিলেক্ট করলে employeeId রিসেট হবে
      }));
      setModifiedEmployees(employees.filter((emp) => emp.department._id === e.target.value));
    }
    else if (e.target.name === "employeeId") {
      const empSalary = employees.find((emp) => emp?._id === e.target.value);
      setData((prevData) => ({
        ...prevData,
        employeeId: e.target.value,
        basicSalary: empSalary?.salary || 0,
      }));
    }else{

      setData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));

    }
    
  
   
  };
  


  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      setDisabled(true);
      console.log(data,"data.......")

     
      
      
      const saveSalary = await axiosSecure.post(
        "salary/add-salary",
        data
      );
      if (saveSalary?.data?.success) {
        // navigate("/admin-dashboard/employees");
        // fetchEmployeeDetails();
      }
    } catch (e) {
      console.log(e, "error.........");
      axiosToastError(e);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="mt-16 p-5 max-w-4xl mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Pay Salary</h2>
      <form onSubmit={handleSubmitForm}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Department</option>
              {departments.map((dep) => {
                return (
                  <option key={dep._id} value={dep?._id}>
                    {dep?.dept_name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Employee ID */}
          <div>
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-gray-700"
            >
              Employee ID
            </label>
            <select
              required
              name="employeeId"
              id="employeeId"
              onChange={handleDataChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Employee Id</option>
              {modifiedEmployees.map((emp) => {
                return (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Salary*/}
          <div>
            <label
              htmlFor="basicSalary"
              className="block text-sm font-medium text-gray-700"
            >
              Basic Salary
            </label>
            <input
              onChange={handleDataChange}
              type="number"
              name="basicSalary"
              disabled
              value={data.basicSalary}
              id="basicSalary"
              placeholder="Basic Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Allowances*/}
          <div>
            <label
              htmlFor="allowances"
              className="block text-sm font-medium text-gray-700"
            >
              Allowances
            </label>
            <input
              onChange={handleDataChange}
              type="number"
              name="allowances"
              id="allowances"
              placeholder="Allowances"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Deductions*/}
          <div>
            <label
              htmlFor="deductions"
              className="block text-sm font-medium text-gray-700"
            >
              Deductions
            </label>
            <input
              onChange={handleDataChange}
              type="number"
              name="deductions"
              id="deductions"
              placeholder="Deductions"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Pay Date */}
          <div>
            <label
              htmlFor="payDate"
              className="block text-sm font-medium text-gray-700"
            >
              Pay Date
            </label>
            <input
              onChange={handleDataChange}
              type="date"
              name="payDate"
              id="payDate"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
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
          Pay Salary
        </button>
      </form>
    </div>
  );
};

export default AddSalary;
