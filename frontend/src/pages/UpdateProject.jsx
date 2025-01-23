import React, { useCallback, useEffect } from "react";
import SideBar from "@/components/dashboard/sideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProject, viewSinProject } from "@/services/authservice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";

function UpdateProject() {
  const { id } = useParams();
  console.log("Project ID:", id);

  // Fetch project data using useQuery
  const {
    data: projectData,
    isLoading: isFetching,
    error,
  } = useQuery(`viewSinProject${id}`, () => viewSinProject(id), {
    refetchOnWindowFocus: false,
  });

  console.log(projectData);
  // Form validation schema
  const formSchema = z.object({
    projectname: z.string().min(2, { message: "Project name is required." }),
    projectdescription: z
      .string()
      .min(2, { message: "Project description is required." }),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectname: "",
      projectdescription: "",
    },
  });

  // Update form fields when project data is fetched
  const onLoad = useCallback(() => {
    if (!projectData) return;
    reset({
      projectname: projectData.projectname || "",
      projectdescription: projectData.projectdescription || "",
    });
  }, [projectData, reset]);

  useEffect(() => {
    if (projectData) {
      onLoad();
    }
  }, [onLoad, projectData]);

  // Update project mutation
  const { mutateAsync: updateProjectMutation, isLoading: isUpdating } =
    useMutation((data) => updateProject(id, data), {
      onSuccess: () => {
        toast.success("Project updated successfully!");
      },
      onError: (error) => {
        toast.error(`Failed to update project: ${error.message}`);
      },
    });

  // Form submission handler
  const handleProject = async (data) => {
    // Only pass the data to the mutation function as 'id' is already handled in the mutation call.
    await updateProjectMutation(data);
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
          <form onSubmit={handleSubmit(handleProject)}>
            {/* Project Name */}
            <div className="form-control w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Project Name
              </label>
              <Input
                type="text"
                {...register("projectname")}
                placeholder="Enter Project Name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.projectname && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.projectname.message}
                </p>
              )}
            </div>

            {/* Project Description */}
            <div className="form-control w-full mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Project Description
              </label>
              <Input
                type="text"
                {...register("projectdescription")}
                placeholder="Enter Project Description"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.projectdescription && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.projectdescription.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-4"
              variant="secondary"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProject;
