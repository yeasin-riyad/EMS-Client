import DataTable from "react-data-table-component";

const SalaryDisplayTable = ({ salary }) => {
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
      name: "Basic Salary",
      selector: (row) => row.employeeId.salary,
      center:true
    },
    {
      name: "Allowance",
      selector: (row) => row.allowances,
      center:true
    },
    {
      name: "Deduction",
      selector: (row) => row.deductions,
      center:true
    },
    {
      name: "Total",
      selector: (row) => row.netSalary,
      center:true
    },
    {
      name: "Pay Date",
      selector: (row) => new Date(row.payDate).toLocaleDateString(),
      center:true
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={salary}
      fixedHeader
      fixedHeaderScrollHeight="350px"
      pagination
      customStyles={customStyles}
    />
  );
};

export default SalaryDisplayTable;
