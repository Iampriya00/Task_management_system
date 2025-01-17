import { useAppSelector } from "@/store/hooks";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { handleLogout, userDetails } from "@/services/authservice";
import { useQuery } from "react-query";
import { ModeToggle } from "../ui/themeToggle";

function SideBar() {
  const user = useAppSelector((state) => state.user.user);
  useQuery("userInfo", userDetails);

  return (
    <div className="w-1/4 bg-gradient-to-b from-blue-800 to-blue-600 h-screen flex flex-col shadow-lg">
      {/* Sidebar Title */}
      <h1 className="text-center text-white text-2xl font-bold py-6 border-b border-blue-500">
        Dashboard
      </h1>

      {/* User Profile Image */}
      <div className="flex flex-col items-center mt-6">
        <img
          src={user.profileImg || "https://via.placeholder.com/150"}
          alt="User Picture"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md"
        />
        <h2 className="text-white font-medium text-lg mt-4">
          {user.username || "User Name"}
        </h2>
        <p className="text-blue-200 text-sm">
          {user.email || "user@example.com"}
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col flex-grow justify-between mt-10">
        <ul className="space-y-6 text-center">
          {/* User Role Links */}
          {user.role === "user" && (
            <>
              <li>
                <Link
                  to="/userDasboard"
                  className="block text-white font-semibold hover:text-blue-200"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/empviewtask"
                  className="block text-white font-semibold hover:text-blue-200"
                >
                  View Task
                </Link>
              </li>
              <li>
                <Link
                  to="/leaveManagement"
                  className="block text-white font-semibold hover:text-blue-200"
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
                  className="block text-white font-semibold hover:text-blue-200"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/employee"
                  className="block text-white font-semibold hover:text-blue-200"
                >
                  Employees
                </Link>
              </li>
              <li>
                <Link
                  to="/departments"
                  className="block text-white font-semibold hover:text-blue-200"
                >
                  Departments
                </Link>
              </li>
              <li>
                <Link
                  to="/leaves"
                  className="block text-white font-semibold hover:text-blue-200"
                >
                  Leaves
                </Link>
              </li>
              <li>
                <Link
                  to="/addnewtask"
                  className="block text-white font-semibold hover:text-blue-200"
                >
                  Add New Task
                </Link>
              </li>
              <li>
                <Link
                  to="/addNewProject"
                  className="block text-white font-semibold hover:text-blue-200"
                >
                  Add New Project
                </Link>
              </li>
            </>
          )}

          <li>
            <Link
              to="/settings"
              className="block text-white font-semibold hover:text-blue-200"
            >
              Account Settings
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="flex flex-col my-6 justify-center items-center space-y-3">
          <ModeToggle />
          <Button
            variant="destructive"
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md shadow-md"
            onClick={() => handleLogout()}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
