import SideBar from "@/components/dashboard/sideBar";
import { adminViewAttendence } from "@/services/authservice";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function ViewAttendence() {
  const { id } = useParams();
  const {
    data: attendanceData,
    isLoading,
    isError,
  } = useQuery(`adminViewAttendence/${id}`, () => adminViewAttendence(id));
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-3/4 flex flex-col h-screen overflow-hidden max-md:w-full">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
            Timing of Employee
          </h1>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Show loading indicator */}
          {isLoading ? (
            <div className="flex justify-center items-center h-full text-xl text-gray-500">
              Loading attendance data...
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-full text-xl text-red-500">
              Error fetching attendance data
            </div>
          ) : (
            <div className="overflow-auto">
              <table className="min-w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-sky-800 text-white">
                  <tr>
                    <th className="border px-4 py-2 text-center">Clock In</th>
                    <th className="border px-4 py-2 text-center">Clock Out</th>
                  </tr>
                </thead>
                <tbody className="text-sky-600">
                  {attendanceData && attendanceData.length > 0 ? (
                    attendanceData.map((item, idx) => {
                      // Formatting Clock In and Clock Out
                      const clockInFormatted =
                        new Date(item.clockIn).toLocaleDateString("en-GB") +
                        " " +
                        new Date(item.clockIn).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        });

                      const clockOutFormatted = item.clockOut
                        ? new Date(item.clockOut).toLocaleDateString("en-GB") +
                          " " +
                          new Date(item.clockOut).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })
                        : "Still clocked in";

                      return (
                        <tr key={idx}>
                          <td className="border px-4 py-2 text-center">
                            {clockInFormatted}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {clockOutFormatted}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        className="border px-4 py-2 text-center text-red-500"
                      >
                        No attendance data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAttendence;
