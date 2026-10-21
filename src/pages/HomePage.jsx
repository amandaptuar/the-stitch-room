import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  Layers,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Scissors,
  Palette,
  Truck,
  MessageCircle,
  Quote,
  Star,
  Check
} from 'lucide-react';
import MarqueeRibbon from '../components/MarqueeRibbon';
import FeaturedCarousel from '../components/FeaturedCarousel';
import {
  BRAND_INFO,
  UNIFORM_CATEGORIES,
  COMPARISON_DATA,
  TESTIMONIALS,
  FAQS
} from '../data/mockData';

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  
  // Refs for horizontal scrollers
  const sectorScrollRef = useRef(null);
  const processScrollRef = useRef(null);

  // Auto-rotate testimonials smoothly every 5 seconds
  useEffect(() => {
    if (isTestimonialPaused) return;
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isTestimonialPaused]);

  return (
    <main>
      {/* =========================================================================
          HERO SECTION — STATE-OF-THE-ART LUXURY AGENCY REDESIGN
         ========================================================================= */}
      <section className="hero-section">
        <div className="container hero-grid">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="hero-badge-pill"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
              <span>EST. 1995 • SOUTH INDIA'S TRUSTED TEXTILE MAKER</span>
            </motion.div>

            <h1 className="hero-headline">
              Precision Crafted <span className="hero-gradient-text">Institutional Uniforms</span> Built To Endure.
            </h1>

            <p className="hero-subtext">
              Outfitting over 150+ leading schools, hospitals, and corporate organizations across South India with certified pre-shrunk fabrics, Japanese Tajima automated crest embroidery, and guaranteed on-time reopening dispatch.
            </p>

            <div className="hero-cta-group">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request Bulk Consultation
                <ArrowRight size={18} />
              </Link>
              <Link to="/3d-showroom" className="btn btn-outline btn-lg">
                <Scissors size={18} />
                Open 3D Uniform Studio
              </Link>
            </div>

            {/* Quick Micro-Trust Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.6rem', fontSize: '0.85rem', color: '#475569' }}>
              <div style={{ display: 'flex', color: '#f59e0b' }}>
                {'★'.repeat(5)}
              </div>
              <span><strong>4.9 / 5</strong> rating from 150+ institutional leadership teams</span>
            </div>

            <div className="hero-trust-badges">
              <div className="trust-item">
                <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />
                <span>Zero Bleed Reactive Dye</span>
              </div>
              <div className="trust-item">
                <Clock size={20} style={{ color: 'var(--color-primary)' }} />
                <span>On-Time Reopening Guarantee</span>
              </div>
              <div className="trust-item">
                <Award size={20} style={{ color: 'var(--color-primary)' }} />
                <span>150+ Institutional Partners</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Presentation with Floating Badges */}
          <motion.div
            className="hero-visual-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Top Right Floating Badge */}
            <motion.div
              className="hero-floating-card-top"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Palette size={16} />
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-secondary)' }}>
                Tajima Computerized Embroidery
              </div>
            </motion.div>

            {/* Main Visual Image */}
            <div className="hero-main-img-wrap">
              <img
                src="/front1.png"
                alt="The Stitch Room Premium Uniform Showcase"
                className="hero-main-img"
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/school-uniform.jpg';
                }}
              />
            </div>

            {/* Bottom Left Floating Badge */}
            <motion.div
              className="floating-stat-badge"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="floating-stat-num">28+</div>
              <div className="floating-stat-label">
                Years of Institutional<br />Textile Excellence
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* INFINITE MARQUEE */}
      <MarqueeRibbon />

      {/* STATS OVERVIEW COMPACT STRIP */}
      <section className="stats-overview-section">
        <div className="container">
          <div className="stats-overview-grid">
            {BRAND_INFO.stats.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="stats-overview-card"
              >
                <div className="stats-overview-num">
                  {st.value}
                </div>
                <div className="stats-overview-label">
                  {st.label}
                </div>
                <div className="stats-overview-sub">
                  {st.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          HORIZONTAL SCROLLER: ENGINEERED SPECIALLY FOR EVERY SECTOR
          (Clean swipe track with no <> buttons)
         ========================================================================= */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-page)' }}>
        <div className="container">
          {/* Header Row */}
          <div className="section-header-row">
            <div className="section-header-left">
              <div className="badge-tag">Our Uniform Lines</div>
              <h2 className="section-title" style={{ margin: '0.4rem 0 0.6rem' }}>
                Engineered Specially For Every Sector
              </h2>
              <p className="section-desc" style={{ margin: 0 }}>
                Swipe horizontally to browse our tailored fabric weaves and reinforced construction specs.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="badge-tag" style={{ margin: 0, background: '#ffffff', border: '1px solid var(--border-color)', color: 'var(--color-primary)', fontSize: '0.78rem' }}>
                ← Swipe to explore categories →
              </span>
            </div>
          </div>

          {/* Horizontal Scroll Track */}
          <div className="horizontal-scroll-track" ref={sectorScrollRef}>
            {UNIFORM_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                className="horizontal-card-item category-card"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                style={{ height: 'auto', display: 'flex', flexDirection: 'column' }}
              >
                <div className="card-img-wrap" style={{ height: '190px' }}>
                  <img src={cat.image} alt={cat.title} className="card-img" />
                  <div className="card-tag">{cat.tag}</div>
                </div>

                <div className="card-body" style={{ padding: '1.4rem' }}>
                  <h3 className="card-title" style={{ fontSize: '1.25rem' }}>{cat.title}</h3>
                  <p className="card-desc" style={{ fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                    {cat.desc}
                  </p>
                  
                  <ul className="card-specs-list" style={{ marginBottom: '1.2rem', gap: '0.35rem' }}>
                    {cat.specs.slice(0, 3).map((spec, sIdx) => (
                      <li key={sIdx} className="spec-item" style={{ fontSize: '0.82rem' }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={`/uniforms#${cat.id}`} className="btn btn-outline btn-sm" style={{ marginTop: 'auto', width: '100%' }}>
                    View Technical Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTOMATED FEATURED CAROUSEL (No <> buttons) */}
      <section style={{ padding: '4.5rem 0', background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge-tag">Interactive Catalog</div>
            <h2 className="section-title">Explore Featured Collections & Specs</h2>
            <p className="section-desc">
              Automatic showcase with touch gestures, instant fabric swatches, and quote links.
            </p>
          </div>

          <FeaturedCarousel />
        </div>
      </section>

      {/* COMPARISON MODULE */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-page)' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge-tag">The Quality Benchmark</div>
            <h2 className="section-title">How We Compare to Standard Market Uniforms</h2>
            <p className="section-desc">
              A breakdown of the exact manufacturing standards that make our garments last academic year after academic year.
            </p>
            <div style={{ display: 'inline-block', marginTop: '0.8rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '700', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)' }}>
              ↔ Swipe horizontally on mobile to view full comparison
            </div>
          </div>

          <div className="comparison-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '28%', minWidth: '160px' }}>Quality Parameter</th>
                  <th style={{ width: '36%', minWidth: '220px' }}>Standard Market Suppliers</th>
                  <th style={{ width: '36%', minWidth: '220px' }} className="tsr-col">
                    The Stitch Room Standard
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td style={{ fontWeight: '600', color: 'var(--color-secondary)' }}>
                      {row.feature}
                    </td>
                    <td style={{ color: '#64748b' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <XCircle size={17} style={{ color: '#ef4444', flexShrink: 0, marginTop: '3px' }} />
                        <span>{row.market}</span>
                      </div>
                    </td>
                    <td className="tsr-col">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <CheckCircle2 size={17} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '3px' }} />
                        <span>{row.stitchRoom}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HORIZONTAL WORKFLOW: END-TO-END DELIVERY PROCESS
          (Swipeable stepper with no <> buttons)
         ========================================================================= */}
      <section style={{ padding: '4.5rem 0', background: '#0f172a', color: '#ffffff' }}>
        <div className="container">
          <div className="section-header-row" style={{ alignItems: 'flex-end' }}>
            <div className="section-header-left">
              <div className="badge-tag" style={{ backgroundColor: 'rgba(201, 117, 80, 0.2)', color: '#fbeee8' }}>
                Execution Workflow
              </div>
              <h2 className="section-title" style={{ color: '#ffffff', margin: '0.4rem 0 0.6rem' }}>
                End-to-End Institutional Delivery Process
              </h2>
              <p className="section-desc" style={{ color: '#94a3b8', margin: 0 }}>
                From initial yarn selection to student sizing camps and final packaged campus dispatch.
              </p>
            </div>

            <div>
              <span className="badge-tag" style={{ margin: 0, backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', fontSize: '0.78rem' }}>
                ← Swipe to view all 4 steps →
              </span>
            </div>
          </div>

          {/* Horizontal Swipeable Stepper */}
          <div
            className="horizontal-scroll-track"
            ref={processScrollRef}
            style={{ paddingBottom: '1rem' }}
          >
            {[
              {
                step: '01',
                icon: Layers,
                title: 'Fabric Curation & Testing',
                desc: 'Selecting high-twist reactive dyed yarns with pre-shrinkage treatment to guarantee fade resistance and shape retention.'
              },
              {
                step: '02',
                icon: Scissors,
                title: 'Pattern Making & Grading',
                desc: 'Digital CAD patterns calibrated to institutional sizing tiers ensuring comfortable armholes, shoulder drape, and trouser inseams.'
              },
              {
                step: '03',
                icon: Palette,
                title: 'High-Density Tajima Embroidery',
                desc: 'Japanese multi-head embroidery machines replicating school and corporate crests with razor-sharp thread fidelity.'
              },
              {
                step: '04',
                icon: Truck,
                title: 'Barcoded Batch Dispatch',
                desc: 'Garments individually tagged, student/class sorted, and safely delivered directly to your campus before reopening week.'
              }
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="horizontal-card-item"
                  style={{
                    backgroundColor: '#1e293b',
                    borderRadius: 'var(--radius-md)',
                    padding: '2rem 1.6rem',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'rgba(201, 117, 80, 0.4)', lineHeight: 1 }}>
                        {p.step}
                      </span>
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(201, 117, 80, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={22} style={{ color: 'var(--color-primary)' }} />
                      </div>
                    </div>
                    <h4 style={{ color: '#ffffff', fontSize: '1.15rem', marginBottom: '0.6rem' }}>{p.title}</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>{p.desc}</p>
                  </div>
                  <div style={{ marginTop: '1.4rem', height: '3px', width: '100%', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(idx + 1) * 25}%`, background: 'var(--color-primary)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* B2B BULK PARTNERSHIP BANNER */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-page)' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              alignItems: 'center',
            }}
          >
            <div style={{ padding: '2.5rem' }}>
              <div className="badge-tag" style={{ backgroundColor: 'rgba(201, 117, 80, 0.25)', color: '#ffffff' }}>
                Bulk Institutional Supply
              </div>
              <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '1rem', lineHeight: '1.2' }}>
                Planning Uniforms for Next Academic Year?
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.98rem', marginBottom: '1.8rem', lineHeight: '1.6' }}>
                Book our master tailor campus sizing camp early. We prepare customized physical sample kits for your management committee with zero obligation.
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary btn-sm" style={{ flex: '1 1 200px' }}>
                  Schedule Consultation
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`tel:${BRAND_INFO.phone1}`}
                  className="btn btn-outline btn-sm"
                  style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.2)', flex: '1 1 200px' }}
                >
                  Call +91 78128 79053
                </a>
              </div>
            </div>
            <div style={{ height: '100%', minHeight: '260px', position: 'relative' }}>
              <img
                src="/b2b.png"
                alt="B2B Bulk Garment Manufacturing"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/corporate-uniform.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLIENT TESTIMONIALS (Auto-rotating with indicator dots, no <> buttons)
         ========================================================================= */}
      <section style={{ padding: '4.5rem 0', background: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div className="section-header">
            <div className="badge-tag">Client Testimonials</div>
            <h2 className="section-title">Endorsed by Principals & Administrators</h2>
            <p className="section-desc">
              Real institutional experiences from leadership across South India.
            </p>
          </div>

          {/* Testimonial Slider Card */}
          <div
            style={{
              background: 'var(--bg-page)',
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
            }}
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
          >
            <Quote
              size={44}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                color: 'var(--color-primary-light)',
                opacity: 0.8,
              }}
            />

            <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem', color: '#f59e0b' }}>
              {'★'.repeat(TESTIMONIALS[testimonialIndex].rating)}
            </div>

            <p style={{ fontStyle: 'italic', color: '#1e293b', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.8rem', minHeight: '80px' }}>
              "{TESTIMONIALS[testimonialIndex].quote}"
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.4rem' }}>
              <div>
                <div style={{ fontWeight: '700', fontFamily: 'var(--font-heading)', color: 'var(--color-secondary)', fontSize: '1.05rem' }}>
                  {TESTIMONIALS[testimonialIndex].name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: '600' }}>
                  {TESTIMONIALS[testimonialIndex].role}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  {TESTIMONIALS[testimonialIndex].institution}
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' }}>
                Story {testimonialIndex + 1} of {TESTIMONIALS.length}
              </div>
            </div>

            {/* Indicator Dots for smooth switching */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              {TESTIMONIALS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setTestimonialIndex(dotIdx)}
                  style={{
                    width: testimonialIndex === dotIdx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: testimonialIndex === dotIdx ? 'var(--color-primary)' : '#cbd5e1',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQS ACCORDION */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-page)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="section-header">
            <div className="badge-tag">Frequently Answered</div>
            <h2 className="section-title">Common Institutional Questions</h2>
            <p className="section-desc">
              Everything you need to know about minimum order quantities, sampling, measurements, and delivery.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {FAQS.map((faq, fIdx) => (
              <div
                key={fIdx}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === fIdx ? -1 : fIdx)}
                  style={{
                    width: '100%',
                    padding: '1.2rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: activeFaq === fIdx ? 'var(--color-primary)' : 'var(--color-secondary)',
                  }}
                >
                  <span style={{ paddingRight: '1rem' }}>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: activeFaq === fIdx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {activeFaq === fIdx && (
                  <div style={{ padding: '0 1.5rem 1.4rem', color: '#475569', fontSize: '0.95rem', lineHeight: '1.7', borderTop: '1px solid #f1f5f9' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
