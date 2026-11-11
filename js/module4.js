/**
 * 4-MODUL: OYOQ SUYAKLARI / OSSA MEMBRI INFERIORIS (46–68-rasmlar, 23–32-betlar)
 * Chanoq suyagi sinostozi (14-16 yoshgacha tog'ay, so'ngra sinostoz),
 * Son suyagi kollodiafiz burchagi (Erkaklar 130° vs Ayollar 90-115°),
 * Oyoq panjasi va gumbaz biomexanikasi (Arcus pedis)
 */

window.Module4 = (function() {
  let fusionAge = 0; // 0, 7, 14, 16
  let femurGender = "male"; // "male" or "female"
  let footLoad = 70; // 0 to 120 kg
  let footArchCanvas, footArchCtx;

  function init() {
    initPelvisFusion();
    initFemurGender();
    initFootArchBiomechanics();
  }

  // 1. CHANOQ SUYAGI BIRLASHISH ANIMATSIYASI (Os coxae, 47, 48-rasmlar) — 2D VECTOR
  function initPelvisFusion() {
    const slider = document.getElementById("pelvis-age-slider");
    const ageVal = document.getElementById("pelvis-age-val");
    if (!slider) return;

    drawPelvisFusionSvg();

    slider.addEventListener("input", (e) => {
      fusionAge = parseInt(e.target.value);
      if (ageVal) ageVal.innerText = fusionAge + " yosh";
      drawPelvisFusionSvg();
    });
  }

  function drawPelvisFusionSvg() {
    const container = document.getElementById("pelvis-fusion-svg-container");
    if (!container) return;

    // Cartilage Y-shape width shrinks as age increases (fuses at 16)
    const isFused = fusionAge >= 16;
    const cartilageStroke = isFused ? "#38bdf8" : "#22d3ee";
    const cartilageWidth = isFused ? 2 : Math.max( 12 - (fusionAge * 0.7), 4 );
    const cartilageOpacity = isFused ? 0.3 : 0.9;

    const statusTitle = isFused
      ? "16+ yosh: To'liq sinostoz (Yagona Os coxae)"
      : `${fusionAge} yosh: Y-simon tog'ayli birikma (Sinxondroz)`;

    const statusDesc = isFused
      ? "Yonbosh, qov va quymich suyaklari quymich kosasi (acetabulum)da yaxlit bitta chanoq suyagiga (os coxae) aylanib ketgan."
      : "Suyaklar hali alohida bo'lib, quymich kosasi sohasida Y-simon gialin tog'ay plastinkasi bilan birlashib turibdi.";

    container.innerHTML = `
      <svg viewBox="0 0 460 440" class="w-full h-auto max-h-[420px] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <defs>
          <radialGradient id="iliumGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#93c5fd" />
            <stop offset="100%" stop-color="#2563eb" />
          </radialGradient>
          <radialGradient id="pubisGrad" cx="30%" cy="50%" r="70%">
            <stop offset="0%" stop-color="#fed7aa" />
            <stop offset="100%" stop-color="#ea580c" />
          </radialGradient>
          <radialGradient id="ischiumGrad" cx="50%" cy="70%" r="70%">
            <stop offset="0%" stop-color="#bbf7d0" />
            <stop offset="100%" stop-color="#16a34a" />
          </radialGradient>
        </defs>

        <!-- 1. OS ILIUM (YONBOSH SUYAGI - YUQORI QANOT VA TANA) -->
        <g id="pelvis-ilium" class="cursor-pointer group" onclick="Module4.selectPelvisPart('ilium')">
          <path d="M120,80 Q230,30 340,90 Q330,190 260,220 Q200,220 180,210 Q130,170 120,80 Z" fill="${isFused ? '#3b82f6' : 'url(#iliumGrad)'}" opacity="0.9" stroke="#38bdf8" stroke-width="2" class="group-hover:brightness-110" />
          <!-- Crista iliaca outline -->
          <path d="M120,80 Q230,30 340,90" stroke="#93c5fd" stroke-width="5" stroke-linecap="round" fill="none" />
          <text x="230" y="110" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">Os ilium (Yonbosh)</text>
          <!-- Spina iliaca pin -->
          <circle cx="125" cy="85" r="7" fill="#0284c7" />
          <circle cx="335" cy="95" r="7" fill="#0284c7" />
        </g>

        <!-- 2. OS PUBIS (QOV SUYAGI - OLDINGI VA PASTKI SHOH) -->
        <g id="pelvis-pubis" class="cursor-pointer group" onclick="Module4.selectPelvisPart('pubis')">
          <path d="M180,220 L230,230 L195,310 L150,310 Q160,260 180,220 Z" fill="${isFused ? '#3b82f6' : 'url(#pubisGrad)'}" opacity="0.9" stroke="#f97316" stroke-width="2" class="group-hover:brightness-110" />
          <text x="175" y="275" font-size="11" font-weight="bold" fill="#ffffff">Os pubis</text>
        </g>

        <!-- 3. OS ISCHII (QUYMICH SUYAGI - MASSIV ORQA-PASTKI QISM) -->
        <g id="pelvis-ischium" class="cursor-pointer group" onclick="Module4.selectPelvisPart('ischium')">
          <path d="M255,230 L295,245 Q310,330 260,370 Q210,380 205,325 L230,230 Z" fill="${isFused ? '#3b82f6' : 'url(#ischiumGrad)'}" opacity="0.9" stroke="#22c55e" stroke-width="2" class="group-hover:brightness-110" />
          <!-- Tuber ischiadicum -->
          <circle cx="275" cy="350" r="14" fill="#15803d" stroke="#86efac" stroke-width="2" />
          <text x="275" y="300" font-size="11" font-weight="bold" fill="#ffffff">Os ischii</text>
        </g>

        <!-- FORAMEN OBTURATUM (Yopqich teshik) -->
        <ellipse cx="205" cy="305" rx="22" ry="26" fill="#070b14" stroke="#475569" stroke-width="2" />
        <text x="205" y="310" text-anchor="middle" font-size="8" fill="#94a3b8">Foramen obturatum</text>

        <!-- ACETABULUM (QUYMICH KOSASI - 3 SUYAK BIRLASHGAN MARKAZ) -->
        <g id="pelvis-acetabulum" class="cursor-pointer" onclick="Module4.selectPelvisPart('acetabulum')">
          <circle cx="230" cy="225" r="32" fill="none" stroke="#f59e0b" stroke-width="4" />
          <circle cx="230" cy="225" r="28" fill="#090d16" opacity="0.6" />
          <text x="230" y="230" text-anchor="middle" font-size="9" font-weight="bold" fill="#f59e0b">Acetabulum</text>

          <!-- Y-SHAPED CARTILAGE OF ACETABULUM -->
          <g stroke="${cartilageStroke}" stroke-width="${cartilageWidth}" opacity="${cartilageOpacity}" stroke-linecap="round" fill="none">
            <!-- Stem pointing up into ilium -->
            <line x1="230" y1="225" x2="230" y2="195" />
            <!-- Branch 1 into pubis -->
            <line x1="230" y1="225" x2="204" y2="242" />
            <!-- Branch 2 into ischium -->
            <line x1="230" y1="225" x2="255" y2="242" />
          </g>
        </g>

        <!-- STATUS PANEL -->
        <rect x="20" y="390" width="420" height="36" rx="8" fill="#0d1527" stroke="rgba(56,189,248,0.3)" />
        <text x="230" y="413" text-anchor="middle" font-size="11" font-weight="bold" fill="${isFused ? '#34d399' : '#38bdf8'}">${statusTitle}</text>
      </svg>
    `;

    renderPelvisInfo(statusTitle, statusDesc);
  }

  function selectPelvisPart(partId) {
    const box = document.getElementById("pelvis-fusion-info");
    if (!box) return;

    const comp = window.ATLAS_DATA.lowerLimbData.pelvisFusion.components.find(c => c.id === partId);
    if (comp) {
      box.innerHTML = window.App.renderClinicalDossier(comp);
      return;
    }

    if (partId === "acetabulum") {
      box.innerHTML = window.App.renderClinicalDossier({
        nameUz: "Quymich kosasi",
        nameLat: "Acetabulum",
        pageRef: "Ahmedov: 24–26-betlar, 47, 48-rasmlar",
        clinicalTag: "ORTOPEDIYA VA TRAVMA",
        quickFacts: [
          "Ilium, pubis va ischium suyaklari tanalarining birlashgan markaziy chuqurligi",
          "Facies lunata (yarimoysimon tog'ayli qism) va fossa acetabuli (chuqurcha) mavjud",
          "Son suyagi boshchasi (caput femoris) bilan articulatio coxae bo'g'imini hosil qiladi"
        ],
        landmarks: "Facies lunata, incisura acetabuli, fossa acetabuli, labrum acetabulare.",
        attachments: "Ligamentum transversum acetabuli, ligamentum capitis femoris, labrum acetabulare.",
        neurovascular: "A. obturatoria tarmog'i bo'g'im ichiga a. ligamenti capitis femoris bo'lib kiradi.",
        clinicalNote: "Chanoq-son bo'g'imi displaziyasi (tug'ma son chiqishi) chaqaloqlarda acetabulumning yassiligi sababli ro'y beradi (Ortolani-Barlow sinamasi). Katta yoshda koksartroz eng og'ir nogironlikka sabab bo'ladi va chanoq kosasini sun'iy endoprotezlash talab qilinadi.",
        desc: "Chanoq suyagida yonbosh, qov va quymich suyaklari birlashgan joydagi chuqur kosa; son suyagi boshchasi kirib turadi."
      });
      return;
    }

    renderPelvisInfo(partId.toUpperCase(), "");
  }

  function renderPelvisInfo(title, desc) {
    const box = document.getElementById("pelvis-fusion-info");
    if (!box) return;
    box.innerHTML = `
      <div class="glass-panel p-5 rounded-2xl border-cyan-500/40 border animate-fadeIn">
        <h4 class="text-base font-bold text-cyan-300 mb-2">${title}</h4>
        <p class="text-sm text-slate-300 leading-relaxed">${desc}</p>
      </div>
    `;
  }

  // 2. SON SUYAGI VA KOLLODIAFIZ BURCHAGI (ERKAKLAR 130° VS AYOLLAR 90-115°) — 2D VECTOR
  function initFemurGender() {
    const toggleBtn = document.getElementById("btn-toggle-femur-gender");

    drawFemurSvg();

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        femurGender = femurGender === "male" ? "female" : "male";
        toggleBtn.innerHTML = femurGender === "male"
          ? '<i class="fa-solid fa-venus-mars mr-2 text-cyan-400"></i> Ayollar burchagini ko\'rish (115–120° / ~90°)'
          : '<i class="fa-solid fa-venus-mars mr-2 text-rose-400"></i> Erkaklar burchagini ko\'rish (130°)';
        drawFemurSvg();
      });
    }
  }

  function drawFemurSvg() {
    const container = document.getElementById("femur-svg-container");
    if (!container) return;

    // Angle and coordinates
    const isMale = femurGender === "male";
    const angleText = isMale ? "130°" : "118° (To'g'ri burchakka yaqin)";
    const headX = isMale ? 145 : 125;
    const headY = isMale ? 100 : 130;

    container.innerHTML = `
      <svg viewBox="0 0 440 420" class="w-full h-auto max-h-[390px] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <defs>
          <radialGradient id="femurBoneGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="80%" stop-color="#cbd5e1" />
            <stop offset="100%" stop-color="#94a3b8" />
          </radialGradient>
        </defs>

        <!-- SHAFT OF FEMUR (DIAFIZ) -->
        <path d="M220,170 Q225,260 220,340" stroke="url(#femurBoneGrad)" stroke-width="22" stroke-linecap="round" fill="none" />

        <!-- TROCHANTER MAJOR (Katta ko'st) -->
        <polygon points="215,140 245,150 235,185 208,180" fill="#94a3b8" stroke="#38bdf8" stroke-width="1.5" />
        <text x="255" y="165" font-size="10" font-weight="bold" fill="#38bdf8">Trochanter major</text>

        <!-- TROCHANTER MINOR (Kichik ko'st) -->
        <ellipse cx="205" cy="195" rx="8" ry="6" fill="#64748b" />

        <!-- COLLUM FEMORIS (BO'YINCHA) -->
        <path d="M210,165 L${headX + 15},${headY + 10}" stroke="url(#femurBoneGrad)" stroke-width="18" stroke-linecap="round" />

        <!-- CAPUT FEMORIS (SHARSIMON BOSHI) -->
        <circle cx="${headX}" cy="${headY}" r="22" fill="#e2e8f0" stroke="#38bdf8" stroke-width="2" />
        <circle cx="${headX - 4}" cy="${headY}" r="4" fill="#0f172a" /> <!-- Fovea capitis -->
        <text x="${headX - 10}" y="${headY - 28}" font-size="10" font-weight="bold" fill="#f59e0b">Caput femoris</text>

        <!-- ANGLE ARCS AND LINES (KOLLODIAFIZ BURCHAGI) -->
        <!-- Shaft vertical axis -->
        <line x1="220" y1="60" x2="220" y2="340" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,4" />
        <!-- Neck axis line -->
        <line x1="220" y1="165" x2="${headX - 20}" y2="${headY - 15}" stroke="#f43f5e" stroke-width="2" />

        <!-- Arc indicator -->
        <circle cx="220" cy="165" r="28" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="25,90" />
        <text x="180" y="140" font-size="13" font-weight="bold" fill="#f59e0b">${angleText}</text>

        <!-- PATELLA (TIZZA QOPQOG'I - ENG KATTA SESAMASIMON SUYAK) -->
        <g id="femur-patella" class="cursor-pointer group" transform="translate(320, 240)" onclick="Module4.selectFemurPart('patella')">
          <path d="M0,0 Q25,-10 50,0 Q60,25 25,50 Q-10,25 0,0 Z" fill="#fed7aa" stroke="#f97316" stroke-width="2" class="group-hover:brightness-110" />
          <text x="25" y="28" text-anchor="middle" font-size="9" font-weight="bold" fill="#7c2d12">Patella</text>
          <text x="25" y="68" text-anchor="middle" font-size="9" fill="#fdba74">Eng katta sesamasimon (Bosing)</text>
        </g>

        <!-- DISTAL CONDYLES (DO'NGLAR) -->
        <ellipse cx="205" cy="350" rx="18" ry="14" fill="#cbd5e1" stroke="#0284c7" stroke-width="1.5" />
        <ellipse cx="235" cy="350" rx="18" ry="14" fill="#cbd5e1" stroke="#0284c7" stroke-width="1.5" />
        <text x="220" y="385" text-anchor="middle" font-size="10" font-weight="bold" fill="#94a3b8">Condylus medialis et lateralis</text>
      </svg>
    `;

    renderFemurAngleInfo(isMale);
  }

  function renderFemurAngleInfo(isMale) {
    const box = document.getElementById("femur-angle-info");
    if (!box) return;

    const femur = window.ATLAS_DATA.lowerLimbData.freeLimb.femur;
    const genderNote = isMale 
      ? `Erkaklarda chanoq nisbatan tor va baland bo'lganligi sababli, son suyagi kollodiafiz burchagi normada ~130° ni tashkil qiladi.` 
      : `Ayollarda chanoq kengroq va yassiroq bo'lganligi sababli, son suyaklari tizzaga qarab ko'proq qiyalanadi. Natijada kollodiafiz burchagi kichikroq bo'lib (115–120° / deyarli to'g'ri burchakka yaqinlashadi). Keksayganda osteoporoz sababli son bo'yinchasi sinishi xavfi keskin oshadi.`;

    box.innerHTML = `
      ${window.App.renderClinicalDossier(femur)}
      <div class="mt-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
        <span class="font-bold text-amber-400 block mb-1"><i class="fa-solid fa-venus-mars mr-1"></i>Jinsiy tafovut (Kollodiafiz burchagi):</span>
        <p class="leading-relaxed">${genderNote}</p>
      </div>
    `;
  }

  function selectFemurPart(partId) {
    const box = document.getElementById("femur-angle-info");
    if (!box) return;

    if (partId === "patella") {
      box.innerHTML = window.App.renderClinicalDossier(window.ATLAS_DATA.lowerLimbData.freeLimb.patella);
    } else {
      renderFemurAngleInfo(femurGender === "male");
    }
  }

  // 3. OYOQ PANJASI VA GUMBAZ BIOMEXANIKASI (Arcus pedis)
  function initFootArchBiomechanics() {
    footArchCanvas = document.getElementById("foot-arch-canvas");
    if (footArchCanvas) {
      footArchCtx = footArchCanvas.getContext("2d");
      const rect = footArchCanvas.getBoundingClientRect();
      footArchCanvas.width = rect.width * 2;
      footArchCanvas.height = rect.height * 2;
      footArchCtx.scale(2, 2);
    }

    const loadSlider = document.getElementById("foot-load-slider");
    const loadVal = document.getElementById("foot-load-val");

    if (loadSlider) {
      loadSlider.addEventListener("input", (e) => {
        footLoad = parseInt(e.target.value);
        if (loadVal) loadVal.innerText = footLoad + " kg";
        drawFootArchBiomechanics();
      });
    }

    drawFootArchBiomechanics();
  }

  function drawFootArchBiomechanics() {
    if (!footArchCanvas || !footArchCtx) return;
    const w = footArchCanvas.width / 2;
    const h = footArchCanvas.height / 2;
    footArchCtx.clearRect(0, 0, w, h);

    // Arch spring deflection under weight
    const maxDeflection = 22; // mm
    const deflection = (footLoad / 120) * maxDeflection;

    const heelX = 80;
    const heelY = h - 60;
    const ballX = w - 80;
    const ballY = h - 60;
    const talusX = 160;
    const baseTalusY = h - 160;
    const currentTalusY = baseTalusY + deflection;

    // Ground line
    footArchCtx.beginPath();
    footArchCtx.moveTo(40, h - 50);
    footArchCtx.lineTo(w - 40, h - 50);
    footArchCtx.strokeStyle = "#334155";
    footArchCtx.lineWidth = 3;
    footArchCtx.stroke();

    // Heel bone (Calcaneus)
    footArchCtx.beginPath();
    footArchCtx.ellipse(heelX, heelY - 15, 30, 20, -0.2, 0, Math.PI * 2);
    footArchCtx.fillStyle = "#64748b";
    footArchCtx.fill();
    footArchCtx.strokeStyle = "#38bdf8";
    footArchCtx.lineWidth = 2;
    footArchCtx.stroke();
    footArchCtx.font = "bold 10px sans-serif";
    footArchCtx.fillStyle = "#ffffff";
    footArchCtx.fillText("Calcaneus", heelX - 25, heelY - 12);

    // Metatarsal heads (Ball of foot)
    footArchCtx.beginPath();
    footArchCtx.ellipse(ballX, ballY - 12, 24, 15, 0.1, 0, Math.PI * 2);
    footArchCtx.fillStyle = "#64748b";
    footArchCtx.fill();
    footArchCtx.strokeStyle = "#38bdf8";
    footArchCtx.lineWidth = 2;
    footArchCtx.stroke();
    footArchCtx.fillText("Metatarsus", ballX - 25, ballY - 10);

    // Talus (Keystone of the arch)
    footArchCtx.beginPath();
    footArchCtx.ellipse(talusX, currentTalusY, 26, 20, 0, 0, Math.PI * 2);
    footArchCtx.fillStyle = "#0284c7";
    footArchCtx.fill();
    footArchCtx.strokeStyle = "#38bdf8";
    footArchCtx.lineWidth = 2.5;
    footArchCtx.stroke();
    footArchCtx.fillText("Talus", talusX - 12, currentTalusY + 4);

    // Arch elastic beams (Bo'ylama gumbaz nurlari)
    footArchCtx.beginPath();
    footArchCtx.moveTo(heelX + 15, heelY - 20);
    footArchCtx.lineTo(talusX - 10, currentTalusY + 10);
    footArchCtx.lineTo(ballX - 15, ballY - 15);
    footArchCtx.strokeStyle = "#f59e0b";
    footArchCtx.lineWidth = 6;
    footArchCtx.lineCap = "round";
    footArchCtx.stroke();

    // Plantar aponeurosis / tie-rod (Ostki prujina bog'lam)
    footArchCtx.beginPath();
    footArchCtx.moveTo(heelX + 10, heelY - 5);
    footArchCtx.lineTo(ballX - 10, ballY - 5);
    footArchCtx.strokeStyle = "#34d399";
    footArchCtx.lineWidth = 3;
    footArchCtx.setLineDash([6, 4]);
    footArchCtx.stroke();
    footArchCtx.setLineDash([]);
    footArchCtx.fillStyle = "#34d399";
    footArchCtx.font = "10px sans-serif";
    footArchCtx.fillText("Plantar aponevroz (Prujina tortqisi)", w / 2 - 80, heelY + 12);

    // Weight vector arrow pointing down into Talus
    const arrowLen = Math.max( 20 + footLoad * 0.5, 30 );
    footArchCtx.beginPath();
    footArchCtx.moveTo(talusX, currentTalusY - arrowLen);
    footArchCtx.lineTo(talusX, currentTalusY - 22);
    footArchCtx.strokeStyle = "#f43f5e";
    footArchCtx.lineWidth = 4;
    footArchCtx.stroke();

    // Arrowhead
    footArchCtx.beginPath();
    footArchCtx.moveTo(talusX - 6, currentTalusY - 30);
    footArchCtx.lineTo(talusX, currentTalusY - 20);
    footArchCtx.lineTo(talusX + 6, currentTalusY - 30);
    footArchCtx.fillStyle = "#f43f5e";
    footArchCtx.fill();

    footArchCtx.fillStyle = "#f43f5e";
    footArchCtx.font = "bold 11px sans-serif";
    footArchCtx.fillText(`Og'irlik kuchi: ${footLoad} kg`, talusX + 12, currentTalusY - arrowLen / 2);

    // Shock absorption percentage indicator
    const absorption = Math.min( 85 - (footLoad > 100 ? (footLoad - 100) * 0.4 : 0), 85 );
    footArchCtx.fillStyle = "#38bdf8";
    footArchCtx.font = "12px sans-serif";
    footArchCtx.fillText(`Zarba so'nish samaradorligi: ~${Math.round(absorption)}%`, 60, 35);
  }

  return {
    init,
    selectPelvisPart,
    selectFemurPart
  };
})();
