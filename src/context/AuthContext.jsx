import { createContext, useContext, useState, useCallback } from 'react';
import { findUser } from '@/data/demoUsers';

const AuthContext = createContext(null);

// Mock auth provider. State lives in memory only (demo). Replace `login`/`register`
// with real API calls later — the consuming components won't need to change.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((email, password) => {
    const found = findUser(email, password);
    if (found) {
      const { password: _pw, ...safe } = found;
      setUser(safe);
      return { ok: true, user: safe };
    }
    return { ok: false, error: 'Email ose fjalëkalim i pasaktë.' };
  }, []);

  // Demo helper: log in instantly as a given role (used by the login page chips).
  const loginAs = useCallback((role) => {
    const map = {
      customer: 'klient@demo.al',
      professional: 'profesionist@demo.al',
      admin: 'admin@demo.al',
    };
    return login(map[role], 'demo1234');
  }, [login]);

  const register = useCallback((data, role) => {
    const safe = { id: `new-${Date.now()}`, role, ...data };
    setUser(safe);
    return { ok: true, user: safe };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, loginAs, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const dashboardPath = (role) =>
  role === 'admin' ? '/admin'
  : role === 'professional' ? '/pro-dashboard'
  : '/customer-dashboard';
