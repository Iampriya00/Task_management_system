import SideBar from "@/components/Dashboard/sideBar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { empDetails, userEdit } from "@/services/authservice";

function AdminUserEdit() {
  const { id } = useParams();
  const { data: user, isLoading } = useQuery(`empDetails/${id}`, () =>
    empDetails(id)
  );

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name is required.",
    }),
    email: z.string().email({
      message: "Invalid email format",
    }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    image: z
      .string()
      .url({ message: "Invalid image URL" })
      .min(1, { message: "Image URL is required" }),
    jobtitle: z.string().min(1, { message: "Please enter a valid job title" }),
    salary: z.string().min(1, { message: "Please enter a salary" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      profileImg: user?.profileImg || "",
      jobtitle: user?.jobtitle || "",
      salary: user?.salary || "",
    },
  });

  const { mutateAsync: editUserMutation } = useMutation(userEdit, {
    onSuccess: () => {
      toast.success("Updated Successfully");
      queryClient.invalidateQueries("userInfo");
      window.location.href = "/user";
    },
  });
  const handleSubmit = async (data) => {
    await editUserMutation({
      profileImg: data.image,
      username: data.name,
      phone: data.phone,
    });
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex">
        <SideBar />
        <div className="w-3/4 flex items-center justify-center h-screen">
          <div className="container p-20 ">
            <h1 className="text-2xl mb-6 text-center font-semibold">
              Edit Your Information
            </h1>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...form.register("username")}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...form.register("email")}
                  disabled
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone:
                </label>
                <input
                  type="text"
                  placeholder="Enter your number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...form.register("phone")}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Image:
                </label>
                <input
                  type="text"
                  placeholder="Enter your image URL"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...form.register("profileImg")}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="jobtitle"
                >
                  Job Title:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...form.register("jobtitle")}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="salary"
                >
                  Salary:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...form.register("salary")}
                />
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserEdit;
