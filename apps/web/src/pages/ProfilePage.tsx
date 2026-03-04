import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import * as api from "@/lib/api";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";

type ToastState = {
  message: string;
  type: "error" | "success";
};

export default function ProfilePage(): React.ReactElement {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAvatarUrl(user.avatarUrl ?? "");
    }
  }, [user]);

  const dismissToast = useCallback(() => setToast(null), []);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setToast(null);
    if (!user) return;

    const payload: api.UpdateProfilePayload = {};
    if (name.trim() !== user.name) payload.name = name.trim();
    if (avatarUrl !== (user.avatarUrl ?? "")) {
      payload.avatarUrl = avatarUrl.trim() || null;
    }

    if (Object.keys(payload).length === 0) {
      setToast({ message: "No changes to save", type: "error" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.updateProfile(payload);
      updateUser(res.user);
      setToast({ message: "Profile updated", type: "success" });
    } catch (err) {
      const msg =
        err instanceof api.ApiError
          ? (typeof err.message === "string" && !err.message.includes("[object Object]")
              ? err.message
              : "Update failed")
          : "Update failed";
      setToast({ message: msg, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" className="text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={dismissToast} />
      )}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Gather</h1>
          <Link
            to="/dashboard"
            className="text-sm text-blue-600 hover:underline"
          >
            Back to dashboard
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-md w-full mx-auto px-4 py-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-6 py-8 space-y-4"
          noValidate
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              disabled
              readOnly
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <input
              id="avatarUrl"
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting && <Spinner size="sm" />}
            {submitting ? "Saving..." : "Save changes"}
          </button>
        </form>
      </main>
    </div>
  );
}
