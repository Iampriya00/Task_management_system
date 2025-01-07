import React, { useState } from "react";
import SideBar from "@/components/Dashboard/sideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "react-query";
import { clockIn, clockOut, userDetails } from "@/services/authservice";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function UserDashboard() {
  const user = useAppSelector((state) => state.user.user);
  const { data: empData = [], isLoading } = useQuery(
    "allEmployee",
    userDetails
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleClockIn = async () => {
    return await clockIn();
  };
  const handleClockOut = async () => {
    return await clockOut();
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

        {/* Buttons for Clock In and Clock Out */}
        <div className="flex justify-center mt-4">
          <Button className="me-3" onClick={handleClockIn}>
            Clock In
          </Button>
          <Button onClick={handleClockOut}>Clock Out</Button>
        </div>

        {/* Table for Clock In/Out records */}
        <div className="mt-4">
          <table className="min-w-full border-collapse">
            <thead className="text-sky-800">
              <tr>
                <th className="border px-4 py-2">Clock In</th>
                <th className="border px-4 py-2">Clock Out</th>
              </tr>
            </thead>
            <tbody className="text-sky-500">
              <tr>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
