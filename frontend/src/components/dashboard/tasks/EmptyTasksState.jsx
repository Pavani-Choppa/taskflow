import { ListChecks, Plus } from "lucide-react";

export default function EmptyTasksState({ onCreate }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
        <ListChecks size={24} />
      </div>

      <h3 className="text-lg font-semibold text-slate-900">
        No tasks yet
      </h3>

      <p className="text-sm text-slate-500 mt-1">
        Create your first task to get started
      </p>

      <button
        onClick={onCreate}
        className="mt-5 inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
      >
        <Plus size={16} />
        Create Task
      </button>
    </div>
  );
}
