import api from "./axios";

export async function register(username, email, password, role = "player") {
  try {
    const res = await api.post("/auth/register", { username, email, password, role });
    console.log("Register API response:", res.data);
    return res.data; // { success, data }
  } catch (err) {
    const serverMsg = err?.response?.data?.message || err?.response?.data || err?.message;
    console.error("Register API error:", serverMsg);
    throw new Error(serverMsg || "Registrasi gagal");
  }
}

export async function login(email, password) {
  try {
    const res = await api.post("/auth/login", { email, password });
    console.log("Login API response:", res.data);
    return res.data;
  } catch (err) {
    const serverMsg = err?.response?.data?.message || err?.response?.data || err?.message;
    console.error("Login API error:", serverMsg);
    throw new Error(serverMsg || "Login gagal");
  }
}

export async function getMe() {
  const res = await api.get("/auth/me");
  return res.data;
}
