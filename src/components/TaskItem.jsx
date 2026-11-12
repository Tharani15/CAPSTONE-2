import './TaskItem.css';

/**
 * TaskItem Component
 * Renders a single row in the tasks table.
 * Demonstrates reusable component with props & component communication (onEdit, onDelete).
 */
export default function TaskItem({ task, onEdit, onDelete }) {
  const isCompleted = task.status.toLowerCase() === 'completed';

  return (
    <tr className="task-row">
      {/* Title */}
      <td className="task-cell title-cell">{task.title}</td>

      {/* Description */}
      <td className="task-cell desc-cell">{task.description || '—'}</td>

      {/* Status */}
      <td className="task-cell status-cell">
        <span className={isCompleted ? 'status-completed' : 'status-pending'}>
          {task.status}
        </span>
      </td>

      {/* Actions */}
      <td className="task-cell actions-cell">
        <button
          type="button"
          className="action-link edit-link"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          type="button"
          className="action-link delete-link"
          onClick={() => onDelete(task)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

