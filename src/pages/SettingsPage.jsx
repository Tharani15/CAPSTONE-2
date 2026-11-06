import React, { useState, useEffect } from 'react';
import {
  Settings,
  User,
  Palette,
  Bell,
  Sun,
  Moon,
  Laptop,
  Save,
  Camera,
  Info
} from 'lucide-react';

export default function SettingsPage({
  userProfile,
  onSaveProfile,
  onShowToast
}) {
  const [formData, setFormData] = useState({
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'Task Manager',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop',
    theme: 'Light',
    defaultPriorityFilter: 'All Priorities',
    itemsPerPage: 10,
    dateFormat: 'DD/MM/YYYY',
    taskReminders: true,
    overdueAlerts: true,
    dailySummary: false,
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || 'Priya Sharma',
        email: userProfile.email || 'priya@example.com',
        role: userProfile.role || 'Task Manager',
        avatarUrl: userProfile.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop',
        theme: userProfile.theme || 'Light',
        defaultPriorityFilter: userProfile.defaultPriorityFilter || 'All Priorities',
        itemsPerPage: userProfile.itemsPerPage || 10,
        dateFormat: userProfile.dateFormat || 'DD/MM/YYYY',
        taskReminders: userProfile.taskReminders ?? true,
        overdueAlerts: userProfile.overdueAlerts ?? true,
        dailySummary: userProfile.dailySummary ?? false,
      });
    }
  }, [userProfile]);

  const handleChangeTheme = (newTheme) => {
    setFormData((prev) => ({ ...prev, theme: newTheme }));
    if (newTheme === 'Dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const handleAvatarChange = () => {
    const newUrl = prompt('Enter image URL for user profile avatar:', formData.avatarUrl);
    if (newUrl && newUrl.trim() !== '') {
      setFormData((prev) => ({ ...prev, avatarUrl: newUrl.trim() }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
  };

  return (
    <div className="page-container">
      {/* 1. Header */}
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-badge" style={{ backgroundColor: '#818cf8', color: '#ffffff' }}>
            <Settings size={24} />
          </div>
          <div className="page-title-text">
            <h1>Settings</h1>
            <p>Manage your profile and preferences</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="settings-grid">
          {/* Card 1: Profile Information */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <User size={20} color="#6366f1" />
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Profile Information</h3>
            </div>

            <div className="profile-avatar-row">
              <div style={{ position: 'relative' }}>
                <img
                  src={formData.avatarUrl}
                  alt={formData.name}
                  className="profile-avatar-large"
                />
                <button
                  type="button"
                  onClick={handleAvatarChange}
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#1e293b',
                    color: '#fff',
                    border: '2px solid #fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  title="Change Photo"
                >
                  <Camera size={16} />
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleAvatarChange}
                  style={{ fontSize: '13px' }}
                >
                  Change Photo
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Role</label>
              <input
                type="text"
                className="form-control"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
          </div>

          {/* Card 2: App Preferences */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Palette size={20} color="#6366f1" />
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>App Preferences</h3>
            </div>

            <div className="form-group">
              <label>Theme</label>
              <div className="theme-options">
                <button
                  type="button"
                  className={`theme-btn ${formData.theme === 'Light' ? 'active' : ''}`}
                  onClick={() => handleChangeTheme('Light')}
                >
                  <Sun size={15} />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  className={`theme-btn ${formData.theme === 'Dark' ? 'active' : ''}`}
                  onClick={() => handleChangeTheme('Dark')}
                >
                  <Moon size={15} />
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  className={`theme-btn ${formData.theme === 'System' ? 'active' : ''}`}
                  onClick={() => handleChangeTheme('System')}
                >
                  <Laptop size={15} />
                  <span>System</span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Default Priority Filter</label>
              <select
                className="form-control"
                value={formData.defaultPriorityFilter}
                onChange={(e) => setFormData({ ...formData, defaultPriorityFilter: e.target.value })}
              >
                <option value="All Priorities">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label>Items per Page</label>
              <select
                className="form-control"
                value={formData.itemsPerPage}
                onChange={(e) => setFormData({ ...formData, itemsPerPage: parseInt(e.target.value, 10) })}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Date Format</label>
              <select
                className="form-control"
                value={formData.dateFormat}
                onChange={(e) => setFormData({ ...formData, dateFormat: e.target.value })}
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>

          {/* Card 3: Notification Settings */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Bell size={20} color="#6366f1" />
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Notification Settings</h3>
            </div>

            <div className="toggle-item">
              <div>
                <div className="toggle-item-title">Task Reminders</div>
                <div className="toggle-item-desc">Get notified about upcoming due dates</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.taskReminders}
                  onChange={(e) => setFormData({ ...formData, taskReminders: e.target.checked })}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div>
                <div className="toggle-item-title">Overdue Task Alerts</div>
                <div className="toggle-item-desc">Get notified when tasks are overdue</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.overdueAlerts}
                  onChange={(e) => setFormData({ ...formData, overdueAlerts: e.target.checked })}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div>
                <div className="toggle-item-title">Daily Summary</div>
                <div className="toggle-item-desc">Receive a daily summary of your tasks</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.dailySummary}
                  onChange={(e) => setFormData({ ...formData, dailySummary: e.target.checked })}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Card 4: Stay on track tip banner */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
            border: '1px solid #ddd6fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '28px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5b21b6', marginBottom: '6px' }}>
                <Info size={18} />
                <h4 style={{ fontSize: '16px', fontWeight: 700 }}>Stay on track!</h4>
              </div>
              <p style={{ fontSize: '13.5px', color: '#6d28d9', maxWidth: '300px', lineHeight: 1.5 }}>
                Enable notifications to never miss an important task, milestone, or sprint deadline.
              </p>
            </div>

            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              color: '#7c3aed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)'
            }}>
              <Bell size={26} />
            </div>
          </div>
        </div>

        {/* Save Changes Floating Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button type="submit" className="btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}

