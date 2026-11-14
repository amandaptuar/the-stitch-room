import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import Preloader from './components/Preloader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UniformsPage from './pages/UniformsPage';
import ClientsPage from './pages/ClientsPage';
import Studio3DPage from './pages/Studio3DPage';
import ContactPage from './pages/ContactPage';
import CustomerPortalPage from './pages/CustomerPortalPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminLoginPage from './admin/AdminLoginPage';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminInquiriesPage from './admin/AdminInquiriesPage';
import AdminSchoolsPage from './admin/AdminSchoolsPage';

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
      <Preloader />
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/uniforms" element={<PublicLayout><UniformsPage /></PublicLayout>} />
        <Route path="/modules" element={<PublicLayout><UniformsPage /></PublicLayout>} />
        <Route path="/clients" element={<PublicLayout><ClientsPage /></PublicLayout>} />
        <Route path="/3d-showroom" element={<PublicLayout><Studio3DPage /></PublicLayout>} />
        <Route path="/3d-customizer" element={<PublicLayout><Studio3DPage /></PublicLayout>} />
        <Route path="/customizer" element={<PublicLayout><Studio3DPage /></PublicLayout>} />
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
    </Router>
  );
}
