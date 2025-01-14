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

export const userDetails = async () => {
  const response = await axios.get("/userInformation");
  store.dispatch(setUser(response.data));
};

export const fetchAllEmp = async () => {
  const response = await axios.get("/allemployees");
  return response.data;
};

export const addEmp = async (data) => {
  try {
    const response = await axios.post("/signup", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const empDetails = async (id) => {
  const { data } = await axios.get(`/empInformation/${id}`);
  return data;
};

export const deleteEmp = async (id) => {
  try {
    const { data } = await axios.delete(`/deleteEmp/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

export const addTask = async (data) => {
  try {
    const response = await axios.post("/addNewTask", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const viewTask = async (id) => {
  try {
    const { data } = await axios.get(`/viewTaskbyUser/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateStatus = async (id, dal) => {
  try {
    const { data } = await axios.post(`updateStatus/${id}`, dal);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const clockIn = async () => {
  try {
    const { data } = await axios.post("/clock-in");
    toast.success(data.message);
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const clockOut = async () => {
  try {
    const { data } = await axios.post("/clock-out");
    toast.success(data.message);
    return data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const attendance = async () => {
  try {
    const { data } = await axios.get("/empAttendance");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const adminViewAttendence = async (id) => {
  try {
    const { data } = await axios.get(`/empAttendace/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const applyEmpLeave = async (data) => {
  try {
    const response = await axios.post("/applyLeave", data);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const viewAllLeave = async () => {
  try {
    const response = await axios.get("/viewAllLeaves");
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const leaveStatus = async (id, statusData) => {
  try {
    const response = await axios.post(`/updateLeaveStatus/${id}`, statusData);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

export const viewLeave = async (id) => {
  try {
    const response = await axios.get(`/viewLeavebyUser/${id}`);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching leave records:",
      error.response?.data || error.message
    );
    throw error;
  }
};
