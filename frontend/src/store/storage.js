import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Create a noop (no-operation) storage for environments where window is not available (e.g., SSR)
const createNoopStorage = () => ({
  getItem(_key) {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem(_key) {
    return Promise.resolve();
  },
});

// Use localStorage if window is available, else use noopStorage (for SSR or non-browser environments)
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local") // Use localStorage if window is available
    : createNoopStorage(); // Fallback storage for SSR or non-browser environments

export default storage;
