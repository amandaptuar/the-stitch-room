import React from 'react';
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
  Scissors
} from 'lucide-react';
import { BRAND_INFO } from '../data/mockData';

export default function AboutPage() {
  return (
    <main style={{ paddingBottom: '5rem' }}>
      {/* HEADER HERO */}
      <section style={{ padding: '4.5rem 0 3.5rem', background: 'var(--bg-muted)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="badge-tag">Our Heritage & Story</div>
          <h1 style={{ marginBottom: '1.2rem' }}>
            Weaving Integrity Into Every Seam Since 1995
          </h1>
          <p style={{ fontSize: '1.15rem' }}>
            Founded in Katpadi, Vellore, The Stitch Room began with a singular focus: to end the cycle of ill-fitting, fast-fading institutional uniforms with heavy-duty textiles and master tailoring.
          </p>
        </div>
      </section>

      {/* STORY & LEGACY */}
      <section style={{ padding: '5rem 0' }}>
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
              <h2 style={{ marginBottom: '1.4rem' }}>
                From a Dedicated Workshop in Vellore to Over 150 Institutions
              </h2>
              <p style={{ marginBottom: '1.2rem', lineHeight: '1.8' }}>
                When The Stitch Room opened its doors over two decades ago, institutional buyers faced the same recurring frustration: uniforms that shrank by two sizes within three weeks of school reopening, colors that ran onto white collars, and pockets that tore away under daily student activity.
              </p>
              <p style={{ marginBottom: '1.8rem', lineHeight: '1.8' }}>
                We committed to a different manufacturing philosophy: using exclusively <strong>reactive vat-dyed spun yarns</strong>, sanforizing fabrics before cutting, and using industrial lockstitching reinforced with bar-tack anchors at every pocket corner and belt loop.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '2rem' }}>
                <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-primary)' }}>100%</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-secondary)' }}>Pre-Shrunk Yarns</div>
                </div>
                <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-primary)' }}>Zero</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-secondary)' }}>Fabric Bleed Tolerance</div>
                </div>
              </div>

              <Link to="/contact" className="btn btn-primary">
                Consult With Our Master Tailors
                <ArrowRight size={16} />
              </Link>
            </div>

            <div>
              <div
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '4px solid #ffffff',
                }}
              >
                <img
                  src="/legacy.png"
                  alt="The Stitch Room Heritage"
                  style={{ width: '100%', height: '440px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/corporate-uniform.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS */}
      <section style={{ padding: '5rem 0', background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge-tag">Our Principles</div>
            <h2 className="section-title">The Three Pillars of Our Manufacturing</h2>
            <p className="section-desc">
              How our manufacturing facility guarantees zero compromise across hundreds of thousands of uniform sets.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '2.2rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-page)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '1.2rem' }}>
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>1. Exact Fabric Blending</h3>
              <p style={{ fontSize: '0.94rem' }}>
                We formulate specific polyester-to-cotton ratios tailored to climate and daily usage — providing the softness of natural cotton with the tensile strength and quick-dry ease of micro-poly fibers.
              </p>
            </div>

            <div style={{ padding: '2.2rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-page)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '1.2rem' }}>
                <Scissors size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>2. CAD Precision Cutting</h3>
              <p style={{ fontSize: '0.94rem' }}>
                Laser and automated CAD fabric cutters guarantee that Size 32 in May is identical in shoulder width and collar curve to Size 32 in September, eliminating inconsistent fit across siblings and classes.
              </p>
            </div>

            <div style={{ padding: '2.2rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-page)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '1.2rem' }}>
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>3. Punctual Academic Dispatch</h3>
              <p style={{ fontSize: '0.94rem' }}>
                We understand that school reopening dates are immutable. Our production scheduling reserves dedicated line capacity months in advance to ensure complete deliveries weeks before day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKSHOP LOCATION & FACILITIES */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div
            style={{
              background: '#0f172a',
              borderRadius: 'var(--radius-lg)',
              padding: '3.5rem',
              color: '#ffffff',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <div className="badge-tag" style={{ backgroundColor: 'rgba(201, 117, 80, 0.25)', color: '#ffffff' }}>
                Master Workshop
              </div>
              <h2 style={{ color: '#ffffff', marginBottom: '1.2rem' }}>
                Visit Our Manufacturing Facility in Katpadi
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', marginBottom: '1.8rem' }}>
                We invite school trust committees, hospital administrators, and corporate purchasing heads to tour our cutting, embroidery, and stitching floors in Gandhinagar East, Katpadi.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-primary)' }} />
                  <span>Comprehensive sample library with 300+ fabric swatches</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-primary)' }} />
                  <span>Live computerized Japanese Tajima embroidery demonstrations</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-primary)' }} />
                  <span>On-spot quotation and fabric GSM verification</span>
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary">
                Book a Factory Visit
              </Link>
            </div>

            <div style={{ background: '#1e293b', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>Factory Contact Details</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '1rem' }}>
                <strong>Address:</strong><br />{BRAND_INFO.address}
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '1rem' }}>
                <strong>Direct Phone:</strong><br />{BRAND_INFO.phone1} / {BRAND_INFO.phone2}
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
                <strong>Working Hours:</strong><br />{BRAND_INFO.workingHours}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
