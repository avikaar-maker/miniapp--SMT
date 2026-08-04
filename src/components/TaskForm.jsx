import { useState } from 'react';
import { X } from 'lucide-react';
import { PRIORITIES, STATUSES, PRIORITY_LABELS, STATUS_LABELS } from '../utils/constants';

const emptyForm = {
  title: '',
  description: '',
  priority: PRIORITIES.MEDIUM,
  status: STATUSES.PENDING,
  dueDate: '',
};

function TaskForm({ task, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    task
      ? {
          title: task.title,
          description: task.description || '',
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate || '',
        }
      : emptyForm
  );
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        dueDate: form.dueDate || null,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="btn btn--icon" onClick={onCancel} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add details about this task..."
              rows={3}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
                {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={form.status} onChange={handleChange}>
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="modal__actions">
            <button type="button" className="btn btn--secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
