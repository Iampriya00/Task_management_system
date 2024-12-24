import SideBar from "@/components/Dashboard/sideBar";
import { fetchAllEmp } from "@/services/authservice";
import React from "react";
import { useQuery } from "react-query";

function AllEmployee() {
  const {
    data: empData = [],
    isLoading,
    isError,
    error,
  } = useQuery("allEmployee", fetchAllEmp);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="w-3/4 flex h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center mb-6">Employee List</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 border-b border-gray-300">
                    Employee ID
                  </th>
                  <th className="text-left px-6 py-4 border-b border-gray-300">
                    Employee Image
                  </th>
                  <th className="text-left px-6 py-4 border-b border-gray-300">
                    Employee Name
                  </th>
                  <th className="text-left px-6 py-4 border-b border-gray-300">
                    Employee Email
                  </th>
                  <th className="text-left px-6 py-4 border-b border-gray-300">
                    Employee Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {empData && empData.length > 0 ? (
                  empData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-100">
                      <td className="px-6 py-4 border-b border-gray-300">
                        {item._id}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        <img
                          src={item.profileImg}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {item.username}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {item.phone}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
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
