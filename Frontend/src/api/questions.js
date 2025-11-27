import api from "./axios";

export async function getAllQuestions() {
  const res = await api.get("/questions");
  return res.data; // { success, data }
}

export async function getAllQuestionsAdmin() {
  const res = await api.get("/admin/questions");
  return res.data; // { success, data } - includes archived
}

export async function createQuestion(question, answer) {
  const res = await api.post("/admin/questions", { question, answer });
  return res.data;
}

export async function deleteQuestion(id) {
  const res = await api.delete(`/admin/questions/${id}`);
  return res.data;
}
