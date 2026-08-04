import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import StatsCards from '../components/StatsCards';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { taskService } from '../services/taskService';
import { getErrorMessage } from '../utils/helpers';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await taskService.getAll();
      setTasks(response.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await taskService.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  const refreshData = () => {
    fetchTasks();
    fetchStats();
  };

  const handleCreateTask = async (data) => {
    try {
      await taskService.create(data);
      toast.success('Task created successfully!');
      setShowForm(false);
      refreshData();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleUpdateTask = async (data) => {
    try {
      await taskService.update(editingTask.id, data);
      toast.success('Task updated successfully!');
      setEditingTask(null);
      refreshData();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.delete(id);
      toast.success('Task deleted');
      refreshData();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await taskService.updateStatus(id, status);
      refreshData();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === 'ALL' || task.status === filter;
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dashboard">
      <Navbar />
      <main className="dashboard__content">
        <div className="dashboard__intro">
          <h1>Productivity Dashboard</h1>
          <p>Track your tasks, prioritize work, and stay on top of deadlines.</p>
        </div>

        <StatsCards stats={stats} loading={statsLoading} />

        <TaskList
          tasks={filteredTasks}
          loading={loading}
          filter={filter}
          search={search}
          onFilterChange={setFilter}
          onSearchChange={setSearch}
          onAddTask={() => setShowForm(true)}
          onEditTask={setEditingTask}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      </main>

      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
