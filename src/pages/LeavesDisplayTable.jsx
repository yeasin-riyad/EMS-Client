import { useState } from "react";
import DataTable from "react-data-table-component";
import ViewLeaveModal from "./ViewLeaveModal";

const LeavesDisplayTable = ({ data ,fetchAllLeaves}) => {
  const [viewLeave,setViewLeave]=useState({})
  const [openViewModal,setOpenViewModal]=useState(false)

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
      name: "SN",
      selector: (row) => row.SI,
      center:true
    },
    {
      name: "EMP ID",
      selector: (row) => row.employeeId.employeeId,
      center:true
    },
    {
        name:"NAME",
        selector:(row)=> row.employeeId.userId.name,
        center:true

    },
    {
        name:"LEAVE TYPE",
        selector:(row)=> row.leaveType,
        center:true
    },
    {
        name:"DEPARTMENT",
        selector:(row)=>row.employeeId.department.dept_name,
        center:true
    },
    {
        name: "DAYS",
        selector: (row) => (
            <div>
                {Math.ceil((new Date(row.ToDate).getTime() - new Date(row.FromDate).getTime()) / (1000 * 60 * 60 * 24))}
            </div>
        ),
        center:true
    },
    {
        name:"STATUS",
        selector:(row)=>{
          // Default for Pending
          let bg_color= "bg-yellow-500"  

          if(row.status==="Approved") bg_color="bg-primary-200 text-white"
          if(row.status==="Rejected") bg_color="bg-red-500  text-white"


          return <div className={`px-2 py-2 rounded-md font-semibold ${bg_color}`}>{row.status}</div>
        },
        center:true
    },
    {
        name:"ACTION",
        center:true,
        selector:(row)=><button onClick={()=>view(row?._id)} className="py-2 px-3 rounded-sm bg-primary-200 text-white">View</button>
    }
    
  

 

  ];

  const view=async(id)=>{
   const element= data.find((leave)=>(
      leave._id===id
    ))
    setViewLeave(element)
    setOpenViewModal(true)

  }
  return (
    <div>
      <DataTable
      columns={columns}
      data={data}
      fixedHeader
      fixedHeaderScrollHeight="350px"
      pagination
      customStyles={customStyles}
    />
    {openViewModal && <ViewLeaveModal data={viewLeave} fetchAllLeaves={fetchAllLeaves} close={()=>setOpenViewModal(false)}/>}
    </div>
  );
};

export default LeavesDisplayTable;
