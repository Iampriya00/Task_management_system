import SideBar from "@/components/dashboard/sideBar";
import { applyEmpLeave, viewLeave } from "@/services/authservice";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

function LeaveManagement() {
  const { _id } = useAppSelector((state) => state.user.user);

  const formSchema = z.object({
    leavetype: z.string().min(1, { message: "Please select leave type" }),
    startDate: z.string().min(1, { message: "Please select start date" }),
    endDate: z.string().min(1, { message: "Please select end date" }),
    reason: z.string().min(1, { message: "Please enter a reason" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leavetype: "",
      startDate: "",
      endDate: "",
      reason: "",
    },
  });

  const { mutateAsync: applyLeaveMut } = useMutation(applyEmpLeave, {
    onSuccess: () => {
      toast.success("Leave applied successfully");
    },
    onError: (error) => {
      console.error("Error applying leave:", error);
      toast.error("Failed to apply leave. Try again later.");
    },
  });

  const handleApplyLeave = async (data) => {
    try {
      console.log(data);
      await applyLeaveMut(data);
    } catch (error) {
      console.error("Error while applying leave:", error);
    }
  };

  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const { data: leaveData } = useQuery(["viewLeavebyUser", _id], () =>
    viewLeave(_id)
  );

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="w-3/4 max-md:w-full flex-1 p-6 max-md:p-15">
        <div className="mx-auto">
          <h1 className="text-2xl font-semibold mb-4 text-gray-300">
            Leave Management
          </h1>
          <form onSubmit={handleSubmit(handleApplyLeave)}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block text-sm font-medium text-gray-400">
                  Leave Type
                </label>
                <select
                  id="leaveType"
                  {...register("leavetype")}
                  className={`mt-1 block w-full p-2 border ${
                    errors.leavetype
                      ? "border-red-500"
                      : "border-gray-300 text-slate-800 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm sm:text-sm`}
                >
                  <option value="" disabled>
                    Select leave type
                  </option>
                  <option value="sick">Sick Leave</option>
                  <option value="vacation">Vacation Leave</option>
                  <option value="personal">Personal Leave</option>
                </select>
                {errors.leavetype && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.leavetype.message}
                  </p>
                )}
              </div>
            </div>

            {/* Start Date */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block text-sm font-medium text-slate-400">
                  Start Date
                </label>
                <input
                  type="date"
                  {...register("startDate")}
                  className={`mt-1 block w-full p-2 border${
                    errors.startDate
                      ? "border-red-500"
                      : "border-gray-300 text-slate-800 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm sm:text-sm`}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* End Date */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block text-sm font-medium text-slate-400">
                  End Date
                </label>
                <input
                  type="date"
                  {...register("endDate")}
                  className={`mt-1 block w-full p-2 border ${
                    errors.endDate
                      ? "border-red-500"
                      : "border-gray-300 text-slate-800 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm sm:text-sm`}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Reason for Leave */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block text-sm font-medium text-slate-400">
                  Reason for Leave
                </label>
                <textarea
                  {...register("reason")}
                  rows="4"
                  className={`mt-1 block w-full p-2 border ${
                    errors.reason
                      ? "border-red-500"
                      : "border-gray-300 text-slate-800 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm sm:text-sm`}
                  placeholder="Briefly explain the reason for your leave"
                ></textarea>
                {errors.reason && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.reason.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit Request
              </button>
            </div>
          </form>

          {/* Leave Data Table */}
          <div className="overflow-x-auto mt-6">
            <table
              className="min-w-full border border-gray-200 rounded-lg shadow-lg"
              aria-label="Leave Records Table"
            >
              <thead>
                <tr>
                  {[
                    "Leave Type",
                    "Start Date",
                    "End Date",
                    "Reason",
                    "Status",
                  ].map((header) => (
                    <th
                      key={header}
                      className="text-left text-gray-500 px-6 py-4 border-b border-gray-300 text-sm sm:text-base"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaveData && leaveData.length > 0 ? (
                  leaveData.map((leaveItem) => (
                    <tr key={leaveItem._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-400 border-b border-gray-300 text-xs sm:text-sm">
                        {leaveItem.leavetype}
                      </td>
                      <td className="px-6 py-4 text-gray-400 border-b border-gray-300 text-xs sm:text-sm">
                        {formatDate(leaveItem.startDate)}
                      </td>
                      <td className="px-6 py-4 text-gray-400 border-b border-gray-300 text-xs sm:text-sm">
                        {formatDate(leaveItem.endDate)}
                      </td>
                      <td className="px-6 py-4 text-gray-400 border-b border-gray-300 text-xs sm:text-sm">
                        {leaveItem.reason}
                      </td>
                      <td className="px-6 py-4 text-gray-400 border-b border-gray-300 text-xs sm:text-sm">
                        {leaveItem.status || "Pending"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-600 border-b border-gray-300 text-sm sm:text-base"
                    >
                      No leave records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveManagement;
