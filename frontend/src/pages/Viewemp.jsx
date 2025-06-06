import SideBar from "@/components/dashboard/sideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { empDetails, viewTask } from "@/services/authservice";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

function ViewEmp() {
  const { id } = useParams();
  const { data: employee } = useQuery(`empDetails/${id}`, () => empDetails(id));
  const { data: task } = useQuery(`viewTask/${id}`, () => viewTask(id));

  return (
    <div>
      <div className="flex min-h-screen">
        <SideBar />
        <div className="w-3/4 flex-1 p-6 max-md:w-full">
          <div className="max-w-6xl mx-auto shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">
              Employee Information
            </h1>
            <div className="flex items-center justify-between p-6">
              <div>
                <Avatar className="size-24">
                  <AvatarImage src={employee?.profileImg} />
                  <AvatarFallback>
                    {employee?.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">
                    {employee?.username}
                  </h2>
                  <p>{employee?.jobtitle}</p>
                </div>
              </div>
              <div className="text-slate-50">
                <Link to={`/adminuseredit/${id}`}>
                  <FaEdit />
                </Link>
              </div>
            </div>
            <div className="flex border-y border-gray-300 justify-between">
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-medium">Email</h3>
                  <p className="">{employee?.email}</p>
                </div>
                <div className="mb-3">
                  <h3 className="font-medium">Phone</h3>
                  <p className="">{employee?.phone}</p>
                </div>
                <div className="mb-3">
                  <h3 className="font-medium">Salary</h3>
                  <p className="">{employee?.salary}</p>
                </div>
                <div>
                  <h3 className="font-medium">Role</h3>
                  <p className="">{employee?.role}</p>
                </div>
              </div>
              <div className="border-gray-300 p-4">
                <p className=" text-sm">
                  Created at: {new Date(employee?.createdAt).toLocaleString()}
                </p>
                <p className="text-sm">
                  Updated at: {new Date(employee?.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="overflow-auto h-[390px]">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-100 text-slate-700">
                  <tr>
                    <th className="px-4 py-2 border-b text-left">
                      Task Details
                    </th>
                    <th className="px-4 py-2 border-b text-left">Project</th>
                    <th className="px-4 py-2 border-b text-left">
                      Create Date
                    </th>
                    <th className="px-4 py-2 border-b text-left">Due Date</th>
                    <th className="px-4 py-2 border-b text-left">Assign To</th>
                    <th className="px-4 py-2 border-b text-left">Assign By</th>
                    <th className="px-4 py-2 border-b text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {task?.tasks && task.tasks.length > 0 ? (
                    task.tasks.map((task, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 border-b">
                          {task.taskdetails}
                        </td>
                        <td className="px-4 py-2 border-b">{task.project}</td>
                        <td className="px-4 py-2 border-b">
                          {task?.datecreate}
                        </td>
                        <td className="px-4 py-2 border-b">{task?.datedue}</td>
                        <td className="px-4 py-2 border-b">{task?.assignto}</td>
                        <td className="px-4 py-2 border-b">{task?.assignby}</td>
                        <td className="px-4 py-2 border-b">{task?.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-2 text-center  text-red-900"
                      >
                        No tasks available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEmp;
