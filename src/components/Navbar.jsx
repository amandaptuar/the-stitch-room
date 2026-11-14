import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Menu, X, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/mockData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Uniforms', path: '/uniforms' },
    { label: 'Our Clients', path: '/clients' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header>
      {/* Top Utility Bar */}
      <div className="top-announcement-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <a
              href={BRAND_INFO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="top-bar-link"
              title="View on Google Maps"
            >
              <MapPin size={14} style={{ color: 'var(--color-primary)' }} />
              Katpadi, Vellore, Tamil Nadu
            </a>
            <a href={`tel:${BRAND_INFO.phone1}`} className="top-bar-link">
              <Phone size={14} />
              {BRAND_INFO.phone1}
            </a>
          </div>
          <div className="top-bar-right">
            <a href={`mailto:${BRAND_INFO.email}`} className="top-bar-link">
              <Mail size={14} />
              {BRAND_INFO.email}
            </a>
            <Link to="/customer-portal" className="top-bar-link">
              <ShieldCheck size={14} />
              Institutional Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`site-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="nav-brand">
            <div className="brand-logo-badge">
              <img src="/logo.jpeg" alt="The Stitch Room Logo" className="brand-logo-img" />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-name">THE STITCH ROOM</span>
              <span className="brand-tag">
                <span className="brand-tag-desktop">Textile & Uniform Makers • Est. 1995</span>
                <span className="brand-tag-mobile">Uniform Makers • Est. 1995</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Action Button & Mobile Hamburger */}
          <div className="nav-actions">
            <Link to="/contact" className="btn btn-primary btn-sm btn-quote">
              Request Bulk Quote
              <ArrowRight size={16} />
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Upgraded with Glassmorphism and Quick Contact) */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)}>
        <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="brand-logo-badge" style={{ width: '40px', height: '40px' }}>
                <img src="/logo.jpeg" alt="The Stitch Room Logo" className="brand-logo-img" />
              </div>
              <div>
                <span style={{ fontWeight: '800', fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--color-secondary)' }}>
                  THE STITCH ROOM
                </span>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-primary)', fontWeight: '700' }}>
                  EST. 1995 • VELLORE
                </div>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-secondary)', padding: '0.3rem' }}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '1.08rem',
                  fontWeight: '600',
                  fontFamily: 'var(--font-heading)',
                  color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.4rem 0',
                }}
              >
                <span>{link.label}</span>
                {location.pathname === link.path && (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                )}
              </Link>
            ))}

            <div style={{ height: '1px', background: '#f1f5f9', margin: '0.5rem 0' }} />

            <Link
              to="/customer-portal"
              style={{ fontSize: '0.98rem', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />
              Institutional Order Tracker
            </Link>

            <Link
              to="/admin/login"
              style={{ fontSize: '0.98rem', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <ShieldCheck size={18} style={{ color: '#94a3b8' }} />
              Admin Portal
            </Link>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
              Get Instant Quotation
            </Link>

            <a
              href={`https://wa.me/${BRAND_INFO.whatsapp}?text=Hi%20The%20Stitch%20Room,%20I%20am%20reaching%20out%20via%20the%20website%20mobile%20menu.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              style={{ width: '100%', borderColor: '#25D366', color: '#16a34a' }}
            >
              <MessageCircle size={18} style={{ color: '#25D366' }} />
              WhatsApp Quick Chat
            </a>

            <div style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', marginTop: '0.3rem' }}>
              Direct: <a href={`tel:${BRAND_INFO.phone1}`} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{BRAND_INFO.phone1}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
