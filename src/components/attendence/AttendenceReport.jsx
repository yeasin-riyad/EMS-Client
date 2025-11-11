import React, { useEffect, useState } from "react";
import axiosSecure from "../../tools/axiosSecure";
import { axiosToastError } from "../../tools/axiosToastError";
import { Link } from "react-router-dom";

const AttendenceReport = () => {
  const today = new Date().toISOString().split("T")[0];

  const [attendenceReport, setAllAttendenceReport] = useState({});
  const [date, setDate] = useState(today);
  const getAllReport = async () => {
    try {
      const data = await axiosSecure.get(
        "/attendence/get-all-attendence-report",
        { params: { date } }
      );
      setAllAttendenceReport(data.data.data);
    } catch (e) {
      axiosToastError(e);
    }
  };
  useEffect(() => {
    getAllReport();
  }, [date]);

  console.log(attendenceReport, "Attendence Report.......");
  console.log(Object.keys(attendenceReport), "Report.........");
  return (
    <div className="mt-10 p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Attendence Report</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="date"
          name=""
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-0.5 outline-primary-200"
          id=""
        />
        <Link
          to={"/admin-dashboard/attendence"}
          className="px-4 py-1 bg-primary-200 rounded text-white"
        >
          Attendence
        </Link>
      </div>

      <div className="overflow-x-auto mt-6 border rounded-lg shadow">
        <table className="min-w-full ">
          <thead className="bg-primary-200 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                S No
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Employee ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.keys(attendenceReport).length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No attendence report available for the selected date.
                </td>
              </tr>
            ) : (
              Object.keys(attendenceReport).map((attendenceDate) => (
                <React.Fragment key={attendenceDate}>
                  {attendenceReport[attendenceDate].map((atte, i) => (
                    <tr
                      key={`${atte.employeeId}-${attendenceDate}`}
                      className="hover:bg-gray-100 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {atte.employeeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {atte.employeeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {atte.departmentName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {atte.status}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendenceReport;
