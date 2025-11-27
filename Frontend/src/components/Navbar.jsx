import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export default function Navbar({ answered = 0, total = 0 }) {
  const navigate = useNavigate();
  const auth = useAuthStore();

  const handleLogout = () => {
    auth.logout();
    navigate("/register");
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white shadow-2xl border-b-4 border-white/20">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between animate-slideDown">
        {/* Left: Brand */}
        <div className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-lg">
          ✨ FIND THE MATCH
        </div>

        {/* Right: User Info */}
        {auth.user && (
          <div className="flex items-center gap-6">
            {/* Greeting & Role */}
            <div className="text-right text-sm group">
              <div className="font-semibold text-white group-hover:scale-105 transition-transform inline-block">
                Halo, <span className="text-yellow-200">{auth.user.username}</span>! 👋
              </div>
              <div className="text-cyan-100 capitalize bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full inline-block text-xs font-medium mt-1 hover:bg-white/20 transition-all">
                {auth.user.role === "admin" ? "👨‍💼 Admin" : "🎮 Player"}
              </div>
            </div>

            {/* Score Progress (only for players) */}
            {auth.user.role === "player" && total > 0 && (
              <div className="text-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="text-xs text-cyan-100 font-medium">📊 Progress</div>
                <div className="text-xl font-bold text-white mt-0.5" style={{ animation: 'pulse 2s ease-in-out infinite' }}>
                  {answered}<span className="text-cyan-200">/</span>{total}
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-yellow-300 to-yellow-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(answered / total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button 
              onClick={handleLogout} 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 hover:scale-105 border-2 border-white/20"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
