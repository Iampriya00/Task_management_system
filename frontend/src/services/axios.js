import store from "../store";
import _axios from "axios";
import { handleLogout } from "./authservice";

const axios = _axios.create({
  baseURL: "http://localhost:3000",
});

axios.interceptors.request.use((config) => {
  const { token } = store.getState().user;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      handleLogout();
    }

    return Promise.reject(error);
  },
);

export default axios;
