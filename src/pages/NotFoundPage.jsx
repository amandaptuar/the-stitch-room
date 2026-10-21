import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '500px' }}>
        <div
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <Scissors size={32} />
        </div>
        <h1 style={{ fontSize: '3rem', color: 'var(--color-secondary)', marginBottom: '0.6rem' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Pattern Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          The page or garment specification you are looking for has been moved, renamed, or is unavailable in our current catalog.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
