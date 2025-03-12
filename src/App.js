import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { LogIn } from "./pages/auth/log-in";
import { ForgotPassword } from "./pages/auth/Forgot-password";
import { Register } from "./pages/auth/Register";
import { Layout } from "./layouts/Layout";
import "./App.css";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routers/routes/AppRoutes";

function App() {
  return (
    <React.Fragment>
      {/* <BrowserRouter> */}
      <AppRoutes />
      {/* </BrowserRouter> */}
      {/* <Routes>
        <Route path="/auth/log-in" element={<LogIn />} />
        <Route path="/auth/Forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/Forgot-password/:Id" element={<ForgotPassword />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/register/:Id" element={<Register />} />
        <Route path="/home/Layout" element={<Layout />} />

        <Route
          exact
          path="/"
          element={<Navigate to="/auth/log-in" replace />}
        />
      </Routes> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
}

export default App;
