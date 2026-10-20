import { API_BASE_URL, getAuthHeaders } from "../config/api";

export interface AdminUser {
  id: number;
  email: string;
  name: string;
}

export interface BackendEvent {
  id: number;
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  event_type: "academic" | "sports" | "cultural" | "meeting" | "holiday" | "other";
  status: "active" | "cancelled" | "completed";
  max_participants: number | null;
  current_participants: number;
  image_url?: string | null;
  created_by?: number;
  created_by_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DonationRecord {
  id: number;
  donor_name: string;
  donor_email: string;
  donor_phone: string | null;
  amount: string | number;
  currency: string;
  donation_purpose: string;
  message: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  payment_status: "pending" | "success" | "failed" | "refunded";
  payment_method: string | null;
  receipt_number: string | null;
  created_at: string;
  payment_completed_at: string | null;
}

export interface DonationStats {
  total_donations: number;
  success_count: number;
  pending_count: number;
  failed_count: number;
  total_collected: number;
  average_donation: number;
}

export const adminApi = {
  // Login
  login: async (username: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Invalid credentials");
    }
    return data.data; // { token, user }
  },

  // Check auth
  checkAuth: async () => {
    const res = await fetch(`${API_BASE_URL}/api/auth/check.php`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Request password reset email
  forgotPassword: async (email: string) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to process request");
    }
    return data;
  },

  // Verify password reset token
  verifyResetToken: async (token: string) => {
    const res = await fetch(
      `${API_BASE_URL}/api/auth/reset-password.php?token=${encodeURIComponent(token)}`
    );
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Invalid or expired token");
    }
    return data;
  },

  // Submit new password
  resetPassword: async (token: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/reset-password.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to reset password");
    }
    return data;
  },

  // Logout
  logout: async () => {
    localStorage.removeItem("jmmt_admin_token");
    localStorage.removeItem("jmmt_admin_user");
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout.php`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
    } catch {
      // Ignore network failure on logout
    }
  },

  // Events CRUD
  getEvents: async (params?: { type?: string; status?: string; upcoming?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.type && params.type !== "all") query.set("type", params.type);
    if (params?.status && params.status !== "all") query.set("status", params.status);
    if (params?.upcoming) query.set("upcoming", "true");

    const qs = query.toString() ? `?${query.toString()}` : "";
    const res = await fetch(`${API_BASE_URL}/api/events/index.php${qs}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch events");
    }
    return data.data as BackendEvent[];
  },

  createEvent: async (eventData: Partial<BackendEvent>) => {
    const res = await fetch(`${API_BASE_URL}/api/events/index.php`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to create event");
    }
    return data.data as BackendEvent;
  },

  updateEvent: async (id: number, eventData: Partial<BackendEvent>) => {
    const res = await fetch(`${API_BASE_URL}/api/events/index.php?id=${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to update event");
    }
    return data.data as BackendEvent;
  },

  deleteEvent: async (id: number) => {
    const res = await fetch(`${API_BASE_URL}/api/events/index.php?id=${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to delete event");
    }
    return data;
  },

  // Donations List
  getDonations: async (params?: { status?: string; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.status && params.status !== "all") query.set("status", params.status);
    if (params?.search) query.set("search", params.search);

    const qs = query.toString() ? `?${query.toString()}` : "";
    const res = await fetch(`${API_BASE_URL}/api/donations/index.php${qs}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch donations");
    }
    return data.data as { stats: DonationStats; donations: DonationRecord[] };
  },

  // Upload event image → returns public URL like /uploads/events/event_xxx.jpg
  uploadEventImage: async (file: File): Promise<string> => {
    const token = localStorage.getItem("jmmt_admin_token");
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API_BASE_URL}/api/events/upload.php`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to upload image");
    }
    return data.url as string; // e.g. "/uploads/events/event_1729352000_abc123.jpg"
  },
};
