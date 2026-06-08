export const navConfig = {
  customer: {
    base: '/customer-dashboard',
    title: 'Paneli i Klientit',
    items: [
      { to: '/customer-dashboard', label: 'Përmbledhje', icon: 'LayoutDashboard', end: true },
      { to: '/customer-dashboard/requests', label: 'Kërkesat e mia', icon: 'FileText' },
      { to: '/customer-dashboard/offers', label: 'Ofertat', icon: 'GitCompareArrows' },
      { to: '/customer-dashboard/reviews', label: 'Vlerësimet', icon: 'Star' },
      { to: '/customer-dashboard/profile', label: 'Profili', icon: 'User' },
      { to: '/customer-dashboard/settings', label: 'Cilësimet', icon: 'Settings' },
    ],
  },
  professional: {
    base: '/pro-dashboard',
    title: 'Paneli i Profesionistit',
    items: [
      { to: '/pro-dashboard', label: 'Përmbledhje', icon: 'LayoutDashboard', end: true },
      { to: '/pro-dashboard/jobs', label: 'Punë të disponueshme', icon: 'Briefcase' },
      { to: '/pro-dashboard/bids', label: 'Ofertat e mia', icon: 'Send' },
      { to: '/pro-dashboard/active-jobs', label: 'Punë aktive', icon: 'Loader' },
      { to: '/pro-dashboard/completed-jobs', label: 'Të përfunduara', icon: 'CheckCircle2' },
      { to: '/pro-dashboard/reviews', label: 'Vlerësimet', icon: 'Star' },
      { to: '/pro-dashboard/profile', label: 'Profili', icon: 'User' },
      { to: '/pro-dashboard/settings', label: 'Cilësimet', icon: 'Settings' },
    ],
  },
  admin: {
    base: '/admin',
    title: 'Paneli i Adminit',
    items: [
      { to: '/admin', label: 'Përmbledhje', icon: 'LayoutDashboard', end: true },
      { to: '/admin/professionals', label: 'Profesionistët', icon: 'Wrench' },
      { to: '/admin/customers', label: 'Klientët', icon: 'Users' },
      { to: '/admin/jobs', label: 'Punët', icon: 'Briefcase' },
      { to: '/admin/bids', label: 'Ofertat', icon: 'Send' },
      { to: '/admin/reviews', label: 'Vlerësimet', icon: 'Star' },
      { to: '/admin/categories', label: 'Kategoritë', icon: 'Tags' },
      { to: '/admin/reports', label: 'Raporte', icon: 'BarChart3' },
      { to: '/admin/settings', label: 'Cilësimet', icon: 'Settings' },
    ],
  },
};

// Items shown in the mobile bottom navigation (max 5).
export const mobileNav = (role) => navConfig[role].items.slice(0, 5);
