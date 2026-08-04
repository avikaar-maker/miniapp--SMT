import { Plus, Search, Filter } from 'lucide-react';
import TaskCard from './TaskCard';
import { STATUS_LABELS } from '../utils/constants';

function TaskList({
  tasks,
  loading,
  filter,
  search,
  onFilterChange,
  onSearchChange,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
}) {
  return (
    <section className="task-section">
      <div className="task-section__header">
        <h2>My Tasks</h2>
        <button className="btn btn--primary" onClick={onAddTask}>
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <div className="task-filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={18} />
          <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
            <option value="ALL">All Status</option>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="task-list task-list--loading">
          {[1, 2, 3].map((i) => (
            <div key={i} className="task-card task-card--skeleton" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found. Create your first task to get started!</p>
          <button className="btn btn--primary" onClick={onAddTask}>
            <Plus size={18} />
            Create Task
          </button>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;
