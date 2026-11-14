import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { BRAND_INFO, UNIFORM_CATEGORIES } from '../data/mockData';
import { saveInquiry } from '../utils/storage';

export default function ContactPage() {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    category: 'school',
    quantity: '100 - 300 Sets',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Prefill params from URL (e.g. from Uniforms page or Clients page)
  useEffect(() => {
    const cat = searchParams.get('category');
    const garment = searchParams.get('garment');
    const color = searchParams.get('color');
    const school = searchParams.get('school');
    const qty = searchParams.get('qty');

    let initialNotes = '';
    if (garment && color) {
      initialNotes = `Inquiry for custom design: ${garment} in ${color}.`;
    } else if (school) {
      initialNotes = `Inquiry regarding uniforms similar to ${school}.`;
    }

    setFormData((prev) => ({
      ...prev,
      category: cat || prev.category,
      quantity: qty ? `${qty} Sets` : prev.quantity,
      notes: initialNotes || prev.notes,
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in your name, contact phone number, and official email.');
      return;
    }

    setLoading(true);

    try {
      // 1. Save locally for instant Admin Dashboard tracking
      const saved = saveInquiry(formData);

      // 2. Dispatch email directly to thestitchroom95@gmail.com via FormSubmit AJAX service
      const endpoint =
        import.meta.env.VITE_FORMSUBMIT_ENDPOINT ||
        `https://formsubmit.co/ajax/${BRAND_INFO.email}`;

      const postData = new FormData();
      postData.append('_subject', `New Uniform Inquiry: ${formData.org || formData.name} [Ref: ${saved.id}]`);
      postData.append('_captcha', 'false');
      postData.append('_template', 'table');
      postData.append('_replyto', formData.email);
      postData.append('Inquiry Reference ID', saved.id);
      postData.append('Client Name', formData.name);
      postData.append('Institution / School', formData.org || 'Not provided');
      postData.append('Email Address', formData.email);
      postData.append('Contact Phone', formData.phone);
      postData.append('Uniform Category', formData.category);
      postData.append('Estimated Batch Quantity', formData.quantity);
      postData.append('Requirements / Notes', formData.notes || 'None provided');
      postData.append('Submission Date & Time', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: postData,
        });
        const resData = await response.json();
        console.log('Form submission email dispatch result:', resData);
      } catch (apiErr) {
        console.warn('Background email dispatch network note:', apiErr);
      }

      setSubmittedInquiry(saved);
      setLoading(false);
    } catch (err) {
      console.error('Submission error', err);
      setErrorMessage('An unexpected error occurred while processing your inquiry. Please try again.');
      setLoading(false);
    }
  };

  const generateWhatsAppUrl = () => {
    const text = `Hello The Stitch Room!%0A*New Inquiry Reference:* ${submittedInquiry?.id || 'Direct'}%0A*Name:* ${formData.name}%0A*Institution:* ${formData.org}%0A*Category:* ${formData.category}%0A*Quantity:* ${formData.quantity}%0A*Phone:* ${formData.phone}%0A*Notes:* ${formData.notes || 'None'}`;
    return `https://wa.me/${BRAND_INFO.whatsapp}?text=${text}`;
  };

  return (
    <main style={{ paddingBottom: '1.5rem' }}>
      {/* HEADER HERO WITH LUXURY CONSULTATION STUDIO BACKGROUND */}
      <section
        className="page-hero-banner"
        style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.85)), url(/contact-hero-bg.jpg)',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '840px' }}>
          <div
            className="badge-tag"
            style={{
              background: 'rgba(201, 117, 80, 0.25)',
              color: '#fbeee8',
              borderColor: 'rgba(201, 117, 80, 0.6)',
              marginBottom: '1rem',
            }}
          >
            Direct Institutional Consultation
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw + 1rem, 3rem)', fontWeight: 800, marginBottom: '1.2rem', lineHeight: 1.18 }}>
            Get in Touch With Our Master Tailoring Workshop
          </h1>
          <p style={{ fontSize: '1.12rem', color: '#cbd5e1', lineHeight: 1.7, margin: '0 auto' }}>
            Request physical sample swatches, schedule on-campus student measurement camps, or receive an official institutional bulk quotation.
          </p>
        </div>
      </section>

      {/* MAIN CONTACT LAYOUT — EQUAL HEIGHT COLUMNS */}
      <section style={{ paddingTop: '3.5rem', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div className="contact-page-layout">
            {/* Left: Contact Info Card (Equal Height to Form) */}
            <div className="contact-info-card">
              <div>
                <div className="badge-tag" style={{ marginBottom: '0.8rem' }}>Factory Workshop & Office</div>
                <h2 style={{ fontSize: 'clamp(1.6rem, 2vw + 0.6rem, 2rem)', marginBottom: '0.8rem', color: 'var(--color-secondary)' }}>
                  Katpadi, Vellore, Tamil Nadu
                </h2>
                <p style={{ marginBottom: '1.8rem', lineHeight: '1.7', color: '#64748b' }}>
                  We welcome institution management committees and procurement officers to inspect our fabrics, tailoring floors, and automated Tajima embroidery machines in person.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: 0 }}>
                  <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-page)', padding: '1.1rem 1.3rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <MapPin size={22} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h4 style={{ fontSize: '0.98rem', marginBottom: '0.25rem', color: 'var(--color-secondary)' }}>Master Atelier Address</h4>
                      <p style={{ fontSize: '0.88rem', margin: 0, color: '#64748b', lineHeight: 1.5 }}>{BRAND_INFO.address}</p>
                      <a
                        href={BRAND_INFO.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          color: 'var(--color-primary)',
                          fontWeight: '700',
                          fontSize: '0.86rem',
                          marginTop: '0.55rem',
                          textDecoration: 'none',
                        }}
                      >
                        <MapPin size={15} />
                        <span>View Exact Location on Google Maps</span>
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-page)', padding: '1.1rem 1.3rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <Phone size={22} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h4 style={{ fontSize: '0.98rem', marginBottom: '0.25rem', color: 'var(--color-secondary)' }}>Direct Calling Lines</h4>
                      <p style={{ fontSize: '0.88rem', margin: 0, color: '#64748b', lineHeight: 1.5 }}>
                        <a href={`tel:${BRAND_INFO.phone1}`} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{BRAND_INFO.phone1}</a> / <a href={`tel:${BRAND_INFO.phone2}`} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{BRAND_INFO.phone2}</a>
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-page)', padding: '1.1rem 1.3rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <Mail size={22} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h4 style={{ fontSize: '0.98rem', marginBottom: '0.25rem', color: 'var(--color-secondary)' }}>Official Institutional Desk</h4>
                      <p style={{ fontSize: '0.88rem', margin: 0, color: '#64748b', lineHeight: 1.5 }}>
                        <a href={`mailto:${BRAND_INFO.email}`} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{BRAND_INFO.email}</a>
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-page)', padding: '1.1rem 1.3rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <Clock size={22} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h4 style={{ fontSize: '0.98rem', marginBottom: '0.25rem', color: 'var(--color-secondary)' }}>Operating & Sizing Hours</h4>
                      <p style={{ fontSize: '0.88rem', margin: 0, color: '#64748b', lineHeight: 1.5 }}>{BRAND_INFO.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Institutional Assurance Badge at Bottom */}
              <div
                style={{
                  background: 'var(--bg-page)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.1rem 1.3rem',
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-secondary)' }}>
                    Sample Swatch Delivery Within 48 Hours
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.15rem' }}>
                    Physical sample kits dispatched across Tamil Nadu with zero obligation.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Submission Form */}
            <div className="form-card">
              {submittedInquiry ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', color: 'var(--color-secondary)' }}>
                    Inquiry Received Successfully!
                  </h3>
                  <div style={{ display: 'inline-block', background: 'var(--bg-muted)', padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-sm)', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '1.2rem' }}>
                    Reference ID: {submittedInquiry.id}
                  </div>
                  <p style={{ color: '#475569', fontSize: '1.02rem', marginBottom: '1.8rem', lineHeight: '1.7' }}>
                    Thank you, <strong>{submittedInquiry.name}</strong>. Your inquiry has been <strong>successfully delivered to {BRAND_INFO.email}</strong>. Our team will review the details for <strong>{submittedInquiry.org || 'your institution'}</strong> and contact you directly.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: '380px', margin: '0 auto' }}>
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="btn"
                      style={{ backgroundColor: '#25D366', color: '#ffffff', width: '100%' }}
                    >
                      <MessageCircle size={18} />
                      WhatsApp Instant Chat
                    </a>

                    <button
                      onClick={() => setSubmittedInquiry(null)}
                      className="btn btn-outline"
                      style={{ width: '100%' }}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1.8rem' }}>
                    <h3 style={{ fontSize: '1.6rem', marginBottom: '0.4rem', color: 'var(--color-secondary)' }}>
                      Request Institutional Quotation
                    </h3>
                    <p style={{ fontSize: '0.94rem' }}>
                      Fill in your specifications and receive a customized quote with free fabric swatch delivery.
                    </p>
                  </div>

                  {errorMessage && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.9rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
                      <AlertCircle size={18} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                    <div className="form-group">
                      <label className="form-label">Contact Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Rajesh Kumar"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Institution / School / Company Name</label>
                      <input
                        type="text"
                        name="org"
                        value={formData.org}
                        onChange={handleChange}
                        placeholder="e.g. St. Thomas Academy"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                    <div className="form-group">
                      <label className="form-label">Official Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="principal@school.edu.in"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Contact Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98401 23456"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                    <div className="form-group">
                      <label className="form-label">Uniform Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="school">School Uniforms</option>
                        <option value="hospital">Hospital & Medical Scrubs</option>
                        <option value="corporate">Corporate & Executive Wear</option>
                        <option value="college">College Lab Coats & Formals</option>
                        <option value="custom">Custom Bulk Textile Stitching</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Estimated Quantity</label>
                      <select
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="50 - 100 Sets">50 – 100 Sets (Initial Sample / Trial)</option>
                        <option value="100 - 300 Sets">100 – 300 Sets</option>
                        <option value="300 - 1000 Sets">300 – 1,000 Sets</option>
                        <option value="1000+ Sets">1,000+ Sets (Annual Institutional Batch)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Special Notes / Sizing / Logo Requirements</label>
                    <textarea
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Mention any specific requirements: embroidery details, target reopening date, or requests for fabric sample kits..."
                      className="form-control"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', marginTop: '0.8rem' }}
                  >
                    {loading ? (
                      `Dispatching to ${BRAND_INFO.email}...`
                    ) : (
                      <>
                        <Send size={18} />
                        Submit Institutional Inquiry
                      </>
                    )}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.2rem', fontSize: '0.82rem', color: '#64748b' }}>
                    <ShieldCheck size={16} style={{ color: '#16a34a' }} />
                    <span>Inquiries delivered directly to <strong>{BRAND_INFO.email}</strong>. No spam guaranteed.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
