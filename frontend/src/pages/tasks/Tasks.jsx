import { useEffect } from "react";
import {  Plus, Search } from "lucide-react";
import { useState, useRef } from "react";
import RecentTaskCard from "../../components/dashboard/RecentTaskCard";
import CreateTaskModal from "../../components/dashboard/tasks/CreateTaskModal";
import EmptyTasksState from "../../components/dashboard/tasks/EmptyTasksState";
import DeleteConfirmModal from "../../components/dashboard/tasks/DeleteConfirmModal";
import api from "../../services/api";

export default function Tasks() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [openModal, setOpenModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [deleteTask, setDeleteTask] = useState(null);

    const recentTasksRef = useRef(null);

   const handleCreateTask = async (taskData) => {
        if (editingTask) {
            const res = await api.put(`/tasks/${editingTask._id}`, taskData);
            setTasks(prev =>
            prev.map(t => (t._id === editingTask._id ? res.data.task : t))
            );
        } else {
            const res = await api.post("/tasks", taskData);
            setTasks(prev => [res.data.task, ...prev]);
        }

        setOpenModal(false);
        setEditingTask(null);
    };


  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpenModal(true);
  };


  const handleDeleteTask = async (task) => {
    try {
      await api.delete(`/tasks/${task._id}`);
      setTasks(prev => prev.filter(t => t._id !== task._id));
      setDeleteTask(null);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
      console.log("deleteTask:", deleteTask);
    }, [deleteTask]);
  
  
  
  
    
    useEffect(() => {
    const fetchTasks = async () => {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    };
    fetchTasks();
  }, []);
  

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

    const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
    });





  return (
    <div className="flex bg-gray-50 min-h-screen">
      

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              Tasks
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage and organize your tasks
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 cursor-pointer"
          >
            <Plus size={16} />
            New Task
          </button>
        </div>

        
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mt-8">
        {/* Search */}
        <div className="flex-1 relative">
            <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search/>
            </span>
        </div>

        {/* Status Filter */}
        <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm"
        >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>

        {/* Priority Filter */}
        <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm"
        >
            <option value="all">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        </div>



        {/* Recent Tasks */}
        <div ref={recentTasksRef} className="mt-10">
          <div className="flex justify-between items-center mb-4">
            

          </div>

          {filteredTasks.length === 0 ? (

            <EmptyTasksState onCreate={() => setOpenModal(true)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (

                <RecentTaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={(task) => setDeleteTask(task)}
                />
              ))}
            </div>


          )}
        </div>

        <CreateTaskModal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
            setEditingTask(null);
          }}
          onCreate={handleCreateTask}
          editingTask={editingTask}
        />
        <DeleteConfirmModal
          isOpen={!!deleteTask}
          task={deleteTask}
          onClose={() => setDeleteTask(null)}
          onConfirm={handleDeleteTask}
        />


      </main>
    </div>
  );
}
