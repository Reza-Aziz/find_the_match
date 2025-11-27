import create from "zustand";

const useAuthStore = create((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("ftm_token") : null,
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("ftm_user") || "null") : null,
  login: (token, user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ftm_token", token);
      localStorage.setItem("ftm_user", JSON.stringify(user));
    }
    set({ token, user });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ftm_token");
      localStorage.removeItem("ftm_user");
    }
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
