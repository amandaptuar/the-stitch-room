import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

// Lazy-load all pages for instant initial paint
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const UniformsPage = lazy(() => import('./pages/UniformsPage'));
const ClientsPage = lazy(() => import('./pages/ClientsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CustomerPortalPage = lazy(() => import('./pages/CustomerPortalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AdminLoginPage = lazy(() => import('./admin/AdminLoginPage'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminInquiriesPage = lazy(() => import('./admin/AdminInquiriesPage'));
const AdminSchoolsPage = lazy(() => import('./admin/AdminSchoolsPage'));

// Scroll To Top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper for public website pages
function PublicLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/uniforms" element={<PublicLayout><UniformsPage /></PublicLayout>} />
          <Route path="/modules" element={<PublicLayout><UniformsPage /></PublicLayout>} />
          <Route path="/clients" element={<PublicLayout><ClientsPage /></PublicLayout>} />
          <Route path="/3d-showroom" element={<Navigate to="/uniforms" replace />} />
          <Route path="/3d-customizer" element={<Navigate to="/uniforms" replace />} />
          <Route path="/customizer" element={<Navigate to="/uniforms" replace />} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
          <Route path="/customer-portal" element={<PublicLayout><CustomerPortalPage /></PublicLayout>} />
          <Route path="/customer-dashboard" element={<PublicLayout><CustomerPortalPage /></PublicLayout>} />
          <Route path="/customer-login" element={<PublicLayout><CustomerPortalPage /></PublicLayout>} />

          {/* Admin Authentication & Console Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="inquiries" element={<AdminInquiriesPage />} />
            <Route path="schools" element={<AdminSchoolsPage />} />
          </Route>

          {/* 404 Catch All */}
          <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
        </Routes>
      </Suspense>
    </Router>
  );
}
