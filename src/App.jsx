import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';

// Public pages
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import ServicePage from '@/pages/ServicePage';
import Professionals from '@/pages/Professionals';
import ProfessionalPublicProfile from '@/pages/ProfessionalPublicProfile';
import HowItWorksPage from '@/pages/HowItWorksPage';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import RequestService from '@/pages/RequestService';
import NotFound from '@/pages/NotFound';

// Auth
import AuthLayout from '@/auth/AuthLayout';
import Login from '@/auth/Login';
import RegisterCustomer from '@/auth/RegisterCustomer';
import RegisterProfessional from '@/auth/RegisterProfessional';
import ProtectedRoute from '@/auth/ProtectedRoute';

// Dashboard layouts
import DashboardLayout from '@/dashboard/layouts/DashboardLayout';
import AdminDashboardLayout from '@/dashboard/layouts/AdminDashboardLayout';

// Professional dashboard pages
import ProfessionalDashboard from '@/dashboard/pages/ProfessionalDashboard';
import AvailableJobs from '@/dashboard/pages/AvailableJobs';
import JobDetailsPage from '@/dashboard/pages/JobDetailsPage';
import ProfessionalBids from '@/dashboard/pages/ProfessionalBids';
import ActiveJobs from '@/dashboard/pages/ActiveJobs';
import CompletedJobs from '@/dashboard/pages/CompletedJobs';
import ProfessionalReviews from '@/dashboard/pages/ProfessionalReviews';
import ProfessionalProfile from '@/dashboard/pages/ProfessionalProfile';
import ProfessionalSettings from '@/dashboard/pages/ProfessionalSettings';

// Customer dashboard pages
import CustomerDashboard from '@/dashboard/pages/CustomerDashboard';
import CustomerRequests from '@/dashboard/pages/CustomerRequests';
import CustomerOffers from '@/dashboard/pages/CustomerOffers';
import CustomerReviews from '@/dashboard/pages/CustomerReviews';
import CustomerProfile from '@/dashboard/pages/CustomerProfile';
import CustomerSettings from '@/dashboard/pages/CustomerSettings';

// Admin dashboard pages
import AdminDashboard from '@/dashboard/pages/AdminDashboard';
import AdminProfessionals from '@/dashboard/pages/AdminProfessionals';
import AdminCustomers from '@/dashboard/pages/AdminCustomers';
import AdminJobs from '@/dashboard/pages/AdminJobs';
import AdminBids from '@/dashboard/pages/AdminBids';
import AdminReviews from '@/dashboard/pages/AdminReviews';
import AdminCategories from '@/dashboard/pages/AdminCategories';
import AdminReports from '@/dashboard/pages/AdminReports';
import AdminSettings from '@/dashboard/pages/AdminSettings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public marketing site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/professionals/:slug" element={<ProfessionalPublicProfile />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request" element={<RequestService />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register/customer" element={<RegisterCustomer />} />
          <Route path="/register/professional" element={<RegisterProfessional />} />
        </Route>

        {/* Customer dashboard */}
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute role="customer">
              <DashboardLayout role="customer" />
            </ProtectedRoute>
          }
        >
          <Route index element={<CustomerDashboard />} />
          <Route path="requests" element={<CustomerRequests />} />
          <Route path="offers" element={<CustomerOffers />} />
          <Route path="reviews" element={<CustomerReviews />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="settings" element={<CustomerSettings />} />
        </Route>

        {/* Professional dashboard */}
        <Route
          path="/pro-dashboard"
          element={
            <ProtectedRoute role="professional">
              <DashboardLayout role="professional" />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfessionalDashboard />} />
          <Route path="jobs" element={<AvailableJobs />} />
          <Route path="jobs/:id" element={<JobDetailsPage />} />
          <Route path="bids" element={<ProfessionalBids />} />
          <Route path="active-jobs" element={<ActiveJobs />} />
          <Route path="completed-jobs" element={<CompletedJobs />} />
          <Route path="reviews" element={<ProfessionalReviews />} />
          <Route path="profile" element={<ProfessionalProfile />} />
          <Route path="settings" element={<ProfessionalSettings />} />
        </Route>

        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="professionals" element={<AdminProfessionals />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="bids" element={<AdminBids />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
