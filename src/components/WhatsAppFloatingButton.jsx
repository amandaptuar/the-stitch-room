import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/mockData';

export default function WhatsAppFloatingButton() {
  const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsapp}?text=Hi%20The%20Stitch%20Room,%20I%20would%20like%20to%20get%20a%20quote%20for%20our%20institution%20uniforms.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99,
        backgroundColor: '#25D366',
        color: '#ffffff',
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) translateY(0)')}
    >
      <MessageCircle size={30} fill="#ffffff" color="#25D366" />
    </a>
  );
}
