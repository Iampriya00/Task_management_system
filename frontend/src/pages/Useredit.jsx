import SideBar from "@/components/Dashboard/sideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userEdit } from "@/services/authservice";
import { useMutation } from "react-query";
import { toast } from "sonner";
import queryClient from "@/utils/react-query";

function UserEdit() {
  const user = useAppSelector((state) => state.user.user);
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name is required.",
    }),
    email: z.string().optional(),
    phone: z.string().min(1, { message: "Phone number is required" }),

    image: z
      .string()
      .url({ message: "Invalid image URL" })
      .min(1, { message: "Image URL is required" }),
    jobtitle: z.string().optional(),
    salary: z.string().optional(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      image: user?.profileImg || "",
      jobtitle: user?.jobtitle || "",
      salary: user?.salary || "",
    },
  });

  const { mutateAsync: editUserMutation, isLoading } = useMutation(userEdit, {
    onSuccess: () => {
      toast.success("Updated Successfully");
      queryClient.invalidateQueries("userInfo");
      // window.location.href = "/user";
    },
  });
  const handleSubmit = async (data) => {
    // console.log({
    //   profileImg: data.image,
    //   username: data.name,
    //   phone: data.phone,
    // });

    await editUserMutation({
      profileImg: data.image,
      username: data.name,
      phone: data.phone,
    });
  };
  return (
    <div className="flex">
      <SideBar />
      <div className="w-3/4 flex items-center justify-center h-screen max-md:w-full">
        <div className="container p-20 ">
          <h1 className="text-2xl mb-6 text-center font-semibold">
            Use Your Information
          </h1>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your Name"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...form.register("name")}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <Input
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
              <Input
                type="text"
                id="phone"
                placeholder="Enter your number"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...form.register("phone")}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Image"
              >
                Image:
              </label>
              <Input
                type="text"
                id="Image"
                placeholder="Enter your photo"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...form.register("image")}
              />
            </div>
            {user.role === "user" && (
              <>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Image"
                  >
                    Job Title:
                  </label>
                  <Input
                    type="text"
                    id="jobtitle"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...form.register("jobtitle")}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Image"
                  >
                    Salary:
                  </label>
                  <Input
                    type="text"
                    id="salary"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...form.register("salary")}
                    disabled
                  />
                </div>
              </>
            )}

            <Button
              className="w-full"
              variant="secondary"
              loading={isLoading}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
