/**
 * ODAM ANATOMIYASI (ATLAS, 1-JILD) - 1-BO'LIM: OSTEOLOGIYA
 * Boshqaruvchi asosiy ilova (App Controller)
 */

window.App = (function() {
  let activeModule = "module1";
  let audioCtx = null;
  let isInitialLoad = true;

  // Viktorina (Quiz) holati
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswers = [];
  let quizFinished = false;

  // Ma'lumotlarni olish (localStorage yoki standart ATLAS_DATA)
  function getQuizQuestions() {
    try {
      const stored = localStorage.getItem("custom_quiz_questions");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Storage read error:", e);
    }
    return (window.ATLAS_DATA && window.ATLAS_DATA.quizQuestions) ? window.ATLAS_DATA.quizQuestions : [];
  }

  function getMyologyGlossary() {
    if (!window.MYOLOGY_DATA) return [];
    const items = [];
    const myo = window.MYOLOGY_DATA;
    if (myo.generalMyology && Array.isArray(myo.generalMyology.shapes)) {
      myo.generalMyology.shapes.forEach(s => {
        items.push({
          lat: s.nameLat,
          uz: s.nameUz,
          desc: (s.quickFacts && s.quickFacts[0]) ? s.quickFacts[0] : s.clinicalNote,
          cat: "Miologiya",
          fig: s.pageRef || "114-120"
        });
      });
    }
    const sections = ['backAndThorax', 'abdomenAndInguinal', 'headAndNeck', 'limbs'];
    sections.forEach(secKey => {
      if (myo[secKey] && Array.isArray(myo[secKey].muscles)) {
        myo[secKey].muscles.forEach(m => {
          items.push({
            lat: m.nameLat,
            uz: m.nameUz,
            desc: (m.quickFacts && m.quickFacts[0]) ? m.quickFacts[0] : m.clinicalNote,
            cat: "Miologiya",
            fig: m.pageRef || "121-220"
          });
        });
      }
    });
    return items;
  }

  function getGlossary() {
    const defaultItems = (window.ATLAS_DATA && window.ATLAS_DATA.glossary) ? window.ATLAS_DATA.glossary : [];
    const myoItems = getMyologyGlossary();
    let combined = [...defaultItems, ...myoItems];
    try {
      const stored = localStorage.getItem("custom_glossary_entries");
      if (stored) {
        const customItems = JSON.parse(stored);
        if (Array.isArray(customItems) && customItems.length > 0) {
          combined = [...customItems, ...combined];
        }
      }
    } catch (e) {
      console.warn("Glossary read error:", e);
    }
    return combined;
  }

  function init() {
    initTheme();
    initStudyMode();
    setupTabNavigation();
    setupSearch();
    setupGlossary();
    setupQuiz();
    setupAtlasGallery();
    setupKeyboardShortcuts();

    // Initialize all osteology modules
    if (window.Module1) window.Module1.init();
    if (window.Module2) window.Module2.init();
    if (window.Module3) window.Module3.init();
    if (window.Module4) window.Module4.init();
    if (window.Module5) window.Module5.init();

    // Initialize Myology module if present
    if (window.ModuleMyology && typeof window.ModuleMyology.init === "function") {
      window.ModuleMyology.init();
    }

    // Initialize Hero & Cinematic Intro Animation
    if (window.HeroIntro && typeof window.HeroIntro.init === "function") {
      window.HeroIntro.init();
    }

    // Default activate module 1
    switchModule("module1", false);
    isInitialLoad = false;
  }

  // 0.1 STUDY MODE (Active Recall / O'z-o'zini sinash rejimi)
  function initStudyMode() {
    const isStudy = localStorage.getItem("atlas_study_mode") === "true";
    setStudyMode(isStudy, false);
  }

  function setStudyMode(active, playSound = true) {
    if (active) {
      document.body.classList.add("study-mode-active");
    } else {
      document.body.classList.remove("study-mode-active");
    }
    localStorage.setItem("atlas_study_mode", active ? "true" : "false");

    const btn = document.getElementById("btn-toggle-study-mode");
    if (btn) {
      if (active) {
        btn.classList.add("border-amber-400", "bg-amber-950/60", "text-amber-300");
        btn.classList.remove("border-slate-700", "text-slate-300");
        btn.setAttribute("title", "O'z-o'zini sinash rejimi YOQILGAN (Yozuvlar yashirilgan). O'chirish uchun bosing yoki 'T' tugmasini bosing.");
        const badge = btn.querySelector(".study-mode-badge");
        if (badge) {
          badge.innerText = "FAOL";
          badge.classList.add("bg-amber-500", "text-slate-950", "font-bold");
        }
      } else {
        btn.classList.remove("border-amber-400", "bg-amber-950/60", "text-amber-300");
        btn.classList.add("border-slate-700", "text-slate-300");
        btn.setAttribute("title", "O'z-o'zini sinash rejimi O'CHIRILGAN. Yoqish uchun bosing yoki 'T' tugmasini bosing.");
        const badge = btn.querySelector(".study-mode-badge");
        if (badge) {
          badge.innerText = "T";
          badge.classList.remove("bg-amber-500", "text-slate-950", "font-bold");
        }
      }
    }

    if (playSound && typeof playUiSound === "function") {
      playUiSound("click");
    }
  }

  function toggleStudyMode() {
    const isCurrentlyActive = document.body.classList.contains("study-mode-active");
    setStudyMode(!isCurrentlyActive, true);
  }

  // 0.2 CLINICAL DOSSIER GENERATOR (Netter/Sobotta Medical Grade Study Card)
  function renderClinicalDossier(item) {
    if (!item) return '';
    const latName = item.nameLat || item.titleLat || item.lat || '';
    const uzName = item.nameUz || item.titleUz || item.uz || '';
    const pageRef = item.pageRef || (item.fig ? `Ahmedov ${item.fig}-rasmlar` : 'Ahmedov: Osteologiya');
    const clinicalTag = item.clinicalTag || 'KLINIK ANATOMIYA';
    const desc = item.desc || item.contents || '';
    const quickFacts = item.quickFacts || [];
    const landmarks = item.landmarks || '';
    const attachments = item.attachments || '';
    const neurovascular = item.neurovascular || '';
    const clinicalNote = item.clinicalNote || '';

    return `
      <div class="clinical-dossier-card animate-fadeIn">
        <!-- Header Badge Row -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex items-center space-x-2">
            <span class="clinical-tag-yield"><i class="fa-solid fa-stethoscope mr-1"></i>${clinicalTag}</span>
            <span class="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">${pageRef}</span>
          </div>
          ${latName ? `
            <button type="button" onclick="App.speakTerm('${latName.replace(/'/g, "\\'")}')" class="audio-speak-btn" title="Lotincha talaffuz">
              <i class="fa-solid fa-volume-high"></i>
              <span>Talaffuz</span>
            </button>
          ` : ''}
        </div>

        <!-- Anatomical Titles -->
        <h4 class="text-xl font-extrabold text-white tracking-tight mb-1">${uzName}</h4>
        ${latName ? `<div class="clinical-badge-latin mb-4"><i class="fa-solid fa-feather-pointed mr-1.5 opacity-60"></i>${latName}</div>` : ''}

        <!-- High-Yield Quick Facts (Netter/Sobotta Style) -->
        ${quickFacts.length > 0 ? `
          <div class="quick-facts-box mb-4">
            <div class="quick-facts-title">
              <i class="fa-solid fa-bolt text-amber-400"></i>
              <span>High-Yield Asosiy Faktlar (Medik talabalar uchun):</span>
            </div>
            <ul class="quick-facts-list">
              ${quickFacts.map(fact => `
                <li><i class="fa-solid fa-circle-check text-cyan-400 mr-2 text-[10px]"></i><span>${fact}</span></li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Structured Clinical Pillars (Landmarks, Attachments, Neurovascular) -->
        ${(landmarks || attachments || neurovascular) ? `
          <div class="grid grid-cols-1 gap-2.5 mb-4 text-xs">
            ${landmarks ? `
              <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span class="text-cyan-400 font-bold font-mono block mb-0.5"><i class="fa-solid fa-location-crosshairs mr-1"></i>Anatomik mo'ljallar (Landmarks):</span>
                <p class="text-slate-300 leading-relaxed">${landmarks}</p>
              </div>
            ` : ''}
            ${attachments ? `
              <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span class="text-emerald-400 font-bold font-mono block mb-0.5"><i class="fa-solid fa-link mr-1"></i>Birikmalar (Muskullar & Boylamlar):</span>
                <p class="text-slate-300 leading-relaxed">${attachments}</p>
              </div>
            ` : ''}
            ${neurovascular ? `
              <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span class="text-rose-400 font-bold font-mono block mb-0.5"><i class="fa-solid fa-heart-pulse mr-1"></i>Nerv-tomir munosabatlari:</span>
                <p class="text-slate-300 leading-relaxed">${neurovascular}</p>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Clinical Alert / Significance Box -->
        ${clinicalNote ? `
          <div class="clinical-alert-box mb-4">
            <div class="clinical-alert-title">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span>Klinik ahamiyati va amaliy patologiya:</span>
            </div>
            <p class="text-xs text-slate-200 leading-relaxed">${clinicalNote}</p>
          </div>
        ` : ''}

        <!-- Ahmedov Atlas Original Description -->
        ${desc ? `
          <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            <div class="text-[10px] font-mono text-slate-400 mb-1 uppercase tracking-wider font-semibold">Atlas tavsifi:</div>
            ${desc}
          </div>
        ` : ''}
      </div>
    `;
  }

  // 0. 3-WAY THEME SWITCHER (Day, Night, Clinical)
  function initTheme() {
    const savedTheme = localStorage.getItem("atlas_theme") || "night";
    setTheme(savedTheme, false);

    // Attach click listeners to any theme button elements
    document.querySelectorAll("[data-theme-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        const theme = btn.getAttribute("data-theme-btn");
        setTheme(theme, true);
      });
    });
  }

  function setTheme(themeName, playSound = true) {
    if (!["day", "night", "clinical"].includes(themeName)) {
      themeName = "night";
    }

    const htmlEl = document.documentElement;
    htmlEl.classList.remove("theme-day", "theme-night", "theme-clinical");
    htmlEl.classList.add(`theme-${themeName}`);

    // Night mode retains Tailwind dark class, Day and Clinical modes are light
    if (themeName === "night") {
      htmlEl.classList.add("dark");
    } else {
      htmlEl.classList.remove("dark");
    }

    // Update switcher buttons UI
    document.querySelectorAll("[data-theme-btn]").forEach(btn => {
      const btnTheme = btn.getAttribute("data-theme-btn");
      if (btnTheme === themeName) {
        btn.classList.add("active", "theme-btn-active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("active", "theme-btn-active");
        btn.setAttribute("aria-pressed", "false");
      }
    });

    // Sync with Hero & Intro theme
    if (window.HeroIntro && typeof window.HeroIntro.setTheme === "function") {
      window.HeroIntro.setTheme(themeName);
    }

    localStorage.setItem("atlas_theme", themeName);
    if (playSound && typeof playUiSound === "function") {
      playUiSound("click");
    }
  }

  // 1. MODUL TUGMALARI VA O'TISH
  function setupTabNavigation() {
    const tabs = document.querySelectorAll("[data-module-target]");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-module-target");
        switchModule(target);
      });
    });
  }

  function switchModule(moduleId, shouldScroll = true) {
    activeModule = moduleId;

    // Update nav tab buttons
    document.querySelectorAll("[data-module-target]").forEach(btn => {
      if (btn.getAttribute("data-module-target") === moduleId) {
        btn.classList.add("active", "text-cyan-400", "bg-cyan-950/60", "border-cyan-500/40");
        btn.classList.remove("text-slate-400", "border-transparent");
      } else {
        btn.classList.remove("active", "text-cyan-400", "bg-cyan-950/60", "border-cyan-500/40");
        btn.classList.add("text-slate-400", "border-transparent");
      }
    });

    // Sync Section Navigation Bars (Osteology vs Myology vs Hub)
    const osteoBtn = document.getElementById("btn-nav-osteology");
    const myoBtn = document.getElementById("btn-nav-myology");
    const osteoNav = document.getElementById("osteology-sub-nav");
    const myoNav = document.getElementById("myology-sub-nav");
    const isMyo = (moduleId === "module-myology");
    const isHub = (moduleId === "hub" || moduleId === "hero-section");

    if (osteoBtn && myoBtn) {
      if (isMyo) {
        myoBtn.classList.add("active", "bg-rose-500/20", "text-rose-400", "border-rose-500/40");
        myoBtn.classList.remove("text-slate-400");
        osteoBtn.classList.remove("active", "bg-cyan-500/20", "text-cyan-400", "border-cyan-500/40");
        osteoBtn.classList.add("text-slate-400");
        if (osteoNav) osteoNav.classList.add("hidden");
        if (myoNav) myoNav.classList.remove("hidden");
      } else {
        osteoBtn.classList.add("active", "bg-cyan-500/20", "text-cyan-400", "border-cyan-500/40");
        osteoBtn.classList.remove("text-slate-400");
        myoBtn.classList.remove("active", "bg-rose-500/20", "text-rose-400", "border-rose-500/40");
        myoBtn.classList.add("text-slate-400");
        if (osteoNav) osteoNav.classList.remove("hidden");
        if (myoNav) myoNav.classList.add("hidden");
      }
    }

    // Hero section visibility:
    const heroSec = document.getElementById("hero-section");
    if (heroSec) {
      if (moduleId === "module1" || moduleId === "hub") {
        heroSec.classList.remove("hidden");
        if (window.HeroIntro && typeof window.HeroIntro.resize === "function") {
          setTimeout(window.HeroIntro.resize, 60);
        }
      } else {
        heroSec.classList.add("hidden");
      }
    }

    // Hide all module sections and show the target
    document.querySelectorAll(".module-section").forEach(sec => {
      sec.classList.add("hidden");
    });

    const activeSec = document.getElementById(moduleId);
    if (activeSec) {
      activeSec.classList.remove("hidden");
      if (moduleId === "module-myology" && window.ModuleMyology && typeof window.ModuleMyology.init === "function") {
        window.ModuleMyology.init();
      }

      // Smooth scroll to top of viewport
      if (!isInitialLoad || shouldScroll) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (isHub && heroSec) {
      heroSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    playUiSound("click");
  }

  // 2. QIDIRUV TIZIMI (UZBEK & LATIN)
  function setupSearch() {
    const searchInput = document.getElementById("global-search-input");
    const searchResults = document.getElementById("global-search-results");
    const searchModal = document.getElementById("search-modal");
    const searchOpenBtn = document.getElementById("btn-open-search");
    const searchCloseBtn = document.getElementById("btn-close-search");

    if (searchOpenBtn && searchModal) {
      searchOpenBtn.addEventListener("click", () => {
        searchModal.classList.remove("hidden");
        if (searchInput) searchInput.focus();
      });
    }

    if (searchCloseBtn && searchModal) {
      searchCloseBtn.addEventListener("click", () => {
        searchModal.classList.add("hidden");
      });
    }

    if (searchInput && searchResults) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
          searchResults.innerHTML = '<div class="p-4 text-center text-xs text-slate-500">Qidirish uchun kamida 2 ta harf kiriting (masalan: "dens", "tish", "atlant", "clavicula", "son")...</div>';
          return;
        }

        const glossaryMatches = getGlossary().filter(item => 
          item.lat.toLowerCase().includes(query) ||
          item.uz.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query)
        );

        if (glossaryMatches.length === 0) {
          searchResults.innerHTML = '<div class="p-6 text-center text-sm text-slate-400">Hech qanday anatomik atama topilmadi.</div>';
          return;
        }

        searchResults.innerHTML = glossaryMatches.map(m => `
          <div class="p-3.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all mb-2" onclick="App.jumpToSearchTerm('${m.cat}', '${m.lat}')">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-white">${m.uz}</span>
              <span class="text-xs font-mono text-cyan-400 italic">${m.lat}</span>
            </div>
            <p class="text-xs text-slate-300 mt-1">${m.desc}</p>
            <div class="flex items-center space-x-2 mt-2 text-[10px] text-amber-300 font-mono">
              <span class="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">${m.cat} bo'limi</span>
              <span>Ahmedov ${m.fig}-rasmlar</span>
            </div>
          </div>
        `).join("");
      });
    }
  }

  function jumpToSearchTerm(category, latTerm) {
    const searchModal = document.getElementById("search-modal");
    if (searchModal) searchModal.classList.add("hidden");

    const catToModule = {
      "Umumiy": "module1",
      "Tana": "module2",
      "Qo'l": "module3",
      "Oyoq": "module4",
      "Kalla": "module5",
      "Miologiya": "module-myology",
      "Muskullar": "module-myology"
    };

    const targetMod = catToModule[category] || "module1";
    switchModule(targetMod);
  }

  // 3. LOTINCHA-O'ZBEKCHA LUG'AT
  function setupGlossary() {
    renderGlossaryList("Barchasi");

    const catButtons = document.querySelectorAll("[data-glossary-cat]");
    catButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        catButtons.forEach(b => b.classList.remove("active", "bg-cyan-500", "text-slate-950"));
        btn.classList.add("active", "bg-cyan-500", "text-slate-950");
        renderGlossaryList(btn.getAttribute("data-glossary-cat"));
      });
    });

    const searchInp = document.getElementById("glossary-filter-input");
    if (searchInp) {
      searchInp.addEventListener("input", (e) => {
        renderGlossaryList("Barchasi", e.target.value.toLowerCase().trim());
      });
    }
  }

  function renderGlossaryList(catFilter, query = "") {
    const container = document.getElementById("glossary-terms-grid");
    if (!container) return;

    let items = getGlossary();
    if (catFilter && catFilter !== "Barchasi") {
      items = items.filter(x => x.cat === catFilter);
    }
    if (query) {
      items = items.filter(x => 
        x.lat.toLowerCase().includes(query) ||
        x.uz.toLowerCase().includes(query) ||
        x.desc.toLowerCase().includes(query)
      );
    }

    container.innerHTML = items.map(item => `
      <div class="glass-panel glass-panel-hover p-4 rounded-xl flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-mono font-bold text-cyan-400 italic">${item.lat}</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${item.cat}</span>
          </div>
          <h5 class="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">${item.uz}</h5>
          <p class="text-xs text-slate-300 leading-relaxed">${item.desc}</p>
        </div>
        <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span class="text-amber-400/90 font-mono">Rasmlar: ${item.fig}</span>
          <button onclick="App.speakTerm('${item.lat}')" class="text-slate-400 hover:text-cyan-300 transition-colors p-1" title="Talaffuz qilish">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `).join("");
  }

  function speakTerm(text) {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'la'; // Latin pronunciation
      window.speechSynthesis.speak(utter);
    }
  }

  // 4. INTERAKTIV VIKTORINA (QUIZ ENGINE)
  function setupQuiz() {
    const questions = getQuizQuestions();
    quizIndex = 0;
    quizScore = 0;
    quizAnswers = new Array(questions.length).fill(null);
    quizFinished = false;
    updateQuizScore();
    renderQuizQuestion();

    const restartBtn = document.getElementById("btn-restart-quiz");
    if (restartBtn) {
      restartBtn.onclick = () => {
        setupQuiz();
        if (typeof playUiSound === "function") playUiSound("click");
      };
    }
  }

  function updateQuizScore() {
    const questions = getQuizQuestions();
    quizScore = questions.reduce((acc, q, idx) => {
      return acc + (quizAnswers[idx] === q.correct ? 1 : 0);
    }, 0);

    const scoreBadge = document.getElementById("quiz-score-badge");
    const countBadge = document.getElementById("quiz-counter-badge");
    if (scoreBadge) scoreBadge.innerText = `Ball: ${quizScore}`;
    if (countBadge && questions.length > 0) {
      countBadge.innerText = `Savol: ${quizIndex + 1} / ${questions.length}`;
    }
  }

  function getKnowledgeAssessment(score, total) {
    const pct = total > 0 ? (score / total) * 100 : 0;
    if (pct >= 85) {
      return {
        level: "A'lo darajada — Haqiqiy anatom mutaxassisi!",
        colorClass: "text-amber-400 bg-amber-500/10 border-amber-500/30",
        icon: "fa-trophy",
        desc: "Tabriklaymiz! Siz Prof. N.K. Ahmedovning 'Odam anatomiyasi (Osteologiya)' 1-bo'limini mukammal o'zlashtirgansiz! Barcha suyaklar, teshiklar, o'simtalar va gistologik qatlamlarni chuqur bilasiz."
      };
    } else if (pct >= 70) {
      return {
        level: "Yaxshi bilim — Osteologiyani yaxshi o'zlashtirgansiz",
        colorClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
        icon: "fa-medal",
        desc: "Juda yaxshi natija! Skelet tizimi va uning asosiy anatomik tuzilmalari bo'yicha mustahkam bilimga egasiz. Faqat bir nechta nozik klinik va kalla teshiklari savollarida ehtiyotkor bo'lish tavsiya etiladi."
      };
    } else if (pct >= 50) {
      return {
        level: "Qoniqarli — Yana biroz o'qish va takrorlash kerak",
        colorClass: "text-blue-400 bg-blue-500/10 border-blue-500/30",
        icon: "fa-book-open-reader",
        desc: "Yomon emas, sizda asosiy anatomik tayanch mavjud. Biroq kalla suyaklari, chanoq birlashishi va suyak kimyoviy nisbatlarini atlas orqali yana bir bor takrorlab chiqish maqsadga muvofiqdir."
      };
    } else {
      return {
        level: "Boshlang'ich daraja — Darslikni qayta ko'rib chiqish tavsiya etiladi",
        colorClass: "text-rose-400 bg-rose-500/10 border-rose-500/30",
        icon: "fa-graduation-cap",
        desc: "Xafa bo'lmang! Anatomiya — chuqur va sabr talab qiladigan fan. Ahmedov atlasining 4–53-betlarini hamda ilovadagi interaktiv suyak modellarini qayta ko'rib chiqib, viktorinani yana topshirib ko'ring."
      };
    }
  }

  function renderQuizQuestion() {
    const qBox = document.getElementById("quiz-question-box");
    const countBadge = document.getElementById("quiz-counter-badge");
    const scoreBadge = document.getElementById("quiz-score-badge");
    if (!qBox) return;

    const questions = getQuizQuestions();
    const total = questions.length;
    updateQuizScore();

    // 1. QUIZ FINISHED RESULTS SCREEN (Knowledge Level Assessment)
    if (quizFinished) {
      const pct = Math.round((quizScore / total) * 100);
      const assessment = getKnowledgeAssessment(quizScore, total);
      const answeredCount = quizAnswers.filter(a => a !== null).length;

      if (countBadge) countBadge.innerText = `Natija: ${quizScore} / ${total}`;

      qBox.innerHTML = `
        <div class="p-6 sm:p-10 animate-fadeIn space-y-8">
          <!-- Top Results Trophy & Heading -->
          <div class="text-center space-y-3">
            <div class="w-20 h-20 mx-auto rounded-3xl ${assessment.colorClass} border-2 flex items-center justify-center text-3xl shadow-xl">
              <i class="fa-solid ${assessment.icon}"></i>
            </div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Viktorina Yakunlandi!</h3>
            <p class="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Prof. N.K. Ahmedovning "Odam anatomiyasi (1-jild)" Osteologiya bo'limi bo'yicha bilim sinovi yakunlandi.
            </p>
          </div>

          <!-- Knowledge Level Assessment Banner -->
          <div class="p-5 sm:p-6 rounded-2xl ${assessment.colorClass} border text-center space-y-2 shadow-lg">
            <div class="text-xs font-mono font-bold uppercase tracking-wider">Bilim darajasi bahosi:</div>
            <div class="text-lg sm:text-xl font-extrabold">${assessment.level}</div>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl mx-auto opacity-95">
              ${assessment.desc}
            </p>
          </div>

          <!-- Key Stats Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div class="text-2xl font-extrabold text-cyan-400 font-mono">${quizScore} / ${total}</div>
              <div class="text-[11px] text-slate-400 mt-1 font-medium">To'g'ri javoblar</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div class="text-2xl font-extrabold text-emerald-400 font-mono">${pct}%</div>
              <div class="text-[11px] text-slate-400 mt-1 font-medium">O'zlashtirish</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div class="text-2xl font-extrabold text-amber-400 font-mono">${total - quizScore}</div>
              <div class="text-[11px] text-slate-400 mt-1 font-medium">Xatolar</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div class="text-2xl font-extrabold text-indigo-400 font-mono">${answeredCount} / ${total}</div>
              <div class="text-[11px] text-slate-400 mt-1 font-medium">Yechilgan savollar</div>
            </div>
          </div>

          <!-- Question-by-Question Breakdown Stepper -->
          <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span class="font-bold text-slate-200">Barcha 15 ta savol tahlili (Savolni ko'rish uchun bosing):</span>
              <span class="font-mono text-cyan-400">${quizScore} to'g'ri, ${total - quizScore} noto'g'ri</span>
            </div>
            <div class="flex flex-wrap gap-2 pt-1">
              ${questions.map((qItem, idx) => {
                const ans = quizAnswers[idx];
                const isCor = ans === qItem.correct;
                const isUnanswered = ans === null;
                let btnCls = "bg-slate-800 border-slate-700 text-slate-400";
                let icon = "-";
                if (!isUnanswered) {
                  if (isCor) {
                    btnCls = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
                    icon = '<i class="fa-solid fa-check text-[10px]"></i>';
                  } else {
                    btnCls = "bg-rose-500/20 border-rose-500/50 text-rose-300";
                    icon = '<i class="fa-solid fa-xmark text-[10px]"></i>';
                  }
                }
                return `
                  <button type="button" onclick="App.goToQuestion(${idx})" class="quiz-stepper-btn border ${btnCls}" title="Savol ${idx + 1}: ${isUnanswered ? 'Javob berilmagan' : (isCor ? 'To\'g\'ri' : 'Noto\'g\'ri')}">
                    <span class="mr-0.5">${idx + 1}</span> ${icon}
                  </button>
                `;
              }).join("")}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button type="button" onclick="App.setupQuiz()" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2">
              <i class="fa-solid fa-rotate-right"></i>
              <span>Qayta boshlash</span>
            </button>
            <button type="button" onclick="App.goToQuestion(0)" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all flex items-center justify-center space-x-2">
              <i class="fa-solid fa-list-check text-cyan-400"></i>
              <span>Savollarni tahlil qilish (1-savoldan)</span>
            </button>
          </div>
        </div>
      `;
      return;
    }

    // 2. ACTIVE QUESTION SCREEN
    const q = questions[quizIndex];
    if (!q) return;

    const chosenIdx = quizAnswers[quizIndex];
    const isAnswered = chosenIdx !== null;
    const isCorrect = isAnswered && chosenIdx === q.correct;
    const answeredCount = quizAnswers.filter(a => a !== null).length;

    qBox.innerHTML = `
      <div class="p-5 sm:p-7 animate-fadeIn space-y-6">
        
        <!-- Interactive 15-Question Navigation Stepper Bar -->
        <div class="space-y-2 pb-4 border-b border-slate-800">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center space-x-2">
              <span class="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono font-bold">
                Savol: ${quizIndex + 1} / ${total}
              </span>
              <span class="text-slate-400 hidden sm:inline font-mono">
                Javob berildi: ${answeredCount} / ${total}
              </span>
            </div>
            <button type="button" onclick="App.finishQuiz()" class="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 flex items-center space-x-1">
              <span>Natijani ko'rish</span>
              <i class="fa-solid fa-flag-checkered text-[10px]"></i>
            </button>
          </div>

          <div class="flex items-center gap-1.5 overflow-x-auto py-1.5 px-0.5">
            ${questions.map((qItem, idx) => {
              const ans = quizAnswers[idx];
              const isCurr = idx === quizIndex;
              let cls = "bg-slate-900/80 border-slate-800 text-slate-400";
              if (ans !== null) {
                if (ans === qItem.correct) {
                  cls = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
                } else {
                  cls = "bg-rose-500/20 border-rose-500/50 text-rose-300";
                }
              }
              if (isCurr) {
                cls += " quiz-stepper-current ring-2 ring-cyan-500/40";
              }
              return `
                <button type="button" onclick="App.goToQuestion(${idx})" class="quiz-stepper-btn border ${cls}" title="Savol ${idx + 1} ga o'tish">
                  ${idx + 1}
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Question Prompt -->
        <div>
          <div class="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1.5">
            <i class="fa-solid fa-circle-question"></i>
            <span>Ahmedov darsligi bo'yicha klinik savol:</span>
          </div>
          <h4 class="text-base sm:text-lg font-bold text-white leading-relaxed">
            ${q.question}
          </h4>
        </div>

        <!-- Options List (A, B, C, D) -->
        <div class="space-y-3">
          ${q.options.map((opt, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            let optClass = "bg-slate-900/70 border-slate-800 text-slate-200 hover:bg-slate-800/80 hover:border-cyan-500/50";
            let badgeClass = "bg-slate-800 text-slate-300 border-slate-700";
            let statusIcon = "";

            if (isAnswered) {
              if (idx === chosenIdx) {
                if (isCorrect) {
                  optClass = "quiz-option-correct border-emerald-500 font-semibold";
                  badgeClass = "bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold";
                  statusIcon = '<i class="fa-solid fa-circle-check text-emerald-400 text-base ml-auto"></i>';
                } else {
                  optClass = "quiz-option-wrong border-rose-500 font-semibold";
                  badgeClass = "bg-rose-500 text-white border-rose-400 font-extrabold";
                  statusIcon = '<i class="fa-solid fa-circle-xmark text-rose-400 text-base ml-auto"></i>';
                }
              } else if (idx === q.correct) {
                optClass = "border-emerald-500/60 bg-emerald-950/20 text-emerald-300 font-medium";
                badgeClass = "bg-emerald-600/60 text-white border-emerald-500";
                statusIcon = '<span class="text-[11px] text-emerald-400 font-mono ml-auto">(To\'g\'ri javob)</span>';
              }
            }

            return `
              <button type="button" onclick="App.answerQuiz(${idx})" class="quiz-option-btn w-full text-left p-3.5 sm:p-4 rounded-2xl border ${optClass} text-sm font-medium transition-all flex items-center space-x-3 group">
                <span class="w-8 h-8 rounded-xl ${badgeClass} flex items-center justify-center text-xs font-bold shrink-0 border transition-colors shadow-sm">
                  ${letter}
                </span>
                <span class="flex-1 leading-snug">${opt}</span>
                ${statusIcon}
              </button>
            `;
          }).join("")}
        </div>

        <!-- Explanation Card (Visible once question is answered) -->
        ${isAnswered ? `
          <div class="p-4 sm:p-5 rounded-2xl border animate-fadeIn ${isCorrect ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/30 border-rose-500/40 text-rose-200'}">
            <div class="flex items-center space-x-2 font-bold text-sm mb-1.5">
              <i class="fa-solid ${isCorrect ? 'fa-circle-check text-emerald-400' : 'fa-circle-exclamation text-rose-400'}"></i>
              <span>${isCorrect ? "To'g'ri javob!" : "Noto'g'ri javob!"}</span>
            </div>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              ${q.explanation}
            </p>
          </div>
        ` : ''}

        <!-- Bottom Navigation Bar (Oldingi / Keyingi / Yakunlash) -->
        <div class="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <!-- Previous Button -->
          <button type="button" onclick="App.prevQuizQuestion()" ${quizIndex === 0 ? 'disabled' : ''} class="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${quizIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:border-cyan-500/40'}">
            <i class="fa-solid fa-arrow-left text-xs"></i>
            <span>Oldingi</span>
          </button>

          <!-- Middle Progress Indicator -->
          <div class="text-xs font-mono text-slate-400 hidden sm:block">
            <span>Savol: ${quizIndex + 1} / ${total}</span>
          </div>

          <!-- Next or Finish Button -->
          ${quizIndex < total - 1 ? `
            <button type="button" onclick="App.nextQuizQuestion()" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-extrabold transition-all shadow-md shadow-cyan-500/25 flex items-center space-x-2">
              <span>Keyingi</span>
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>
          ` : `
            <button type="button" onclick="App.finishQuiz()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs sm:text-sm font-extrabold transition-all shadow-lg shadow-emerald-500/30 flex items-center space-x-2">
              <i class="fa-solid fa-flag-checkered text-xs"></i>
              <span>Viktorinani yakunlash</span>
            </button>
          `}
        </div>

      </div>
    `;
  }

  function answerQuiz(chosenIdx) {
    const questions = getQuizQuestions();
    const q = questions[quizIndex];
    if (!q) return;

    quizAnswers[quizIndex] = chosenIdx;
    const isCorrect = chosenIdx === q.correct;
    if (isCorrect) {
      if (typeof playUiSound === "function") playUiSound("correct");
    } else {
      if (typeof playUiSound === "function") playUiSound("wrong");
    }

    renderQuizQuestion();
  }

  function prevQuizQuestion() {
    if (quizIndex > 0) {
      quizIndex--;
      renderQuizQuestion();
      if (typeof playUiSound === "function") playUiSound("click");
    }
  }

  function nextQuizQuestion() {
    const questions = getQuizQuestions();
    if (quizIndex < questions.length - 1) {
      quizIndex++;
      renderQuizQuestion();
      if (typeof playUiSound === "function") playUiSound("click");
    } else {
      finishQuiz();
    }
  }

  function goToQuestion(idx) {
    const questions = getQuizQuestions();
    if (idx >= 0 && idx < questions.length) {
      quizIndex = idx;
      quizFinished = false;
      renderQuizQuestion();
      if (typeof playUiSound === "function") playUiSound("click");
    }
  }

  function finishQuiz() {
    quizFinished = true;
    renderQuizQuestion();
    if (typeof playUiSound === "function") playUiSound("correct");
  }

  // 5. ASL RASMLAR VA ATLAZ FIGURALARI GALEREYASI
  function setupAtlasGallery() {
    const container = document.getElementById("atlas-figures-gallery");
    if (!container) return;

    // List of key figures available in extracted_pages
    const pages = [
      { num: 4, fig: "1, 2-rasmlar", title: "Odam skeleti (old va orqa tomondan ko'rinishi)", file: "extracted_pages/page_005.jpg" },
      { num: 5, fig: "3-rasm", title: "Katta boldir suyagining bo'yiga kesilgani", file: "extracted_pages/page_006.jpg" },
      { num: 6, fig: "4-rasm", title: "Katta boldir suyagi va periost qatlamlari", file: "extracted_pages/page_007.jpg" },
      { num: 8, fig: "5, 6-rasmlar", title: "Ko'krak umurtqasi (vertebra thoracica)", file: "extracted_pages/page_009.jpg" },
      { num: 10, fig: "11, 12, 13-rasmlar", title: "Atlant va Aksis (I va II bo'yin umurtqalari)", file: "extracted_pages/page_011.jpg" },
      { num: 19, fig: "30, 31-rasmlar", title: "Tirsak suyagi (ulna) old va orqa yuzalari", file: "extracted_pages/page_020.jpg" },
      { num: 20, fig: "32, 33-rasmlar", title: "Bilak suyagi (radius) old va orqa yuzalari", file: "extracted_pages/page_021.jpg" },
      { num: 21, fig: "36, 37-rasmlar", title: "Qo'l panjasining skeleti (ossa manus)", file: "extracted_pages/page_022.jpg" },
      { num: 24, fig: "47, 48-rasmlar", title: "Chanoq suyagi (os coxae) ichki va tashqi yuzasi", file: "extracted_pages/page_025.jpg" },
      { num: 30, fig: "59, 60-rasmlar", title: "Oyoq panjasining skeleti (ossa pedis)", file: "extracted_pages/page_031.jpg" },
      { num: 33, fig: "69, 70-rasmlar", title: "Bosh skeleti (cranium) old va yon ko'rinishi", file: "extracted_pages/page_034.jpg" },
      { num: 45, fig: "96, 97, 98-rasmlar", title: "Pastki jag' suyagi (mandibula) va burchagi", file: "extracted_pages/page_046.jpg" },
      { num: 51, fig: "109-rasm", title: "Kalla suyagi tubining sirti (basis cranii externa)", file: "extracted_pages/page_052.jpg" },
      { num: 52, fig: "110, 111-rasmlar", title: "Kalla suyagi tubining ichi (basis cranii interna)", file: "extracted_pages/page_053.jpg" },
      { num: 53, fig: "112, 113-rasmlar", title: "Chaqaloq kallasining skeleti va liqildoqlar", file: "extracted_pages/page_054.jpg" }
    ];

    container.innerHTML = pages.map(p => `
      <div class="glass-panel p-3.5 rounded-2xl flex flex-col justify-between group cursor-pointer hover:border-cyan-400 transition-all" onclick="App.openFigureModal('${p.file}', '${p.fig}: ${p.title}')">
        <div class="aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-slate-950 relative">
          <img src="${p.file}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
          <span class="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-cyan-300 border border-cyan-500/30">
            ${p.fig}
          </span>
        </div>
        <div>
          <h5 class="text-xs font-bold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors">${p.title}</h5>
          <span class="text-[10px] text-slate-400 font-mono mt-1 block">Kitobdagi ${p.num}-bet</span>
        </div>
      </div>
    `).join("");
  }

  function openFigureModal(imgSrc, title) {
    const modal = document.getElementById("figure-modal");
    const modalImg = document.getElementById("figure-modal-img");
    const modalTitle = document.getElementById("figure-modal-title");
    if (!modal || !modalImg) return;

    modalImg.src = imgSrc;
    if (modalTitle) modalTitle.innerText = title;
    modal.classList.remove("hidden");
  }

  function closeFigureModal() {
    const modal = document.getElementById("figure-modal");
    if (modal) modal.classList.add("hidden");
  }

  // 6. TIBBIY OVOZ EFFEKTI (Web Audio API)
  function playUiSound(type) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === "click") {
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === "correct") {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === "wrong") {
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.setValueAtTime(180, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      }
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }

  // 7. KEYBOARD SHORTCUTS
  function setupKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      // Ctrl+K or Cmd+K opens search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const searchModal = document.getElementById("search-modal");
        const searchInput = document.getElementById("global-search-input");
        if (searchModal) {
          searchModal.classList.remove("hidden");
          if (searchInput) searchInput.focus();
        }
      }
      // 'T' toggles Study Mode (Active Recall: hides diagram label texts)
      if (e.key.toLowerCase() === "t" && !["input", "textarea"].includes((e.target.tagName || "").toLowerCase())) {
        e.preventDefault();
        toggleStudyMode();
      }
      // Esc closes modals
      if (e.key === "Escape") {
        const searchModal = document.getElementById("search-modal");
        const figModal = document.getElementById("figure-modal");
        const adminModal = document.getElementById("admin-modal");
        if (searchModal) searchModal.classList.add("hidden");
        if (figModal) figModal.classList.add("hidden");
        if (adminModal) {
          if (window.AdminPanel && typeof window.AdminPanel.close === "function") {
            window.AdminPanel.close();
          } else {
            adminModal.classList.add("hidden");
          }
        }
      }
    });
  }

  return {
    init,
    setTheme,
    getTheme: () => localStorage.getItem("atlas_theme") || "night",
    toggleStudyMode,
    setStudyMode,
    renderClinicalDossier,
    switchModule,
    jumpToSearchTerm,
    speakTerm,
    setupGlossary,
    setupQuiz,
    answerQuiz,
    prevQuizQuestion,
    nextQuizQuestion,
    goToQuestion,
    finishQuiz,
    openFigureModal,
    closeFigureModal,
    playUiSound,
    getQuizQuestions,
    getGlossary,
    reloadQuiz: () => setupQuiz(),
    reloadGlossary: () => setupGlossary()
  };
})();

// DOM Ready initialization
document.addEventListener("DOMContentLoaded", () => {
  window.App.init();
});
