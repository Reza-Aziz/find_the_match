import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import QuestionCard from "../components/QuestionCard";
import AnswerInput from "../components/AnswerInput";
import ProgressIndicator from "../components/ProgressIndicator";
import useQuestionStore from "../stores/useQuestionStore";
import * as answerApi from "../api/answer";
import useAuthStore from "../stores/useAuthStore";

export default function Play() {
  const navigate = useNavigate();
  const auth = useAuthStore();
  const { questions, loadQuestions } = useQuestionStore();
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [answeredIds, setAnsweredIds] = useState([]);

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
      return;
    }
    const load = async () => {
      await loadQuestions();
      setLoaded(true);
      setAnsweredIds([]);
    };
    load();
  }, [auth.token, navigate, loadQuestions]);

  const handleSubmit = async (value) => {
    setError(null);
    const current = availableQuestions[0];
    if (!current) return;
    try {
      const res = await answerApi.submitAnswer(current._id || current.id, value);
      if (res && res.success && res.data && res.data.correct) {
        toast.success("✅ Jawaban Benar!", { autoClose: 2000 });
        const qid = current._id || current.id;
        setAnsweredIds([...answeredIds, qid]);
        setError(null);
      } else {
        setError("Jawaban salah, coba lagi");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Error saat submit");
    }
  };

  // Filter questions yang belum dijawab
  const availableQuestions = questions.filter((q) => !answeredIds.includes(q._id) && !answeredIds.includes(q.id));
  const total = questions.length;
  const answered = answeredIds.length;
  const current = availableQuestions[0];

  // Jika semua soal sudah dijawab, redirect ke finish
  useEffect(() => {
    if (loaded && total > 0 && answered === total && availableQuestions.length === 0) {
      navigate("/finish");
    }
  }, [answered, total, loaded, availableQuestions.length, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .float-decoration {
          position: absolute;
          pointer-events: none;
          opacity: 0.1;
        }
      `}</style>
      
      {/* Floating Decorations */}
      <div className="float-decoration text-6xl" style={{ top: '10%', left: '5%', animation: 'float 4s ease-in-out infinite' }}>🎮</div>
      <div className="float-decoration text-6xl" style={{ top: '20%', right: '10%', animation: 'float 5s ease-in-out infinite 1s' }}>⭐</div>
      <div className="float-decoration text-6xl" style={{ bottom: '15%', left: '8%', animation: 'float 6s ease-in-out infinite 2s' }}>🏆</div>
      <div className="float-decoration text-6xl" style={{ bottom: '25%', right: '5%', animation: 'float 4.5s ease-in-out infinite 0.5s' }}>💎</div>
      
      <Navbar answered={answered} total={total} />
      
      <div className="flex-1 flex items-start justify-center p-6 animate-fadeIn relative z-10">
        <div className="w-full max-w-2xl space-y-6">
          {/* Header with Level Badge */}
          <div className="bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border-2 border-teal-200/50 hover:shadow-teal-300/50 hover:border-teal-300/50 transition-all duration-500 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
                <span className="text-3xl">🎮</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Play Game
                </h2>
                <p className="text-sm text-gray-600">Level {Math.floor(answered / 3) + 1}</p>
              </div>
            </div>
            {total > 0 && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-gray-500 font-medium">Streak</div>
                  <div className="text-xl font-bold text-orange-500">🔥 {answered}</div>
                </div>
                <ProgressIndicator remaining={total - answered} total={total} />
              </div>
            )}
          </div>

          {/* Loading State */}
          {!loaded ? (
            <div className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-md p-12 rounded-3xl shadow-2xl border-2 border-teal-200/50 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-teal-200 border-t-teal-500 rounded-full" style={{ animation: 'spin 1s linear infinite' }}></div>
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">🎯</span>
                </div>
                <p className="text-gray-600 font-bold text-lg">Menyiapkan pertanyaan...</p>
                <p className="text-gray-500 text-sm">Bersiaplah untuk tantangan!</p>
              </div>
            </div>
          ) : total === 0 ? (
            /* Empty State */
            <div className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border-2 border-yellow-200/50 text-center hover:shadow-yellow-300/50 hover:border-yellow-300/50 transition-all duration-500">
              <div className="mb-6" style={{ animation: 'bounce 2s ease-in-out infinite' }}>
                <div className="inline-block bg-yellow-100 p-6 rounded-full">
                  <svg className="w-20 h-20 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">🎲 Belum Ada Quest</h3>
              <p className="text-gray-600 mb-4 text-lg">Game Master sedang menyiapkan tantangan!</p>
              <p className="text-gray-500 text-sm mb-8">Tunggu sebentar ya...</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white rounded-xl font-bold shadow-lg transition-all duration-300 active:scale-95 hover:shadow-xl hover:scale-105"
              >
                🔄 Cek Quest Baru
              </button>
            </div>
          ) : current ? (
            /* Game Active State */
            <div className="space-y-5">
              {/* Question Number Badge */}
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg font-bold text-sm">
                  ⚡ Pertanyaan #{answered + 1} dari {total}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-2 border-purple-200/50 hover:shadow-purple-300/50 hover:border-purple-300/50 transition-all duration-500 relative overflow-hidden">
                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                  {answered < 3 ? '😊 Easy' : answered < 6 ? '🤔 Medium' : '😈 Hard'}
                </div>
                <QuestionCard question={current} />
              </div>
              
              {error && (
                <div 
                  className="text-red-700 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-5 rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-3"
                  style={{ animation: 'shake 0.5s ease-out' }}
                >
                  <span className="text-3xl">❌</span>
                  <div>
                    <strong className="font-bold block">Oops! Belum benar</strong>
                    <span>{error}</span>
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border-2 border-teal-200/50 hover:shadow-teal-300/50 hover:border-teal-300/50 transition-all duration-500">
                <AnswerInput onSubmit={handleSubmit} />
              </div>

              {/* Motivational Hint */}
              <div className="text-center text-sm text-gray-600 bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-gray-200">
                💡 <span className="font-medium">Tips:</span> Jawab dengan benar untuk melanjutkan ke level berikutnya!
              </div>
            </div>
          ) : (
            /* Victory State */
            <div className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border-2 border-green-200/50 text-center hover:shadow-green-300/50 hover:border-green-300/50 transition-all duration-500 relative overflow-hidden">
              {/* Confetti Effect */}
              <div className="absolute inset-0 pointer-events-none">
                <span className="absolute text-3xl" style={{ top: '10%', left: '10%', animation: 'confetti 3s ease-out infinite' }}>🎉</span>
                <span className="absolute text-3xl" style={{ top: '15%', right: '15%', animation: 'confetti 3s ease-out infinite 0.5s' }}>⭐</span>
                <span className="absolute text-3xl" style={{ top: '20%', left: '50%', animation: 'confetti 3s ease-out infinite 1s' }}>🏆</span>
                <span className="absolute text-3xl" style={{ top: '10%', right: '30%', animation: 'confetti 3s ease-out infinite 1.5s' }}>💎</span>
              </div>
              
              <div className="mb-6 relative" style={{ animation: 'pulse 2s ease-in-out infinite' }}>
                <div className="inline-block bg-gradient-to-br from-green-100 to-emerald-100 p-8 rounded-full shadow-xl">
                  <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-4xl font-bold text-gray-800 mb-2">🎉 Victory!</h3>
              <p className="text-2xl font-bold text-green-600 mb-3">Mission Complete!</p>
              <p className="text-gray-600 mb-6 text-lg">Semua pertanyaan sudah terjawab dengan benar!</p>
              
              {/* Stats */}
              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-xl">
                  <div className="text-3xl mb-1">🏆</div>
                  <div className="text-xs text-gray-600">Total Soal</div>
                  <div className="text-xl font-bold text-orange-600">{total}</div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-xl">
                  <div className="text-3xl mb-1">✅</div>
                  <div className="text-xs text-gray-600">Benar</div>
                  <div className="text-xl font-bold text-green-600">{answered}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-xl">
                  <div className="text-3xl mb-1">⭐</div>
                  <div className="text-xs text-gray-600">Level</div>
                  <div className="text-xl font-bold text-purple-600">{Math.floor(answered / 3) + 1}</div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate("/finish")} 
                className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-bold shadow-xl transition-all duration-300 active:scale-95 hover:shadow-2xl hover:scale-105 text-lg"
              >
                ✨ Claim Rewards
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
