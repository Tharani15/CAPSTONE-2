import React from 'react';
import {
  Clock,
  ArrowRight,
  Calendar,
  Pencil,
  Trash2,
  CheckCircle2,
  Plus
} from 'lucide-react';

export default function PendingTasksPage({
  tasks,
  onNavigateTab,
  onOpenCreateModal,
  onOpenEditModal,
  onOpenDeleteModal,
  onToggleStatus
}) {
  const pendingTasks = tasks.filter((t) => t.status === 'PENDING');

  const formatDueDate = (dateStr) => {
    if (!dateStr) return 'No Date';
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    if (dateStr === today) return 'Today';
    if (dateStr === tomorrow) return 'Tomorrow';

    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="page-container">
      {/* 1. Header */}
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-badge" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
            <Clock size={24} />
          </div>
          <div className="page-title-text">
            <h1>Pending Tasks</h1>
            <p>Tasks that are not yet completed.</p>
          </div>
        </div>

        <button className="btn-primary" onClick={() => onNavigateTab('all-tasks')}>
          <span>View All Tasks</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* 2. List of Cards */}
      {pendingTasks.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon-circle">
            <CheckCircle2 size={32} />
          </div>
          <h3>No pending tasks!</h3>
          <p>Great job! You have completed all pending tasks.</p>
          <button className="btn-primary" style={{ marginTop: '12px' }} onClick={onOpenCreateModal}>
            <Plus size={16} />
            <span>Create New Task</span>
          </button>
        </div>
      ) : (
        <div className="task-card-list">
          {pendingTasks.map((task) => (
            <div key={task.id} className="task-list-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', overflow: 'hidden' }}>
                <div
                  className="task-checkbox-circle"
                  onClick={() => onToggleStatus(task.id)}
                  title="Mark as completed"
                />
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
                    {task.title}
                  </h4>
                  {task.description && (
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  <Calendar size={15} />
                  <span>{formatDueDate(task.dueDate)}</span>
                </div>

                <span className={`priority-tag priority-${task.priority?.toLowerCase()}`}>
                  {task.priority}
                </span>

                <div className="actions-cell">
                  <button
                    className="action-icon-btn"
                    title="Edit Task"
                    onClick={() => onOpenEditModal(task)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="action-icon-btn delete"
                    title="Delete Task"
                    onClick={() => onOpenDeleteModal(task)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

