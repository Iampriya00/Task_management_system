import store from "../store";
import axios from "./axios"; // Assuming this is your axios instance
import { setUser, setAccessToken, logout } from "../store/auth/userSlice";
import { toast } from "sonner";

export const loginService = async (data) => {
  const response = await axios.post("/login", data);
  store.dispatch(setUser(response.data.user));
  store.dispatch(setAccessToken(response.data.token));
};
export const handleLogout = () => {
  store.dispatch(logout());
  toast.success("Logged out successfully");
};

export const userEdit = async (data) => {
  const response = await axios.post("/updateinformation", data);
  return response.data.data;
};

export const userDetails = async (data) => {
  const response = await axios.get("/userInformation", data);
  store.dispatch(setUser(response.data));
};

export const fetchAllEmp = async () => {
  const response = await axios.get("/allemployees");
  return response.data;
};
