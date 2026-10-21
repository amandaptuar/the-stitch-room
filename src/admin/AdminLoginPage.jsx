import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { setAdminAuth, getAdminAuth } from '../utils/storage';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If already logged in, redirect
  React.useEffect(() => {
    if (getAdminAuth()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Authentication verification (admin / admin123 or stitchroom)
    if (
      (username === 'admin' && password === 'admin123') ||
      (username === 'stitchroom' && password === 'vellore1995')
    ) {
      setAdminAuth({ username }, remember);
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Use default: admin / admin123');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 10% 20%, #1e293b 0%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
        }}
      >
        <div style={{ background: '#0f172a', padding: '2.5rem 2rem', textAlign: 'center', color: '#ffffff' }}>
          <img
            src="/logo.jpeg"
            alt="The Stitch Room"
            style={{ height: '48px', margin: '0 auto 1rem', borderRadius: '4px' }}
          />
          <h2 style={{ color: '#ffffff', fontSize: '1.4rem', margin: 0 }}>The Stitch Room</h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: '700', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
            MANAGEMENT CONSOLE
          </div>
        </div>

        <div style={{ padding: '2.5rem 2rem' }}>
          {error && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.5rem',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '2.8rem' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '2.8rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem', fontSize: '0.88rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#64748b' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                Remember this session
              </label>
              <span style={{ color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: '600' }}>
                Default: admin / admin123
              </span>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem' }}>
              Authenticate & Access Console
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.8rem' }}>
            <Link to="/" style={{ color: '#64748b', fontSize: '0.85rem' }}>
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
