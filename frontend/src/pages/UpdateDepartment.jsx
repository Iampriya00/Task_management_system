import SideBar from "@/components/dashboard/sideBar";
import { Button } from "@/components/ui/button";
import { updatedept, viewDept } from "@/services/authservice";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

function UpdateDepartment() {
  const { id } = useParams();

  const {
    data: deptData,
    isLoading: isFetching,
    error,
  } = useQuery(`viewDept${id}`, () => viewDept(id), {
    refetchOnWindowFocus: false,
  });

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
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentname: "",
      departmentDes: "",
      manager: " ",
      employeeNumber: "",
    },
  });
  const onLoad = useCallback(() => {
    if (!deptData) return;
    reset({
      departmentname: deptData.departmentname || "",
      departmentDes: deptData.departmentDes || "",
      manager: deptData.manager || "",
      employeeNumber: deptData.employeeNumber || "",
    });
  }, [deptData, reset]);

  useEffect(() => {
    if (deptData) {
      onLoad();
    }
  }, [onLoad, deptData]);

  const { mutateAsync: updatedeptMutation, isLoading: isUpdating } =
    useMutation((data) => updatedept(id, data), {
      onSuccess: () => {
        toast.success("Project updated successfully!");
      },
      onError: (error) => {
        toast.error(`Failed to update project: ${error.message}`);
      },
    });

  // Form submission handler
  const handleDepartment = async (data) => {
    // Only pass the data to the mutation function as 'id' is already handled in the mutation call.
    await updatedeptMutation(data);
  };
  // Show loading or error while fetching project data
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading project data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">
          Failed to fetch project data: {error.message}
        </p>
      </div>
    );
  }
  return (
    <div className="flex">
      <SideBar />
      <div className="w-3/4 flex justify-center h-screen max-md:w-full">
        <div className="container p-20">
          <h1 className="text-2xl mb-6 text-center font-semibold">
            Update Project
          </h1>
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
        </div>
      </div>
    </div>
  );
}

export default UpdateDepartment;
