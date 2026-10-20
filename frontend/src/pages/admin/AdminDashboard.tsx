import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  LayoutDashboard,
  Calendar,
  Heart,
  LogOut,
  Menu,
  X,
  Plus,
  Pencil,
  Trash2,
  Search,
  CheckCircle,
  IndianRupee,
  AlertTriangle,
  Upload,
} from "lucide-react";
import { adminApi, BackendEvent, DonationRecord, DonationStats } from "../../services/adminApi";
import AdminLogin from "./AdminLogin";
import jmmsBadge from "../../assets/jmms-badge.svg";

// ─── Types ──────────────────────────────────────────────────────────────────

interface AdminUser {
  id: number;
  email: string;
  name: string;
}

type NavPage = "dashboard" | "events" | "donations";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

// ─── Toast Component ─────────────────────────────────────────────────────────

const ToastContainer: React.FC<{ toasts: Toast[]; dismiss: (id: number) => void }> = ({
  toasts,
  dismiss,
}) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium pointer-events-auto transition-all duration-300 ${
            t.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {t.type === "success" ? (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{t.message}</span>
          <button
            onClick={() => dismiss(t.id)}
            className="ml-2 opacity-70 hover:opacity-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

// ─── Event Modal ─────────────────────────────────────────────────────────────

interface EventFormData {
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  event_type: BackendEvent["event_type"];
  status: BackendEvent["status"];
  image_url: string;
}

const defaultForm: EventFormData = {
  title: "",
  description: "",
  event_date: "",
  start_time: "09:00",
  end_time: "14:00",
  location: "",
  event_type: "academic",
  status: "active",
  image_url: "",
};

interface EventModalProps {
  event: BackendEvent | null;
  onClose: () => void;
  onSave: (data: EventFormData) => Promise<void>;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, onSave }) => {
  const [form, setForm] = useState<EventFormData>(
    event
      ? {
          title: event.title || "",
          description: event.description || "",
          event_date: event.event_date || "",
          start_time: event.start_time?.slice(0, 5) || "09:00",
          end_time: event.end_time?.slice(0, 5) || "14:00",
          location: event.location || "",
          event_type: event.event_type || "academic",
          status: event.status || "active",
          image_url: event.image_url || "",
        }
      : defaultForm
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(event?.image_url || "");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 12 * 1024 * 1024) {
      setUploadError("Image must be smaller than 12 MB.");
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setUploadError(null);
    setUploadingImage(true);

    try {
      const uploadedUrl = await adminApi.uploadEventImage(file);
      setForm((prev) => ({ ...prev, image_url: uploadedUrl }));
      setImagePreview(uploadedUrl);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, image_url: "" }));
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadingImage) {
      setError("Please wait for image upload to complete.");
      return;
    }
    setError(null);
    if (!form.title.trim() || !form.event_date) {
      setError("Title and date are required.");
      return;
    }
    setSaving(true);
    try {
      await onSave(form);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save event.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-[#1E2A44]">
            {event ? "Edit Event" : "Add New Event"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923]"
              placeholder="Event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923] resize-none"
              placeholder="Event description"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                name="event_date"
                value={form.event_date}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="time"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                name="end_time"
                value={form.end_time}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923]"
              placeholder="Event location"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="event_type"
                value={form.event_type}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923]"
              >
                <option value="academic">Academic</option>
                <option value="sports">Sports</option>
                <option value="cultural">Cultural</option>
                <option value="meeting">Meeting</option>
                <option value="holiday">Holiday</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923]"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Image
            </label>

            {imagePreview ? (
              <div className="rounded-lg border border-gray-200 overflow-hidden bg-gray-50 p-2.5">
                <div className="relative h-44 w-full rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Event preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/600x400?text=Image+Preview";
                    }}
                  />
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-[#1E2A44]/70 flex flex-col items-center justify-center text-white text-xs font-semibold gap-2 backdrop-blur-xs">
                      <svg
                        className="animate-spin h-6 w-6 text-[#E8B923]"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Uploading image to server...
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-2.5 pt-1 px-1">
                  <span className="text-xs text-gray-500 truncate max-w-[280px]">
                    {form.image_url || "Image selected"}
                  </span>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="text-xs font-semibold text-[#1E2A44] hover:text-[#E8B923] transition disabled:opacity-50"
                    >
                      Change Image
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={uploadingImage}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 transition disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 hover:border-[#E8B923] rounded-lg p-5 flex flex-col items-center justify-center gap-2 cursor-pointer bg-gray-50/60 hover:bg-[#E8B923]/5 transition group"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-[#E8B923] group-hover:border-[#E8B923] transition">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-[#1E2A44]">
                    Click to browse and upload image
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Supports JPG, PNG, WebP (up to 12 MB)
                  </p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />

            {uploadError && (
              <p className="text-xs text-red-600 font-medium mt-1.5">{uploadError}</p>
            )}

            <div className="mt-2">
              <details className="text-xs text-gray-500">
                <summary className="cursor-pointer hover:text-gray-700 select-none">
                  Or enter image URL manually
                </summary>
                <input
                  type="text"
                  name="image_url"
                  value={form.image_url}
                  onChange={(e) => {
                    handleChange(e);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1.5 w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#E8B923]"
                />
              </details>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 bg-[#1E2A44] text-white text-sm font-semibold rounded-lg hover:bg-[#2a3a5c] disabled:opacity-60 transition flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving…
                </>
              ) : (
                "Save Event"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Delete Confirm Modal ────────────────────────────────────────────────────

interface DeleteModalProps {
  eventTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  deleting: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ eventTitle, onConfirm, onCancel, deleting }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <Trash2 className="w-5 h-5 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Delete Event</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-gray-900">"{eventTitle}"</span>? This action cannot be
        undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          disabled={deleting}
          className="flex-1 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 disabled:opacity-60 transition flex items-center justify-center gap-2"
        >
          {deleting ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Deleting…
            </>
          ) : (
            "Delete"
          )}
        </button>
        <button
          onClick={onCancel}
          disabled={deleting}
          className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

// ─── Status / Type Badge ─────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    refunded: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

const TypeBadge: React.FC<{ type: string }> = ({ type }) => {
  const map: Record<string, string> = {
    academic: "bg-blue-100 text-blue-700",
    sports: "bg-orange-100 text-orange-700",
    cultural: "bg-purple-100 text-purple-700",
    meeting: "bg-gray-100 text-gray-700",
    holiday: "bg-green-100 text-green-700",
    other: "bg-slate-100 text-slate-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${map[type] || "bg-gray-100 text-gray-600"}`}>
      {type}
    </span>
  );
};

// ─── Dashboard Overview Page ─────────────────────────────────────────────────

interface DashboardOverviewProps {
  user: AdminUser;
  onNavigate: (page: NavPage) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ user, onNavigate }) => {
  const [events, setEvents] = useState<BackendEvent[]>([]);
  const [donationStats, setDonationStats] = useState<DonationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [evts, donData] = await Promise.all([
          adminApi.getEvents(),
          adminApi.getDonations(),
        ]);
        setEvents(evts);
        setDonationStats(donData.stats);
      } catch {
        // silently fail; show zeros
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const activeEvents = events.filter((e) => e.status === "active").length;

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  const statCards = [
    {
      label: "Total Events",
      value: loading ? "—" : events.length.toString(),
      icon: <Calendar className="w-6 h-6" />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Events",
      value: loading ? "—" : activeEvents.toString(),
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Total Donations",
      value: loading ? "—" : (donationStats?.total_donations ?? 0).toString(),
      icon: <Heart className="w-6 h-6" />,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      label: "Total Amount",
      value: loading ? "—" : formatINR(donationStats?.total_collected ?? 0),
      icon: <IndianRupee className="w-6 h-6" />,
      color: "text-[#E8B923]",
      bg: "bg-yellow-50",
    },
  ];

  const recentEvents = [...events]
    .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-[#1E2A44]">
          Welcome back, {user.name.split(" ")[0]}! 👋
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Here's what's happening at John Martyn Memorial School.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center flex-shrink-0`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-xl font-bold text-[#1E2A44]">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate("events")}
            className="flex items-center gap-2 px-4 py-2 bg-[#E8B923] text-[#1E2A44] font-semibold rounded-lg text-sm hover:bg-yellow-400 transition"
          >
            <Plus className="w-4 h-4" /> Add New Event
          </button>
          <button
            onClick={() => onNavigate("events")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-50 transition"
          >
            <Calendar className="w-4 h-4" /> View All Events
          </button>
          <button
            onClick={() => onNavigate("donations")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-50 transition"
          >
            <Heart className="w-4 h-4" /> View Donations
          </button>
        </div>
      </div>

      {/* Recent events */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Recent Events
        </h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-10 text-center text-gray-400 text-sm">Loading events…</div>
          ) : recentEvents.length === 0 ? (
            <div className="py-10 text-center text-gray-400 text-sm">No events found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium text-[#1E2A44]">{evt.title}</td>
                      <td className="px-4 py-3">
                        <TypeBadge type={evt.event_type} />
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(evt.event_date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={evt.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Events Management Page ───────────────────────────────────────────────────

interface EventsManagementProps {
  showToast: (message: string, type: "success" | "error") => void;
}

const EventsManagement: React.FC<EventsManagementProps> = ({ showToast }) => {
  const [events, setEvents] = useState<BackendEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingEvent, setEditingEvent] = useState<BackendEvent | null | undefined>(undefined); // undefined = closed
  const [deletingEvent, setDeletingEvent] = useState<BackendEvent | null>(null);
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getEvents({
        type: typeFilter !== "all" ? typeFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      setEvents(data);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to load events.", "error");
    } finally {
      setLoading(false);
    }
  }, [typeFilter, statusFilter, showToast]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.location || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (formData: EventFormData) => {
    const payload: Partial<BackendEvent> = {
      title: formData.title,
      description: formData.description,
      event_date: formData.event_date,
      start_time: formData.start_time || "09:00:00",
      end_time: formData.end_time || formData.start_time || "14:00:00",
      location: formData.location || "JMMS Campus, Salangaon",
      event_type: formData.event_type,
      status: formData.status,
      image_url: formData.image_url || null,
    };

    if (editingEvent && editingEvent.id) {
      await adminApi.updateEvent(editingEvent.id, payload);
      showToast("Event updated successfully!", "success");
    } else {
      await adminApi.createEvent(payload);
      showToast("Event created successfully!", "success");
    }
    setEditingEvent(undefined);
    loadEvents();
  };

  const handleDelete = async () => {
    if (!deletingEvent) return;
    setDeleteInProgress(true);
    try {
      await adminApi.deleteEvent(deletingEvent.id);
      showToast("Event deleted.", "success");
      setDeletingEvent(null);
      loadEvents();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to delete event.", "error");
    } finally {
      setDeleteInProgress(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E2A44]">Events Management</h2>
          <p className="text-gray-500 text-sm mt-0.5">Create, edit, and manage school events.</p>
        </div>
        <button
          onClick={() => setEditingEvent(null)}
          className="flex items-center gap-2 px-4 py-2 bg-[#E8B923] text-[#1E2A44] font-semibold rounded-lg text-sm hover:bg-yellow-400 transition"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923]"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923]"
        >
          <option value="all">All Types</option>
          <option value="academic">Academic</option>
          <option value="sports">Sports</option>
          <option value="cultural">Cultural</option>
          <option value="meeting">Meeting</option>
          <option value="holiday">Holiday</option>
          <option value="other">Other</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923]"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-400 text-sm">Loading events…</div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No events match your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-[#1E2A44]">
                      <div>{evt.title}</div>
                      {evt.location && (
                        <div className="text-xs text-gray-400 mt-0.5">{evt.location}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <TypeBadge type={evt.event_type} />
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(evt.event_date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={evt.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingEvent(evt)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingEvent(evt)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {editingEvent !== undefined && (
        <EventModal
          event={editingEvent}
          onClose={() => setEditingEvent(undefined)}
          onSave={handleSave}
        />
      )}
      {deletingEvent && (
        <DeleteModal
          eventTitle={deletingEvent.title}
          onConfirm={handleDelete}
          onCancel={() => setDeletingEvent(null)}
          deleting={deleteInProgress}
        />
      )}
    </div>
  );
};

// ─── Donations Page ───────────────────────────────────────────────────────────

interface DonationsPageProps {
  showToast: (message: string, type: "success" | "error") => void;
}

const DonationsPage: React.FC<DonationsPageProps> = ({ showToast }) => {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminApi.getDonations();
        setDonations(data.donations);
        setStats(data.stats);
      } catch (err: unknown) {
        showToast(err instanceof Error ? err.message : "Failed to load donations.", "error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [showToast]);

  const formatINR = (amount: number | string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const statCards = [
    {
      label: "Total Donations",
      value: loading ? "—" : (stats?.total_donations ?? 0).toString(),
      icon: <Heart className="w-6 h-6" />,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      label: "Total Amount",
      value: loading ? "—" : formatINR(stats?.total_collected ?? 0),
      icon: <IndianRupee className="w-6 h-6" />,
      color: "text-[#E8B923]",
      bg: "bg-yellow-50",
    },
    {
      label: "Average Donation",
      value: loading ? "—" : formatINR(stats?.average_donation ?? 0),
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1E2A44]">Donation Records</h2>
        <p className="text-gray-500 text-sm mt-0.5">Track and review all donation transactions.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center flex-shrink-0`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-xl font-bold text-[#1E2A44]">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-400 text-sm">Loading donations…</div>
        ) : donations.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No donation records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Donor</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Purpose</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {donations.map((don) => (
                  <tr key={don.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-[#1E2A44]">{don.donor_name}</td>
                    <td className="px-4 py-3 text-gray-500">{don.donor_email}</td>
                    <td className="px-4 py-3 font-semibold text-[#1E2A44]">
                      {formatINR(don.amount)}
                    </td>
                    <td className="px-4 py-3 text-gray-500 capitalize">{don.donation_purpose}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(don.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={don.payment_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main AdminDashboard ──────────────────────────────────────────────────────

const AdminDashboard: React.FC = () => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    try {
      const raw = localStorage.getItem("jmmt_admin_user");
      return raw ? (JSON.parse(raw) as AdminUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("jmmt_admin_token")
  );

  // UI state
  const [activePage, setActivePage] = useState<NavPage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastCounter, setToastCounter] = useState(0);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now() + Math.random();
    setToastCounter((c) => c + 1);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleLogin = (user: AdminUser, tok: string) => {
    setCurrentUser(user);
    setToken(tok);
  };

  const handleLogout = async () => {
    await adminApi.logout();
    localStorage.removeItem("jmmt_admin_token");
    localStorage.removeItem("jmmt_admin_user");
    setCurrentUser(null);
    setToken(null);
  };

  // If not authenticated, show login
  if (!currentUser || !token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const navItems: { id: NavPage; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "events", label: "Events", icon: <Calendar className="w-5 h-5" /> },
    { id: "donations", label: "Donations", icon: <Heart className="w-5 h-5" /> },
  ];

  const pageTitles: Record<NavPage, string> = {
    dashboard: "Dashboard",
    events: "Events Management",
    donations: "Donations",
  };

  const initials = currentUser.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Toast layer */}
      <ToastContainer toasts={toasts} dismiss={dismissToast} key={toastCounter} />

      {/* ── Sidebar ── */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#1E2A44] flex flex-col transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:static lg:z-auto`}
        >
          {/* Logo area */}
          <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E8B923] flex-shrink-0 bg-white p-0.5">
              <img
                src={jmmsBadge}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">JMMT Admin</p>
              <p className="text-white/40 text-xs">Management Portal</p>
            </div>
            {/* Close on mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto text-white/40 hover:text-white lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${
                    activePage === item.id
                      ? "bg-[#E8B923] text-[#1E2A44]"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Bottom user + logout */}
          <div className="px-3 py-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#E8B923] flex items-center justify-center text-[#1E2A44] font-bold text-xs flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-medium truncate">{currentUser.name}</p>
                <p className="text-white/40 text-xs truncate">{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all duration-150"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>
      </>

      {/* ── Main column ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between h-16 px-5 bg-white border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-[#1E2A44] text-lg">{pageTitles[activePage]}</h1>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:block">{currentUser.name}</span>
            <div className="w-9 h-9 rounded-full bg-[#1E2A44] flex items-center justify-center text-white font-bold text-xs">
              {initials}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          {activePage === "dashboard" && (
            <DashboardOverview user={currentUser} onNavigate={setActivePage} />
          )}
          {activePage === "events" && <EventsManagement showToast={showToast} />}
          {activePage === "donations" && <DonationsPage showToast={showToast} />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
