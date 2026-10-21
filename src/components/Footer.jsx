import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND_INFO, UNIFORM_CATEGORIES } from '../data/mockData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div className="brand-logo-badge" style={{ width: '42px', height: '42px' }}>
                <img src="/logo.jpeg" alt="The Stitch Room" className="brand-logo-img" />
              </div>
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1.25rem', margin: 0 }}>THE STITCH ROOM</h3>
                <span style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.05em' }}>
                  ESTABLISHED 1995 • VELLORE
                </span>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.94rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Specialized institutional textile and uniform manufacturer delivering premium, durable, and comfortable apparel for schools, medical centers, and corporate enterprises across South India.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${BRAND_INFO.whatsapp}?text=Hello%20The%20Stitch%20Room,%20I%20would%20like%20to%20inquire%20about%20uniform%20manufacturing.`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm"
                style={{ backgroundColor: '#25D366', color: '#ffffff', padding: '0.55rem 1rem', flex: '1 1 auto' }}
              >
                WhatsApp Direct
              </a>
              <Link to="/contact" className="btn btn-sm btn-outline" style={{ color: '#ffffff', borderColor: '#334155', flex: '1 1 auto' }}>
                Contact Desk
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home Page</Link></li>
              <li><Link to="/about" className="footer-link">About Our Heritage</Link></li>
              <li><Link to="/uniforms" className="footer-link">Uniforms & Specifications</Link></li>
              <li><Link to="/clients" className="footer-link">Partner Schools & Clients</Link></li>
              <li><Link to="/3d-showroom" className="footer-link">3D Uniform Studio</Link></li>
              <li><Link to="/contact" className="footer-link">Request Consultation</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="footer-col-title">Uniform Ranges</h4>
            <ul className="footer-links-list">
              {UNIFORM_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link to="/uniforms" className="footer-link">
                    {cat.title}
                  </Link>
                </li>
              ))}
              <li><Link to="/3d-showroom" className="footer-link">Custom Embroidery & Badging</Link></li>
              <li><Link to="/uniforms" className="footer-link">Bespoke Institution Ties & Belts</Link></li>
            </ul>
          </div>

          {/* Factory Location & Direct Contact */}
          <div>
            <h4 className="footer-col-title">Factory & Workshop</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '3px' }} />
                <span>{BRAND_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <div>
                  <a href={`tel:${BRAND_INFO.phone1}`} style={{ color: '#e2e8f0' }}>{BRAND_INFO.phone1}</a> / <a href={`tel:${BRAND_INFO.phone2}`} style={{ color: '#e2e8f0' }}>{BRAND_INFO.phone2}</a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <a href={`mailto:${BRAND_INFO.email}`} style={{ color: '#e2e8f0' }}>{BRAND_INFO.email}</a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Clock size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>{BRAND_INFO.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {currentYear} <strong>The Stitch Room</strong>. All rights reserved. Registered Textile & Garment Manufacturer.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/customer-portal" style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Customer Portal
            </Link>
            <span style={{ color: '#334155' }}>•</span>
            <Link to="/admin/login" style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={14} />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
