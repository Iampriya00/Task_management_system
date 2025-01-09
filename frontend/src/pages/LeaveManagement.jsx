import SideBar from "@/components/Dashboard/sideBar";
import { applyEmpLeave } from "@/services/authservice";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

function LeaveManagement() {
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-semibold mb-4 text-gray-700">
            Leave Management
          </h1>
          <form onSubmit={handleSubmit(handleApplyLeave)}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block text-sm font-medium text-gray-700">
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
                <label className="block text-sm font-medium text-gray-700">
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
                <label className="block text-sm font-medium text-gray-700">
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
                <label className="block text-sm font-medium text-gray-700">
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
        </div>
      </div>
    </div>
  );
}

export default LeaveManagement;
