import React from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Trophy,
  Check
} from 'lucide-react';

export default function DashboardPage({
  stats,
  onNavigateTab,
  onToggleTask,
  userProfile
}) {
  // Safe defaults if stats are loading
  const total = stats?.totalTasks ?? 0;
  const completed = stats?.completedTasks ?? 0;
  const pending = stats?.pendingTasks ?? 0;
  const overdue = stats?.overdueTasks ?? 0;
  const percentage = stats?.completionPercentage ?? (total > 0 ? Math.round((completed / total) * 100) : 0);
  const recentTasks = stats?.recentTasks || [];
  const todayTasks = stats?.todayTasks || [];

  // Donut SVG circumference calculation (radius 58, 2 * pi * 58 ~ 364.4)
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const formatDueDate = (dateStr) => {
    if (!dateStr) return 'No date';
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
      {/* 1. Greeting Hero Banner */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h2>
            <Sparkles size={24} color="#6366f1" />
            Good Morning, Welcome Back{userProfile?.name ? `, ${userProfile.name.split(' ')[0]}!` : '!'}
          </h2>
          <p>Here's an overview of your tasks.</p>
        </div>
        <div className="hero-illustration">
          <div className="hero-illustration-box">
            <CheckCircle2 size={48} strokeWidth={2.2} />
          </div>
        </div>
      </div>

      {/* 2. Four Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <FileText size={26} />
          </div>
          <div className="stat-data">
            <h3>{total}</h3>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <CheckCircle2 size={26} />
          </div>
          <div className="stat-data">
            <h3>{completed}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <Clock size={26} />
          </div>
          <div className="stat-data">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon overdue">
            <AlertCircle size={26} />
          </div>
          <div className="stat-data">
            <h3>{overdue}</h3>
            <p>Overdue</p>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Left Column: Task Overview Donut Chart & Today's Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Donut Chart Card */}
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
              Task Overview
            </h3>
            
            <div className="donut-chart-container">
              <div className="circular-chart">
                <svg viewBox="0 0 140 140">
                  <circle
                    className="circle-bg"
                    cx="70"
                    cy="70"
                    r={radius}
                  />
                  <circle
                    className="circle-fill"
                    cx="70"
                    cy="70"
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <div className="chart-center-text">
                  <div className="chart-percent">{percentage}%</div>
                  <div className="chart-label">Completed</div>
                </div>
              </div>

              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#6366f1' }}></span>
                  <span>Completed ({completed})</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#cbd5e1' }}></span>
                  <span>Pending ({pending})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Tasks Card */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Today's Tasks</h3>
              <span style={{
                background: '#f1f5f9',
                color: '#64748b',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600
              }}>
                {todayTasks.length} {todayTasks.length === 1 ? 'task' : 'tasks'} today
              </span>
            </div>

            {todayTasks.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', padding: '12px 0' }}>
                No tasks scheduled for today. You're all clear!
              </p>
            ) : (
              <div>
                {todayTasks.map((task) => (
                  <div key={task.id} className="task-item-row">
                    <div className="task-title-group">
                      <div
                        className={`task-checkbox-circle ${task.status === 'COMPLETED' ? 'checked' : ''}`}
                        onClick={() => onToggleTask(task.id)}
                        title="Mark as completed"
                      >
                        {task.status === 'COMPLETED' && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className={`task-text-title ${task.status === 'COMPLETED' ? 'completed' : ''}`}>
                        {task.title}
                      </span>
                    </div>

                    <div className="task-meta-group">
                      <span className={`priority-tag priority-${task.priority?.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Tasks & Motivational Banner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Recent Tasks</h3>
              <button
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12.5px' }}
                onClick={() => onNavigateTab('all-tasks')}
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {recentTasks.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', padding: '16px 0' }}>
                No recent tasks found. Create a task to get started!
              </p>
            ) : (
              <div>
                {recentTasks.map((task) => (
                  <div key={task.id} className="task-item-row">
                    <div className="task-title-group">
                      <div
                        className={`task-checkbox-circle ${task.status === 'COMPLETED' ? 'checked' : ''}`}
                        onClick={() => onToggleTask(task.id)}
                        title="Toggle status"
                      >
                        {task.status === 'COMPLETED' && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className={`task-text-title ${task.status === 'COMPLETED' ? 'completed' : ''}`}>
                        {task.title}
                      </span>
                    </div>

                    <div className="task-meta-group">
                      <span className="due-date-text">{formatDueDate(task.dueDate)}</span>
                      <span className={`priority-tag priority-${task.priority?.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Motivational Achievement Card */}
          <div className="motivational-card">
            <div className="motivational-icon">
              <Trophy size={26} />
            </div>
            <div className="motivational-text">
              <h4>You're on track!</h4>
              <p>Keep going to complete your daily goals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

