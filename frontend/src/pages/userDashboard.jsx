import React from "react";
import SideBar from "@/components/Dashboard/sideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "react-query";
import { attendance, clockIn, clockOut } from "@/services/authservice";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import queryClient from "@/utils/react-query";

function UserDashboard() {
  const user = useAppSelector((state) => state.user.user);

  const {
    data: attendenceData,
    isLoading: attendenceLoading,
    isError,
  } = useQuery("attendance", attendance);

  const handleClockIn = async () => {
    await clockIn();
    queryClient.invalidateQueries(`attendance`);
  };

  const handleClockOut = async () => {
    await clockOut();
    queryClient.invalidateQueries(`attendance`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Your Information
          </h1>
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.profileImg || "/default-avatar.png"} />
              <AvatarFallback>
                {user.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              ID: <span className="text-gray-500">{user._id}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Username: <span className="text-gray-500">{user.username}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Email: <span className="text-gray-500">{user.email}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Phone: <span className="text-gray-500">{user.phone}</span>
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button className="me-3" onClick={handleClockIn}>
            Clock In
          </Button>
          <Button onClick={handleClockOut}>Clock Out</Button>
        </div>
        <div className="mt-4 overflow-auto h-[452px]">
          {/* Show loading indicator */}
          {attendenceLoading ? (
            <div>Loading attendance data...</div>
          ) : isError ? (
            <div>Error fetching attendance data</div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead className="text-sky-800">
                <tr>
                  <th className="border px-4 py-2">Clock In</th>
                  <th className="border px-4 py-2">Clock Out</th>
                </tr>
              </thead>
              <tbody className="text-sky-500">
                {attendenceData && attendenceData.length > 0 ? (
                  attendenceData.map((item, idx) => {
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
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
