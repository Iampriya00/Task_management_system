import SideBar from "@/components/dashboard/sideBar";
import { updateStatus, viewTask } from "@/services/authservice";
import { useAppSelector } from "@/store/hooks";
import queryClient from "@/utils/react-query";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

function EmpViewTask() {
  const { _id } = useAppSelector((state) => state.user.user);
  const {
    data: task,
    isLoading,
    isError,
    error,
  } = useQuery(`viewTask/${_id}`, () => viewTask(_id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-700">
          Error: {error?.message || "Something went wrong."}
        </p>
      </div>
    );
  }

  const handleStatusChange = async (e, taskId) => {
    const status = e.target.value;
    await updateStatus(taskId, { status }).then(() => {
      toast.success("Status updated successfully");
    });
    queryClient.invalidateQueries(`viewTask/${_id}`);
  };
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="w-3/4 max-md:w-full flex-1 p-10">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-300">
          Task Details
        </h1>

        <div className="overflow-auto h-[700px]">
          <table className="min-w-full table-auto border-collapse border">
            <thead className=" text-slate-400">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 border-b text-left font-medium"
                >
                  Task Details
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 border-b text-left font-medium"
                >
                  Project
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 border-b text-left font-medium"
                >
                  Create Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 border-b text-left font-medium"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 border-b text-left font-medium"
                >
                  Assign To
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 border-b text-left font-medium"
                >
                  Assign By
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 border-b text-left font-medium"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {task?.tasks && task.tasks.length > 0 ? (
                task.tasks.map((taskItem) => (
                  <tr
                    key={taskItem._id}
                    className="hover:bg-gray-700 text-[#0EA5E9]"
                  >
                    <td className="px-4 py-2 border-b">
                      {taskItem.taskdetails || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {taskItem.project || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {taskItem?.datecreate
                        ? new Date(taskItem.datecreate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {taskItem?.datedue
                        ? new Date(taskItem.datedue).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {taskItem?.assignto || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {taskItem?.assignby || "N/A"}
                    </td>

                    <td className="px-4 py-2 border-b">
                      <select
                        className="form-select p-3 bg-black"
                        disabled={taskItem?.status === "done"}
                        value={taskItem?.status}
                        onChange={(e) => handleStatusChange(e, taskItem._id)}
                      >
                        <option value="pending">Pending</option>
                        <option value="working">Working</option>
                        <option value="done">Done</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-6 text-center text-red-700"
                  >
                    No tasks available
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

export default EmpViewTask;
