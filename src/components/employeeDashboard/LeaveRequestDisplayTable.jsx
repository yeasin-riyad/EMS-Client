import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import DescriptionModal from './DescriptionModal';

const LeaveRequestDisplayTable = ({data}) => {
  const [openModal,setOpenModal]=useState(false)
  const [description,setDescription]=useState("")
  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px", // Increase header text size
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
      name: "LEAVE TYPE",
      selector: (row) => row.leaveType,
      center: true,
    },
    {
      name: "FROM",
      selector: (row) => new Date(row.FromDate).toLocaleDateString(),
      center: true,
    },
    {
      name: "TO",
      selector: (row) => new Date(row.ToDate).toLocaleDateString(),
      center: true,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => <div onClick={()=>{
        if(row.description.length>15) {
          setOpenModal(true)
        setDescription(row.description)

        }
        
      }} className={`${row.description.length>15 && "cursor-pointer"}`}>{row.description}</div>,
      center: true,
      width: "200px",
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      center: true,
      cell: (row) => {
        let bgColor = "bg-yellow-400"; // Default for Pending
  
        if (row.status === "Approved") bgColor = "bg-green-500 text-white";
        else if (row.status === "Rejected") bgColor = "bg-red-500 text-white";
  
        return (
          <span className={`px-3 py-1 rounded-md font-semibold ${bgColor}`}>
            {row.status}
          </span>
        );
      },
    },
  ];
  

  return (
    <div>
        <DataTable
      fixedHeader
      fixedHeaderScrollHeight="350px"
      pagination
      columns={columns}
      data={data}
      customStyles={customStyles}
    />

{openModal && <DescriptionModal description={description} close={()=>setOpenModal(false)}/>}
    

    </div>
  
  );

  
};


export default LeaveRequestDisplayTable
