import SideBar from "@/components/Dashboard/sideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { empDetails } from "@/services/authservice";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function Viewemp() {
  const { id } = useParams();
  const { data: employee } = useQuery(`empDetails/${id}`, () => empDetails(id));

  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
        <SideBar />
        <div className="flex-1 p-6 md:p-10">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
              Employee Information
            </h1>
            <div className="">
              <div className="flex items-center p-6">
                <Avatar className="size-24">
                  <AvatarImage src={employee?.profileImg} />
                  <AvatarFallback>
                    {employee?.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {employee?.username}
                  </h2>
                  <p className="text-gray-600">{employee?.jobtitle}</p>
                </div>
              </div>
              <div className="border-t border-gray-300 p-4">
                <div className="mb-3">
                  <h3 className="text-gray-800 font-medium">Email</h3>
                  <p className="text-gray-600">{employee?.email}</p>
                </div>
                <div className="mb-3">
                  <h3 className="text-gray-800 font-medium">Phone</h3>
                  <p className="text-gray-600">{employee?.phone}</p>
                </div>
                <div className="mb-3">
                  <h3 className="text-gray-800 font-medium">Salary</h3>
                  <p className="text-gray-600">{employee?.salary}</p>
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium">Role</h3>
                  <p className="text-gray-600">{employee?.role}</p>
                </div>
              </div>
              <div className="border-t border-gray-300 p-4 bg-gray-50">
                <p className="text-gray-500 text-sm">
                  Created at: {new Date(employee?.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Updated at: {new Date(employee?.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewemp;
