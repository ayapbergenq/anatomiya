/**
 * 2-MODUL: TANA SKELETI / SKELETON TRUNCI (5–22-rasmlar, 7–14-betlar)
 * Columna vertebralis (33-34 umurtqalar), Umurtqa konstruktori,
 * Atlant-Aksis aylanish simulyatori, Ko'krak qafasi va qovurg'alar (Costae verae/spuriae/fluctuantes)
 */

window.Module2 = (function() {
  let currentGender = "male"; // "male" or "female"
  let atlasAngle = 0; // -90 to +90 degrees
  let isBreathing = false;
  let breathingTimeline = null;
  let activeRibFilter = "all";

  function init() {
    renderVertebralColumn();
    initVertebraConstructor();
    initAtlasAxisSimulator();
    initThoracicCage();
  }

  // 1. UMURTQA POG'ONASI (Columna vertebralis) — 2D VECTOR MEDICAL ATLAS
  function renderVertebralColumn() {
    const svgContainer = document.getElementById("spine-svg-container");
    const genderToggleBtn = document.getElementById("btn-toggle-spine-gender");
    if (!svgContainer) return;

    drawSpineSvg();

    if (genderToggleBtn) {
      genderToggleBtn.addEventListener("click", () => {
        currentGender = currentGender === "male" ? "female" : "male";
        updateGenderSpineStats();
        drawSpineSvg();
      });
    }

    updateGenderSpineStats();
  }

  function updateGenderSpineStats() {
    const stats = window.ATLAS_DATA.spineData.lengths;
    const len = currentGender === "male" ? stats.male : stats.female;
    const label = document.getElementById("spine-gender-label");
    const lenVal = document.getElementById("spine-total-len-val");
    if (label) label.innerText = currentGender === "male" ? "Erkaklar umurtqasi" : "Ayollar umurtqasi";
    if (lenVal) lenVal.innerText = len;

    // Render regional breakdown cards
    const regList = document.getElementById("spine-regions-breakdown");
    if (regList) {
      regList.innerHTML = stats.regions.map(r => `
        <div class="glass-panel p-3.5 rounded-xl border-l-4 transition-all hover:scale-[1.02] cursor-pointer" style="border-left-color: ${r.color};" onclick="Module2.highlightSpineRegion('${r.nameLat}')">
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-bold text-white">${r.nameUz}</span>
            <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800" style="color: ${r.color};">${r.count} dona</span>
          </div>
          <div class="flex items-center justify-between text-xs text-slate-300">
            <span class="font-mono italic text-slate-400">${r.nameLat}</span>
            <span class="font-semibold text-amber-300">${r.length}</span>
          </div>
        </div>
      `).join("");
    }
  }

  function drawSpineSvg(targetContainer) {
    const container = targetContainer || document.getElementById("spine-svg-container");
    if (!container) return;

    // Draw 33 color-coded vertebrae blocks arranged in anatomical S-curve
    let vertebraeElements = "";
    const regions = [
      { name: "Cervical", count: 7, color: "#38bdf8", prefix: "C", curve: "lordosis" },
      { name: "Thoracic", count: 12, color: "#34d399", prefix: "Th", curve: "kyphosis" },
      { name: "Lumbar", count: 5, color: "#fbbf24", prefix: "L", curve: "lordosis" },
      { name: "Sacral", count: 5, color: "#f87171", prefix: "S", curve: "kyphosis" },
      { name: "Coccygeal", count: 4, color: "#c084fc", prefix: "Co", curve: "neutral" }
    ];

    let currentY = 50;
    let index = 1;

    regions.forEach(reg => {
      for (let i = 1; i <= reg.count; i++) {
        // Calculate physiological lordosis/kyphosis curve offset
        let offsetX = 140;
        if (reg.prefix === "C") {
          offsetX = 140 - Math.sin((i / 7) * Math.PI) * 14; // Cervical lordosis (curves forward)
        } else if (reg.prefix === "Th") {
          offsetX = 140 + Math.sin((i / 12) * Math.PI) * 20; // Thoracic kyphosis (curves backward)
        } else if (reg.prefix === "L") {
          offsetX = 140 - Math.sin((i / 5) * Math.PI) * 16; // Lumbar lordosis (curves forward)
        } else if (reg.prefix === "S") {
          offsetX = 140 + Math.sin((i / 5) * Math.PI) * 14; // Sacral kyphosis
        }

        const vHeight = reg.prefix === "L" ? 18 : (reg.prefix === "Th" ? 14 : (reg.prefix === "S" ? 12 : (reg.prefix === "Co" ? 7 : 11)));
        const vWidth = reg.prefix === "L" ? 44 : (reg.prefix === "Th" ? 38 : (reg.prefix === "S" ? 36 - i * 4 : (reg.prefix === "Co" ? 16 - i * 2 : 30)));

        vertebraeElements += `
          <g id="vert-${reg.prefix}${i}" class="cursor-pointer group" onclick="Module2.selectVertebra('${reg.prefix}', ${i})" style="transition: transform 0.2s ease;">
            <!-- Vertebral Body -->
            <rect x="${offsetX - vWidth / 2}" y="${currentY}" width="${vWidth}" height="${vHeight - 2}" rx="3" fill="${reg.color}" opacity="0.85" stroke="#ffffff" stroke-width="0.8" class="group-hover:opacity-100 group-hover:stroke-cyan-400 group-hover:stroke-[2px]" />
            <!-- Spinous process pointing back -->
            <path d="M${offsetX + vWidth / 2},${currentY + vHeight / 2 - 1} L${offsetX + vWidth / 2 + 16},${currentY + vHeight / 2 + (reg.prefix === 'Th' ? 10 : 2)}" stroke="${reg.color}" stroke-width="2.5" stroke-linecap="round" />
            <!-- Label text -->
            <text x="${offsetX - vWidth / 2 - 8}" y="${currentY + vHeight / 2 + 3}" text-anchor="end" font-size="8" font-family="monospace" fill="${reg.color}" font-weight="bold">${reg.prefix}${i}</text>
          </g>
        `;
        currentY += vHeight + 2;
        index++;
      }
    });

    container.innerHTML = `
      <svg viewBox="0 0 280 640" class="w-full h-auto max-h-[600px] select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
        <defs>
          <filter id="glow-spine" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Spinal Canal Path Guideline (Posterior) -->
        <path d="M140,40 Q124,100 138,150 Q162,250 140,350 Q120,420 138,480 Q155,540 140,610" stroke="rgba(56, 189, 248, 0.2)" stroke-width="8" stroke-linecap="round" fill="none" />

        ${vertebraeElements}
      </svg>
    `;
  }

  function selectVertebra(prefix, num) {
    const detailBox = document.getElementById("spine-vertebra-detail");
    if (!detailBox) return;

    const specialMap = {
      "C1": window.ATLAS_DATA.spineData.specialVertebrae.c1,
      "C2": window.ATLAS_DATA.spineData.specialVertebrae.c2,
      "C6": window.ATLAS_DATA.spineData.specialVertebrae.c6,
      "C7": window.ATLAS_DATA.spineData.specialVertebrae.c7
    };

    const key = `${prefix}${num}`;
    let itemData = specialMap[key];

    if (!itemData) {
      const names = {
        C: { uz: "Bo'yin umurtqasi", lat: "Vertebra cervicalis", tag: "BO'YIN BIOMEXANIKASI", page: "Ahmedov: 8–10-betlar" },
        Th: { uz: "Ko'krak umurtqasi", lat: "Vertebra thoracica", tag: "TORAKAL ANATOMIYA", page: "Ahmedov: 11–12-betlar" },
        L: { uz: "Bel umurtqasi", lat: "Vertebra lumbalis", tag: "LUMBAL BIOMEXANIKA", page: "Ahmedov: 12-bet" },
        S: { uz: "Dumg'aza umurtqasi", lat: "Vertebra sacralis", tag: "PELVIK TAYANCH", page: "Ahmedov: 12-bet" },
        Co: { uz: "Dum umurtqasi", lat: "Vertebra coccygea", tag: "RUDIMENTAR ANATOMIYA", page: "Ahmedov: 12-bet" }
      };
      const info = names[prefix];
      itemData = {
        nameUz: `${info.uz} № ${num}`,
        nameLat: `${info.lat} ${num}`,
        pageRef: info.page,
        clinicalTag: info.tag,
        quickFacts: [
          prefix === "Th" ? "Qovurg'a bilan birikuvchi fovea costalis chuqurchalariga ega (12 juft qovurg'a tutashadi)" :
          prefix === "L" ? "Massiv loviyasimon tana, qalin gorizontal qirrali o'siq; asosiy tana og'irligini ko'taradi" :
          prefix === "S" ? "5 ta umurtqa birlashib, qattiq uchburchak dumg'aza suyagini (os sacrum) hosil qiladi" :
          prefix === "Co" ? "4–5 ta mayda umurtqalarning qo'shilishidan hosil bo'lgan quyrug' rudimenti" :
          "Umurtqa teshigi (foramen vertebrale) orqa miyani himoyalab turadi",
          "Umurtqalararo disk (discus intervertebralis) orqali qo'shni umurtqaga amortizatsiyali birikadi",
          "Umurtqalararo teshikdan (foramen intervertebrale) spinal nerv ildizchalari chiqadi"
        ],
        landmarks: `Processus spinosus, processus transversus, facies articulares ${prefix}${num}.`,
        attachments: "Ligamenta flava, ligamentum supraspinale, ligamentum longitudinale anterius et posterius.",
        neurovascular: "Spinal nerv ildizlari, orqa miya venoz chigallari va radikulyar tomirlar.",
        clinicalNote: prefix === "L" 
          ? "L4–L5 va L5–S1 sohalari disk churrasi (grija) eng ko'p uchraydigan sohadir. Lumbal punksiya va epidural anesteziya odatda L3–L4 yoki L4–L5 oralig'ida o'tkaziladi (orqa miya L1–L2 sohasida tugaydi)."
          : prefix === "Th" 
          ? "Ko'krak umurtqalari qirrali o'siqlari черепицаdek ustma-ust tushganligi sababli orqa miyani orqa tomondan to'liq zirh kabi himoya qiladi."
          : "Faset bo'g'imlari artrozi va osteoxondroz ushbu sohada surunkali og'riq keltirib chiqarishi mumkin.",
        desc: "Umurtqa tanasi (corpus), ravog'i (arcus) va 7 ta o'simtadan iborat."
      };
    }

    detailBox.innerHTML = window.App.renderClinicalDossier(itemData);

    // Highlight using GSAP on 2D SVG
    if (window.gsap) {
      gsap.fromTo(`#vert-${prefix}${num}`, { scale: 0.88 }, { scale: 1.15, duration: 0.25, yoyo: true, repeat: 1 });
    }
  }

  function highlightSpineRegion(regionLat) {
    const prefixMap = {
      'Pars cervicalis': 'C',
      'Pars thoracica': 'Th',
      'Pars lumbalis': 'L',
      'Os sacrum': 'S',
      'Os coccygis': 'Co'
    };
    const prefix = prefixMap[regionLat];
    if (prefix && window.gsap) {
      gsap.fromTo(`[id^="vert-${prefix}"]`, { opacity: 0.4 }, { opacity: 1, duration: 0.3, stagger: 0.04, yoyo: true, repeat: 1 });
    }
  }

  // 2. UMURTQA KONSTRUKTORI (2D Umurtqa tuzilishi)
  function initVertebraConstructor() {
    const stepBtn = document.getElementById("btn-assemble-vertebra");
    const partsContainer = document.getElementById("vertebra-parts-canvas-container");
    if (!partsContainer) return;

    renderVertebraConstructorSvg(true);

    if (stepBtn) {
      let isExploded = false;
      stepBtn.addEventListener("click", () => {
        isExploded = !isExploded;
        stepBtn.innerHTML = isExploded
          ? '<i class="fa-solid fa-compress mr-2 text-amber-400"></i> Qismlarni birlashtirish'
          : '<i class="fa-solid fa-puzzle-piece mr-2 text-cyan-400"></i> Konstruktorni ajratish (Explode)';
        renderVertebraConstructorSvg(!isExploded);
      });
    }
  }

  function renderVertebraConstructorSvg(assembled, targetContainer) {
    const container = targetContainer || document.getElementById("vertebra-parts-canvas-container");
    if (!container) return;

    const offY = assembled ? 0 : 50;
    const offSpine = assembled ? 0 : 70;
    const offTrans = assembled ? 0 : 45;

    container.innerHTML = `
      <svg viewBox="0 0 460 400" class="w-full h-auto max-h-[380px] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <defs>
          <radialGradient id="vertBodyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="70%" stop-color="#cbd5e1" />
            <stop offset="100%" stop-color="#94a3b8" />
          </radialGradient>
        </defs>

        <!-- 1. CORPUS VERTEBRAE (Umurtqa tanasi - oldingi qism) -->
        <g id="c-corpus" style="transform: translateY(${-offY}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer" onclick="Module2.selectConstructorPart('corpus')">
          <ellipse cx="230" cy="115" rx="70" ry="48" fill="url(#vertBodyGrad)" stroke="#38bdf8" stroke-width="2" />
          <!-- Trabecular bone ring -->
          <ellipse cx="230" cy="115" rx="55" ry="36" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
          <!-- Label Pin 1 -->
          <g class="pin-hotspot" transform="translate(230, 115)">
            <circle cx="0" cy="0" r="11" fill="#0284c7" />
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">1</text>
          </g>
          <text x="230" y="80" text-anchor="middle" font-size="11" font-weight="bold" fill="#38bdf8">Corpus vertebrae</text>
        </g>

        <!-- 2. FORAMEN VERTEBRALE (Umurtqa teshigi) -->
        <g id="c-foramen" class="cursor-pointer" onclick="Module2.selectConstructorPart('foramen')">
          <ellipse cx="230" cy="205" rx="36" ry="32" fill="#090d16" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,2" />
          <text x="230" y="210" text-anchor="middle" font-size="10" font-weight="bold" fill="#f59e0b">Foramen vertebrale</text>
        </g>

        <!-- 3. ARCUS VERTEBRAE & PEDUNCULI (Ravoq va oyoqchalar) -->
        <g id="c-arcus" style="transform: translateY(${offY * 0.4}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer" onclick="Module2.selectConstructorPart('arcus')">
          <!-- Left peduncle -->
          <path d="M175,145 Q170,185 195,215" stroke="url(#vertBodyGrad)" stroke-width="14" stroke-linecap="round" fill="none" />
          <!-- Right peduncle -->
          <path d="M285,145 Q290,185 265,215" stroke="url(#vertBodyGrad)" stroke-width="14" stroke-linecap="round" fill="none" />
          <!-- Posterior arch junction -->
          <path d="M195,215 Q230,245 265,215" stroke="url(#vertBodyGrad)" stroke-width="14" stroke-linecap="round" fill="none" />
        </g>

        <!-- 4. PROCESSUS TRANSVERSUS (Ko'ndalang o'siqlar - juft) -->
        <g id="c-trans-left" style="transform: translateX(${-offTrans}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer" onclick="Module2.selectConstructorPart('transversus')">
          <path d="M180,180 L80,195 Q70,198 80,208 L180,198 Z" fill="url(#vertBodyGrad)" stroke="#38bdf8" stroke-width="1.5" />
          <circle cx="85" cy="200" r="5" fill="#f59e0b" opacity="0.8" /> <!-- Fovea costalis transversalis -->
          <text x="75" y="175" font-size="10" font-weight="bold" fill="#94a3b8">Proc. transversus</text>
        </g>
        <g id="c-trans-right" style="transform: translateX(${offTrans}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer" onclick="Module2.selectConstructorPart('transversus')">
          <path d="M280,180 L380,195 Q390,198 380,208 L280,198 Z" fill="url(#vertBodyGrad)" stroke="#38bdf8" stroke-width="1.5" />
          <circle cx="375" cy="200" r="5" fill="#f59e0b" opacity="0.8" />
        </g>

        <!-- 5. PROCESSUS ARTICULARES (Bo'g'im o'simtalari) -->
        <g id="c-articularis" class="cursor-pointer" onclick="Module2.selectConstructorPart('articularis')">
          <ellipse cx="180" cy="180" rx="10" ry="8" fill="#e2e8f0" stroke="#0284c7" stroke-width="1.5" />
          <ellipse cx="280" cy="180" rx="10" ry="8" fill="#e2e8f0" stroke="#0284c7" stroke-width="1.5" />
        </g>

        <!-- 6. PROCESSUS SPINOSUS (Orqa qirrali o'siq) -->
        <g id="c-spinosus" style="transform: translateY(${offSpine}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer" onclick="Module2.selectConstructorPart('spinosus')">
          <path d="M222,236 L226,340 Q230,355 234,340 L238,236 Z" fill="url(#vertBodyGrad)" stroke="#38bdf8" stroke-width="1.5" />
          <g class="pin-hotspot" transform="translate(230, 310)">
            <circle cx="0" cy="0" r="11" fill="#0284c7" />
            <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">4</text>
          </g>
          <text x="230" y="375" text-anchor="middle" font-size="11" font-weight="bold" fill="#38bdf8">Processus spinosus</text>
        </g>
      </svg>
    `;
  }

  function selectConstructorPart(partId) {
    const box = document.getElementById("vertebra-part-info");
    const parts = window.ATLAS_DATA.spineData.vertebraConstructorParts;
    const p = parts.find(x => x.id === partId);
    if (!p || !box) return;

    box.innerHTML = window.App.renderClinicalDossier(p);
  }

  // 3. ATLANT VA AKSIS AYLANIŞ SIMULYATORI (10–13-rasmlar)
  function initAtlasAxisSimulator() {
    const rotSlider = document.getElementById("atlas-rotation-slider");
    const angleLabel = document.getElementById("atlas-angle-val");
    if (!rotSlider) return;

    drawAtlasAxisSvg();

    rotSlider.addEventListener("input", (e) => {
      atlasAngle = parseInt(e.target.value);
      if (angleLabel) angleLabel.innerText = atlasAngle + "°";
      drawAtlasAxisSvg();
    });
  }

  function drawAtlasAxisSvg(targetContainer) {
    const container = targetContainer || document.getElementById("atlas-axis-svg-container");
    if (!container) return;

    container.innerHTML = `
      <svg viewBox="0 0 460 380" class="w-full h-auto max-h-[360px] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <defs>
          <radialGradient id="densGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="70%" stop-color="#eab308" />
            <stop offset="100%" stop-color="#a16207" />
          </radialGradient>
        </defs>

        <!-- STATIONARY AXIS (C2) - BASE & DENS -->
        <g id="axis-c2">
          <!-- Axis body outline -->
          <ellipse cx="230" cy="220" rx="90" ry="55" fill="#334155" stroke="#64748b" stroke-width="2" />
          <!-- Articular facets superior -->
          <ellipse cx="165" cy="210" rx="24" ry="18" fill="#475569" stroke="#94a3b8" stroke-width="1.5" />
          <ellipse cx="295" cy="210" rx="24" ry="18" fill="#475569" stroke="#94a3b8" stroke-width="1.5" />
          <!-- Spinous process bifid -->
          <path d="M230,270 L215,340 M230,270 L245,340" stroke="#64748b" stroke-width="8" stroke-linecap="round" />
          <text x="230" y="360" text-anchor="middle" font-size="10" font-weight="bold" fill="#94a3b8">Axis (C2) - Harakatsiz o'q</text>

          <!-- DENS AXIS (Tishsimon o'siq - markaziy o'q) -->
          <circle cx="230" cy="180" r="18" fill="url(#densGrad)" stroke="#f59e0b" stroke-width="2.5" />
          <circle cx="230" cy="180" r="6" fill="#78350f" />
          <text x="230" y="152" text-anchor="middle" font-size="11" font-weight="bold" fill="#f59e0b">Dens axis (Tish)</text>
        </g>

        <!-- ROTATING ATLAS (C1) RING -->
        <g id="atlas-c1-ring" style="transform-origin: 230px 180px; transform: rotate(${atlasAngle}deg); transition: transform 0.05s linear;">
          <!-- Atlas ring ring -->
          <ellipse cx="230" cy="180" rx="100" ry="60" fill="none" stroke="#38bdf8" stroke-width="16" opacity="0.8" />
          <!-- Anterior arch & fovea dentis -->
          <path d="M205,122 Q230,126 255,122" stroke="#0284c7" stroke-width="20" stroke-linecap="round" fill="none" />
          <ellipse cx="230" cy="130" rx="8" ry="4" fill="#38bdf8" />
          <!-- Lateral masses -->
          <circle cx="135" cy="180" r="22" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
          <circle cx="325" cy="180" r="22" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
          <!-- Foramen transversarium in atlas -->
          <circle cx="118" cy="180" r="6" fill="#090d16" stroke="#ef4444" stroke-width="1.5" />
          <circle cx="342" cy="180" r="6" fill="#090d16" stroke="#ef4444" stroke-width="1.5" />
          <!-- Posterior arch -->
          <path d="M150,225 Q230,250 310,225" stroke="#0284c7" stroke-width="14" stroke-linecap="round" fill="none" />
          
          <!-- Orientation indicator pointer -->
          <line x1="230" y1="120" x2="230" y2="70" stroke="#f43f5e" stroke-width="3" stroke-dasharray="3,3" />
          <polygon points="230,60 225,75 235,75" fill="#f43f5e" />
          <text x="230" y="50" text-anchor="middle" font-size="11" font-weight="bold" fill="#f43f5e">Burilish yo'nalishi</text>
        </g>
      </svg>
    `;
  }

  // 4. KO'KRAK QAFASI: TO'SH VA QOVURG'ALAR (Figs. 20–22)
  function initThoracicCage() {
    const breathBtn = document.getElementById("btn-toggle-breathing");
    const container = document.getElementById("thorax-svg-container");
    if (!container) return;

    drawThoraxSvg();

    if (breathBtn) {
      breathBtn.addEventListener("click", () => {
        isBreathing = !isBreathing;
        breathBtn.innerHTML = isBreathing
          ? '<i class="fa-solid fa-pause mr-2 text-rose-400"></i> Nafas harakatini to\'xtatish'
          : '<i class="fa-solid fa-lungs mr-2 text-cyan-400"></i> Nafas olish harakatini animatsiya qilish';
        toggleBreathingAnimation();
      });
    }

    renderRibFilterButtons();
  }

  function renderRibFilterButtons() {
    const container = document.getElementById("rib-filter-buttons");
    if (!container) return;

    const cats = [
      { id: "all", label: "Barcha qovurg'alar (12 juft)", badge: "I–XII" },
      { id: "true", label: "Chin qovurg'alar (Costae verae)", badge: "I–VII" },
      { id: "false", label: "Yolg'on qovurg'alar (Costae spuriae)", badge: "VIII–X" },
      { id: "floating", label: "Yetim qovurg'alar (Costae fluctuantes)", badge: "XI–XII" }
    ];

    container.innerHTML = cats.map(c => `
      <button onclick="Module2.filterRibs('${c.id}')" class="px-3 py-2 rounded-xl text-xs font-bold transition-all border ${activeRibFilter === c.id ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30' : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-cyan-500/40'}">
        <span>${c.label}</span>
        <span class="ml-1.5 px-1.5 py-0.5 rounded text-[10px] ${activeRibFilter === c.id ? 'bg-slate-900 text-cyan-300' : 'bg-slate-800 text-slate-400'}">${c.badge}</span>
      </button>
    `).join("");
  }

  function filterRibs(filterId) {
    activeRibFilter = filterId;
    renderRibFilterButtons();
    drawThoraxSvg();

    const box = document.getElementById("thorax-part-info");
    if (!box) return;

    if (filterId === "all") {
      selectThoraxPart("sternum");
    } else {
      const cats = window.ATLAS_DATA.spineData.ribsAndSternum.ribCategories;
      const cat = cats.find(c => c.id === filterId);
      if (cat) {
        box.innerHTML = window.App.renderClinicalDossier(cat);
      }
    }
  }

  function drawThoraxSvg(targetContainer) {
    const container = targetContainer || document.getElementById("thorax-svg-container");
    if (!container) return;

    // Rib styles based on filter
    const getRibOpacity = (type) => {
      if (activeRibFilter === "all") return "1";
      return activeRibFilter === type ? "1" : "0.15";
    };

    container.innerHTML = `
      <svg id="thorax-svg-elem" viewBox="0 0 460 520" class="w-full h-auto max-h-[480px] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <defs>
          <linearGradient id="sternumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="60%" stop-color="#cbd5e1" />
            <stop offset="100%" stop-color="#94a3b8" />
          </linearGradient>
          <linearGradient id="cartilageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#0284c7" />
          </linearGradient>
        </defs>

        <!-- THORACIC VERTEBRAE (BACK) -->
        <g id="thorax-vertebrae" opacity="0.4">
          <rect x="220" y="80" width="20" height="340" rx="4" fill="#64748b" />
        </g>

        <!-- RIBS (12 PAIRS) -->
        <!-- 1. TRUE RIBS (I-VII) -->
        <g id="ribs-true" opacity="${getRibOpacity('true')}" style="transition: opacity 0.4s ease;">
          <!-- Pair 1 -->
          <path d="M220,105 C160,95 130,120 160,135 L215,138" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <path d="M240,105 C300,95 330,120 300,135 L245,138" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <!-- Pair 2 -->
          <path d="M220,130 C140,120 100,150 145,170 L216,165" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <path d="M240,130 C320,120 360,150 315,170 L244,165" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <!-- Pair 3 -->
          <path d="M220,155 C125,145 80,185 135,205 L216,192" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <path d="M240,155 C335,145 380,185 325,205 L244,192" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <!-- Pair 4 -->
          <path d="M220,180 C115,175 70,220 130,240 L216,220" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <path d="M240,180 C345,175 390,220 330,240 L244,220" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <!-- Pair 5 -->
          <path d="M220,205 C110,205 65,250 130,270 L216,245" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <path d="M240,205 C350,205 395,250 330,270 L244,245" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <!-- Pair 6 -->
          <path d="M220,230 C110,235 65,280 130,300 L216,268" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <path d="M240,230 C350,235 395,280 330,300 L244,268" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <!-- Pair 7 -->
          <path d="M220,255 C115,260 70,310 130,330 L216,290" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
          <path d="M240,255 C345,260 390,310 330,330 L244,290" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" />
        </g>

        <!-- 2. FALSE RIBS (VIII-X) - Arcus costalis -->
        <g id="ribs-false" opacity="${getRibOpacity('false')}" style="transition: opacity 0.4s ease;">
          <!-- Pair 8 -->
          <path d="M220,280 C120,285 80,335 140,355 L180,315" stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round" />
          <path d="M240,280 C340,285 380,335 320,355 L280,315" stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round" />
          <!-- Pair 9 -->
          <path d="M220,305 C130,310 90,360 150,375 L175,340" stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round" />
          <path d="M240,305 C330,310 370,360 310,375 L285,340" stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round" />
          <!-- Pair 10 -->
          <path d="M220,330 C140,335 110,380 160,395 L170,365" stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round" />
          <path d="M240,330 C320,335 350,380 300,395 L290,365" stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round" />
        </g>

        <!-- 3. FLOATING RIBS (XI-XII) -->
        <g id="ribs-floating" opacity="${getRibOpacity('floating')}" style="transition: opacity 0.4s ease;">
          <!-- Pair 11 -->
          <path d="M220,355 C160,360 125,400 150,420" stroke="#f43f5e" stroke-width="3.5" stroke-dasharray="4,2" fill="none" stroke-linecap="round" />
          <path d="M240,355 C300,360 335,400 310,420" stroke="#f43f5e" stroke-width="3.5" stroke-dasharray="4,2" fill="none" stroke-linecap="round" />
          <!-- Pair 12 -->
          <path d="M220,375 C180,380 150,420 165,435" stroke="#f43f5e" stroke-width="3.5" stroke-dasharray="4,2" fill="none" stroke-linecap="round" />
          <path d="M240,375 C280,380 310,420 295,435" stroke="#f43f5e" stroke-width="3.5" stroke-dasharray="4,2" fill="none" stroke-linecap="round" />
        </g>

        <!-- STERNUM (FRONT - 20-rasm) -->
        <g id="sternum-bone" class="cursor-pointer" onclick="Module2.selectThoraxPart('sternum')">
          <!-- Manubrium sterni (Dasta) -->
          <polygon points="210,105 250,105 242,145 218,145" fill="url(#sternumGrad)" stroke="#38bdf8" stroke-width="1.5" />
          <circle cx="230" cy="107" r="4" fill="#090d16" /> <!-- Incisura jugularis -->
          
          <!-- Corpus sterni (Tana) -->
          <polygon points="218,148 242,148 238,285 222,285" fill="url(#sternumGrad)" stroke="#38bdf8" stroke-width="1.5" />
          
          <!-- Processus xiphoideus (Xanjarband o'simta) -->
          <polygon points="224,287 236,287 230,315" fill="#f59e0b" stroke="#d97706" stroke-width="1.2" />

          <!-- Labels -->
          <text x="260" y="125" font-size="10" font-weight="bold" fill="#38bdf8">Manubrium</text>
          <text x="255" y="220" font-size="10" font-weight="bold" fill="#38bdf8">Corpus</text>
          <text x="245" y="305" font-size="10" font-weight="bold" fill="#f59e0b">Proc. xiphoideus</text>
        </g>
      </svg>
    `;
  }

  function toggleBreathingAnimation() {
    if (!window.gsap) return;

    if (isBreathing) {
      breathingTimeline = gsap.timeline({ repeat: -1, yoyo: true });
      breathingTimeline.to("#ribs-true, #ribs-false, #ribs-floating", {
        scaleY: 1.06,
        scaleX: 1.04,
        transformOrigin: "230px 105px",
        duration: 2.2,
        ease: "power1.inOut"
      });
      breathingTimeline.to("#sternum-bone", {
        y: -6,
        duration: 2.2,
        ease: "power1.inOut"
      }, 0);
    } else {
      if (breathingTimeline) breathingTimeline.kill();
      gsap.to("#ribs-true, #ribs-false, #ribs-floating", { scaleY: 1, scaleX: 1, duration: 0.5 });
      gsap.to("#sternum-bone", { y: 0, duration: 0.5 });
    }
  }

  function selectThoraxPart(part) {
    const box = document.getElementById("thorax-part-info");
    if (!box) return;

    const sternum = window.ATLAS_DATA.spineData.ribsAndSternum.sternum;
    box.innerHTML = window.App.renderClinicalDossier(sternum);
  }

  return {
    init,
    selectVertebra,
    highlightSpineRegion,
    selectConstructorPart,
    filterRibs,
    selectThoraxPart
  };
})();
