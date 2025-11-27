import React, { useState } from "react";

export default function AnswerInput({ onSubmit }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    try {
      await onSubmit(value);
    } finally {
      setLoading(false);
      setValue("");
    }
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input className="flex-1 border rounded px-3 py-2" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Masukkan jawaban..." />
      <button className="bg-blue-600 text-white px-4 rounded" disabled={loading}>
        {loading ? "Memeriksa..." : "Kirim"}
      </button>
    </form>
  );
}
