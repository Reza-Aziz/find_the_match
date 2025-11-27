import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AdminQuestionForm from "../components/AdminQuestionForm";
import QuestionList from "../components/QuestionList";
import * as questionsApi from "../api/questions";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const auth = useAuthStore();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth.token) return navigate("/login");
    if (auth.user && auth.user.role !== "admin") return navigate("/");
    load();
  }, []); // eslint-disable-line

  const load = async () => {
    setLoading(true);
    try {
      const res = await questionsApi.getAllQuestionsAdmin();
      const list = res && res.data ? res.data : [];
      setQuestions(list);
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (question, answer) => {
    await questionsApi.createQuestion(question, answer);
    await load();
  };

  const handleDelete = async (id) => {
    await questionsApi.deleteQuestion(id);
    await load();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
      
      <Navbar />
      
      <div className="flex-1 p-6 animate-fadeIn">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 hover:shadow-teal-200/50 transition-all duration-500">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              👨‍💼 Admin Dashboard - Kelola Pertanyaan
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Buat, edit, dan hapus pertanyaan untuk game
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 hover:shadow-teal-200/50 transition-all duration-500">
            <AdminQuestionForm onSubmit={handleCreate} />
          </div>

          {/* Questions List Section */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 hover:shadow-teal-200/50 transition-all duration-500">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-500 rounded-full" style={{ animation: 'spin 1s linear infinite' }}></div>
                <p className="text-gray-600 font-medium">Memuat pertanyaan...</p>
              </div>
            ) : (
              <QuestionList questions={questions} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
