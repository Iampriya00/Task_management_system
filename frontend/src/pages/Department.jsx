import SideBar from "@/components/Dashboard/sideBar";
import React from "react";

function Department() {
  return (
    <div>
      <div className="flex min-h-screen">
        <SideBar />
        <div className="w-3/4 flex-1 p-6">
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6 text-gray-400">
              Departments
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Department;
