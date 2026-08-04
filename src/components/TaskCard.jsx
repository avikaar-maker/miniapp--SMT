import { Calendar, Edit2, Trash2, AlertCircle } from 'lucide-react';
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  PRIORITY_COLORS,
  STATUS_COLORS,
  STATUSES,
} from '../utils/constants';
import { formatDate, isOverdue } from '../utils/helpers';

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const overdue = isOverdue(task.dueDate, task.status);

  const cycleStatus = () => {
    const order = [STATUSES.PENDING, STATUSES.IN_PROGRESS, STATUSES.COMPLETED];
    const currentIndex = order.indexOf(task.status);
    const nextStatus = order[(currentIndex + 1) % order.length];
    onStatusChange(task.id, nextStatus);
  };

  return (
    <article className={`task-card ${task.status === STATUSES.COMPLETED ? 'task-card--completed' : ''}`}>
      <div className="task-card__header">
        <button
          className={`task-checkbox ${task.status === STATUSES.COMPLETED ? 'task-checkbox--checked' : ''}`}
          onClick={cycleStatus}
          title="Click to update status"
          aria-label="Toggle task status"
        />
        <div className="task-card__title-group">
          <h3 className="task-card__title">{task.title}</h3>
          {task.description && (
            <p className="task-card__description">{task.description}</p>
          )}
        </div>
      </div>

      <div className="task-card__meta">
        <span className={`badge ${PRIORITY_COLORS[task.priority]}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
        <span className={`badge ${STATUS_COLORS[task.status]}`}>
          {STATUS_LABELS[task.status]}
        </span>
        {task.dueDate && (
          <span className={`task-card__due ${overdue ? 'task-card__due--overdue' : ''}`}>
            {overdue ? <AlertCircle size={14} /> : <Calendar size={14} />}
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      <div className="task-card__actions">
        <button className="btn btn--icon btn--ghost" onClick={() => onEdit(task)} title="Edit">
          <Edit2 size={16} />
        </button>
        <button className="btn btn--icon btn--ghost btn--danger" onClick={() => onDelete(task.id)} title="Delete">
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
