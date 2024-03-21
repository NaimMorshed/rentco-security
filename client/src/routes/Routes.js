import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "../App";
import ProtectedRoute from "./ProtectedRoute";

import Welcome from "../pages/welcome/Welcome";
import NotFound from "../pages/404/NotFound";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Phone from "../pages/login/Phone";
import Signup from "../pages/login/Signup";
import Admin from "../pages/admin/Admin";
import Main from "../pages/dashboard/Payment/Main";

export default function Routes_() {
  const [authentication] = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute loggedIn={authentication}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/phone" element={<Phone />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/payment/:data" element={<Main />} />
        <Route
          path="/signup"
          element={
            <ProtectedRoute loggedIn={authentication}>
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
