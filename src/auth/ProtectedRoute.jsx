import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth, dashboardPath } from '@/context/AuthContext';

/**
 * Demo guard. If no user is logged in, we auto-login as the requested role so the
 * dashboards are explorable without a backend. Swap this for a real redirect to
 * /login once authentication is connected:
 *
 *   if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
 */
export default function ProtectedRoute({ role, children }) {
  const { user, loginAs } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!user && role) loginAs(role);
  }, [user, role, loginAs]);

  if (!user) return null; // brief flash while demo login resolves

  if (role && user.role !== role) {
    return <Navigate to={dashboardPath(user.role)} replace state={{ from: location }} />;
  }

  return children;
}
