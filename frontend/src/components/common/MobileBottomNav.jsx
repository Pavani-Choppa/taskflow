import { NavLink, useNavigate } from "react-router-dom";
import { LayoutGrid, CheckSquare, User, LogOut } from "lucide-react";

export default function MobileBottomNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const base =
    "flex flex-col items-center justify-center text-xs gap-1 flex-1 py-2";
  const active = "text-teal-500";
  const inactive = "text-slate-400";

  return (
    // <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-white/10 flex">
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-slate-900 border-t border-white/10 flex py-3">

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${base} ${isActive ? active : inactive}`
        }
      >
        <LayoutGrid size={18} />
        Dashboard
      </NavLink>

      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          `${base} ${isActive ? active : inactive}`
        }
      >
        <CheckSquare size={18} />
        Tasks
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${base} ${isActive ? active : inactive}`
        }
      >
        <User size={18} />
        Profile
      </NavLink>

      <button
        onClick={handleLogout}
        className={`${base} text-red-400`}
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
