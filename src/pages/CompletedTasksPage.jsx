import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Calendar,
  RotateCcw,
  Archive
} from 'lucide-react';

export default function CompletedTasksPage({
  tasks,
  onNavigateTab,
  onToggleStatus
}) {
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED');

  const formatDueDate = (dateStr) => {
    if (!dateStr) return 'No Date';
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
          <div className="page-icon-badge" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="page-title-text">
            <h1>Completed Tasks</h1>
            <p>Tasks that you have finished.</p>
          </div>
        </div>

        <button className="btn-primary" onClick={() => onNavigateTab('all-tasks')}>
          <span>View All Tasks</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* 2. List of Completed Tasks */}
      {completedTasks.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon-circle" style={{ background: '#dcfce7', color: '#16a34a' }}>
            <CheckCircle2 size={32} />
          </div>
          <h3>No completed tasks yet</h3>
          <p>Mark pending tasks as complete to see them archived here.</p>
        </div>
      ) : (
        <div className="task-card-list">
          {completedTasks.map((task) => (
            <div key={task.id} className="task-list-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', overflow: 'hidden' }}>
                <div style={{ color: '#16a34a', display: 'flex', alignItems: 'center' }}>
                  <CheckCircle2 size={22} />
                </div>
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

                <span className="status-tag status-completed">
                  Completed
                </span>

                <button
                  className="btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '13px', gap: '6px' }}
                  onClick={() => onToggleStatus(task.id)}
                  title="Revert to pending"
                >
                  <RotateCcw size={14} />
                  <span>Restore</span>
                </button>
              </div>
            </div>
          ))}

          {/* Celebration / All caught up Card from mockup */}
          <div className="card" style={{ textAlign: 'center', padding: '36px 20px', marginTop: '12px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.35)',
              marginBottom: '16px'
            }}>
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              All caught up!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: '16px' }}>
              You have no more completed tasks awaiting review.
            </p>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f1f5f9',
              color: '#475569',
              fontSize: '12.5px',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: '20px'
            }}>
              <Archive size={14} />
              <span>{completedTasks.length} items archived this week</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

