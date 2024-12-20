import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/adminDashboard";
import AuthWrapper from "./utils/authWrapper";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/user"
        element={
          <AuthWrapper requiredRole={"user"}>
            <UserDashboard />
          </AuthWrapper>
        }
      />
      <Route
        path="/admin"
        element={
          <AuthWrapper requiredRole={"admin"}>
            <AdminDashboard />
          </AuthWrapper>
        }
      />
    </Routes>
  );
}

export default App;
