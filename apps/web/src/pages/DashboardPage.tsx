import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage(): React.ReactElement {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Gather</h1>
          <div className="flex items-center gap-4">
            <Link to="/profile" className="text-sm text-blue-600 hover:underline">
              Profile
            </Link>
            <span className="text-sm text-gray-600">{user?.name ?? user?.email}</span>
            <button
              onClick={() => logout()}
              className="text-sm text-blue-600 hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Welcome</h2>
          <p className="text-gray-600">
            You&apos;re logged in as {user?.email}. This is your dashboard placeholder.
          </p>
        </div>
      </main>
    </div>
  );
}
