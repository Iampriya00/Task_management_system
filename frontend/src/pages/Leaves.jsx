import React from "react";
import SideBar from "@/components/dashboard/sideBar";
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

  // Format dates to DD/MM/YYYY
  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;
  };

  const handleStatusChange = async (e, leaveId) => {
    const newStatus = e.target.value;
    try {
      await leaveStatus(leaveId, { status: newStatus });
      toast.success("Status updated successfully");
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className=" text-lg">Loading...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="w-3/4 max-md:w-full flex-1 p-20 md:p-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl text-center font-semibold mb-4 ">
            View All Leaves
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr>
                {[
                  "Employee Name",
                  "Email",
                  "Department",
                  "Leave Type",
                  "Start Date",
                  "End Date",
                  "Reason",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left  px-6 py-4 border-b border-gray-300 text-sm sm:text-base"
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
                    key={item._id}
                    className={`cursor-pointer transition-all duration-300`}
                  >
                    <td className="px-6 py-4  border-b border-gray-300 text-xs sm:text-sm">
                      {item.userId?.username || "N/A"}
                    </td>
                    <td className="px-6 py-4  border-b border-gray-300 text-xs sm:text-sm">
                      {item.userId?.email || "N/A"}
                    </td>
                    <td className="px-6 py-4  border-b border-gray-300 text-xs sm:text-sm">
                      {item.userId?.jobtitle || "N/A"}
                    </td>
                    <td className="px-6 py-4  border-b border-gray-300 text-xs sm:text-sm">
                      {item.leavetype}
                    </td>
                    <td className="px-6 py-4  border-b border-gray-300 text-xs sm:text-sm">
                      {formatDate(item.startDate)}
                    </td>
                    <td className="px-6 py-4  border-b border-gray-300 text-xs sm:text-sm">
                      {formatDate(item.endDate)}
                    </td>
                    <td className="px-6 py-4  border-b border-gray-300 text-xs sm:text-sm">
                      {item.reason || "N/A"}
                    </td>
                    <td className="px-6 py-4  border-b border-gray-300">
                      <select
                        className="w-[115px] py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    className="px-6 py-4 text-center "
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
