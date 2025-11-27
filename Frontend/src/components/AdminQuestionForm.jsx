import React, { useState } from "react";

export default function AdminQuestionForm({ onSubmit }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    await onSubmit(question, answer);
    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-1.5 group">
        <label className="block text-sm font-semibold text-gray-700 group-hover:text-teal-600 transition-colors">
          ❓ Pertanyaan
        </label>
        <input
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:scale-[1.02] focus:shadow-lg hover:border-gray-300"
          placeholder="Masukkan pertanyaan"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <div className="space-y-1.5 group">
        <label className="block text-sm font-semibold text-gray-700 group-hover:text-teal-600 transition-colors">
          ✅ Jawaban
        </label>
        <input
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:scale-[1.02] focus:shadow-lg hover:border-gray-300"
          placeholder="Masukkan jawaban"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 active:scale-95 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5"
      >
        ➕ Tambah Pertanyaan
      </button>
    </form>
  );
}
