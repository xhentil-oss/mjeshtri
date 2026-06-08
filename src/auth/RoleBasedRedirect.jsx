import { Navigate } from 'react-router-dom';
import { useAuth, dashboardPath } from '@/context/AuthContext';

/**
 * Redirects a logged-in user to their role's dashboard, or to /login otherwise.
 * Useful as the element for a neutral "/dashboard" entry point.
 */
export default function RoleBasedRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={dashboardPath(user.role)} replace />;
}
