/**
 * 5-MODUL: BOSH SKELETI / CRANIUM (69–113-rasmlar, 33–52-betlar)
 * Exploded View Skull Simulator (Neurocranium vs Viscerocranium),
 * Mandibula burchagi evolyutsiyasi, Kalla bo'shliqlari va asosi (Basis cranii interna - 12 nervlar),
 * Chaqaloq kallasi va Liqildoqlar vaqt shkalasi
 */

window.Module5 = (function() {
  let isSkullExploded = false;
  let activeSkullPart = "frontale";
  let infantAgeMonth = 0; // 0 to 24 months
  let activeFossaTab = "media";

  function init() {
    initSkullExploder();
    initMandibleAngleSimulator();
    initSkullCavitiesAndBase();
    initInfantSkullTimeline();
  }

  // 1. "EXPLODED VIEW" KALLA SIMULYATORI (2D VECTOR)
  function initSkullExploder() {
    const explodeBtn = document.getElementById("btn-explode-skull");

    drawSkullSvg();

    if (explodeBtn) {
      explodeBtn.addEventListener("click", () => {
        isSkullExploded = !isSkullExploded;
        explodeBtn.innerHTML = isSkullExploded
          ? '<i class="fa-solid fa-compress mr-2 text-amber-400"></i> Kallani yig\'ish (Assembled Skull)'
          : '<i class="fa-solid fa-burst mr-2 text-cyan-400"></i> Kallani qismlarga ajratish (Exploded View)';
        drawSkullSvg();
      });
    }

    renderSkullPartInfo(activeSkullPart);
  }

  function drawSkullSvg() {
    const container = document.getElementById("skull-svg-container");
    if (!container) return;

    // Displacement offsets when exploded
    const offFrontY = isSkullExploded ? -55 : 0;
    const offParietY = isSkullExploded ? -75 : 0;
    const offOccipX = isSkullExploded ? -70 : 0;
    const offOccipY = isSkullExploded ? -25 : 0;
    const offTempX = isSkullExploded ? -55 : 0;
    const offTempY = isSkullExploded ? 30 : 0;
    const offSphenX = isSkullExploded ? -20 : 0;
    const offSphenY = isSkullExploded ? 15 : 0;
    const offMaxY = isSkullExploded ? 45 : 0;
    const offMandY = isSkullExploded ? 95 : 0;
    const offZygomX = isSkullExploded ? 65 : 0;

    container.innerHTML = `
      <svg viewBox="0 0 520 480" class="w-full h-auto max-h-[460px] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <defs>
          <radialGradient id="neuroGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#0369a1" />
          </radialGradient>
          <radialGradient id="viscGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#b45309" />
          </radialGradient>
        </defs>

        <!-- 1. OS OCCIPITALE (ENSA SUYAGI - ORQA-PASTKI) -->
        <g id="skull-occipitale" style="transform: translate(${offOccipX}px, ${offOccipY}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer group" onclick="Module5.selectSkullPart('occipitale')">
          <path d="M120,230 Q100,160 150,110 L180,180 Q140,240 120,230 Z" fill="#38bdf8" opacity="0.85" stroke="#ffffff" stroke-width="1.5" class="group-hover:opacity-100" />
          <text x="110" y="180" font-size="10" font-weight="bold" fill="#38bdf8">Os occipitale</text>
        </g>

        <!-- 2. OS PARIETALE (TEPA SUYAGI - TEPADA ORQAROQDA) -->
        <g id="skull-parietale" style="transform: translateY(${offParietY}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer group" onclick="Module5.selectSkullPart('parietale')">
          <path d="M150,110 Q220,60 280,80 Q290,130 250,165 L180,180 Z" fill="#38bdf8" opacity="0.9" stroke="#ffffff" stroke-width="1.5" class="group-hover:opacity-100" />
          <text x="220" y="115" font-size="11" font-weight="bold" fill="#ffffff">Os parietale</text>
        </g>

        <!-- 3. OS FRONTALE (PESHONA SUYAGI - TEPADA OLDINDA) -->
        <g id="skull-frontale" style="transform: translateY(${offFrontY}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer group" onclick="Module5.selectSkullPart('frontale')">
          <path d="M280,80 Q350,100 360,170 L300,185 Q290,130 280,80 Z" fill="#0284c7" opacity="0.95" stroke="#ffffff" stroke-width="1.5" class="group-hover:opacity-100" />
          <text x="330" y="130" font-size="11" font-weight="bold" fill="#ffffff">Os frontale</text>
        </g>

        <!-- 4. OS TEMPORALE (CHAKKA SUYAGI - YON TOMONDA) -->
        <g id="skull-temporale" style="transform: translate(${offTempX}px, ${offTempY}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer group" onclick="Module5.selectSkullPart('temporale')">
          <ellipse cx="205" cy="225" rx="35" ry="28" fill="#0284c7" stroke="#ffffff" stroke-width="1.5" class="group-hover:opacity-100" />
          <circle cx="205" cy="230" r="6" fill="#090d16" stroke="#38bdf8" stroke-width="1.5" /> <!-- Porus acusticus externus -->
          <text x="205" y="270" text-anchor="middle" font-size="10" font-weight="bold" fill="#38bdf8">Os temporale</text>
        </g>

        <!-- 5. OS SPHENOIDALE (PONASIMON SUYAK - MARKAZIY KALIT) -->
        <g id="skull-sphenoidale" style="transform: translate(${offSphenX}px, ${offSphenY}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer group" onclick="Module5.selectSkullPart('sphenoidale')">
          <polygon points="265,185 295,190 285,225 255,220" fill="#0ea5e9" stroke="#ffffff" stroke-width="1.5" class="group-hover:opacity-100" />
          <text x="275" y="210" text-anchor="middle" font-size="8" font-weight="bold" fill="#ffffff">Sphenoid</text>
        </g>

        <!-- 6. OS ZYGOMATICUM (YONOQ SUYAGI) -->
        <g id="skull-zygomaticum" style="transform: translateX(${offZygomX}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer group" onclick="Module5.selectSkullPart('zygomaticum')">
          <polygon points="305,215 350,225 330,260 295,245" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5" class="group-hover:opacity-100" />
          <text x="340" y="245" font-size="10" font-weight="bold" fill="#f59e0b">Os zygomaticum</text>
        </g>

        <!-- 7. MAXILLA (YUQORI JAG' SUYAGI - BURUN VA KO'Z TAGI) -->
        <g id="skull-maxilla" style="transform: translateY(${offMaxY}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer group" onclick="Module5.selectSkullPart('maxilla')">
          <path d="M300,245 L350,235 L360,290 L310,295 Z" fill="#d97706" stroke="#ffffff" stroke-width="1.5" class="group-hover:opacity-100" />
          <ellipse cx="335" cy="205" rx="14" ry="16" fill="#090d16" stroke="#38bdf8" stroke-width="1.5" /> <!-- Eye orbit lower rim -->
          <text x="345" y="315" font-size="11" font-weight="bold" fill="#f59e0b">Maxilla</text>
        </g>

        <!-- 8. MANDIBULA (PASTKI JAG' SUYAGI - HARAKATCHAN) -->
        <g id="skull-mandibula" style="transform: translateY(${offMandY}px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" class="cursor-pointer group" onclick="Module5.selectSkullPart('mandibula')">
          <path d="M225,235 L220,325 Q230,360 300,360 L350,350 L340,325 L260,325 L245,235 Z" fill="#b45309" stroke="#ffffff" stroke-width="2" class="group-hover:opacity-100" />
          <!-- Processus condylaris joint -->
          <circle cx="225" cy="235" r="5" fill="#fcd34d" />
          <text x="280" y="348" font-size="11" font-weight="bold" fill="#ffffff">Mandibula</text>
        </g>
      </svg>
    `;
  }

  function selectSkullPart(partKey) {
    activeSkullPart = partKey;
    renderSkullPartInfo(partKey);

    // GSAP visual emphasis
    if (window.gsap) {
      gsap.fromTo(`#skull-${partKey}`, { scale: 0.95 }, { scale: 1.1, duration: 0.25, yoyo: true, repeat: 1 });
    }
  }

  function renderSkullPartInfo(partKey) {
    const box = document.getElementById("skull-part-info");
    if (!box) return;

    const neuro = window.ATLAS_DATA.skullData.neurocranium.find(x => x.id === partKey);
    const visc = window.ATLAS_DATA.skullData.viscerocranium.find(x => x.id === partKey);
    const item = neuro || visc;
    if (!item) return;

    box.innerHTML = window.App.renderClinicalDossier(item);
  }

  // 2. PASTKI JAG' BURCHAGI (Angulus mandibulae) EVOLYUTSIYASI — 2D VECTOR
  function initMandibleAngleSimulator() {
    const slider = document.getElementById("mandible-age-slider");
    if (slider) {
      slider.addEventListener("input", (e) => {
        const stageIndex = parseInt(e.target.value); // 0: Chaqaloq, 1: Katta, 2: Keksa
        updateMandibleSimulation(stageIndex);
      });
      updateMandibleSimulation(1);
    }
  }

  function updateMandibleSimulation(stageIndex) {
    const list = window.ATLAS_DATA.skullData.viscerocranium.find(x => x.id === "mandibula").angleProgression;
    const item = list[stageIndex];
    if (!item) return;

    document.getElementById("mandible-stage-title").innerText = item.stage;
    document.getElementById("mandible-angle-badge").innerText = item.angle;
    document.getElementById("mandible-stage-desc").innerText = item.desc;

    drawMandibleAngleSvg(stageIndex);
  }

  function drawMandibleAngleSvg(stageIndex) {
    const container = document.getElementById("mandible-angle-svg-container");
    if (!container) return;

    const list = window.ATLAS_DATA.skullData.viscerocranium.find(x => x.id === "mandibula").angleProgression;
    const item = list[stageIndex];
    if (!item) return;

    let angleDeg = 120;
    if (stageIndex === 0) angleDeg = 145; // Baby
    if (stageIndex === 1) angleDeg = 115; // Adult
    if (stageIndex === 2) angleDeg = 142; // Elderly

    container.innerHTML = `
      <svg viewBox="0 0 320 220" class="w-full h-auto select-none">
        <!-- Mandible ramus & corpus -->
        <g transform="translate(40, 20)">
          <!-- Ramus -->
          <line x1="80" y1="20" x2="100" y2="120" stroke="#f59e0b" stroke-width="12" stroke-linecap="round" />
          <!-- Corpus angled by angleDeg -->
          <path d="M100,120 L${100 + 130 * Math.cos((180 - angleDeg) * Math.PI / 180)},${120 - 130 * Math.sin((180 - angleDeg) * Math.PI / 180)}" stroke="#f59e0b" stroke-width="16" stroke-linecap="round" />
          
          <!-- Angle vertex pin -->
          <circle cx="100" cy="120" r="10" fill="#ef4444" />
          <circle cx="100" cy="120" r="28" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="25,60" />
          <text x="140" y="115" font-size="16" font-weight="bold" fill="#f59e0b">${item.angle}</text>
          <text x="90" y="150" font-size="10" fill="#94a3b8">Angulus mandibulae</text>
        </g>
      </svg>
    `;
  }

  // 3. KALLA ASOSI VA 12 TA ASAB YO'LLARI (Basis cranii interna)
  function initSkullCavitiesAndBase() {
    renderFossaTab("media");
  }

  function renderFossaTab(fossaId) {
    activeFossaTab = fossaId;
    const baseData = window.ATLAS_DATA.skullData.skullCavities.find(x => x.id === "basis_cranii_interna");
    if (!baseData) return;

    const fossaIndex = fossaId === "anterior" ? 0 : (fossaId === "media" ? 1 : 2);
    const f = baseData.fossae[fossaIndex];
    const infoBox = document.getElementById("fossa-detail-info");

    if (infoBox) {
      infoBox.innerHTML = window.App.renderClinicalDossier({
        nameUz: f.nameUz,
        nameLat: f.nameLat,
        pageRef: "Ahmedov: 52–53-betlar, 110, 111-rasmlar",
        clinicalTag: "TOPOGRAFIK NEYROANATOMIYA",
        quickFacts: [
          `Devorlari: ${f.bones}`,
          fossaId === "anterior" ? "I juft — hid bilish nervlari (nn. olfactorii) lamina cribrosa teshiklaridan o'tadi" :
          fossaId === "media" ? "II (ko'rish), III, IV, VI va V nervlar hamda a. meningea media (foramen spinosum) o'tadi" :
          "IX, X, XI (foramen jugulare), XII (canalis hypoglossi) va foramen magnum (uzunchoq miya, a. vertebralis) o'tadi",
          "Bosh miya asosining eng muhim jarrohlik va diagnostika sohasi"
        ],
        landmarks: f.bones,
        neurovascular: f.contents,
        clinicalNote: fossaId === "anterior" 
          ? "Oldingi kalla chuqurchasi singanda 'ko'zoynak simptomi' (ko'z atrofida qon to'planishi) va burundan likvor oqishi (rinolikvoreya) kuzatiladi." 
          : fossaId === "media"
          ? "O'rta kalla chuqurchasi sinishida chakka suyagi piramidasi yorilib, quloqdan qon/likvor (otolikvoreya) oqishi va VII (yuz) hamda VIII (eshituv-muvozanat) nervlari zararlanishi kuzatiladi."
          : "Orqa kalla chuqurchasi hajmi kichik bo'lib, bu yerdagi gematoma yoki shish foramen magnum orqali uzunchoq miyani ezib, shoshilinch nafas va yurak to'xtashiga sabab bo'lishi mumkin.",
        desc: f.contents
      });
    }

    drawBaseCraniiSvg();
  }

  function drawBaseCraniiSvg() {
    const container = document.getElementById("basis-cranii-svg-container");
    if (!container) return;

    container.innerHTML = `
      <svg viewBox="0 0 460 520" class="w-full h-auto max-h-[480px] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <!-- BASE OUTLINE -->
        <ellipse cx="230" cy="260" rx="150" ry="210" fill="#0d1527" stroke="#38bdf8" stroke-width="2.5" />

        <!-- 1. FOSSA CRANII ANTERIOR -->
        <path d="M120,160 Q230,70 340,160 Q230,190 120,160 Z" fill="${activeFossaTab === 'anterior' ? 'rgba(56,189,248,0.3)' : 'rgba(56,189,248,0.1)'}" stroke="#38bdf8" stroke-width="2" class="cursor-pointer" onclick="Module5.renderFossaTab('anterior')" />
        <!-- Crista galli & lamina cribrosa -->
        <ellipse cx="230" cy="145" rx="6" ry="14" fill="#f59e0b" />
        <text x="230" y="125" text-anchor="middle" font-size="11" font-weight="bold" fill="#38bdf8">Fossa cranii anterior (I nerv)</text>

        <!-- 2. FOSSA CRANII MEDIA (TURK EGARI VA TESHIKLAR) -->
        <path d="M100,280 Q80,180 120,160 Q230,190 340,160 Q380,180 360,280 Q230,310 100,280 Z" fill="${activeFossaTab === 'media' ? 'rgba(245,158,11,0.25)' : 'rgba(245,158,11,0.08)'}" stroke="#f59e0b" stroke-width="2" class="cursor-pointer" onclick="Module5.renderFossaTab('media')" />
        <!-- Sella turcica -->
        <rect x="215" y="220" width="30" height="25" rx="4" fill="#eab308" stroke="#ffffff" stroke-width="1.5" />
        <text x="230" y="237" text-anchor="middle" font-size="8" font-weight="bold" fill="#000">Sella</text>
        
        <!-- Canalis opticus (II) -->
        <circle cx="210" cy="205" r="5" fill="#ef4444" />
        <circle cx="250" cy="205" r="5" fill="#ef4444" />
        <!-- Foramen rotundum & ovale -->
        <circle cx="195" cy="235" r="4" fill="#34d399" />
        <circle cx="190" cy="255" r="5" fill="#34d399" />
        <circle cx="265" cy="235" r="4" fill="#34d399" />
        <circle cx="270" cy="255" r="5" fill="#34d399" />
        <text x="230" y="195" text-anchor="middle" font-size="11" font-weight="bold" fill="#f59e0b">Fossa cranii media (II-VI nervlar)</text>

        <!-- 3. FOSSA CRANII POSTERIOR (FORAMEN MAGNUM VA MIYACHA) -->
        <path d="M100,280 Q230,310 360,280 Q340,440 230,460 Q120,440 100,280 Z" fill="${activeFossaTab === 'posterior' ? 'rgba(244,63,94,0.25)' : 'rgba(244,63,94,0.08)'}" stroke="#f43f5e" stroke-width="2" class="cursor-pointer" onclick="Module5.renderFossaTab('posterior')" />
        <!-- Foramen magnum (Katta ensa teshigi) -->
        <ellipse cx="230" cy="370" rx="26" ry="34" fill="#070b14" stroke="#ffffff" stroke-width="2.5" />
        <text x="230" y="375" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">Foramen magnum</text>
        <!-- Foramen jugulare (IX, X, XI) -->
        <ellipse cx="185" cy="340" rx="6" ry="9" fill="#0ea5e9" />
        <ellipse cx="275" cy="340" rx="6" ry="9" fill="#0ea5e9" />
        <text x="230" y="435" text-anchor="middle" font-size="11" font-weight="bold" fill="#f43f5e">Fossa cranii posterior (IX-XII)</text>
      </svg>
    `;
  }

  // 4. CHAQALOQ KALLASI VA LIQILDOQLAR VAQT SHKALASI (112, 113-rasmlar)
  function initInfantSkullTimeline() {
    const slider = document.getElementById("fontanelle-age-slider");
    const ageVal = document.getElementById("fontanelle-age-val");
    if (!slider) return;

    slider.addEventListener("input", (e) => {
      infantAgeMonth = parseInt(e.target.value);
      if (ageVal) {
        if (infantAgeMonth < 12) {
          ageVal.innerText = infantAgeMonth + " oylik";
        } else {
          ageVal.innerText = (infantAgeMonth / 12).toFixed(1) + " yosh";
        }
      }
      drawInfantSkullSvg();
    });

    drawInfantSkullSvg();
  }

  function drawInfantSkullSvg() {
    const container = document.getElementById("infant-skull-svg-container");
    if (!container) return;

    // Fontanelle status based on age
    const isPostClosed = infantAgeMonth >= 2;
    const isLatClosed = infantAgeMonth >= 3;
    const isAntClosed = infantAgeMonth >= 24;

    container.innerHTML = `
      <svg viewBox="0 0 420 360" class="w-full h-auto max-h-[340px] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <!-- TOP VIEW OF INFANT SKULL (113-rasm) -->
        <!-- Frontal bones (2 halves) -->
        <path d="M140,150 Q140,80 210,60 L210,150 Z" fill="#38bdf8" opacity="0.8" stroke="#ffffff" stroke-width="1.5" />
        <path d="M280,150 Q280,80 210,60 L210,150 Z" fill="#38bdf8" opacity="0.8" stroke="#ffffff" stroke-width="1.5" />
        
        <!-- Parietal bones (2 halves) -->
        <path d="M140,150 L210,150 L210,260 Q140,240 140,150 Z" fill="#0284c7" opacity="0.8" stroke="#ffffff" stroke-width="1.5" />
        <path d="M280,150 L210,150 L210,260 Q280,240 280,150 Z" fill="#0284c7" opacity="0.8" stroke="#ffffff" stroke-width="1.5" />

        <!-- Occipital bone -->
        <path d="M160,260 L210,260 L260,260 Q210,310 160,260 Z" fill="#0369a1" opacity="0.8" stroke="#ffffff" stroke-width="1.5" />

        <!-- FONTICULUS ANTERIOR (OLDINGI KATTA ROMBSIMON LIQILDOQ - 2 YOSHDA BITADI) -->
        <polygon points="210,120 230,150 210,180 190,150" fill="${isAntClosed ? '#0284c7' : '#f59e0b'}" stroke="${isAntClosed ? '#38bdf8' : '#ef4444'}" stroke-width="2" />
        <text x="210" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="${isAntClosed ? '#34d399' : '#f59e0b'}">
          ${isAntClosed ? "Oldingi liqildoq: Yopilgan (2 yosh)" : "Fonticulus anterior (Ochiq)"}
        </text>

        <!-- FONTICULUS POSTERIOR (ORQA KICHIK UCHBURCHAK LIQILDOQ - 2 OYDA BITADI) -->
        <polygon points="210,250 218,265 202,265" fill="${isPostClosed ? '#0369a1' : '#f59e0b'}" stroke="${isPostClosed ? '#38bdf8' : '#ef4444'}" stroke-width="1.5" />
        <text x="210" y="295" text-anchor="middle" font-size="10" font-weight="bold" fill="${isPostClosed ? '#34d399' : '#f59e0b'}">
          ${isPostClosed ? "Orqa liqildoq: Bitgan (2 oylik)" : "Fonticulus posterior (Ochiq)"}
        </text>
      </svg>
    `;

    renderFontanelleInfo(isAntClosed, isPostClosed, isLatClosed);
  }

  function renderFontanelleInfo(isAntClosed, isPostClosed, isLatClosed) {
    const box = document.getElementById("fontanelle-detail-info");
    if (!box) return;

    box.innerHTML = `
      <div class="glass-panel p-5 rounded-2xl border-cyan-500/40 border animate-fadeIn">
        <h4 class="text-base font-bold text-white mb-2">Chaqaloq liqildoqlari holati (${infantAgeMonth} oylik):</h4>
        <div class="space-y-2 text-xs">
          <div class="p-2 rounded bg-slate-900/60 flex items-center justify-between border border-slate-800">
            <span class="text-slate-200 font-semibold">1. Oldingi rombsimon liqildoq (Fonticulus anterior, 3.5 x 2.5 sm):</span>
            <span class="font-bold ${isAntClosed ? 'text-emerald-400' : 'text-amber-400'}">${isAntClosed ? "To'liq bitgan (1.5-2 yosh)" : "Ochiq (pulsatsiyalanadi)"}</span>
          </div>
          <div class="p-2 rounded bg-slate-900/60 flex items-center justify-between border border-slate-800">
            <span class="text-slate-200 font-semibold">2. Orqa uchburchak liqildoq (Fonticulus posterior):</span>
            <span class="font-bold ${isPostClosed ? 'text-emerald-400' : 'text-amber-400'}">${isPostClosed ? "Bitgan (2 oylikda yopilgan)" : "Ochiq"}</span>
          </div>
          <div class="p-2 rounded bg-slate-900/60 flex items-center justify-between border border-slate-800">
            <span class="text-slate-200 font-semibold">3. Ponasimon va so'rg'ichsimon yon liqildoqlar:</span>
            <span class="font-bold ${isLatClosed ? 'text-emerald-400' : 'text-amber-400'}">${isLatClosed ? "Bitgan (2-3 oylikda yopilgan)" : "Ochiq"}</span>
          </div>
        </div>
      </div>
    `;
  }

  return {
    init,
    selectSkullPart,
    renderFossaTab
  };
})();
