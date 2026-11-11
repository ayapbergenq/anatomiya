/**
 * 1-MODUL: UMUMIY OSTEOLOGIYA VA SUYAK TUZILISHI (1–4-rasmlar, 4–7-betlar)
 * Interactive Skeleton Map, Internal Tibia Anatomy (Explode Layers),
 * Age & Chemical Composition Simulator, Bone Classification Cards
 */

window.Module1 = (function() {
  let isBackView = false;
  let isLayersExploded = false;
  let currentAgeIndex = 1; // 0: Bola, 1: Yetuk, 2: Keksa
  let bendForce = 0;
  let canvas, ctx;
  let animId = null;

  function init() {
    renderFunctions();
    renderClassification();
    initSkeletonMap();
    initTibiaSection();
    initAgeSimulator();
    initDeficiencyToggles();
  }

  // 1. ASOSIY VAZIFALAR (3 TA)
  function renderFunctions() {
    const container = document.getElementById("m1-functions-grid");
    if (!container) return;
    const funcs = window.ATLAS_DATA.generalOsteology.functions;

    container.innerHTML = funcs.map(f => `
      <div class="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group border-t-2 border-t-cyan-500/40">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
            <i class="fa-solid ${f.icon}"></i>
          </div>
          <div>
            <h4 class="text-lg font-bold text-slate-100">${f.titleUz}</h4>
            <p class="text-xs font-mono text-cyan-400 italic">${f.titleLat}</p>
          </div>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">${f.desc}</p>
      </div>
    `).join("");
  }

  // 2. INTERAKTIV SKELET XARITASI (1, 2-rasmlar) — CLEAN 2D VECTOR MEDICAL ATLAS
  function initSkeletonMap() {
    const toggleBtn = document.getElementById("btn-toggle-skeleton-view");
    const container = document.getElementById("skeleton-svg-wrapper");
    if (!container) return;

    drawSkeletonSvg(isBackView);

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        isBackView = !isBackView;
        toggleBtn.innerHTML = isBackView
          ? '<i class="fa-solid fa-arrows-rotate mr-2 text-cyan-400"></i> Old tomondan ko\'rish (1-rasm)'
          : '<i class="fa-solid fa-arrows-rotate mr-2 text-cyan-400"></i> Orqa tomondan ko\'rish (2-rasm)';
        const caption = document.getElementById("skeleton-figure-caption");
        if (caption) {
          caption.innerText = isBackView
            ? "2-rasm. Odam skeleti (orqa tomondan ko'rinishi)"
            : "1-rasm. Odam skeleti (old tomondan ko'rinishi)";
        }
        drawSkeletonSvg(isBackView);
      });
    }

    // Default select cranium
    selectSkeletonRegion("cranium");
  }

  function drawSkeletonSvg(isBack) {
    const container = document.getElementById("skeleton-svg-wrapper");
    if (!container) return;

    container.innerHTML = `
      <svg viewBox="0 0 460 760" class="w-full h-auto max-h-[720px] select-none filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]">
        <defs>
          <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="50%" stop-color="#e2e8f0" />
            <stop offset="100%" stop-color="#cbd5e1" />
          </linearGradient>
          <linearGradient id="jointGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#cbd5e1" />
            <stop offset="100%" stop-color="#94a3b8" />
          </linearGradient>
          <linearGradient id="ribGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f1f5f9" />
            <stop offset="100%" stop-color="#cbd5e1" />
          </linearGradient>
          <radialGradient id="pelvisGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="70%" stop-color="#cbd5e1" />
            <stop offset="100%" stop-color="#94a3b8" />
          </radialGradient>
        </defs>

        <!-- REGION 1: CRANIUM / KALLA SUYAKLARI -->
        <g id="reg-cranium" class="cursor-pointer group" onclick="Module1.selectSkeletonRegion('cranium')">
          ${!isBack ? `
            <!-- Front Skull: Calvaria & Viscerocranium -->
            <path d="M230,22 Q200,22 188,48 Q178,75 192,102 Q196,115 208,122 L208,135 Q230,138 252,135 L252,122 Q264,115 268,102 Q282,75 272,48 Q260,22 230,22 Z" fill="url(#boneGrad)" stroke="#38bdf8" stroke-width="1.8" class="group-hover:stroke-cyan-300 group-hover:filter group-hover:brightness-110 transition-all" />
            <!-- Orbits (Eye sockets) -->
            <ellipse cx="214" cy="74" rx="13" ry="14" fill="#090d16" stroke="#38bdf8" stroke-width="1.2" />
            <ellipse cx="246" cy="74" rx="13" ry="14" fill="#090d16" stroke="#38bdf8" stroke-width="1.2" />
            <!-- Nasal aperture -->
            <polygon points="230,86 225,102 235,102" fill="#090d16" stroke="#64748b" stroke-width="1" />
            <!-- Maxilla & Mandible teeth line -->
            <path d="M214,116 Q230,120 246,116" stroke="#64748b" stroke-width="2" fill="none" />
            <path d="M218,124 Q230,128 242,124" stroke="#475569" stroke-width="1.5" fill="none" />
          ` : `
            <!-- Back Skull: Os occipitale & Sutures -->
            <path d="M230,22 Q200,22 188,48 Q178,75 190,105 Q205,125 230,130 Q255,125 270,105 Q282,75 272,48 Q260,22 230,22 Z" fill="url(#boneGrad)" stroke="#38bdf8" stroke-width="1.8" class="group-hover:stroke-cyan-300 transition-all" />
            <!-- Sutura lambdoidea -->
            <path d="M192,85 Q230,62 268,85" stroke="#94a3b8" stroke-width="1.5" fill="none" stroke-dasharray="2,2" />
            <!-- Sutura sagittalis -->
            <line x1="230" y1="22" x2="230" y2="65" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2,2" />
            <!-- Protuberantia occipitalis externa -->
            <circle cx="230" cy="88" r="4" fill="#64748b" />
          `}

          <!-- HOTSPOT PIN 1: CRANIUM -->
          <g class="pin-hotspot" transform="translate(278, 55)">
            <circle cx="0" cy="0" r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">1</text>
          </g>
        </g>

        <!-- REGION 2: TRUNCUS / TANA SKELETI (SPINE, RIBS, STERNUM) -->
        <g id="reg-truncus" class="cursor-pointer group" onclick="Module1.selectSkeletonRegion('truncus')">
          <!-- Cervical Spine (C1-C7) -->
          <rect x="224" y="132" width="12" height="28" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1" />

          <!-- Clavicles (O'mrov suyaklari) -->
          <path d="M230,160 Q195,148 160,165" stroke="#e2e8f0" stroke-width="6" stroke-linecap="round" fill="none" />
          <path d="M230,160 Q265,148 300,165" stroke="#e2e8f0" stroke-width="6" stroke-linecap="round" fill="none" />

          ${!isBack ? `
            <!-- Sternum (To'sh) -->
            <polygon points="222,162 238,162 235,182 225,182" fill="#cbd5e1" stroke="#38bdf8" stroke-width="1.2" />
            <polygon points="225,183 235,183 233,245 227,245" fill="#e2e8f0" stroke="#38bdf8" stroke-width="1.2" />
            <polygon points="227,246 233,246 230,260" fill="#f59e0b" stroke="#d97706" stroke-width="1" />
            
            <!-- 12 Ribs pairs arching forward with costal cartilages -->
            <!-- Ribs 1-7 (True) -->
            <path d="M224,175 C185,160 162,185 180,205 L225,190" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M236,175 C275,160 298,185 280,205 L235,190" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M224,195 C175,185 150,215 178,235 L226,208" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M236,195 C285,185 310,215 282,235 L234,208" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M224,215 C170,210 148,245 176,265 L226,226" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M236,215 C290,210 312,245 284,265 L234,226" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M224,235 C172,235 152,275 180,292 L226,244" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M236,235 C288,235 308,275 280,292 L234,244" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <!-- False & Floating Ribs -->
            <path d="M224,255 C180,260 160,300 188,312 L215,280" stroke="url(#ribGrad)" stroke-width="3.2" fill="none" stroke-linecap="round" />
            <path d="M236,255 C280,260 300,300 272,312 L245,280" stroke="url(#ribGrad)" stroke-width="3.2" fill="none" stroke-linecap="round" />
            <path d="M224,275 C190,285 175,320 200,328" stroke="url(#ribGrad)" stroke-width="3" fill="none" stroke-linecap="round" />
            <path d="M236,275 C270,285 285,320 260,328" stroke="url(#ribGrad)" stroke-width="3" fill="none" stroke-linecap="round" />
          ` : `
            <!-- Back Scapulae (Kuraklar) -->
            <polygon points="198,172 152,185 182,245" fill="url(#boneGrad)" stroke="#38bdf8" stroke-width="1.5" />
            <path d="M152,188 L200,198" stroke="#64748b" stroke-width="3" /> <!-- Spina scapulae -->
            <polygon points="262,172 308,185 278,245" fill="url(#boneGrad)" stroke="#38bdf8" stroke-width="1.5" />
            <path d="M308,188 L260,198" stroke="#64748b" stroke-width="3" />

            <!-- Back Spine (24 Vertebrae spinous processes) -->
            <rect x="226" y="160" width="8" height="180" rx="3" fill="#94a3b8" />
            <!-- Thoracic ribs from back -->
            <path d="M226,180 C170,170 145,210 180,240" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" />
            <path d="M234,180 C290,170 315,210 280,240" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" />
            <path d="M226,210 C165,200 140,245 175,275" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" />
            <path d="M234,210 C295,200 320,245 285,275" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" />
            <path d="M226,240 C165,235 142,280 178,310" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" />
            <path d="M234,240 C295,235 318,280 282,310" stroke="url(#ribGrad)" stroke-width="3.5" fill="none" />
          `}

          <!-- Lumbar Vertebrae (L1-L5) -->
          <rect x="222" y="270" width="16" height="65" rx="3" fill="#cbd5e1" stroke="#38bdf8" stroke-width="1" />

          <!-- HOTSPOT PIN 2: TRUNCUS -->
          <g class="pin-hotspot" transform="translate(195, 230)">
            <circle cx="0" cy="0" r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">2</text>
          </g>
        </g>

        <!-- REGION 3: UPPER LIMBS / QO'L SUYAKLARI -->
        <g id="reg-upper" class="cursor-pointer group" onclick="Module1.selectSkeletonRegion('upper')">
          <!-- Left Arm -->
          <!-- Humerus -->
          <circle cx="152" cy="180" r="9" fill="url(#jointGrad)" stroke="#38bdf8" stroke-width="1" /> <!-- Caput -->
          <line x1="150" y1="184" x2="135" y2="280" stroke="url(#boneGrad)" stroke-width="9" stroke-linecap="round" />
          <ellipse cx="134" cy="284" rx="7" ry="5" fill="url(#jointGrad)" />
          <!-- Forearm: Radius & Ulna -->
          <line x1="132" y1="288" x2="118" y2="375" stroke="url(#boneGrad)" stroke-width="5" stroke-linecap="round" />
          <line x1="137" y1="288" x2="124" y2="375" stroke="url(#boneGrad)" stroke-width="5.5" stroke-linecap="round" />
          <!-- Hand: Carpus, Metacarpus, Phalanges -->
          <ellipse cx="120" cy="382" rx="7" ry="5" fill="#94a3b8" />
          <path d="M120,385 L112,425 M117,386 L116,430 M121,386 L122,432 M124,386 L127,428 M125,384 L132,410" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" />

          <!-- Right Arm -->
          <!-- Humerus -->
          <circle cx="308" cy="180" r="9" fill="url(#jointGrad)" stroke="#38bdf8" stroke-width="1" />
          <line x1="310" y1="184" x2="325" y2="280" stroke="url(#boneGrad)" stroke-width="9" stroke-linecap="round" />
          <ellipse cx="326" cy="284" rx="7" ry="5" fill="url(#jointGrad)" />
          <!-- Forearm -->
          <line x1="328" y1="288" x2="342" y2="375" stroke="url(#boneGrad)" stroke-width="5" stroke-linecap="round" />
          <line x1="323" y1="288" x2="336" y2="375" stroke="url(#boneGrad)" stroke-width="5.5" stroke-linecap="round" />
          <!-- Hand -->
          <ellipse cx="340" cy="382" rx="7" ry="5" fill="#94a3b8" />
          <path d="M340,385 L348,425 M343,386 L344,430 M339,386 L338,432 M336,386 L333,428 M335,384 L328,410" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" />

          <!-- HOTSPOT PIN 3: UPPER LIMB -->
          <g class="pin-hotspot" transform="translate(110, 240)">
            <circle cx="0" cy="0" r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">3</text>
          </g>
        </g>

        <!-- REGION 4: LOWER LIMBS & PELVIS / OYOQ VA CHANOQ SUYAKLARI -->
        <g id="reg-lower" class="cursor-pointer group" onclick="Module1.selectSkeletonRegion('lower')">
          <!-- Pelvis (Chanoq: Os ilium, pubis, ischium, sacrum) -->
          <path d="M192,342 Q230,332 268,342 Q285,372 265,405 Q245,415 230,412 Q215,415 195,405 Q175,372 192,342 Z" fill="url(#pelvisGrad)" stroke="#38bdf8" stroke-width="1.8" />
          <!-- Crista iliaca crest -->
          <path d="M192,342 Q230,330 268,342" stroke="#93c5fd" stroke-width="3" fill="none" />
          <!-- Foramen obturatum -->
          <ellipse cx="216" cy="392" rx="9" ry="11" fill="#090d16" stroke="#475569" stroke-width="1" />
          <ellipse cx="244" cy="392" rx="9" ry="11" fill="#090d16" stroke="#475569" stroke-width="1" />

          <!-- Left Leg -->
          <!-- Femur (Son suyagi) -->
          <circle cx="192" cy="385" r="9" fill="url(#jointGrad)" stroke="#38bdf8" stroke-width="1" /> <!-- Caput -->
          <line x1="192" y1="385" x2="198" y2="520" stroke="url(#boneGrad)" stroke-width="12" stroke-linecap="round" />
          <!-- Trochanter major -->
          <circle cx="180" cy="392" r="5" fill="#94a3b8" />
          <!-- Knee Joint / Patella -->
          <ellipse cx="198" cy="525" rx="10" ry="7" fill="url(#jointGrad)" stroke="#38bdf8" stroke-width="1" />
          ${!isBack ? `<ellipse cx="198" cy="523" rx="7" ry="8" fill="#fef08a" stroke="#ca8a04" stroke-width="1" />` : ''}
          <!-- Crus: Tibia & Fibula -->
          <line x1="197" y1="532" x2="192" y2="670" stroke="url(#boneGrad)" stroke-width="10" stroke-linecap="round" />
          <line x1="207" y1="538" x2="203" y2="668" stroke="url(#boneGrad)" stroke-width="4.5" stroke-linecap="round" />
          <!-- Foot: Calcaneus, Metatarsus, Digiti -->
          <ellipse cx="192" cy="678" rx="8" ry="6" fill="#94a3b8" />
          <path d="M190,680 L180,720 M192,680 L186,724 M194,680 L192,725 M196,680 L198,722 M198,678 L204,716" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />

          <!-- Right Leg -->
          <!-- Femur -->
          <circle cx="268" cy="385" r="9" fill="url(#jointGrad)" stroke="#38bdf8" stroke-width="1" />
          <line x1="268" y1="385" x2="262" y2="520" stroke="url(#boneGrad)" stroke-width="12" stroke-linecap="round" />
          <!-- Trochanter major -->
          <circle cx="280" cy="392" r="5" fill="#94a3b8" />
          <!-- Knee Joint / Patella -->
          <ellipse cx="262" cy="525" rx="10" ry="7" fill="url(#jointGrad)" stroke="#38bdf8" stroke-width="1" />
          ${!isBack ? `<ellipse cx="262" cy="523" rx="7" ry="8" fill="#fef08a" stroke="#ca8a04" stroke-width="1" />` : ''}
          <!-- Crus: Tibia & Fibula -->
          <line x1="263" y1="532" x2="268" y2="670" stroke="url(#boneGrad)" stroke-width="10" stroke-linecap="round" />
          <line x1="253" y1="538" x2="257" y2="668" stroke="url(#boneGrad)" stroke-width="4.5" stroke-linecap="round" />
          <!-- Foot -->
          <ellipse cx="268" cy="678" rx="8" ry="6" fill="#94a3b8" />
          <path d="M270,680 L280,720 M268,680 L274,724 M266,680 L268,725 M264,680 L262,722 M262,678 L256,716" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />

          <!-- HOTSPOT PIN 4: LOWER LIMB & PELVIS -->
          <g class="pin-hotspot" transform="translate(295, 470)">
            <circle cx="0" cy="0" r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">4</text>
          </g>
        </g>
      </svg>
    `;
  }

  function selectSkeletonRegion(region) {
    const infoCard = document.getElementById("skeleton-region-detail");
    const dataMap = {
      cranium: window.ATLAS_DATA.skeletonRegions[0],
      truncus: window.ATLAS_DATA.skeletonRegions[1],
      upper: window.ATLAS_DATA.skeletonRegions[2],
      lower: window.ATLAS_DATA.skeletonRegions[3]
    };
    const reg = dataMap[region];
    if (!reg || !infoCard) return;

    // Highlight animation using GSAP if available
    if (window.gsap) {
      gsap.fromTo(infoCard, { scale: 0.96, opacity: 0.7 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" });
    }

    infoCard.innerHTML = `
      ${window.App.renderClinicalDossier(reg)}
      <div class="mt-3 text-right">
        <button onclick="window.App.switchModule('${reg.moduleId}')" class="text-xs bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl inline-flex items-center space-x-2 transition-all shadow-md shadow-cyan-500/25">
          <span>${reg.nameUz} moduliga o'tish</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    `;
  }

  // 3. SUYAKNING ICHKI TUZILISHI (3, 4-rasmlar) — EXPLODE LAYERS
  function initTibiaSection() {
    const explodeBtn = document.getElementById("btn-explode-tibia");

    renderTibiaSvg();

    if (explodeBtn) {
      explodeBtn.addEventListener("click", () => {
        isLayersExploded = !isLayersExploded;
        explodeBtn.innerHTML = isLayersExploded
          ? '<i class="fa-solid fa-compress mr-2 text-amber-400"></i> Qatlamlarni yig\'ish (Asl holat)'
          : '<i class="fa-solid fa-layer-group mr-2 text-cyan-400"></i> Qatlamlarni ajratish (Explode Layers)';
        renderTibiaSvg();
      });
    }

    renderTibiaLayerList();
  }

  function renderTibiaSvg(targetContainer) {
    const wrapper = targetContainer || document.getElementById("tibia-svg-wrapper");
    if (!wrapper) return;

    // Offsets for explosion animation
    const epifOffY = isLayersExploded ? -28 : 0;
    const periOffX = isLayersExploded ? 45 : 0;
    const periInnerOffX = isLayersExploded ? 65 : 0;
    const compactOffX = isLayersExploded ? -35 : 0;
    const spongeOffX = isLayersExploded ? -65 : 0;

    wrapper.innerHTML = `
      <svg viewBox="0 0 460 620" class="w-full h-auto max-h-[580px] select-none filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)]">
        <defs>
          <linearGradient id="periExtGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f43f5e" />
            <stop offset="100%" stop-color="#be123c" />
          </linearGradient>
          <linearGradient id="periIntGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fb923c" />
            <stop offset="100%" stop-color="#ea580c" />
          </linearGradient>
          <linearGradient id="compactGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="100%" stop-color="#cbd5e1" />
          </linearGradient>
          <radialGradient id="spongyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fdba74" />
            <stop offset="100%" stop-color="#b45309" />
          </radialGradient>
        </defs>

        <!-- TIBIA PROXIMAL EPIPHYSIS (1, 3-rasmlar) -->
        <g id="tibia-prox-epiphysis" style="transform: translateY(${epifOffY}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer" onclick="Module1.selectTibiaLayer('epiphysis')">
          <path d="M120,70 Q200,45 280,70 Q305,100 250,130 L150,130 Q95,100 120,70 Z" fill="url(#spongyGrad)" stroke="#38bdf8" stroke-width="2" />
          <!-- Articular cartilage capping -->
          <path d="M120,68 Q200,40 280,68" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.8" />
          <!-- Spongy bone mesh texture -->
          <g stroke="rgba(255,255,255,0.4)" stroke-width="1">
            <line x1="140" y1="80" x2="260" y2="80" stroke-dasharray="2,3" />
            <line x1="130" y1="95" x2="270" y2="95" stroke-dasharray="3,2" />
            <line x1="145" y1="110" x2="255" y2="110" stroke-dasharray="2,3" />
          </g>
          <!-- Callout Pin 1 -->
          <g class="pin-hotspot" transform="translate(85, 80)">
            <circle cx="0" cy="0" r="11" fill="#0284c7" />
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">1</text>
          </g>
        </g>

        <!-- SUBSTANTIA SPONGIOSA (G'ovak modda) -->
        <g id="tibia-spongiosa" style="transform: translateX(${spongeOffX}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer" onclick="Module1.selectTibiaLayer('spongiosa')">
          <rect x="160" y="130" width="80" height="70" fill="url(#spongyGrad)" rx="6" stroke="#f59e0b" stroke-width="1.5" />
          <text x="200" y="170" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">G'ovak modda</text>
          <!-- Pin 2 -->
          <g class="pin-hotspot" transform="translate(135, 165)">
            <circle cx="0" cy="0" r="11" fill="#f59e0b" />
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">2</text>
          </g>
        </g>

        <!-- SUBSTANTIA COMPACTA (Zich modda devori) -->
        <g id="tibia-compacta" style="transform: translateX(${compactOffX}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer" onclick="Module1.selectTibiaLayer('compacta')">
          <!-- Left compact wall -->
          <rect x="150" y="200" width="22" height="260" fill="url(#compactGrad)" stroke="#38bdf8" stroke-width="1.5" />
          <!-- Right compact wall -->
          <rect x="228" y="200" width="22" height="260" fill="url(#compactGrad)" stroke="#38bdf8" stroke-width="1.5" />
          <!-- Pin 3 -->
          <g class="pin-hotspot" transform="translate(125, 270)">
            <circle cx="0" cy="0" r="11" fill="#0284c7" />
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">3</text>
          </g>
        </g>

        <!-- CAVITAS MEDULLARIS (Ilik bo'shlig'i) -->
        <g id="tibia-cavitas" class="cursor-pointer" onclick="Module1.selectTibiaLayer('cavitas_medullaris')">
          <rect x="172" y="200" width="56" height="260" fill="#fef08a" stroke="#ca8a04" stroke-width="1" rx="4" />
          <!-- Yellow marrow texture dots -->
          <circle cx="190" cy="240" r="4" fill="#eab308" />
          <circle cx="210" cy="270" r="5" fill="#eab308" />
          <circle cx="195" cy="320" r="4" fill="#eab308" />
          <circle cx="205" cy="380" r="5" fill="#eab308" />
          <text x="200" y="340" text-anchor="middle" font-size="10" font-weight="bold" fill="#713f12" transform="rotate(-90 200 340)">Cavitas medullaris</text>
          <!-- Pin 4 -->
          <g class="pin-hotspot" transform="translate(200, 230)">
            <circle cx="0" cy="0" r="11" fill="#ca8a04" />
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">4</text>
          </g>
        </g>

        <!-- FORAMEN NUTRICIUM (Oziq teshigi) -->
        <g id="tibia-foramen" class="cursor-pointer" onclick="Module1.selectTibiaLayer('foramen_nutricium')">
          <ellipse cx="242" cy="290" rx="4" ry="7" fill="#dc2626" stroke="#fecaca" stroke-width="1" transform="rotate(-25 242 290)" />
          <path d="M242,290 L290,265" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2" />
          <circle cx="290" cy="265" r="4" fill="#ef4444" />
          <text x="300" y="270" font-size="11" font-weight="bold" fill="#f87171">Foramen nutricium</text>
        </g>

        <!-- PERIOSTEUM: FIBROUS & OSTEOGENIC LAYERS (4-rasm) -->
        <g id="tibia-periosteum-outer" style="transform: translateX(${periOffX}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer" onclick="Module1.selectTibiaLayer('periosteum_fibrous')">
          <path d="M255,210 Q280,240 280,350 Q280,440 255,460" stroke="url(#periExtGrad)" stroke-width="7" fill="none" stroke-linecap="round" />
          <text x="300" y="340" font-size="11" font-bold fill="#f43f5e">Fibroz qavat (Tashqi)</text>
          <!-- Pin 7 -->
          <g class="pin-hotspot" transform="translate(290, 315)">
            <circle cx="0" cy="0" r="10" fill="#f43f5e" />
            <text x="0" y="3.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff">7</text>
          </g>
        </g>

        <g id="tibia-periosteum-inner" style="transform: translateX(${periInnerOffX}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer" onclick="Module1.selectTibiaLayer('periosteum_osteogenic')">
          <path d="M260,225 Q295,250 295,340 Q295,430 260,450" stroke="url(#periIntGrad)" stroke-width="5" fill="none" stroke-linecap="round" />
          <text x="315" y="380" font-size="11" font-bold fill="#fb923c">Osteogen qavat (Ichki)</text>
          <!-- Pin 8 -->
          <g class="pin-hotspot" transform="translate(305, 360)">
            <circle cx="0" cy="0" r="10" fill="#ea580c" />
            <text x="0" y="3.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff">8</text>
          </g>
        </g>

        <!-- DISTAL EPIPHYSIS & MALLEOLUS MEDIALIS -->
        <g id="tibia-dist-epiphysis" style="transform: translateY(${-epifOffY}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer" onclick="Module1.selectTibiaLayer('epiphysis')">
          <path d="M150,460 L250,460 Q270,500 240,540 L160,540 Q130,510 150,460 Z" fill="url(#spongyGrad)" stroke="#38bdf8" stroke-width="2" />
          <!-- Pin 6 -->
          <g class="pin-hotspot" transform="translate(125, 510)">
            <circle cx="0" cy="0" r="11" fill="#0284c7" />
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">6</text>
          </g>
        </g>
      </svg>
    `;
  }

  function renderTibiaLayerList() {
    const container = document.getElementById("tibia-layer-list");
    if (!container) return;

    container.innerHTML = window.ATLAS_DATA.tibiaLayers.map(l => `
      <div id="layer-item-${l.id}" class="glass-panel p-3.5 rounded-xl cursor-pointer hover:border-cyan-400 transition-all flex items-start space-x-3 group" onclick="Module1.selectTibiaLayer('${l.id}')">
        <span class="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0 border border-cyan-500/40 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
          ${l.pinNumber}
        </span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h5 class="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">${l.nameUz}</h5>
          </div>
          <p class="text-xs font-mono text-cyan-400/80 italic">${l.nameLat}</p>
        </div>
      </div>
    `).join("");
  }

  function selectTibiaLayer(layerId) {
    const detailBox = document.getElementById("tibia-layer-detail");
    const layer = window.ATLAS_DATA.tibiaLayers.find(l => l.id === layerId);
    if (!layer || !detailBox) return;

    // Remove active styles from list
    document.querySelectorAll("[id^='layer-item-']").forEach(el => el.classList.remove("border-amber-400", "bg-amber-950/20"));
    const activeItem = document.getElementById(`layer-item-${layerId}`);
    if (activeItem) activeItem.classList.add("border-amber-400", "bg-amber-950/20");

    detailBox.innerHTML = window.App.renderClinicalDossier(layer);
  }

  // 4. "YOSH VA KIMYOVIY TARKIB" SIMULYATORI (CANVAS BENDING & FRACTURE)
  function initAgeSimulator() {
    canvas = document.getElementById("bone-bending-canvas");
    if (canvas) {
      ctx = canvas.getContext("2d");
      // Setup Retina display scale
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
    }

    const ageSlider = document.getElementById("age-slider");
    const forceSlider = document.getElementById("force-slider");

    if (ageSlider) {
      ageSlider.addEventListener("input", (e) => {
        currentAgeIndex = parseInt(e.target.value);
        updateAgeDisplay();
        drawBendingSimulation();
      });
    }

    if (forceSlider) {
      forceSlider.addEventListener("input", (e) => {
        bendForce = parseFloat(e.target.value);
        document.getElementById("force-val-label").innerText = bendForce + " N";
        drawBendingSimulation();
      });
    }

    updateAgeDisplay();
    drawBendingSimulation();
  }

  function updateAgeDisplay() {
    const ageData = window.ATLAS_DATA.generalOsteology.chemicalComposition.ageDynamics[currentAgeIndex];
    if (!ageData) return;

    document.getElementById("age-stage-title").innerText = ageData.stage;
    document.getElementById("age-stage-desc").innerText = ageData.desc;
    document.getElementById("age-organic-bar").style.width = ageData.organicPercent + "%";
    document.getElementById("age-organic-val").innerText = ageData.organicPercent + "%";
    document.getElementById("age-inorganic-bar").style.width = ageData.inorganicPercent + "%";
    document.getElementById("age-inorganic-val").innerText = ageData.inorganicPercent + "%";
    document.getElementById("age-elasticity-badge").innerText = ageData.elasticity;
    document.getElementById("age-fragility-badge").innerText = ageData.fragility;
  }

  function drawBendingSimulation() {
    if (!canvas || !ctx) return;
    const w = canvas.width / 2;
    const h = canvas.height / 2;
    ctx.clearRect(0, 0, w, h);

    const startX = 60;
    const endX = w - 60;
    const baseY = h / 2 - 10;

    // Mechanical bending parameters based on age
    let maxSafeDeflection = 65; // child
    let stiffness = 0.5;
    let isFractured = false;

    if (currentAgeIndex === 0) { // Bola
      maxSafeDeflection = 95;
      stiffness = 0.85;
    } else if (currentAgeIndex === 1) { // Yetuk
      maxSafeDeflection = 50;
      stiffness = 0.45;
    } else { // Keksa
      maxSafeDeflection = 22;
      stiffness = 0.35;
    }

    const currentDeflection = bendForce * stiffness;
    if (currentDeflection > maxSafeDeflection && currentAgeIndex === 2) {
      isFractured = true;
    } else if (currentDeflection > maxSafeDeflection * 1.5 && currentAgeIndex === 1) {
      isFractured = true;
    }

    // Draw Support Pillars
    ctx.fillStyle = "#334155";
    ctx.fillRect(startX - 15, baseY + 20, 30, h - baseY);
    ctx.fillRect(endX - 15, baseY + 20, 30, h - baseY);
    ctx.strokeStyle = "#0284c7";
    ctx.lineWidth = 2;
    ctx.strokeRect(startX - 15, baseY + 20, 30, h - baseY);
    ctx.strokeRect(endX - 15, baseY + 20, 30, h - baseY);

    // Draw Bone
    ctx.save();
    const midX = (startX + endX) / 2;
    const peakY = baseY + Math.min(currentDeflection, isFractured ? maxSafeDeflection * 1.2 : 120);

    ctx.beginPath();
    ctx.moveTo(startX, baseY);
    ctx.quadraticCurveTo(midX, peakY + 22, endX, baseY);
    ctx.quadraticCurveTo(midX, peakY - 4, startX, baseY);
    ctx.closePath();

    // Fill bone gradient
    const grad = ctx.createLinearGradient(startX, baseY, endX, peakY);
    if (isFractured) {
      grad.addColorStop(0, "#f87171");
      grad.addColorStop(0.5, "#b91c1c");
      grad.addColorStop(1, "#f87171");
    } else if (currentAgeIndex === 0) {
      grad.addColorStop(0, "#fef08a");
      grad.addColorStop(0.5, "#facc15");
      grad.addColorStop(1, "#fef08a");
    } else if (currentAgeIndex === 1) {
      grad.addColorStop(0, "#f8fafc");
      grad.addColorStop(0.5, "#cbd5e1");
      grad.addColorStop(1, "#f8fafc");
    } else {
      grad.addColorStop(0, "#e2e8f0");
      grad.addColorStop(0.5, "#94a3b8");
      grad.addColorStop(1, "#e2e8f0");
    }
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = isFractured ? "#ef4444" : "#38bdf8";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // If fractured, draw jagged crack lines
    if (isFractured) {
      ctx.beginPath();
      ctx.moveTo(midX - 2, peakY - 8);
      ctx.lineTo(midX + 4, peakY + 4);
      ctx.lineTo(midX - 5, peakY + 12);
      ctx.lineTo(midX + 3, peakY + 24);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Fracture alert text
      ctx.font = "bold 14px 'Outfit', sans-serif";
      ctx.fillStyle = "#ef4444";
      ctx.textAlign = "center";
      ctx.fillText("⚠️ PATOLOGIK SINISH (FRACTURA)", midX, peakY + 50);
      ctx.font = "11px sans-serif";
      ctx.fillStyle = "#fca5a5";
      ctx.fillText("Keksa suyakda ossein yetishmagani uchun mo'rt sinish sodir bo'ldi", midX, peakY + 68);
    } else {
      // Normal deflection indicator
      ctx.font = "11px font-mono sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.textAlign = "center";
      ctx.fillText(`Deformatsiya: ${Math.round(currentDeflection)} mm`, midX, peakY + 40);
    }

    // Force vector arrow (from top)
    if (bendForce > 0) {
      ctx.beginPath();
      ctx.moveTo(midX, 20);
      ctx.lineTo(midX, peakY - 10);
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = Math.min( bendForce / 15 + 2, 7 );
      ctx.stroke();

      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(midX - 8, peakY - 18);
      ctx.lineTo(midX, peakY - 8);
      ctx.lineTo(midX + 8, peakY - 18);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();
    }

    ctx.restore();
  }

  // 5. VITAMIN D VA A YETISHMOVCHILIGI
  function initDeficiencyToggles() {
    const btnVitD = document.getElementById("toggle-vit-d");
    const btnVitA = document.getElementById("toggle-vit-a");
    const infoBox = document.getElementById("vit-info-box");

    if (btnVitD && infoBox) {
      btnVitD.addEventListener("click", () => {
        const d = window.ATLAS_DATA.generalOsteology.chemicalComposition.vitamins.vitaminD;
        infoBox.innerHTML = `
          <div class="glass-panel p-5 rounded-2xl border-amber-500/40 border animate-fadeIn">
            <div class="flex items-center space-x-3 text-amber-400 mb-2">
              <i class="fa-solid fa-triangle-exclamation text-xl"></i>
              <h4 class="text-lg font-bold">${d.nameUz}</h4>
            </div>
            <p class="text-xs font-mono text-amber-300 italic mb-2">${d.nameLat}</p>
            <p class="text-sm text-slate-200 leading-relaxed">${d.effect}</p>
          </div>
        `;
      });
    }

    if (btnVitA && infoBox) {
      btnVitA.addEventListener("click", () => {
        const a = window.ATLAS_DATA.generalOsteology.chemicalComposition.vitamins.vitaminA;
        infoBox.innerHTML = `
          <div class="glass-panel p-5 rounded-2xl border-cyan-500/40 border animate-fadeIn">
            <div class="flex items-center space-x-3 text-cyan-400 mb-2">
              <i class="fa-solid fa-bone text-xl"></i>
              <h4 class="text-lg font-bold">${a.nameUz}</h4>
            </div>
            <p class="text-xs font-mono text-cyan-300 italic mb-2">${a.nameLat}</p>
            <p class="text-sm text-slate-200 leading-relaxed">${a.effect}</p>
          </div>
        `;
      });
    }
  }

  // 6. SUYAKLAR TASNIFI KARTALARI
  function renderClassification() {
    const container = document.getElementById("classification-cards-grid");
    if (!container) return;
    const list = window.ATLAS_DATA.generalOsteology.classification;

    container.innerHTML = list.map(c => `
      <div class="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 font-bold">
              ${c.badge}
            </span>
            <span class="text-xs font-mono text-slate-400 italic">${c.nameLat}</span>
          </div>
          <h4 class="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">${c.nameUz}</h4>
          
          <div class="space-y-4">
            ${c.types.map(t => `
              <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div class="font-bold text-sm text-amber-300 mb-0.5">${t.sub}</div>
                <div class="text-xs font-mono text-slate-400 italic mb-1.5">${t.subLat}</div>
                <p class="text-xs text-slate-300 mb-2">${t.desc}</p>
                <div class="text-xs text-cyan-400 bg-cyan-950/30 p-2 rounded border border-cyan-800/40">
                  <span class="font-semibold text-slate-200">Misollar:</span> ${t.examples}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `).join("");
  }

  return {
    init,
    selectSkeletonRegion,
    selectTibiaLayer
  };
})();
