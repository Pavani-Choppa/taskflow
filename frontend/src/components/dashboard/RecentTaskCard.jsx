import { Calendar, Clock, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function RecentTaskCard({ task, onEdit, onDelete }) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!task) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 border">
            {task.status}
          </span>
          <span className="text-xs px-2 py-1 rounded-full border">
            {task.priority}
          </span>
        </div>

        {/* 3 dots */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-1 rounded-md hover:bg-slate-100"
          >
            <MoreVertical size={18} className="text-slate-500" />
          </button>

          {/* Dropdown */}
          {openMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-lg z-20">
              <button
                onClick={() => {
                  setOpenMenu(false);
                  onEdit(task);
                }}
                className="w-full flex items-center gap-2 px-3 py-2  text-sm hover:bg-slate-100 text-slate-700 p-10"
              >
                <Pencil size={14} />
                Edit
              </button>

              <button
                onClick={() => {
                  setOpenMenu(false);
                  onDelete(task)


                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-50 text-red-600 p-4"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="mt-3 font-semibold text-lg">{task.title}</h3>

      {task.description && (
        <p className="text-sm text-slate-500 mt-1 break-words line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex gap-4 text-xs text-slate-500 mt-4">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          {task.dueDate || "No due date"}
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          Just now
        </div>
      </div>
    </div>
  );
}
