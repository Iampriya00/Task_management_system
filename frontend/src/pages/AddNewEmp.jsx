import { addEmp, viewAllDepartment } from "@/services/authservice";
import queryClient from "@/utils/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SideBar from "@/components/Dashboard/sideBar";

function AddNewEmp() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();

  const { data: deptData } = useQuery("viewAllDepartment", viewAllDepartment, {
    refetchOnWindowFocus: false,
  });

  const formSchema = z.object({
    profileImg: z
      .string()
      .min(2, { message: "Please enter a valid image URL" }),
    username: z.string().min(3, { message: "Please enter a valid name" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    phone: z.string().min(1, { message: "Please enter a valid phone number" }),
    jobtitle: z.string().min(1, { message: "Please enter a valid job title" }),
    salary: z.string().min(1, { message: "Please enter a YOUR SALARY" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImg: "",
      username: "",
      email: "",
      phone: "",
      jobtitle: "",
      salary: "",
      password: "",
    },
  });
  const { mutateAsync: addEmpMut } = useMutation(addEmp, {
    onSuccess: () => {
      toast.success("Employee Added Successfully");
      navigate("/employee");
      queryClient.invalidateQueries("allEmployee");
    },
  });

  const handleAddEmp = async (data) => {
    try {
      await addEmpMut(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="w-3/4 flex-1 p-6 md:p-10 bg-black max-md:w-full">
        <div className="max-w-lg mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Add New Employee</h1>
          <form className="space-y-4" onSubmit={handleSubmit(handleAddEmp)}>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Employee Image:
              </label>
              <input
                type="text"
                {...register("profileImg")}
                className="w-full p-2 border text-slate-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.profileImg && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.profileImg.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Employee Name:
              </label>
              <input
                type="text"
                {...register("username")}
                className="w-full p-2 border text-slate-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Email:
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-2 border text-slate-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Phone:
              </label>
              <input
                type="text"
                {...register("phone")}
                className="w-full p-2 border text-slate-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Job Title:
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("jobtitle")}
              >
                <option value="">Select a Project</option>
                {deptData?.map((dept, index) => (
                  <option key={index} value={dept.departmentname}>
                    {dept.departmentname}
                  </option>
                ))}
              </select>
              {errors.jobtitle && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.jobtitle.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Salary:
              </label>
              <input
                type="text"
                inputMode="numeric"
                {...register("salary")}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                className="w-full p-2 border text-slate-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.salary && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.salary.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full p-2 border text-slate-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewEmp;
