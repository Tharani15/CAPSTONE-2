import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getTasks } from '../services/api';
import './Dashboard.css';

/**
 * Dashboard Page Component
 * Shows greeting with user name from localStorage, summary cards
 * (Total / Pending / Completed counts), and a read-only list of recent tasks.
 */
export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Retrieve user from localStorage
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : { name: 'User' };

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute metrics
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (t) => t.status.toLowerCase() === 'pending'
  ).length;
  const completedTasks = tasks.filter(
    (t) => t.status.toLowerCase() === 'completed'
  ).length;

  // Show up to 4 recent tasks
  const recentTasks = tasks.slice(0, 4);

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="page-container">
        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <h1 className="welcome-title">Welcome, {user.name}</h1>
          <p className="welcome-subtitle">Here's a summary of your tasks.</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="loading-indicator">Loading your dashboard...</div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="summary-cards-grid">
              <div className="summary-card">
                <span className="card-label">Total tasks</span>
                <span className="card-value">{totalTasks}</span>
              </div>
              <div className="summary-card">
                <span className="card-label">Pending</span>
                <span className="card-value">{pendingTasks}</span>
              </div>
              <div className="summary-card">
                <span className="card-label">Completed</span>
                <span className="card-value">{completedTasks}</span>
              </div>
            </div>

            {/* Recent Tasks Section */}
            <div className="recent-tasks-section">
              <div className="recent-tasks-header">
                <h2 className="recent-tasks-title">Recent tasks</h2>
                <Link to="/tasks" className="view-all-link">
                  View all tasks
                </Link>
              </div>

              <div className="recent-tasks-card">
                {recentTasks.length === 0 ? (
                  <div className="empty-tasks-message">
                    No tasks yet. <Link to="/tasks">Create your first task</Link>.
                  </div>
                ) : (
                  <ul className="recent-tasks-list">
                    {recentTasks.map((task) => {
                      const isCompleted =
                        task.status.toLowerCase() === 'completed';
                      return (
                        <li key={task.id} className="recent-task-item">
                          <span className="task-title-text">{task.title}</span>
                          <span
                            className={
                              isCompleted
                                ? 'status-completed'
                                : 'status-pending'
                            }
                          >
                            {task.status}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

