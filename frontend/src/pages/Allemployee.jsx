import SideBar from "@/components/Dashboard/sideBar";
import { Button } from "@/components/ui/button";
import { deleteEmp, fetchAllEmp } from "@/services/authservice";
import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

function AllEmployee() {
  const navigate = useNavigate();
  const {
    data: empData,
    isLoading,
    isError,
    error,
  } = useQuery("allEmployee", fetchAllEmp, {
    refetchOnMount: true,
  });

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
    <div className="flex">
      <SideBar />
      <div className="w-3/4 flex h-screen overflow-y-auto max-md:w-full">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-400">
            Employee List
          </h1>
          <div className="flex justify-end mb-4">
            <Link to="/addemployee">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Create New Employee
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-ful border border-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr>
                  {[
                    "Employee ID",
                    "Employee Image",
                    "Employee Name",
                    "Employee Email",
                    "Employee Phone",
                    "Job Title",
                    "Salary",
                    "Attendance",
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
                      className={`cursor-pointer hover:bg-gray-100`}
                      onClick={() => navigate(`/viewemplyoee/${item._id}`)}
                    >
                      <td className="px-6 text-gray-400 py-4 border-b border-gray-300">
                        {item._id}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        <img
                          src={item.profileImg}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 text-gray-400 border-b border-gray-300">
                        {item.username}
                      </td>
                      <td className="px-6 py-4 text-gray-400 border-b border-gray-300">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 text-gray-400 border-b border-gray-300">
                        {item.phone}
                      </td>
                      <td className="px-6 py-4 text-gray-400 border-b border-gray-300">
                        {item.jobtitle}
                      </td>
                      <td className="px-6 py-4 text-gray-400 border-b border-gray-300">
                        {item.salary}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        <Button
                          className="bg-yellow-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/view-attendence/${item._id}`);
                          }}
                        >
                          View Attendance
                        </Button>
                      </td>

                      {/* Delete Button */}
                      <td className="px-6 py-4 border-b border-gray-300">
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents the row click from firing
                            deleteEmp(item._id).then(() => {
                              window.location.reload();
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center px-6 py-4 border-b border-gray-300 text-gray-500"
                    >
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllEmployee;
