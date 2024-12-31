import React from "react";
import ReactDOM from "react-dom/client"; // Ensure correct import
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Use `BrowserRouter` correctly
import { Provider } from "react-redux";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import store, { persistor } from "./store"; // Ensure store is imported correctly
import { QueryClientProvider } from "react-query";
import queryClient from "./utils/react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ui/theme-provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <App />
              <Toaster richColors position="top-right" />
            </Router>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
