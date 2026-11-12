import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component
 * Checks if a user is logged in via localStorage.
 * If not, redirects to the /login page.
 */
export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

