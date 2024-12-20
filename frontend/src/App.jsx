import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/adminDashboard";
import AuthWrapper from "./utils/authWrapper";
import UserEdit from "./pages/Useredit";

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
      </Routes>
    </div>
  );
}

export default App;
