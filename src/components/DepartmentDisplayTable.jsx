import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActionButton from "./ActionButton";
import { useGlobalContext } from "../provider/GlobalContextProvider";

const DepartmentDisplayTable = ({ searchValue }) => {
  const [modifiedDepartments, setModifiedDepartments] = useState([]);
  const { fetchDepartmentDetails } = useGlobalContext();
  const departments = useSelector((state) => state?.department.departments);

  useEffect(() => {
    if (departments) {
      let SI = 1;
      const modDepartmens = departments.map((dept) => ({
        _id: dept?._id,
        SI: SI++,
        dept_name: dept?.dept_name,
        action: <ActionButton id={dept?._id} />,
      }));
      setModifiedDepartments(modDepartmens);
    }
  }, [departments]);

  useEffect(() => {
    fetchDepartmentDetails(searchValue);
  }, [searchValue]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md max-h-[400px]">
      <table className="min-w-full divide-y divide-gray-200 relative">
        <thead className="bg-gray-100  sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3  font-bold text-gray-700  text-center">SI</th>
            <th className="px-4 py-3  font-bold text-gray-700  text-center">DEPT_NAME</th>
            <th className="px-4 py-3  font-bold text-gray-700  text-center">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 ">
          {modifiedDepartments?.map((row) => (
            <tr key={row._id} className="hover:bg-gray-100 ">
              <td className="px-4 py-1 text-center   ">{row.SI}</td>
              <td className="px-4 py-1 text-center  ">{row.dept_name}</td>
              <td className="px-4 py-1 "><div className="flex justify-center">{row.action}</div></td>
            </tr>
          ))}
          {modifiedDepartments.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4 ">
                No departments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentDisplayTable;
