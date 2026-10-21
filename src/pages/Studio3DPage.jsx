import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Download,
  RotateCw,
  Palette,
  Scissors,
  Check,
  ArrowRight,
  ShieldAlert,
  Layers
} from 'lucide-react';

const GARMENT_TYPES = [
  { id: 'blazer', name: 'School Blazer & Shirt', basePrice: 1100 },
  { id: 'shirt', name: 'School Uniform Shirt & Trousers', basePrice: 680 },
  { id: 'scrubs', name: 'Medical Scrub Suit', basePrice: 850 },
  { id: 'corporate', name: 'Executive Oxford Shirt', basePrice: 920 },
];

const FABRIC_COLORS = [
  { name: 'Navy Blue', hex: '#1e3a8a', pantHex: '#0f172a' },
  { name: 'Terracotta Orange', hex: '#c97550', pantHex: '#1e293b' },
  { name: 'Forest Green', hex: '#065f46', pantHex: '#064e3b' },
  { name: 'Ceil Blue (Medical)', hex: '#38bdf8', pantHex: '#0284c7' },
  { name: 'Maroon', hex: '#881337', pantHex: '#4c0519' },
  { name: 'Classic Khaki', hex: '#ca8a04', pantHex: '#78350f' },
  { name: 'Crisp White', hex: '#ffffff', pantHex: '#1e3a8a' },
  { name: 'Charcoal Grey', hex: '#334155', pantHex: '#0f172a' },
];

const COLLAR_STYLES = [
  { id: 'classic', name: 'Classic Spread Collar' },
  { id: 'mandarin', name: 'Mandarin / Band Collar' },
  { id: 'buttonDown', name: 'Button-Down Collar' },
];

const ACCESSORIES = [
  { id: 'tie_striped', name: 'Striped Jacquard Tie' },
  { id: 'tie_solid', name: 'Solid Satin Tie' },
  { id: 'none', name: 'No Neckwear' },
];

export default function Studio3DPage() {
  const [garment, setGarment] = useState(GARMENT_TYPES[0]);
  const [selectedColor, setSelectedColor] = useState(FABRIC_COLORS[0]);
  const [collarStyle, setCollarStyle] = useState(COLLAR_STYLES[0]);
  const [accessory, setAccessory] = useState(ACCESSORIES[0]);
  const [institutionName, setInstitutionName] = useState('ST. JOSEPH ACADEMY');
  const [hasEmbroidery, setHasEmbroidery] = useState(true);

  const canvasRef = useRef(null);

  // Render Real-Time Canvas Garment Model
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background Studio Shadow & Light Glow
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2 - 20, 30, width / 2, height / 2, 220);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Cast Floor Shadow
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(width / 2, height - 35, 120, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
    ctx.filter = 'blur(6px)';
    ctx.fill();
    ctx.restore();

    const cx = width / 2;
    const cy = 110;

    // 1. Render Torso Base (Shirt or Blazer)
    ctx.save();
    ctx.fillStyle = selectedColor.hex;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;

    // Torso path
    ctx.beginPath();
    ctx.moveTo(cx - 90, cy + 40); // left shoulder
    ctx.lineTo(cx - 35, cy); // left neck
    ctx.lineTo(cx + 35, cy); // right neck
    ctx.lineTo(cx + 90, cy + 40); // right shoulder
    ctx.lineTo(cx + 80, cy + 220); // right hip
    ctx.lineTo(cx - 80, cy + 220); // left hip
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Fabric subtle texture grid / weave
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = cy; i < cy + 220; i += 6) {
      ctx.fillRect(cx - 80, i, 160, 1);
    }

    // 2. Center Button Placket
    ctx.beginPath();
    ctx.moveTo(cx - 12, cy + 45);
    ctx.lineTo(cx - 12, cy + 220);
    ctx.lineTo(cx + 12, cy + 220);
    ctx.lineTo(cx + 12, cy + 45);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.stroke();

    // Placket Buttons
    ctx.fillStyle = selectedColor.hex === '#ffffff' ? '#334155' : '#ffffff';
    for (let b = cy + 70; b <= cy + 200; b += 32) {
      ctx.beginPath();
      ctx.arc(cx, b, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // 3. Chest Pocket & Embroidery
    const pocketX = cx - 65;
    const pocketY = cy + 85;
    ctx.beginPath();
    ctx.rect(pocketX, pocketY, 34, 40);
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.stroke();

    if (hasEmbroidery) {
      // Golden Tajima Crest Badge on pocket
      ctx.beginPath();
      ctx.arc(pocketX + 17, pocketY + 16, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.fill();
      ctx.strokeStyle = '#b45309';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('TSR', pocketX + 17, pocketY + 19);

      // Micro crest banner
      ctx.fillStyle = '#b45309';
      ctx.fillRect(pocketX + 6, pocketY + 27, 22, 3);
    }

    // 4. Collar
    ctx.beginPath();
    ctx.fillStyle = garment.id === 'blazer' ? '#ffffff' : selectedColor.hex;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;

    // Collar flaps
    ctx.moveTo(cx - 40, cy);
    ctx.lineTo(cx - 10, cy + 45);
    ctx.lineTo(cx - 2, cy + 15);
    ctx.lineTo(cx - 15, cy - 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.moveTo(cx + 40, cy);
    ctx.lineTo(cx + 10, cy + 45);
    ctx.lineTo(cx + 2, cy + 15);
    ctx.lineTo(cx + 15, cy - 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 5. Neckwear / Tie
    if (accessory.id === 'tie_striped' || accessory.id === 'tie_solid') {
      ctx.beginPath();
      ctx.moveTo(cx - 8, cy + 25);
      ctx.lineTo(cx + 8, cy + 25);
      ctx.lineTo(cx + 14, cy + 170);
      ctx.lineTo(cx, cy + 190);
      ctx.lineTo(cx - 14, cy + 170);
      ctx.closePath();
      ctx.fillStyle = accessory.id === 'tie_striped' ? '#881337' : '#1e293b';
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.stroke();

      if (accessory.id === 'tie_striped') {
        // Gold diagonal jacquard stripes
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 3;
        for (let s = cy + 45; s < cy + 170; s += 22) {
          ctx.beginPath();
          ctx.moveTo(cx - 10, s);
          ctx.lineTo(cx + 10, s + 10);
          ctx.stroke();
        }
      }
    }

    // 6. Trouser / Bottom Preview
    ctx.beginPath();
    ctx.rect(cx - 68, cy + 220, 136, 110);
    ctx.fillStyle = selectedColor.pantHex;
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();

    // Trouser center crease
    ctx.beginPath();
    ctx.moveTo(cx, cy + 220);
    ctx.lineTo(cx, cy + 330);
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }, [garment, selectedColor, collarStyle, accessory, hasEmbroidery, institutionName]);

  const handleDownloadSpec = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `The-Stitch-Room-${garment.id}-${selectedColor.name.replace(/\s+/g, '-')}-Specification.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <main style={{ paddingBottom: '5rem' }}>
      {/* HEADER HERO */}
      <section style={{ padding: '4.5rem 0 3.5rem', background: 'var(--bg-muted)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="badge-tag">
            <Sparkles size={14} />
            Interactive 3D Uniform Studio
          </div>
          <h1 style={{ marginBottom: '1.2rem' }}>
            Customize & Preview Your Institutional Uniform
          </h1>
          <p style={{ fontSize: '1.15rem' }}>
            Experiment in real-time with fabric body colors, Tajima automated pocket embroidery, collar styling, and matching neckwear.
          </p>
        </div>
      </section>

      {/* STUDIO LAYOUT */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="studio-layout">
            {/* Visual Canvas Card */}
            <div className="studio-canvas-card">
              <div
                style={{
                  position: 'absolute',
                  top: '1.2rem',
                  left: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  color: 'var(--color-secondary)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <RotateCw size={14} className="text-primary" />
                Live Studio Render: {selectedColor.name}
              </div>

              <canvas
                ref={canvasRef}
                width={440}
                height={500}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                }}
              />

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                <button onClick={handleDownloadSpec} className="btn btn-outline btn-sm" style={{ flex: '1 1 180px' }}>
                  <Download size={16} />
                  Download Spec Mockup
                </button>
                <Link
                  to={`/contact?garment=${garment.id}&color=${encodeURIComponent(selectedColor.name)}&embroidery=${hasEmbroidery ? 'yes' : 'no'}`}
                  className="btn btn-primary btn-sm"
                  style={{ flex: '1 1 180px' }}
                >
                  Request Quote for this Design
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Studio Controls Card */}
            <div className="studio-controls-card">
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.4rem', color: 'var(--color-secondary)' }}>
                Configuration Controls
              </h3>

              {/* 1. Garment Line */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Select Garment Category</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  {GARMENT_TYPES.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGarment(g)}
                      style={{
                        padding: '0.8rem',
                        borderRadius: 'var(--radius-sm)',
                        border: garment.id === g.id ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                        background: garment.id === g.id ? 'var(--color-primary-light)' : '#ffffff',
                        color: garment.id === g.id ? 'var(--color-primary-hover)' : 'var(--color-secondary)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.88rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Fabric Color Swatches */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <label className="form-label" style={{ margin: 0 }}>Fabric Body Shade</label>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                    {selectedColor.name}
                  </span>
                </div>
                <div className="color-palette">
                  {FABRIC_COLORS.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`color-swatch-btn ${selectedColor.name === col.name ? 'active' : ''}`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                      aria-label={`Select ${col.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* 3. Collar Style */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Collar Pattern</label>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {COLLAR_STYLES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCollarStyle(c)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: collarStyle.id === c.id ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                        background: collarStyle.id === c.id ? 'var(--color-primary-light)' : '#ffffff',
                        color: collarStyle.id === c.id ? 'var(--color-primary-hover)' : 'var(--color-secondary)',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Accessories */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Institutional Neckwear</label>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {ACCESSORIES.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => setAccessory(acc)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: accessory.id === acc.id ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                        background: accessory.id === acc.id ? 'var(--color-primary-light)' : '#ffffff',
                        color: accessory.id === acc.id ? 'var(--color-primary-hover)' : 'var(--color-secondary)',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      {acc.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Tajima Crest Embroidery Toggle */}
              <div style={{ background: 'var(--bg-page)', padding: '1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1.8rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={hasEmbroidery}
                    onChange={(e) => setHasEmbroidery(e.target.checked)}
                    style={{ accentColor: 'var(--color-primary)', width: '20px', height: '20px' }}
                  />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--color-secondary)' }}>
                      Computerized Tajima Crest Embroidery
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Replicates school/hospital insignia with metallic or spun poly thread.
                    </div>
                  </div>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link
                  to={`/contact?design=${garment.id}&color=${encodeURIComponent(selectedColor.name)}`}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Order Physical Sample Set
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
