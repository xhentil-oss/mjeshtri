import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, dashboardPath } from '@/context/AuthContext';

// Real auth guard. Waits for the initial session check, then redirects
// unauthenticated users to /login and wrong-role users to their own dashboard.
export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-slate-400">
        <span className="text-sm">Po ngarkohet…</span>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  if (role && user.role !== role) {
    return <Navigate to={dashboardPath(user.role)} replace state={{ from: location }} />;
  }

  return children;
}
