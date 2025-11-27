import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import useAuthStore from "../stores/useAuthStore";

export default function Finish() {
  const navigate = useNavigate();
  const auth = useAuthStore();

  useEffect(() => {
    toast.success("🎉 Selesai! Anda telah menjawab semua pertanyaan dengan benar. Selamat!", {
      autoClose: 5000,
      position: "top-center",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="p-8 bg-white rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-2">🎉 Selamat!</h2>
          <p className="text-gray-600 mb-2">Semua pertanyaan telah dijawab dengan benar.</p>
          <p className="text-lg font-semibold text-blue-600 mb-6">Skor Anda: {auth.user?.score || 0}</p>
          <div className="space-x-3">
            <button onClick={() => navigate("/play", { replace: true })} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition">
              Bermain Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
