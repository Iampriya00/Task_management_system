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
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-left overflow-hidden"
      style={{ backgroundImage: "url('bg-img.png')" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-end">
          <ModeToggle />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>
        </div>
        <div>
          <form
            className="p-24 bg-white/80 backdrop-blur-sm"
            onSubmit={handleSubmit}
            style={{ backgroundImage: "url('formimg.jpg')" }}
          >
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                Password
              </label>
              <PasswordField
                id="password"
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
