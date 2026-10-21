import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Scissors,
  Check,
  ChevronRight
} from 'lucide-react';
import { UNIFORM_CATEGORIES, COMPARISON_DATA, BRAND_INFO } from '../data/mockData';

export default function UniformsPage() {
  const [activeTab, setActiveTab] = useState('school');
  
  // Interactive Bulk Price Estimator
  const [estUniformType, setEstUniformType] = useState('school');
  const [estQuantity, setEstQuantity] = useState(150);
  const [includeEmbroidery, setIncludeEmbroidery] = useState(true);
  const [includeAccessories, setIncludeAccessories] = useState(false);

  // Base unit prices
  const basePrices = {
    school: 680,
    hospital: 850,
    corporate: 920,
    college: 780,
  };

  const calculateEstimate = () => {
    let base = basePrices[estUniformType] || 700;
    if (includeEmbroidery) base += 45;
    if (includeAccessories) base += 110;
    
    let discount = 1.0;
    if (estQuantity >= 500) discount = 0.90;
    else if (estQuantity >= 200) discount = 0.95;

    const unitPrice = Math.round(base * discount);
    const totalPrice = unitPrice * estQuantity;
    return { unitPrice, totalPrice };
  };

  const { unitPrice, totalPrice } = calculateEstimate();

  const currentCategory = UNIFORM_CATEGORIES.find((c) => c.id === activeTab) || UNIFORM_CATEGORIES[0];

  return (
    <main style={{ paddingBottom: '4rem' }}>
      {/* HEADER HERO */}
      <section style={{ padding: '3.8rem 0 2.5rem', background: 'var(--bg-muted)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="badge-tag">Technical Catalog & Benchmarks</div>
          <h1 style={{ marginBottom: '1rem' }}>
            Uniform Specifications & Quality Comparison
          </h1>
          <p style={{ fontSize: '1.05rem', margin: 0 }}>
            Explore certified fabric blends, test specifications, and calculate real-time bulk production estimates.
          </p>
        </div>
      </section>

      {/* HORIZONTAL CATEGORY SELECTOR PILLS */}
      <section style={{ padding: '2rem 0 1rem' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              overflowX: 'auto',
              padding: '0.5rem 0.2rem',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {UNIFORM_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                style={{
                  padding: '0.65rem 1.3rem',
                  borderRadius: 'var(--radius-full)',
                  border: activeTab === c.id ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                  background: activeTab === c.id ? 'var(--color-primary)' : '#ffffff',
                  color: activeTab === c.id ? '#ffffff' : 'var(--color-secondary)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: activeTab === c.id ? '0 4px 12px rgba(201, 117, 80, 0.3)' : 'var(--shadow-sm)',
                }}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* COMPACT ACTIVE CATEGORY CARD (Eliminates tall stacked scrolling) */}
      <section style={{ padding: '2rem 0 3.5rem' }}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                alignItems: 'stretch',
              }}
            >
              <div style={{ position: 'relative', minHeight: '300px', background: '#0f172a' }}>
                <img
                  src={currentCategory.image}
                  alt={currentCategory.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1.2rem',
                    left: '1.2rem',
                    background: 'var(--color-primary)',
                    color: '#ffffff',
                    padding: '0.35rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {currentCategory.tag}
                </div>
              </div>

              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', color: 'var(--color-secondary)' }}>
                  {currentCategory.title}
                </h2>
                <p style={{ color: '#475569', fontSize: '0.98rem', marginBottom: '1.4rem', lineHeight: '1.6' }}>
                  {currentCategory.desc}
                </p>

                <div style={{ marginBottom: '1.6rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--color-secondary)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Certified Technical Specifications:
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                    {currentCategory.specs.map((spec, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#334155' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <Link to={`/contact?category=${currentCategory.id}`} className="btn btn-primary btn-sm">
                    Request Fabric Swatches
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/3d-showroom" className="btn btn-outline btn-sm">
                    Open in 3D Customizer
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* INTERACTIVE BULK ESTIMATOR */}
      <section style={{ padding: '4.5rem 0', background: '#0f172a', color: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge-tag" style={{ backgroundColor: 'rgba(201, 117, 80, 0.25)', color: '#ffffff' }}>
              <Calculator size={14} />
              Instant Estimator
            </div>
            <h2 className="section-title" style={{ color: '#ffffff' }}>Bulk Order Price Estimator</h2>
            <p className="section-desc" style={{ color: '#94a3b8' }}>
              Get an instant indicative cost estimation for your institution based on quantity tiers and customizations.
            </p>
          </div>

          <div
            style={{
              maxWidth: '940px',
              margin: '0 auto',
              background: '#1e293b',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ marginBottom: '1.4rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '0.4rem', fontWeight: '600' }}>
                  Uniform Line
                </label>
                <select
                  value={estUniformType}
                  onChange={(e) => setEstUniformType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    color: '#ffffff',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                    fontSize: '0.92rem',
                  }}
                >
                  <option value="school">School Uniforms (Shirt + Pant/Skirt)</option>
                  <option value="hospital">Hospital Scrubs & Tunics</option>
                  <option value="corporate">Corporate Formals & Blazers</option>
                  <option value="college">College Lab Coats & Formals</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                  <span>Batch Quantity (Sets):</span>
                  <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{estQuantity} Sets</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={estQuantity}
                  onChange={(e) => setEstQuantity(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.3rem' }}>
                  <span>50 (MOQ)</span>
                  <span>500 (10% Tier Discount)</span>
                  <span>2000+</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.88rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={includeEmbroidery}
                    onChange={(e) => setIncludeEmbroidery(e.target.checked)}
                    style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }}
                  />
                  Tajima Automated Crest Embroidery (+₹45/set)
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.88rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={includeAccessories}
                    onChange={(e) => setIncludeAccessories(e.target.checked)}
                    style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }}
                  />
                  Institutional Tie & Belt Bundle (+₹110/set)
                </label>
              </div>
            </div>

            {/* Price Output Box */}
            <div
              style={{
                background: '#0f172a',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                border: '1px solid rgba(201, 117, 80, 0.4)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                Indicative Institutional Price
              </div>
              <div style={{ fontSize: '2.8rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#ffffff', lineHeight: 1, marginBottom: '0.3rem' }}>
                ₹{unitPrice}
                <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: '400' }}> / set</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.92rem', marginBottom: '1.4rem' }}>
                Batch Total for {estQuantity} sets: <strong style={{ color: '#ffffff' }}>₹{totalPrice.toLocaleString('en-IN')}</strong>
              </div>

              <Link
                to={`/contact?category=${estUniformType}&qty=${estQuantity}`}
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
              >
                Confirm Official Quote & Sample
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-page)' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge-tag">Benchmark Breakdown</div>
            <h2 className="section-title">The Stitch Room vs. Standard Market Uniforms</h2>
            <p className="section-desc">
              Understand the precise structural differences in our fabrics, threads, and reinforcement techniques.
            </p>
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
    </main>
  );
}
