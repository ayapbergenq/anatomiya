/**
 * 3-MODUL: QO'L SUYAKLARI / OSSA MEMBRI SUPERIORIS (23–45-rasmlar, 15–22-betlar)
 * Yelka kamari (O'mrov va Kurak), Erkin qo'l (Yelka, Tirsak, Bilak - Pronatsiya/Supinatsiya),
 * Qo'l panjasi (8 ta kaft usti, 5 ta kaft, 14 ta barmoq falangalari)
 */

window.Module3 = (function() {
  let isPronated = false;
  let activeHandBone = null;

  function init() {
    renderShoulderGirdle();
    initHumerusAndForearm();
    renderInteractiveHand();
  }

  // 1. YELKA KAMARI (O'mrov va Kurak - 24–27-rasmlar) — 2D VECTOR MEDICAL ATLAS
  function renderShoulderGirdle() {
    const container = document.getElementById("shoulder-girdle-svg-container");
    if (!container) return;

    drawShoulderSvg();
    renderShoulderInfo('scapula');
  }

  function drawShoulderSvg() {
    const container = document.getElementById("shoulder-girdle-svg-container");
    if (!container) return;

    container.innerHTML = `
      <svg viewBox="0 0 520 400" class="w-full h-auto max-h-[380px] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <defs>
          <radialGradient id="scapulaGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="70%" stop-color="#cbd5e1" />
            <stop offset="100%" stop-color="#94a3b8" />
          </radialGradient>
        </defs>

        <!-- CLAVICULA (O'mrov suyagi - S-simon) -->
        <g id="sg-clavicle" class="cursor-pointer group" onclick="Module3.selectShoulderPart('clavicula')">
          <!-- S-shaped shaft -->
          <path d="M120,95 C180,75 260,115 350,90 C365,85 385,88 395,95 C385,108 360,105 345,108 C265,135 180,95 120,115 Z" fill="url(#scapulaGrad)" stroke="#38bdf8" stroke-width="2" class="group-hover:stroke-cyan-300" />
          <!-- Extremitas sternalis pin -->
          <circle cx="125" cy="105" r="9" fill="#0284c7" />
          <text x="125" y="108" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff">1</text>
          <!-- Extremitas acromialis pin -->
          <circle cx="385" cy="95" r="9" fill="#0284c7" />
          <text x="385" y="98" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff">2</text>
          <text x="240" y="75" font-size="11" font-weight="bold" fill="#38bdf8">Clavicula (O'mrov)</text>
        </g>

        <!-- SCAPULA (Kurak suyagi - orqa yuzasi, 27-rasm) -->
        <g id="sg-scapula" class="cursor-pointer group" onclick="Module3.selectShoulderPart('scapula')">
          <!-- Triangular blade body -->
          <polygon points="350,115 220,160 300,340" fill="url(#scapulaGrad)" stroke="#38bdf8" stroke-width="2" class="group-hover:stroke-cyan-300" />
          
          <!-- Spina scapulae (Kurak qiri) -->
          <path d="M225,165 Q300,165 375,140 L380,152 Q300,178 225,172 Z" fill="#94a3b8" stroke="#38bdf8" stroke-width="1.2" />
          
          <!-- Acromion (Yelka o'simtasi) -->
          <polygon points="375,140 420,135 415,160 380,152" fill="#e2e8f0" stroke="#f59e0b" stroke-width="2" />
          <g class="pin-hotspot" transform="translate(410, 145)" onclick="event.stopPropagation(); Module3.selectShoulderPart('acromion')">
            <circle cx="0" cy="0" r="10" fill="#f59e0b" />
            <text x="0" y="3.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff">3</text>
          </g>

          <!-- Processus coracoideus (Tumshuqsimon o'siq) -->
          <path d="M365,115 Q385,100 400,115" stroke="#f43f5e" stroke-width="6" stroke-linecap="round" fill="none" />
          <g class="pin-hotspot" transform="translate(395, 110)" onclick="event.stopPropagation(); Module3.selectShoulderPart('coracoideus')">
            <circle cx="0" cy="0" r="10" fill="#f43f5e" />
            <text x="0" y="3.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff">4</text>
          </g>

          <!-- Cavitas glenoidalis (Bo'g'im chuqurchasi) -->
          <ellipse cx="370" cy="140" rx="14" ry="24" fill="#38bdf8" opacity="0.7" stroke="#0284c7" stroke-width="2" />
          <g class="pin-hotspot" transform="translate(365, 140)" onclick="event.stopPropagation(); Module3.selectShoulderPart('glenoidalis')">
            <circle cx="0" cy="0" r="10" fill="#0284c7" />
            <text x="0" y="3.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff">5</text>
          </g>

          <text x="260" y="240" font-size="11" font-weight="bold" fill="#94a3b8">Scapula (Kurak)</text>
        </g>
      </svg>
    `;
  }

  function selectShoulderPart(partId) {
    renderShoulderInfo(partId);
  }

  function renderShoulderInfo(partId) {
    const box = document.getElementById("shoulder-part-info");
    if (!box) return;

    if (partId === "clavicula") {
      box.innerHTML = window.App.renderClinicalDossier(window.ATLAS_DATA.upperLimbData.girdle[0]);
    } else if (partId === "scapula") {
      box.innerHTML = window.App.renderClinicalDossier(window.ATLAS_DATA.upperLimbData.girdle[1]);
    } else {
      const partsMap = {
        acromion: {
          nameUz: "Akromion — Yelka o'simtasi",
          nameLat: "Acromion",
          pageRef: "Ahmedov: 15–16-betlar, 26, 27-rasmlar",
          clinicalTag: "ORTOPEDIYA",
          quickFacts: [
            "Kurak qirining (spina scapulae) lateral davomi bo'lgan keng yassi o'siq",
            "Yelkaning eng yuqori bo'rtib turuvchi suyakli nuqtasini hosil qiladi",
            "Clavicula bilan articulatio acromioclavicularis bo'g'imini hosil qiladi"
          ],
          landmarks: "Acromion, clavicula akromial uchi.",
          attachments: "Ligamentum acromioclaviculare, ligamentum coracoacromiale, m. deltoideus.",
          neurovascular: "A. suprascapularis va n. suprascapularis yaqinidan o'tadi.",
          clinicalNote: "Impincment sindromi (subacromial impingement) — akromion ostidagi tor oraliqda supraspinatus muskuli payi qisilib yallig'lanadi. Shuningdek sportchilarda akromioklavikulyar bo'g'im chiqishi ko'p uchraydi.",
          desc: "Kurak qirining lateral davomi bo'lib, yelkaning eng yuqori bo'rtib turuvchi nuqtasini hosil qiladi."
        },
        coracoideus: {
          nameUz: "Tumshuqsimon o'siq",
          nameLat: "Processus coracoideus",
          pageRef: "Ahmedov: 15–16-betlar, 26, 27-rasmlar",
          clinicalTag: "JARROHLIK",
          quickFacts: [
            "Qush tumshug'iga o'xshash oldinga va lateral tomonga egilgan o'siq",
            "M. biceps brachii qisqa boshi va m. coracobrachialis uchun tayanch nuqta",
            "Yelka bo'g'imi operatsiyalarida oldingi asosiy anatomik mayoq"
          ],
          landmarks: "Processus coracoideus (fossa infraclavicularis ostida paypaslanadi).",
          attachments: "M. biceps brachii (caput breve), m. coracobrachialis, m. pectoralis minor, lig. coracoacromiale.",
          neurovascular: "Plexus brachialis va a. axillaris uning medial-pastki tomonidan yo'naladi.",
          clinicalNote: "Yelka bo'g'imining oldingi retsidiv chiquvlarida Latarjet operatsiyasi qo'llaniladi — unda processus coracoideus suyagi paylari bilan birga ko'chirilib, cavitas glenoidalisning oldingi qirrasiga burab fiksatsiya qilinadi.",
          desc: "Qush tumshug'iga o'xshash oldinga va lateral tomonga egilgan o'siq."
        },
        glenoidalis: {
          nameUz: "Bo'g'im chuqurchasi",
          nameLat: "Cavitas glenoidalis",
          pageRef: "Ahmedov: 16-bet, 26, 27-rasmlar",
          clinicalTag: "ORTOPEDIYA VA TRAVMA",
          quickFacts: [
            "Kurakning lateral burchagidagi yassi oval chuqurcha",
            "Caput humeri sharsimon yuzasi bilan articulatio humeri bo'g'imini hosil qiladi",
            "Labrum glenoidale (fibroz-tog'ay halqa) chuqurchani chuqurlashtirib turadi"
          ],
          landmarks: "Cavitas glenoidalis, tuberculum supraglenoidale et infraglenoidale.",
          attachments: "Labrum glenoidale, caput longum m. bicipitis brachii (tuberculum supraglenoidalega birikadi).",
          neurovascular: "A. circumflexa scapulae va n. axillaris.",
          clinicalNote: "Yelka bo'g'imi inson organizmidagi eng harakatchan va eng ko'p chiqadigan bo'g'imdir (95% oldingi chiqish). Bo'g'im chiqqanda labrum glenoidale yirtilishi (Bankart jarohati) tez-tez kuzatiladi.",
          desc: "Kurakning lateral burchagidagi yassi oval chuqurcha; yelka suyagi boshchasi bilan birlashadi."
        }
      };
      const item = partsMap[partId] || window.ATLAS_DATA.upperLimbData.girdle[1];
      box.innerHTML = window.App.renderClinicalDossier(item);
    }
  }

  // 2. ERKIN QO'L: YELKA VA BILAK SUYAKLARI (PRONATSIYA / SUPINATSIYA)
  function initHumerusAndForearm() {
    const pronBtn = document.getElementById("btn-toggle-pronation");

    drawForearmSvg();

    if (pronBtn) {
      pronBtn.addEventListener("click", () => {
        isPronated = !isPronated;
        pronBtn.innerHTML = isPronated
          ? '<i class="fa-solid fa-arrows-rotate mr-2 text-amber-400"></i> Supinatsiya (Kaft tepaga)'
          : '<i class="fa-solid fa-arrows-rotate mr-2 text-cyan-400"></i> Pronatsiya (Kaft pastga)';
        drawForearmSvg();
      });
    }
  }

  function drawForearmSvg() {
    const container = document.getElementById("forearm-svg-container");
    if (!container) return;

    // Radius cross-over transformation during pronation
    const radiusPath = isPronated
      ? "M210,170 Q240,250 255,330" // crossed over ulna
      : "M210,170 Q205,250 200,330"; // parallel

    const statusText = isPronated
      ? "Pronatsiya (Pronatio): Radius tirsak suyagi ustidan qiya kesib o'tdi"
      : "Supinatsiya (Supinatio): Radius va Ulna suyaklari o'zaro parallel";

    container.innerHTML = `
      <svg viewBox="0 0 460 420" class="w-full h-auto max-h-[390px] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <defs>
          <radialGradient id="humGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="100%" stop-color="#94a3b8" />
          </radialGradient>
        </defs>

        <!-- HUMERUS (DISTAL BLOCK) -->
        <g id="humerus-block">
          <rect x="215" y="40" width="40" height="90" fill="url(#humGrad)" rx="6" stroke="#38bdf8" stroke-width="1.5" />
          <!-- Trochlea & Capitulum -->
          <ellipse cx="225" cy="140" rx="15" ry="12" fill="#cbd5e1" stroke="#0284c7" stroke-width="1.5" />
          <circle cx="245" cy="142" r="10" fill="#e2e8f0" stroke="#0284c7" stroke-width="1.5" />
          <text x="285" y="85" font-size="10" font-weight="bold" fill="#38bdf8">Humerus (Yelka)</text>
          <!-- Collum chirurgicum alert pin -->
          <g class="pin-hotspot" transform="translate(235, 75)">
            <circle cx="0" cy="0" r="9" fill="#ef4444" />
            <text x="0" y="3" text-anchor="middle" font-size="8" font-weight="bold" fill="#fff">!</text>
          </g>
          <text x="140" y="78" font-size="9" fill="#f87171">Jarrohlik bo'yni</text>
        </g>

        <!-- ULNA (TIRSAK SUYAGI - HARAKATSIZ O'Q, MEDIAL) -->
        <g id="ulna-bone">
          <!-- Olecranon -->
          <path d="M245,130 L260,130 L260,150 L245,150 Z" fill="#94a3b8" stroke="#38bdf8" stroke-width="1.5" />
          <!-- Shaft of Ulna -->
          <path d="M255,150 Q258,240 260,330" stroke="#94a3b8" stroke-width="12" stroke-linecap="round" fill="none" />
          <!-- Processus styloideus ulnae -->
          <circle cx="260" cy="336" r="6" fill="#64748b" />
          <text x="280" y="240" font-size="11" font-weight="bold" fill="#94a3b8">Ulna (Tirsak)</text>
        </g>

        <!-- RADIUS (BILAK SUYAGI - HARAKATCHAN AYLANGUVCHI, LATERAL) -->
        <g id="radius-bone" style="transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);">
          <!-- Caput radii -->
          <ellipse cx="210" cy="155" rx="10" ry="7" fill="#e2e8f0" stroke="#f59e0b" stroke-width="2" />
          <!-- Shaft of Radius -->
          <path d="${radiusPath}" stroke="#f59e0b" stroke-width="11" stroke-linecap="round" fill="none" style="transition: d 0.6s cubic-bezier(0.16, 1, 0.3, 1);" />
          <!-- Processus styloideus radii -->
          <circle cx="${isPronated ? 255 : 200}" cy="336" r="7" fill="#ea580c" style="transition: cx 0.6s ease;" />
          <text x="${isPronated ? 175 : 135}" y="240" font-size="11" font-weight="bold" fill="#f59e0b" style="transition: x 0.6s ease;">Radius (Bilak)</text>
        </g>

        <!-- ROTATION STATUS BADGE -->
        <rect x="30" y="380" width="400" height="30" rx="8" fill="#090e1a" stroke="rgba(56,189,248,0.3)" />
        <text x="230" y="400" text-anchor="middle" font-size="11" font-weight="bold" fill="${isPronated ? '#f59e0b' : '#38bdf8'}">${statusText}</text>
      </svg>
    `;
  }

  // 3. QO'L PANJASI INTERAKTIV XARITASI (Ossa manus, 36–45-rasmlar)
  function renderInteractiveHand() {
    const container = document.getElementById("hand-svg-container");
    if (!container) return;

    drawHandSvg();
    renderHandBoneInfo("scaphoideum");
  }

  function drawHandSvg() {
    const container = document.getElementById("hand-svg-container");
    if (!container) return;

    const carpalProx = window.ATLAS_DATA.upperLimbData.handBones.carpalProximal;
    const carpalDist = window.ATLAS_DATA.upperLimbData.handBones.carpalDistal;

    container.innerHTML = `
      <svg viewBox="0 0 460 520" class="w-full h-auto max-h-[480px] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <!-- DISTAL RADIUS & ULNA ARTICULAR SURFACE -->
        <path d="M160,80 L290,80 Q225,95 160,80 Z" fill="#334155" stroke="#475569" stroke-width="1.5" />

        <!-- 8 CARPAL BONES (OSSA CARPI) -->
        <!-- PROXIMAL ROW (1-4) -->
        <!-- 1. Os scaphoideum (Qayiqsimon) -->
        <g id="hand-scaphoideum" class="cursor-pointer group" onclick="Module3.selectHandBone('scaphoideum')">
          <ellipse cx="180" cy="115" rx="18" ry="14" fill="#38bdf8" stroke="#0284c7" stroke-width="2" class="group-hover:filter group-hover:brightness-125" />
          <text x="180" y="119" text-anchor="middle" font-size="10" font-weight="bold" fill="#030712">1</text>
        </g>

        <!-- 2. Os lunatum (Yarimoysimon) -->
        <g id="hand-lunatum" class="cursor-pointer group" onclick="Module3.selectHandBone('lunatum')">
          <ellipse cx="220" cy="110" rx="16" ry="13" fill="#38bdf8" stroke="#0284c7" stroke-width="2" class="group-hover:filter group-hover:brightness-125" />
          <text x="220" y="114" text-anchor="middle" font-size="10" font-weight="bold" fill="#030712">2</text>
        </g>

        <!-- 3. Os triquetrum (Uch qirrali) -->
        <g id="hand-triquetrum" class="cursor-pointer group" onclick="Module3.selectHandBone('triquetrum')">
          <polygon points="250,105 272,112 260,126" fill="#38bdf8" stroke="#0284c7" stroke-width="2" class="group-hover:filter group-hover:brightness-125" />
          <text x="260" y="118" text-anchor="middle" font-size="9" font-weight="bold" fill="#030712">3</text>
        </g>

        <!-- 4. Os pisiforme (No'xatsimon) -->
        <g id="hand-pisiforme" class="cursor-pointer group" onclick="Module3.selectHandBone('pisiforme')">
          <circle cx="270" cy="128" r="9" fill="#0ea5e9" stroke="#38bdf8" stroke-width="2" class="group-hover:filter group-hover:brightness-125" />
          <text x="270" y="131" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">4</text>
        </g>

        <!-- DISTAL ROW (5-8) -->
        <!-- 5. Os trapezium (Trapetsiya) -->
        <g id="hand-trapezium" class="cursor-pointer group" onclick="Module3.selectHandBone('trapezium')">
          <polygon points="155,145 178,135 185,158 160,165" fill="#f59e0b" stroke="#d97706" stroke-width="2" class="group-hover:filter group-hover:brightness-125" />
          <text x="170" y="154" text-anchor="middle" font-size="10" font-weight="bold" fill="#030712">5</text>
        </g>

        <!-- 6. Os trapezoideum (Trapetsiyasimon) -->
        <g id="hand-trapezoideum" class="cursor-pointer group" onclick="Module3.selectHandBone('trapezoideum')">
          <polygon points="186,138 206,135 204,158 188,158" fill="#f59e0b" stroke="#d97706" stroke-width="2" class="group-hover:filter group-hover:brightness-125" />
          <text x="196" y="152" text-anchor="middle" font-size="10" font-weight="bold" fill="#030712">6</text>
        </g>

        <!-- 7. Os capitatum (Boshchali suyak) -->
        <g id="hand-capitatum" class="cursor-pointer group" onclick="Module3.selectHandBone('capitatum')">
          <ellipse cx="225" cy="148" rx="16" ry="20" fill="#f59e0b" stroke="#d97706" stroke-width="2" class="group-hover:filter group-hover:brightness-125" />
          <text x="225" y="152" text-anchor="middle" font-size="10" font-weight="bold" fill="#030712">7</text>
        </g>

        <!-- 8. Os hamatum (Ilmoqli suyak) -->
        <g id="hand-hamatum" class="cursor-pointer group" onclick="Module3.selectHandBone('hamatum')">
          <polygon points="248,135 275,138 270,165 245,160" fill="#f59e0b" stroke="#d97706" stroke-width="2" class="group-hover:filter group-hover:brightness-125" />
          <!-- Hamulus hook -->
          <circle cx="258" cy="150" r="5" fill="#ffffff" />
          <text x="258" y="153" text-anchor="middle" font-size="8" font-weight="bold" fill="#b45309">8</text>
        </g>

        <!-- 5 METACARPAL BONES (OSSA METACARPALIA I-V) -->
        <g id="hand-metacarpals" stroke="#94a3b8" stroke-width="8" stroke-linecap="round">
          <!-- Thumb (I) -->
          <line x1="150" y1="170" x2="105" y2="230" stroke="#cbd5e1" stroke-width="12" />
          <!-- Index (II) -->
          <line x1="185" y1="170" x2="175" y2="270" stroke="#cbd5e1" stroke-width="10" />
          <!-- Middle (III) -->
          <line x1="225" y1="172" x2="225" y2="280" stroke="#cbd5e1" stroke-width="10" />
          <!-- Ring (IV) -->
          <line x1="250" y1="170" x2="260" y2="272" stroke="#cbd5e1" stroke-width="9" />
          <!-- Little (V) -->
          <line x1="268" y1="168" x2="295" y2="260" stroke="#cbd5e1" stroke-width="9" />
        </g>

        <!-- PHALANGES (BARMOQ SUYAKLARI) -->
        <g id="hand-phalanges" stroke="#64748b" stroke-width="7" stroke-linecap="round">
          <!-- Thumb: 2 phalanges -->
          <line x1="105" y1="230" x2="80" y2="280" stroke="#94a3b8" stroke-width="9" />
          <line x1="80" y1="280" x2="60" y2="320" stroke="#94a3b8" stroke-width="8" />

          <!-- Index: 3 phalanges -->
          <line x1="175" y1="270" x2="170" y2="330" stroke="#94a3b8" stroke-width="8" />
          <line x1="170" y1="330" x2="168" y2="380" stroke="#94a3b8" stroke-width="7" />
          <line x1="168" y1="380" x2="166" y2="420" stroke="#94a3b8" stroke-width="6" />

          <!-- Middle: 3 phalanges -->
          <line x1="225" y1="280" x2="225" y2="350" stroke="#94a3b8" stroke-width="8" />
          <line x1="225" y1="350" x2="225" y2="410" stroke="#94a3b8" stroke-width="7" />
          <line x1="225" y1="410" x2="225" y2="455" stroke="#94a3b8" stroke-width="6" />

          <!-- Ring: 3 phalanges -->
          <line x1="260" y1="272" x2="265" y2="335" stroke="#94a3b8" stroke-width="8" />
          <line x1="265" y1="335" x2="268" y2="385" stroke="#94a3b8" stroke-width="7" />
          <line x1="268" y1="385" x2="270" y2="425" stroke="#94a3b8" stroke-width="6" />

          <!-- Little: 3 phalanges -->
          <line x1="295" y1="260" x2="310" y2="310" stroke="#94a3b8" stroke-width="7" />
          <line x1="310" y1="310" x2="320" y2="350" stroke="#94a3b8" stroke-width="6" />
          <line x1="320" y1="350" x2="325" y2="385" stroke="#94a3b8" stroke-width="5" />
        </g>
      </svg>
    `;
  }

  function selectHandBone(boneId) {
    renderHandBoneInfo(boneId);

    // Pulse animation on 2D SVG element
    if (window.gsap) {
      gsap.fromTo(`#hand-${boneId}`, { scale: 0.8 }, { scale: 1.25, duration: 0.3, yoyo: true, repeat: 1 });
    }
  }

  function renderHandBoneInfo(boneId) {
    const box = document.getElementById("hand-bone-info");
    if (!box) return;

    const allCarpals = [
      ...window.ATLAS_DATA.upperLimbData.handBones.carpalProximal,
      ...window.ATLAS_DATA.upperLimbData.handBones.carpalDistal
    ];
    const b = allCarpals.find(x => x.id === boneId) || allCarpals[0];

    box.innerHTML = window.App.renderClinicalDossier(b);
  }

  return {
    init,
    selectShoulderPart,
    selectHandBone
  };
})();
