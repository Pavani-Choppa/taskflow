import { Trash2 } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, task }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl w-full max-w-md p-6 shadow-xl z-10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <Trash2 size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Delete Task
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Are you sure you want to delete{" "}
              <span className="font-medium">"{task.title}"</span>?  
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(task)}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
