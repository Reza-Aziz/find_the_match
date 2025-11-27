import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import * as authApi from "../api/auth";
import useAuthStore from "../stores/useAuthStore";

export default function Login() {
  const navigate = useNavigate();
  const loginStore = useAuthStore();

  const handleSubmit = async (email, password) => {
    const res = await authApi.login(email, password);
    if (!res || !res.success) throw new Error(res?.message || "Login gagal");
    const { token, user } = res.data;
    console.log("Login success. User role:", user?.role);
    loginStore.login(token, user);
    if (user && user.role === "admin") {
      console.log("Redirecting to /admin");
      navigate("/admin");
    } else {
      console.log("Redirecting to /play");
      navigate("/play");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
