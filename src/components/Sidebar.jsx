import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  CheckCircle2,
  Settings,
  LogOut,
  Check
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, userProfile }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'all-tasks', label: 'All Tasks', icon: CheckSquare },
    { id: 'pending-tasks', label: 'Pending Tasks', icon: Clock },
    { id: 'completed-tasks', label: 'Completed Tasks', icon: CheckCircle2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      {/* Brand Logo */}
      <div className="sidebar-logo">
        <div className="logo-badge">
          <Check size={22} strokeWidth={3} />
        </div>
        <span>TaskFlow</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Widget at Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="user-profile-widget" onClick={() => setActiveTab('settings')} style={{ cursor: 'pointer' }}>
          <img
            src={userProfile?.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop"}
            alt={userProfile?.name || "User"}
            className="user-avatar-sm"
          />
          <div className="user-info-text">
            <span className="user-name">{userProfile?.name || 'Priya Sharma'}</span>
            <span className="user-email">{userProfile?.email || 'priya@example.com'}</span>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={() => alert('Logged out successfully.')}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

