import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Users,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Building2,
  Phone
} from 'lucide-react';
import { getSchools } from '../utils/storage';
import { TESTIMONIALS, BRAND_INFO } from '../data/mockData';

export default function ClientsPage() {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const testimonialsRef = useRef(null);

  const scrollContainer = (ref, offset) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setSchools(getSchools());
  }, []);

  const filterOptions = ['All', 'CBSE', 'ICSE', 'Matriculation', 'Kindergarten', 'International'];

  const filtered = schools.filter((s) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      (s.category && s.category.toLowerCase().includes(q)) ||
      (s.uniformType && s.uniformType.toLowerCase().includes(q));

    const matchesFilter =
      selectedFilter === 'All' ||
      (s.category && s.category.toLowerCase().includes(selectedFilter.toLowerCase())) ||
      (s.city && s.city.toLowerCase().includes(selectedFilter.toLowerCase()));

    return matchesSearch && matchesFilter;
  });

  return (
    <main style={{ paddingBottom: '5rem' }}>
      {/* HEADER HERO WITH PRESTIGIOUS CAMPUS BACKGROUND */}
      <section
        className="page-hero-banner"
        style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.85)), url(/clients-hero-bg.jpg)',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '860px' }}>
          <div
            className="badge-tag"
            style={{
              background: 'rgba(201, 117, 80, 0.25)',
              color: '#fbeee8',
              borderColor: 'rgba(201, 117, 80, 0.6)',
              marginBottom: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <Sparkles size={13} style={{ color: 'var(--color-primary)' }} />
            <span>Institutional Partner Network</span>
          </div>

          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw + 1rem, 3.1rem)', fontWeight: 800, marginBottom: '1.2rem', lineHeight: 1.18 }}>
            Trusted by{' '}
            <span style={{ background: 'linear-gradient(135deg, #c97550 0%, #f97316 50%, #e0a96d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              150+ Schools & Colleges
            </span>{' '}
            Across South India
          </h1>

          <p style={{ fontSize: '1.12rem', color: '#cbd5e1', lineHeight: 1.7, margin: '0 auto 2rem' }}>
            Explore institutional partners who rely on The Stitch Room for annual uniform manufacturing, master tailor campus sizing camps, and computerized Japanese crest embroidery.
          </p>

          {/* Quick Institutional Stats Strip */}
          <div className="page-hero-stats-pill">
            <span style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '600' }}>150+ Campuses</span>
            <span style={{ color: 'var(--color-primary)' }}>•</span>
            <span style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '600' }}>500k+ Garments</span>
            <span style={{ color: 'var(--color-primary)' }}>•</span>
            <span style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '600' }}>28+ Years Continuous Supply</span>
            <span style={{ color: 'var(--color-primary)' }}>•</span>
            <span style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '600' }}>99.4% On-Time</span>
          </div>
        </div>
      </section>

      {/* SEARCH & INTERACTIVE REGION FILTER CHIPS */}
      <section style={{ padding: '2.5rem 0 1.2rem' }}>
        <div className="container">
          {/* Search Box & Controls */}
          <div
            style={{
              background: '#ffffff',
              padding: '1.4rem 1.6rem',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
              marginBottom: '1.4rem',
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
                placeholder="Search by institution name, city, or uniform line..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.8rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.94rem',
                }}
              />
            </div>

            {/* Match Counter Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.88rem', color: '#64748b' }}>
                Showing <strong style={{ color: 'var(--color-secondary)' }}>{filtered.length}</strong> of {schools.length} institutions
              </span>
              {(searchTerm || selectedFilter !== 'All') && (
                <button
                  onClick={() => { setSearchTerm(''); setSelectedFilter('All'); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-primary)',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Horizontal Scrollable Category & Region Filter Chips */}
          <div className="filter-pills-track">
            {filterOptions.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedFilter(item)}
                className={`filter-chip ${selectedFilter === item ? 'active' : ''}`}
              >
                {item === 'All' ? 'All Institutions' : item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SCHOOLS DIRECTORY GRID */}
      <section style={{ padding: '2rem 0 4rem' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: '#ffffff', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
              <GraduationCap size={48} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--color-secondary)' }}>No matching institutions found</h3>
              <p style={{ marginTop: '0.5rem', color: '#64748b' }}>
                Try adjusting your search query or selecting "All Partner Regions" above.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedFilter('All'); }}
                className="btn btn-primary btn-sm"
                style={{ marginTop: '1.2rem' }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
              {filtered.map((school) => (
                <div
                  key={school.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    padding: '1.8rem',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(15, 23, 42, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(201, 117, 80, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.04)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: '700',
                          color: 'var(--color-primary)',
                          background: 'var(--color-primary-light)',
                          padding: '0.2rem 0.65rem',
                          borderRadius: '9999px',
                        }}
                      >
                        {school.category || 'School Partner'}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <CheckCircle2 size={13} />
                        Active Partner
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.22rem', marginBottom: '0.45rem', color: 'var(--color-secondary)', lineHeight: 1.3 }}>
                      {school.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1.1rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.86rem' }}>
                        <MapPin size={14} style={{ color: 'var(--color-primary)' }} />
                        <span>{school.city}</span>
                        {school.students && (
                          <>
                            <span style={{ margin: '0 0.2rem' }}>•</span>
                            <Users size={14} />
                            <span>~{school.students} Students</span>
                          </>
                        )}
                      </div>

                      {school.mapUrl && (
                        <a
                          href={school.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View campus location on Google Maps"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            color: 'var(--color-primary)',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            textDecoration: 'none'
                          }}
                        >
                          <MapPin size={12} />
                          <span>Google Maps ↗</span>
                        </a>
                      )}
                    </div>

                    <div style={{ background: 'var(--bg-page)', padding: '0.9rem', borderRadius: '8px', marginBottom: '1.2rem', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700', marginBottom: '0.25rem' }}>
                        Uniform Specification:
                      </div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--color-secondary)', fontWeight: '500', lineHeight: 1.4 }}>
                        {school.uniformType}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: '600' }}>Palette:</span>
                      {school.colors?.map((c, cIdx) => (
                        <span
                          key={cIdx}
                          style={{
                            width: '16px',
                            height: '16px',
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
                        fontWeight: '700',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        textDecoration: 'none'
                      }}
                    >
                      Inquire Style
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HORIZONTAL SCROLLER: WHAT INSTITUTIONAL LEADERS SAY (TESTIMONIALS) */}
      <section style={{ padding: '4.5rem 0 3.5rem', background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="badge-tag">Verified Feedback</div>
              <h2 style={{ fontSize: 'clamp(1.7rem, 2.5vw + 0.5rem, 2.2rem)', fontWeight: 800, marginTop: '0.4rem', color: 'var(--color-secondary)' }}>
                What Institutional Leaders Say
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.98rem', marginTop: '0.3rem', maxWidth: '620px' }}>
                Endorsements from school correspondents, medical network directors, and collegiate deans.
              </p>
            </div>
            {/* Scroller Nav Arrows */}
            <div className="scroll-nav-group">
              <button
                className="scroll-nav-btn"
                onClick={() => scrollContainer(testimonialsRef, -360)}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="scroll-nav-btn"
                onClick={() => scrollContainer(testimonialsRef, 360)}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Testimonials Scroller Track */}
          <div className="horizontal-scroll-track" ref={testimonialsRef}>
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="testimonial-luxury-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', gap: '0.2rem' }}>
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={15} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
                      ))}
                    </div>
                    <Quote size={24} style={{ color: 'rgba(201, 117, 80, 0.4)' }} />
                  </div>

                  <p style={{ color: '#334155', fontSize: '0.94rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.6rem' }}>
                    "{t.quote}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <div style={{ fontWeight: '700', color: 'var(--color-secondary)', fontSize: '0.96rem' }}>
                    {t.name}
                  </div>
                  <div style={{ color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: '600', marginTop: '0.15rem' }}>
                    {t.role}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                    {t.institution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL PROCUREMENT CONSULTATION BANNER */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div
            className="b2b-cta-card"
            style={{
              background: 'radial-gradient(circle at 10% 20%, rgba(201, 117, 80, 0.18) 0%, transparent 45%), linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              border: '1px solid rgba(201, 117, 80, 0.3)'
            }}
          >
            <div className="b2b-cta-content" style={{ padding: '3.5rem' }}>
              <div
                className="badge-tag"
                style={{
                  backgroundColor: 'rgba(201, 117, 80, 0.25)',
                  color: '#fbeee8',
                  borderColor: 'rgba(201, 117, 80, 0.6)',
                  marginBottom: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
              >
                <Sparkles size={13} style={{ color: 'var(--color-primary)' }} />
                <span>Partner Onboarding</span>
              </div>

              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.9rem, 2.5vw + 0.8rem, 2.5rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                Want Your Institution Listed Among Our Partners?
              </h2>

              <p style={{ color: '#cbd5e1', lineHeight: '1.7', marginBottom: '1.8rem', maxWidth: '520px' }}>
                Request our customized physical sample kit with tailored fabric swatches, sizing master trials, and automated Tajima embroidery mockups for your management committee.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.8rem', marginBottom: '2.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>Free Physical Committee Kits</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>On-Campus Master Tailor Sizing</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>Punctual Reopening Deliveries</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>Direct Factory Floor Pricing</span>
                </div>
              </div>

              <div className="b2b-cta-btns">
                <Link to="/contact" className="btn btn-primary btn-lg" style={{ boxShadow: '0 6px 20px rgba(201, 117, 80, 0.45)' }}>
                  Partner With The Stitch Room
                  <ArrowRight size={17} />
                </Link>
                <a
                  href={`tel:${BRAND_INFO.phone1}`}
                  className="btn btn-outline btn-lg"
                  style={{
                    color: '#ffffff',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    background: 'rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <Phone size={17} style={{ color: 'var(--color-primary)' }} />
                  Speak to Institutional Desk
                </a>
              </div>
            </div>

            <div className="b2b-cta-img-wrap" style={{ minHeight: '380px' }}>
              <img
                src="/school.png"
                alt="The Stitch Room Partner Campuses"
                className="b2b-cta-img"
                onError={(e) => {
                  e.currentTarget.src = '/b2b-showcase.jpg';
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.4rem',
                  left: '1.4rem',
                  right: '1.4rem',
                  background: 'rgba(15, 23, 42, 0.88)',
                  backdropFilter: 'blur(10px)',
                  padding: '1.1rem 1.4rem',
                  borderRadius: '14px',
                  border: '1px solid rgba(201, 117, 80, 0.4)',
                  color: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: '700' }}>
                  <Building2 size={15} />
                  <span>Institutional Procurement Desk</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '0.3rem' }}>
                  Direct Factory Liaison for Schools, Colleges & Hospitals
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
