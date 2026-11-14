import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  RotateCw,
  Camera,
  Maximize2,
  Minimize2,
  Sun,
  Eye,
  Play,
  Pause,
  Layers,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import { getStudioFloorTexture } from '../utils/fabricTextures';

/**
 * Camera preset views configuration for the 3D mannequin
 */
const CAMERA_PRESETS = {
  full: {
    pos: new THREE.Vector3(0, 1.05, 2.85),
    target: new THREE.Vector3(0, 0.95, 0),
    label: 'Full Body',
  },
  head: {
    pos: new THREE.Vector3(0, 1.62, 0.95),
    target: new THREE.Vector3(0, 1.60, 0),
    label: 'Head & Face',
  },
  torso: {
    pos: new THREE.Vector3(0, 1.25, 1.45),
    target: new THREE.Vector3(0, 1.20, 0),
    label: 'Torso & Shoulders',
  },
  legs: {
    pos: new THREE.Vector3(0, 0.52, 1.75),
    target: new THREE.Vector3(0, 0.45, 0),
    label: 'Legs & Feet',
  },
  side: {
    pos: new THREE.Vector3(2.6, 1.05, 0.1),
    target: new THREE.Vector3(0, 0.95, 0),
    label: 'Side Profile',
  },
  back: {
    pos: new THREE.Vector3(0, 1.05, -2.85),
    target: new THREE.Vector3(0, 0.95, 0),
    label: 'Back View',
  },
};

export default function Student3DViewer({
  modelType = 'mannequin', // 'mannequin' | 'michelle'
  materialStyle = 'porcelain', // 'porcelain' | 'charcoal' | 'clay' | 'wireframe' | 'original'
  currentAnimation = 'idle', // 'idle' | 'walk' | 'paused'
  autoRotate = false,
  studioMood = 'studio', // 'studio' | 'warm' | 'dramatic'
  onSnapshotReady = null,
}) {
  const mountRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeView, setActiveView] = useState('full');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [availableAnimations, setAvailableAnimations] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Three.js instances stored in refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const mixerRef = useRef(null);
  const activeActionRef = useRef(null);
  const currentModelRef = useRef(null);
  const loadedGltfRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Camera tween target state
  const cameraTargetRef = useRef({
    targetPos: new THREE.Vector3(0, 1.05, 2.85),
    targetLook: new THREE.Vector3(0, 0.95, 0),
    isTransitioning: false,
  });

  /* ─────────────────────────────────────────────────────────────────────────────
     Initialize Three.js Scene, Camera, Studio Lighting & Floor
  ───────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 720;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf8fafc);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 1.05, 2.85);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI * 0.54; // prevent going under floor
    controls.minPolarAngle = Math.PI * 0.15;
    controls.minDistance = 0.6;
    controls.maxDistance = 4.8;
    controls.target.set(0, 0.95, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.4;
    controlsRef.current = controls;

    // 5. Studio Three-Point Lighting
    const lightsGroup = new THREE.Group();
    lightsGroup.name = 'studio_lights';

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.95);
    hemiLight.position.set(0, 20, 0);
    lightsGroup.add(hemiLight);

    // Key Light (Front-Right Warm)
    const keyLight = new THREE.DirectionalLight(0xfffbf5, 1.5);
    keyLight.position.set(2.4, 3.2, 2.8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 10;
    keyLight.shadow.camera.left = -1.5;
    keyLight.shadow.camera.right = 1.5;
    keyLight.shadow.camera.top = 2.5;
    keyLight.shadow.camera.bottom = -0.5;
    keyLight.shadow.bias = -0.001;
    keyLight.shadow.radius = 2.5;
    lightsGroup.add(keyLight);

    // Fill Light (Front-Left Cool)
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.9);
    fillLight.position.set(-2.5, 2.4, 2.2);
    lightsGroup.add(fillLight);

    // Rim / Hair Light (Crisp Backlight)
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 2.8, -2.6);
    lightsGroup.add(rimLight);

    scene.add(lightsGroup);

    // 6. Studio Floor & Contact Shadow
    const floorTexture = getStudioFloorTexture();
    const floorGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const floorMat = new THREE.MeshBasicMaterial({
      map: floorTexture,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0.001;
    scene.add(floorMesh);

    // Circular Studio Pedestal Podium
    const podiumGeo = new THREE.CylinderGeometry(1.4, 1.45, 0.02, 64);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.45,
      metalness: 0.05,
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = -0.01;
    podium.receiveShadow = true;
    scene.add(podium);

    // 7. Render & Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Update animation mixer if active and playing
      if (mixerRef.current && isPlaying) {
        mixerRef.current.update(delta);
      }

      // Smooth camera interpolation to target presets
      const ct = cameraTargetRef.current;
      if (ct.isTransitioning) {
        camera.position.lerp(ct.targetPos, 0.08);
        controls.target.lerp(ct.targetLook, 0.08);

        if (camera.position.distanceTo(ct.targetPos) < 0.01 && controls.target.distanceTo(ct.targetLook) < 0.01) {
          camera.position.copy(ct.targetPos);
          controls.target.copy(ct.targetLook);
          ct.isTransitioning = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (controls) controls.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  /* ─────────────────────────────────────────────────────────────────────────────
     Load Selected 3D Model Asset (Mannequin or Michelle)
  ───────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove previous model if exists
    if (currentModelRef.current) {
      scene.remove(currentModelRef.current);
      currentModelRef.current.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
          else child.material.dispose();
        }
      });
      currentModelRef.current = null;
    }

    if (mixerRef.current) {
      mixerRef.current.stopAllAction();
      mixerRef.current = null;
    }

    setIsLoaded(false);
    setLoadingProgress(10);

    const modelPath = modelType === 'michelle'
      ? '/assets/models/Michelle.glb'
      : '/assets/models/mannequin.glb';

    const loader = new GLTFLoader();

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        model.name = 'humanoid_3d_model';
        loadedGltfRef.current = gltf;

        // Apply selected material style
        applyMaterialStyle(model, materialStyle);

        // Store animations
        if (gltf.animations && gltf.animations.length > 0) {
          const animNames = gltf.animations.map((a) => a.name);
          setAvailableAnimations(animNames);

          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

          // Find idle or preferred animation clip
          let clip = gltf.animations.find((a) => a.name.toLowerCase().includes('idle'));
          if (!clip) clip = gltf.animations[0];

          if (clip) {
            const action = mixer.clipAction(clip);
            action.play();
            activeActionRef.current = action;

            // Step slightly so arms fall into natural resting standing pose
            mixer.update(0.1);
          }
        }

        scene.add(model);
        currentModelRef.current = model;
        setIsLoaded(true);
        setLoadingProgress(100);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadingProgress(pct);
        } else {
          setLoadingProgress((prev) => Math.min(prev + 20, 95));
        }
      },
      (error) => {
        console.warn(`Failed loading model at ${modelPath}:`, error);
        // Fallback procedural stylized mannequin
        const fallback = buildFallbackMannequin(materialStyle);
        scene.add(fallback);
        currentModelRef.current = fallback;
        setIsLoaded(true);
        setLoadingProgress(100);
      }
    );
  }, [modelType]);

  /* ─────────────────────────────────────────────────────────────────────────────
     Apply Material Finish dynamically
  ───────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (currentModelRef.current) {
      applyMaterialStyle(currentModelRef.current, materialStyle);
    }
  }, [materialStyle]);

  /* ─────────────────────────────────────────────────────────────────────────────
     Handle Animation Switching (Idle, Walk, Agree, etc.)
  ───────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!mixerRef.current || !loadedGltfRef.current) return;

    if (currentAnimation === 'paused') {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const gltf = loadedGltfRef.current;
    let targetClip = gltf.animations.find((a) => a.name.toLowerCase().includes(currentAnimation));
    if (!targetClip) targetClip = gltf.animations[0];

    if (targetClip) {
      const prevAction = activeActionRef.current;
      const nextAction = mixerRef.current.clipAction(targetClip);

      if (prevAction && prevAction !== nextAction) {
        prevAction.fadeOut(0.3);
      }
      nextAction.reset().fadeIn(0.3).play();
      activeActionRef.current = nextAction;
    }
  }, [currentAnimation]);

  /* ─────────────────────────────────────────────────────────────────────────────
     Update Studio Mood Lighting
  ───────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!sceneRef.current) return;
    if (studioMood === 'studio') {
      sceneRef.current.background = new THREE.Color(0xf8fafc);
      if (rendererRef.current) rendererRef.current.toneMappingExposure = 1.08;
    } else if (studioMood === 'warm') {
      sceneRef.current.background = new THREE.Color(0xfefcf8);
      if (rendererRef.current) rendererRef.current.toneMappingExposure = 1.15;
    } else if (studioMood === 'dramatic') {
      sceneRef.current.background = new THREE.Color(0x0f172a);
      if (rendererRef.current) rendererRef.current.toneMappingExposure = 1.25;
    }
  }, [studioMood]);

  /* ─────────────────────────────────────────────────────────────────────────────
     Update OrbitControls AutoRotate
  ───────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  /* ─────────────────────────────────────────────────────────────────────────────
     Smooth Camera View Transitions
  ───────────────────────────────────────────────────────────────────────────── */
  const setCameraPreset = useCallback((presetKey) => {
    const preset = CAMERA_PRESETS[presetKey];
    if (!preset) return;

    setActiveView(presetKey);
    const ct = cameraTargetRef.current;
    ct.targetPos.copy(preset.pos);
    ct.targetLook.copy(preset.target);
    ct.isTransitioning = true;
  }, []);

  /* ─────────────────────────────────────────────────────────────────────────────
     Take High-Resolution 3D Snapshot
  ───────────────────────────────────────────────────────────────────────────── */
  const handleTakeSnapshot = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');

    if (onSnapshotReady) {
      onSnapshotReady(dataUrl);
    } else {
      const link = document.createElement('a');
      link.download = `stitch-room-mannequin-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }
  }, [onSnapshotReady]);

  /* ─────────────────────────────────────────────────────────────────────────────
     Toggle Fullscreen Viewport
  ───────────────────────────────────────────────────────────────────────────── */
  const toggleFullscreen = () => {
    const el = mountRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={mountRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '720px',
        background: studioMood === 'dramatic' ? '#0f172a' : '#f8fafc',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* ── Loading Overlay ── */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(248, 250, 252, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 40,
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '3px solid #e2e8f0',
              borderTopColor: 'var(--color-primary)',
              animation: 'spin 1s linear infinite',
              marginBottom: '1.2rem',
            }}
          />
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-secondary)', margin: '0 0 0.35rem' }}>
            Rendering 3D Humanoid Model
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 1rem' }}>
            Loading anatomical geometry, rigged skeleton & studio lighting...
          </p>
          <div style={{ width: '220px', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${loadingProgress}%`,
                height: '100%',
                background: 'var(--color-primary)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', marginTop: '0.4rem' }}>
            {loadingProgress}%
          </span>
        </div>
      )}

      {/* ── Top Left Showroom Badge ── */}
      <div
        style={{
          position: 'absolute',
          top: '1.2rem',
          left: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(10px)',
          padding: '0.45rem 0.85rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
          zIndex: 20,
        }}
      >
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
        <span style={{ fontSize: '0.76rem', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px' }}>
          3D MANNEQUIN SHOWROOM
        </span>
      </div>

      {/* ── Top Right Viewport Quick Actions ── */}
      <div
        style={{
          position: 'absolute',
          top: '1.2rem',
          right: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          zIndex: 20,
        }}
      >
        {/* Play / Pause Animation Motion Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? 'Pause Motion' : 'Play Motion'}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: '1px solid #e2e8f0',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1e293b',
            cursor: 'pointer',
          }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        {/* Snapshot Capture Button */}
        <button
          onClick={handleTakeSnapshot}
          title="Download High-Res 3D Snapshot"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: '1px solid #e2e8f0',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1e293b',
            cursor: 'pointer',
          }}
        >
          <Camera size={15} />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen Viewport"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: '1px solid #e2e8f0',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1e293b',
            cursor: 'pointer',
          }}
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>

      {/* ── Bottom Floating Camera Angle Navigation Bar ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          background: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(12px)',
          padding: '0.35rem 0.55rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.25)',
          zIndex: 20,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          maxWidth: '90%',
          overflowX: 'auto',
        }}
      >
        {Object.entries(CAMERA_PRESETS).map(([key, item]) => {
          const isActive = activeView === key;
          return (
            <button
              key={key}
              onClick={() => setCameraPreset(key)}
              style={{
                border: 'none',
                background: isActive ? 'var(--color-primary)' : 'transparent',
                color: isActive ? '#ffffff' : '#cbd5e1',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.74rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* ── Subtitle helper at bottom-right ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.2rem',
          right: '1.2rem',
          fontSize: '0.72rem',
          color: studioMood === 'dramatic' ? '#94a3b8' : '#64748b',
          background: studioMood === 'dramatic' ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          padding: '0.3rem 0.65rem',
          borderRadius: 'var(--radius-sm)',
          backdropFilter: 'blur(4px)',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      >
        🖱️ 360° Drag • Scroll to Zoom
      </div>
    </div>
  );
}

/**
 * Apply material finishes to the 3D model
 */
function applyMaterialStyle(model, style) {
  let mat;

  if (style === 'charcoal') {
    mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x27272a),
      roughness: 0.32,
      metalness: 0.1,
    });
  } else if (style === 'clay') {
    mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd1c7bd),
      roughness: 0.65,
      metalness: 0.0,
    });
  } else if (style === 'wireframe') {
    mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0f172a),
      wireframe: true,
    });
  } else if (style === 'original') {
    // Keep original materials if available
    return;
  } else {
    // Default: Sleek Porcelain White / Soft Ivory Studio Finish
    mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf6f5f1),
      roughness: 0.36,
      metalness: 0.04,
    });
  }

  model.traverse((child) => {
    if (child.isMesh) {
      child.material = mat;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

/**
 * Fallback stylized humanoid mannequin in case GLB asset fails
 */
function buildFallbackMannequin(style) {
  const group = new THREE.Group();
  group.name = 'fallback_mannequin';

  const mat = new THREE.MeshStandardMaterial({
    color: 0xf5f4f0,
    roughness: 0.38,
    metalness: 0.04,
  });

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 32, 24), mat);
  head.position.set(0, 1.68, 0);
  head.scale.set(0.9, 1.15, 0.95);
  group.add(head);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.10, 24), mat);
  neck.position.set(0, 1.54, 0);
  group.add(neck);

  const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.17, 0.52, 32), mat);
  chest.position.set(0, 1.26, 0);
  group.add(chest);

  const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.165, 0.16, 32), mat);
  pelvis.position.set(0, 0.95, 0);
  group.add(pelvis);

  [-0.26, 0.26].forEach((x) => {
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.48, 20), mat);
    arm.position.set(x, 1.20, 0);
    arm.rotation.z = x > 0 ? -0.15 : 0.15;
    group.add(arm);
  });

  [-0.09, 0.09].forEach((x) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.055, 0.82, 24), mat);
    leg.position.set(x, 0.48, 0);
    group.add(leg);
  });

  return group;
}
