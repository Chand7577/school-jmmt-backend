// Base backend API URL
// Uses VITE_BACKEND_URL in local dev (e.g. http://localhost:8000)
// On Hostinger, frontend and backend share the same domain → use relative URLs ("")
export const API_BASE_URL: string =
  import.meta.env.VITE_BACKEND_URL || "";

// Helper to get authenticated headers
export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("jmmt_admin_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};
