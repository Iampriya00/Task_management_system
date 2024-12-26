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

function App() {
  return (
    <div>
      {/* Define the routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/user"
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
        ></Route>
        <Route
          path="/employee"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <AllEmployee />
            </AuthWrapper>
          }
        ></Route>
        <Route
          path="/addemployee"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <AddNewEmp />
            </AuthWrapper>
          }
        ></Route>
        <Route
          path="/viewemplyoee/:id"
          element={
            <AuthWrapper requiredRole={["admin"]}>
              <Viewemp />
            </AuthWrapper>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
