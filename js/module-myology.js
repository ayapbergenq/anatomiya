/**
 * ODAM ANATOMIYASI (ATLAS, 1-JILD) - PROF. N.K. AHMEDOV
 * 2-BO'LIM: MUSKULLAR HAQIDA TA'LIMOT (MIOLOGIYA - MYOLOGIA)
 * To'liq 2D vektor illyustratsiyalari, interaktiv hotspot pinlari va klinik tahlil
 */

window.ModuleMyology = (function() {
  'use strict';

  let currentSubTab = 'general'; // 'general' | 'back-thorax' | 'abdomen' | 'head-neck' | 'limbs'
  let selectedMuscle = null;

  function getMyologyData() {
    const defaultData = window.MYOLOGY_DATA || {};
    // Admin panelda kiritilgan maxsus ma'lumotlar bilan birlashtirish
    try {
      const stored = localStorage.getItem('custom_myology_entries');
      if (stored) {
        const customEntries = JSON.parse(stored);
        if (Array.isArray(customEntries) && customEntries.length > 0) {
          // Clone defaultData so we don't mutate global constant
          const merged = JSON.parse(JSON.stringify(defaultData));
          customEntries.forEach(entry => {
            const sectionKey = entry.sectionKey || 'generalMyology';
            if (sectionKey === 'generalMyology' && merged.generalMyology) {
              merged.generalMyology.shapes.push(entry);
            } else if (merged[sectionKey] && merged[sectionKey].muscles) {
              merged[sectionKey].muscles.push(entry);
            }
          });
          return merged;
        }
      }
    } catch (e) {
      console.warn('Myology data read error:', e);
    }
    return defaultData;
  }

  function init() {
    setupSubNavigation();
    renderSubSection('general');
  }

  function setupSubNavigation() {
    const tabs = document.querySelectorAll('.myology-subtab-btn');
    tabs.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-myology-tab');
        switchSubSection(target);
      };
    });
  }

  function switchSubSection(tabKey) {
    currentSubTab = tabKey;
    const tabs = document.querySelectorAll('.myology-subtab-btn');
    tabs.forEach(btn => {
      if (btn.getAttribute('data-myology-tab') === tabKey) {
        btn.classList.add('active', 'bg-cyan-500/20', 'border-cyan-500/40', 'text-cyan-300');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('active', 'bg-cyan-500/20', 'border-cyan-500/40', 'text-cyan-300');
        btn.classList.add('text-slate-400');
      }
    });

    if (window.App && typeof window.App.playUiSound === 'function') {
      window.App.playUiSound('tab');
    }

    renderSubSection(tabKey);
  }

  function renderSubSection(tabKey) {
    const data = getMyologyData();
    const diagramContainer = document.getElementById('myology-diagram-mount');
    const notesContainer = document.getElementById('myology-notes-mount');
    const titleElem = document.getElementById('myology-section-title');
    const descElem = document.getElementById('myology-section-desc');

    if (!diagramContainer || !notesContainer) return;

    if (tabKey === 'general') {
      if (titleElem) titleElem.innerHTML = `1. Umumiy miologiya va muskullar shakllari <span class="clinical-badge-latin">Myologia generalis</span>`;
      if (descElem) descElem.textContent = "Muskul to'qimasi, yordamchi apparat (aponeuroz, fassiya, pay, sinovial qinlar) va muskullarning turli morfologik shakllari (N.K. Ahmedov, 114–120-rasmlar).";
      renderGeneralShapesView(diagramContainer, notesContainer, data.generalMyology);
    } else if (tabKey === 'back-thorax') {
      if (titleElem) titleElem.innerHTML = `2. Orqa va ko'krak qafasi muskullari <span class="clinical-badge-latin">Mm. dorsi et thoracis</span>`;
      if (descElem) descElem.textContent = "Orqaning yuza va chuqur muskullari, ko'krak qafasining xususiy muskullari hamda hayotiy muhim nafas organi — diafragma (N.K. Ahmedov, 121–142-rasmlar).";
      renderBackThoraxView(diagramContainer, notesContainer, data.backAndThorax);
    } else if (tabKey === 'abdomen') {
      if (titleElem) titleElem.innerHTML = `3. Qorin va chov kanali muskullari <span class="clinical-badge-latin">Mm. abdominis & Canalis inguinalis</span>`;
      if (descElem) descElem.textContent = "Qorin old-yon devori muskullari, oq chiziq, to'g'ri muskul qini va chov kanalining xirurgik anatomiyasi, churralar topografiyasi (N.K. Ahmedov, 143–158-rasmlar).";
      renderAbdomenView(diagramContainer, notesContainer, data.abdomenAndInguinal);
    } else if (tabKey === 'head-neck') {
      if (titleElem) titleElem.innerHTML = `4. Bosh, yuz va bo'yin muskullari <span class="clinical-badge-latin">Mm. capitis et colli</span>`;
      if (descElem) descElem.textContent = "Chaynash va mimika muskullari, bo'yinning yuza, o'rta va chuqur muskullari, V.N. Shevkunenko fassiyalari va bo'yin uchburchaklari (N.K. Ahmedov, 159–185-rasmlar).";
      renderHeadNeckView(diagramContainer, notesContainer, data.headAndNeck);
    } else if (tabKey === 'limbs') {
      if (titleElem) titleElem.innerHTML = `5. Qo'l va oyoq muskullari <span class="clinical-badge-latin">Mm. membrorum superioris et inferioris</span>`;
      if (descElem) descElem.textContent = "Yelka kamari, yelka, bilak va panja muskullari; chanoq, son, boldir va tovonning baquvvat lokomotor muskullari (N.K. Ahmedov, 186–220-rasmlar).";
      renderLimbsView(diagramContainer, notesContainer, data.limbs);
    }
  }

  // =========================================================================
  // 1. GENERAL SHAPES VIEW (2D VECTOR)
  // =========================================================================
  function renderGeneralShapesView(diagramMount, notesMount, sectionData) {
    if (!sectionData || !sectionData.shapes) return;

    // SVG Diagram with 6 distinct muscle shapes
    diagramMount.innerHTML = `
      <div class="relative w-full h-[540px] flex items-center justify-center p-2">
        <svg viewBox="0 0 760 520" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="muscleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f87171" stop-opacity="0.9" />
              <stop offset="50%" stop-color="#ef4444" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#b91c1c" stop-opacity="0.9" />
            </linearGradient>
            <linearGradient id="tendonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#e2e8f0" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.95" />
            </linearGradient>
            <filter id="glow-myo" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- Grid Background & Header Telemetry -->
          <rect x="10" y="10" width="740" height="500" rx="16" fill="rgba(15,23,42,0.6)" stroke="rgba(56,189,248,0.2)" stroke-width="1.5" />
          <text x="30" y="42" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">SYSTEMA MUSCULORUM // MORPHOLOGIA (SHAKLLAR)</text>
          <text x="590" y="42" fill="#94a3b8" font-family="monospace" font-size="11">114–120-RASMLAR</text>

          <!-- 1. Urchuqsimon (m. fusiformis) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('fusiformis')">
            <rect x="30" y="60" width="220" height="200" rx="12" fill="rgba(30,41,59,0.5)" stroke="rgba(56,189,248,0.3)" class="transition-all group-hover:stroke-cyan-400 group-hover:fill-cyan-950/20" />
            <!-- Upper tendon -->
            <path d="M140,80 L140,110" stroke="url(#tendonGrad1)" stroke-width="8" stroke-linecap="round" />
            <!-- Muscle Belly -->
            <path d="M140,110 C165,130 170,170 140,195 C110,170 115,130 140,110 Z" fill="url(#muscleGrad1)" stroke="#dc2626" stroke-width="2" />
            <!-- Lower tendon -->
            <path d="M140,195 L140,225" stroke="url(#tendonGrad1)" stroke-width="8" stroke-linecap="round" />
            <!-- Pin -->
            <g class="pin-hotspot" transform="translate(140,150)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">1</text>
            </g>
            <text x="140" y="246" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="bold">Urchuqsimon (Fusiformis)</text>
          </g>

          <!-- 2. Ikki boshli (m. biceps) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('biceps')">
            <rect x="270" y="60" width="220" height="200" rx="12" fill="rgba(30,41,59,0.5)" stroke="rgba(56,189,248,0.3)" class="transition-all group-hover:stroke-cyan-400 group-hover:fill-cyan-950/20" />
            <!-- Two proksimal tendons -->
            <path d="M350,80 L365,115" stroke="url(#tendonGrad1)" stroke-width="6" stroke-linecap="round" />
            <path d="M410,80 L395,115" stroke="url(#tendonGrad1)" stroke-width="6" stroke-linecap="round" />
            <!-- Two heads merging -->
            <path d="M365,115 C350,135 355,160 380,185 C405,160 410,135 395,115 C388,130 372,130 365,115 Z" fill="url(#muscleGrad1)" stroke="#dc2626" stroke-width="2" />
            <!-- Common distal tendon -->
            <path d="M380,185 L380,225" stroke="url(#tendonGrad1)" stroke-width="8" stroke-linecap="round" />
            <!-- Pin -->
            <g class="pin-hotspot" transform="translate(380,150)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">2</text>
            </g>
            <text x="380" y="246" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="bold">Ikki boshli (Biceps)</text>
          </g>

          <!-- 3. Uch boshli (m. triceps) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('triceps')">
            <rect x="510" y="60" width="220" height="200" rx="12" fill="rgba(30,41,59,0.5)" stroke="rgba(56,189,248,0.3)" class="transition-all group-hover:stroke-cyan-400 group-hover:fill-cyan-950/20" />
            <!-- 3 tendons -->
            <path d="M575,80 L595,115" stroke="url(#tendonGrad1)" stroke-width="5" stroke-linecap="round" />
            <path d="M620,75 L620,115" stroke="url(#tendonGrad1)" stroke-width="5" stroke-linecap="round" />
            <path d="M665,80 L645,115" stroke="url(#tendonGrad1)" stroke-width="5" stroke-linecap="round" />
            <!-- 3 bellies merged -->
            <path d="M595,115 C575,140 580,170 620,195 C660,170 665,140 645,115 C635,128 625,128 620,115 C615,128 605,128 595,115 Z" fill="url(#muscleGrad1)" stroke="#dc2626" stroke-width="2" />
            <path d="M620,195 L620,225" stroke="url(#tendonGrad1)" stroke-width="9" stroke-linecap="round" />
            <!-- Pin -->
            <g class="pin-hotspot" transform="translate(620,155)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">3</text>
            </g>
            <text x="620" y="246" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="bold">Uch boshli (Triceps)</text>
          </g>

          <!-- 4. To'rt boshli (m. quadriceps) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('quadriceps')">
            <rect x="30" y="280" width="220" height="210" rx="12" fill="rgba(30,41,59,0.5)" stroke="rgba(56,189,248,0.3)" class="transition-all group-hover:stroke-cyan-400 group-hover:fill-cyan-950/20" />
            <!-- Massive 4 heads -->
            <path d="M100,310 C85,340 90,390 120,415 L160,415 C190,390 195,340 180,310 Z" fill="url(#muscleGrad1)" stroke="#dc2626" stroke-width="2" />
            <path d="M125,305 L155,305 L150,415 L130,415 Z" fill="#b91c1c" opacity="0.6" />
            <!-- Patella & Lig. Patellae -->
            <ellipse cx="140" cy="425" rx="14" ry="9" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" />
            <path d="M140,434 L140,460" stroke="url(#tendonGrad1)" stroke-width="10" stroke-linecap="round" />
            <!-- Pin -->
            <g class="pin-hotspot" transform="translate(140,360)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">4</text>
            </g>
            <text x="140" y="480" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="bold">To'rt boshli (Quadriceps)</text>
          </g>

          <!-- 5. Patsimon (m. bipennatus) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('pennatus')">
            <rect x="270" y="280" width="220" height="210" rx="12" fill="rgba(30,41,59,0.5)" stroke="rgba(56,189,248,0.3)" class="transition-all group-hover:stroke-cyan-400 group-hover:fill-cyan-950/20" />
            <!-- Central Tendon Shaft -->
            <path d="M380,300 L380,455" stroke="url(#tendonGrad1)" stroke-width="6" stroke-linecap="round" />
            <!-- Angled Feather Fibers -->
            <g stroke="#ef4444" stroke-width="2.5" opacity="0.9">
              <line x1="340" y1="330" x2="380" y2="350" />
              <line x1="420" y1="330" x2="380" y2="350" />
              <line x1="335" y1="355" x2="380" y2="375" />
              <line x1="425" y1="355" x2="380" y2="375" />
              <line x1="335" y1="380" x2="380" y2="400" />
              <line x1="425" y1="380" x2="380" y2="400" />
              <line x1="340" y1="405" x2="380" y2="425" />
              <line x1="420" y1="405" x2="380" y2="425" />
            </g>
            <!-- Pin -->
            <g class="pin-hotspot" transform="translate(380,380)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">5</text>
            </g>
            <text x="380" y="480" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="bold">Ikki patsimon (Bipennatus)</text>
          </g>

          <!-- 6. Doirasimon / Sfinkter (m. orbicularis) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('orbicularis')">
            <rect x="510" y="280" width="220" height="210" rx="12" fill="rgba(30,41,59,0.5)" stroke="rgba(56,189,248,0.3)" class="transition-all group-hover:stroke-cyan-400 group-hover:fill-cyan-950/20" />
            <!-- Concentric Muscle Rings -->
            <ellipse cx="620" cy="375" rx="55" ry="38" fill="none" stroke="url(#muscleGrad1)" stroke-width="12" stroke-dasharray="2,2" />
            <ellipse cx="620" cy="375" rx="35" ry="22" fill="none" stroke="#ef4444" stroke-width="6" />
            <ellipse cx="620" cy="375" rx="15" ry="8" fill="#030712" />
            <!-- Pin -->
            <g class="pin-hotspot" transform="translate(620,375)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">6</text>
            </g>
            <text x="620" y="480" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="bold">Doirasimon (Orbicularis)</text>
          </g>
        </svg>
      </div>
    `;

    // Render first item by default
    selectMuscle('fusiformis', sectionData.shapes);
  }

  // =========================================================================
  // 2. BACK & THORAX VIEW (2D VECTOR)
  // =========================================================================
  function renderBackThoraxView(diagramMount, notesMount, sectionData) {
    if (!sectionData || !sectionData.muscles) return;

    diagramMount.innerHTML = `
      <div class="relative w-full h-[540px] flex items-center justify-center p-2">
        <svg viewBox="0 0 760 520" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="muscleGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f87171" stop-opacity="0.9" />
              <stop offset="50%" stop-color="#dc2626" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#991b1b" stop-opacity="0.9" />
            </linearGradient>
            <linearGradient id="diaphGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#f87171" stop-opacity="0.9" />
              <stop offset="60%" stop-color="#dc2626" stop-opacity="0.85" />
              <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4" />
            </linearGradient>
          </defs>

          <!-- Border Frame -->
          <rect x="10" y="10" width="740" height="500" rx="16" fill="rgba(15,23,42,0.6)" stroke="rgba(56,189,248,0.2)" stroke-width="1.5" />
          <text x="30" y="42" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">MM. DORSI ET THORACIS // ORQA VA KO'KRAK QAFASI</text>
          <text x="590" y="42" fill="#94a3b8" font-family="monospace" font-size="11">121–142-RASMLAR</text>

          <!-- Skeletal Spine Baseline -->
          <line x1="380" y1="60" x2="380" y2="470" stroke="rgba(56,189,248,0.3)" stroke-width="3" stroke-dasharray="6,4" />

          <!-- Left Half: Back Muscles (Orqa muskullari) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('trapezius')">
            <!-- M. Trapezius (Diamond / Trapezoid) -->
            <path d="M380,70 L480,120 L440,210 L380,240 L380,70 Z" fill="url(#muscleGrad2)" stroke="#ef4444" stroke-width="1.8" opacity="0.85" class="transition-opacity group-hover:opacity-100" />
            <g class="pin-hotspot" transform="translate(425,145)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">1</text>
            </g>
            <text x="440" y="90" fill="#f1f5f9" font-size="11" font-weight="bold">m. trapezius</text>
          </g>

          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('latissimus-dorsi')">
            <!-- M. Latissimus dorsi (Broad lower back) -->
            <path d="M380,240 L450,215 L500,230 L460,390 L380,410 L380,240 Z" fill="url(#muscleGrad2)" stroke="#ef4444" stroke-width="1.8" opacity="0.85" class="transition-opacity group-hover:opacity-100" />
            <g class="pin-hotspot" transform="translate(435,310)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">2</text>
            </g>
            <text x="450" y="360" fill="#f1f5f9" font-size="11" font-weight="bold">m. latissimus dorsi</text>
          </g>

          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('erector-spinae')">
            <!-- M. Erector Spinae (Deep vertical column) -->
            <rect x="365" y="160" width="15" height="280" rx="4" fill="#b91c1c" stroke="#dc2626" stroke-width="1.5" />
            <g class="pin-hotspot" transform="translate(372,290)">
              <circle r="10" fill="#f59e0b" stroke="#fcd34d" stroke-width="2" />
              <text text-anchor="middle" dy="3.5" fill="#0f172a" font-size="9" font-weight="bold">3</text>
            </g>
            <text x="360" y="460" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="bold">m. erector spinae</text>
          </g>

          <!-- Right Half: Anterior Chest & Diaphragm -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('pectoralis-major')">
            <!-- M. Pectoralis Major (Fan-shaped) -->
            <path d="M360,90 L260,110 L220,180 L290,200 L360,190 Z" fill="url(#muscleGrad2)" stroke="#ef4444" stroke-width="1.8" opacity="0.85" class="transition-opacity group-hover:opacity-100" />
            <g class="pin-hotspot" transform="translate(285,150)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">4</text>
            </g>
            <text x="270" y="90" fill="#f1f5f9" font-size="11" font-weight="bold">m. pectoralis major</text>
          </g>

          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('intercostales')">
            <!-- Intercostal muscles between ribs -->
            <path d="M350,210 C300,215 270,240 250,260" stroke="#f87171" stroke-width="6" fill="none" stroke-dasharray="6,3" />
            <path d="M350,235 C300,240 270,265 250,285" stroke="#f87171" stroke-width="6" fill="none" stroke-dasharray="6,3" />
            <path d="M350,260 C300,265 270,290 250,310" stroke="#f87171" stroke-width="6" fill="none" stroke-dasharray="6,3" />
            <g class="pin-hotspot" transform="translate(280,250)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">5</text>
            </g>
            <text x="240" y="240" fill="#f1f5f9" font-size="11" font-weight="bold">mm. intercostales</text>
          </g>

          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('diaphragma')">
            <!-- Diaphragma Dome across chest floor -->
            <path d="M180,390 C220,330 340,320 380,330 C420,320 540,330 580,390 C480,410 280,410 180,390 Z" fill="url(#diaphGrad)" stroke="#38bdf8" stroke-width="2" />
            <!-- Centrum Tendineum -->
            <ellipse cx="380" cy="355" rx="50" ry="18" fill="#f1f5f9" opacity="0.8" />
            <text x="380" y="358" text-anchor="middle" fill="#0f172a" font-size="9" font-weight="bold">Centrum tendineum</text>
            <g class="pin-hotspot" transform="translate(380,385)">
              <circle r="12" fill="#10b981" stroke="#34d399" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">6</text>
            </g>
            <text x="380" y="425" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">DIAPHRAGMA (To'sh-qorin to'sig'i)</text>
          </g>
        </svg>
      </div>
    `;

    selectMuscle('trapezius', sectionData.muscles);
  }

  // =========================================================================
  // 3. ABDOMEN & INGUINAL CANAL VIEW (2D VECTOR)
  // =========================================================================
  function renderAbdomenView(diagramMount, notesMount, sectionData) {
    if (!sectionData || !sectionData.muscles) return;

    diagramMount.innerHTML = `
      <div class="relative w-full h-[540px] flex items-center justify-center p-2">
        <svg viewBox="0 0 760 520" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="abGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f87171" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#b91c1c" stop-opacity="0.95" />
            </linearGradient>
          </defs>

          <!-- Frame -->
          <rect x="10" y="10" width="740" height="500" rx="16" fill="rgba(15,23,42,0.6)" stroke="rgba(56,189,248,0.2)" stroke-width="1.5" />
          <text x="30" y="42" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">MM. ABDOMINIS & CANALIS INGUINALIS // QORIN VA CHOV</text>
          <text x="590" y="42" fill="#94a3b8" font-family="monospace" font-size="11">143–158-RASMLAR</text>

          <!-- Costal Margin & Pelvis Outlines -->
          <path d="M260,80 L380,110 L500,80" stroke="rgba(56,189,248,0.3)" stroke-width="3" fill="none" />
          <path d="M250,440 L380,470 L510,440" stroke="rgba(56,189,248,0.3)" stroke-width="3" fill="none" />

          <!-- Linea Alba (White Line) -->
          <line x1="380" y1="110" x2="380" y2="470" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round" />
          <!-- Kindik (Umbilicus) -->
          <circle cx="380" cy="290" r="7" fill="#0f172a" stroke="#f1f5f9" stroke-width="2" />
          <text x="395" y="294" fill="#94a3b8" font-size="10">Anulus umbilicalis</text>

          <!-- 1. M. Rectus abdominis (Vertical Straps) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('rectus-abdominis')">
            <!-- Left & Right rectus bellies -->
            <rect x="330" y="120" width="45" height="340" rx="8" fill="url(#abGrad)" stroke="#ef4444" stroke-width="1.5" />
            <rect x="385" y="120" width="45" height="340" rx="8" fill="url(#abGrad)" stroke="#ef4444" stroke-width="1.5" />
            <!-- Intersectiones tendineae (3 bands) -->
            <line x1="330" y1="190" x2="430" y2="190" stroke="#f1f5f9" stroke-width="2.5" />
            <line x1="330" y1="260" x2="430" y2="260" stroke="#f1f5f9" stroke-width="2.5" />
            <line x1="330" y1="340" x2="430" y2="340" stroke="#f1f5f9" stroke-width="2.5" />
            <g class="pin-hotspot" transform="translate(352,220)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">1</text>
            </g>
            <text x="380" y="105" text-anchor="middle" fill="#f1f5f9" font-size="11" font-weight="bold">m. rectus abdominis</text>
          </g>

          <!-- 2. M. Obliquus externus (Flanks - Downward/Forward fibers) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('obliquus-externus')">
            <path d="M190,140 L320,180 L320,410 L230,420 Z" fill="#b91c1c" stroke="#dc2626" stroke-width="1.5" opacity="0.8" />
            <g stroke="#fca5a5" stroke-width="1.5" opacity="0.7">
              <line x1="210" y1="160" x2="280" y2="210" />
              <line x1="210" y1="210" x2="280" y2="260" />
              <line x1="210" y1="260" x2="280" y2="310" />
              <line x1="210" y1="310" x2="280" y2="360" />
            </g>
            <g class="pin-hotspot" transform="translate(250,280)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">2</text>
            </g>
            <text x="210" y="240" fill="#f1f5f9" font-size="11" font-weight="bold">m. obliquus ext.</text>
          </g>

          <!-- 3. M. Obliquus internus (Right Flank - Upward/Forward fibers) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('obliquus-internus')">
            <path d="M570,140 L440,180 L440,410 L530,420 Z" fill="#991b1b" stroke="#dc2626" stroke-width="1.5" opacity="0.8" />
            <g stroke="#fca5a5" stroke-width="1.5" opacity="0.7">
              <line x1="550" y1="360" x2="480" y2="310" />
              <line x1="550" y1="310" x2="480" y2="260" />
              <line x1="550" y1="260" x2="480" y2="210" />
            </g>
            <g class="pin-hotspot" transform="translate(510,280)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">3</text>
            </g>
            <text x="550" y="240" fill="#f1f5f9" font-size="11" font-weight="bold">m. obliquus int.</text>
          </g>

          <!-- 4. M. Transversus abdominis (Deep layer indicator) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('transversus-abdominis')">
            <rect x="130" y="200" width="40" height="180" rx="6" fill="#7f1d1d" stroke="#ef4444" stroke-width="1.5" />
            <line x1="135" y1="230" x2="165" y2="230" stroke="#f1f5f9" stroke-width="2" />
            <line x1="135" y1="260" x2="165" y2="260" stroke="#f1f5f9" stroke-width="2" />
            <line x1="135" y1="290" x2="165" y2="290" stroke="#f1f5f9" stroke-width="2" />
            <line x1="135" y1="320" x2="165" y2="320" stroke="#f1f5f9" stroke-width="2" />
            <g class="pin-hotspot" transform="translate(150,280)">
              <circle r="10" fill="#f59e0b" stroke="#fcd34d" stroke-width="2" />
              <text text-anchor="middle" dy="3.5" fill="#0f172a" font-size="9" font-weight="bold">4</text>
            </g>
            <text x="150" y="400" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="bold">m. transversus</text>
          </g>

          <!-- 5. Canalis Inguinalis (Inguinal Canal & Rings) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('canalis-inguinalis')">
            <!-- Ligamentum Inguinale -->
            <path d="M260,420 C310,440 350,460 370,468" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" fill="none" />
            <!-- Inguinal Tunnel Highlight -->
            <path d="M290,418 L345,448" stroke="#facc15" stroke-width="8" stroke-linecap="round" opacity="0.8" />
            <!-- Superficial Ring -->
            <ellipse cx="350" cy="450" rx="9" ry="6" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
            <!-- Deep Ring -->
            <ellipse cx="295" cy="420" rx="7" ry="5" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5" />
            <!-- Pin -->
            <g class="pin-hotspot" transform="translate(325,432)">
              <circle r="12" fill="#10b981" stroke="#34d399" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">5</text>
            </g>
            <text x="320" y="485" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">CANALIS INGUINALIS (Chov kanali)</text>
          </g>
        </svg>
      </div>
    `;

    selectMuscle('rectus-abdominis', sectionData.muscles);
  }

  // =========================================================================
  // 4. HEAD, FACE & NECK VIEW (2D VECTOR)
  // =========================================================================
  function renderHeadNeckView(diagramMount, notesMount, sectionData) {
    if (!sectionData || !sectionData.muscles) return;

    diagramMount.innerHTML = `
      <div class="relative w-full h-[540px] flex items-center justify-center p-2">
        <svg viewBox="0 0 760 520" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f87171" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#b91c1c" stop-opacity="0.95" />
            </linearGradient>
          </defs>

          <!-- Frame -->
          <rect x="10" y="10" width="740" height="500" rx="16" fill="rgba(15,23,42,0.6)" stroke="rgba(56,189,248,0.2)" stroke-width="1.5" />
          <text x="30" y="42" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">MM. CAPITIS ET COLLI // BOSH VA BO'YIN MUSKULLARI</text>
          <text x="590" y="42" fill="#94a3b8" font-family="monospace" font-size="11">159–185-RASMLAR</text>

          <!-- Skull & Neck Silhouette Base Profile -->
          <path d="M260,70 C360,60 420,100 430,170 C430,210 410,240 370,260 L380,310 C390,360 460,420 480,470 L240,470 L250,330 C220,310 200,270 200,200 C200,120 230,80 260,70 Z" fill="rgba(30,41,59,0.4)" stroke="rgba(56,189,248,0.25)" stroke-width="2" />

          <!-- 1. M. Temporalis (Fan on temple) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('temporalis')">
            <path d="M280,100 C340,90 380,110 390,160 L350,195 L310,185 Z" fill="url(#headGrad)" stroke="#ef4444" stroke-width="1.8" />
            <g class="pin-hotspot" transform="translate(340,140)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">1</text>
            </g>
            <text x="340" y="95" text-anchor="middle" fill="#f1f5f9" font-size="11" font-weight="bold">m. temporalis</text>
          </g>

          <!-- 2. M. Masseter (Angle of jaw) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('masseter')">
            <rect x="330" y="200" width="35" height="55" rx="6" fill="#b91c1c" stroke="#dc2626" stroke-width="1.8" transform="rotate(-8 330 200)" />
            <g class="pin-hotspot" transform="translate(350,225)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">2</text>
            </g>
            <text x="385" y="235" fill="#f1f5f9" font-size="11" font-weight="bold">m. masseter</text>
          </g>

          <!-- 3. M. Orbicularis oris (Lips ring) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('orbicularis-oris')">
            <ellipse cx="405" cy="245" rx="18" ry="12" fill="#ef4444" stroke="#f87171" stroke-width="1.5" />
            <ellipse cx="405" cy="245" rx="8" ry="4" fill="#0f172a" />
            <g class="pin-hotspot" transform="translate(405,245)">
              <circle r="10" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="3.5" fill="#ffffff" font-size="9" font-weight="bold">3</text>
            </g>
            <text x="435" y="250" fill="#f1f5f9" font-size="11" font-weight="bold">m. orbicularis oris</text>
          </g>

          <!-- 4. M. Buccinator (Cheek floor) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('buccinator')">
            <rect x="365" y="215" width="25" height="22" rx="4" fill="#991b1b" stroke="#ef4444" stroke-width="1.2" />
            <g class="pin-hotspot" transform="translate(378,226)">
              <circle r="9" fill="#f59e0b" stroke="#fcd34d" stroke-width="1.5" />
              <text text-anchor="middle" dy="3" fill="#0f172a" font-size="8" font-weight="bold">4</text>
            </g>
            <text x="378" y="205" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">m. buccinator</text>
          </g>

          <!-- 5. M. Sternocleidomastoideus (Diagonal Neck Pillar) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('sternocleidomastoideus')">
            <path d="M260,200 L350,440 L380,440 L285,190 Z" fill="url(#headGrad)" stroke="#ef4444" stroke-width="2" />
            <g class="pin-hotspot" transform="translate(315,310)">
              <circle r="13" fill="#10b981" stroke="#34d399" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="11" font-weight="bold">5</text>
            </g>
            <text x="210" y="320" fill="#34d399" font-size="12" font-weight="bold">M. STERNOCLEIDOMASTOIDEUS</text>
          </g>

          <!-- 6. Trigona Colli (Carotid Triangle Highlight) -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('neck-triangles')">
            <!-- Carotid triangle border -->
            <polygon points="320,270 375,270 335,340" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="3,3" />
            <g class="pin-hotspot" transform="translate(345,295)">
              <circle r="10" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
              <text text-anchor="middle" dy="3.5" fill="#ffffff" font-size="9" font-weight="bold">6</text>
            </g>
            <text x="430" y="315" fill="#38bdf8" font-size="11" font-weight="bold">Trigonum caroticum</text>
          </g>
        </svg>
      </div>
    `;

    selectMuscle('sternocleidomastoideus', sectionData.muscles);
  }

  // =========================================================================
  // 5. LIMBS VIEW (UPPER & LOWER - 2D VECTOR)
  // =========================================================================
  function renderLimbsView(diagramMount, notesMount, sectionData) {
    if (!sectionData || !sectionData.muscles) return;

    diagramMount.innerHTML = `
      <div class="relative w-full h-[540px] flex items-center justify-center p-2">
        <svg viewBox="0 0 760 520" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="limbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f87171" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#b91c1c" stop-opacity="0.95" />
            </linearGradient>
            <linearGradient id="tendonLimb" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#f1f5f9" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.9" />
            </linearGradient>
          </defs>

          <!-- Frame -->
          <rect x="10" y="10" width="740" height="500" rx="16" fill="rgba(15,23,42,0.6)" stroke="rgba(56,189,248,0.2)" stroke-width="1.5" />
          <text x="30" y="42" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">MM. MEMBRORUM // QO'L VA OYOQ ERKIN MUSKULLARI</text>
          <text x="590" y="42" fill="#94a3b8" font-family="monospace" font-size="11">186–220-RASMLAR</text>

          <!-- Divider between Upper and Lower Limb -->
          <line x1="380" y1="55" x2="380" y2="480" stroke="rgba(56,189,248,0.2)" stroke-width="1.5" stroke-dasharray="4,4" />
          <text x="200" y="70" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold">QO'L MUSKULLARI (MEMBRUM SUPERIUS)</text>
          <text x="560" y="70" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold">OYOQ MUSKULLARI (MEMBRUM INFERIUS)</text>

          <!-- LEFT: UPPER LIMB (Deltoid, Biceps, Triceps) -->
          <!-- 1. M. Deltoideus -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('deltoideus')">
            <path d="M140,100 L210,110 L190,180 L160,180 Z" fill="url(#limbGrad)" stroke="#ef4444" stroke-width="1.8" />
            <g class="pin-hotspot" transform="translate(175,135)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">1</text>
            </g>
            <text x="175" y="95" text-anchor="middle" fill="#f1f5f9" font-size="11" font-weight="bold">m. deltoideus</text>
          </g>

          <!-- 2. M. Biceps brachii -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('biceps-brachii')">
            <path d="M165,185 C150,210 155,255 175,275 C195,255 190,210 175,185 Z" fill="url(#limbGrad)" stroke="#ef4444" stroke-width="1.8" />
            <path d="M175,275 L175,305" stroke="url(#tendonLimb)" stroke-width="6" stroke-linecap="round" />
            <g class="pin-hotspot" transform="translate(175,230)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">2</text>
            </g>
            <text x="175" y="325" text-anchor="middle" fill="#f1f5f9" font-size="11" font-weight="bold">m. biceps brachii</text>
          </g>

          <!-- 3. M. Triceps brachii -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('triceps-brachii')">
            <path d="M260,160 C245,190 250,250 270,280 C290,250 285,190 270,160 Z" fill="#991b1b" stroke="#dc2626" stroke-width="1.8" />
            <path d="M270,280 L270,305" stroke="url(#tendonLimb)" stroke-width="7" stroke-linecap="round" />
            <g class="pin-hotspot" transform="translate(270,225)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">3</text>
            </g>
            <text x="270" y="325" text-anchor="middle" fill="#f1f5f9" font-size="11" font-weight="bold">m. triceps brachii</text>
          </g>

          <!-- RIGHT: LOWER LIMB (Gluteus, Quadriceps, Triceps Surae) -->
          <!-- 4. M. Gluteus maximus -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('gluteus-maximus')">
            <path d="M420,105 C470,95 510,130 500,185 C460,205 430,170 420,105 Z" fill="url(#limbGrad)" stroke="#ef4444" stroke-width="1.8" />
            <g class="pin-hotspot" transform="translate(460,145)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">4</text>
            </g>
            <text x="460" y="95" text-anchor="middle" fill="#f1f5f9" font-size="11" font-weight="bold">m. gluteus maximus</text>
          </g>

          <!-- 5. M. Quadriceps femoris -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('quadriceps-femoris')">
            <path d="M530,150 C505,200 515,280 545,310 C575,280 585,200 560,150 Z" fill="url(#limbGrad)" stroke="#ef4444" stroke-width="2" />
            <ellipse cx="545" cy="320" rx="12" ry="7" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" />
            <path d="M545,327 L545,355" stroke="url(#tendonLimb)" stroke-width="8" stroke-linecap="round" />
            <g class="pin-hotspot" transform="translate(545,230)">
              <circle r="13" fill="#10b981" stroke="#34d399" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="11" font-weight="bold">5</text>
            </g>
            <text x="545" y="375" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">M. QUADRICEPS FEMORIS</text>
          </g>

          <!-- 6. M. Triceps surae & Tendo calcaneus -->
          <g class="cursor-pointer group" onclick="ModuleMyology.selectMuscle('triceps-surae')">
            <path d="M650,240 C630,270 635,340 660,370 C685,340 690,270 670,240 Z" fill="#991b1b" stroke="#dc2626" stroke-width="1.8" />
            <!-- Thick Achilles tendon -->
            <path d="M660,370 L660,450" stroke="url(#tendonLimb)" stroke-width="10" stroke-linecap="round" />
            <!-- Calcaneus foot bone -->
            <polygon points="650,450 675,450 690,470 630,470" fill="#64748b" stroke="#94a3b8" stroke-width="1.5" />
            <g class="pin-hotspot" transform="translate(660,310)">
              <circle r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2" class="animate-pulse" />
              <text text-anchor="middle" dy="4" fill="#ffffff" font-size="10" font-weight="bold">6</text>
            </g>
            <text x="660" y="405" text-anchor="middle" fill="#f1f5f9" font-size="10" font-weight="bold">Tendo calcaneus (Axill)</text>
          </g>
        </svg>
      </div>
    `;

    selectMuscle('deltoideus', sectionData.muscles);
  }

  // =========================================================================
  // HELPER: SELECT AND RENDER CLINICAL DOSSIER
  // =========================================================================
  function selectMuscle(muscleId, itemsList = null) {
    const data = getMyologyData();
    let found = null;

    if (itemsList && Array.isArray(itemsList)) {
      found = itemsList.find(m => m.id === muscleId);
    }

    if (!found) {
      // Deep search across all sections
      const allSections = [
        data.generalMyology ? data.generalMyology.shapes : [],
        data.backAndThorax ? data.backAndThorax.muscles : [],
        data.abdomenAndInguinal ? data.abdomenAndInguinal.muscles : [],
        data.headAndNeck ? data.headAndNeck.muscles : [],
        data.limbs ? data.limbs.muscles : []
      ];
      for (const group of allSections) {
        if (group && Array.isArray(group)) {
          found = group.find(m => m.id === muscleId);
          if (found) break;
        }
      }
    }

    if (!found) return;

    selectedMuscle = found;
    const notesMount = document.getElementById('myology-notes-mount');
    if (notesMount && window.App && typeof window.App.renderClinicalDossier === 'function') {
      notesMount.innerHTML = window.App.renderClinicalDossier(found);
    }

    if (window.App && typeof window.App.playUiSound === 'function') {
      window.App.playUiSound('select');
    }
  }

  return {
    init,
    switchSubSection,
    selectMuscle,
    getCurrentSubSection: () => currentSubTab
  };
})();
