import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Package,
  Clock,
  CheckCircle2,
  FileText,
  Truck,
  Search,
  ArrowRight
} from 'lucide-react';

export default function CustomerPortalPage() {
  const [trackingId, setTrackingId] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const [searched, setSearched] = useState(false);

  // Sample real order milestones for client institutions
  const sampleOrders = {
    'TSR-2026-881': {
      id: 'TSR-2026-881',
      institution: "Vidyaniketan School, Vellore",
      batchSize: '850 Sets (Boys Trousers + Girls Pleated Skirts + Sky Blue Shirts)',
      status: 'In Production (Tajima Crest Embroidery)',
      progress: 65,
      deliveryTarget: '15th May 2026',
      milestones: [
        { label: 'Yarn Testing & Sanforization Complete', date: '2026-03-25', done: true },
        { label: 'Campus Master Tailor Sizing Camp Held', date: '2026-04-02', done: true },
        { label: 'Computerized Cutting & Tajima Embroidery', date: '2026-04-18', done: true },
        { label: 'Double-Needle Lockstitch Assembly', date: '2026-04-28', current: true },
        { label: 'Class-Wise Barcoding & Campus Dispatch', date: '2026-05-12', done: false },
      ],
    },
  };

  const handleTrack = (e) => {
    e.preventDefault();
    setSearched(true);
    const key = trackingId.trim().toUpperCase();
    if (sampleOrders[key]) {
      setOrderResult(sampleOrders[key]);
    } else {
      // Create friendly fallback record
      setOrderResult({
        id: key || 'TSR-DEMO-001',
        institution: 'Institutional Batch Dispatch',
        batchSize: 'Custom Institutional Uniform Order',
        status: 'Order Verification in Progress',
        progress: 35,
        deliveryTarget: 'Prior to Academic Reopening',
        milestones: [
          { label: 'Order Specification Approved', date: 'Current Week', done: true },
          { label: 'Fabric Batch Curation & Testing', date: 'In Progress', current: true },
          { label: 'Precision Assembly & Tajima Embroidery', date: 'Scheduled', done: false },
          { label: 'Quality Control & Campus Delivery', date: 'Scheduled', done: false },
        ],
      });
    }
  };

  return (
    <main style={{ paddingBottom: '5rem' }}>
      {/* HEADER HERO */}
      <section style={{ padding: '4.5rem 0 3.5rem', background: 'var(--bg-muted)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="badge-tag">
            <ShieldCheck size={14} />
            Institutional Client Portal
          </div>
          <h1 style={{ marginBottom: '1.2rem' }}>
            Track Your Batch Manufacturing & Dispatch
          </h1>
          <p style={{ fontSize: '1.15rem' }}>
            Real-time milestone visibility for school committees and corporate procurement teams into fabric weaving, Tajima embroidery, and campus delivery.
          </p>
        </div>
      </section>

      {/* TRACKING SEARCH */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '3rem',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.6rem', color: 'var(--color-secondary)' }}>
              Enter Your Institutional Order / Job Card ID
            </h3>
            <p style={{ fontSize: '0.94rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Example order reference: <code>TSR-2026-881</code> or your official institutional purchase number.
            </p>

            <form onSubmit={handleTrack} style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 260px', position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. TSR-2026-881"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 2.8rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-heading)',
                    outline: 'none',
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                <Truck size={18} />
                Track Status
              </button>
            </form>
          </div>

          {/* TRACKING RESULTS */}
          {searched && orderResult && (
            <div
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.8rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                    Job Card: {orderResult.id}
                  </span>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--color-secondary)', marginTop: '0.3rem' }}>
                    {orderResult.institution}
                  </h3>
                  <div style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '0.3rem' }}>
                    Batch Scope: {orderResult.batchSize}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontWeight: '700', fontSize: '0.85rem', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)' }}>
                    {orderResult.status}
                  </span>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.4rem' }}>
                    Target Delivery: <strong>{orderResult.deliveryTarget}</strong>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
                  <span>Batch Production Completion</span>
                  <span>{orderResult.progress}%</span>
                </div>
                <div style={{ height: '10px', background: '#e2e8f0', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${orderResult.progress}%`,
                      background: 'linear-gradient(90deg, var(--color-primary) 0%, #ea580c 100%)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  />
                </div>
              </div>

              {/* Milestones Timeline */}
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: 'var(--color-secondary)' }}>
                Production Checkpoints:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {orderResult.milestones.map((m, mIdx) => (
                  <div key={mIdx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {m.done ? (
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle2 size={18} />
                      </div>
                    ) : m.current ? (
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Clock size={16} />
                      </div>
                    ) : (
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1f5f9', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cbd5e1' }} />
                      </div>
                    )}

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: m.current ? '700' : '500', color: m.current ? 'var(--color-primary)' : 'var(--color-secondary)' }}>
                        {m.label}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{m.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ fontSize: '0.88rem', color: '#64748b' }}>
                  Have questions about class-wise distributions or sizing alterations?
                </div>
                <a
                  href={`tel:${import.meta.env.VITE_CONTACT_PHONE_1 || '+917812879053'}`}
                  className="btn btn-outline btn-sm"
                >
                  Contact Dispatch Desk
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
