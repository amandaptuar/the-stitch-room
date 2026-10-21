import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UNIFORM_CATEGORIES } from '../data/mockData';

export default function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const total = UNIFORM_CATEGORIES.length;

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 60) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -60) {
      handlePrev();
    }
  };

  const current = UNIFORM_CATEGORIES[currentIndex];

  return (
    <div
      className="featured-slider-box"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'stretch',
        }}
      >
        {/* Visual Image Side */}
        <div style={{ position: 'relative', minHeight: '340px', background: '#0f172a' }}>
          <img
            src={current.image}
            alt={current.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.4s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '1.2rem',
              left: '1.2rem',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              padding: '0.35rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: '700',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {current.tag}
          </div>
        </div>

        {/* Content Details Side */}
        <div
          style={{
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase' }}>
              Collection {currentIndex + 1} of {total}
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>
              Swipe or tap dots to explore
            </span>
          </div>

          <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', color: 'var(--color-secondary)' }}>
            {current.title}
          </h3>

          <p style={{ fontSize: '1.02rem', color: '#475569', marginBottom: '1.4rem' }}>
            {current.desc}
          </p>

          <div style={{ marginBottom: '1.6rem' }}>
            <h5 style={{ fontSize: '0.9rem', color: 'var(--color-secondary)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Technical Specifications:
            </h5>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {current.specs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: '#334155' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
                    <Check size={12} />
                  </div>
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginTop: 'auto', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-sm" style={{ flex: '1 1 200px' }}>
              Inquire for This Range
              <ArrowRight size={16} />
            </Link>
            <Link to="/3d-showroom" className="btn btn-outline btn-sm" style={{ flex: '1 1 200px' }}>
              Customize in 3D Studio
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.8rem 0',
          background: 'var(--bg-muted)',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        {UNIFORM_CATEGORIES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            style={{
              width: currentIndex === idx ? '28px' : '8px',
              height: '8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: currentIndex === idx ? 'var(--color-primary)' : '#cbd5e1',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
