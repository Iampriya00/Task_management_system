import SideBar from "@/components/Dashboard/sideBar";
import { Button } from "@/components/ui/button";
import {
  addDepartment,
  deleteDepartment,
  viewAllDepartment,
} from "@/services/authservice";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

function Department() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch departments
  const { data: deptData } = useQuery("viewAllDepartment", viewAllDepartment, {
    refetchOnWindowFocus: false,
  });

  // Filter departments based on search term
  const filteredProjects =
    deptData?.filter((department) =>
      department.departmentname.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Form validation schema
  const formSchema = z.object({
    departmentname: z
      .string()
      .min(3, { message: "Please enter a valid department name" }),
    departmentDes: z
      .string()
      .min(5, { message: "Please enter a valid description" }),
    manager: z.string().min(1, { message: "Please enter a manager name" }),
    employeeNumber: z
      .string()
      .min(1, { message: "Please enter a valid number of employees" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentname: "",
      departmentDes: "",
      manager: "",
      employeeNumber: "",
    },
  });

  const { mutateAsync: addDeptMut } = useMutation(addDepartment, {
    onSuccess: () => {
      toast.success("Department added successfully");
      reset();
    },
    onError: (error) => {
      console.error("API Error: ", error); // Log error for debugging
      toast.error("Failed to add department");
    },
  });

  const handleDepartment = async (data) => {
    try {
      // Submit the department data
      await addDeptMut(data);
      reset(); // Reset form after success
    } catch (error) {
      console.error("Error submitting department:", error);
      toast.error("Failed to add department");
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="w-full flex-1 p-6">
        <div className="max-w-6xl mx-auto p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Manage Departments
          </h1>

          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search departments..."
              className="w-full p-3 bg-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <form
            className="mb-8 bg-zinc-900 p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit(handleDepartment)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department Name */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Department Name
                </label>
                <input
                  type="text"
                  {...register("departmentname")}
                  placeholder="Enter Department Name"
                  className={`w-full p-3 border bg-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.departmentname ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.departmentname && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.departmentname.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  {...register("departmentDes")}
                  placeholder="Enter Department Description"
                  className={`w-full p-3 border bg-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.departmentDes ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.departmentDes && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.departmentDes.message}
                  </p>
                )}
              </div>

              {/* Manager */}
              <div>
                <label className="block text-gray-700 mb-2">Manager</label>
                <input
                  type="text"
                  {...register("manager")}
                  placeholder="Enter Manager Name"
                  className={`w-full p-3 border  bg-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.manager ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.manager && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.manager.message}
                  </p>
                )}
              </div>

              {/* Employee Number */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Employee Number
                </label>
                <input
                  type="text"
                  {...register("employeeNumber")}
                  placeholder="Enter Employee Number"
                  className={`w-full p-3 border bg-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.employeeNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.employeeNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.employeeNumber.message}
                  </p>
                )}
              </div>
            </div>

            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
              Submit
            </Button>
          </form>

          {/* Departments Table */}
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="text-center border border-gray-300 px-4 py-2">
                  Department Name
                </th>
                <th className="text-center border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="text-center border border-gray-300 px-4 py-2">
                  Manager
                </th>
                <th className="text-center border border-gray-300 px-4 py-2">
                  Employee Number
                </th>
                <th className="text-center border border-gray-300 px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((item, idx) => (
                  <tr key={idx}>
                    <td className="text-center border border-gray-300 px-4 py-2">
                      {item.departmentname}
                    </td>
                    <td className="text-center border border-gray-300 px-4 py-2">
                      {item.departmentDes}
                    </td>
                    <td className="text-center border border-gray-300 px-4 py-2">
                      {item.manager}
                    </td>
                    <td className="text-center border border-gray-300 px-4 py-2">
                      {item.employeeNumber}
                    </td>
                    <td className="text-center border border-gray-300 px-4 py-2">
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                          deleteDepartment(item._id).then(() => {
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
                  <td colSpan="3" className="text-center text-gray-500 py-4">
                    No projects found.
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

export default Department;
