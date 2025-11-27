import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Play from "./pages/Play";
import Finish from "./pages/Finish";
import AdminDashboard from "./pages/AdminDashboard";
import useAuthStore from "./stores/useAuthStore";

function RequireAuth({ children }) {
  const auth = useAuthStore();
  if (!auth.token) return <Navigate to="/login" replace />;
  return children;
}

function RequireAdmin({ children }) {
  const auth = useAuthStore();
  if (!auth.token) return <Navigate to="/login" replace />;
  if (!auth.user || auth.user.role !== "admin") return <Navigate to="/play" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/register" replace />} />
        <Route
          path="/play"
          element={
            <RequireAuth>
              <Play />
            </RequireAuth>
          }
        />
        <Route
          path="/finish"
          element={
            <RequireAuth>
              <Finish />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
