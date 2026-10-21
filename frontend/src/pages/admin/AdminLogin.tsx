import React, { useState, useEffect } from "react";
import { adminApi } from "../../services/adminApi";
import jmmsBadge from "../../assets/jmms-badge.svg";

interface AdminLoginProps {
  onLogin: (user: { id: number; email: string; name: string }, token: string) => void;
}

type ViewMode = "login" | "forgot" | "reset";

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<ViewMode>("login");

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Reset password state
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Shared state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detect reset token from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setResetToken(token);
      setMode("reset");
    }
  }, []);

  // 1. Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    setLoading(true);
    try {
      const data = await adminApi.login(username.trim(), password);
      const { token, user } = data;
      localStorage.setItem("jmmt_admin_token", token);
      localStorage.setItem("jmmt_admin_user", JSON.stringify(user));
      onLogin(user, token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Forgot Password Submit
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const val = forgotEmail.trim();

    if (!val) {
      setError("Please enter your registered email or username.");
      return;
    }

    // If it looks like an email, validate the format
    if (val.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setError("Please enter a valid email address (e.g. admin@school.com).");
        return;
      }
    } else {
      // Username: only alphanumeric, dots, underscores, hyphens; 3–50 chars
      const usernameRegex = /^[a-zA-Z0-9._-]{3,50}$/;
      if (!usernameRegex.test(val)) {
        setError(
          "Username must be 3–50 characters and contain only letters, numbers, dots, underscores, or hyphens."
        );
        return;
      }
    }

    setLoading(true);
    try {
      await adminApi.forgotPassword(forgotEmail.trim());
      setForgotSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Reset Password Submit
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }
    setLoading(true);
    try {
      await adminApi.resetPassword(resetToken, newPassword);
      setResetSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to reset password. Link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E2A44] px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#E8B923] opacity-5" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#E8B923] opacity-5" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Gold top bar */}
          <div className="h-2 bg-[#E8B923]" />

          <div className="px-8 py-10">
            {/* Logo + Name */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#E8B923] shadow-md mb-4 bg-white flex items-center justify-center">
                <img
                  src={jmmsBadge}
                  alt="John Martyn Memorial School Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <h1 className="text-xl font-bold text-[#1E2A44] text-center leading-tight">
                John Martyn Memorial School
              </h1>
              <p className="text-xs text-gray-500 mt-1 tracking-widest uppercase font-semibold">
                {mode === "login"
                  ? "Admin Portal"
                  : mode === "forgot"
                  ? "Password Recovery"
                  : "Reset Password"}
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-5 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            {/* ─── 1. LOGIN VIEW ─── */}
            {mode === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Username / Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923] focus:border-transparent transition"
                      disabled={loading}
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("forgot");
                        setError(null);
                      }}
                      className="text-xs text-[#1E2A44] hover:text-[#E8B923] font-semibold transition"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923] focus:border-transparent transition"
                      disabled={loading}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#1E2A44] text-white font-semibold rounded-lg text-sm hover:bg-[#2a3a5c] disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            )}

            {/* ─── 2. FORGOT PASSWORD VIEW ─── */}
            {mode === "forgot" && (
              <div>
                {forgotSuccess ? (
                  <div className="text-center py-4 space-y-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">Check Your Email</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      If an administrator account matches{" "}
                      <span className="font-semibold text-gray-800">{forgotEmail}</span>, a secure password reset link has been dispatched to your inbox.
                    </p>
                    <p className="text-[11px] text-gray-400">
                      The link expires in 30 minutes. Please check your spam folder if not received.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setForgotSuccess(false);
                        setError(null);
                      }}
                      className="w-full py-2.5 mt-2 bg-gray-100 text-gray-700 font-semibold rounded-lg text-xs hover:bg-gray-200 transition"
                    >
                      ← Return to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      Enter your registered administrator email or username to receive a password reset link.
                    </p>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Admin Email / Username
                      </label>
                      <input
                        type="text"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="admin or admin@school.com"
                        autoComplete="username"
                        spellCheck={false}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923] focus:border-transparent transition"
                        disabled={loading}
                        autoFocus
                      />
                      <p className="mt-1.5 text-[11px] text-gray-400">
                        Must be an exact match to your registered account.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-[#1E2A44] text-white font-semibold rounded-lg text-sm hover:bg-[#2a3a5c] disabled:opacity-60 transition flex items-center justify-center gap-2 mt-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending email…
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError(null);
                      }}
                      className="w-full text-center text-xs font-semibold text-gray-500 hover:text-gray-800 transition py-1"
                    >
                      ← Back to Sign In
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ─── 3. RESET PASSWORD VIEW ─── */}
            {mode === "reset" && (
              <div>
                {resetSuccess ? (
                  <div className="text-center py-4 space-y-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">Password Updated!</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Your administrator password has been updated successfully. You can now log in with your new password.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        // Clear URL params
                        window.history.replaceState({}, document.title, window.location.pathname);
                        setMode("login");
                        setResetSuccess(false);
                        setError(null);
                      }}
                      className="w-full py-2.5 bg-[#E8B923] text-[#1E2A44] font-bold rounded-lg text-sm hover:bg-amber-400 transition"
                    >
                      Proceed to Sign In →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleResetSubmit} className="space-y-4">
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      Please enter and confirm your new administrator password.
                    </p>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="At least 4 characters"
                          className="w-full pl-3.5 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923] focus:border-transparent transition"
                          disabled={loading}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
                        >
                          {showNewPassword ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B923] focus:border-transparent transition"
                        disabled={loading}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-[#1E2A44] text-white font-semibold rounded-lg text-sm hover:bg-[#2a3a5c] disabled:opacity-60 transition flex items-center justify-center gap-2 mt-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Updating password…
                        </>
                      ) : (
                        "Save New Password"
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} John Martyn Memorial School. All rights reserved.
            </p>
          </div>
        </div>

        {/* Gold accent line */}
        <div className="mt-6 text-center">
          <span className="text-[#E8B923] text-xs opacity-60 tracking-widest uppercase">Secure Admin Access</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
