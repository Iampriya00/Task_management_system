import store from "../store";
import axios from "./axios"; // Assuming this is your axios instance
import { setUser, setAccessToken, logout } from "../store/auth/userSlice";

export const loginService = async (data) => {
  try {
    const response = await axios.post("/login", data);
    console.log(response.data);
    store.dispatch(setUser(response.data.user));
    store.dispatch(setAccessToken(response.data.token));
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
  }
};
export const handleLogout = () => {
  store.dispatch(logout());
};
