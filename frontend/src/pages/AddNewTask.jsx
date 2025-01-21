import SideBar from "@/components/Dashboard/sideBar";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { addTask, viewProject } from "@/services/authservice";

function AddNewTask() {
  const navigate = useNavigate();

  const { data: projectData } = useQuery("viewProject", viewProject, {
    refetchOnWindowFocus: false,
  });

  const formSchema = z.object({
    taskdetails: z.string().min(1, "Task is required"),
    project: z.string().min(1, "Project is required"),
    duedate: z.preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date()
    ),
    assignto: z.string().min(1, "Assign to is required"),
    assignby: z.string().min(1, "Assign by required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskdetails: "",
      project: "",
      duedate: "",
      assignto: "",
      assignby: "",
    },
  });

  const { mutateAsync: addTaskMutat } = useMutation(addTask, {
    onSuccess: () => {
      toast.success("Task Added Successfully");
      navigate("/userDasboard");
    },
  });

  const handleAddTask = async (data) => {
    const transformedData = {
      ...data,
      datedue: new Date(data.duedate),
    };
    console.log(transformedData);
    await addTaskMutat(transformedData);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="w-3/4 flex justify-center h-screen max-md:w-full">
        <div className="container mx-auto p-20">
          <h1 className="text-2xl mb-6 text-center font-semibold">
            Add Task Details
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(handleAddTask)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Task Details:
              </label>
              <Input
                type="text"
                placeholder="Enter Task Details"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("taskdetails")}
              />
              {errors.taskdetails && (
                <p className="text-red-500 text-xs">
                  {errors.taskdetails.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Project Name:
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md bg-slate-900"
                {...register("project")}
              >
                <option value="">Select a Project</option>
                {projectData?.map((project, index) => (
                  <option key={index} value={project.projectname}>
                    {project.projectname}
                  </option>
                ))}
              </select>
              {errors.project && (
                <p className="text-red-500 text-xs">{errors.project.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date Due:
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md bg-transparent"
                {...register("duedate")}
              />
              {errors.duedate && (
                <p className="text-red-500 text-xs">{errors.duedate.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Assign To:
              </label>
              <Input
                type="email"
                placeholder="Enter Employee Email"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("assignto")}
              />
              {errors.assignto && (
                <p className="text-red-500 text-xs">
                  {errors.assignto.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Assign By:
              </label>
              <Input
                type="email"
                placeholder="Enter Admin Email"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("assignby")}
              />
              {errors.assignby && (
                <p className="text-red-500 text-xs">
                  {errors.assignby.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewTask;
