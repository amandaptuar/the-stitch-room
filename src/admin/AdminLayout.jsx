import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  GraduationCap,
  Shirt,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { getAdminAuth, clearAdminAuth } from '../utils/storage';

export default function AdminLayout() {
  const [auth, setAuth] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const session = getAdminAuth();
    if (!session) {
      navigate('/admin/login');
    } else {
      setAuth(session);
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAdminAuth();
    navigate('/admin/login');
  };

  if (!auth) return null;

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Inquiries & Leads', path: '/admin/inquiries', icon: Inbox },
    { label: 'Partner Schools', path: '/admin/schools', icon: GraduationCap },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <img src="/logo.jpeg" alt="Logo" style={{ height: '36px', borderRadius: '4px' }} />
          <div>
            <div style={{ color: '#ffffff', fontWeight: '800', fontFamily: 'var(--font-heading)', fontSize: '1.05rem', lineHeight: 1.1 }}>
              STITCH ROOM
            </div>
            <div style={{ color: 'var(--color-primary)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.06em' }}>
              ADMIN CONSOLE
            </div>
          </div>
        </div>

        <nav style={{ padding: '1.5rem 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#94a3b8', fontSize: '0.85rem' }}
          >
            <ExternalLink size={16} />
            View Public Site
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: '#ef4444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.85rem',
              padding: 0,
            }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{ display: 'block' }}
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
            <div style={{ fontWeight: '700', color: 'var(--color-secondary)', fontSize: '1.1rem' }}>
              The Stitch Room Master Management
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem' }}>
                AD
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--color-secondary)', lineHeight: 1.1 }}>
                  {auth.username}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  {auth.role}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
