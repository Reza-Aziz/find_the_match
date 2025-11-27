import api from "./axios";

export async function submitAnswer(questionId, userAnswer) {
  const res = await api.post("/answer", { questionId, userAnswer });
  return res.data; // { success, data: { correct } }
}
