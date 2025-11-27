import React, { useState } from "react";

export default function RegisterForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("player");
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password) {
      setError("Semua field harus diisi");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      await onSubmit(username, email, password, role);
    } catch (err) {
      setError(err?.message || "Registrasi gagal");
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
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
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
          Username
        </label>
        <input
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:scale-[1.02] focus:shadow-lg hover:border-gray-300"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

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
          placeholder="Minimal 6 karakter"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="space-y-2.5 border-t-2 border-gray-100 pt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          🎯 Pilih Role
        </label>

        <div className="flex flex-col gap-2.5">
          <label
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
              role === 'admin'
                ? 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-400 shadow-md scale-[1.02]'
                : 'bg-white/60 border-gray-200 hover:border-teal-300 hover:bg-teal-50/50 hover:scale-[1.01]'
            }`}
          >
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={(e) => setRole(e.target.value)}
              className="w-5 h-5 accent-teal-500"
            />
            <div className="flex-1">
              <span className="font-semibold text-gray-800">👨‍💼 Admin</span>
              <p className="text-xs text-gray-600 mt-0.5">Buat & kelola soal</p>
            </div>
          </label>

          <label
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
              role === 'player'
                ? 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-400 shadow-md scale-[1.02]'
                : 'bg-white/60 border-gray-200 hover:border-teal-300 hover:bg-teal-50/50 hover:scale-[1.01]'
            }`}
          >
            <input
              type="radio"
              name="role"
              value="player"
              checked={role === 'player'}
              onChange={(e) => setRole(e.target.value)}
              className="w-5 h-5 accent-teal-500"
            />
            <div className="flex-1">
              <span className="font-semibold text-gray-800">🎮 Player</span>
              <p className="text-xs text-gray-600 mt-0.5">Mainkan game</p>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-400 rounded-lg p-3 text-sm text-teal-800">
        <strong className="font-bold">💡 Info:</strong> Pilih role sesuai dengan yang ingin Anda lakukan.
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 active:scale-95 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5"
      >
        🚀 Daftar Sekarang
      </button>

      <div className="text-center text-sm text-gray-600 pt-1">
        Sudah punya akun?{" "}
        <a
          href="/login"
          className="text-teal-600 hover:text-teal-700 font-semibold underline-offset-2 hover:underline transition-all hover:translate-x-0.5 inline-block"
        >
          Login di sini →
        </a>
      </div>
    </form>
  );

}
