import React, { useEffect, useState } from 'react'
import AttendenceActionButton from './AttendenceActionButton';
import DataTable from 'react-data-table-component';

const AttendenceDisplayTable = ({allAttendence,fetchAttendence}) => {
    const [modifiedAttendence,setModifiedAttendence]=useState([])
     useEffect(() => {
        if (allAttendence[0]) {
          let SI = 1;
          const modAttendence =allAttendence?.map((attendence) => ({
            _id: attendence?._id,
            SI: SI++,
            emp_name: attendence?.employeeId?.userId.name,
            emp_ID: attendence?.employeeId.employeeId,
            emp_dep: attendence?.employeeId.department.dept_name,
    
            action: <div>{attendence?.status?(attendence.status):<AttendenceActionButton id={attendence?._id} fetchAttendence={fetchAttendence}/>}</div>,
          }));
          setModifiedAttendence(modAttendence);
        }
      }, [allAttendence]);
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
          name: "Name",
          selector: (row) => row.emp_name,
          width: "120px",
          center: true,
          
        },
        {
            name:"Emp Id",
            selector:(row)=> row.emp_ID,
            width: "150px",
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
          data={modifiedAttendence}
          customStyles={customStyles}
        />
      );
}

export default AttendenceDisplayTable
