import store from "../store";
import _axios from "axios";
import { handleLogout } from "./authservice";

// Base URL for API
const baseURL = "http://localhost:3000/user"; // You can set the API URL in environment variables

// Create an axios instance
const axios = _axios.create({
  baseURL,
});

axios.interceptors.request.use((config) => {
  const { token } = store.getState().user;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors globally
axios.interceptors.response.use(
  (response) => response, // Return the response if no errors
  (error) => {
    const { response } = error;
    if (response) {
      const errorObject = response.data;

      // Handle unauthorized error (401)
      if (response.status === 401) {
        handleLogout();
        // Call the logout function
      }

      throw errorObject; // Rethrow the error to be handled by the caller
    }

    throw error;
  }
);

export default axios;
