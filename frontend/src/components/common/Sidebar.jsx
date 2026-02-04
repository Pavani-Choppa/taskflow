import { NavLink } from "react-router-dom";
import { LayoutGrid, CheckSquare, User, Zap, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

export default function Sidebar({ isOpen, onClose }) {


    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to load sidebar user", err);
      }
    };

    fetchUser();
  }, []);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();


  const linkBase =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition";

  const active =
    "bg-teal-600/20 text-teal-400";

  const inactive =
    "text-slate-300 hover:bg-white/5";

  return (
    <aside className="hidden md:flex w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen flex-col justify-between">

      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 text-lg font-semibold">
          <div className="w-8 h-8 rounded-md bg-teal-500 flex items-center justify-center">
            <Zap size={18} />
          </div>
          TaskFlow
        </div>

        {/* Menu */}
        <nav className="mt-6 space-y-1 px-4">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            <LayoutGrid size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            <CheckSquare size={18} />
            Tasks
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            <User size={18} />
            Profile
          </NavLink>
        </nav>
      </div>

      {/* USER INFO */}
      <div className="px-4 py-4 border-t border-white/10">
        {user ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center font-semibold uppercase">
                {initials}
              </div>

              <div className="leading-tight">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-md hover:bg-white/10 text-slate-400 hover:text-red-400 transition"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <p className="text-xs text-slate-400">Loading user...</p>
        )}
      </div>

    </aside>
  );
}
