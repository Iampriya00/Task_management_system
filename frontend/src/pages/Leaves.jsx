import SideBar from "@/components/Dashboard/sideBar";
import { fetchAllEmp } from "@/services/authservice";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom"; // Import the navigate hook

function Leaves() {
  const {
    data: empData,
    isLoading,
    isError,
    error,
  } = useQuery("allEmployee", fetchAllEmp, {
    refetchOnMount: true,
  });

  const navigate = useNavigate(); // Initialize navigate

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl text-center font-semibold mb-4 text-gray-700">
            View all Leaves
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Employee ID",
                  "Employee Image",
                  "Employee Name",
                  "Employee Email",
                  "Employee Phone",
                  "Job Title",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left text-gray-700 px-6 py-4 border-b border-gray-300"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {empData.data && empData.data.length > 0 ? (
                empData.data.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`cursor-pointer ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300">
                      {item._id}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      <img
                        src={item.profileImg}
                        alt={`Profile of ${item.username}`}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300">
                      {item.username}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300">
                      {item.phone}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300">
                      {item.jobtitle}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300">
                      <select className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-4 text-center text-gray-600"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaves;
