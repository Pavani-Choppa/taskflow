import { useState, useEffect } from "react";
import { User, Save } from "lucide-react";
import api from "../../services/api"; // axios instance

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch profile from backend
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await api.get("/me"); // ✅ FIXED
      setUser(res.data.user);
      setName(res.data.user.name);
    } catch (err) {
      console.error(
        "Failed to load profile",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);


    

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await api.put("/me", { name });
      setUser(res.data.user);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-8">Loading profile...</p>;
  }

  if (!user) {
    return <p className="p-8 text-red-500">Failed to load profile</p>;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">

      <main className="flex-1 p-8">
        <div className="max-w-2xl bg-white rounded-xl border border-slate-200 p-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-white text-xl font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>

          <hr className="my-6" />

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Full Name
            </label>

            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            ) : (
              <p className="text-slate-900">{user.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
            <p className="text-slate-900">{user.email}</p>
            <p className="text-xs text-slate-400 mt-1">
              Email cannot be changed
            </p>
          </div>

          {/* Member Since */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Member Since
            </label>
            <p className="text-slate-900">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
                >
                  <Save size={16} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => {
                    setIsEditing(false);
                    setName(user.name);
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-300 hover:cursor-pointer"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 cursor-pointer"
              >
                <User size={16} />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
