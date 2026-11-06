import React, { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';

export default function Header({
  globalSearch,
  setGlobalSearch,
  onSearchSubmit,
  userProfile,
  onProfileClick,
  pendingCount = 0
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit(globalSearch);
    }
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <button className="menu-toggle-btn" title="Toggle menu">
          <Menu size={20} />
        </button>

        <div className="search-input-wrapper">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="header-right">
        <div
          className="notification-badge-wrapper"
          onClick={() => setShowNotifications(!showNotifications)}
          title="Notifications"
        >
          <Bell size={20} />
          {pendingCount > 0 && (
            <span className="notification-badge">{pendingCount > 9 ? '9+' : pendingCount}</span>
          )}

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '45px',
                right: '0',
                width: '280px',
                background: '#fff',
                boxShadow: 'var(--shadow-lg)',
                borderRadius: '14px',
                border: '1px solid var(--border-color)',
                padding: '16px',
                zIndex: 100,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
                Notifications
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                You have {pendingCount} task{pendingCount !== 1 ? 's' : ''} currently awaiting completion.
              </p>
            </div>
          )}
        </div>

        <div className="user-pill" onClick={onProfileClick} title="View Settings">
          <img
            src={userProfile?.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop"}
            alt={userProfile?.name || "Priya Sharma"}
          />
        </div>
      </div>
    </header>
  );
}

