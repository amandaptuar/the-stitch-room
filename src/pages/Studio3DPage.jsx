import React, { useState } from 'react';
import {
  RotateCw,
  Camera,
  Maximize2,
  Sparkles,
  User,
  Users,
  Sun,
  Layers,
  Activity,
  Play,
  Pause,
  Info,
  Sliders,
  Eye,
} from 'lucide-react';
import Student3DViewer from '../components/Student3DViewer';

/* ─────────────────────────────────────────────────────────────────────────────
   3D Studio Page — Pure 3D Humanoid Model & Anatomy Viewer
───────────────────────────────────────────────────────────────────────────── */
export default function Studio3DPage() {
  // 3D Model & Studio State
  const [modelType, setModelType] = useState('mannequin'); // 'mannequin' | 'michelle'
  const [materialStyle, setMaterialStyle] = useState('porcelain'); // 'porcelain' | 'charcoal' | 'clay' | 'wireframe' | 'original'
  const [currentAnimation, setCurrentAnimation] = useState('idle'); // 'idle' | 'walk' | 'agree' | 'paused'
  const [autoRotate, setAutoRotate] = useState(false);
  const [studioMood, setStudioMood] = useState('studio'); // 'studio' | 'warm' | 'dramatic'

  return (
    <main style={{ background: '#f8fafc', minHeight: 'calc(100vh - 80px)', padding: '1.2rem 0 3rem' }}>
      <div className="container" style={{ maxWidth: '1440px', padding: '0 1rem' }}>

        {/* ── Page Header & Quick Toolbar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.2rem',
            flexWrap: 'wrap',
            gap: '1rem',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '0.8rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span
                style={{
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                3D Studio
              </span>
              <h1 style={{ fontSize: '1.65rem', fontWeight: '900', color: 'var(--color-secondary)', margin: 0 }}>
                3D Humanoid Model Showroom
              </h1>
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#64748b' }}>
              Inspect anatomical proportions, neutral pose, surface topology, and studio lighting in real-time 3D.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                background: autoRotate ? 'var(--color-primary-light)' : '#ffffff',
                color: autoRotate ? 'var(--color-primary)' : 'var(--color-secondary)',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              <RotateCw size={13} className={autoRotate ? 'animate-spin' : ''} />
              {autoRotate ? 'Turntable: On' : '360° Turntable'}
            </button>
          </div>
        </div>

        {/* ── Main Studio Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.6fr) minmax(320px, 1fr)',
            gap: '1.5rem',
            alignItems: 'start',
          }}
          className="studio-layout-grid"
        >
          {/* ═══════════════════════════════════════════════════════════════════
             LEFT: 3D THREE.JS CANVAS VIEWPORT
          ═══════════════════════════════════════════════════════════════════ */}
          <div
            style={{
              position: 'relative',
              height: '750px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 12px 36px rgba(15, 23, 42, 0.08)',
              overflow: 'hidden',
              background: '#ffffff',
            }}
          >
            <Student3DViewer
              modelType={modelType}
              materialStyle={materialStyle}
              currentAnimation={currentAnimation}
              autoRotate={autoRotate}
              studioMood={studioMood}
            />
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
             RIGHT: 3D MODEL CONTROLS & STUDIO INSPECTOR
          ═══════════════════════════════════════════════════════════════════ */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)',
              padding: '1.6rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sliders size={18} style={{ color: 'var(--color-primary)' }} />
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-secondary)', margin: 0 }}>
                  Model & Studio Settings
                </h2>
              </div>
            </div>

            {/* 1. Model Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.6rem' }}>
                1. 3D Humanoid Model
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                <button
                  onClick={() => setModelType('mannequin')}
                  style={{
                    padding: '0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    border: modelType === 'mannequin' ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                    background: modelType === 'mannequin' ? 'var(--color-primary-light)' : '#ffffff',
                    color: modelType === 'mannequin' ? 'var(--color-primary)' : 'var(--color-secondary)',
                    fontWeight: '800',
                    fontSize: '0.86rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                  }}
                >
                  <User size={16} />
                  Neutral Mannequin
                </button>

                <button
                  onClick={() => setModelType('michelle')}
                  style={{
                    padding: '0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    border: modelType === 'michelle' ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                    background: modelType === 'michelle' ? 'var(--color-primary-light)' : '#ffffff',
                    color: modelType === 'michelle' ? 'var(--color-primary)' : 'var(--color-secondary)',
                    fontWeight: '800',
                    fontSize: '0.86rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                  }}
                >
                  <Users size={16} />
                  Female Model
                </button>
              </div>
            </div>

            {/* 2. Material Shading Finish */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.6rem' }}>
                2. Surface Material & Shading
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'porcelain', label: 'Porcelain White', desc: 'Museum Ivory finish' },
                  { id: 'charcoal', label: 'Matte Charcoal', desc: 'Minimalist dark tone' },
                  { id: 'clay', label: 'Studio Clay', desc: 'Sculpting clay matte' },
                  { id: 'wireframe', label: 'Wireframe Mesh', desc: 'Polygon topology' },
                ].map((mat) => {
                  const isSelected = materialStyle === mat.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => setMaterialStyle(mat.id)}
                      style={{
                        padding: '0.65rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                        background: isSelected ? 'var(--color-primary-light)' : '#ffffff',
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-secondary)',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontWeight: '800', fontSize: '0.82rem' }}>{mat.label}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{mat.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Pose & Animation Motion */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.6rem' }}>
                3. Standing Pose & Animation
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'idle', label: 'Neutral Standing', sub: 'Idle pose' },
                  { id: 'walk', label: 'Walk Cycle', sub: 'Movement' },
                  { id: 'paused', label: 'Freeze Pose', sub: 'Static' },
                ].map((anim) => {
                  const isSelected = currentAnimation === anim.id;
                  return (
                    <button
                      key={anim.id}
                      onClick={() => setCurrentAnimation(anim.id)}
                      style={{
                        padding: '0.6rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                        background: isSelected ? 'var(--color-primary-light)' : '#ffffff',
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-secondary)',
                        textAlign: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontWeight: '800', fontSize: '0.78rem' }}>{anim.label}</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{anim.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Studio Environment Lighting */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.6rem' }}>
                4. Studio Lighting Environment
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'studio', label: 'Studio Daylight', icon: '☀️' },
                  { id: 'warm', label: 'Warm Runway', icon: '🕯️' },
                  { id: 'dramatic', label: 'Editorial Dark', icon: '🌙' },
                ].map((mood) => {
                  const isSelected = studioMood === mood.id;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => setStudioMood(mood.id)}
                      style={{
                        padding: '0.6rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                        background: isSelected ? 'var(--color-primary-light)' : '#ffffff',
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-secondary)',
                        textAlign: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: '1rem', marginBottom: '0.15rem' }}>{mood.icon}</div>
                      <div style={{ fontWeight: '800', fontSize: '0.74rem' }}>{mood.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. 3D Model Technical Specifications */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                fontSize: '0.8rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '800', color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
                <Activity size={14} style={{ color: 'var(--color-primary)' }} />
                Model Specifications
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: '#475569', fontSize: '0.78rem' }}>
                <div>• Format: <strong>GLTF 2.0 Binary (GLB)</strong></div>
                <div>• Skeleton: <strong>67 Articulated Bones</strong></div>
                <div>• Height: <strong>1.80m (Life-size Human Proportions)</strong></div>
                <div>• Lighting: <strong>3-Point ACES Filmic Tone Mapping</strong></div>
                <div>• Shading: <strong>Physically Based Rendering (PBR)</strong></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
