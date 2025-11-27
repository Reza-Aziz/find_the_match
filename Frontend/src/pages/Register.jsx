import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import * as authApi from "../api/auth";
import useAuthStore from "../stores/useAuthStore";

export default function Register() {
  const navigate = useNavigate();
  const loginStore = useAuthStore();

  const handleSubmit = async (username, email, password, role) => {
    const res = await authApi.register(username, email, password, role);
    if (!res || !res.success) throw new Error(res?.message || "Registrasi gagal");

    const { token, user } = res.data;
    console.log("Register success. User role:", user?.role);

    loginStore.login(token, user);

    // Redirect berdasarkan role yang dikembalikan backend
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
        <h2 className="text-2xl font-bold mb-2 text-center">Buat Akun Baru</h2>
        <p className="text-gray-600 text-center mb-6 text-sm">Daftar untuk mulai bermain FIND THE MATCH</p>
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
