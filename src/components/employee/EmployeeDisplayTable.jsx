import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import EmployeeActionButton from "./EmployeeActionButton";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useGlobalContext } from "../../provider/GlobalContextProvider";

const EmployeeDisplayTable = ({searchValue}) => {
  const [modifiedEmployees, setModifiedEmployees] = useState([]);
  const { fetchEmployeeDetails } = useGlobalContext();
  const employees = useSelector((state) => state?.employee?.employees);

  useEffect(() => {
    if (employees[0]) {
      let SI = 1;
      const modEmployees = employees?.map((emp) => ({
        _id: emp?._id,
        SI: SI++,
        emp_name: emp?.userId.name,
        emp_img: emp?.userId.profileImage,
        emp_dob: emp?.DOB,
        emp_dep: emp.department.dept_name,

        action: <EmployeeActionButton id={emp?._id} />,
      }));
      setModifiedEmployees(modEmployees);
    }
  }, [employees]);

  useEffect(()=>{

    fetchEmployeeDetails(searchValue);

  },[searchValue])
  const customStyles = {
    headCells: {
      style: {
        fontSize: "18px", // Increase header text size
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        fontSize: "16px", // Increase row text size
        fontWeight:"semibold"
      },
    },
  };

  const columns = [
    {
      name: "SI NO.",
      selector: (row) => row.SI,
      width: "100px",
      center: true, // Centers text automatically
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.emp_img}
          className="w-10 h-10 rounded-full "
          alt="Employee"
        />
      ),
      width: "120px",
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.emp_name,
      width: "120px",
      center: true,
      
    },
    {
      name: "DOB",
      cell: (row) => (
        <span className="">
          {new Date(row.emp_dob).toLocaleDateString()}
        </span>
      ),
      width: "120px",
      center: true,
  
  
    },
    {
      name: "Department",
      selector: (row) => row.emp_dep,
      width: "150px",
      center: true,
    },
    {
      name: "Action",
      selector: (row) =>row.action,
      center:true
    },
  ];
  

  return (
    <DataTable
      fixedHeader
      fixedHeaderScrollHeight="350px"
      pagination
      columns={columns}
      data={modifiedEmployees}
      customStyles={customStyles}
    />
  );
};

export default EmployeeDisplayTable;
