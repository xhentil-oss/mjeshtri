import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api, tokenStore } from '@/lib/api';

const AuthContext = createContext(null);

// Real auth backed by the API. The JWT is kept in localStorage and the user is
// restored on load via /auth/me. login/register return { ok, user, error }.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until the initial /me resolves

  // Restore session from a stored token on first mount.
  useEffect(() => {
    let active = true;
    (async () => {
      if (!tokenStore.get()) { setLoading(false); return; }
      try {
        const { user } = await api.me();
        if (active) setUser(user);
      } catch {
        tokenStore.clear();
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const handleAuthResult = (res) => {
    tokenStore.set(res.token);
    setUser(res.user);
    return { ok: true, user: res.user };
  };

  const login = useCallback(async (email, password) => {
    try {
      const res = await api.login(email, password);
      return handleAuthResult(res);
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }, []);

  // Demo helper used by the login-page quick chips. Uses the seeded demo logins.
  const loginAs = useCallback((role) => {
    const map = {
      customer: 'klient@demo.al',
      professional: 'profesionist@demo.al',
      admin: 'admin@demo.al',
    };
    return login(map[role], 'demo1234');
  }, [login]);

  const register = useCallback(async (data, role) => {
    try {
      const res =
        role === 'professional'
          ? await api.registerProfessional(data)
          : await api.registerCustomer(data);
      return handleAuthResult(res);
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  // Let pages patch the cached user after a profile update.
  const updateUser = useCallback((patch) => setUser((u) => (u ? { ...u, ...patch } : u)), []);

  return (
    <AuthContext.Provider value={{ user, loading, login, loginAs, register, logout, updateUser }}>
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
