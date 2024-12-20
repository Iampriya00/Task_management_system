import React from "react";
import { ModeToggle } from "../ui/themeToggle";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 w-full h-[100px] flex items-center justify-between px-6 shadow-md">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-[60px] w-auto" />
          <h1 className="text-white text-2xl font-bold ml-4">Company Name</h1>
        </div>
        <div className="flex items-center">
          <ModeToggle />
          <Link to="/user">
            <FaUser className="me-3" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
