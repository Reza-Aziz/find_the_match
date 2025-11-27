import React from "react";

export default function QuestionList({ questions = [], onDelete }) {
  return (
    <div className="space-y-3">
      {questions.map((q) => (
        <div key={q._id || q.id} className="flex items-center justify-between bg-white p-3 rounded shadow">
          <div className="flex-1">
            <div className="font-semibold">{q.question}</div>
            <div className="text-sm text-gray-600">Jawaban: {q.answer}</div>
          </div>
          <div>
            <button onClick={() => onDelete(q._id || q.id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition">
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
