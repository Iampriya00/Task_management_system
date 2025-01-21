import SideBar from "@/components/Dashboard/sideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addProject, deleteProject, viewProject } from "@/services/authservice";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import { CiSearch } from "react-icons/ci";

function AddNewProject() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: projectData } = useQuery("viewProject", viewProject, {
    refetchOnWindowFocus: false,
  });

  const filteredProjects =
    projectData?.filter((project) =>
      project.projectname.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const formSchema = z.object({
    projectname: z.string().min(3, { message: "Please enter Project Name" }),
    projectdescription: z
      .string()
      .min(5, { message: "Please enter Project Description" }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectname: "",
      projectdescription: "",
    },
  });

  const { mutateAsync: addProjectMut } = useMutation(addProject, {
    onSuccess: () => {
      toast.success("Project Added Successfully");
    },
    onError: () => {
      toast.error("Failed to add project");
    },
  });

  const handleProject = async (data) => {
    await addProjectMut(data);
  };

  return (
    <div>
      <div className="flex">
        <SideBar />
        <div className="w-3/4 flex justify-center h-screen max-md:w-full">
          <div className="container p-20">
            <h1 className="text-2xl mb-6 text-center font-semibold">
              Add New Project
            </h1>
            <form onSubmit={handleSubmit(handleProject)}>
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
              <Button className="w-full mt-4" variant="secondary">
                Submit
              </Button>
            </form>
            <h2 className="text-center mt-7 text-[24px]">Project Details</h2>
            <div className="mt-5 flex justify-end">
              <div className="flex items-center space-x-2 p-2 rounded-md shadow-sm w-[50%]">
                <input
                  type="search"
                  placeholder="Search by project name"
                  className="w-full p-2 text-sm bg-transparent outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CiSearch className="text-gray-500 text-xl cursor-pointer" />
              </div>
            </div>
            <div className="mt-5 max-lg :h-[350px]">
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="text-center border border-gray-300 px-4 py-2">
                      ID
                    </th>
                    <th className="text-center border border-gray-300 px-4 py-2">
                      Project Name
                    </th>
                    <th className="text-center border border-gray-300 px-4 py-2">
                      Project Description
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
                          {item._id}
                        </td>
                        <td className="text-center border border-gray-300 px-4 py-2">
                          {item.projectname}
                        </td>
                        <td className="text-center border border-gray-300 px-4 py-2">
                          {item.projectdescription}
                        </td>
                        <td className="text-center border border-gray-300 px-4 py-2">
                          <Button
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                              deleteProject(item._id).then(() => {
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
                        colSpan="3"
                        className="text-center text-gray-500 py-4"
                      >
                        No projects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewProject;
