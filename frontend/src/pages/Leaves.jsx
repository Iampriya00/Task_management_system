import SideBar from "@/components/Dashboard/sideBar";
import React from "react";
import { useQuery } from "react-query";
import { leaveStatus, viewAllLeave } from "@/services/authservice";
import { toast } from "sonner";

function Leaves() {
  const {
    data: empData,
    isLoading,
    isError,
    error,
  } = useQuery("viewAllLeave", viewAllLeave, {
    refetchOnMount: true,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">Error: {error.message}</p>
      </div>
    );
  }

  // Function to format dates
  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // Handle status change
  const handleStatusChange = async (e, leaveId) => {
    const newStatus = e.target.value;

    try {
      await leaveStatus(leaveId, { status: newStatus });
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error updating status:", error);
    }
  };

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
                  "Employee Image",
                  "Employee Name",
                  "Employee Department",
                  "Leave Type",
                  "Start Date",
                  "End Date",
                  "Reason",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left text-gray-700 px-6 py-4 border-b border-gray-300 text-sm sm:text-base"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {empData?.length > 0 ? (
                empData.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`cursor-pointer ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition-all duration-300`}
                  >
                    <td className="px-6 py-4 border-b border-gray-300">
                      <img
                        src={item.profileImg}
                        alt={`Profile of ${item.username}`}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300 text-xs sm:text-sm">
                      {item.username}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300 text-xs sm:text-sm">
                      {item.jobtitle}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300 text-xs sm:text-sm">
                      {item.leavetype}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300 text-xs sm:text-sm">
                      {formatDate(item.startDate)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300 text-xs sm:text-sm">
                      {formatDate(item.endDate)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300 text-xs sm:text-sm">
                      {item.reason}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-300">
                      <select
                        className="w-[115px] py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={item.status}
                        onChange={(e) => handleStatusChange(e, item._id)}
                      >
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
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-600"
                  >
                    No leaves found
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
