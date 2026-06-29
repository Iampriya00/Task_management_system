import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { loginService } from "../services/authservice";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/themeToggle";
import { Input } from "@/components/ui/input";
import { PasswordField } from "@/components/ui/passwordField";

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
  const { mutateAsync: loginMutation } = useMutation(loginService, {
    onSuccess: () => {
      toast.success("Loggged in successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    if (!email.trim() || !password.trim()) {
      alert("Please fill in all the fields");
      return;
    }

    await loginMutation(values);
  };

  useEffect(() => {
    if (isLoggedIn && token && user?.role === "user") {
      navigate("/userDasboard");
    } else if (isLoggedIn && token && user?.role === "admin") {
      navigate("/admin");
    }
  }, [isLoggedIn, user, token, navigate]);
  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-purple-200 via-blue-100 to-blue-300 p-4 flex flex-col items-center justify-center">
      {/* The Login Card Wrapper */}
      <form
        className="w-full max-w-sm bg-white/70 backdrop-blur-md px-8 pt-6 pb-36 rounded-2xl border border-white/40 shadow-xl flex flex-col relative overflow-hidden"
        onSubmit={handleSubmit}
        style={{
          backgroundImage: "url('/formimg.jpg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
        }}
      >
        {/* Mode Toggle row pinned neatly to the top right of the card */}
        <div className="flex justify-end mb-2">
          <ModeToggle />
        </div>

        {/* Form Header */}
        <h2 className="text-2xl font-bold text-[#1d82e6] text-center mb-6">
          Log In
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              className="pl-6"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <PasswordField
              id="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              className="pl-6 pr-10"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#1d82e6] hover:bg-[#156bbf] text-white py-2.5 rounded-lg font-medium transition-colors shadow-md"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}

export default Login;
