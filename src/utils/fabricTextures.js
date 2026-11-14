import * as THREE from 'three';

/**
 * Procedural PBR fabric textures generator.
 * Creates seamless micro-weave bump and roughness maps without external heavy assets.
 */

// Cache textures so we don't recreate them on every render
const textureCache = new Map();

/**
 * Creates a Twill Weave bump map (used for blazers, suiting, and trousers)
 * 2x2 diagonal twill weave pattern with fiber micro-noise
 */
export function getTwillTexture(repeatX = 24, repeatY = 24) {
  const cacheKey = `twill_${repeatX}_${repeatY}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Fill neutral mid-gray
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  const step = 8; // weave unit size
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // 45-degree twill rib calculation
      const diag = (x + y) % (step * 2);
      const isRidge = diag < step;

      // Base rib elevation
      let val = isRidge ? 155 : 100;

      // Fine fiber noise
      const noise = (Math.random() - 0.5) * 22;
      val = Math.max(0, Math.min(255, Math.round(val + noise)));

      const idx = (y * size + x) * 4;
      data[idx] = val;     // R
      data[idx + 1] = val; // G
      data[idx + 2] = val; // B
      data[idx + 3] = 255; // A
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates an Oxford Weave / Basket Weave bump map (used for dress shirts)
 */
export function getOxfordTexture(repeatX = 32, repeatY = 32) {
  const cacheKey = `oxford_${repeatX}_${repeatY}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  const weaveSize = 6;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cellX = Math.floor(x / weaveSize) % 2;
      const cellY = Math.floor(y / weaveSize) % 2;
      const isWarp = (cellX === cellY);

      let val = isWarp ? 145 : 110;
      const threadPinch = Math.sin((x % weaveSize) / weaveSize * Math.PI) *
                          Math.sin((y % weaveSize) / weaveSize * Math.PI) * 25;
      val = Math.min(255, Math.max(0, Math.round(val + threadPinch + (Math.random() - 0.5) * 15)));

      const idx = (y * size + x) * 4;
      data[idx] = val;
      data[idx + 1] = val;
      data[idx + 2] = val;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates a Knitted Rib texture (for school V-neck sweaters and ribbed cuffs)
 */
export function getKnitTexture(repeatX = 14, repeatY = 18) {
  const cacheKey = `knit_${repeatX}_${repeatY}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  const waleWidth = 12; // vertical knit rib column
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const walePos = (x % waleWidth) / waleWidth; // 0 to 1
      const columnCurve = Math.sin(walePos * Math.PI); // arch of the knit loop
      const rowLoop = Math.cos((y % 16) / 16 * Math.PI * 2) * 20;

      let val = 100 + columnCurve * 60 + rowLoop + (Math.random() - 0.5) * 18;
      val = Math.max(0, Math.min(255, Math.round(val)));

      const idx = (y * size + x) * 4;
      data[idx] = val;
      data[idx + 1] = val;
      data[idx + 2] = val;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates a subtle studio floor radial shadow & reflection texture
 */
export function getStudioFloorTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Clear
  ctx.clearRect(0, 0, size, size);

  // Soft ambient contact shadow gradient under feet
  const grad = ctx.createRadialGradient(size / 2, size / 2, 20, size / 2, size / 2, size * 0.45);
  grad.addColorStop(0, 'rgba(15, 23, 42, 0.42)');
  grad.addColorStop(0.3, 'rgba(15, 23, 42, 0.22)');
  grad.addColorStop(0.7, 'rgba(15, 23, 42, 0.06)');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.45, 0, Math.PI * 2);
  ctx.fill();

  // Subtle circular showroom pedestal ring
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.44, 0, Math.PI * 2);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates default school crest badge texture
 */
export function createDefaultCrestTexture(schoolName = 'ST. XAVIER ACADEMY', monogram = 'SX', color = '#881337', accentColor = '#f59e0b') {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, size, size);

  // Shield Crest background
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.08);
  ctx.lineTo(size * 0.84, size * 0.16);
  ctx.bezierCurveTo(size * 0.84, size * 0.55, size * 0.72, size * 0.78, size * 0.5, size * 0.94);
  ctx.bezierCurveTo(size * 0.28, size * 0.78, size * 0.16, size * 0.55, size * 0.16, size * 0.16);
  ctx.closePath();

  // Fill shield with school color
  ctx.fillStyle = color;
  ctx.fill();

  // Gold stitched border
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 14;
  ctx.stroke();

  // Inner dashed embroidery stitch
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.setLineDash([8, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Monogram / Crest Icon
  ctx.fillStyle = accentColor;
  ctx.font = 'bold 120px "Cinzel", "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(monogram, size * 0.5, size * 0.42);

  // Banner ribbon at bottom of shield
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.rect(size * 0.2, size * 0.68, size * 0.6, 52);
  ctx.fill();
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(size * 0.2, size * 0.68, size * 0.6, 52);

  // School name text inside ribbon
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Inter", sans-serif';
  ctx.fillText(schoolName.toUpperCase().slice(0, 16), size * 0.5, size * 0.73);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates diagonal collegiate striped tie texture
 */
export function createStripedTieTexture(baseColor = '#881337', stripeColor = '#f59e0b', stripeWidth = 24) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Diagonal stripes at 45 degrees
  ctx.strokeStyle = stripeColor;
  ctx.lineWidth = stripeWidth;

  const total = size * 2;
  for (let offset = -total; offset < total; offset += stripeWidth * 3.5) {
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset + size, size);
    ctx.stroke();

    // Thin white pin-stripe next to main stripe
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(offset + stripeWidth * 0.8, 0);
    ctx.lineTo(offset + stripeWidth * 0.8 + size, size);
    ctx.stroke();

    ctx.strokeStyle = stripeColor;
    ctx.lineWidth = stripeWidth;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 3);
  texture.needsUpdate = true;
  return texture;
}
