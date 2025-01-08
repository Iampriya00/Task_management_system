import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/adminDashboard";
import AuthWrapper from "./utils/authWrapper";
import UserEdit from "./pages/Useredit";
import AllEmployee from "./pages/Allemployee";
import AddNewEmp from "./pages/AddNewEmp";
import Viewemp from "./pages/Viewemp";
import AddNewTask from "./pages/AddNewTask";
import EmpViewTask from "./pages/EmpViewTask";
import ViewAttendence from "./pages/ViewAttendence";

function App() {
  return (
    <div>
      {/* Define the routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/userDasboard"
          element={
            <AuthWrapper requiredRole={["user"]}>
              <UserDashboard />
            </AuthWrapper>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <AdminDashboard />
            </AuthWrapper>
          }
        />
        <Route
          path="/settings"
          element={
            <AuthWrapper requiredRole={["user", "admin"]}>
              <UserEdit />
            </AuthWrapper>
          }
        />
        <Route
          path="/employee"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <AllEmployee />
            </AuthWrapper>
          }
        />
        <Route
          path="/addemployee"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <AddNewEmp />
            </AuthWrapper>
          }
        />
        <Route
          path="/viewemplyoee/:id"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <Viewemp />
            </AuthWrapper>
          }
        />
        <Route
          path="/addnewtask"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <AddNewTask />
            </AuthWrapper>
          }
        />
        <Route
          path="/empviewtask"
          element={
            <AuthWrapper requiredRole={["user"]}>
              <EmpViewTask />
            </AuthWrapper>
          }
        />
        <Route
          path="/view-attendence/:id"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <ViewAttendence />
            </AuthWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
