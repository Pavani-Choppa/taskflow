import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { List, CheckCircle, Clock, AlertCircle, Plus } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import RecentTaskCard from "../../components/dashboard/RecentTaskCard";
import CreateTaskModal from "../../components/dashboard/tasks/CreateTaskModal";
import EmptyTasksState from "../../components/dashboard/tasks/EmptyTasksState";
import DeleteConfirmModal from "../../components/dashboard/tasks/DeleteConfirmModal";

import api from "../../services/api";


export default function Dashboard() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [user, setUser] = useState(null);

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
      const fetchUser = async () => {
        try {
          const res = await api.get("/me"); // protected route
          setUser(res.data.user);
        } catch (err) {
          console.error("Failed to fetch user", err);
        }
      };

      fetchUser();
    }, []);



  
  useEffect(() => {
  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data.tasks);
  };
  fetchTasks();
}, []);

    const getGreeting = () => {
      const hour = new Date().getHours();

      if (hour < 12) return "Good morning";
      if (hour < 17) return "Good afternoon";
      if (hour < 21) return "Good evening";
      return "Good night";
    };



  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* <Sidebar /> */}

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              {getGreeting()},
              <span className="uppercase ml-1">
                {user?.name || "User"}!
              </span>
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Here's what's happening with your tasks today.
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

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-6 mt-8">
          <StatCard
            title="Total Tasks"
            value={tasks.length}
            icon={<List size={18} />}
            bg="bg-slate-100"
          />
          <StatCard
            title="Completed"
            value={tasks.filter(t => t.status === "Completed").length}
            icon={<CheckCircle size={18} className="text-green-500" />}
            bg="bg-green-100"
          />
          <StatCard
            title="In Progress"
            value={tasks.filter(t => t.status === "In Progress").length}
            icon={<Clock size={18} className="text-teal-500" />}
            bg="bg-teal-100"
          />
          <StatCard
            title="Pending"
            value={tasks.filter(t => t.status === "Pending").length}
            icon={<AlertCircle size={18} className="text-orange-500" />}
            bg="bg-orange-100"
          />
        </div>

        {/* Recent Tasks */}
        <div ref={recentTasksRef} className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Recent Tasks</h2>
            <button
              onClick={() => navigate("/tasks")}
              className="text-teal-600 text-sm hover:underline"
            >
              View all →
            </button>

          </div>

          {tasks.length === 0 ? (
            <EmptyTasksState onCreate={() => setOpenModal(true)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
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
