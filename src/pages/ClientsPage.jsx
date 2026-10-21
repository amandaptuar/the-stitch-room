import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Users,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { getSchools } from '../utils/storage';

export default function ClientsPage() {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  useEffect(() => {
    setSchools(getSchools());
  }, []);

  const cities = ['All', ...new Set(schools.map((s) => s.city.split(',')[0].trim()))];

  const filtered = schools.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.uniformType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity =
      selectedCity === 'All' || s.city.toLowerCase().includes(selectedCity.toLowerCase());
    return matchesSearch && matchesCity;
  });

  return (
    <main style={{ paddingBottom: '5rem' }}>
      {/* HEADER HERO */}
      <section style={{ padding: '4.5rem 0 3.5rem', background: 'var(--bg-muted)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="badge-tag">Partner Institutions</div>
          <h1 style={{ marginBottom: '1.2rem' }}>
            Trusted by 150+ Schools & Colleges Across South India
          </h1>
          <p style={{ fontSize: '1.15rem' }}>
            Explore institutional partners who rely on The Stitch Room for their annual uniform manufacturing, student sizing camps, and custom crest embroidery.
          </p>
        </div>
      </section>

      {/* SEARCH & FILTER CONTROLS */}
      <section style={{ padding: '2.5rem 0 1rem' }}>
        <div className="container">
          <div
            style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 280px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search by school name, city, or uniform style..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.8rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.95rem',
                }}
              />
            </div>

            {/* City Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Filter size={16} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-secondary)' }}>Region:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  background: 'var(--bg-page)',
                }}
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* SCHOOLS DIRECTORY GRID */}
      <section style={{ padding: '2.5rem 0 4rem' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <GraduationCap size={48} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
              <h3>No matching institutions found</h3>
              <p style={{ marginTop: '0.5rem' }}>Try clearing your search query or selecting "All" regions.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCity('All'); }}
                className="btn btn-outline btn-sm"
                style={{ marginTop: '1.2rem' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
              {filtered.map((school) => (
                <div
                  key={school.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                    e.currentTarget.style.borderColor = 'rgba(201, 117, 80, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          color: 'var(--color-primary)',
                          background: 'var(--color-primary-light)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        {school.category || 'School Partner'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <CheckCircle2 size={13} />
                        Active Partner
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
                      {school.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.86rem', marginBottom: '1.2rem' }}>
                      <MapPin size={14} style={{ color: 'var(--color-primary)' }} />
                      <span>{school.city}</span>
                      {school.students && (
                        <>
                          <span style={{ margin: '0 0.3rem' }}>•</span>
                          <Users size={14} />
                          <span>~{school.students} Students</span>
                        </>
                      )}
                    </div>

                    <div style={{ background: 'var(--bg-page)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.2rem' }}>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700', marginBottom: '0.3rem' }}>
                        Standard Uniform Combination:
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-secondary)', fontWeight: '500' }}>
                        {school.uniformType}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>Palette:</span>
                      {school.colors?.map((c, cIdx) => (
                        <span
                          key={cIdx}
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: c,
                            border: '1px solid rgba(0,0,0,0.1)',
                            display: 'inline-block',
                          }}
                        />
                      ))}
                    </div>

                    <Link
                      to={`/contact?school=${encodeURIComponent(school.name)}`}
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      Inquire Similar
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div
            style={{
              background: '#0f172a',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem',
              textAlign: 'center',
              color: '#ffffff',
            }}
          >
            <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>
              Want Your Institution Listed Among Our Partners?
            </h2>
            <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Request our free institutional sample kit with tailored fabric swatches, sizing guides, and automated Tajima embroidery samples.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Partner With The Stitch Room
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
