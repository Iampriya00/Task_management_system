import store from "../store";
import _axios from "axios";

// Base URL for API
const baseURL = "http://localhost:3000/user"; // You can set the API URL in environment variables

// Create an axios instance
const axios = _axios.create({
  baseURL,
});

// Request interceptor to include token in headers if available
axios.interceptors.request.use((config) => {
  // Safe check for the auth state and token
  const authState = store.getState().auth || {}; // Fallback to empty object if auth is undefined
  const { token } = authState; // Destructure token from authState (or fallback to undefined)

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Set Authorization header
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
        handleLogout(); // Call the logout function
        window.location.href = "/"; // Redirect to the login page
      }

      // Optional: Log error details for debugging
      console.error("API Error:", errorObject);

      throw errorObject; // Rethrow the error to be handled by the caller
    }

    // Rethrow the error if no response object
    console.error("API Error (no response):", error);
    throw error;
  }
);

// Handle user logout (you can import this or define it here)
function handleLogout() {
  store.dispatch({ type: "LOGOUT" }); // Assuming you're using Redux for state management
  // Clear any other sensitive data, if necessary
}

export default axios;
