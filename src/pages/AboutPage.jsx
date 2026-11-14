import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  Users,
  Target,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scissors,
  Layers,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Factory,
  Compass,
  Check
} from 'lucide-react';
import { BRAND_INFO } from '../data/mockData';

export default function AboutPage() {
  const timelineRef = useRef(null);
  const standardsRef = useRef(null);

  const scrollContainer = (ref, offset) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const milestones = [
    {
      year: '1995',
      title: 'The Katpadi Atelier',
      subtitle: '4 Master Pedal Machines',
      desc: 'Founded with a resolute focus on durable school uniforms in Gandhinagar East, Katpadi. Set out to eradicate fading colors and tearing pockets.',
      tag: 'Foundation'
    },
    {
      year: '2002',
      title: 'Sanforization Standard',
      subtitle: 'Zero Shrinkage Formulation',
      desc: 'Standardized reactive vat-dyed spun yarns with sanforization pre-wash treatment, keeping dimensional shift below 1.2% after washing.',
      tag: 'Textile Innovation'
    },
    {
      year: '2009',
      title: 'Japanese Tajima Machinery',
      subtitle: 'Computerized Multi-Head Crests',
      desc: 'Integrated automated high-density Tajima multi-head embroidery stations to produce razor-sharp school crests without collar puckering.',
      tag: 'Automation'
    },
    {
      year: '2016',
      title: '100th Campus Milestone',
      subtitle: 'South India Expansion',
      desc: 'Became the preferred uniform manufacturer across Vellore, Chennai, Ranipet, and Coimbatore for elite matriculation and international schools.',
      tag: 'Scale'
    },
    {
      year: '2021',
      title: 'CAD Laser Cutting Floor',
      subtitle: 'Millimeter Fit Precision',
      desc: 'Digitized pattern grading with automated fabric cutters, ensuring Size 32 in May is millimeter-identical to Size 32 in September.',
      tag: 'Technology'
    },
    {
      year: '2025+',
      title: 'Next-Gen Campus Sizing',
      subtitle: '150+ Institutional Partners',
      desc: 'Dedicated on-campus tailor fitting camps, complimentary physical sample kits, and guaranteed dispatch weeks before reopening.',
      tag: 'Leadership'
    }
  ];

  const standards = [
    {
      step: '01',
      title: 'Fabric Laboratory & Yarn Testing',
      spec: 'Reactive Vat-Dyeing • 220+ GSM Options',
      desc: 'High-twist spun yarns tested across 4 wash cycles for zero color bleeding, anti-pilling surface finish, and long-term sunfastness.',
      icon: Layers
    },
    {
      step: '02',
      title: 'CAD Pattern Grading & Laser Cut',
      spec: 'Digitized CAD Geometry • Exact Armholes',
      desc: 'Computer-calibrated pattern blocks for each age bracket, ensuring armholes and collar curves fit comfortably without strain.',
      icon: Scissors
    },
    {
      step: '03',
      title: 'Japanese Tajima Crest Embroidery',
      spec: '12-Needle Stations • Protective Skin Backing',
      desc: 'High-density computerized crests with ultra-fine thread tension, backed with soft fusible interlining that never scratches delicate skin.',
      icon: Award
    },
    {
      step: '04',
      title: 'Heavy-Duty Bar-Tack Seams',
      spec: '28-Stitch Lockstitch Anchors',
      desc: 'Every pocket corner, belt loop, and side vent is reinforced with industrial bar-tack anchors, preventing common campus tears.',
      icon: ShieldCheck
    },
    {
      step: '05',
      title: 'Master Tailor Campus Sizing Camps',
      spec: 'Physical Master Kits • On-Campus Camps',
      desc: 'Our master tailoring team visits your campus with full size trial racks, taking individual measurements with zero administrative burden.',
      icon: Users
    },
    {
      step: '06',
      title: 'Guaranteed Reopening Delivery',
      spec: 'Dedicated Production Slots • Zero Delay',
      desc: 'Batch dispatch scheduled 3 weeks prior to academic reopening, fully bundled and class-sorted with zero quality recalls.',
      icon: Clock
    }
  ];

  return (
    <main style={{ paddingBottom: '5rem' }}>
      {/* HEADER HERO WITH CINEMATIC ATELIER BACKGROUND */}
      <section
        className="page-hero-banner"
        style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.85)), url(/about-hero-bg.jpg)',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '880px' }}>
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
            <span>Our Heritage & Master Craftsmanship</span>
          </div>

          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw + 1rem, 3.1rem)', fontWeight: 800, marginBottom: '1.2rem', lineHeight: 1.18 }}>
            Weaving Integrity Into Every Seam{' '}
            <span style={{ background: 'linear-gradient(135deg, #c97550 0%, #f97316 50%, #e0a96d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Since 1995
            </span>
          </h1>

          <p style={{ fontSize: '1.12rem', color: '#cbd5e1', lineHeight: 1.7, margin: '0 auto 2rem' }}>
            From our founding workshop in Katpadi, Vellore to outfitting over 150 institutional campuses across South India — precision engineering, sanforized textiles, and master tailoring.
          </p>

          {/* Key Stat Strip */}
          <div className="page-hero-stats-pill">
            <span style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '600' }}>Katpadi, Vellore Origin</span>
            <span style={{ color: 'var(--color-primary)' }}>•</span>
            <span style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '600' }}>150+ Campuses</span>
            <span style={{ color: 'var(--color-primary)' }}>•</span>
            <span style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '600' }}>500,000+ Uniforms Crafted</span>
            <span style={{ color: 'var(--color-primary)' }}>•</span>
            <span style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '600' }}>Zero Recall Policy</span>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLLER 1: OUR 30-YEAR JOURNEY & MILESTONES */}
      <section style={{ padding: '4.5rem 0 3.5rem', background: 'var(--bg-page)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="badge-tag">Our Milestones</div>
              <h2 style={{ fontSize: 'clamp(1.7rem, 2.5vw + 0.5rem, 2.3rem)', fontWeight: 800, marginTop: '0.4rem', color: 'var(--color-secondary)' }}>
                30 Years of Institutional Craftsmanship
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.98rem', marginTop: '0.3rem', maxWidth: '600px' }}>
                Scroll horizontally through three decades of technical uniform innovation in Tamil Nadu.
              </p>
            </div>
            {/* Scroller Nav Arrows */}
            <div className="scroll-nav-group">
              <button
                className="scroll-nav-btn"
                onClick={() => scrollContainer(timelineRef, -330)}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="scroll-nav-btn"
                onClick={() => scrollContainer(timelineRef, 330)}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Horizontal Scroller Track */}
          <div className="horizontal-scroll-track" ref={timelineRef}>
            {milestones.map((m, idx) => (
              <div key={idx} className="timeline-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
                    <div className="timeline-year-badge">
                      <Clock size={14} />
                      <span>{m.year}</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', background: 'var(--bg-page)', padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                      {m.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem', color: 'var(--color-secondary)' }}>
                    {m.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '0.85rem' }}>
                    {m.subtitle}
                  </div>
                  <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {m.desc}
                  </p>
                </div>

                <div style={{ marginTop: '1.6rem', paddingTop: '0.8rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: '#10b981', fontWeight: '600' }}>
                  <CheckCircle2 size={14} />
                  <span>Verified Operational Milestone</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY & HERITAGE NARRATIVE */}
      <section style={{ padding: '4.5rem 0', background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <div className="badge-tag">The 1995 Origin</div>
              <h2 style={{ marginBottom: '1.4rem', fontSize: 'clamp(1.8rem, 2.5vw + 0.6rem, 2.4rem)' }}>
                From a Dedicated Workshop in Katpadi to Over 150 Institutions
              </h2>
              <p style={{ marginBottom: '1.2rem', lineHeight: '1.8', color: '#475569' }}>
                When The Stitch Room opened its doors over two decades ago, institutional buyers faced the same recurring frustration: uniforms that shrank by two sizes within three weeks of school reopening, colors that ran onto white collars, and pockets that tore away under daily student activity.
              </p>
              <p style={{ marginBottom: '1.8rem', lineHeight: '1.8', color: '#475569' }}>
                We committed to a different manufacturing philosophy: using exclusively <strong>reactive vat-dyed spun yarns</strong>, sanforizing fabrics before cutting, and using industrial lockstitching reinforced with bar-tack anchors at every pocket corner and belt loop.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.2rem', marginBottom: '2.2rem' }}>
                <div style={{ background: 'var(--bg-page)', padding: '1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>100%</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-secondary)' }}>Pre-Shrunk Yarns</div>
                </div>
                <div style={{ background: 'var(--bg-page)', padding: '1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Zero</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-secondary)' }}>Fabric Bleed Tolerance</div>
                </div>
                <div style={{ background: 'var(--bg-page)', padding: '1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>28-Stitch</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-secondary)' }}>Bar-Tack Reinforcements</div>
                </div>
              </div>

              <Link to="/contact" className="btn btn-primary btn-lg">
                Consult With Our Master Tailors
                <ArrowRight size={17} />
              </Link>
            </div>

            <div>
              <div
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(15, 23, 42, 0.14)',
                  border: '1px solid rgba(201, 117, 80, 0.25)',
                  position: 'relative',
                  background: '#0f172a'
                }}
              >
                <img
                  src="/legacy.png"
                  alt="The Stitch Room Heritage"
                  style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/corporate-uniform.jpg';
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
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Authentic Vellore Atelier
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '700', marginTop: '0.2rem' }}>
                    Master Pattern Cutting Floor • Gandhinagar East
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLLER 2: MASTER CRAFTSMANSHIP & TECHNICAL STANDARDS */}
      <section style={{ padding: '4.5rem 0 3.5rem', background: 'var(--bg-page)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="badge-tag">Technical Standards</div>
              <h2 style={{ fontSize: 'clamp(1.7rem, 2.5vw + 0.5rem, 2.3rem)', fontWeight: 800, marginTop: '0.4rem', color: 'var(--color-secondary)' }}>
                Master Craftsmanship at Every Stage
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.98rem', marginTop: '0.3rem', maxWidth: '620px' }}>
                Swipe across our institutional quality assurance steps ensuring zero quality defects.
              </p>
            </div>
            {/* Scroller Nav Arrows */}
            <div className="scroll-nav-group">
              <button
                className="scroll-nav-btn"
                onClick={() => scrollContainer(standardsRef, -320)}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="scroll-nav-btn"
                onClick={() => scrollContainer(standardsRef, 320)}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Horizontal Scroller Track */}
          <div className="horizontal-scroll-track" ref={standardsRef}>
            {standards.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div key={idx} className="craft-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: 'var(--color-primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary)',
                      }}
                    >
                      <IconComp size={22} />
                    </div>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'rgba(201, 117, 80, 0.45)', fontFamily: 'var(--font-heading)' }}>
                      {s.step}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.18rem', marginBottom: '0.4rem', color: 'var(--color-secondary)' }}>
                    {s.title}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '0.8rem' }}>
                    {s.spec}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* THREE PILLARS OF MANUFACTURING */}
      <section style={{ padding: '4.5rem 0', background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <div className="badge-tag">Our Principles</div>
            <h2 className="section-title">The Three Pillars of Our Manufacturing</h2>
            <p className="section-desc">
              How our dedicated production floor guarantees zero compromise across hundreds of thousands of uniform sets.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '2.4rem', borderRadius: '18px', background: 'var(--bg-page)', border: '1px solid var(--border-color)', transition: 'transform 0.2s ease' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '1.2rem' }}>
                <Target size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem', color: 'var(--color-secondary)' }}>1. Exact Fabric Blending</h3>
              <p style={{ fontSize: '0.94rem', color: '#64748b', lineHeight: 1.7 }}>
                We formulate specific polyester-to-cotton ratios tailored to climate and daily usage — providing the breathability of natural cotton with the tensile strength and quick-dry ease of micro-poly fibers.
              </p>
            </div>

            <div style={{ padding: '2.4rem', borderRadius: '18px', background: 'var(--bg-page)', border: '1px solid var(--border-color)', transition: 'transform 0.2s ease' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '1.2rem' }}>
                <Scissors size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem', color: 'var(--color-secondary)' }}>2. CAD Precision Cutting</h3>
              <p style={{ fontSize: '0.94rem', color: '#64748b', lineHeight: 1.7 }}>
                Laser and automated CAD fabric cutters guarantee that Size 32 in May is millimeter-identical in shoulder width and collar curve to Size 32 in September, eliminating inconsistent fit across terms.
              </p>
            </div>

            <div style={{ padding: '2.4rem', borderRadius: '18px', background: 'var(--bg-page)', border: '1px solid var(--border-color)', transition: 'transform 0.2s ease' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '1.2rem' }}>
                <Clock size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem', color: 'var(--color-secondary)' }}>3. Punctual Academic Dispatch</h3>
              <p style={{ fontSize: '0.94rem', color: '#64748b', lineHeight: 1.7 }}>
                We understand that school reopening dates are immutable. Our production scheduling reserves dedicated line capacity months in advance to ensure complete deliveries weeks before day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MASTER WORKSHOP IN KATPADI — LUXURY SHOWCASE CARD */}
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
                <Factory size={13} style={{ color: 'var(--color-primary)' }} />
                <span>Katpadi Master Workshop & Atelier</span>
              </div>

              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.9rem, 2.5vw + 0.8rem, 2.5rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                Visit Our Manufacturing Facility in Katpadi
              </h2>

              <p style={{ color: '#cbd5e1', lineHeight: '1.7', marginBottom: '1.8rem', maxWidth: '520px' }}>
                We invite school trust committees, hospital administrators, and corporate purchasing heads to tour our cutting, embroidery, and stitching floors in Gandhinagar East, Katpadi.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.8rem', marginBottom: '2.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>300+ Fabric Swatches Library</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>Live Tajima Embroidery Demo</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>On-Spot GSM Fabric Verification</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>Immediate Committee Quotations</span>
                </div>
              </div>

              <div className="b2b-cta-btns">
                <Link to="/contact" className="btn btn-primary btn-lg" style={{ boxShadow: '0 6px 20px rgba(201, 117, 80, 0.45)' }}>
                  Book a Factory Visit
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
                  Call Katpadi Studio
                </a>
              </div>
            </div>

            <div className="b2b-cta-img-wrap" style={{ minHeight: '380px' }}>
              <img
                src="/b2b-showcase.jpg"
                alt="The Stitch Room Master Workshop in Katpadi"
                className="b2b-cta-img"
                onError={(e) => {
                  e.currentTarget.src = '/legacy.png';
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: '700' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={15} />
                    <span>Katpadi, Vellore • Tamil Nadu</span>
                  </div>
                  <a
                    href={BRAND_INFO.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      background: 'rgba(201, 117, 80, 0.85)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}
                  >
                    Google Maps ↗
                  </a>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '0.4rem' }}>
                  {BRAND_INFO.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
