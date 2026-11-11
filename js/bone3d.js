/**
 * ============================================================================
 * ODAM ANATOMIYASI (ATLAS, 1-JILD) — 1-BO'LIM: OSTEOLOGIYA (Prof. N.K. Ahmedov)
 * HYPER-REALISTIC 3D BONE SPECIMEN ENGINE (Three.js / WebGL PBR)
 * ============================================================================
 * Medical-grade, museum-quality 3D bone visualization engine featuring:
 * - High-resolution procedural PBR bone textures (organic aging, osteon rings,
 *   substantia spongiosa trabecular lattices, nutrient foramina, cartilage glaze)
 * - Anatomically sculpted bone specimen geometries with accurate crests and fossae
 * - 3-Point professional studio medical lighting with soft PCF contact shadows
 * - Silky smooth touch/mouse orbit controls (rotate, zoom, pan, auto-rotate)
 * - Real-time 3D landmark pins (1, 2, 3...) synchronized with Uzbek/Latin data
 * - Seamless 3D / 2D schema switching and module state synchronization
 */

window.Bone3D = (function() {
  'use strict';

  // Shared PBR textures and materials cache
  let textures = null;
  let materials = null;
  let currentTheme = 'night';

  // Active viewer instances registry: containerId -> viewerInstance
  const viewers = {};

  /**
   * 1. HYPER-REALISTIC PROCEDURAL PBR TEXTURE GENERATOR (1024x1024)
   * Creates authentic aged museum bone textures, trabecular sponges,
   * normal/bump maps, and vascular grooves without external image files.
   */
  function initTextures() {
    if (textures) return textures;

    // --- Texture 1: Aged Cortical Bone Surface (Natural Patina + Osteons + Foramina) ---
    const canvasCortical = document.createElement('canvas');
    canvasCortical.width = 1024;
    canvasCortical.height = 1024;
    const ctxC = canvasCortical.getContext('2d');

    // Natural aged ivory base gradient
    const baseGrad = ctxC.createRadialGradient(512, 512, 50, 512, 512, 600);
    baseGrad.addColorStop(0, '#fbf8f3');
    baseGrad.addColorStop(0.5, '#f4ece1');
    baseGrad.addColorStop(0.85, '#e8dcce');
    baseGrad.addColorStop(1, '#dbcbba');
    ctxC.fillStyle = baseGrad;
    ctxC.fillRect(0, 0, 1024, 1024);

    // Multi-octave organic aging patina (subtle amber/tea discoloration)
    for (let i = 0; i < 90; i++) {
      const cx = Math.random() * 1024;
      const cy = Math.random() * 1024;
      const rad = 40 + Math.random() * 140;
      const patchGrad = ctxC.createRadialGradient(cx, cy, 0, cx, cy, rad);
      const alpha = 0.02 + Math.random() * 0.04;
      patchGrad.addColorStop(0, Math.random() > 0.5 ? `rgba(180, 150, 120, ${alpha})` : `rgba(215, 195, 170, ${alpha})`);
      patchGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctxC.fillStyle = patchGrad;
      ctxC.beginPath();
      ctxC.arc(cx, cy, rad, 0, Math.PI * 2);
      ctxC.fill();
    }

    // Microscopic longitudinal collagen fiber grain / Osteon channels
    for (let i = 0; i < 4500; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const len = 6 + Math.random() * 38;
      const alpha = 0.025 + Math.random() * 0.06;
      ctxC.fillStyle = Math.random() > 0.45 ? `rgba(145, 125, 105, ${alpha})` : `rgba(255, 255, 255, ${alpha * 1.8})`;
      ctxC.fillRect(x, y, 1.2, len);
    }

    // Micro vascular grooves & nutrient canal branches (Sulci arteriosi/venosi)
    ctxC.strokeStyle = 'rgba(125, 95, 75, 0.12)';
    ctxC.lineWidth = 1.0;
    for (let i = 0; i < 28; i++) {
      let vx = Math.random() * 1024;
      let vy = Math.random() * 1024;
      ctxC.beginPath();
      ctxC.moveTo(vx, vy);
      for (let j = 0; j < 6; j++) {
        vx += (Math.random() - 0.5) * 45;
        vy += (Math.random() - 0.5) * 65;
        ctxC.lineTo(vx, vy);
      }
      ctxC.stroke();
    }

    // Nutrient foramina (tiny dark pits with reddish-brown halo)
    for (let i = 0; i < 750; i++) {
      const fx = Math.random() * 1024;
      const fy = Math.random() * 1024;
      const r = 0.7 + Math.random() * 1.8;
      // Halo
      ctxC.fillStyle = 'rgba(138, 85, 60, 0.1)';
      ctxC.beginPath();
      ctxC.arc(fx, fy, r * 2.5, 0, Math.PI * 2);
      ctxC.fill();
      // Core pore
      ctxC.fillStyle = 'rgba(65, 45, 32, 0.28)';
      ctxC.beginPath();
      ctxC.arc(fx, fy, r, 0, Math.PI * 2);
      ctxC.fill();
    }

    const corticalTexture = new THREE.CanvasTexture(canvasCortical);
    corticalTexture.wrapS = THREE.RepeatWrapping;
    corticalTexture.wrapT = THREE.RepeatWrapping;

    // --- Texture 2: Substantia Spongiosa (Trabecular Honeycomb Architecture) ---
    const canvasSpongy = document.createElement('canvas');
    canvasSpongy.width = 1024;
    canvasSpongy.height = 1024;
    const ctxS = canvasSpongy.getContext('2d');

    // Deep porous bone marrow base
    ctxS.fillStyle = '#b8a48c';
    ctxS.fillRect(0, 0, 1024, 1024);

    // Deep cellular pore cavities (cancellous bone marrow voids)
    for (let i = 0; i < 2800; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const r = 2.5 + Math.random() * 7.5;
      const depthAlpha = 0.45 + Math.random() * 0.45;
      ctxS.fillStyle = `rgba(45, 32, 22, ${depthAlpha})`;
      ctxS.beginPath();
      ctxS.arc(x, y, r, 0, Math.PI * 2);
      ctxS.fill();

      // Interconnecting bony trabeculae struts (spiculae)
      ctxS.strokeStyle = `rgba(248, 240, 228, ${0.35 + Math.random() * 0.35})`;
      ctxS.lineWidth = 1.6;
      ctxS.stroke();
    }

    const spongyTexture = new THREE.CanvasTexture(canvasSpongy);
    spongyTexture.wrapS = THREE.RepeatWrapping;
    spongyTexture.wrapT = THREE.RepeatWrapping;

    // --- Texture 3: Micro-Tactile Bump & Roughness Map ---
    const canvasBump = document.createElement('canvas');
    canvasBump.width = 1024;
    canvasBump.height = 1024;
    const ctxB = canvasBump.getContext('2d');
    ctxB.fillStyle = '#808080';
    ctxB.fillRect(0, 0, 1024, 1024);

    // High frequency surface roughness & Haversian osteon ridge noise
    for (let i = 0; i < 6000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const c = Math.floor(80 + Math.random() * 140);
      ctxB.fillStyle = `rgb(${c},${c},${c})`;
      ctxB.fillRect(x, y, 1.5, 3 + Math.random() * 16);
    }
    const bumpTexture = new THREE.CanvasTexture(canvasBump);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;

    // --- Texture 4: Articular Cartilage (Facies Articularis Pearlescent Glaze) ---
    const canvasCart = document.createElement('canvas');
    canvasCart.width = 512;
    canvasCart.height = 512;
    const ctxCart = canvasCart.getContext('2d');
    const cartGrad = ctxCart.createRadialGradient(256, 256, 10, 256, 256, 280);
    cartGrad.addColorStop(0, '#f0f9ff');
    cartGrad.addColorStop(0.6, '#bae6fd');
    cartGrad.addColorStop(1, '#7dd3fc');
    ctxCart.fillStyle = cartGrad;
    ctxCart.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 400; i++) {
      ctxCart.fillStyle = `rgba(255, 255, 255, ${0.05 + Math.random() * 0.1})`;
      ctxCart.beginPath();
      ctxCart.arc(Math.random() * 512, Math.random() * 512, 2 + Math.random() * 6, 0, Math.PI * 2);
      ctxCart.fill();
    }
    const cartilageTexture = new THREE.CanvasTexture(canvasCart);

    textures = {
      cortical: corticalTexture,
      spongy: spongyTexture,
      bump: bumpTexture,
      cartilage: cartilageTexture
    };

    return textures;
  }

  /**
   * 2. MEDICAL-GRADE PBR MATERIAL FACTORY
   * Creates realistic bone materials with accurate roughness, metalness, and bump.
   */
  function initMaterials() {
    if (materials) return materials;
    const t = initTextures();

    materials = {
      // 1. Natural Cortical Bone (Aged Museum Specimen Ivory)
      boneCortical: new THREE.MeshStandardMaterial({
        color: 0xf5efe6,
        roughness: 0.44,
        metalness: 0.03,
        map: t.cortical,
        bumpMap: t.bump,
        bumpScale: 0.024,
        flatShading: false
      }),

      // 2. High-Density Bone Ridge / Crest (Linea aspera, Crista iliaca, Tuberculum)
      boneRidge: new THREE.MeshStandardMaterial({
        color: 0xe8ddce,
        roughness: 0.48,
        metalness: 0.04,
        map: t.cortical,
        bumpMap: t.bump,
        bumpScale: 0.045,
        flatShading: false
      }),

      // 3. Substantia Spongiosa (Trabecular Cancellous Bone Latticework)
      boneSpongy: new THREE.MeshStandardMaterial({
        color: 0xd4c2ab,
        roughness: 0.88,
        metalness: 0.02,
        map: t.spongy,
        bumpMap: t.spongy,
        bumpScale: 0.085,
        flatShading: false
      }),

      // 4. Facies Articularis / Hyaline Cartilage (Smooth pearlescent glaze)
      cartilage: new THREE.MeshStandardMaterial({
        color: 0xe0f2fe,
        roughness: 0.16,
        metalness: 0.06,
        map: t.cartilage,
        transparent: true,
        opacity: 0.82
      }),

      // 5. Yellow Bone Marrow (Medulla Ossium Flava - Fatty golden marrow canal)
      marrowYellow: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.32,
        metalness: 0.08,
        emissive: 0x92400e,
        emissiveIntensity: 0.22
      }),

      // 6. Periosteum Sheath (Fibrous outer & osteogenic inner layers)
      periosteum: new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.58,
        metalness: 0.02,
        transparent: true,
        opacity: 0.88,
        side: THREE.DoubleSide
      }),

      // 7. Ligament / Fibrous Joint Band (Ligamentum transversum atlantis)
      ligament: new THREE.MeshStandardMaterial({
        color: 0xfde047,
        roughness: 0.62,
        metalness: 0.02,
        transparent: true,
        opacity: 0.88
      }),

      // 8. Highlighted / Selected Bone Mesh (Glow upon click)
      boneHighlighted: new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.32,
        metalness: 0.05,
        bumpMap: t.bump,
        bumpScale: 0.025,
        emissive: 0x0284c7,
        emissiveIntensity: 0.4
      })
    };

    return materials;
  }

  /**
   * 3. SILKY SMOOTH TOUCH & MOUSE ORBIT CONTROLLER
   * Custom, high-precision orbital controller for rotating, zooming, and panning
   * medical bone specimens with realistic inertia.
   */
  class OrbitControlsLite {
    constructor(camera, domElement, onUpdate) {
      this.camera = camera;
      this.domElement = domElement;
      this.onUpdate = onUpdate;

      this.target = new THREE.Vector3(0, 0, 0);
      this.radius = camera.position.distanceTo(this.target);
      this.minRadius = 1.0;
      this.maxRadius = 24.0;

      const offset = new THREE.Vector3().subVectors(camera.position, this.target);
      this.theta = Math.atan2(offset.x, offset.z);
      this.phi = Math.acos(Math.max(-1, Math.min(1, offset.y / this.radius)));

      this.targetTheta = this.theta;
      this.targetPhi = this.phi;
      this.targetRadius = this.radius;
      this.targetCenter = this.target.clone();

      this.isDragging = false;
      this.isPanning = false;
      this.previousMousePosition = { x: 0, y: 0 };
      this.autoRotate = false;
      this.autoRotateSpeed = 0.005;
      this.touchDistance = 0;

      this.bindEvents();
    }

    bindEvents() {
      const el = this.domElement;

      // Mouse Events
      el.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.isPanning = (e.button === 2); // Right click = pan
        this.previousMousePosition = { x: e.clientX, y: e.clientY };
        el.style.cursor = this.isPanning ? 'move' : 'grabbing';
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;

        if (this.isPanning) {
          const panSpeed = 0.0028 * this.targetRadius;
          const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
          const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
          this.targetCenter.addScaledVector(right, -deltaX * panSpeed);
          this.targetCenter.addScaledVector(up, deltaY * panSpeed);
        } else {
          const rotSpeed = 0.0065;
          this.targetTheta -= deltaX * rotSpeed;
          this.targetPhi -= deltaY * rotSpeed;
          this.targetPhi = Math.max(0.08, Math.min(Math.PI - 0.08, this.targetPhi));
        }

        this.previousMousePosition = { x: e.clientX, y: e.clientY };
      });

      window.addEventListener('mouseup', () => {
        this.isDragging = false;
        el.style.cursor = 'grab';
      });

      // Wheel Zoom
      el.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomDelta = e.deltaY * 0.0016 * this.targetRadius;
        this.targetRadius = Math.max(this.minRadius, Math.min(this.maxRadius, this.targetRadius + zoomDelta));
      }, { passive: false });

      // Touch Events (Mobile / Tablet)
      el.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.isDragging = true;
          this.isPanning = false;
          this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2) {
          this.isDragging = true;
          this.isPanning = true;
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          this.touchDistance = Math.hypot(dx, dy);
        }
      }, { passive: true });

      el.addEventListener('touchmove', (e) => {
        if (!this.isDragging) return;
        if (e.touches.length === 1 && !this.isPanning) {
          const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
          const deltaY = e.touches[0].clientY - this.previousMousePosition.y;
          this.targetTheta -= deltaX * 0.008;
          this.targetPhi -= deltaY * 0.008;
          this.targetPhi = Math.max(0.08, Math.min(Math.PI - 0.08, this.targetPhi));
          this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          const dist = Math.hypot(dx, dy);
          const pinchDelta = (this.touchDistance - dist) * 0.015;
          this.targetRadius = Math.max(this.minRadius, Math.min(this.maxRadius, this.targetRadius + pinchDelta));
          this.touchDistance = dist;
        }
      }, { passive: true });

      el.addEventListener('touchend', () => {
        this.isDragging = false;
      });

      el.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    update() {
      if (this.autoRotate && !this.isDragging) {
        this.targetTheta += this.autoRotateSpeed;
      }

      // Smooth inertia damping
      const damp = 0.12;
      this.theta += (this.targetTheta - this.theta) * damp;
      this.phi += (this.targetPhi - this.phi) * damp;
      this.radius += (this.targetRadius - this.radius) * damp;
      this.target.lerp(this.targetCenter, damp);

      const x = this.target.x + this.radius * Math.sin(this.phi) * Math.sin(this.theta);
      const y = this.target.y + this.radius * Math.cos(this.phi);
      const z = this.target.z + this.radius * Math.sin(this.phi) * Math.cos(this.theta);

      this.camera.position.set(x, y, z);
      this.camera.lookAt(this.target);

      if (this.onUpdate) this.onUpdate();
    }

    reset(theta = 0.45, phi = 1.25, radius = 6.8, target = new THREE.Vector3(0, 0, 0)) {
      this.targetTheta = theta;
      this.targetPhi = phi;
      this.targetRadius = radius;
      this.targetCenter.copy(target);
    }
  }

  /**
   * 4. MASTER 3D VIEWER CONTAINER WITH STUDIO LIGHTING & SHADOWS
   * Mounts a Three.js WebGL viewport with:
   * - 3-Point Studio Medical Lighting (Key, Fill, Rim, Ground Bounce)
   * - Soft contact shadow floor
   * - Floating controls: 3D/2D switch, autorotate, reset, lighting presets
   * - 3D Projected Landmark Pins (1, 2, 3...)
   */
  function createViewer(containerId, options = {}) {
    const parent = document.getElementById(containerId);
    if (!parent) return null;

    if (viewers[containerId]) {
      return viewers[containerId];
    }

    initMaterials();

    parent.classList.add('relative', 'overflow-hidden');
    parent.style.minHeight = options.height || '390px';

    const canvas = document.createElement('canvas');
    canvas.className = 'w-full h-full block rounded-2xl cursor-grab transition-all select-none';
    canvas.style.minHeight = options.height || '390px';
    canvas.style.background = 'radial-gradient(circle at 50% 35%, #172554 0%, #0b1329 100%)';

    // Top Floating Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20';
    toolbar.innerHTML = `
      <!-- View Mode Switcher -->
      <div class="pointer-events-auto flex items-center space-x-1.5 bg-slate-900/85 backdrop-blur-md p-1 rounded-xl border border-cyan-500/30 shadow-lg">
        <button data-act="view-3d" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 transition-all flex items-center space-x-1 shadow-sm">
          <i class="fa-solid fa-cube text-[11px]"></i>
          <span>3D Namuna (PBR)</span>
        </button>
        <button data-act="view-2d" class="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center space-x-1">
          <i class="fa-solid fa-file-image text-[11px]"></i>
          <span>2D Sxema</span>
        </button>
      </div>

      <!-- 3D Controls -->
      <div class="pointer-events-auto flex items-center space-x-1.5 bg-slate-900/85 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 shadow-lg text-xs text-slate-300">
        <button data-act="autorotate" class="p-1.5 px-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors" title="Avtomatik aylantirish">
          <i class="fa-solid fa-arrows-spin"></i>
        </button>
        <button data-act="reset" class="p-1.5 px-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors" title="Kamerani qaytarish">
          <i class="fa-solid fa-arrow-rotate-left"></i>
        </button>
        <button data-act="light" class="p-1.5 px-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors" title="Yoritish rejimi (Studiya / Klinik / Kiber)">
          <i class="fa-solid fa-lightbulb"></i>
        </button>
      </div>
    `;

    // Bottom Interaction Hint
    const bottomHint = document.createElement('div');
    bottomHint.className = 'absolute bottom-2.5 left-3 text-[10px] font-mono text-cyan-400/80 bg-slate-950/75 px-2.5 py-1 rounded-md border border-cyan-500/20 pointer-events-none z-10 flex items-center space-x-2';
    bottomHint.innerHTML = `<i class="fa-solid fa-hand-pointer text-[9px] animate-pulse"></i><span>Sichqoncha yoki barmoq bilan 3D fazoda aylantiring, yaqinlashtiring</span>`;

    // 2D Scheme container overlay (hidden by default)
    const scheme2dContainer = document.createElement('div');
    scheme2dContainer.className = 'absolute inset-0 z-10 flex items-center justify-center p-3 hidden bg-slate-950/90 backdrop-blur-sm overflow-auto';
    scheme2dContainer.id = `${containerId}-2d-overlay`;

    // Hotspot HTML pins overlay
    const pinsContainer = document.createElement('div');
    pinsContainer.className = 'absolute inset-0 pointer-events-none overflow-hidden z-10';

    parent.innerHTML = '';
    parent.appendChild(canvas);
    parent.appendChild(toolbar);
    parent.appendChild(bottomHint);
    parent.appendChild(pinsContainer);
    parent.appendChild(scheme2dContainer);

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b1329, 0.016);

    const camera = new THREE.PerspectiveCamera(
      40,
      (parent.clientWidth || 400) / (parent.clientHeight || 390),
      0.1,
      100
    );
    camera.position.set(options.camX || 2.8, options.camY || 1.8, options.camZ || 6.8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(parent.clientWidth || 400, parent.clientHeight || 390);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- 3-Point Studio Medical Lighting Rig ---
    // 1. Warm Key Light (Main anatomical modeling light casting soft shadows)
    const keyLight = new THREE.DirectionalLight(0xfff6eb, 1.45);
    keyLight.position.set(5.5, 7.5, 6.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.radius = 2.4;
    scene.add(keyLight);

    // 2. Cool Fill Light (Illuminating deep fossae and condyle undercuts)
    const fillLight = new THREE.DirectionalLight(0x85c1e9, 0.65);
    fillLight.position.set(-6.0, -1.0, -3.5);
    scene.add(fillLight);

    // 3. Sharp Rim / Back Light (Contouring crests and bony ridges)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.95);
    rimLight.position.set(0, 6.5, -6.5);
    scene.add(rimLight);

    // 4. Subtle Ground Bounce Light (Organic floor reflection)
    const bounceLight = new THREE.DirectionalLight(0xd4ac0d, 0.28);
    bounceLight.position.set(0, -5, 2);
    scene.add(bounceLight);

    // 5. Medical Studio Ambient Light
    const ambientLight = new THREE.AmbientLight(0x1e293b, 0.85);
    scene.add(ambientLight);

    // Soft Contact Shadow Plane beneath the specimen
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    shadowGeo.rotateX(-Math.PI / 2);
    const canvasShadow = document.createElement('canvas');
    canvasShadow.width = 256;
    canvasShadow.height = 256;
    const ctxSh = canvasShadow.getContext('2d');
    const shGrad = ctxSh.createRadialGradient(128, 128, 20, 128, 128, 120);
    shGrad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
    shGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
    shGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctxSh.fillStyle = shGrad;
    ctxSh.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(canvasShadow);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.75,
      depthWrite: false
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.position.y = -3.2;
    scene.add(shadowPlane);

    // Root Group for all bone meshes
    const boneRoot = new THREE.Group();
    scene.add(boneRoot);

    // Orbit Controls
    const controls = new OrbitControlsLite(camera, canvas, () => {
      updateHotspotPins();
    });
    if (options.initTheta !== undefined) controls.targetTheta = options.initTheta;
    if (options.initPhi !== undefined) controls.targetPhi = options.initPhi;
    if (options.initRadius !== undefined) controls.targetRadius = options.initRadius;

    // Raycaster for 3D clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Hotspot Pins collection: [{ id, pos, label, onClick, mesh }]
    const hotspots = [];

    function addHotspot(id, pos, label, titleUz, titleLat, onClick, mesh) {
      const finalTitleUz = typeof titleUz === 'string' ? titleUz : '';
      const finalTitleLat = typeof titleLat === 'string' ? titleLat : '';
      const finalOnClick = typeof titleUz === 'function' ? titleUz : (typeof onClick === 'function' ? onClick : null);
      const finalMesh = mesh || (typeof titleLat === 'object' && titleLat && titleLat.isMesh ? titleLat : null);

      hotspots.push({ id, pos: pos.clone(), label, onClick: finalOnClick, mesh: finalMesh });

      const pinEl = document.createElement('div');
      pinEl.id = `pin-3d-${containerId}-${id}`;
      pinEl.className = 'pin-3d-wrapper group';
      pinEl.innerHTML = `
        <div class="pin-badge">
          <span>${label}</span>
        </div>
        ${(finalTitleUz || finalTitleLat) ? `
          <div class="pin-tooltip">
            <div class="pin-title-uz">${finalTitleUz}</div>
            <div class="pin-title-lat">${finalTitleLat}</div>
          </div>
        ` : ''}
      `;

      pinEl.addEventListener('mouseenter', () => {
        if (finalMesh && finalMesh.material) {
          finalMesh.userData._origEmissive = finalMesh.material.emissive ? finalMesh.material.emissive.getHex() : 0;
          if (finalMesh.material.emissive) {
            finalMesh.material.emissive.setHex(0x0284c7);
            finalMesh.material.emissiveIntensity = 0.5;
          }
        }
      });
      pinEl.addEventListener('mouseleave', () => {
        if (finalMesh && finalMesh.material && finalMesh.material.emissive) {
          finalMesh.material.emissive.setHex(finalMesh.userData._origEmissive || 0);
          finalMesh.material.emissiveIntensity = 0.2;
        }
      });

      pinEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.App && App.playUiSound) App.playUiSound('click');
        if (finalOnClick) finalOnClick();
      });
      pinsContainer.appendChild(pinEl);
    }

    function updateHotspotPins() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      hotspots.forEach(hp => {
        const pinEl = document.getElementById(`pin-3d-${containerId}-${hp.id}`);
        if (!pinEl) return;

        const worldPos = hp.pos.clone().applyMatrix4(boneRoot.matrixWorld);
        const screenPos = worldPos.project(camera);

        if (screenPos.z > 1) {
          pinEl.style.display = 'none';
          return;
        }

        const x = (screenPos.x * 0.5 + 0.5) * width;
        const y = (-screenPos.y * 0.5 + 0.5) * height;

        pinEl.style.display = 'block';
        pinEl.style.left = `${x}px`;
        pinEl.style.top = `${y}px`;
      });
    }

    // Raycast on Bone click
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(boneRoot.children, true);

      if (intersects.length > 0) {
        let hit = intersects[0].object;
        while (hit && !hit.userData.onBoneClick && hit.parent !== boneRoot) {
          hit = hit.parent;
        }
        if (hit && hit.userData.onBoneClick) {
          hit.userData.onBoneClick(hit);
        }
      }
    });

    // Toolbar Listeners
    toolbar.querySelector('[data-act="view-3d"]').addEventListener('click', (e) => {
      scheme2dContainer.classList.add('hidden');
      canvas.classList.remove('hidden');
      pinsContainer.classList.remove('hidden');
      bottomHint.classList.remove('hidden');
      e.currentTarget.classList.add('bg-cyan-500', 'text-slate-950');
      e.currentTarget.classList.remove('text-slate-400');
      toolbar.querySelector('[data-act="view-2d"]').classList.remove('bg-cyan-500', 'text-slate-950');
      toolbar.querySelector('[data-act="view-2d"]').classList.add('text-slate-400');
    });

    toolbar.querySelector('[data-act="view-2d"]').addEventListener('click', (e) => {
      scheme2dContainer.classList.remove('hidden');
      pinsContainer.classList.add('hidden');
      bottomHint.classList.add('hidden');
      e.currentTarget.classList.add('bg-cyan-500', 'text-slate-950');
      e.currentTarget.classList.remove('text-slate-400');
      toolbar.querySelector('[data-act="view-3d"]').classList.remove('bg-cyan-500', 'text-slate-950');
      toolbar.querySelector('[data-act="view-3d"]').classList.add('text-slate-400');
    });

    toolbar.querySelector('[data-act="autorotate"]').addEventListener('click', (e) => {
      controls.autoRotate = !controls.autoRotate;
      e.currentTarget.classList.toggle('text-cyan-400', controls.autoRotate);
    });

    toolbar.querySelector('[data-act="reset"]').addEventListener('click', () => {
      controls.reset(options.initTheta || 0.45, options.initPhi || 1.25, options.initRadius || 6.8);
    });

    let lightPreset = 0;
    toolbar.querySelector('[data-act="light"]').addEventListener('click', () => {
      lightPreset = (lightPreset + 1) % 3;
      if (lightPreset === 0) {
        // Studio Medical
        keyLight.color.setHex(0xfff6eb);
        keyLight.intensity = 1.45;
        fillLight.color.setHex(0x85c1e9);
        fillLight.intensity = 0.65;
        rimLight.intensity = 0.95;
      } else if (lightPreset === 1) {
        // Museum Aged Specimen
        keyLight.color.setHex(0xfef08a);
        keyLight.intensity = 1.6;
        fillLight.color.setHex(0xf97316);
        fillLight.intensity = 0.5;
        rimLight.intensity = 0.7;
      } else {
        // Cyber Edge
        keyLight.color.setHex(0x38bdf8);
        keyLight.intensity = 1.7;
        fillLight.color.setHex(0xa855f7);
        fillLight.intensity = 0.8;
        rimLight.intensity = 1.2;
      }
    });

    // ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      const w = parent.clientWidth;
      const h = parent.clientHeight || 390;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        updateHotspotPins();
      }
    });
    resizeObserver.observe(parent);

    // Animation Loop
    let isRunning = true;
    function animate() {
      if (!isRunning) return;
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    const instance = {
      containerId,
      canvas,
      scene,
      camera,
      renderer,
      controls,
      boneRoot,
      scheme2dContainer,
      materials,
      ambientLight,
      keyLight,
      fillLight,
      rimLight,
      addHotspot,
      updateHotspotPins,
      shadowPlane,
      destroy: () => {
        isRunning = false;
        resizeObserver.disconnect();
        renderer.dispose();
        delete viewers[containerId];
      }
    };

    applyThemeToViewer(instance, currentTheme);
    viewers[containerId] = instance;
    return instance;
  }

  /**
   * 4b. 3-WAY THEME CONTROLLER FOR 3D VIEWPORTS
   * Dynamically switches canvas backdrop, fog color/density, and lighting balance
   * between Day (high contrast light), Night (comfortable slate blue), and Clinical (classic atlas paper).
   */
  function applyThemeToViewer(viewer, theme) {
    if (!viewer || !viewer.canvas || !viewer.scene) return;

    if (theme === 'day') {
      // 1. Day Mode: Clean light background with dark text and high-contrast bone visualization
      viewer.canvas.style.background = 'radial-gradient(circle at 50% 35%, #ffffff 0%, #e2e8f0 100%)';
      if (viewer.scene.fog) {
        viewer.scene.fog.color.setHex(0xe2e8f0);
        viewer.scene.fog.density = 0.012;
      }
      if (viewer.ambientLight) {
        viewer.ambientLight.color.setHex(0x64748b);
        viewer.ambientLight.intensity = 1.15;
      }
      if (viewer.shadowPlane && viewer.shadowPlane.material) {
        viewer.shadowPlane.material.opacity = 0.35;
      }
      if (viewer.scheme2dContainer) {
        viewer.scheme2dContainer.style.backgroundColor = 'rgba(248, 250, 252, 0.95)';
      }
    } else if (theme === 'clinical') {
      // 2. Clinical / Classic Mode: Traditional medical paper/atlas style (soft off-white/cream with deep medical accents)
      viewer.canvas.style.background = 'radial-gradient(circle at 50% 35%, #fbf8f2 0%, #ebe2d3 100%)';
      if (viewer.scene.fog) {
        viewer.scene.fog.color.setHex(0xebe2d3);
        viewer.scene.fog.density = 0.012;
      }
      if (viewer.ambientLight) {
        viewer.ambientLight.color.setHex(0x948b78);
        viewer.ambientLight.intensity = 1.05;
      }
      if (viewer.shadowPlane && viewer.shadowPlane.material) {
        viewer.shadowPlane.material.opacity = 0.42;
      }
      if (viewer.scheme2dContainer) {
        viewer.scheme2dContainer.style.backgroundColor = 'rgba(250, 246, 238, 0.96)';
      }
    } else {
      // 3. Night Mode: Comfortable dark blue/slate background optimized for low light (NO pitch-black!)
      viewer.canvas.style.background = 'radial-gradient(circle at 50% 35%, #172554 0%, #0b1329 100%)';
      if (viewer.scene.fog) {
        viewer.scene.fog.color.setHex(0x0b1329);
        viewer.scene.fog.density = 0.016;
      }
      if (viewer.ambientLight) {
        viewer.ambientLight.color.setHex(0x1e293b);
        viewer.ambientLight.intensity = 0.85;
      }
      if (viewer.shadowPlane && viewer.shadowPlane.material) {
        viewer.shadowPlane.material.opacity = 0.65;
      }
      if (viewer.scheme2dContainer) {
        viewer.scheme2dContainer.style.backgroundColor = 'rgba(11, 19, 41, 0.92)';
      }
    }
  }

  function setTheme(theme) {
    if (!['day', 'night', 'clinical'].includes(theme)) theme = 'night';
    currentTheme = theme;
    Object.values(viewers).forEach(v => applyThemeToViewer(v, theme));
  }

  // ==========================================================================
  // 5. HYPER-REALISTIC ANATOMICAL 3D BONE SPECIMEN GEOMETRIES
  // ==========================================================================

  /**
   * MODULE 1: TIBIA (Katta boldir suyagi) LONGITUDINAL SECTION & LAYERS (Figs 3, 4)
   * High-fidelity 3D model featuring:
   * - Triangular diaphysis with sharp margo anterior crest
   * - Proximal condyles with intercondylar eminence & tuberositas tibiae
   * - Distal medial malleolus
   * - Longitudinal cutaway exposing thick cortical bone wall, trabecular spongy bone,
   *   and central golden fatty bone marrow canal
   * - Animated peelable periosteum layer with dual fibrous/osteogenic strata
   */
  function buildTibia3D(viewer, onLayerSelect) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const tibiaGroup = new THREE.Group();
    root.add(tibiaGroup);

    // 1. Proximal Epiphysis (Condylus medialis et lateralis)
    const proxGroup = new THREE.Group();
    proxGroup.position.set(0, 2.6, 0);

    const proxGeo = new THREE.CylinderGeometry(0.95, 0.6, 1.25, 32, 4);
    proxGeo.scale(1.4, 1.0, 1.15);
    const proxMesh = new THREE.Mesh(proxGeo, mats.boneCortical);
    proxMesh.castShadow = true;
    proxMesh.receiveShadow = true;
    proxGroup.add(proxMesh);

    // Eminentia intercondylaris (Medial and Lateral intercondylar tubercles)
    const tubMed = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.38, 16), mats.boneRidge);
    tubMed.position.set(-0.25, 0.75, 0);
    proxGroup.add(tubMed);

    const tubLat = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.35, 16), mats.boneRidge);
    tubLat.position.set(0.25, 0.74, 0);
    proxGroup.add(tubLat);

    // Tuberositas tibiae (Rough anterior tuberosity for patellar ligament)
    const tuberGeo = new THREE.BoxGeometry(0.45, 0.65, 0.35);
    const tuberMesh = new THREE.Mesh(tuberGeo, mats.boneRidge);
    tuberMesh.position.set(0, -0.45, 0.72);
    tuberMesh.rotation.x = 0.2;
    proxGroup.add(tuberMesh);

    // Facies articularis superior (Smooth hyaline cartilage on both condyles)
    const cartL = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.48, 0.08, 20), mats.cartilage);
    cartL.position.set(-0.65, 0.66, 0.02);
    proxGroup.add(cartL);

    const cartR = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.46, 0.08, 20), mats.cartilage);
    cartR.position.set(0.65, 0.66, 0.02);
    proxGroup.add(cartR);

    // Spongy bone filling proximal epiphysis
    const spongProxMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.48, 1.05, 20), mats.boneSpongy);
    spongProxMesh.position.set(0, -0.05, 0.12);
    proxGroup.add(spongProxMesh);

    tibiaGroup.add(proxGroup);

    // 2. Diaphysis (Triangular Shaft with anterior crest / margo anterior)
    const shaftGeo = new THREE.CylinderGeometry(0.42, 0.46, 4.4, 3, 24);
    shaftGeo.rotateY(Math.PI / 6);
    const shaftMesh = new THREE.Mesh(shaftGeo, mats.boneCortical);
    shaftMesh.position.set(0, 0.0, 0);
    shaftMesh.castShadow = true;
    shaftMesh.receiveShadow = true;
    tibiaGroup.add(shaftMesh);

    // Sharp anterior crest ridge (Margo anterior)
    const crestGeo = new THREE.BoxGeometry(0.08, 4.2, 0.15);
    const crestMesh = new THREE.Mesh(crestGeo, mats.boneRidge);
    crestMesh.position.set(0, 0.0, 0.48);
    tibiaGroup.add(crestMesh);

    // Nutrient Foramen (Foramen nutricium - distinct oblique vascular canal)
    const foramenMesh = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial({ color: 0x7f1d1d }));
    foramenMesh.position.set(0.25, 0.4, -0.22);
    tibiaGroup.add(foramenMesh);

    // 3. Central Medullary Cavity & Yellow Bone Marrow (Cavitas medullaris / Medulla flava)
    const marrowGeo = new THREE.CylinderGeometry(0.2, 0.22, 4.0, 20);
    const marrowMesh = new THREE.Mesh(marrowGeo, mats.marrowYellow);
    marrowMesh.position.set(0, 0.0, 0.06);
    tibiaGroup.add(marrowMesh);

    // 4. Distal Epiphysis & Medial Malleolus (Malleolus medialis)
    const distGroup = new THREE.Group();
    distGroup.position.set(0, -2.4, 0);

    const distGeo = new THREE.CylinderGeometry(0.5, 0.8, 1.15, 24);
    distGeo.scale(1.2, 1.0, 1.05);
    const distMesh = new THREE.Mesh(distGeo, mats.boneCortical);
    distMesh.castShadow = true;
    distMesh.receiveShadow = true;
    distGroup.add(distMesh);

    // Medial malleolus hook projecting downwards
    const malleoGeo = new THREE.ConeGeometry(0.26, 0.65, 16);
    malleoGeo.rotateZ(Math.PI);
    const malleoMesh = new THREE.Mesh(malleoGeo, mats.boneCortical);
    malleoMesh.position.set(-0.62, -0.65, 0);
    distGroup.add(malleoMesh);

    // Distal articular facet for talus (Facies articularis inferior)
    const talusFacet = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.06, 20), mats.cartilage);
    talusFacet.position.set(0, -0.6, 0);
    distGroup.add(talusFacet);

    // Spongy bone filling distal epiphysis
    const spongDistMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.6, 0.85, 16), mats.boneSpongy);
    spongDistMesh.position.set(0, 0, 0.08);
    distGroup.add(spongDistMesh);

    tibiaGroup.add(distGroup);

    // 5. Peelable Periosteum Sheath (Periost / Suyak usti pardasi)
    const periGeo = new THREE.CylinderGeometry(0.48, 0.52, 3.8, 24, 1, true, 0, Math.PI * 1.5);
    const periMesh = new THREE.Mesh(periGeo, mats.periosteum);
    periMesh.position.set(0, 0, 0);
    tibiaGroup.add(periMesh);

    // Hotspot Pins matching Fig. 3 & Fig. 4 from N.K. Ahmedov Atlas
    viewer.addHotspot('epiphysis', new THREE.Vector3(1.2, 2.9, 0), '1', '1. Epifiz (Bo\'g\'im boshi)', 'Epiphysis proximalis', () => onLayerSelect('epiphysis'), proxMesh);
    viewer.addHotspot('spongiosa', new THREE.Vector3(0, 2.7, 0.45), '2', '2. G\'ovak modda', 'Substantia spongiosa', () => onLayerSelect('spongiosa'), spongProxMesh);
    viewer.addHotspot('compacta', new THREE.Vector3(0.55, 0.6, 0.25), '3', '3. Zich modda devori', 'Substantia compacta', () => onLayerSelect('compacta'), shaftMesh);
    viewer.addHotspot('medulla', new THREE.Vector3(0, 0.1, 0.35), '4', '4. Ilik bo\'shlig\'i (Sariq ilik)', 'Cavitas medullaris', () => onLayerSelect('cavitas_medullaris'), marrowMesh);
    viewer.addHotspot('metaphysis', new THREE.Vector3(0.8, 1.8, 0), '5', '5. Metafiz zonasi', 'Metaphysis', () => onLayerSelect('metaphysis'));
    viewer.addHotspot('epiphysis_dist', new THREE.Vector3(-0.7, -2.8, 0.2), '6', '6. Distal epifiz va to\'piq', 'Malleolus medialis', () => onLayerSelect('epiphysis'), malleoMesh);
    viewer.addHotspot('periost_fib', new THREE.Vector3(-0.75, 0.4, 0.2), '7', '7. Fibroz qavat (Tashqi)', 'Stratum fibrosum periostei', () => onLayerSelect('periosteum_fibrous'), periMesh);
    viewer.addHotspot('periost_ost', new THREE.Vector3(-0.75, -0.6, 0.2), '8', '8. Osteogen qavat (Ichki)', 'Stratum osteogenicum', () => onLayerSelect('periosteum_osteogenic'), periMesh);
    viewer.addHotspot('foramen_nut', new THREE.Vector3(0.3, 0.4, -0.25), '9', '9. Oziq teshigi', 'Foramen nutricium', () => onLayerSelect('foramen_nutricium'), foramenMesh);

    // Explode Controller
    let isExploded = false;
    function setExploded(exploded) {
      isExploded = exploded;
      const targetPeriX = exploded ? -1.8 : 0;
      const targetPeriRot = exploded ? -0.45 : 0;
      const targetMarrowZ = exploded ? 1.5 : 0.06;
      const targetSpongX = exploded ? 1.6 : 0;

      if (window.gsap) {
        gsap.to(periMesh.position, { x: targetPeriX, duration: 0.75, ease: 'power2.out' });
        gsap.to(periMesh.rotation, { y: targetPeriRot, duration: 0.75 });
        gsap.to(marrowMesh.position, { z: targetMarrowZ, duration: 0.75, ease: 'power2.out' });
        gsap.to(spongProxMesh.position, { x: targetSpongX, duration: 0.75, ease: 'power2.out' });
      } else {
        periMesh.position.x = targetPeriX;
        periMesh.rotation.y = targetPeriRot;
        marrowMesh.position.z = targetMarrowZ;
        spongProxMesh.position.x = targetSpongX;
      }
      viewer.updateHotspotPins();
    }

    return {
      tibiaGroup,
      setExploded,
      toggleExplode: () => setExploded(!isExploded)
    };
  }

  /**
   * MODULE 2: VERTEBRA (Umurtqa) CONSTRUCTOR & SPINAL CANAL (Figs 5, 6)
   * Detailed vertebra with waisting body, pedicles, laminae, transverse and
   * bifid spinous processes, and spinal canal cylinder. Explodes on command.
   */
  function buildVertebra3D(viewer, onPartSelect) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const vGroup = new THREE.Group();
    root.add(vGroup);

    // 1. Corpus Vertebrae (Anterior body with concave waisting & porous endplates)
    const corpusGroup = new THREE.Group();
    const bodyGeo = new THREE.CylinderGeometry(1.45, 1.4, 1.2, 32);
    bodyGeo.scale(1.25, 1.0, 0.95);
    const bodyMesh = new THREE.Mesh(bodyGeo, mats.boneCortical);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    corpusGroup.add(bodyMesh);

    // Epiphysis anularis (Porous plateau rim)
    const rimTop = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.12, 12, 28), mats.boneSpongy);
    rimTop.rotateX(Math.PI / 2);
    rimTop.position.y = 0.6;
    corpusGroup.add(rimTop);

    const rimBot = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.12, 12, 28), mats.boneSpongy);
    rimBot.rotateX(Math.PI / 2);
    rimBot.position.y = -0.6;
    corpusGroup.add(rimBot);

    // Anterior vascular nutrient pits
    const vPit = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0x581c87 }));
    vPit.position.set(0, 0.1, -1.25);
    corpusGroup.add(vPit);

    corpusGroup.position.set(0, 0, -1.15);
    corpusGroup.userData.onBoneClick = () => onPartSelect('corpus');
    vGroup.add(corpusGroup);

    // 2. Foramen Vertebrale (Spinal Canal Cylinder with soft medical glow)
    const foramenGroup = new THREE.Group();
    const canalGeo = new THREE.CylinderGeometry(0.75, 0.75, 1.7, 24);
    const canalMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const canalMesh = new THREE.Mesh(canalGeo, canalMat);
    canalMesh.position.set(0, 0, 0.22);
    foramenGroup.add(canalMesh);
    foramenGroup.userData.onBoneClick = () => onPartSelect('foramen');
    vGroup.add(foramenGroup);

    // 3. Arcus Vertebrae & Pedicles (Posterior Arch)
    const arcusGroup = new THREE.Group();
    // Left Pedicle
    const pedLGeo = new THREE.BoxGeometry(0.48, 0.88, 1.15);
    const pedLMesh = new THREE.Mesh(pedLGeo, mats.boneCortical);
    pedLMesh.position.set(-1.0, 0, -0.1);
    pedLMesh.rotation.y = -0.28;
    pedLMesh.castShadow = true;
    arcusGroup.add(pedLMesh);

    // Right Pedicle
    const pedRGeo = new THREE.BoxGeometry(0.48, 0.88, 1.15);
    const pedRMesh = new THREE.Mesh(pedRGeo, mats.boneCortical);
    pedRMesh.position.set(1.0, 0, -0.1);
    pedRMesh.rotation.y = 0.28;
    pedRMesh.castShadow = true;
    arcusGroup.add(pedRMesh);

    // Laminae arcus vertebrae
    const lamLGeo = new THREE.BoxGeometry(0.4, 0.88, 1.05);
    const lamLMesh = new THREE.Mesh(lamLGeo, mats.boneCortical);
    lamLMesh.position.set(-0.58, 0, 0.85);
    lamLMesh.rotation.y = 0.65;
    arcusGroup.add(lamLMesh);

    const lamRGeo = new THREE.BoxGeometry(0.4, 0.88, 1.05);
    const lamRMesh = new THREE.Mesh(lamRGeo, mats.boneCortical);
    lamRMesh.position.set(0.58, 0, 0.85);
    lamRMesh.rotation.y = -0.65;
    arcusGroup.add(lamRMesh);

    arcusGroup.userData.onBoneClick = () => onPartSelect('arcus');
    vGroup.add(arcusGroup);

    // 4. Processus Transversus (Lateral wings with costal facets)
    const transLGroup = new THREE.Group();
    const transLGeo = new THREE.ConeGeometry(0.38, 1.7, 16);
    transLGeo.rotateZ(Math.PI / 2);
    const transLMesh = new THREE.Mesh(transLGeo, mats.boneRidge);
    transLMesh.position.set(-1.9, 0.1, 0.35);
    transLMesh.rotation.y = 0.24;
    transLMesh.castShadow = true;
    transLGroup.add(transLMesh);
    transLGroup.userData.onBoneClick = () => onPartSelect('transversus');
    vGroup.add(transLGroup);

    const transRGroup = new THREE.Group();
    const transRGeo = new THREE.ConeGeometry(0.38, 1.7, 16);
    transRGeo.rotateZ(-Math.PI / 2);
    const transRMesh = new THREE.Mesh(transRGeo, mats.boneRidge);
    transRMesh.position.set(1.9, 0.1, 0.35);
    transRMesh.rotation.y = -0.24;
    transRMesh.castShadow = true;
    transRGroup.add(transRMesh);
    transRGroup.userData.onBoneClick = () => onPartSelect('transversus');
    vGroup.add(transRGroup);

    // 5. Processus Articulares (Superior and Inferior Articular Facets with Cartilage)
    const artGroup = new THREE.Group();
    const facetGeo = new THREE.CylinderGeometry(0.34, 0.32, 0.38, 16);

    const fSupL = new THREE.Mesh(facetGeo, mats.cartilage);
    fSupL.position.set(-0.88, 0.65, 0.42);
    artGroup.add(fSupL);

    const fSupR = new THREE.Mesh(facetGeo, mats.cartilage);
    fSupR.position.set(0.88, 0.65, 0.42);
    artGroup.add(fSupR);

    artGroup.userData.onBoneClick = () => onPartSelect('articularis');
    vGroup.add(artGroup);

    // 6. Processus Spinosus (Posterior sloping spine with bifid tip)
    const spineGroup = new THREE.Group();
    const spineGeo = new THREE.BoxGeometry(0.42, 0.65, 2.3);
    const spineMesh = new THREE.Mesh(spineGeo, mats.boneCortical);
    spineMesh.position.set(0, -0.28, 2.2);
    spineMesh.rotation.x = -0.38;
    spineMesh.castShadow = true;
    spineGroup.add(spineMesh);

    // Bifid tip tubercles
    const tipL = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), mats.boneRidge);
    tipL.position.set(-0.16, -0.7, 3.25);
    spineGroup.add(tipL);

    const tipR = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), mats.boneRidge);
    tipR.position.set(0.16, -0.7, 3.25);
    spineGroup.add(tipR);

    spineGroup.userData.onBoneClick = () => onPartSelect('spinosus');
    vGroup.add(spineGroup);

    // Hotspot Pins matching Fig. 5 & Fig. 6 from N.K. Ahmedov Atlas
    viewer.addHotspot('corpus', new THREE.Vector3(0, 0.5, -1.15), '1', '1. Umurtqa tanasi', 'Corpus vertebrae', () => onPartSelect('corpus'), bodyMesh);
    viewer.addHotspot('foramen', new THREE.Vector3(0, 0.65, 0.22), '2', '2. Umurtqa teshigi', 'Foramen vertebrale', () => onPartSelect('foramen'), canalMesh);
    viewer.addHotspot('arcus', new THREE.Vector3(-0.95, 0.45, 0.45), '3', '3. Umurtqa ravog\'i', 'Arcus vertebrae', () => onPartSelect('arcus'), pedLMesh);
    viewer.addHotspot('spinosus', new THREE.Vector3(0, 0.15, 2.5), '4', '4. Qirrali o\'siq', 'Processus spinosus', () => onPartSelect('spinosus'), spineMesh);
    viewer.addHotspot('transversus', new THREE.Vector3(-2.3, 0.25, 0.35), '5', '5. Ko\'ndalang o\'siq', 'Processus transversus', () => onPartSelect('transversus'), transLMesh);
    viewer.addHotspot('articularis', new THREE.Vector3(-0.88, 0.9, 0.45), '6', '6. Bo\'g\'im o\'simtasi', 'Processus articularis', () => onPartSelect('articularis'), fSupL);
    viewer.addHotspot('costalis', new THREE.Vector3(-1.9, 0.3, 0.6), '7', '7. Qovurg\'a chuqurchasi', 'Fovea costalis', () => onPartSelect('transversus'), transLMesh);

    // Explode Controller
    let isExploded = false;
    function setExploded(exploded) {
      isExploded = exploded;
      const targetCorpusZ = exploded ? -2.6 : -1.15;
      const targetSpineZ = exploded ? 3.6 : 2.2;
      const targetTransLX = exploded ? -3.2 : -1.9;
      const targetTransRX = exploded ? 3.2 : 1.9;
      const targetArcusY = exploded ? 0.95 : 0;

      if (window.gsap) {
        gsap.to(corpusGroup.position, { z: targetCorpusZ, duration: 0.7, ease: 'power2.out' });
        gsap.to(spineGroup.position, { z: targetSpineZ - 2.2, duration: 0.7, ease: 'power2.out' });
        gsap.to(transLGroup.position, { x: targetTransLX + 1.9, duration: 0.7, ease: 'power2.out' });
        gsap.to(transRGroup.position, { x: targetTransRX - 1.9, duration: 0.7, ease: 'power2.out' });
        gsap.to(arcusGroup.position, { y: targetArcusY, duration: 0.7 });
      } else {
        corpusGroup.position.z = targetCorpusZ;
        spineGroup.position.z = targetSpineZ - 2.2;
        transLGroup.position.x = targetTransLX + 1.9;
        transRGroup.position.x = targetTransRX - 1.9;
        arcusGroup.position.y = targetArcusY;
      }
      viewer.updateHotspotPins();
    }

    return {
      vGroup,
      setExploded,
      toggleExplode: () => setExploded(!isExploded)
    };
  }

  /**
   * MODULE 2: ATLAS (C1) & AXIS (C2) JOINT (Figs 10–13)
   * High-precision anatomical model of Atlanto-Axial pivotal joint.
   * Atlas ring smoothly rotates around the odontoid process (Dens axis)
   * with real-time slider angle binding.
   */
  function buildAtlasAxis3D(viewer) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const jointGroup = new THREE.Group();
    root.add(jointGroup);

    // 1. Stationary Axis (C2) Base
    const axisGroup = new THREE.Group();

    // Axis body
    const axisBodyGeo = new THREE.CylinderGeometry(1.15, 1.3, 0.95, 24);
    axisBodyGeo.scale(1.25, 1.0, 1.0);
    const axisBodyMesh = new THREE.Mesh(axisBodyGeo, mats.boneCortical);
    axisBodyMesh.position.y = -0.75;
    axisBodyMesh.castShadow = true;
    axisGroup.add(axisBodyMesh);

    // Dens Axis (Odontoid process - cylindrical vertical tooth)
    const densGeo = new THREE.CylinderGeometry(0.38, 0.45, 1.65, 24);
    const densMesh = new THREE.Mesh(densGeo, mats.boneRidge);
    densMesh.position.set(0, 0.42, -0.12);
    densMesh.castShadow = true;
    axisGroup.add(densMesh);

    // Conical apex of dens
    const apexGeo = new THREE.ConeGeometry(0.38, 0.45, 20);
    const apexMesh = new THREE.Mesh(apexGeo, mats.boneCortical);
    apexMesh.position.set(0, 1.35, -0.12);
    axisGroup.add(apexMesh);

    // Facies articularis anterior on dens (articulates with fovea dentis of atlas)
    const densFacetGeo = new THREE.SphereGeometry(0.26, 16, 16);
    densFacetGeo.scale(1.0, 1.45, 0.5);
    const densFacetMesh = new THREE.Mesh(densFacetGeo, mats.cartilage);
    densFacetMesh.position.set(0, 0.52, -0.48);
    axisGroup.add(densFacetMesh);

    // Bifid spinous process of axis (massive, projecting back)
    const axisSpineGeo = new THREE.BoxGeometry(0.55, 0.75, 1.5);
    const axisSpineMesh = new THREE.Mesh(axisSpineGeo, mats.boneCortical);
    axisSpineMesh.position.set(0, -0.65, 1.35);
    axisSpineMesh.rotation.x = -0.32;
    axisSpineMesh.castShadow = true;
    axisGroup.add(axisSpineMesh);

    jointGroup.add(axisGroup);

    // 2. Rotating Atlas (C1) Ring
    const atlasGroup = new THREE.Group();
    atlasGroup.position.set(0, 0.42, -0.12);

    // Ring body (Arcus anterior & Arcus posterior)
    const ringGeo = new THREE.TorusGeometry(1.35, 0.3, 16, 36);
    ringGeo.scale(1.22, 0.72, 1.0);
    ringGeo.rotateX(Math.PI / 2);
    const ringMesh = new THREE.Mesh(ringGeo, mats.boneCortical);
    ringMesh.castShadow = true;
    ringMesh.receiveShadow = true;
    atlasGroup.add(ringMesh);

    // Fovea dentis (articular facet inside anterior arch)
    const foveaDentis = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.35, 16), mats.cartilage);
    foveaDentis.position.set(0, 0, -0.32);
    atlasGroup.add(foveaDentis);

    // Massa lateralis atlantis (Lateral masses)
    const massGeo = new THREE.CylinderGeometry(0.52, 0.48, 0.7, 20);
    massGeo.scale(1.35, 1.0, 0.9);

    const massL = new THREE.Mesh(massGeo, mats.boneCortical);
    massL.position.set(-1.38, 0.05, 0.12);
    atlasGroup.add(massL);

    const massR = new THREE.Mesh(massGeo, mats.boneCortical);
    massR.position.set(1.38, 0.05, 0.12);
    atlasGroup.add(massR);

    // Superior kidney-shaped articular facets for occipital condyles
    const facetGeo = new THREE.CylinderGeometry(0.42, 0.4, 0.14, 20);
    facetGeo.scale(1.45, 1.0, 0.82);

    const facetL = new THREE.Mesh(facetGeo, mats.cartilage);
    facetL.position.set(-1.38, 0.42, 0.12);
    atlasGroup.add(facetL);

    const facetR = new THREE.Mesh(facetGeo, mats.cartilage);
    facetR.position.set(1.38, 0.42, 0.12);
    atlasGroup.add(facetR);

    // Transverse ligament (Ligamentum transversum atlantis)
    const ligGeo = new THREE.BoxGeometry(1.7, 0.24, 0.14);
    const ligMesh = new THREE.Mesh(ligGeo, mats.ligament);
    ligMesh.position.set(0, 0, 0.38);
    atlasGroup.add(ligMesh);

    jointGroup.add(atlasGroup);

    // Real-time rotation angle setter (-75° to +75°)
    function setAngle(deg) {
      const rad = THREE.MathUtils.degToRad(deg);
      if (window.gsap) {
        gsap.to(atlasGroup.rotation, { y: rad, duration: 0.18, ease: 'none' });
      } else {
        atlasGroup.rotation.y = rad;
      }
      viewer.updateHotspotPins();
    }

    // Hotspot Pins matching Figs. 10–13 from N.K. Ahmedov Atlas
    viewer.addHotspot('dens', new THREE.Vector3(0, 1.25, -0.15), '1', '1. Tishsimon o\'siq', 'Dens axis', null, densMesh);
    viewer.addHotspot('facies_ant', new THREE.Vector3(0, 0.55, -0.55), '2', '2. Tishning oldingi bo\'g\'im yuzasi', 'Facies articularis anterior dentis', null, densFacetMesh);
    viewer.addHotspot('arc_ant', new THREE.Vector3(0, 0.45, -1.45), '3', '3. Atlant oldingi ravog\'i', 'Arcus anterior atlantis & Fovea dentis', null, ringMesh);
    viewer.addHotspot('massa_lat', new THREE.Vector3(-1.45, 0.75, 0.15), '4', '4. Yon massalar & Bo\'g\'im chuqurchasi', 'Massa lateralis atlantis', null, massL);
    viewer.addHotspot('arc_post', new THREE.Vector3(0, 0.45, 1.25), '5', '5. Atlant orqa ravog\'i', 'Arcus posterior atlantis', null, ringMesh);
    viewer.addHotspot('ligament', new THREE.Vector3(0, 0.45, 0.45), '6', '6. Ko\'ndalang boylam', 'Ligamentum transversum atlantis', null, ligMesh);
    viewer.addHotspot('spine_axis', new THREE.Vector3(0, -0.75, 1.45), '7', '7. Aksisning ayri o\'sig\'i', 'Processus spinosus axis (bifid)', null, axisSpineMesh);

    return {
      jointGroup,
      setAngle
    };
  }

  /**
   * MODULE 3: HUMERUS, ULNA & RADIUS (Figs 28–35)
   * Features anatomical distal humerus (trochlea, capitulum, olecranon fossa),
   * stationary ulna, and rotating radius that diagonally crosses over in 3D
   * when toggling Pronation / Supination.
   */
  function buildForearm3D(viewer) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const armGroup = new THREE.Group();
    root.add(armGroup);

    // 1. Distal Humerus with Trochlea & Capitulum
    const humerusGeo = new THREE.CylinderGeometry(0.48, 0.85, 2.5, 24);
    humerusGeo.scale(1.35, 1.0, 0.92);
    const humerusMesh = new THREE.Mesh(humerusGeo, mats.boneCortical);
    humerusMesh.position.set(0, 2.55, 0);
    humerusMesh.castShadow = true;
    humerusMesh.receiveShadow = true;
    armGroup.add(humerusMesh);

    // Trochlea humeri (Spool-shaped medial pulley)
    const trochGeo = new THREE.TorusGeometry(0.38, 0.22, 16, 24);
    trochGeo.rotateZ(Math.PI / 2);
    const trochMesh = new THREE.Mesh(trochGeo, mats.cartilage);
    trochMesh.position.set(0.48, 1.38, 0);
    armGroup.add(trochMesh);

    // Capitulum humeri (Hemispherical lateral head)
    const capGeo = new THREE.SphereGeometry(0.4, 20, 20);
    const capMesh = new THREE.Mesh(capGeo, mats.cartilage);
    capMesh.position.set(-0.58, 1.38, 0.06);
    armGroup.add(capMesh);

    // Fossa olecrani (deep posterior cavity)
    const fossaOlec = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.3), new THREE.MeshBasicMaterial({ color: 0x1e293b }));
    fossaOlec.position.set(0.1, 1.55, -0.42);
    armGroup.add(fossaOlec);

    // 2. Ulna (Medial fixed bone with Olecranon beak & Trochlear notch)
    const ulnaGroup = new THREE.Group();
    ulnaGroup.position.set(0.48, 0, 0);

    // Olecranon beak
    const olecGeo = new THREE.BoxGeometry(0.6, 0.85, 0.7);
    const olecMesh = new THREE.Mesh(olecGeo, mats.boneRidge);
    olecMesh.position.set(0, 1.45, -0.12);
    olecMesh.castShadow = true;
    ulnaGroup.add(olecMesh);

    // Trochlear notch articular surface (Incisura trochlearis)
    const notchGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.5, 16, 1, false, 0, Math.PI);
    notchGeo.rotateZ(Math.PI / 2);
    const notchMesh = new THREE.Mesh(notchGeo, mats.cartilage);
    notchMesh.position.set(0, 1.35, 0.12);
    ulnaGroup.add(notchMesh);

    // Ulna shaft (Tapers distally with sharp interosseous crest)
    const ulnaShaftGeo = new THREE.CylinderGeometry(0.3, 0.19, 4.0, 20);
    const ulnaShaftMesh = new THREE.Mesh(ulnaShaftGeo, mats.boneCortical);
    ulnaShaftMesh.position.set(0, -0.85, 0);
    ulnaShaftMesh.castShadow = true;
    ulnaGroup.add(ulnaShaftMesh);

    // Distal head of ulna with styloid process
    const ulnaHeadMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), mats.boneCortical);
    ulnaHeadMesh.position.set(0, -2.85, 0);
    ulnaGroup.add(ulnaHeadMesh);

    const ulnaStyloid = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.35, 12), mats.boneRidge);
    ulnaStyloid.position.set(0.18, -3.05, 0);
    ulnaGroup.add(ulnaStyloid);

    armGroup.add(ulnaGroup);

    // 3. Radius (Lateral bone that rotates obliquely around Ulna)
    const radiusGroup = new THREE.Group();
    radiusGroup.position.set(-0.58, 0, 0);

    // Caput radii (Circular disc with concave articular cup)
    const radHeadGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 24);
    const radHeadMesh = new THREE.Mesh(radHeadGeo, mats.cartilage);
    radHeadMesh.position.set(0, 1.35, 0);
    radiusGroup.add(radHeadMesh);

    // Collum radii (Neck)
    const radNeckGeo = new THREE.CylinderGeometry(0.22, 0.24, 0.48, 20);
    const radNeckMesh = new THREE.Mesh(radNeckGeo, mats.boneCortical);
    radNeckMesh.position.set(0, 0.98, 0);
    radiusGroup.add(radNeckMesh);

    // Tuberositas radii (Biceps tendon attachment)
    const tubRad = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), mats.boneRidge);
    tubRad.position.set(0.18, 0.72, 0);
    radiusGroup.add(tubRad);

    // Radius shaft (Lateral convex curvature)
    const radShaftGeo = new THREE.CylinderGeometry(0.24, 0.38, 3.8, 20);
    const radShaftMesh = new THREE.Mesh(radShaftGeo, mats.boneCortical);
    radShaftMesh.position.set(0, -0.95, 0);
    radShaftMesh.castShadow = true;
    radiusGroup.add(radShaftMesh);

    // Distal wide base with styloid process (Processus styloideus radii)
    const radDistGeo = new THREE.BoxGeometry(0.6, 0.48, 0.44);
    const radDistMesh = new THREE.Mesh(radDistGeo, mats.boneCortical);
    radDistMesh.position.set(0, -2.85, 0);
    radiusGroup.add(radDistMesh);

    const radStyloid = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.38, 12), mats.boneRidge);
    radStyloid.position.set(-0.25, -3.1, 0);
    radiusGroup.add(radStyloid);

    armGroup.add(radiusGroup);

    // Pronation / Supination State
    let isPronated = false;
    function setPronation(pronated) {
      isPronated = pronated;
      const targetRadX = pronated ? 0.38 : 0;
      const targetRadZ = pronated ? 0.72 : 0;
      const targetRadRotZ = pronated ? -0.34 : 0;
      const targetRadRotY = pronated ? 2.6 : 0;

      if (window.gsap) {
        gsap.to(radiusGroup.position, {
          x: -0.58 + targetRadX,
          z: targetRadZ,
          duration: 0.85,
          ease: 'power2.inOut'
        });
        gsap.to(radiusGroup.rotation, {
          z: targetRadRotZ,
          y: targetRadRotY,
          duration: 0.85,
          ease: 'power2.inOut'
        });
      } else {
        radiusGroup.position.set(-0.58 + targetRadX, 0, targetRadZ);
        radiusGroup.rotation.set(0, targetRadRotY, targetRadRotZ);
      }
      viewer.updateHotspotPins();
    }

    // Hotspot Pins (Figs 28–35: Yelka va bilak suyaklari)
    viewer.addHotspot('trochlea', new THREE.Vector3(0.48, 1.38, 0.45), '1', "Yelka suyagi g'altagi va boshchasi", "Trochlea et capitulum humeri", null, trochMesh);
    viewer.addHotspot('radius_head', new THREE.Vector3(-0.58, 1.35, 0.45), '2', "Bilak suyagi boshi va bo'yni", "Caput et collum radii", null, radHeadMesh);
    viewer.addHotspot('olecranon', new THREE.Vector3(0.48, 1.8, -0.2), '3', "Tirsak o'sig'i va g'altaksimon o'yiq", "Olecranon et incisura trochlearis", null, olecMesh);
    viewer.addHotspot('tuberositas', new THREE.Vector3(-0.4, 0.72, 0.35), '4', "Bilak suyagi g'adir-budurligi", "Tuberositas radii", null, tubRad);
    viewer.addHotspot('ulna_shaft', new THREE.Vector3(0.55, -0.9, 0.35), '5', "Tirsak suyagi tanasi va qirrasi", "Corpus ulnae et crista interossea", null, ulnaShaftMesh);
    viewer.addHotspot('styloid', new THREE.Vector3(-0.6, -3.1, 0.35), '6', "Bigizsimon o'siqlar", "Processus styloideus radii et ulnae", null, radStyloid);

    return {
      armGroup,
      setPronation,
      togglePronation: () => setPronation(!isPronated)
    };
  }

  /**
   * MODULE 4: PELVIS (Chanoq suyagi) FUSION (Figs 47–48)
   * Authentic Os Coxae (Ilium, Ischium, Pubis) uniting at the deep
   * hemispherical Acetabulum with realistic Y-shaped cartilage synostosis.
   */
  function buildPelvis3D(viewer, onPartSelect) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const pelvisGroup = new THREE.Group();
    root.add(pelvisGroup);

    // 1. Os Ilium (Fan-shaped wing & Crista iliaca)
    const iliumGroup = new THREE.Group();
    const iliumGeo = new THREE.CylinderGeometry(2.2, 1.25, 1.9, 32, 2, false, 0, Math.PI * 0.95);
    iliumGeo.scale(1.22, 1.0, 0.42);
    const iliumMesh = new THREE.Mesh(iliumGeo, mats.boneCortical);
    iliumMesh.position.set(0, 1.25, -0.12);
    iliumMesh.castShadow = true;
    iliumMesh.receiveShadow = true;
    iliumGroup.add(iliumMesh);

    // Crista iliaca (Curved thick crest)
    const cristaGeo = new THREE.TorusGeometry(2.0, 0.18, 14, 28, Math.PI * 0.92);
    cristaGeo.rotateZ(0.22);
    const cristaMesh = new THREE.Mesh(cristaGeo, mats.boneRidge);
    cristaMesh.position.set(0, 2.15, -0.18);
    cristaMesh.castShadow = true;
    iliumGroup.add(cristaMesh);

    // Spina iliaca anterior superior (SIAS)
    const sias = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), mats.boneRidge);
    sias.position.set(-1.8, 1.85, 0.15);
    iliumGroup.add(sias);

    iliumGroup.userData.onBoneClick = () => onPartSelect && onPartSelect('ilium');
    pelvisGroup.add(iliumGroup);

    // 2. Os Pubis (Antero-inferior pubis rami & pecten ossis pubis)
    const pubisGroup = new THREE.Group();
    const pubGeo = new THREE.CylinderGeometry(0.32, 0.28, 1.6, 20);
    pubGeo.rotateZ(Math.PI / 3);
    const pubMesh = new THREE.Mesh(pubGeo, mats.boneCortical);
    pubMesh.position.set(-0.9, -0.95, 0.38);
    pubMesh.castShadow = true;
    pubisGroup.add(pubMesh);
    pubisGroup.userData.onBoneClick = () => onPartSelect && onPartSelect('pubis');
    pelvisGroup.add(pubisGroup);

    // 3. Os Ischii (Postero-inferior massive ramus & Tuber ischiadicum)
    const ischiumGroup = new THREE.Group();
    const ischGeo = new THREE.CylinderGeometry(0.38, 0.48, 1.7, 20);
    ischGeo.rotateZ(-Math.PI / 3.8);
    const ischMesh = new THREE.Mesh(ischGeo, mats.boneCortical);
    ischMesh.position.set(0.95, -1.05, -0.12);
    ischMesh.castShadow = true;
    ischiumGroup.add(ischMesh);

    // Tuber ischiadicum (Rugged sitting tuberosity)
    const tuberMesh = new THREE.Mesh(new THREE.SphereGeometry(0.52, 20, 20), mats.boneRidge);
    tuberMesh.position.set(1.25, -1.82, -0.12);
    tuberMesh.castShadow = true;
    ischiumGroup.add(tuberMesh);

    ischiumGroup.userData.onBoneClick = () => onPartSelect && onPartSelect('ischium');
    pelvisGroup.add(ischiumGroup);

    // 4. Acetabulum (Deep hemispherical cup with Facies lunata & Y-cartilage)
    const acetGroup = new THREE.Group();
    const socketGeo = new THREE.SphereGeometry(0.9, 28, 20, 0, Math.PI * 2, 0, Math.PI / 2);
    socketGeo.rotateX(-Math.PI / 2);
    const socketMesh = new THREE.Mesh(socketGeo, mats.boneRidge);
    socketMesh.position.set(0, 0, 0.22);
    acetGroup.add(socketMesh);

    // Facies lunata (Crescent-shaped cartilage lining inside socket)
    const lunateGeo = new THREE.TorusGeometry(0.65, 0.18, 12, 24, Math.PI * 1.5);
    const lunateMesh = new THREE.Mesh(lunateGeo, mats.cartilage);
    lunateMesh.position.set(0, 0.05, 0.35);
    acetGroup.add(lunateMesh);

    // Y-shaped cartilage gap
    const cartMat = mats.cartilage.clone();
    const yStem = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.75, 12), cartMat);
    yStem.position.set(0, 0.38, 0.48);
    acetGroup.add(yStem);

    const yArmLGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.65, 12);
    yArmLGeo.rotateZ(Math.PI / 3);
    const yArmL = new THREE.Mesh(yArmLGeo, cartMat);
    yArmL.position.set(-0.28, -0.22, 0.48);
    acetGroup.add(yArmL);

    const yArmRGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.65, 12);
    yArmRGeo.rotateZ(-Math.PI / 3);
    const yArmR = new THREE.Mesh(yArmRGeo, cartMat);
    yArmR.position.set(0.28, -0.22, 0.48);
    acetGroup.add(yArmR);

    acetGroup.userData.onBoneClick = () => onPartSelect && onPartSelect('acetabulum');
    pelvisGroup.add(acetGroup);

    // Age-dependent Synostosis update (0 to 18+ years)
    function setAge(age) {
      const isFused = (age >= 16);
      const opacity = isFused ? 0.0 : Math.max(0.15, 1.0 - (age / 16));
      cartMat.opacity = opacity;
      cartMat.visible = (opacity > 0.02);

      const targetColor = isFused ? 0xf5efe6 : 0xeee4d6;
      mats.boneCortical.color.setHex(targetColor);
    }

    // Foramen obturatum boundary ring (Figs 47–48)
    const obtGeo = new THREE.TorusGeometry(0.52, 0.08, 12, 24);
    obtGeo.rotateX(Math.PI / 2.3);
    const obtMesh = new THREE.Mesh(obtGeo, mats.boneRidge);
    obtMesh.position.set(-0.35, -1.2, 0.2);
    pelvisGroup.add(obtMesh);

    // Hotspot Pins (Figs 47–48: Chanoq suyagi sinostozi)
    viewer.addHotspot('ilium', new THREE.Vector3(0, 1.9, 0.35), '1', "Yonbosh suyagi qanoti va qirrasi", "Ala ossis ilii et crista iliaca", () => onPartSelect && onPartSelect('ilium'), iliumMesh);
    viewer.addHotspot('pubis', new THREE.Vector3(-0.95, -0.95, 0.55), '2', "Qov suyagi yuqori va pastki shoxlari", "Ramus superior et inferior ossis pubis", () => onPartSelect && onPartSelect('pubis'), pubMesh);
    viewer.addHotspot('ischium', new THREE.Vector3(1.15, -1.55, 0.25), '3', "Quymich suyagi va quymich do'mbog'i", "Os ischii et tuber ischiadicum", () => onPartSelect && onPartSelect('ischium'), tuberMesh);
    viewer.addHotspot('acetabulum', new THREE.Vector3(0, 0, 0.75), '4', "Quymich kosasi va yarimoysimon yuza", "Acetabulum et facies lunata", () => onPartSelect && onPartSelect('acetabulum'), socketMesh);
    viewer.addHotspot('y_cartilage', new THREE.Vector3(0, 0.38, 0.65), '5', "Y-simon tog'ay / Sinostoz chizig'i", "Cartilago epiphysialis Y-formis", () => onPartSelect && onPartSelect('acetabulum'), yStem);
    viewer.addHotspot('obturatum', new THREE.Vector3(-0.35, -1.2, 0.35), '6', "Yopqich teshik", "Foramen obturatum", null, obtMesh);

    return {
      pelvisGroup,
      setAge
    };
  }

  /**
   * MODULE 4: FEMUR (Son suyagi) & NECK-SHAFT ANGLE (Figs 49–58)
   * Photorealistic Femur with spherical Caput femoris, Fovea capitis,
   * Collum, Trochanter major and minor, curved shaft with Linea aspera,
   * and distal medial/lateral condyles with intercondylar notch.
   */
  function buildFemur3D(viewer) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const femurGroup = new THREE.Group();
    root.add(femurGroup);

    // 1. Femur Shaft (Corpus femoris - curved slightly anteriorly)
    const shaftGeo = new THREE.CylinderGeometry(0.35, 0.4, 4.4, 24);
    const shaftMesh = new THREE.Mesh(shaftGeo, mats.boneCortical);
    shaftMesh.position.set(0, -0.4, 0);
    shaftMesh.castShadow = true;
    shaftMesh.receiveShadow = true;
    femurGroup.add(shaftMesh);

    // Linea aspera (Double-lipped rough ridge along posterior shaft)
    const lineaGeo = new THREE.BoxGeometry(0.08, 4.0, 0.12);
    const lineaMesh = new THREE.Mesh(lineaGeo, mats.boneRidge);
    lineaMesh.position.set(0, -0.4, -0.38);
    femurGroup.add(lineaMesh);

    // 2. Distal Condyles (Condylus medialis et lateralis)
    const condyleGeo = new THREE.CylinderGeometry(0.58, 0.8, 1.1, 24);
    condyleGeo.scale(1.45, 1.0, 1.25);
    const condyleMesh = new THREE.Mesh(condyleGeo, mats.boneCortical);
    condyleMesh.position.set(0, -2.7, 0);
    condyleMesh.castShadow = true;
    condyleMesh.receiveShadow = true;
    femurGroup.add(condyleMesh);

    // Intercondylar fossa (Deep posterior notch)
    const notchGeo = new THREE.BoxGeometry(0.55, 0.85, 0.75);
    const notchMesh = new THREE.Mesh(notchGeo, new THREE.MeshBasicMaterial({ color: 0x1e293b }));
    notchMesh.position.set(0, -2.75, -0.48);
    femurGroup.add(notchMesh);

    // Patellar surface (Facies patellaris - smooth anterior trochlea for patella)
    const patFacet = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.08, 16), mats.cartilage);
    patFacet.position.set(0, -2.5, 0.62);
    femurGroup.add(patFacet);

    // 3. Proximal Head & Neck Pivot Group
    const headNeckGroup = new THREE.Group();
    headNeckGroup.position.set(0, 1.65, 0);

    // Trochanter major (Lateral summit for gluteal muscles)
    const trochanterGeo = new THREE.BoxGeometry(0.75, 0.95, 0.9);
    const trochanterMesh = new THREE.Mesh(trochanterGeo, mats.boneRidge);
    trochanterMesh.position.set(0.46, 0.12, 0);
    trochanterMesh.castShadow = true;
    headNeckGroup.add(trochanterMesh);

    // Trochanter minor (Conical posteromedial projection for iliopsoas)
    const trochanterMin = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.45, 16), mats.boneRidge);
    trochanterMin.position.set(-0.35, -0.35, -0.35);
    trochanterMin.rotation.x = -0.5;
    headNeckGroup.add(trochanterMin);

    // Collum femoris (Cylindrical neck)
    const neckGeo = new THREE.CylinderGeometry(0.38, 0.42, 1.5, 20);
    neckGeo.rotateZ(Math.PI / 3.7);
    const neckMesh = new THREE.Mesh(neckGeo, mats.boneCortical);
    neckMesh.position.set(-0.65, 0.48, 0);
    neckMesh.castShadow = true;
    headNeckGroup.add(neckMesh);

    // Caput femoris (Spherical femoral head with cartilage)
    const headGeo = new THREE.SphereGeometry(0.7, 28, 28);
    const headMesh = new THREE.Mesh(headGeo, mats.cartilage);
    headMesh.position.set(-1.32, 1.02, 0);
    headMesh.castShadow = true;
    headNeckGroup.add(headMesh);

    // Fovea capitis femoris (Pit for ligamentum capitis femoris)
    const foveaMesh = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), new THREE.MeshBasicMaterial({ color: 0x451a03 }));
    foveaMesh.position.set(-1.92, 1.06, 0);
    headNeckGroup.add(foveaMesh);

    femurGroup.add(headNeckGroup);

    // Angle Arc Indicator
    const arcGeo = new THREE.TorusGeometry(1.25, 0.035, 10, 28, Math.PI * 0.42);
    arcGeo.rotateZ(Math.PI * 0.78);
    const arcMesh = new THREE.Mesh(arcGeo, new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
    arcMesh.position.set(0, 1.65, 0.12);
    femurGroup.add(arcMesh);

    // Angle Setter: 'male' (130°) vs 'female' (118°)
    let currentGender = 'male';
    function setGender(gender) {
      currentGender = gender;
      const isFemale = (gender === 'female');
      const targetAngleZ = isFemale ? -0.24 : 0.0;

      if (window.gsap) {
        gsap.to(headNeckGroup.rotation, { z: targetAngleZ, duration: 0.7, ease: 'power2.out' });
      } else {
        headNeckGroup.rotation.z = targetAngleZ;
      }
      viewer.updateHotspotPins();
    }

    // Hotspot Pins (Figs 49–58: Son suyagi va kollodiafiz burchagi)
    viewer.addHotspot('caput', new THREE.Vector3(-1.35, 2.65, 0.35), '1', "Son suyagi boshi va chuqurchasi", "Caput femoris et fovea capitis", null, headMesh);
    viewer.addHotspot('collum', new THREE.Vector3(-0.65, 2.1, 0.35), '2', "Son suyagi bo'yni (Kollodiafiz burchagi: 130° / 118°)", "Collum femoris (Angulus collodiaphysialis)", null, neckMesh);
    viewer.addHotspot('trochanter_maj', new THREE.Vector3(0.55, 1.9, 0.35), '3', "Katta ko'st", "Trochanter major", null, trochanterMesh);
    viewer.addHotspot('trochanter_min', new THREE.Vector3(-0.35, 1.3, -0.35), '4', "Kichik ko'st", "Trochanter minor", null, trochanterMin);
    viewer.addHotspot('linea_aspera', new THREE.Vector3(0, -0.4, -0.55), '5', "G'adir-budur chiziq (Medial va lateral lab)", "Linea aspera (Labium mediale et laterale)", null, lineaMesh);
    viewer.addHotspot('condylus', new THREE.Vector3(0, -2.7, 0.55), '6', "Medial va lateral bo'g'im do'ngliklari", "Condylus medialis et lateralis", null, condyleMesh);

    return {
      femurGroup,
      setGender,
      toggleGender: () => setGender(currentGender === 'male' ? 'female' : 'male')
    };
  }

  /**
   * MODULE 5: EXPLODED CRANIUM (Bosh skeleti) (Figs 69–70)
   * Medical-grade Cranium with separate cranial bones: Frontal, Parietal,
   * Occipital, Temporal, Sphenoid, Maxilla, and Mandible.
   * Explodes radially outward on 3D click/toggle with raycast selection.
   */
  function buildSkull3D(viewer, onBoneSelect) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const skullGroup = new THREE.Group();
    root.add(skullGroup);

    const skullBones = {};

    function addSkullBone(id, nameUz, basePos, explodeVec, mesh) {
      const g = new THREE.Group();
      g.position.copy(basePos);
      g.add(mesh);
      g.userData = { id, nameUz, basePos: basePos.clone(), explodeVec: explodeVec.clone() };

      g.userData.onBoneClick = () => {
        if (onBoneSelect) onBoneSelect(id);
      };

      skullGroup.add(g);
      skullBones[id] = g;
      return g;
    }

    // 1. Os Frontale (Forehead & Supraorbital Ridges)
    const frontGeo = new THREE.SphereGeometry(1.7, 28, 20, 0, Math.PI, 0, Math.PI * 0.52);
    frontGeo.rotateX(Math.PI * 0.16);
    const frontMesh = new THREE.Mesh(frontGeo, mats.boneCortical);
    frontMesh.castShadow = true;
    frontMesh.receiveShadow = true;
    addSkullBone('frontale', 'Peshona suyagi', new THREE.Vector3(0, 0.75, 0.75), new THREE.Vector3(0, 1.45, 1.55), frontMesh);

    // 2. Os Parietale (Cranial Vault with Sagittal Suture Seam)
    const parietGeo = new THREE.SphereGeometry(1.75, 28, 20, 0, Math.PI * 0.96, 0, Math.PI * 0.46);
    parietGeo.rotateX(-Math.PI * 0.26);
    const parietMesh = new THREE.Mesh(parietGeo, mats.boneCortical);
    parietMesh.castShadow = true;
    parietMesh.receiveShadow = true;
    addSkullBone('parietale', 'Tepa suyagi', new THREE.Vector3(0, 1.45, -0.42), new THREE.Vector3(0, 1.85, -0.65), parietMesh);

    // 3. Os Occipitale (Posterior-Inferior Base, Protuberantia & Foramen Magnum)
    const occipGeo = new THREE.SphereGeometry(1.65, 28, 20, 0, Math.PI, Math.PI * 0.5, Math.PI * 0.5);
    occipGeo.rotateX(Math.PI * 0.32);
    const occipMesh = new THREE.Mesh(occipGeo, mats.boneRidge);
    occipMesh.castShadow = true;
    addSkullBone('occipitale', 'Ensa suyagi', new THREE.Vector3(0, -0.22, -1.35), new THREE.Vector3(0, -0.65, -2.15), occipMesh);

    // 4. Os Temporale (L & R Sides with External Acoustic Meatus & Zygomatic Arch)
    const tempLGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.42, 20);
    tempLGeo.rotateZ(Math.PI / 2);
    const tempLMesh = new THREE.Mesh(tempLGeo, mats.boneCortical);
    tempLMesh.castShadow = true;
    addSkullBone('temporale', 'Chakka suyagi', new THREE.Vector3(-1.35, 0.22, -0.22), new THREE.Vector3(-2.25, 0.22, -0.22), tempLMesh);

    const tempRGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.42, 20);
    tempRGeo.rotateZ(Math.PI / 2);
    const tempRMesh = new THREE.Mesh(tempRGeo, mats.boneCortical);
    tempRMesh.castShadow = true;
    addSkullBone('temporale_r', 'Chakka suyagi', new THREE.Vector3(1.35, 0.22, -0.22), new THREE.Vector3(2.25, 0.22, -0.22), tempRMesh);

    // 5. Os Sphenoidale (Central Keystone Bone / Greater Wings)
    const sphenGeo = new THREE.BoxGeometry(1.45, 0.65, 0.95);
    const sphenMesh = new THREE.Mesh(sphenGeo, mats.boneRidge);
    addSkullBone('sphenoidale', 'Ponasimon suyak', new THREE.Vector3(0, 0.06, -0.1), new THREE.Vector3(0, -0.12, 0), sphenMesh);

    // 6. Maxilla & Zygomatic (Upper Jaw & Cheekbones)
    const maxGeo = new THREE.BoxGeometry(1.55, 0.95, 1.15);
    const maxMesh = new THREE.Mesh(maxGeo, mats.boneCortical);
    maxMesh.castShadow = true;
    addSkullBone('maxilla', 'Yuqori jag\'', new THREE.Vector3(0, -0.68, 0.85), new THREE.Vector3(0, -1.45, 1.65), maxMesh);

    // 7. Mandibula (Lower Jaw with Alveolar Arch, Ramus & Condyles)
    const mandGroup = new THREE.Group();
    const mandGeo = new THREE.TorusGeometry(0.95, 0.24, 12, 24, Math.PI);
    mandGeo.rotateX(Math.PI / 2);
    const mandMesh = new THREE.Mesh(mandGeo, mats.boneCortical);
    mandMesh.castShadow = true;
    mandGroup.add(mandMesh);

    const ramusL = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 1.15, 16), mats.boneCortical);
    ramusL.position.set(-0.95, 0.52, 0.0);
    mandGroup.add(ramusL);

    const ramusR = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 1.15, 16), mats.boneCortical);
    ramusR.position.set(0.95, 0.52, 0.0);
    mandGroup.add(ramusR);

    addSkullBone('mandibula', 'Pastki jag\'', new THREE.Vector3(0, -1.65, 0.42), new THREE.Vector3(0, -2.6, 0.85), mandGroup);

    // Hotspot Pins (Figs 69–70: Kalla suyaklari - Exploded Cranium)
    viewer.addHotspot('frontale', new THREE.Vector3(0, 1.35, 1.25), '1', "Peshona suyagi", "Os frontale (Squama frontalis)", () => onBoneSelect && onBoneSelect('frontale'), frontMesh);
    viewer.addHotspot('parietale', new THREE.Vector3(0, 2.1, -0.45), '2', "Tepa suyagi", "Os parietale (Sutura sagittalis)", () => onBoneSelect && onBoneSelect('parietale'), parietMesh);
    viewer.addHotspot('occipitale', new THREE.Vector3(0, 0.12, -1.65), '3', "Ensa suyagi va katta teshik", "Os occipitale et foramen magnum", () => onBoneSelect && onBoneSelect('occipitale'), occipMesh);
    viewer.addHotspot('temporale', new THREE.Vector3(-1.65, 0.32, -0.22), '4', "Chakka suyagi va tashqi eshituv yo'li", "Os temporale et porus acusticus externus", () => onBoneSelect && onBoneSelect('temporale'), tempLMesh);
    viewer.addHotspot('sphenoidale', new THREE.Vector3(0, 0.06, 0.6), '5', "Ponasimon suyak (Kalla asosi kaliti)", "Os sphenoidale (Ala major et corpus)", () => onBoneSelect && onBoneSelect('sphenoidale'), sphenMesh);
    viewer.addHotspot('maxilla', new THREE.Vector3(0, -0.65, 1.35), '6', "Yuqori jag' suyagi", "Maxilla (Corpus et processus)", () => onBoneSelect && onBoneSelect('maxilla'), maxMesh);
    viewer.addHotspot('mandibula', new THREE.Vector3(0, -1.65, 1.25), '7', "Pastki jag' suyagi", "Mandibula (Corpus et ramus)", () => onBoneSelect && onBoneSelect('mandibula'), mandMesh);

    // Explode Controller
    let isExploded = false;
    function setExploded(exploded) {
      isExploded = exploded;

      Object.values(skullBones).forEach(bone => {
        const targetPos = exploded
          ? bone.userData.basePos.clone().add(bone.userData.explodeVec)
          : bone.userData.basePos.clone();

        if (window.gsap) {
          gsap.to(bone.position, {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
            duration: 0.85,
            ease: 'power2.out'
          });
        } else {
          bone.position.copy(targetPos);
        }
      });
      viewer.updateHotspotPins();
    }

    return {
      skullGroup,
      skullBones,
      setExploded,
      toggleExplode: () => setExploded(!isExploded)
    };
  }

  /**
   * MODULE 5: MANDIBULAR ANGLE (Pastki jag' burchagi) SIMULATOR (Figs 96–98)
   * 3D Mandible model with dynamic angle morphing across age stages:
   * 0 (Chaqaloq: 150°), 1 (Katta yosh: 115°), 2 (Keksa: 145°).
   */
  function buildMandibleAngle3D(viewer) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const mandGroup = new THREE.Group();
    root.add(mandGroup);

    // Horizontal Body (Corpus mandibulae with alveolar ridge & chin)
    const corpusGeo = new THREE.BoxGeometry(2.5, 0.75, 0.48);
    const corpusMesh = new THREE.Mesh(corpusGeo, mats.boneCortical);
    corpusMesh.position.set(0, -0.38, 0);
    corpusMesh.castShadow = true;
    corpusMesh.receiveShadow = true;
    mandGroup.add(corpusMesh);

    // Protuberantia mentalis (Chin prominence)
    const chinMesh = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), mats.boneRidge);
    chinMesh.position.set(0, -0.42, 0.28);
    mandGroup.add(chinMesh);

    // Ascending Ramus Pivot Group (Angulus mandibulae corner)
    const ramusGroup = new THREE.Group();
    ramusGroup.position.set(-1.15, -0.38, 0);

    const ramusGeo = new THREE.BoxGeometry(0.58, 1.85, 0.38);
    const ramusMesh = new THREE.Mesh(ramusGeo, mats.boneCortical);
    ramusMesh.position.set(0, 0.92, 0);
    ramusMesh.castShadow = true;
    ramusGroup.add(ramusMesh);

    // Processus condylaris (Head articulates with mandibular fossa)
    const condyleGeo = new THREE.SphereGeometry(0.3, 16, 16);
    condyleGeo.scale(1.45, 1.0, 0.85);
    const condyleMesh = new THREE.Mesh(condyleGeo, mats.cartilage);
    condyleMesh.position.set(0, 1.9, 0);
    ramusGroup.add(condyleMesh);

    // Angle vertex indicator badge
    const anglePin = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 14), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    anglePin.position.set(0, 0, 0.28);
    ramusGroup.add(anglePin);

    mandGroup.add(ramusGroup);

    // Set stage: 0 (baby: 150°), 1 (adult: 115°), 2 (elderly: 145°)
    function setStage(stageIndex) {
      let angleDeg = 115;
      if (stageIndex === 0) angleDeg = 150;
      if (stageIndex === 1) angleDeg = 115;
      if (stageIndex === 2) angleDeg = 145;

      const tilt = THREE.MathUtils.degToRad(180 - angleDeg);

      if (window.gsap) {
        gsap.to(ramusGroup.rotation, { z: tilt, duration: 0.7, ease: 'power2.out' });
      } else {
        ramusGroup.rotation.z = tilt;
      }
      viewer.updateHotspotPins();
    }

    setStage(1);

    // Hotspot Pins (Figs 96–98: Pastki jag' burchagi evolyutsiyasi)
    viewer.addHotspot('corpus', new THREE.Vector3(0, -0.38, 0.35), '1', "Pastki jag' tanasi", "Corpus mandibulae (Pars alveolaris)", null, corpusMesh);
    viewer.addHotspot('ramus', new THREE.Vector3(-1.15, 0.54, 0.35), '2', "Pastki jag' shoxi", "Ramus mandibulae", null, ramusMesh);
    viewer.addHotspot('angulus', new THREE.Vector3(-1.15, -0.38, 0.38), '3', "Pastki jag' burchagi (115°–150°)", "Angulus mandibulae", null, anglePin);
    viewer.addHotspot('condylaris', new THREE.Vector3(-1.15, 1.52, 0.35), '4', "Bo'g'im o'sig'i va boshchasi", "Processus condylaris et caput mandibulae", null, condyleMesh);
    viewer.addHotspot('mentalis', new THREE.Vector3(0, -0.42, 0.55), '5', "Iyak do'ngligi", "Protuberantia mentalis", null, chinMesh);

    return {
      mandGroup,
      setStage
    };
  }

  /**
   * MODULE 1: COMPLETE HUMAN SKELETON (Odam skeleti) (Figs 1, 2)
   * Hyper-realistic, medical-grade 3D anatomical skeleton specimen featuring:
   * - Natural ivory and aged-beige bone textures with micro-porosity and Haversian canals
   * - Anatomically accurate cranial vault, facial bones, and articulated mandible
   * - Full 24-vertebra spine with natural cervical/lumbar lordosis and thoracic kyphosis, plus sacrum and coccyx
   * - Conical thoracic cage with sternum (manubrium, corpus, xiphoid) and 12 pairs of anatomically curved ribs
   * - Pectoral girdle (S-shaped clavicles, scapulae with spina and acromion) and upper limbs (humerus, radius, ulna, carpus, manus)
   * - Pelvic girdle (ilia wings, crista iliaca, ischium tuberosities, pubic symphysis)
   * - Lower limbs (femur with neck/trochanters, patella, tibia with sharp anterior crest, fibula, tarsus, metatarsus, phalanges)
   * - Articulated landmark hotspots (1: Cranium, 2: Truncus, 3: Upper limbs, 4: Lower limbs)
   * - Studio lighting with soft PCF contact shadows and smooth 360° orbital viewing
   */
  function buildFullSkeleton3D(viewer, onRegionSelect) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const skeletonGroup = new THREE.Group();
    skeletonGroup.position.set(0, 0.4, 0);
    root.add(skeletonGroup);

    // Keep track of region groups for interactive raycasting and highlighting
    const regions = {
      cranium: new THREE.Group(),
      truncus: new THREE.Group(),
      upper: new THREE.Group(),
      lower: new THREE.Group()
    };

    skeletonGroup.add(regions.cranium);
    skeletonGroup.add(regions.truncus);
    skeletonGroup.add(regions.upper);
    skeletonGroup.add(regions.lower);

    // Helper to register interactive metadata and click handler
    function tagRegion(obj, regionId) {
      obj.userData.regionId = regionId;
      obj.userData.onBoneClick = () => {
        highlightRegion(regionId);
        if (onRegionSelect) onRegionSelect(regionId);
      };
      obj.traverse(child => {
        if (child.isMesh) {
          child.userData.regionId = regionId;
          child.userData.onBoneClick = obj.userData.onBoneClick;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    // =========================================================================
    // 1. REGION: CRANIUM (BOSH SKELETI / KALLA) — y: 4.0 to 5.7
    // =========================================================================
    const craniumGroup = regions.cranium;

    // A. Calvaria (Neurocranium vault / Kalla qutisi)
    const vaultGeo = new THREE.SphereGeometry(0.82, 28, 24);
    vaultGeo.scale(1.0, 1.15, 1.25);
    const vaultMesh = new THREE.Mesh(vaultGeo, mats.boneCortical);
    vaultMesh.position.set(0, 4.95, -0.05);
    craniumGroup.add(vaultMesh);

    // B. Occipital Protuberance (Protuberantia occipitalis externa)
    const occipital = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 16, 14).scale(1.2, 0.7, 0.7),
      mats.boneRidge
    );
    occipital.position.set(0, 4.65, -0.92);
    craniumGroup.add(occipital);

    // C. Mastoid & Styloid processes (Processus mastoideus et styloideus)
    const mastoidGeo = new THREE.ConeGeometry(0.12, 0.35, 12);
    mastoidGeo.rotateX(0.2);
    const mastoidL = new THREE.Mesh(mastoidGeo, mats.boneRidge);
    mastoidL.position.set(0.66, 4.45, -0.35);
    const mastoidR = mastoidL.clone();
    mastoidR.position.x = -0.66;
    craniumGroup.add(mastoidL, mastoidR);

    // D. Zygomatic arches (Arcus zygomaticus)
    const zygomaL = new THREE.Mesh(
      new THREE.TorusGeometry(0.48, 0.06, 8, 16, Math.PI * 0.55),
      mats.boneRidge
    );
    zygomaL.position.set(0.68, 4.62, 0.22);
    zygomaL.rotation.y = Math.PI / 2;
    const zygomaR = zygomaL.clone();
    zygomaR.position.x = -0.68;
    zygomaR.rotation.y = -Math.PI / 2;
    craniumGroup.add(zygomaL, zygomaR);

    // E. Viscerocranium (Yuz bo'limi - Maxilla, Os frontale, Cavitas nasalis)
    const faceGeo = new THREE.CylinderGeometry(0.56, 0.42, 0.85, 20);
    faceGeo.scale(1.15, 1.0, 0.85);
    const faceMesh = new THREE.Mesh(faceGeo, mats.boneCortical);
    faceMesh.position.set(0, 4.5, 0.45);
    craniumGroup.add(faceMesh);

    // F. Eye Orbits (Ko'z kosalari cavities)
    const orbitMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.95,
      metalness: 0.05
    });
    const orbitL = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.3, 16), orbitMat);
    orbitL.rotation.x = Math.PI / 2;
    orbitL.position.set(0.32, 4.75, 0.74);
    const orbitR = orbitL.clone();
    orbitR.position.x = -0.32;
    craniumGroup.add(orbitL, orbitR);

    // G. Nasal Piriform Aperture (Apertura piriformis)
    const nasalGeo = new THREE.ConeGeometry(0.12, 0.36, 10);
    nasalGeo.rotateX(Math.PI);
    const nasalCavity = new THREE.Mesh(nasalGeo, orbitMat);
    nasalCavity.position.set(0, 4.52, 0.86);
    craniumGroup.add(nasalCavity);

    // H. Upper Dental Arch (Arcus dentalis superior)
    const upperTeeth = new THREE.Mesh(
      new THREE.TorusGeometry(0.34, 0.055, 8, 18, Math.PI),
      mats.cartilage
    );
    upperTeeth.rotation.x = -Math.PI / 2;
    upperTeeth.position.set(0, 4.22, 0.45);
    craniumGroup.add(upperTeeth);

    // I. Mandibula (Pastki jag' suyagi)
    const mandGroup = new THREE.Group();
    const mandBody = new THREE.Mesh(
      new THREE.TorusGeometry(0.42, 0.11, 10, 18, Math.PI * 0.95),
      mats.boneCortical
    );
    mandBody.rotation.x = -Math.PI / 2;
    mandBody.position.set(0, 4.02, 0.35);
    mandGroup.add(mandBody);

    const chin = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), mats.boneRidge);
    chin.position.set(0, 3.96, 0.72);
    mandGroup.add(chin);

    const lowerTeeth = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.05, 8, 18, Math.PI),
      mats.cartilage
    );
    lowerTeeth.rotation.x = -Math.PI / 2;
    lowerTeeth.position.set(0, 4.12, 0.42);
    mandGroup.add(lowerTeeth);

    const ramusGeo = new THREE.BoxGeometry(0.14, 0.55, 0.28);
    const ramusL = new THREE.Mesh(ramusGeo, mats.boneCortical);
    ramusL.position.set(0.48, 4.3, 0.05);
    ramusL.rotation.z = -0.15;
    const ramusR = ramusL.clone();
    ramusR.position.x = -0.48;
    ramusR.rotation.z = 0.15;
    mandGroup.add(ramusL, ramusR);

    const condyleL = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), mats.cartilage);
    condyleL.position.set(0.52, 4.58, 0.05);
    const condyleR = condyleL.clone();
    condyleR.position.x = -0.52;
    mandGroup.add(condyleL, condyleR);

    craniumGroup.add(mandGroup);
    tagRegion(craniumGroup, 'cranium');

    // =========================================================================
    // 2. REGION: TRUNCUS (TANA SKELETI - COLUMNA VERTEBRALIS & THORAX)
    // =========================================================================
    const truncusGroup = regions.truncus;

    // A. 24 True Vertebrae (7 Cervical + 12 Thoracic + 5 Lumbar) with natural curvatures
    const vertebraCount = 24;
    const startY = 3.92;
    const spineHeight = 3.75;

    for (let i = 0; i < vertebraCount; i++) {
      const frac = i / (vertebraCount - 1);
      const y = startY - frac * spineHeight;

      // Anatomical Lordosis & Kyphosis curvature
      let zCurv = 0;
      if (frac < 0.28) {
        // Cervical lordosis (convex forward)
        zCurv = Math.sin((frac / 0.28) * Math.PI) * 0.18;
      } else if (frac < 0.78) {
        // Thoracic kyphosis (convex backward)
        const tTh = (frac - 0.28) / 0.5;
        zCurv = -Math.sin(tTh * Math.PI) * 0.38;
      } else {
        // Lumbar lordosis (convex forward)
        const tLu = (frac - 0.78) / 0.22;
        zCurv = Math.sin(tLu * Math.PI) * 0.26;
      }

      // Vertebra Corpus (Body) size scales gradually downwards
      const bodyRadius = 0.22 + frac * 0.24;
      const bodyHeight = 0.11 + frac * 0.05;
      const vertGeo = new THREE.CylinderGeometry(bodyRadius, bodyRadius * 1.05, bodyHeight, 16);
      vertGeo.scale(1.15, 1.0, 0.95);
      const vertMesh = new THREE.Mesh(vertGeo, mats.boneCortical);
      vertMesh.position.set(0, y, zCurv);
      truncusGroup.add(vertMesh);

      // Processus spinosus (Orqa o'siq) pointing backward
      const spinousLen = 0.28 + (frac > 0.28 && frac < 0.78 ? 0.25 : 0.12);
      const spinousGeo = new THREE.ConeGeometry(0.08, spinousLen, 8);
      spinousGeo.rotateX(-Math.PI / 2 - 0.28);
      const spinousMesh = new THREE.Mesh(spinousGeo, mats.boneRidge);
      spinousMesh.position.set(0, y, zCurv - bodyRadius - spinousLen * 0.38);
      truncusGroup.add(spinousMesh);

      // Processus transversus (Ko'ndalang o'siqlar)
      const transGeo = new THREE.CylinderGeometry(0.05, 0.06, bodyRadius * 2.4, 8);
      transGeo.rotateZ(Math.PI / 2);
      const transMesh = new THREE.Mesh(transGeo, mats.boneRidge);
      transMesh.position.set(0, y, zCurv - 0.08);
      truncusGroup.add(transMesh);

      // Intervertebral Disc (Fibrocartilago)
      if (i < vertebraCount - 1) {
        const discMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(bodyRadius * 0.96, bodyRadius * 0.96, 0.038, 14),
          mats.cartilage
        );
        discMesh.position.set(0, y - bodyHeight * 0.5 - 0.019, zCurv);
        truncusGroup.add(discMesh);
      }
    }

    // B. Os Sacrum & Os Coccygis (Dumg'aza va Dum suyaklari)
    const sacrumGeo = new THREE.ConeGeometry(0.72, 1.25, 6);
    sacrumGeo.rotateZ(Math.PI);
    sacrumGeo.scale(1.15, 1.0, 0.65);
    const sacrumMesh = new THREE.Mesh(sacrumGeo, mats.boneCortical);
    sacrumMesh.position.set(0, -0.32, -0.28);
    sacrumMesh.rotation.x = 0.32;
    truncusGroup.add(sacrumMesh);

    // Median sacral crest (Crista sacralis mediana)
    const sacralCrest = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.0, 0.14), mats.boneRidge);
    sacralCrest.position.set(0, -0.32, -0.48);
    sacralCrest.rotation.x = 0.32;
    truncusGroup.add(sacralCrest);

    // Coccyx (Dum)
    const coccyxMesh = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.42, 6), mats.boneRidge);
    coccyxMesh.position.set(0, -1.02, -0.15);
    coccyxMesh.rotation.x = -0.45;
    truncusGroup.add(coccyxMesh);

    // C. Sternum (To'sh suyagi)
    // Manubrium sterni
    const manubriumGeo = new THREE.BoxGeometry(0.62, 0.45, 0.12);
    const manubrium = new THREE.Mesh(manubriumGeo, mats.boneCortical);
    manubrium.position.set(0, 3.12, 1.22);
    manubrium.rotation.x = 0.1;
    truncusGroup.add(manubrium);

    // Corpus sterni (Body of sternum)
    const corpusSterniGeo = new THREE.BoxGeometry(0.38, 1.25, 0.11);
    const corpusSterni = new THREE.Mesh(corpusSterniGeo, mats.boneCortical);
    corpusSterni.position.set(0, 2.32, 1.25);
    truncusGroup.add(corpusSterni);

    // Processus xiphoideus (Xiphoid process)
    const xiphoidGeo = new THREE.ConeGeometry(0.12, 0.32, 6);
    xiphoidGeo.rotateZ(Math.PI);
    const xiphoid = new THREE.Mesh(xiphoidGeo, mats.cartilage);
    xiphoid.position.set(0, 1.55, 1.22);
    truncusGroup.add(xiphoid);

    // D. 12 Pairs of Costae (Qovurg'alar)
    const ribPairs = 12;
    for (let r = 0; r < ribPairs; r++) {
      const ribFrac = r / (ribPairs - 1);
      const ribY = 3.2 - ribFrac * 1.82;

      // Realistic anatomical rib expansion profile (widest at ribs 7-8)
      const radX = 1.15 + Math.sin(ribFrac * Math.PI) * 0.72;
      const radZ = 0.95 + Math.sin(ribFrac * Math.PI) * 0.45;

      const ribThickness = 0.055 + (1 - ribFrac) * 0.02;
      const ribGeo = new THREE.TorusGeometry(radX, ribThickness, 8, 26, Math.PI * 0.92);
      ribGeo.rotateX(Math.PI / 2);
      ribGeo.scale(1.0, 1.0, radZ / radX);

      // Left rib
      const ribL = new THREE.Mesh(ribGeo, mats.boneCortical);
      ribL.position.set(0.06, ribY, 0.05);
      ribL.rotation.x = 0.16 + ribFrac * 0.24;
      truncusGroup.add(ribL);

      // Right rib
      const ribR = new THREE.Mesh(ribGeo, mats.boneCortical);
      ribR.position.set(-0.06, ribY, 0.05);
      ribR.rotation.x = 0.16 + ribFrac * 0.24;
      ribR.rotation.y = Math.PI;
      truncusGroup.add(ribR);

      // Costal cartilages (Cartilago costalis) for true ribs 1-7 connecting to sternum
      if (r < 7) {
        const cartGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.48, 8);
        cartGeo.rotateZ(Math.PI / 3);

        const cartL = new THREE.Mesh(cartGeo, mats.cartilage);
        cartL.position.set(0.42, ribY - 0.14, 1.18);
        truncusGroup.add(cartL);

        const cartR = new THREE.Mesh(cartGeo, mats.cartilage);
        cartR.position.set(-0.42, ribY - 0.14, 1.18);
        cartR.rotation.z = -Math.PI / 3;
        truncusGroup.add(cartR);
      }
    }

    tagRegion(truncusGroup, 'truncus');

    // =========================================================================
    // 3. REGION: UPPER LIMBS (QO'L VA YELKA KAMARI SUYAKLARI)
    // =========================================================================
    const upperGroup = regions.upper;

    // A. Claviculae (O'mrov suyaklari) - S-shaped curve
    const clavGeo = new THREE.CylinderGeometry(0.08, 0.07, 1.45, 12);
    clavGeo.rotateZ(Math.PI / 2);

    const clavL = new THREE.Mesh(clavGeo, mats.boneCortical);
    clavL.position.set(0.92, 3.25, 0.55);
    clavL.rotation.y = -0.32;
    clavL.rotation.z = 0.12;

    const clavR = clavL.clone();
    clavR.position.x = -0.92;
    clavR.rotation.y = 0.32;
    clavR.rotation.z = -0.12;
    upperGroup.add(clavL, clavR);

    // B. Scapulae (Kurak suyaklari) - Triangular dorsal plates with Spina & Acromion
    const scapGeo = new THREE.ConeGeometry(0.62, 1.15, 3);
    scapGeo.rotateZ(Math.PI);

    const scapL = new THREE.Mesh(scapGeo, mats.boneCortical);
    scapL.position.set(1.25, 2.7, -0.75);
    scapL.rotation.y = 0.35;
    scapL.rotation.x = -0.18;

    // Spina scapulae & Acromion shelf
    const spinaScap = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.72), mats.boneRidge);
    spinaScap.position.set(1.4, 2.95, -0.55);
    spinaScap.rotation.y = 0.35;

    const scapR = scapL.clone();
    scapR.position.x = -1.25;
    scapR.rotation.y = -0.35;

    const spinaScapR = spinaScap.clone();
    spinaScapR.position.x = -1.4;
    spinaScapR.rotation.y = -0.35;

    upperGroup.add(scapL, scapR, spinaScap, spinaScapR);

    // C. Bilateral Arms Builder (Humerus, Radius, Ulna, Carpus, Manus)
    function buildArm(isLeft) {
      const arm = new THREE.Group();
      const s = isLeft ? 1 : -1;

      // 1. Humerus (Yelka suyagi)
      // Caput humeri (Articular ball head)
      const caputHum = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), mats.cartilage);
      caputHum.position.set(s * 1.82, 3.08, -0.05);
      arm.add(caputHum);

      // Greater & lesser tubercles (Tuberculum majus et minus)
      const tuberHum = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), mats.boneRidge);
      tuberHum.position.set(s * 1.95, 3.12, 0.1);
      arm.add(tuberHum);

      // Shaft of humerus
      const humShaftGeo = new THREE.CylinderGeometry(0.14, 0.16, 2.05, 16);
      const humShaft = new THREE.Mesh(humShaftGeo, mats.boneCortical);
      humShaft.position.set(s * 1.98, 2.05, 0.02);
      humShaft.rotation.z = s * -0.08;
      arm.add(humShaft);

      // Distal humerus condyles (Trochlea & Capitulum)
      const distalHumGeo = new THREE.BoxGeometry(0.48, 0.22, 0.28);
      const distalHum = new THREE.Mesh(distalHumGeo, mats.boneCortical);
      distalHum.position.set(s * 2.08, 1.05, 0.04);
      arm.add(distalHum);

      // Epicondylus medialis
      const epicondyle = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), mats.boneRidge);
      epicondyle.position.set(s * 1.84, 1.05, 0.04);
      arm.add(epicondyle);

      // 2. Forearm (Antebrachium: Radius & Ulna)
      // Ulna (Medial fixed bone with Olecranon beak)
      const olecranon = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.28), mats.boneRidge);
      olecranon.position.set(s * 1.95, 0.98, -0.08);
      arm.add(olecranon);

      const ulnaShaftGeo = new THREE.CylinderGeometry(0.12, 0.08, 1.85, 14);
      const ulnaShaft = new THREE.Mesh(ulnaShaftGeo, mats.boneCortical);
      ulnaShaft.position.set(s * 1.95, 0.02, -0.02);
      ulnaShaft.rotation.z = s * -0.04;
      arm.add(ulnaShaft);

      // Radius (Lateral bone with circular head)
      const radHead = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.12, 16), mats.cartilage);
      radHead.position.set(s * 2.22, 0.92, 0.05);
      arm.add(radHead);

      const radShaftGeo = new THREE.CylinderGeometry(0.09, 0.15, 1.82, 14);
      const radShaft = new THREE.Mesh(radShaftGeo, mats.boneCortical);
      radShaft.position.set(s * 2.25, 0.0, 0.04);
      radShaft.rotation.z = s * -0.04;
      arm.add(radShaft);

      // Processus styloideus radii et ulnae
      const styloidR = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 8), mats.boneRidge);
      styloidR.position.set(s * 2.34, -0.95, 0.04);
      arm.add(styloidR);

      // 3. Hand (Manus: Carpus, Metacarpus, Phalanges)
      // Carpal cluster (8 bones)
      const carpusGeo = new THREE.BoxGeometry(0.35, 0.28, 0.18);
      const carpus = new THREE.Mesh(carpusGeo, mats.boneCortical);
      carpus.position.set(s * 2.12, -1.15, 0.02);
      arm.add(carpus);

      // Metacarpals (5 long rays)
      for (let m = 0; m < 5; m++) {
        const mFrac = (m - 2) * 0.068;
        const metaGeo = new THREE.CylinderGeometry(0.035, 0.04, 0.45, 8);
        const meta = new THREE.Mesh(metaGeo, mats.boneCortical);
        meta.position.set(s * (2.12 + mFrac), -1.48, 0.02);
        arm.add(meta);

        // Phalanges (Fingers)
        const phalGeo = new THREE.CylinderGeometry(0.028, 0.032, 0.42, 8);
        const phal = new THREE.Mesh(phalGeo, mats.boneCortical);
        phal.position.set(s * (2.12 + mFrac * 1.15), -1.85, 0.02);
        arm.add(phal);
      }

      return arm;
    }

    upperGroup.add(buildArm(true));  // Left arm
    upperGroup.add(buildArm(false)); // Right arm
    tagRegion(upperGroup, 'upper');

    // =========================================================================
    // 4. REGION: LOWER LIMBS & PELVIS (CHANOQ VA ERKIN OYOQ SUYAKLARI)
    // =========================================================================
    const lowerGroup = regions.lower;

    // A. Pelvis (Chanoq suyagi: Ilium, Ischium, Pubis, Acetabulum)
    // Iliac wings (Ala ossis ilii)
    const iliumGeo = new THREE.CylinderGeometry(1.45, 0.85, 1.25, 24, 2, false, 0, Math.PI * 0.95);
    iliumGeo.scale(1.15, 1.0, 0.45);

    const iliumL = new THREE.Mesh(iliumGeo, mats.boneCortical);
    iliumL.position.set(0.68, 0.35, -0.05);
    iliumL.rotation.y = -0.38;

    const cristaIliacaL = new THREE.Mesh(
      new THREE.TorusGeometry(1.22, 0.12, 10, 20, Math.PI * 0.92),
      mats.boneRidge
    );
    cristaIliacaL.position.set(0.65, 0.95, -0.08);
    cristaIliacaL.rotation.z = 0.2;

    const iliumR = iliumL.clone();
    iliumR.position.x = -0.68;
    iliumR.rotation.y = 0.38;
    iliumR.scale.x = -1;

    const cristaIliacaR = cristaIliacaL.clone();
    cristaIliacaR.position.x = -0.65;
    cristaIliacaR.rotation.z = -0.2;
    cristaIliacaR.scale.x = -1;

    lowerGroup.add(iliumL, iliumR, cristaIliacaL, cristaIliacaR);

    // Ischium & Tuber ischiadicum (Sitting tuberosities)
    const tuberGeo = new THREE.SphereGeometry(0.28, 14, 14);
    const tuberL = new THREE.Mesh(tuberGeo, mats.boneRidge);
    tuberL.position.set(0.62, -0.92, -0.25);
    const tuberR = tuberL.clone();
    tuberR.position.x = -0.62;
    lowerGroup.add(tuberL, tuberR);

    // Pubis & Symphysis pubica (Qov birikmasi)
    const pubicBridge = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.22, 0.24), mats.boneCortical);
    pubicBridge.position.set(0, -0.72, 0.48);
    const pubicCartilage = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.26, 0.26), mats.cartilage);
    pubicCartilage.position.set(0, -0.72, 0.48);
    lowerGroup.add(pubicBridge, pubicCartilage);

    // Acetabula (Hip sockets receiving femoral balls)
    const acetabulumL = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.08, 10, 16), mats.boneRidge);
    acetabulumL.position.set(0.95, -0.45, 0.05);
    acetabulumL.rotation.y = Math.PI / 2;
    const acetabulumR = acetabulumL.clone();
    acetabulumR.position.x = -0.95;
    lowerGroup.add(acetabulumL, acetabulumR);

    // B. Bilateral Legs Builder (Femur, Patella, Tibia, Fibula, Tarsus, Pes)
    function buildLeg(isLeft) {
      const leg = new THREE.Group();
      const s = isLeft ? 1 : -1;

      // 1. Femur (Son suyagi)
      // Caput femoris (Spherical ivory head)
      const caputFem = new THREE.Mesh(new THREE.SphereGeometry(0.35, 18, 18), mats.cartilage);
      caputFem.position.set(s * 0.95, -0.45, 0.05);
      leg.add(caputFem);

      // Collum femoris (Neck angled at 125°)
      const collumGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.45, 14);
      collumGeo.rotateZ(s * -0.65);
      const collum = new THREE.Mesh(collumGeo, mats.boneCortical);
      collum.position.set(s * 1.18, -0.58, 0.05);
      leg.add(collum);

      // Trochanter major (Massive lateral crest)
      const trochMajor = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.45, 0.35), mats.boneRidge);
      trochMajor.position.set(s * 1.42, -0.68, 0.02);
      leg.add(trochMajor);

      // Shaft of femur (Diaphysis bowed subtly forward)
      const femShaftGeo = new THREE.CylinderGeometry(0.2, 0.22, 2.75, 18);
      const femShaft = new THREE.Mesh(femShaftGeo, mats.boneCortical);
      femShaft.position.set(s * 1.25, -2.05, 0.06);
      femShaft.rotation.z = s * 0.06;
      femShaft.rotation.x = -0.04;
      leg.add(femShaft);

      // Distal femoral condyles (Condylus medialis et lateralis)
      const femCondylesGeo = new THREE.BoxGeometry(0.65, 0.38, 0.52);
      const femCondyles = new THREE.Mesh(femCondylesGeo, mats.boneCortical);
      femCondyles.position.set(s * 1.12, -3.45, 0.04);
      leg.add(femCondyles);

      const cartCondyleL = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 14), mats.cartilage);
      cartCondyleL.position.set(s * 1.24, -3.65, 0.04);
      const cartCondyleM = cartCondyleL.clone();
      cartCondyleM.position.x = s * 0.98;
      leg.add(cartCondyleL, cartCondyleM);

      // 2. Patella (Tizza qopqog'i sesamoid bone)
      const patellaGeo = new THREE.SphereGeometry(0.18, 14, 14);
      patellaGeo.scale(1.1, 1.25, 0.65);
      const patella = new THREE.Mesh(patellaGeo, mats.boneRidge);
      patella.position.set(s * 1.12, -3.42, 0.38);
      leg.add(patella);

      // 3. Crus (Lower Leg: Tibia & Fibula)
      // Tibia plateau
      const tibPlateau = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.35, 0.28, 16), mats.boneCortical);
      tibPlateau.position.set(s * 1.12, -3.75, 0.02);
      leg.add(tibPlateau);

      // Tuberositas tibiae anteriorly
      const tubTibia = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), mats.boneRidge);
      tubTibia.position.set(s * 1.12, -3.88, 0.28);
      leg.add(tubTibia);

      // Tibia shaft with sharp anterior crest (Margo anterior)
      const tibShaftGeo = new THREE.CylinderGeometry(0.22, 0.18, 2.45, 3, 16);
      tibShaftGeo.rotateY(s * Math.PI / 6);
      const tibShaft = new THREE.Mesh(tibShaftGeo, mats.boneCortical);
      tibShaft.position.set(s * 1.12, -5.05, 0.02);
      leg.add(tibShaft);

      // Sharp crest highlight
      const tibCrest = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.35, 0.1), mats.boneRidge);
      tibCrest.position.set(s * 1.12, -5.05, 0.22);
      leg.add(tibCrest);

      // Fibula (Slender lateral bone)
      const fibHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), mats.boneCortical);
      fibHead.position.set(s * 1.48, -3.85, -0.05);
      leg.add(fibHead);

      const fibShaftGeo = new THREE.CylinderGeometry(0.065, 0.075, 2.4, 12);
      const fibShaft = new THREE.Mesh(fibShaftGeo, mats.boneCortical);
      fibShaft.position.set(s * 1.5, -5.08, -0.05);
      leg.add(fibShaft);

      // Malleoli (Ankle mortise)
      // Medial malleolus (Tibia)
      const malleoMed = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.32, 10), mats.boneRidge);
      malleoMed.rotation.x = Math.PI;
      malleoMed.position.set(s * 0.95, -6.32, 0.02);
      leg.add(malleoMed);

      // Lateral malleolus (Fibula)
      const malleoLat = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.38, 10), mats.boneRidge);
      malleoLat.rotation.x = Math.PI;
      malleoLat.position.set(s * 1.48, -6.35, -0.04);
      leg.add(malleoLat);

      // 4. Pes (Foot: Tarsus, Metatarsus, Phalanges)
      // Calcaneus (Heel bone)
      const calcaneusGeo = new THREE.BoxGeometry(0.32, 0.34, 0.75);
      const calcaneus = new THREE.Mesh(calcaneusGeo, mats.boneCortical);
      calcaneus.position.set(s * 1.18, -6.52, -0.32);
      leg.add(calcaneus);

      // Talus (Ankle dome)
      const talus = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.22, 14), mats.cartilage);
      talus.position.set(s * 1.18, -6.35, 0.05);
      leg.add(talus);

      // Navicular, Cuboid, Cuneiforms (Midfoot arch)
      const midfootGeo = new THREE.BoxGeometry(0.48, 0.24, 0.45);
      const midfoot = new THREE.Mesh(midfootGeo, mats.boneCortical);
      midfoot.position.set(s * 1.18, -6.52, 0.28);
      leg.add(midfoot);

      // 5 Metatarsals
      for (let m = 0; m < 5; m++) {
        const mFrac = (m - 2) * 0.09;
        const metaGeo = new THREE.CylinderGeometry(0.042, 0.048, 0.55, 8);
        metaGeo.rotateX(Math.PI / 2.3);
        const meta = new THREE.Mesh(metaGeo, mats.boneCortical);
        meta.position.set(s * (1.18 + mFrac), -6.6, 0.72);
        leg.add(meta);

        // Toe Phalanges
        const toeGeo = new THREE.CylinderGeometry(0.035, 0.038, 0.35, 8);
        toeGeo.rotateX(Math.PI / 2);
        const toe = new THREE.Mesh(toeGeo, mats.boneCortical);
        toe.position.set(s * (1.18 + mFrac * 1.05), -6.65, 1.12);
        leg.add(toe);
      }

      return leg;
    }

    lowerGroup.add(buildLeg(true));  // Left leg
    lowerGroup.add(buildLeg(false)); // Right leg
    tagRegion(lowerGroup, 'lower');

    // Soft Contact Shadow Plane underneath the specimen
    if (viewer.shadowPlane) {
      viewer.shadowPlane.position.y = -6.85;
      viewer.shadowPlane.scale.set(2.2, 2.2, 2.2);
    }

    // =========================================================================
    // 5. PROJECTED 3D NUMBERED PINS (1, 2, 3, 4) — SYNCHRONIZED ATLAS HOTSPOTS
    // =========================================================================
    // Pin 1: Cranium (Bosh skeleti)
    viewer.addHotspot(
      'cranium',
      new THREE.Vector3(0, 5.0, 0.95),
      '1',
      "Bosh skeleti (Kalla)",
      "Cranium (23 ta suyak)",
      () => {
        highlightRegion('cranium');
        if (onRegionSelect) onRegionSelect('cranium');
      }
    );

    // Pin 2: Truncus (Tana skeleti - Columna vertebralis, Thorax)
    viewer.addHotspot(
      'truncus',
      new THREE.Vector3(0.68, 2.35, 1.3),
      '2',
      "Tana skeleti",
      "Skeleton trunci (Umurtqa + Ko'krak)",
      () => {
        highlightRegion('truncus');
        if (onRegionSelect) onRegionSelect('truncus');
      }
    );

    // Pin 3: Upper limbs (Qo'l suyaklari)
    viewer.addHotspot(
      'upper',
      new THREE.Vector3(-1.95, 1.75, 0.35),
      '3',
      "Qo'l suyaklari",
      "Ossa membri superioris (64 ta)",
      () => {
        highlightRegion('upper');
        if (onRegionSelect) onRegionSelect('upper');
      }
    );

    // Pin 4: Lower limbs & Pelvis (Oyoq va chanoq suyaklari)
    viewer.addHotspot(
      'lower',
      new THREE.Vector3(1.18, -1.85, 0.65),
      '4',
      "Oyoq va chanoq suyaklari",
      "Ossa membri inferioris (62 ta)",
      () => {
        highlightRegion('lower');
        if (onRegionSelect) onRegionSelect('lower');
      }
    );

    // =========================================================================
    // 6. HIGHLIGHTING & VIEW CONTROLLER
    // =========================================================================
    let activeHighlightRegion = null;
    let highlightTimer = null;

    function highlightRegion(regionId) {
      if (highlightTimer) clearTimeout(highlightTimer);
      activeHighlightRegion = regionId;

      Object.entries(regions).forEach(([id, group]) => {
        const isTarget = id === regionId;
        group.traverse(child => {
          if (child.isMesh && child.material) {
            if (!child.userData._origMat) child.userData._origMat = child.material;
            if (isTarget) {
              child.material = mats.boneHighlighted;
            } else {
              child.material = child.userData._origMat;
            }
          }
        });
      });

      // Restore material after 2.4 seconds
      highlightTimer = setTimeout(() => {
        Object.values(regions).forEach(group => {
          group.traverse(child => {
            if (child.isMesh && child.userData._origMat) {
              child.material = child.userData._origMat;
            }
          });
        });
        activeHighlightRegion = null;
      }, 2400);

      viewer.updateHotspotPins();
    }

    // Set Front / Back View transition
    function setView(isBack) {
      const targetTheta = isBack ? Math.PI : 0.0;
      const targetPhi = 1.45;
      const targetRadius = 14.5;
      const targetCenter = new THREE.Vector3(0, -0.6, 0);

      if (window.gsap) {
        gsap.to(viewer.controls, {
          targetTheta: targetTheta,
          targetPhi: targetPhi,
          targetRadius: targetRadius,
          duration: 0.85,
          ease: 'power2.inOut',
          onUpdate: () => viewer.updateHotspotPins()
        });
      } else {
        viewer.controls.reset(targetTheta, targetPhi, targetRadius, targetCenter);
      }
    }

    return {
      skeletonGroup,
      regions,
      highlightRegion,
      setView
    };
  }

  /**
   * MODULE 2: VERTEBRAL COLUMN (Columna vertebralis) (Figs 5–7)
   * High-detail 3D articulated spine featuring:
   * - 7 Cervical, 12 Thoracic, 5 Lumbar vertebrae, Sacrum (5 fused), Coccyx (4 fused)
   * - Natural cervical & lumbar lordosis, thoracic & sacral kyphosis
   * - Intervertebral discs (cartilage)
   * - 5 Regional interactive pins (C, Th, L, S, Co)
   * - Raycasting on individual vertebrae meshes
   * - Gender length scaling (73-75cm male vs 68-70cm female)
   */
  function buildSpine3D(viewer, onVertebraSelect) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const spineGroup = new THREE.Group();
    root.add(spineGroup);

    const regions = [
      { name: "Cervical", count: 7, color: 0x38bdf8, prefix: "C", curve: "lordosis", label: "C" },
      { name: "Thoracic", count: 12, color: 0x34d399, prefix: "Th", curve: "kyphosis", label: "Th" },
      { name: "Lumbar", count: 5, color: 0xfbbf24, prefix: "L", curve: "lordosis", label: "L" },
      { name: "Sacral", count: 5, color: 0xf87171, prefix: "S", curve: "kyphosis", label: "S" },
      { name: "Coccygeal", count: 4, color: 0xc084fc, prefix: "Co", curve: "neutral", label: "Co" }
    ];

    const vertebraMeshes = {};
    const totalCount = 33;
    const startY = 3.6;
    const totalHeight = 7.2;
    let currIdx = 0;

    regions.forEach(reg => {
      for (let i = 1; i <= reg.count; i++) {
        const frac = currIdx / (totalCount - 1);
        const y = startY - frac * totalHeight;

        let zCurv = 0;
        if (reg.prefix === "C") {
          zCurv = Math.sin((i / 7) * Math.PI) * 0.32;
        } else if (reg.prefix === "Th") {
          zCurv = -Math.sin((i / 12) * Math.PI) * 0.55;
        } else if (reg.prefix === "L") {
          zCurv = Math.sin((i / 5) * Math.PI) * 0.42;
        } else if (reg.prefix === "S") {
          zCurv = -Math.sin((i / 5) * Math.PI) * 0.28;
        }

        const vGroup = new THREE.Group();
        vGroup.position.set(0, y, zCurv);

        const radius = reg.prefix === "L" ? 0.55 : (reg.prefix === "Th" ? 0.44 : (reg.prefix === "S" ? 0.45 - i * 0.05 : (reg.prefix === "Co" ? 0.22 - i * 0.03 : 0.35)));
        const vHeight = reg.prefix === "L" ? 0.26 : (reg.prefix === "Th" ? 0.22 : (reg.prefix === "S" ? 0.18 : (reg.prefix === "Co" ? 0.12 : 0.18)));

        // Body
        const bodyGeo = new THREE.CylinderGeometry(radius, radius * 1.05, vHeight, 18);
        bodyGeo.scale(1.18, 1.0, 0.95);
        const bodyMesh = new THREE.Mesh(bodyGeo, mats.boneCortical);
        bodyMesh.castShadow = true;
        bodyMesh.receiveShadow = true;
        vGroup.add(bodyMesh);

        // Spinous process
        const spinousLen = reg.prefix === "Th" ? 0.55 : (reg.prefix === "L" ? 0.48 : 0.32);
        const spinousGeo = new THREE.ConeGeometry(0.12, spinousLen, 8);
        spinousGeo.rotateX(-Math.PI / 2 - (reg.prefix === "Th" ? 0.38 : 0.1));
        const spinousMesh = new THREE.Mesh(spinousGeo, mats.boneRidge);
        spinousMesh.position.set(0, 0, -radius - spinousLen * 0.4);
        vGroup.add(spinousMesh);

        // Transverse processes
        const transGeo = new THREE.CylinderGeometry(0.08, 0.09, radius * 2.8, 8);
        transGeo.rotateZ(Math.PI / 2);
        const transMesh = new THREE.Mesh(transGeo, mats.boneRidge);
        transMesh.position.set(0, 0, -0.1);
        vGroup.add(transMesh);

        // Intervertebral disc
        if (currIdx < totalCount - 1 && reg.prefix !== "Co" && !(reg.prefix === "S" && i > 1)) {
          const discGeo = new THREE.CylinderGeometry(radius * 0.95, radius * 0.95, 0.055, 16);
          const disc = new THREE.Mesh(discGeo, mats.cartilage);
          disc.position.set(0, -vHeight * 0.5 - 0.027, 0);
          vGroup.add(disc);
        }

        vGroup.userData = { prefix: reg.prefix, number: i, id: `${reg.prefix}${i}` };
        vGroup.userData.onBoneClick = () => {
          highlightVertebra(reg.prefix, i);
          if (onVertebraSelect) onVertebraSelect(reg.prefix, i);
        };

        vGroup.traverse(child => {
          if (child.isMesh) {
            child.userData = vGroup.userData;
          }
        });

        vertebraMeshes[`${reg.prefix}${i}`] = vGroup;
        spineGroup.add(vGroup);
        currIdx++;
      }
    });

    // 5 Regional Pins
    viewer.addHotspot('spine-c', new THREE.Vector3(-0.85, 2.8, 0.3), 'C', "Bo'yin umurtqalari (C1–C7)", "Vertebrae cervicales (7 ta)", () => highlightRegionVertebrae('C'));
    viewer.addHotspot('spine-th', new THREE.Vector3(-0.95, 0.8, -0.2), 'Th', "Ko'krak umurtqalari (Th1–Th12)", "Vertebrae thoracicae (12 ta)", () => highlightRegionVertebrae('Th'));
    viewer.addHotspot('spine-l', new THREE.Vector3(-1.05, -1.2, 0.4), 'L', "Bel umurtqalari (L1–L5)", "Vertebrae lumbales (5 ta)", () => highlightRegionVertebrae('L'));
    viewer.addHotspot('spine-s', new THREE.Vector3(-0.95, -2.4, -0.1), 'S', "Dumg'aza suyagi (S1–S5)", "Os sacrum (5 ta birlashgan)", () => highlightRegionVertebrae('S'));
    viewer.addHotspot('spine-co', new THREE.Vector3(-0.75, -3.2, 0.0), 'Co', "Dum suyagi (Co1–Co4)", "Os coccygis (4–5 ta)", () => highlightRegionVertebrae('Co'));

    function highlightVertebra(prefix, number) {
      const key = `${prefix}${number}`;
      Object.entries(vertebraMeshes).forEach(([k, group]) => {
        const isTarget = k === key;
        group.traverse(child => {
          if (child.isMesh && child.material !== mats.cartilage) {
            if (!child.userData._origMat) child.userData._origMat = child.material;
            child.material = isTarget ? mats.boneHighlighted : child.userData._origMat;
          }
        });
      });
      setTimeout(() => {
        const g = vertebraMeshes[key];
        if (g) {
          g.traverse(child => {
            if (child.isMesh && child.userData._origMat) {
              child.material = child.userData._origMat;
            }
          });
        }
      }, 2000);
      viewer.updateHotspotPins();
    }

    function highlightRegionVertebrae(prefix) {
      Object.entries(vertebraMeshes).forEach(([k, group]) => {
        const isTarget = k.startsWith(prefix);
        group.traverse(child => {
          if (child.isMesh && child.material !== mats.cartilage) {
            if (!child.userData._origMat) child.userData._origMat = child.material;
            child.material = isTarget ? mats.boneHighlighted : child.userData._origMat;
          }
        });
      });
      setTimeout(() => {
        Object.values(vertebraMeshes).forEach(group => {
          group.traverse(child => {
            if (child.isMesh && child.userData._origMat) {
              child.material = child.userData._origMat;
            }
          });
        });
      }, 2200);
      viewer.updateHotspotPins();
    }

    function setGender(gender) {
      const scaleY = gender === 'female' ? 0.93 : 1.0;
      if (window.gsap) {
        gsap.to(spineGroup.scale, { y: scaleY, duration: 0.6, ease: 'power2.out', onUpdate: () => viewer.updateHotspotPins() });
      } else {
        spineGroup.scale.y = scaleY;
        viewer.updateHotspotPins();
      }
    }

    return {
      spineGroup,
      vertebraMeshes,
      highlightVertebra,
      highlightRegionVertebrae,
      setGender
    };
  }

  /**
   * MODULE 2: THORACIC CAGE (Ko'krak qafasi) (Figs 21, 22)
   * Photorealistic 3D Thorax featuring:
   * - Sternum (Manubrium, Corpus, Xiphoid) with articular costal notches
   * - 12 Pairs of 3D curved ribs (Costae I-XII)
   * - Costal cartilages (Cartilago costalis) forming Arcus costalis
   * - Interactive filtering: 'all', 'true', 'false', 'floating'
   * - 3D Breathing expansion/contraction simulation
   */
  function buildThorax3D(viewer, onPartSelect) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const thoraxGroup = new THREE.Group();
    root.add(thoraxGroup);

    // Posterior Thoracic Spine
    const spineColumn = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const y = 1.9 - i * 0.32;
      const vertGeo = new THREE.CylinderGeometry(0.38, 0.4, 0.22, 16);
      const vert = new THREE.Mesh(vertGeo, mats.boneCortical);
      vert.position.set(0, y, -0.2);
      spineColumn.add(vert);
    }
    thoraxGroup.add(spineColumn);

    // Sternum
    const sternumGroup = new THREE.Group();
    const manubrium = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.55, 0.14), mats.boneCortical);
    manubrium.position.set(0, 1.65, 1.55);
    manubrium.rotation.x = 0.12;

    const corpusSterni = new THREE.Mesh(new THREE.BoxGeometry(0.48, 1.45, 0.12), mats.boneCortical);
    corpusSterni.position.set(0, 0.72, 1.6);

    const xiphoid = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.4, 6), mats.cartilage);
    xiphoid.rotateZ(Math.PI);
    xiphoid.position.set(0, -0.2, 1.55);

    sternumGroup.add(manubrium, corpusSterni, xiphoid);
    sternumGroup.userData = { id: 'sternum' };
    sternumGroup.userData.onBoneClick = () => onPartSelect && onPartSelect('sternum');
    sternumGroup.traverse(c => { if (c.isMesh) c.userData = sternumGroup.userData; });
    thoraxGroup.add(sternumGroup);

    // 12 Pairs of Ribs categorized
    const ribGroups = {
      true: new THREE.Group(),
      false: new THREE.Group(),
      floating: new THREE.Group()
    };
    thoraxGroup.add(ribGroups.true, ribGroups.false, ribGroups.floating);

    for (let r = 0; r < 12; r++) {
      const ribFrac = r / 11;
      const ribY = 1.7 - ribFrac * 2.25;

      const radX = 1.35 + Math.sin(ribFrac * Math.PI) * 0.85;
      const radZ = 1.15 + Math.sin(ribFrac * Math.PI) * 0.52;
      const thick = 0.065 + (1 - ribFrac) * 0.02;

      const ribGeo = new THREE.TorusGeometry(radX, thick, 8, 28, Math.PI * 0.92);
      ribGeo.rotateX(Math.PI / 2);
      ribGeo.scale(1.0, 1.0, radZ / radX);

      const ribL = new THREE.Mesh(ribGeo, mats.boneCortical);
      ribL.position.set(0.08, ribY, 0.05);
      ribL.rotation.x = 0.16 + ribFrac * 0.22;

      const ribR = new THREE.Mesh(ribGeo, mats.boneCortical);
      ribR.position.set(-0.08, ribY, 0.05);
      ribR.rotation.x = 0.16 + ribFrac * 0.22;
      ribR.rotation.y = Math.PI;

      let targetCat = 'true';
      if (r >= 7 && r < 10) targetCat = 'false';
      if (r >= 10) targetCat = 'floating';

      const pairGroup = new THREE.Group();
      pairGroup.add(ribL, ribR);

      // Costal cartilage for true & false ribs
      if (r < 7) {
        const cartGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.55, 8);
        cartGeo.rotateZ(Math.PI / 3);
        const cartL = new THREE.Mesh(cartGeo, mats.cartilage);
        cartL.position.set(0.5, ribY - 0.15, 1.5);
        const cartR = cartL.clone();
        cartR.position.x = -0.5;
        cartR.rotation.z = -Math.PI / 3;
        pairGroup.add(cartL, cartR);
      } else if (r < 10) {
        const cartGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.45, 8);
        cartGeo.rotateZ(Math.PI / 4);
        const cartL = new THREE.Mesh(cartGeo, mats.cartilage);
        cartL.position.set(0.65, ribY - 0.1, 1.35);
        const cartR = cartL.clone();
        cartR.position.x = -0.65;
        cartR.rotation.z = -Math.PI / 4;
        pairGroup.add(cartL, cartR);
      }

      ribGroups[targetCat].add(pairGroup);
    }

    // Interactive Pins
    viewer.addHotspot('sternum-pin', new THREE.Vector3(0, 0.8, 1.7), '1', "To'sh suyagi", "Sternum (Manubrium, Corpus, Xiphoid)", () => onPartSelect && onPartSelect('sternum'));
    viewer.addHotspot('ribs-true-pin', new THREE.Vector3(1.75, 0.75, 1.1), '2', "Haqiqiy qovurg'alar (I–VII)", "Costae verae", () => setFilter('true'));
    viewer.addHotspot('ribs-false-pin', new THREE.Vector3(1.85, -0.55, 0.95), '3', "Soxta qovurg'alar (VIII–X)", "Costae spuriae (Arcus costalis)", () => setFilter('false'));
    viewer.addHotspot('ribs-float-pin', new THREE.Vector3(1.65, -1.5, 0.2), '4', "Yetim / Tebranuvchi qovurg'alar", "Costae fluctuantes (XI–XII)", () => setFilter('floating'));

    function setFilter(filterType) {
      const cats = ['true', 'false', 'floating'];
      cats.forEach(cat => {
        const grp = ribGroups[cat];
        const isVisible = (filterType === 'all' || filterType === cat);
        grp.traverse(child => {
          if (child.isMesh) {
            child.visible = isVisible;
          }
        });
      });
      viewer.updateHotspotPins();
    }

    let breathingAnim = null;
    function setBreathing(active) {
      if (breathingAnim) {
        breathingAnim.kill();
        breathingAnim = null;
      }
      if (active && window.gsap) {
        breathingAnim = gsap.to(thoraxGroup.scale, {
          x: 1.12,
          z: 1.15,
          y: 1.04,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          onUpdate: () => viewer.updateHotspotPins()
        });
      } else {
        thoraxGroup.scale.set(1, 1, 1);
        viewer.updateHotspotPins();
      }
    }

    return {
      thoraxGroup,
      setFilter,
      setBreathing
    };
  }

  /**
   * MODULE 3: SHOULDER GIRDLE (Yelka kamari: O'mrov va Kurak) (Figs 24–27)
   * High-detail 3D specimen featuring:
   * - Clavicula with anatomical S-curve (sternal and acromial ends)
   * - Scapula with spina scapulae, acromion shelf, coracoid process, and glenoid cavity
   * - Proximal humerus head articulating in glenoid socket
   * - 5 Numbered 3D pins perfectly aligned
   */
  function buildShoulderGirdle3D(viewer, onPartSelect) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const shoulderGroup = new THREE.Group();
    root.add(shoulderGroup);

    // 1. Clavicula (O'mrov suyagi)
    const clavGroup = new THREE.Group();
    const clavCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 1.25, 0.4),
      new THREE.Vector3(-0.9, 1.45, 0.65),
      new THREE.Vector3(0.0, 1.35, 0.35),
      new THREE.Vector3(0.9, 1.25, 0.15),
      new THREE.Vector3(1.35, 1.35, -0.05)
    ]);
    const clavGeo = new THREE.TubeGeometry(clavCurve, 32, 0.13, 12, false);
    const clavMesh = new THREE.Mesh(clavGeo, mats.boneCortical);
    clavMesh.castShadow = true;
    clavGroup.add(clavMesh);

    // Sternal end prominence
    const sternalEnd = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 14), mats.boneRidge);
    sternalEnd.position.set(-1.8, 1.25, 0.4);
    clavGroup.add(sternalEnd);

    clavGroup.userData = { id: 'clavicula' };
    clavGroup.userData.onBoneClick = () => onPartSelect && onPartSelect('clavicula');
    clavGroup.traverse(c => { if (c.isMesh) c.userData = clavGroup.userData; });
    shoulderGroup.add(clavGroup);

    // 2. Scapula (Kurak suyagi)
    const scapGroup = new THREE.Group();
    scapGroup.position.set(0.6, -0.2, -0.4);

    // Triangular blade
    const bladeGeo = new THREE.ConeGeometry(1.4, 2.4, 3);
    bladeGeo.scale(1.15, 1.0, 0.22);
    bladeGeo.rotateZ(Math.PI);
    const blade = new THREE.Mesh(bladeGeo, mats.boneCortical);
    blade.position.set(0, 0, 0);
    blade.castShadow = true;
    scapGroup.add(blade);

    // Spina scapulae
    const spinaGeo = new THREE.BoxGeometry(0.24, 0.28, 1.4);
    spinaGeo.rotateX(0.35);
    const spina = new THREE.Mesh(spinaGeo, mats.boneRidge);
    spina.position.set(0.15, 0.55, 0.45);
    scapGroup.add(spina);

    // Acromion shelf
    const acromionGeo = new THREE.BoxGeometry(0.65, 0.22, 0.75);
    const acromion = new THREE.Mesh(acromionGeo, mats.boneRidge);
    acromion.position.set(0.72, 1.35, 0.25);
    acromion.userData = { id: 'acromion' };
    acromion.userData.onBoneClick = () => onPartSelect && onPartSelect('acromion');
    scapGroup.add(acromion);

    // Processus coracoideus
    const coracoidCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.35, 0.85, 0.1),
      new THREE.Vector3(0.45, 1.05, 0.55),
      new THREE.Vector3(0.65, 0.95, 0.75)
    ]);
    const coracoid = new THREE.Mesh(new THREE.TubeGeometry(coracoidCurve, 16, 0.09, 8, false), mats.boneRidge);
    coracoid.userData = { id: 'coracoideus' };
    coracoid.userData.onBoneClick = () => onPartSelect && onPartSelect('coracoideus');
    scapGroup.add(coracoid);

    // Cavitas glenoidalis
    const glenoidGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.15, 18);
    glenoidGeo.scale(0.85, 1.0, 1.25);
    glenoidGeo.rotateZ(Math.PI / 2);
    const glenoid = new THREE.Mesh(glenoidGeo, mats.cartilage);
    glenoid.position.set(0.95, 0.65, 0.1);
    glenoid.userData = { id: 'glenoidalis' };
    glenoid.userData.onBoneClick = () => onPartSelect && onPartSelect('glenoidalis');
    scapGroup.add(glenoid);

    scapGroup.userData = { id: 'scapula' };
    scapGroup.userData.onBoneClick = () => onPartSelect && onPartSelect('scapula');
    scapGroup.traverse(c => { if (c.isMesh && !c.userData.id) c.userData = scapGroup.userData; });
    shoulderGroup.add(scapGroup);

    // 3. Articulating Humerus Head
    const humHeadGeo = new THREE.SphereGeometry(0.65, 20, 20);
    const humHead = new THREE.Mesh(humHeadGeo, mats.cartilage);
    humHead.position.set(1.95, 0.45, -0.3);
    shoulderGroup.add(humHead);

    const humShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 2.2, 16), mats.boneCortical);
    humShaft.position.set(2.2, -0.85, -0.3);
    humShaft.rotation.z = -0.2;
    shoulderGroup.add(humShaft);

    // 5 Interactive 3D Pins
    viewer.addHotspot('sg-1', new THREE.Vector3(-1.8, 1.35, 0.6), '1', "To'sh uchi", "Extremitas sternalis claviculae", () => onPartSelect && onPartSelect('clavicula'));
    viewer.addHotspot('sg-2', new THREE.Vector3(0.9, 1.35, 0.35), '2', "Akromial uchi", "Extremitas acromialis claviculae", () => onPartSelect && onPartSelect('clavicula'));
    viewer.addHotspot('sg-3', new THREE.Vector3(1.35, 1.25, -0.15), '3', "Yelka o'simtasi (Akromion)", "Acromion scapulae", () => onPartSelect && onPartSelect('acromion'));
    viewer.addHotspot('sg-4', new THREE.Vector3(1.15, 0.75, 0.65), '4', "Tumshuqsimon o'siq", "Processus coracoideus", () => onPartSelect && onPartSelect('coracoideus'));
    viewer.addHotspot('sg-5', new THREE.Vector3(1.55, 0.45, 0.2), '5', "Bo'g'im chuqurchasi", "Cavitas glenoidalis", () => onPartSelect && onPartSelect('glenoidalis'));

    return {
      shoulderGroup
    };
  }

  /**
   * MODULE 3: OSSA MANUS (Qo'l panjasi: 8 kaft usti, 5 kaft, barmoqlar) (Figs 36–45)
   * High-detail 3D specimen featuring:
   * - Distal Radius & Ulna with styloid processes
   * - 8 Carpal bones (Scaphoideum, Lunatum, Triquetrum, Pisiforme, Trapezium, Trapezoideum, Capitatum, Hamatum)
   * - 5 Metacarpals (I-V) and Phalanges
   * - 8 Numbered 3D pins perfectly aligned
   */
  function buildHand3D(viewer, onBoneSelect) {
    const root = viewer.boneRoot;
    root.clear();

    const mats = viewer.materials;
    const handGroup = new THREE.Group();
    root.add(handGroup);

    // Distal Radius & Ulna
    const radiusDistal = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.85, 0.65), mats.boneCortical);
    radiusDistal.position.set(-0.65, 2.15, 0);
    const ulnaDistal = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.85, 0.55), mats.boneCortical);
    ulnaDistal.position.set(0.65, 2.15, 0);
    handGroup.add(radiusDistal, ulnaDistal);

    // 8 Carpal Bones with individual meshes and interactive clicks
    const carpalBones = [
      { id: 'scaphoideum', label: '1', nameUz: "Qayiqsimon suyak", nameLat: "Os scaphoideum", pos: [-0.85, 1.25, 0.15], size: [0.65, 0.55, 0.45] },
      { id: 'lunatum', label: '2', nameUz: "Yarimoysimon suyak", nameLat: "Os lunatum", pos: [-0.22, 1.35, 0.12], size: [0.55, 0.52, 0.45] },
      { id: 'triquetrum', label: '3', nameUz: "Uch qirrali suyak", nameLat: "Os triquetrum", pos: [0.45, 1.25, 0.1], size: [0.52, 0.48, 0.42] },
      { id: 'pisiforme', label: '4', nameUz: "No'xatsimon suyak", nameLat: "Os pisiforme", pos: [0.72, 1.15, 0.35], size: [0.35, 0.35, 0.35], isSphere: true },
      { id: 'trapezium', label: '5', nameUz: "Katta ko'pqirrali suyak (Trapetsiya)", nameLat: "Os trapezium", pos: [-1.25, 0.55, 0.15], size: [0.58, 0.55, 0.48] },
      { id: 'trapezoideum', label: '6', nameUz: "Kichik ko'pqirrali suyak", nameLat: "Os trapezoideum", pos: [-0.62, 0.65, 0.12], size: [0.48, 0.52, 0.45] },
      { id: 'capitatum', label: '7', nameUz: "Boshchali suyak (Eng yirigi)", nameLat: "Os capitatum", pos: [0.0, 0.72, 0.15], size: [0.65, 0.82, 0.55] },
      { id: 'hamatum', label: '8', nameUz: "Ilmoqli suyak", nameLat: "Os hamatum", pos: [0.62, 0.62, 0.22], size: [0.58, 0.68, 0.48] }
    ];

    const carpalMeshes = {};
    carpalBones.forEach(b => {
      let geo;
      if (b.isSphere) {
        geo = new THREE.SphereGeometry(b.size[0] * 0.5, 14, 14);
      } else {
        geo = new THREE.BoxGeometry(b.size[0], b.size[1], b.size[2]);
      }
      const mesh = new THREE.Mesh(geo, mats.boneCortical);
      mesh.position.set(b.pos[0], b.pos[1], b.pos[2]);
      mesh.castShadow = true;
      mesh.userData = { id: b.id };
      mesh.userData.onBoneClick = () => {
        highlightHandBone(b.id);
        if (onBoneSelect) onBoneSelect(b.id);
      };
      carpalMeshes[b.id] = mesh;
      handGroup.add(mesh);

      // Add 3D Pin
      viewer.addHotspot(`hand-${b.id}`, new THREE.Vector3(b.pos[0], b.pos[1], b.pos[2] + 0.35), b.label, b.nameUz, b.nameLat, () => {
        highlightHandBone(b.id);
        if (onBoneSelect) onBoneSelect(b.id);
      }, mesh);
    });

    // 5 Metacarpals (I-V)
    for (let m = 0; m < 5; m++) {
      const frac = (m - 2) * 0.48;
      const metaGeo = new THREE.CylinderGeometry(0.14, 0.16, 1.45, 14);
      const meta = new THREE.Mesh(metaGeo, mats.boneCortical);
      meta.position.set(frac, -0.45, 0);
      if (m === 0) {
        meta.position.set(-1.45, -0.25, 0.15);
        meta.rotation.z = 0.35;
      }
      handGroup.add(meta);

      // Phalanges (Fingers)
      const phalCount = m === 0 ? 2 : 3;
      for (let p = 0; p < phalCount; p++) {
        const phalGeo = new THREE.CylinderGeometry(0.11 - p * 0.02, 0.13 - p * 0.02, 0.65 - p * 0.08, 12);
        const phal = new THREE.Mesh(phalGeo, mats.boneCortical);
        const py = -1.5 - p * 0.65;
        if (m === 0) {
          phal.position.set(-1.85 - p * 0.35, -0.85 - p * 0.55, 0.15);
          phal.rotation.z = 0.35;
        } else {
          phal.position.set(frac, py, 0);
        }
        handGroup.add(phal);
      }
    }

    function highlightHandBone(boneId) {
      Object.entries(carpalMeshes).forEach(([id, mesh]) => {
        if (!mesh.userData._origMat) mesh.userData._origMat = mesh.material;
        mesh.material = (id === boneId) ? mats.boneHighlighted : mesh.userData._origMat;
      });
      setTimeout(() => {
        const m = carpalMeshes[boneId];
        if (m && m.userData._origMat) m.material = m.userData._origMat;
      }, 2000);
      viewer.updateHotspotPins();
    }

    return {
      handGroup,
      highlightHandBone
    };
  }

  // Public API
  return {
    createViewer,
    buildFullSkeleton3D,
    buildSpine3D,
    buildThorax3D,
    buildShoulderGirdle3D,
    buildHand3D,
    buildTibia3D,
    buildVertebra3D,
    buildAtlasAxis3D,
    buildForearm3D,
    buildPelvis3D,
    buildFemur3D,
    buildSkull3D,
    buildMandibleAngle3D,
    getViewers: () => viewers,
    setTheme,
    getTheme: () => currentTheme
  };
})();


