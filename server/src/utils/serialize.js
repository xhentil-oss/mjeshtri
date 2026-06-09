// Map DB rows -> the exact shapes the frontend already expects, so the React
// components and src/data helpers don't need shape changes. mysql2 parses JSON
// columns to JS values automatically, but guard for string/null just in case.

const asArray = (v) => {
  if (Array.isArray(v)) return v;
  if (v == null) return [];
  if (typeof v === 'string') {
    try { return JSON.parse(v); } catch { return []; }
  }
  return v;
};

const asObject = (v) => {
  if (v && typeof v === 'object' && !Array.isArray(v)) return v;
  if (typeof v === 'string') {
    try { return JSON.parse(v); } catch { return {}; }
  }
  return {};
};

// professionals JOIN users (name comes from users)
export const serializeProfessional = (row) => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  category: row.category,
  areas: asArray(row.areas),
  city: row.city,
  rating: Number(row.rating),
  reviews: row.reviews_count,
  completedJobs: row.completed_jobs,
  experience: row.experience,
  verified: !!row.verified,
  featured: !!row.featured,
  status: row.status,
  responseTime: row.response_time,
  availability: row.availability,
  business: row.business || '',
  nipt: row.nipt || '',
  bio: row.bio || '',
  skills: asArray(row.skills),
  portfolio: asArray(row.portfolio),
  avatarUrl: row.avatar_url || null,
});

export const serializeJob = (row) => ({
  id: row.id,
  category: row.category,
  area: row.area,
  title: row.title,
  description: row.description,
  urgency: row.urgency,
  budget: row.budget,
  status: row.status,
  bidsCount: row.bids_count != null ? Number(row.bids_count) : undefined,
  postedAt: row.posted_at,
  completedAt: row.completed_at || undefined,
  customerId: row.customer_id,
  selectedProId: row.selected_pro_id || undefined,
  photos: asArray(row.photos),
  contact: row.contact,
  reviewed: !!row.reviewed,
});

export const serializeBid = (row) => ({
  id: row.id,
  jobId: row.job_id,
  proId: row.pro_id,
  price: row.price,
  arrival: row.arrival,
  completion: row.completion,
  label: row.label || '',
  message: row.message || '',
  status: row.status,
  // optional joined professional summary (offer comparison UI)
  pro: row.pro_name
    ? {
        id: row.pro_id,
        name: row.pro_name,
        slug: row.pro_slug,
        rating: row.pro_rating != null ? Number(row.pro_rating) : undefined,
        reviews: row.pro_reviews,
        completedJobs: row.pro_completed_jobs,
        experience: row.pro_experience,
        verified: !!row.pro_verified,
      }
    : undefined,
});

export const serializeReview = (row) => ({
  id: row.id,
  proId: row.pro_id,
  jobId: row.job_id || undefined,
  customer: row.customer_name,
  area: row.area,
  rating: row.rating,
  date: row.created_at,
  text: row.text,
  breakdown: asObject(row.breakdown),
});

export const serializeUser = (row) => ({
  id: row.id,
  role: row.role,
  name: row.name,
  email: row.email,
  phone: row.phone || '',
  area: row.area || '',
});
