import React from "react";

export default function QuestionCard({ question }) {
  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-semibold mb-2">Pertanyaan</h2>
      <p className="text-gray-700">{question.question}</p>
    </div>
  );
}
