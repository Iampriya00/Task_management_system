import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/adminDashboard";
import AuthWrapper from "./utils/authWrapper";
import UserEdit from "./pages/Useredit";
import AllEmployee from "./pages/Allemployee";
import AddNewEmp from "./pages/AddNewEmp";
import ViewEmp from "./pages/Viewemp";
import AddNewTask from "./pages/AddNewTask";
import EmpViewTask from "./pages/EmpViewTask";
import ViewAttendence from "./pages/ViewAttendence";
import LeaveManagement from "./pages/LeaveManagement";
import Leaves from "./pages/Leaves";
import AdminUserEdit from "./pages/AdminUserEdit";
import AddNewProject from "./pages/AddNewProject";
import Department from "./pages/Department";

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
              <ViewEmp />
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
        <Route
          path="/leaveManagement"
          element={
            <AuthWrapper requiredRole={["user"]}>
              <LeaveManagement />
            </AuthWrapper>
          }
        />
        <Route
          path="/leaves"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <Leaves />
            </AuthWrapper>
          }
        />
        <Route
          path="/adminuseredit/:id"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <AdminUserEdit />
            </AuthWrapper>
          }
        />
        <Route
          path="/addNewProject"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <AddNewProject />
            </AuthWrapper>
          }
        />
        <Route
          path="/departments"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <Department />
            </AuthWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
