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
import { useTheme } from "@/components/ui/theme-provider";
function Login() {
  const { theme } = useTheme();
  console.log("theme:", theme);
  console.log("html classes:", document.documentElement.className);
  const isDark = document.documentElement.classList.contains("dark");
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
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gradient-to-tr from-purple-200 via-blue-100 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col w-full max-w-sm px-8 pt-6 overflow-hidden border shadow-xl bg-white/70 dark:bg-gray-900/80 backdrop-blur-md pb-36 rounded-2xl border-white/40 dark:border-gray-700"
        style={{
          backgroundImage: `url(${
            theme === "dark" ? "bg-img.png" : "formimg.jpg"
          })`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
        }}
      >
        <div className="flex justify-end mb-2">
          <ModeToggle />
        </div>
        <h2 className="text-2xl font-bold text-[#1d82e6] dark:text-blue-400 text-center mb-6">
          Log In
        </h2>
        <div>
          {/* Email Field */}
          <label
            className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            aria-label="Email"
            onChange={handleChange}
            value={values.email}
            className="pl-6 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          {/* Password Field */}
          <label
            className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <PasswordField
            id="password"
            name="password"
            placeholder="Enter your password"
            aria-label="Password"
            onChange={handleChange}
            value={values.password}
            className="pl-6 pr-10 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        <div className="mt-6 ">
          <Button
            type="submit"
            className="w-full bg-[#1d82e6] hover:bg-[#156bbf] dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md"
          >
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
