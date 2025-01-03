import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AdminProvider } from "./context/AdminContext.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <ToastContainer />
      <App />
    </AdminProvider>
  </StrictMode>
);
