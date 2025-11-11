import React from "react";
import { IoIosClose } from "react-icons/io";

const ViewEmployeeModal = ({ data, close }) => {
  console.log(data, "dataaa.......");
  return (
    <div className="top-0 left-0 right-0 z-50 bottom-0 fixed bg-gray-900  flex items-center justify-center">
      <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-md shadow-md">
        <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold  text-center">
          Employee Details
        </h2>
        <IoIosClose onClick={close} size={26} className="text-primary-200 hover:cursor-pointer"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="w-40 h-40 rounded-full p-2 border  border-primary-200 shadow-md">
            <img className="w-full h-full rounded-full object-cover" src={data?.userId.profileImage} />
          </div>
          <div>
            <div className="flex space-x-3 mb-5 items-center">
              <p className="text-lg font-bold">Name:</p>
              <p className="font-medium">{data?.userId?.name}</p>
            </div>

            <div className="flex space-x-3 mb-5 items-center">
              <p className="text-lg font-bold">Employee ID: </p>
              <p className="font-medium">{data?.employeeId}</p>
            </div>

            <div className="flex space-x-3 mb-5 items-center">
              <p className="text-lg font-bold">Date Of Birth: </p>
              <p className="font-medium">{new Date(data?.DOB).toLocaleDateString()}</p>
            </div>

            <div className="flex space-x-3 mb-5 items-center">
              <p className="text-lg font-bold">Department: </p>
              <p className="font-medium">{data?.department.dept_name}</p>
            </div>

            <div className="flex space-x-3 mb-5 items-center">
              <p className="text-lg font-bold">Marital Status: </p>
              <p className="font-medium text-lg">{data?.maritalStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeModal;
