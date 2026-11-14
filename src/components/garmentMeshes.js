import * as THREE from 'three';
import {
  getTwillTexture,
  getOxfordTexture,
  getKnitTexture,
  createDefaultCrestTexture,
  createStripedTieTexture,
} from '../utils/fabricTextures';

/**
 * Creates professional 3D school uniform garment meshes tailored for the humanoid mannequin.
 * Every garment is a modular 3D object with authentic cloth detailing:
 * collars, lapels, buttons, seams, pockets, pleats, and embroidered badges.
 */

// Helper to create cloth PBR materials
export function createClothMaterial({
  color = '#1e3a8a',
  weaveType = 'twill', // 'twill', 'oxford', 'knit', 'smooth'
  roughness = 0.82,
  metalness = 0.02,
  bumpScale = 0.008,
}) {
  let bumpMap = null;
  if (weaveType === 'twill') bumpMap = getTwillTexture(24, 24);
  else if (weaveType === 'oxford') bumpMap = getOxfordTexture(32, 32);
  else if (weaveType === 'knit') bumpMap = getKnitTexture(16, 20);

  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness,
    metalness,
    bumpMap: bumpMap,
    bumpScale: bumpScale,
    side: THREE.DoubleSide,
  });
}

/**
 * Creates the School Blazer mesh group
 */
export function createBlazerMesh({
  color = '#1e3a8a',
  accentColor = '#f59e0b',
  crestTexture = null,
  buttonColor = '#d4af37',
  isFemale = false,
}) {
  const group = new THREE.Group();
  group.name = 'blazer_layer';

  const clothMat = createClothMaterial({ color, weaveType: 'twill', roughness: 0.8, bumpScale: 0.009 });
  const lapelMat = createClothMaterial({ color, weaveType: 'twill', roughness: 0.76, bumpScale: 0.009 });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(buttonColor),
    metalness: 0.85,
    roughness: 0.18,
  });

  // Base jacket body: Tailored torso outer layer (slightly larger than inner shirt)
  const bodyH = 0.54;
  const topR = isFemale ? 0.20 : 0.22;
  const botR = isFemale ? 0.22 : 0.21;
  const bodyGeo = new THREE.CylinderGeometry(topR, botR, bodyH, 32, 1, false, 0.45, Math.PI * 2 - 0.9);
  const bodyMesh = new THREE.Mesh(bodyGeo, clothMat);
  bodyMesh.position.set(0, 1.25, 0);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  group.add(bodyMesh);

  // Jacket Back panel completion
  const backGeo = new THREE.CylinderGeometry(topR * 0.99, botR * 0.99, bodyH, 32, 1, false, -0.45, 0.9);
  const backMesh = new THREE.Mesh(backGeo, clothMat);
  backMesh.position.set(0, 1.25, 0);
  group.add(backMesh);

  // Left & Right Notch Lapels
  const lapelShape = new THREE.Shape();
  lapelShape.moveTo(0, 0);
  lapelShape.lineTo(0.08, 0.16);
  lapelShape.lineTo(0.06, 0.28);
  lapelShape.lineTo(0.01, 0.32);
  lapelShape.lineTo(-0.02, 0.24);
  lapelShape.closePath();

  const lapelExtrude = { depth: 0.008, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.002, bevelThickness: 0.002 };
  const lapelGeo = new THREE.ExtrudeGeometry(lapelShape, lapelExtrude);

  // Left Lapel
  const leftLapel = new THREE.Mesh(lapelGeo, lapelMat);
  leftLapel.position.set(0.05, 1.30, 0.18);
  leftLapel.rotation.set(-0.15, -0.22, -0.25);
  leftLapel.castShadow = true;
  group.add(leftLapel);

  // Right Lapel
  const rightLapel = new THREE.Mesh(lapelGeo, lapelMat);
  rightLapel.position.set(-0.05, 1.30, 0.18);
  rightLapel.rotation.set(-0.15, 0.22, 0.25);
  rightLapel.scale.set(-1, 1, 1);
  rightLapel.castShadow = true;
  group.add(rightLapel);

  // Collar stand wrapping around neck
  const collarGeo = new THREE.TorusGeometry(0.125, 0.025, 12, 32, Math.PI * 1.3);
  const collarMesh = new THREE.Mesh(collarGeo, lapelMat);
  collarMesh.rotation.set(Math.PI / 2 + 0.1, 0, Math.PI * 0.35);
  collarMesh.position.set(0, 1.51, -0.02);
  group.add(collarMesh);

  // Shoulder Pads / Epaulets (structured tailored suiting shoulder line)
  const shoulderGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.12, 16);
  shoulderGeo.rotateZ(Math.PI / 2);
  const leftShoulder = new THREE.Mesh(shoulderGeo, clothMat);
  leftShoulder.position.set(0.22, 1.48, 0);
  const rightShoulder = new THREE.Mesh(shoulderGeo, clothMat);
  rightShoulder.position.set(-0.22, 1.48, 0);
  group.add(leftShoulder, rightShoulder);

  // Left & Right Blazer Sleeves
  const sleeveR = 0.082;
  const sleeveL = 0.52;
  const sleeveGeo = new THREE.CylinderGeometry(sleeveR, sleeveR * 0.85, sleeveL, 24);

  // Left sleeve
  const leftSleeve = new THREE.Mesh(sleeveGeo, clothMat);
  leftSleeve.position.set(0.26, 1.20, 0.02);
  leftSleeve.rotation.set(0.08, 0, -0.16);
  leftSleeve.castShadow = true;
  group.add(leftSleeve);

  // Right sleeve
  const rightSleeve = new THREE.Mesh(sleeveGeo, clothMat);
  rightSleeve.position.set(-0.26, 1.20, 0.02);
  rightSleeve.rotation.set(0.08, 0, 0.16);
  rightSleeve.castShadow = true;
  group.add(rightSleeve);

  // Sleeve cuff buttons (3 brass buttons per cuff)
  for (let i = 0; i < 3; i++) {
    const btnGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.004, 12);
    btnGeo.rotateZ(Math.PI / 2);
    const yOff = 0.98 + i * 0.022;

    const lBtn = new THREE.Mesh(btnGeo, buttonMat);
    lBtn.position.set(0.32, yOff, 0.05);
    const rBtn = new THREE.Mesh(btnGeo, buttonMat);
    rBtn.position.set(-0.32, yOff, 0.05);
    group.add(lBtn, rBtn);
  }

  // Front closure buttons (2 formal jacket buttons)
  for (let i = 0; i < 2; i++) {
    const frontBtnGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.006, 16);
    frontBtnGeo.rotateX(Math.PI / 2);
    const fBtn = new THREE.Mesh(frontBtnGeo, buttonMat);
    fBtn.position.set(0.005, 1.15 + i * 0.12, 0.20);
    fBtn.castShadow = true;
    group.add(fBtn);
  }

  // Lower welt flap pockets (left and right waist)
  const pocketGeo = new THREE.BoxGeometry(0.09, 0.035, 0.012);
  const leftFlap = new THREE.Mesh(pocketGeo, lapelMat);
  leftFlap.position.set(0.13, 1.08, 0.17);
  leftFlap.rotation.set(-0.1, 0.3, -0.05);
  const rightFlap = new THREE.Mesh(pocketGeo, lapelMat);
  rightFlap.position.set(-0.13, 1.08, 0.17);
  rightFlap.rotation.set(-0.1, -0.3, 0.05);
  group.add(leftFlap, rightFlap);

  // Left Chest Pocket with School Crest Badge
  const chestPocketGeo = new THREE.BoxGeometry(0.075, 0.018, 0.008);
  const chestPocket = new THREE.Mesh(chestPocketGeo, lapelMat);
  chestPocket.position.set(0.10, 1.34, 0.185);
  chestPocket.rotation.set(-0.12, 0.24, -0.05);
  group.add(chestPocket);

  // School Crest / Embroidered Badge Plane
  const crestTextureToUse = crestTexture || createDefaultCrestTexture();
  const crestMat = new THREE.MeshStandardMaterial({
    map: crestTextureToUse,
    transparent: true,
    roughness: 0.5,
    metalness: 0.1,
  });
  const crestPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.065, 0.075), crestMat);
  crestPlane.position.set(0.10, 1.30, 0.192);
  crestPlane.rotation.set(-0.12, 0.24, -0.05);
  crestPlane.name = 'blazer_crest_badge';
  group.add(crestPlane);

  return group;
}

/**
 * Creates the Heritage V-Neck Knit Sweater
 */
export function createSweaterMesh({
  color = '#064e3b',
  stripeColor = '#f59e0b',
  isFemale = false,
}) {
  const group = new THREE.Group();
  group.name = 'sweater_layer';

  const knitMat = createClothMaterial({ color, weaveType: 'knit', roughness: 0.88, bumpScale: 0.014 });
  const trimMat = createClothMaterial({ color: stripeColor, weaveType: 'knit', roughness: 0.82 });

  // Main knit sweater body
  const bodyH = 0.52;
  const topR = isFemale ? 0.195 : 0.215;
  const botR = isFemale ? 0.185 : 0.195;
  const bodyGeo = new THREE.CylinderGeometry(topR, botR, bodyH, 32);
  const bodyMesh = new THREE.Mesh(bodyGeo, knitMat);
  bodyMesh.position.set(0, 1.26, 0);
  bodyMesh.castShadow = true;
  group.add(bodyMesh);

  // Ribbed waistband at bottom
  const hemGeo = new THREE.CylinderGeometry(botR * 1.02, botR * 0.98, 0.05, 32);
  const hemMesh = new THREE.Mesh(hemGeo, knitMat);
  hemMesh.position.set(0, 1.01, 0);
  group.add(hemMesh);

  // Cutout V-Neck Opening collar band (ribbed contrast stripe)
  const vShape = new THREE.Shape();
  vShape.moveTo(-0.10, 1.52);
  vShape.lineTo(0, 1.34);
  vShape.lineTo(0.10, 1.52);
  vShape.lineTo(0.07, 1.52);
  vShape.lineTo(0, 1.37);
  vShape.lineTo(-0.07, 1.52);
  vShape.closePath();

  const vExtrude = { depth: 0.015, bevelEnabled: false };
  const vCollar = new THREE.Mesh(new THREE.ExtrudeGeometry(vShape, vExtrude), trimMat);
  vCollar.position.set(0, 0, 0.17);
  vCollar.rotation.x = -0.14;
  group.add(vCollar);

  // Sweater Long Sleeves
  const sleeveR = 0.076;
  const sleeveL = 0.50;
  const sleeveGeo = new THREE.CylinderGeometry(sleeveR, sleeveR * 0.8, sleeveL, 24);

  const leftSleeve = new THREE.Mesh(sleeveGeo, knitMat);
  leftSleeve.position.set(0.24, 1.20, 0.02);
  leftSleeve.rotation.set(0.08, 0, -0.15);
  leftSleeve.castShadow = true;
  group.add(leftSleeve);

  const rightSleeve = new THREE.Mesh(sleeveGeo, knitMat);
  rightSleeve.position.set(-0.24, 1.20, 0.02);
  rightSleeve.rotation.set(0.08, 0, 0.15);
  rightSleeve.castShadow = true;
  group.add(rightSleeve);

  // Ribbed wrist cuffs with stripe
  const cuffGeo = new THREE.CylinderGeometry(0.058, 0.056, 0.045, 16);
  const leftCuff = new THREE.Mesh(cuffGeo, trimMat);
  leftCuff.position.set(0.29, 0.97, 0.04);
  leftCuff.rotation.z = -0.15;
  const rightCuff = new THREE.Mesh(cuffGeo, trimMat);
  rightCuff.position.set(-0.29, 0.97, 0.04);
  rightCuff.rotation.z = 0.15;
  group.add(leftCuff, rightCuff);

  return group;
}

/**
 * Creates Formal Shirt (Long Sleeve or Short Sleeve / Polo)
 */
export function createShirtMesh({
  color = '#ffffff',
  shirtStyle = 'long_sleeve', // 'long_sleeve', 'short_sleeve', 'polo'
  crestTexture = null,
  isFemale = false,
}) {
  const group = new THREE.Group();
  group.name = 'shirt_layer';

  const shirtMat = createClothMaterial({ color, weaveType: 'oxford', roughness: 0.72, bumpScale: 0.006 });
  const buttonMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.25, metalness: 0.1 });

  // Main Shirt Torso
  const bodyH = 0.50;
  const topR = isFemale ? 0.185 : 0.20;
  const botR = isFemale ? 0.175 : 0.185;
  const bodyGeo = new THREE.CylinderGeometry(topR, botR, bodyH, 32);
  const bodyMesh = new THREE.Mesh(bodyGeo, shirtMat);
  bodyMesh.position.set(0, 1.26, 0);
  bodyMesh.castShadow = true;
  group.add(bodyMesh);

  // Front Button Placket strip
  const placketGeo = new THREE.BoxGeometry(0.026, bodyH, 0.008);
  const placketMesh = new THREE.Mesh(placketGeo, shirtMat);
  placketMesh.position.set(0, 1.26, topR * 0.95);
  group.add(placketMesh);

  // Shirt Placket Buttons (5 tiny mother of pearl buttons)
  for (let i = 0; i < 5; i++) {
    const btnGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.004, 12);
    btnGeo.rotateX(Math.PI / 2);
    const btn = new THREE.Mesh(btnGeo, buttonMat);
    btn.position.set(0, 1.08 + i * 0.08, topR * 0.98);
    group.add(btn);
  }

  // Crisp Turn-Down Collar (Left & Right collar wings)
  const collarShape = new THREE.Shape();
  collarShape.moveTo(0, 0);
  collarShape.lineTo(0.065, -0.06);
  collarShape.lineTo(0.05, -0.01);
  collarShape.lineTo(0.01, 0.03);
  collarShape.closePath();

  const collarExtrude = { depth: 0.005, bevelEnabled: false };
  const leftWing = new THREE.Mesh(new THREE.ExtrudeGeometry(collarShape, collarExtrude), shirtMat);
  leftWing.position.set(0.02, 1.50, 0.11);
  leftWing.rotation.set(-0.25, -0.2, -0.4);

  const rightWing = new THREE.Mesh(new THREE.ExtrudeGeometry(collarShape, collarExtrude), shirtMat);
  rightWing.position.set(-0.02, 1.50, 0.11);
  rightWing.rotation.set(-0.25, 0.2, 0.4);
  rightWing.scale.set(-1, 1, 1);

  group.add(leftWing, rightWing);

  // Collar neckband
  const bandGeo = new THREE.CylinderGeometry(0.09, 0.095, 0.035, 24, 1, true);
  const bandMesh = new THREE.Mesh(bandGeo, shirtMat);
  bandMesh.position.set(0, 1.51, 0);
  group.add(bandMesh);

  // Sleeves depending on shirtStyle
  if (shirtStyle === 'short_sleeve' || shirtStyle === 'polo') {
    // Short sleeves
    const shortR = 0.075;
    const shortL = 0.22;
    const shortGeo = new THREE.CylinderGeometry(shortR, shortR * 0.9, shortL, 20);

    const leftShort = new THREE.Mesh(shortGeo, shirtMat);
    leftShort.position.set(0.22, 1.34, 0.02);
    leftShort.rotation.set(0.05, 0, -0.16);
    leftShort.castShadow = true;

    const rightShort = new THREE.Mesh(shortGeo, shirtMat);
    rightShort.position.set(-0.22, 1.34, 0.02);
    rightShort.rotation.set(0.05, 0, 0.16);
    rightShort.castShadow = true;

    // Sleeve hem fold cuffs
    const cuffBandGeo = new THREE.CylinderGeometry(shortR * 0.92, shortR * 0.92, 0.025, 20);
    const lCuff = new THREE.Mesh(cuffBandGeo, shirtMat);
    lCuff.position.set(0.24, 1.24, 0.02);
    lCuff.rotation.z = -0.16;
    const rCuff = new THREE.Mesh(cuffBandGeo, shirtMat);
    rCuff.position.set(-0.24, 1.24, 0.02);
    rCuff.rotation.z = 0.16;

    group.add(leftShort, rightShort, lCuff, rCuff);
  } else {
    // Long sleeves
    const longR = 0.074;
    const longL = 0.50;
    const longGeo = new THREE.CylinderGeometry(longR, longR * 0.75, longL, 24);

    const leftLong = new THREE.Mesh(longGeo, shirtMat);
    leftLong.position.set(0.24, 1.22, 0.02);
    leftLong.rotation.set(0.08, 0, -0.15);
    leftLong.castShadow = true;

    const rightLong = new THREE.Mesh(longGeo, shirtMat);
    rightLong.position.set(-0.24, 1.22, 0.02);
    rightLong.rotation.set(0.08, 0, 0.15);
    rightLong.castShadow = true;

    // Barrel Cuffs at wrist with button
    const barrelGeo = new THREE.CylinderGeometry(0.058, 0.058, 0.06, 16);
    const lBarrel = new THREE.Mesh(barrelGeo, shirtMat);
    lBarrel.position.set(0.29, 0.98, 0.04);
    lBarrel.rotation.z = -0.15;
    const rBarrel = new THREE.Mesh(barrelGeo, shirtMat);
    rBarrel.position.set(-0.29, 0.98, 0.04);
    rBarrel.rotation.z = 0.15;

    group.add(leftLong, rightLong, lBarrel, rBarrel);
  }

  // Chest Pocket & Crest (visible when worn without blazer)
  const pocketGeo = new THREE.BoxGeometry(0.065, 0.075, 0.005);
  const pocketMesh = new THREE.Mesh(pocketGeo, shirtMat);
  pocketMesh.position.set(0.085, 1.30, topR * 0.95);
  pocketMesh.rotation.y = 0.2;
  group.add(pocketMesh);

  if (crestTexture) {
    const crestMat = new THREE.MeshStandardMaterial({
      map: crestTexture,
      transparent: true,
      roughness: 0.6,
    });
    const crestPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.045, 0.05), crestMat);
    crestPlane.position.set(0.085, 1.305, topR * 0.96);
    crestPlane.rotation.y = 0.2;
    group.add(crestPlane);
  }

  return group;
}

/**
 * Creates School Trousers (Tailored pants with sharp front creases)
 */
export function createTrousersMesh({
  color = '#1e293b',
}) {
  const group = new THREE.Group();
  group.name = 'trousers_layer';

  const clothMat = createClothMaterial({ color, weaveType: 'twill', roughness: 0.82, bumpScale: 0.008 });

  // Waistband & Hips / Pelvis
  const pelvisGeo = new THREE.CylinderGeometry(0.18, 0.17, 0.18, 32);
  const pelvisMesh = new THREE.Mesh(pelvisGeo, clothMat);
  pelvisMesh.position.set(0, 0.96, 0);
  pelvisMesh.castShadow = true;
  group.add(pelvisMesh);

  // Left & Right Trouser Legs
  const legH = 0.82;
  const topR = 0.088;
  const botR = 0.068;
  const legGeo = new THREE.CylinderGeometry(topR, botR, legH, 24);

  const leftLeg = new THREE.Mesh(legGeo, clothMat);
  leftLeg.position.set(0.09, 0.48, 0);
  leftLeg.castShadow = true;

  const rightLeg = new THREE.Mesh(legGeo, clothMat);
  rightLeg.position.set(-0.09, 0.48, 0);
  rightLeg.castShadow = true;

  group.add(leftLeg, rightLeg);

  // Sharp front ironed crease line down each leg
  const creaseGeo = new THREE.BoxGeometry(0.003, legH * 0.88, 0.006);
  const creaseMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color).multiplyScalar(0.75),
    roughness: 0.9,
  });

  const leftCrease = new THREE.Mesh(creaseGeo, creaseMat);
  leftCrease.position.set(0.09, 0.48, topR * 0.92);

  const rightCrease = new THREE.Mesh(creaseGeo, creaseMat);
  rightCrease.position.set(-0.09, 0.48, topR * 0.92);

  group.add(leftCrease, rightCrease);

  // Bottom Hem Cuffs
  const hemGeo = new THREE.CylinderGeometry(botR * 1.03, botR * 1.03, 0.035, 20);
  const lHem = new THREE.Mesh(hemGeo, clothMat);
  lHem.position.set(0.09, 0.088, 0);
  const rHem = new THREE.Mesh(hemGeo, clothMat);
  rHem.position.set(-0.09, 0.088, 0);
  group.add(lHem, rHem);

  return group;
}

/**
 * Creates Pleated Skirt (Box pleated school uniform skirt for girls)
 */
export function createSkirtMesh({
  color = '#881337',
  tartanPattern = false,
}) {
  const group = new THREE.Group();
  group.name = 'skirt_layer';

  const clothMat = createClothMaterial({ color, weaveType: 'twill', roughness: 0.8, bumpScale: 0.01 });

  // High Waistband
  const waistH = 0.06;
  const waistGeo = new THREE.CylinderGeometry(0.18, 0.185, waistH, 32);
  const waistMesh = new THREE.Mesh(waistGeo, clothMat);
  waistMesh.position.set(0, 1.00, 0);
  group.add(waistMesh);

  // Flared Pleated Skirt Body (24 crisp knife / box pleats)
  const pleatCount = 24;
  const skirtH = 0.44; // knee-length
  const topR = 0.185;
  const botR = 0.28;

  for (let i = 0; i < pleatCount; i++) {
    const angle = (i / pleatCount) * Math.PI * 2;
    const nextAngle = ((i + 1) / pleatCount) * Math.PI * 2;
    const midAngle = (angle + nextAngle) / 2;

    const pleatShape = new THREE.Shape();
    // Top inner & outer edge
    const x1 = Math.cos(angle) * topR;
    const z1 = Math.sin(angle) * topR;
    const x2 = Math.cos(nextAngle) * topR;
    const z2 = Math.sin(nextAngle) * topR;

    // Bottom flared edge with pleat fold ridge
    const bx1 = Math.cos(angle) * botR;
    const bz1 = Math.sin(angle) * botR;
    const bx2 = Math.cos(nextAngle) * botR;
    const bz2 = Math.sin(nextAngle) * botR;
    const foldBump = 0.012; // 3D ridge extrusion
    const bmx = Math.cos(midAngle) * (botR + foldBump);
    const bmz = Math.sin(midAngle) * (botR + foldBump);

    // Build pleat quad geometry
    const pGeo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      x1, skirtH / 2, z1,
      bx1, -skirtH / 2, bz1,
      bmx, -skirtH / 2, bmz,

      x1, skirtH / 2, z1,
      bmx, -skirtH / 2, bmz,
      x2, skirtH / 2, z2,

      x2, skirtH / 2, z2,
      bmx, -skirtH / 2, bmz,
      bx2, -skirtH / 2, bz2,
    ]);

    pGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    pGeo.computeVertexNormals();

    const pleatMesh = new THREE.Mesh(pGeo, clothMat);
    pleatMesh.position.set(0, 0.76, 0);
    pleatMesh.castShadow = true;
    group.add(pleatMesh);
  }

  return group;
}

/**
 * Creates Bermuda Shorts (Knee-length tailored school shorts)
 */
export function createShortsMesh({
  color = '#1e293b',
}) {
  const group = new THREE.Group();
  group.name = 'shorts_layer';

  const clothMat = createClothMaterial({ color, weaveType: 'twill', roughness: 0.82 });

  // Waistband & Hips
  const pelvisGeo = new THREE.CylinderGeometry(0.18, 0.175, 0.18, 32);
  const pelvisMesh = new THREE.Mesh(pelvisGeo, clothMat);
  pelvisMesh.position.set(0, 0.96, 0);
  pelvisMesh.castShadow = true;
  group.add(pelvisMesh);

  // Shorts legs (stopping just above knee at y ≈ 0.58)
  const legH = 0.36;
  const topR = 0.092;
  const botR = 0.084;
  const legGeo = new THREE.CylinderGeometry(topR, botR, legH, 24);

  const leftLeg = new THREE.Mesh(legGeo, clothMat);
  leftLeg.position.set(0.09, 0.72, 0);
  leftLeg.castShadow = true;

  const rightLeg = new THREE.Mesh(legGeo, clothMat);
  rightLeg.position.set(-0.09, 0.72, 0);
  rightLeg.castShadow = true;

  group.add(leftLeg, rightLeg);

  // Tailored hem cuffs
  const hemGeo = new THREE.CylinderGeometry(botR * 1.03, botR * 1.03, 0.03, 20);
  const lHem = new THREE.Mesh(hemGeo, clothMat);
  lHem.position.set(0.09, 0.55, 0);
  const rHem = new THREE.Mesh(hemGeo, clothMat);
  rHem.position.set(-0.09, 0.55, 0);
  group.add(lHem, rHem);

  return group;
}

/**
 * Creates Neckwear (Collegiate Striped Tie, Solid Tie, or Bow Tie)
 */
export function createTieMesh({
  tieStyle = 'striped', // 'striped', 'solid', 'bowtie', 'none'
  baseColor = '#881337',
  stripeColor = '#f59e0b',
}) {
  const group = new THREE.Group();
  group.name = 'neckwear_layer';

  if (tieStyle === 'none') return group;

  if (tieStyle === 'bowtie') {
    const bowMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(baseColor),
      roughness: 0.65,
    });

    // Bow knot center
    const knotGeo = new THREE.CylinderGeometry(0.014, 0.012, 0.022, 12);
    knotGeo.rotateZ(Math.PI / 2);
    const knot = new THREE.Mesh(knotGeo, bowMat);
    knot.position.set(0, 1.48, 0.125);
    group.add(knot);

    // Left & Right Wings of bow tie
    const wingGeo = new THREE.ConeGeometry(0.035, 0.065, 4);
    wingGeo.rotateZ(-Math.PI / 2);
    const leftWing = new THREE.Mesh(wingGeo, bowMat);
    leftWing.position.set(0.045, 1.48, 0.12);
    const rightWing = new THREE.Mesh(wingGeo, bowMat);
    rightWing.position.set(-0.045, 1.48, 0.12);
    rightWing.rotation.z = Math.PI;

    group.add(leftWing, rightWing);
    return group;
  }

  // Classic Necktie (Windsor Knot + Blade)
  let tieMat;
  if (tieStyle === 'striped') {
    const stripedTex = createStripedTieTexture(baseColor, stripeColor, 20);
    tieMat = new THREE.MeshStandardMaterial({
      map: stripedTex,
      roughness: 0.62,
      metalness: 0.05,
    });
  } else {
    tieMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(baseColor),
      roughness: 0.58,
      metalness: 0.08, // subtle silk sheen
    });
  }

  // Knot (inverted tapered trapezoid)
  const knotGeo = new THREE.CylinderGeometry(0.022, 0.015, 0.032, 16);
  const knotMesh = new THREE.Mesh(knotGeo, tieMat);
  knotMesh.position.set(0, 1.47, 0.118);
  knotMesh.rotation.x = 0.12;
  group.add(knotMesh);

  // Tie Blade (widens towards pointed tip)
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.016, 0);
  bladeShape.lineTo(0.016, 0);
  bladeShape.lineTo(0.032, -0.32);
  bladeShape.lineTo(0, -0.37); // triangular pointed tip
  bladeShape.lineTo(-0.032, -0.32);
  bladeShape.closePath();

  const bladeExtrude = { depth: 0.005, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.001, bevelThickness: 0.001 };
  const bladeMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(bladeShape, bladeExtrude), tieMat);
  bladeMesh.position.set(0, 1.46, 0.115);
  bladeMesh.rotation.x = -0.12;
  bladeMesh.castShadow = true;
  group.add(bladeMesh);

  // Tie Clip / Tie Bar (polished gold or silver pin across blade)
  const clipMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
  const clipMesh = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.005, 0.006), clipMat);
  clipMesh.position.set(0.006, 1.32, 0.15);
  clipMesh.rotation.x = -0.12;
  group.add(clipMesh);

  return group;
}

/**
 * Creates Leather Belt with Metal Buckle
 */
export function createBeltMesh({
  beltColor = '#1a1a1a',
  buckleColor = '#c0a030',
}) {
  const group = new THREE.Group();
  group.name = 'belt_layer';

  const strapMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(beltColor), roughness: 0.35, metalness: 0.1 });
  const buckleMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(buckleColor), metalness: 0.9, roughness: 0.2 });

  // Leather Strap ring around waist
  const strapGeo = new THREE.CylinderGeometry(0.182, 0.182, 0.032, 32, 1, true);
  const strapMesh = new THREE.Mesh(strapGeo, strapMat);
  strapMesh.position.set(0, 1.025, 0);
  group.add(strapMesh);

  // Metal Buckle in front
  const buckleGeo = new THREE.BoxGeometry(0.042, 0.038, 0.012);
  const buckleMesh = new THREE.Mesh(buckleGeo, buckleMat);
  buckleMesh.position.set(0, 1.025, 0.185);
  group.add(buckleMesh);

  return group;
}

/**
 * Creates Formal Leather Oxford Shoes & School Socks
 */
export function createShoesMesh({
  shoeColor = '#111111',
  sockColor = '#e2e8f0',
}) {
  const group = new THREE.Group();
  group.name = 'shoes_layer';

  const shoeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(shoeColor),
    roughness: 0.28,
    metalness: 0.12, // polished dress leather finish
  });
  const soleMat = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 0.9 });
  const sockMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(sockColor), roughness: 0.85 });

  // Left & Right Socks (above ankle)
  const sockGeo = new THREE.CylinderGeometry(0.052, 0.054, 0.12, 20);
  const leftSock = new THREE.Mesh(sockGeo, sockMat);
  leftSock.position.set(0.09, 0.09, 0);
  const rightSock = new THREE.Mesh(sockGeo, sockMat);
  rightSock.position.set(-0.09, 0.09, 0);
  group.add(leftSock, rightSock);

  // Left & Right Oxford Shoes
  [-0.09, 0.09].forEach((xPos) => {
    const shoeGroup = new THREE.Group();

    // Main shoe body / vamp
    const upperGeo = new THREE.BoxGeometry(0.088, 0.065, 0.21);
    const upper = new THREE.Mesh(upperGeo, shoeMat);
    upper.position.set(0, 0.045, 0.035);
    shoeGroup.add(upper);

    // Rounded toe box
    const toeGeo = new THREE.SphereGeometry(0.048, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const toe = new THREE.Mesh(toeGeo, shoeMat);
    toe.position.set(0, 0.03, 0.135);
    shoeGroup.add(toe);

    // Rubber Welt Sole & Heel
    const soleGeo = new THREE.BoxGeometry(0.094, 0.016, 0.23);
    const sole = new THREE.Mesh(soleGeo, soleMat);
    sole.position.set(0, 0.008, 0.035);
    sole.castShadow = true;
    shoeGroup.add(sole);

    // Elevated Heel block
    const heelGeo = new THREE.BoxGeometry(0.094, 0.022, 0.07);
    const heel = new THREE.Mesh(heelGeo, soleMat);
    heel.position.set(0, 0.02, -0.045);
    shoeGroup.add(heel);

    shoeGroup.position.set(xPos, 0, 0);
    shoeGroup.castShadow = true;
    group.add(shoeGroup);
  });

  return group;
}

/**
 * Creates optional School Backpack accessory
 */
export function createBackpackMesh({
  bagColor = '#0f172a',
  accentColor = '#f59e0b',
}) {
  const group = new THREE.Group();
  group.name = 'backpack_layer';

  const bagMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(bagColor), roughness: 0.65 });
  const trimMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(accentColor), roughness: 0.5 });

  // Main Bag body
  const bodyGeo = new THREE.BoxGeometry(0.28, 0.38, 0.14);
  const bodyMesh = new THREE.Mesh(bodyGeo, bagMat);
  bodyMesh.position.set(0, 1.25, -0.21);
  bodyMesh.castShadow = true;
  group.add(bodyMesh);

  // Front zipper pocket
  const pocketGeo = new THREE.BoxGeometry(0.22, 0.20, 0.06);
  const pocketMesh = new THREE.Mesh(pocketGeo, trimMat);
  pocketMesh.position.set(0, 1.18, -0.29);
  group.add(pocketMesh);

  // Left & Right Padded Shoulder Straps
  const strapGeo = new THREE.TorusGeometry(0.14, 0.022, 12, 24, Math.PI);
  const leftStrap = new THREE.Mesh(strapGeo, bagMat);
  leftStrap.position.set(0.12, 1.34, -0.08);
  leftStrap.rotation.set(0, Math.PI / 2, 0);

  const rightStrap = new THREE.Mesh(strapGeo, bagMat);
  rightStrap.position.set(-0.12, 1.34, -0.08);
  rightStrap.rotation.set(0, Math.PI / 2, 0);

  group.add(leftStrap, rightStrap);

  return group;
}
