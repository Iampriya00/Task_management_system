import SideBar from "@/components/Dashboard/sideBar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  empDetails,
  updateUserByAdmin,
  userEdit,
} from "@/services/authservice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import queryClient from "@/utils/react-query";

function AdminUserEdit() {
  const { id } = useParams();
  const { data: user, isLoading } = useQuery(
    `empDetails/${id}`,
    () => empDetails(id),
    {
      refetchOnMount: "always",
    }
  );

  const formSchema = z.object({
    username: z.string().min(2, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email format" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    profileImg: z
      .string()
      .url({ message: "Invalid image URL" })
      .min(1, { message: "Image URL is required" }),
    jobtitle: z.string().min(1, { message: "Please enter a valid job title" }),
    salary: z.string().min(1, { message: "Please enter a salary" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      profileImg: "",
      jobtitle: "",
    },
  });
  const onLoad = useCallback(() => {
    if (!user) return;
    form.reset({
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      profileImg: user?.profileImg || "",
      jobtitle: user?.jobtitle || "",
      salary: String(user?.salary) || "",
    });
  }, [user, form]);
  useEffect(() => {
    if (user) {
      onLoad();
    }
  }, [onLoad, user]);
  const { mutateAsync: updateUserByAdminMutation } = useMutation(
    updateUserByAdmin,
    {
      onSuccess: () => {
        toast.success("User updated Successfully");
      },
      onError: (error) => {
        console.error("Error updating user:", error);
        toast.error("Update failed");
      },
    }
  );
  const handleSubmit = async (data) => {
    console.log("Submitted Data:", { id, ...data });
    try {
      await updateUserByAdminMutation({ id, data });
      queryClient.invalidateQueries(`empDetails/${id}`);
    } catch (error) {
      console.error("Error while editing user:", error);
    }
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex">
        <SideBar />
        <div className="w-3/4 flex items-center justify-center h-screen max-md:w-full">
          <div className="container p-20">
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
                  className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
                  {...form.register("username")}
                />
                {form.formState.errors.username && (
                  <span className="text-red-500 text-sm">
                    {form.formState.errors.username.message}
                  </span>
                )}
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
                  className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
                  {...form.register("email")}
                  readOnly
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
                  className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
                  {...form.register("phone")}
                />
                {form.formState.errors.phone && (
                  <span className="text-red-500 text-sm">
                    {form.formState.errors.phone.message}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Image URL:
                </label>
                <input
                  type="text"
                  placeholder="Enter your image URL"
                  className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
                  {...form.register("profileImg")}
                />
                {form.formState.errors.profileImg && (
                  <span className="text-red-500 text-sm">
                    {form.formState.errors.profileImg.message}
                  </span>
                )}
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
                  className="w-full p-2 border text-slate-800 border-gray-300 rounded-md"
                  {...form.register("jobtitle")}
                />
                {form.formState.errors.jobtitle && (
                  <span className="text-red-500 text-sm">
                    {form.formState.errors.jobtitle.message}
                  </span>
                )}
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
                  className="w-full text-slate-800 p-2 border border-gray-300 rounded-md"
                  {...form.register("salary")}
                />
                {form.formState.errors.salary && (
                  <span className="text-red-500 text-sm">
                    {form.formState.errors.salary.message}
                  </span>
                )}
              </div>

              <Button
                className="w-full"
                variant="secondary"
                loading={isLoading}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserEdit;
