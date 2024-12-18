import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { loginService } from "../services/authservice";

function Login() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.user);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    if (!email.trim() || !password.trim()) {
      alert("Please fill in all the fields");
      return;
    }
    try {
      await loginService(values);
      alert("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      if (user?.role === "user") {
        navigate("/user");
      } else if (user?.role === "admin") {
        navigate("/admin");
      }
    }
  }, [isLoggedIn, user, token, navigate]); // Remove `token` from the dependencies since it's not directly used for conditional checks

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md"
        >
          {/* Email Field */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Email"
            onChange={handleChange}
            value={values.email}
          />

          {/* Password Field */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Password"
            onChange={handleChange}
            value={values.password}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
