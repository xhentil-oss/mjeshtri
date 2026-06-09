// Central API client. Talks to the Express backend. The base URL comes from
// VITE_API_URL (see .env). In production behind the same domain you can set it
// to "/api" and let nginx proxy it.

const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace(/\/$/, '');

const TOKEN_KEY = 'mjeshtri_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = 'GET', body, auth = false, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = tokenStore.get();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body != null ? JSON.stringify(body) : undefined,
  });

  // 204 / empty
  if (res.status === 204) return null;

  let data = null;
  const text = await res.text();
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }

  if (!res.ok) {
    const msg = (data && data.error) || `Gabim (${res.status})`;
    throw new ApiError(res.status, msg);
  }
  return data;
}

const get = (p, auth = false) => request(p, { auth });
const post = (p, body, auth = false) => request(p, { method: 'POST', body, auth });
const patch = (p, body, auth = true) => request(p, { method: 'PATCH', body, auth });
const del = (p, auth = true) => request(p, { method: 'DELETE', auth });

// Build a query string from an object, skipping empty values.
const qs = (params = {}) => {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '');
  return entries.length ? `?${new URLSearchParams(entries).toString()}` : '';
};

export const api = {
  // --- auth ---
  login: (email, password) => post('/auth/login', { email, password }),
  registerCustomer: (data) => post('/auth/register/customer', data),
  registerProfessional: (data) => post('/auth/register/professional', data),
  me: () => get('/auth/me', true),

  // --- professionals (public) ---
  listProfessionals: (filters) => get(`/professionals${qs(filters)}`),
  getProfessional: (slug) => get(`/professionals/${encodeURIComponent(slug)}`),

  // --- jobs ---
  availableJobs: (filters) => get(`/jobs/available${qs(filters)}`, true),
  myJobs: () => get('/jobs/mine', true),
  getJob: (id) => get(`/jobs/${id}`),
  jobBids: (id) => get(`/jobs/${id}/bids`, true),
  createJob: (data) => post('/jobs', data, true),
  selectBid: (jobId, bidId) => post(`/jobs/${jobId}/select-bid`, { bidId }, true),
  completeJob: (jobId) => patch(`/jobs/${jobId}/complete`, {}),

  // --- bids ---
  myBids: () => get('/bids/mine', true),
  createBid: (data) => post('/bids', data, true),

  // --- reviews ---
  myReviews: () => get('/reviews/mine', true),
  createReview: (data) => post('/reviews', data, true),

  // --- me (own profile) ---
  updateMe: (data) => patch('/me', data),
  myProProfile: () => get('/me/professional', true),
  updateProProfile: (data) => patch('/me/professional', data),
  myProReviews: () => get('/me/professional/reviews', true),
  myProJobs: (status) => get(`/me/professional/jobs${qs({ status })}`, true),

  // --- admin ---
  adminStats: () => get('/admin/stats', true),
  adminProfessionals: (status) => get(`/admin/professionals${qs({ status })}`, true),
  adminUpdatePro: (id, action) => patch(`/admin/professionals/${id}`, { action }),
  adminCustomers: () => get('/admin/customers', true),
  adminJobs: () => get('/admin/jobs', true),
  adminBids: () => get('/admin/bids', true),
  adminReviews: () => get('/admin/reviews', true),
  adminDeleteReview: (id) => del(`/admin/reviews/${id}`),

  // --- uploads ---
  upload: (files) => {
    const fd = new FormData();
    [...files].forEach((f) => fd.append('files', f));
    return request('/uploads', { method: 'POST', body: fd, auth: true, isForm: true });
  },
};
