import React, { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(email, password);
    } catch (err) {
      setError(err?.message || "Login gagal");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 max-w-md w-full bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 hover:shadow-teal-200/50 transition-all duration-500"
      style={{ animation: 'fadeIn 0.6s ease-out' }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>

      {error && (
        <div 
          className="text-red-700 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm"
          style={{ animation: 'shake 0.5s ease-out' }}
        >
          <strong className="font-bold">⚠️ </strong>
          {error}
        </div>
      )}

      <div className="space-y-1.5 group">
        <label className="block text-sm font-semibold text-gray-700 group-hover:text-teal-600 transition-colors">
          Email
        </label>
        <input
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:scale-[1.02] focus:shadow-lg hover:border-gray-300"
          placeholder="Masukkan email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-1.5 group">
        <label className="block text-sm font-semibold text-gray-700 group-hover:text-teal-600 transition-colors">
          Password
        </label>
        <input
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:scale-[1.02] focus:shadow-lg hover:border-gray-300"
          placeholder="Masukkan password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 active:scale-95 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5"
      >
        🔐 Login
      </button>

      <div className="text-center text-sm text-gray-600 pt-1">
        Belum punya akun?{" "}
        <a
          href="/register"
          className="text-teal-600 hover:text-teal-700 font-semibold underline-offset-2 hover:underline transition-all hover:translate-x-0.5 inline-block"
        >
          Daftar di sini →
        </a>
      </div>
    </form>
  );
}
