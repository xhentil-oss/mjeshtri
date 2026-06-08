// Mock users for demo authentication. In production this is replaced by a real
// auth provider; the shape (role-based) stays the same.
export const demoUsers = [
  {
    id: 'cust-1',
    role: 'customer',
    name: 'Eralda Meta',
    email: 'klient@demo.al',
    password: 'demo1234',
    phone: '+355 69 111 1111',
    area: 'Komuna e Parisit',
  },
  {
    id: 'cust-2',
    role: 'customer',
    name: 'Biznesi Demo SHPK',
    email: 'biznes@demo.al',
    password: 'demo1234',
    phone: '+355 69 222 2222',
    area: 'Qendër',
  },
  {
    id: 'pro-arben',
    role: 'professional',
    name: 'Arben Hoxha',
    email: 'profesionist@demo.al',
    password: 'demo1234',
    phone: '+355 69 333 3333',
    category: 'Electrician',
  },
  {
    id: 'admin-1',
    role: 'admin',
    name: 'Admin Demo',
    email: 'admin@demo.al',
    password: 'demo1234',
    phone: '+355 69 000 0000',
  },
];

// Customers table for the admin dashboard.
export const customers = [
  { id: 'cust-1', name: 'Eralda Meta', email: 'klient@demo.al', phone: '+355 69 111 1111', area: 'Komuna e Parisit', requests: 3, joined: '2025-03-02' },
  { id: 'cust-2', name: 'Biznesi Demo SHPK', email: 'biznes@demo.al', phone: '+355 69 222 2222', area: 'Qendër', requests: 5, joined: '2025-02-14' },
  { id: 'cust-3', name: 'Drini Bega', email: 'drini@demo.al', phone: '+355 69 444 4444', area: 'Astir', requests: 1, joined: '2025-05-20' },
  { id: 'cust-4', name: 'Marsida Lleshi', email: 'marsida@demo.al', phone: '+355 69 555 5555', area: 'Fresku', requests: 2, joined: '2025-04-11' },
];

export const findUser = (email, password) =>
  demoUsers.find((u) => u.email === email && u.password === password);
