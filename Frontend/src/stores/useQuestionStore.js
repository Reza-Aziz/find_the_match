import create from "zustand";
import * as questionsApi from "../api/questions";

const useQuestionStore = create((set) => ({
  questions: [],
  loadQuestions: async () => {
    const res = await questionsApi.getAllQuestions();
    // backend returns { success: true, data: [...] }
    const list = res && res.data ? res.data : [];
    set({ questions: list });
  },
  removeQuestion: (id) => set((state) => ({ questions: state.questions.filter((q) => q._id !== id && q.id !== id) })),
  reset: () => set({ questions: [] }),
}));

export default useQuestionStore;
