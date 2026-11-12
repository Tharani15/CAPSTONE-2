import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar component
 * Shared across Dashboard and Tasks pages.
 * Displays app brand, navigation links with active indicators,
 * logged-in user name with user icon, and a Sign Out button.
 */
export default function Navbar() {
  const navigate = useNavigate();

  // Retrieve logged-in user from localStorage
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : { name: 'User' };

  // Handle user logout
  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Left Section: App Logo & Navigation */}
        <div className="navbar-left">
          <NavLink to="/dashboard" className="navbar-brand">
            TaskManager
          </NavLink>

          <nav className="navbar-links">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Tasks
            </NavLink>
          </nav>
        </div>

        {/* Right Section: User Profile & Sign Out */}
        <div className="navbar-right">
          <div className="user-profile">
            {/* Clean SVG User Icon */}
            <svg
              className="user-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="user-name">{user.name}</span>
          </div>

          <button
            type="button"
            className="sign-out-btn"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

