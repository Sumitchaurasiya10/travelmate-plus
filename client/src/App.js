import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavbarTop from "./components/NavbarTop";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Share from "./pages/Share";
import "animate.css";

function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <NavbarTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/share" element={<Share />} />
      </Routes>
    </>
  );
}

export default App;
