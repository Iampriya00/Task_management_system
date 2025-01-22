import React from "react";
import SideBar from "@/components/Dashboard/sideBar";
import { useAppSelector } from "@/store/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AdminDashboard() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="flex ">
      <SideBar />
      <div className="min-md:w-3/4 flex h-screen max-md:w-full">
        <div className="p-20 w-full ">
          <h1 className="text-2xl mb-6 text-center font-semibold">
            Use Your Information
          </h1>
          <div className="flex justify-center mb-3">
            <Avatar>
              <AvatarImage src={user.profileImg} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
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
        <div></div>
      </div>
    </div>
  );
}

export default AdminDashboard;
