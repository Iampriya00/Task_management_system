import { useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { handleLogout, userDetails } from "@/services/authservice";
import { useQuery } from "react-query";
import { ModeToggle } from "../ui/themeToggle";
import { FaBars } from "react-icons/fa";

function SideBar() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  useQuery("userInfo", userDetails);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const onLogout = () => {
    handleLogout();
    navigate("/");
  };
  return (
    <div className="relative min-md:w-1/4 ">
      {/* Hamburger Icon */}
      <div
        className="absolute z-50 hidden cursor-pointer top-8 left-8 max-md:block"
        onClick={toggleSidebar}
      >
        <FaBars className="text-2xl text-slate-200" />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed min-md:w-1/4 top-0 left-0 h-screen bg-gradient-to-b from-blue-800 to-blue-600 shadow-lg transform overflow-scroll ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 w-64 z-40 min-md:translate-x-0`}
      >
        {/* Sidebar Title */}
        <h1 className="py-6 text-2xl font-bold text-center text-white border-b border-blue-500">
          Dashboard
        </h1>

        {/* User Profile Image */}
        <div className="flex flex-col items-center mt-6">
          <img
            src={user.profileImg || "https://via.placeholder.com/150"}
            alt="User Picture"
            className="w-24 h-24 border-4 border-white rounded-full shadow-md md:w-32 md:h-32"
          />
          <h2 className="mt-4 text-lg font-medium text-white">
            {user.username || "User Name"}
          </h2>
          <p className="text-sm text-blue-200">
            {user.email || "user@example.com"}
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col justify-between flex-grow mt-10">
          <ul className="space-y-6 text-center">
            {/* User Role Links */}
            {user.role === "user" && (
              <>
                <li>
                  <Link
                    to="/userDasboard"
                    className="block font-semibold text-white hover:text-blue-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/empviewtask"
                    className="block font-semibold text-white hover:text-blue-200"
                  >
                    View Task
                  </Link>
                </li>
                <li>
                  <Link
                    to="/leaveManagement"
                    className="block font-semibold text-white hover:text-blue-200"
                  >
                    Leave Request
                  </Link>
                </li>
              </>
            )}

            {/* Admin Role Links */}
            {user.role === "admin" && (
              <>
                <li>
                  <Link
                    to="/admin"
                    className="block font-semibold text-white hover:text-blue-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/employee"
                    className="block font-semibold text-white hover:text-blue-200"
                  >
                    Employees
                  </Link>
                </li>
                <li>
                  <Link
                    to="/departments"
                    className="block font-semibold text-white hover:text-blue-200"
                  >
                    Departments
                  </Link>
                </li>
                <li>
                  <Link
                    to="/leaves"
                    className="block font-semibold text-white hover:text-blue-200"
                  >
                    Leaves
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addnewtask"
                    className="block font-semibold text-white hover:text-blue-200"
                  >
                    Add New Task
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addNewProject"
                    className="block font-semibold text-white hover:text-blue-200"
                  >
                    Add New Project
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to="/settings"
                className="block font-semibold text-white hover:text-blue-200"
              >
                Account Settings
              </Link>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="flex flex-col items-center justify-center my-6 space-y-3">
            <ModeToggle />
            <Button
              variant="destructive"
              className="px-6 py-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-500"
              onClick={onLogout}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for closing sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default SideBar;
