/**
 * ============================================================================
 * ODAM ANATOMIYASI (ATLAS, 1-JILD) — PROF. N.K. AHMEDOV
 * TIZIM ADMINISTRATORI PANELI (ADMIN PANEL) — LOCALSTORAGE CRUD
 * ============================================================================
 * Imkoniyatlar:
 * 1. Viktorina savollarini ko'rish, qidirish, yangi savol qo'shish, tahrirlash, o'chirish.
 * 2. Anatomik atamalar va qo'shimcha konspektlarni (glossary) boshqarish.
 * 3. Zaxira nusxa (JSON Backup) eksporti va importi.
 * 4. Xavfsizlik: Ixtiyoriy PIN-kod (passcode) bilan himoyalash/o'chirish.
 * 5. Barcha o'zgarishlar brauzerning localStorage xotirasida avtomatik saqlanadi
 *    va ilovadagi asosiy viktorina hamda qidiruv tizimida darhol aks etadi.
 * ============================================================================
 */

window.AdminPanel = (function () {
  "use strict";

  // LocalStorage kalitlari
  const STORAGE_KEYS = {
    QUESTIONS: "custom_quiz_questions",
    ENTRIES: "custom_glossary_entries",
    MUSCLES: "custom_myology_entries",
    PIN_ENABLED: "admin_pin_enabled",
    PIN_CODE: "admin_pin_code"
  };

  // Standart sozlamalar
  const DEFAULT_PIN = "2026";

  // Holat (State)
  let state = {
    isOpen: false,
    activeTab: "questions", // 'questions' | 'entries' | 'muscles' | 'backup' | 'settings'
    isUnlocked: false,
    searchQuery: "",
    musclesSearchQuery: "",
    categoryFilter: "Barchasi",
    editingQuestionId: null,
    editingEntryId: null,
    editingMuscleId: null
  };

  // ==========================================================================
  // 1. DATA ACCESS & INITIALIZATION
  // ==========================================================================

  function getStoredQuestions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Quiz savollarini o'qishda xatolik:", e);
    }
    // Standart savollarni data.js dan olish
    const defaults = (window.ATLAS_DATA && window.ATLAS_DATA.quizQuestions) 
      ? JSON.parse(JSON.stringify(window.ATLAS_DATA.quizQuestions)) 
      : [];
    if (defaults.length > 0) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(defaults));
    }
    return defaults;
  }

  function saveStoredQuestions(questions) {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
      if (window.App && typeof window.App.reloadQuiz === "function") {
        window.App.reloadQuiz();
      }
      return true;
    } catch (e) {
      console.error("Savollarni saqlashda xatolik:", e);
      showToast("Xatolik: Xotiraga saqlab bo'lmadi!", "error");
      return false;
    }
  }

  function getStoredEntries() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ENTRIES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Anatomik qaydlarni o'qishda xatolik:", e);
    }
    return [];
  }

  function saveStoredEntries(entries) {
    try {
      localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
      if (window.App && typeof window.App.reloadGlossary === "function") {
        window.App.reloadGlossary();
      }
      return true;
    } catch (e) {
      console.error("Qaydlarni saqlashda xatolik:", e);
      showToast("Xatolik: Xotiraga saqlab bo'lmadi!", "error");
      return false;
    }
  }

  function isPinProtected() {
    return localStorage.getItem(STORAGE_KEYS.PIN_ENABLED) === "true";
  }

  function getPinCode() {
    return localStorage.getItem(STORAGE_KEYS.PIN_CODE) || DEFAULT_PIN;
  }

  // ==========================================================================
  // 2. MODAL OCHISH / YOPISH & XAVFSIZLIK
  // ==========================================================================

  function open() {
    const modal = document.getElementById("admin-modal");
    if (!modal) return;

    state.isOpen = true;
    modal.classList.remove("hidden");

    // Xavfsizlik PIN tekshiruvi
    const pinNeeded = isPinProtected() && !state.isUnlocked;
    const passView = document.getElementById("admin-passcode-view");
    const mainView = document.getElementById("admin-main-view");
    const lockBtn = document.getElementById("admin-btn-lock");

    if (pinNeeded) {
      if (passView) passView.classList.remove("hidden");
      if (mainView) mainView.classList.add("hidden");
      if (lockBtn) lockBtn.classList.add("hidden");
      renderPinScreen();
    } else {
      if (passView) passView.classList.add("hidden");
      if (mainView) mainView.classList.remove("hidden");
      if (lockBtn) {
        if (isPinProtected()) lockBtn.classList.remove("hidden");
        else lockBtn.classList.add("hidden");
      }
      renderActiveTab();
    }

    if (window.App && typeof window.App.playUiSound === "function") {
      window.App.playUiSound("click");
    }
  }

  function close() {
    const modal = document.getElementById("admin-modal");
    if (modal) modal.classList.add("hidden");
    state.isOpen = false;
    closeQuestionFormModal();
    closeEntryFormModal();
  }

  function toggleLock() {
    state.isUnlocked = false;
    open();
    showToast("Admin paneli qulflandi", "info");
  }

  function renderPinScreen() {
    const container = document.getElementById("admin-passcode-view");
    if (!container) return;

    container.innerHTML = `
      <div class="max-w-sm w-full mx-auto p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 text-center shadow-2xl animate-fadeIn">
        <div class="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg shadow-cyan-500/20">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
        <h4 class="text-lg font-bold text-white mb-1">Xavfsizlik Himoyasi</h4>
        <p class="text-xs text-slate-400 mb-5">
          Admin paneliga kirish uchun 4 xonali PIN-kodni kiriting (Standart PIN: <span class="text-cyan-400 font-mono font-bold">${DEFAULT_PIN}</span>)
        </p>

        <form id="admin-pin-form" onsubmit="AdminPanel.handlePinSubmit(event)" class="space-y-4">
          <div>
            <input id="admin-pin-input" type="password" maxlength="8" autofocus placeholder="••••" class="w-full text-center text-2xl tracking-[0.4em] font-mono py-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-white focus:outline-none focus:border-cyan-400 shadow-inner" required>
          </div>
          <div id="admin-pin-error" class="text-xs text-rose-400 hidden font-medium">
            <i class="fa-solid fa-circle-exclamation mr-1"></i>PIN-kod noto'g'ri kiritildi!
          </div>
          <div class="flex items-center space-x-2 pt-2">
            <button type="submit" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm transition-all shadow-md shadow-cyan-500/25">
              Kirish
            </button>
            <button type="button" onclick="AdminPanel.close()" class="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-all">
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
    `;

    setTimeout(() => {
      const pinInput = document.getElementById("admin-pin-input");
      if (pinInput) pinInput.focus();
    }, 100);
  }

  function handlePinSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("admin-pin-input");
    const errorBox = document.getElementById("admin-pin-error");
    if (!input) return;

    const entered = input.value.trim();
    const correct = getPinCode();

    if (entered === correct) {
      state.isUnlocked = true;
      if (errorBox) errorBox.classList.add("hidden");
      showToast("Muvaffaqiyatli autentifikatsiya qilindi!", "success");
      open();
    } else {
      if (errorBox) errorBox.classList.remove("hidden");
      input.value = "";
      input.focus();
      if (window.App && typeof window.App.playUiSound === "function") {
        window.App.playUiSound("wrong");
      }
    }
  }

  // ==========================================================================
  // 3. TABS VA INTERFEYS BOSHQARUVI
  // ==========================================================================

  function setTab(tabId) {
    state.activeTab = tabId;

    // Tab tugmalarini yangilash
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
      btn.classList.remove("active", "bg-cyan-950/80", "text-cyan-400", "border-cyan-500/40");
      btn.classList.add("text-slate-400", "border-transparent");
    });
    const activeBtn = document.getElementById(`admin-tab-${tabId}`);
    if (activeBtn) {
      activeBtn.classList.add("active", "bg-cyan-950/80", "text-cyan-400", "border-cyan-500/40");
      activeBtn.classList.remove("text-slate-400", "border-transparent");
    }

    // Tab kontentlarini ko'rsatish/yashirish
    document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.add("hidden"));
    const activeContent = document.getElementById(`admin-content-${tabId}`);
    if (activeContent) activeContent.classList.remove("hidden");

    renderActiveTab();
  }

  function renderActiveTab() {
    updateBadges();
    if (state.activeTab === "questions") {
      renderQuestionsTab();
    } else if (state.activeTab === "entries") {
      renderEntriesTab();
    } else if (state.activeTab === "muscles") {
      renderMusclesTab();
    } else if (state.activeTab === "backup") {
      renderBackupTab();
    } else if (state.activeTab === "settings") {
      renderSettingsTab();
    }
  }

  function updateBadges() {
    const qBadge = document.getElementById("admin-questions-badge");
    const eBadge = document.getElementById("admin-entries-badge");
    const mBadge = document.getElementById("admin-muscles-badge");
    if (qBadge) qBadge.innerText = getStoredQuestions().length;
    if (eBadge) eBadge.innerText = getStoredEntries().length;
    if (mBadge) mBadge.innerText = getAllMusclesList().length;
  }

  // ==========================================================================
  // 4. TAB 1: VIKTORINA SAVOLLARI (CRUD)
  // ==========================================================================

  function renderQuestionsTab() {
    const container = document.getElementById("admin-content-questions");
    if (!container) return;

    const allQuestions = getStoredQuestions();
    const query = state.searchQuery.toLowerCase().trim();

    const filtered = allQuestions.filter(q => {
      if (!query) return true;
      const inText = q.question.toLowerCase().includes(query);
      const inExp = (q.explanation || "").toLowerCase().includes(query);
      const inOpts = q.options.some(o => o.toLowerCase().includes(query));
      return inText || inExp || inOpts;
    });

    container.innerHTML = `
      <!-- Toolbar: Search, Add Button, Reset Button -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div class="relative flex-1">
          <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
          <input 
            type="text" 
            id="admin-questions-search" 
            placeholder="Savollarni qidirish (savol matni, izoh, variantlar)..." 
            value="${escapeHtml(state.searchQuery)}"
            oninput="AdminPanel.handleQuestionsSearch(this.value)"
            class="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-cyan-400 text-xs text-white placeholder-slate-500 font-sans"
          >
        </div>
        <div class="flex items-center space-x-2 shrink-0">
          <button 
            type="button" 
            onclick="AdminPanel.openQuestionForm()" 
            class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center space-x-1.5"
          >
            <i class="fa-solid fa-plus text-xs"></i>
            <span>Yangi Savol Qo'shish</span>
          </button>
          <button 
            type="button" 
            onclick="AdminPanel.confirmResetQuestions()" 
            class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all flex items-center space-x-1" 
            title="Standart 15 ta Ahmedov savollarini tiklash"
          >
            <i class="fa-solid fa-rotate-left text-xs"></i>
            <span class="hidden md:inline">Qayta tiklash</span>
          </button>
        </div>
      </div>

      <!-- Question Statistics Bar -->
      <div class="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
        <span>Jami savollar: <strong class="text-cyan-400">${allQuestions.length} ta</strong> ${query ? `(filtrlangan: ${filtered.length})` : ''}</span>
        <span class="text-[11px] text-slate-500">Ahmedov 1-jild (Osteologiya)</span>
      </div>

      <!-- Questions List -->
      <div class="space-y-3">
        ${filtered.length === 0 ? `
          <div class="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            <i class="fa-solid fa-folder-open text-3xl text-slate-600 mb-2"></i>
            <p>Hech qanday savol topilmadi.</p>
          </div>
        ` : filtered.map((q, idx) => {
          const actualIndex = allQuestions.findIndex(x => x.id === q.id || x.question === q.question);
          return `
            <div class="admin-card p-4 rounded-2xl border transition-all relative group">
              <div class="flex items-start justify-between gap-3 mb-2">
                <div class="flex items-center space-x-2">
                  <span class="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs">
                    ${actualIndex !== -1 ? actualIndex + 1 : idx + 1}
                  </span>
                  <h4 class="text-sm font-bold text-white leading-snug">
                    ${escapeHtml(q.question)}
                  </h4>
                </div>
                <div class="flex items-center space-x-1 shrink-0">
                  <button 
                    type="button" 
                    onclick="AdminPanel.openQuestionForm(${q.id || actualIndex})" 
                    class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center text-xs transition-colors"
                    title="Tahrirlash"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button 
                    type="button" 
                    onclick="AdminPanel.deleteQuestion(${q.id || actualIndex})" 
                    class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 flex items-center justify-center text-xs transition-colors"
                    title="O'chirish"
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>

              <!-- Options Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-800/80 text-xs">
                ${q.options.map((opt, optIdx) => {
                  const isCor = optIdx === q.correct;
                  const letter = ['A', 'B', 'C', 'D'][optIdx];
                  return `
                    <div class="p-2 rounded-xl border flex items-center space-x-2 ${isCor ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-semibold' : 'bg-slate-900/50 border-slate-800 text-slate-300'}">
                      <span class="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${isCor ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}">
                        ${letter}
                      </span>
                      <span class="flex-1 truncate">${escapeHtml(opt)}</span>
                      ${isCor ? '<i class="fa-solid fa-check text-emerald-400 text-xs shrink-0"></i>' : ''}
                    </div>
                  `;
                }).join("")}
              </div>

              <!-- Explanation snippet -->
              ${q.explanation ? `
                <div class="mt-2.5 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-start space-x-1.5 font-sans">
                  <i class="fa-solid fa-circle-info text-cyan-400/80 mt-0.5 shrink-0"></i>
                  <span class="italic leading-relaxed">${escapeHtml(q.explanation)}</span>
                </div>
              ` : ''}
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function handleQuestionsSearch(val) {
    state.searchQuery = val;
    renderQuestionsTab();
  }

  // ==========================================================================
  // 5. SAVOL QO'SHISH / TAHRIRLASH MODALI
  // ==========================================================================

  function openQuestionForm(idOrIdx = null) {
    state.editingQuestionId = idOrIdx;
    const formModal = document.getElementById("admin-question-form-modal");
    if (!formModal) return;

    let qData = {
      question: "",
      options: ["", "", "", ""],
      correct: 0,
      explanation: ""
    };

    if (idOrIdx !== null) {
      const allQ = getStoredQuestions();
      const found = allQ.find(x => x.id === idOrIdx) || allQ[idOrIdx];
      if (found) {
        qData = JSON.parse(JSON.stringify(found));
      }
    }

    const titleEl = document.getElementById("admin-qform-title");
    if (titleEl) {
      titleEl.innerText = (idOrIdx !== null) ? "Savolni Tahrirlash" : "Yangi Viktorina Savoli";
    }

    // Inputlarni to'ldirish
    document.getElementById("admin-qform-text").value = qData.question || "";
    document.getElementById("admin-qform-opt0").value = qData.options[0] || "";
    document.getElementById("admin-qform-opt1").value = qData.options[1] || "";
    document.getElementById("admin-qform-opt2").value = qData.options[2] || "";
    document.getElementById("admin-qform-opt3").value = qData.options[3] || "";
    document.getElementById("admin-qform-correct").value = qData.correct !== undefined ? qData.correct : 0;
    document.getElementById("admin-qform-explanation").value = qData.explanation || "";

    formModal.classList.remove("hidden");
  }

  function closeQuestionFormModal() {
    const formModal = document.getElementById("admin-question-form-modal");
    if (formModal) formModal.classList.add("hidden");
    state.editingQuestionId = null;
  }

  function handleQuestionFormSubmit(e) {
    e.preventDefault();
    const qText = document.getElementById("admin-qform-text").value.trim();
    const opt0 = document.getElementById("admin-qform-opt0").value.trim();
    const opt1 = document.getElementById("admin-qform-opt1").value.trim();
    const opt2 = document.getElementById("admin-qform-opt2").value.trim();
    const opt3 = document.getElementById("admin-qform-opt3").value.trim();
    const correct = parseInt(document.getElementById("admin-qform-correct").value, 10);
    const explanation = document.getElementById("admin-qform-explanation").value.trim();

    if (!qText || !opt0 || !opt1 || !opt2 || !opt3) {
      showToast("Iltimos, barcha maydonlarni to'ldiring!", "error");
      return;
    }

    const questions = getStoredQuestions();
    const qObj = {
      id: (state.editingQuestionId !== null && typeof state.editingQuestionId === "number" && state.editingQuestionId > 100) 
          ? state.editingQuestionId 
          : Date.now(),
      question: qText,
      options: [opt0, opt1, opt2, opt3],
      correct: correct,
      explanation: explanation
    };

    if (state.editingQuestionId !== null) {
      // Edit existing
      let targetIdx = questions.findIndex(x => x.id === state.editingQuestionId);
      if (targetIdx === -1 && typeof state.editingQuestionId === "number") {
        targetIdx = state.editingQuestionId; // fallback index
      }
      if (targetIdx >= 0 && targetIdx < questions.length) {
        questions[targetIdx] = qObj;
        showToast("Savol muvaffaqiyatli yangilandi!", "success");
      } else {
        questions.push(qObj);
        showToast("Savol qo'shildi!", "success");
      }
    } else {
      // Add new
      questions.push(qObj);
      showToast("Yangi savol muvaffaqiyatli qo'shildi!", "success");
    }

    saveStoredQuestions(questions);
    closeQuestionFormModal();
    renderQuestionsTab();
    updateBadges();
  }

  function deleteQuestion(idOrIdx) {
    const questions = getStoredQuestions();
    if (questions.length <= 1) {
      showToast("Ogohlantirish: Kamida 1 ta savol qolishi kerak!", "warning");
      return;
    }

    if (!confirm("Haqiqatan ham ushbu savolni o'chirmoqchimisiz?")) {
      return;
    }

    let targetIdx = questions.findIndex(x => x.id === idOrIdx);
    if (targetIdx === -1 && typeof idOrIdx === "number") {
      targetIdx = idOrIdx;
    }

    if (targetIdx >= 0 && targetIdx < questions.length) {
      questions.splice(targetIdx, 1);
      saveStoredQuestions(questions);
      showToast("Savol o'chirildi", "info");
      renderQuestionsTab();
      updateBadges();
    }
  }

  function confirmResetQuestions() {
    if (confirm("Standart 15 ta savolni qayta yuklamoqchimisiz? Siz kiritgan qo'shimcha savollar tozalanadi.")) {
      const defaults = (window.ATLAS_DATA && window.ATLAS_DATA.quizQuestions) 
        ? JSON.parse(JSON.stringify(window.ATLAS_DATA.quizQuestions)) 
        : [];
      saveStoredQuestions(defaults);
      showToast("Standart savollar qayta tiklandi!", "success");
      renderQuestionsTab();
      updateBadges();
    }
  }

  // ==========================================================================
  // 6. TAB 2: ANATOMIK QAYDLAR VA ATAMALAR (CRUD)
  // ==========================================================================

  function renderEntriesTab() {
    const container = document.getElementById("admin-content-entries");
    if (!container) return;

    const entries = getStoredEntries();

    container.innerHTML = `
      <!-- Toolbar -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div>
          <h4 class="text-xs sm:text-sm font-bold text-white">Qo'shimcha Anatomik Ma'lumotlar</h4>
          <p class="text-[11px] text-slate-400">Ahmedov atlasiga shaxsiy anatomik konspekt va atamalar qo'shish</p>
        </div>
        <button 
          type="button" 
          onclick="AdminPanel.openEntryForm()" 
          class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center space-x-1.5 shrink-0"
        >
          <i class="fa-solid fa-plus text-xs"></i>
          <span>Yangi Qayd Qo'shish</span>
        </button>
      </div>

      <!-- Entries Count -->
      <div class="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
        <span>Foydalanuvchi kiritgan qaydlar: <strong class="text-cyan-400">${entries.length} ta</strong></span>
        <span class="text-[11px] text-slate-500">Qidiruv va Lug'at bilan sinxron</span>
      </div>

      <!-- Entries List -->
      <div class="space-y-3">
        ${entries.length === 0 ? `
          <div class="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            <i class="fa-solid fa-book-bookmark text-3xl text-slate-600 mb-2"></i>
            <p>Hozircha shaxsiy anatomik qaydlar mavjud emas.</p>
            <p class="text-[11px] text-slate-500 mt-1">"Yangi Qayd Qo'shish" tugmasini bosib, yangi suyak yoki atama kiritishingiz mumkin.</p>
          </div>
        ` : entries.map(entry => `
          <div class="admin-card p-4 rounded-2xl border transition-all">
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-xs font-mono font-bold text-cyan-400 italic">${escapeHtml(entry.lat)}</span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${escapeHtml(entry.cat)}</span>
                  ${entry.fig ? `<span class="text-[10px] font-mono text-amber-400/90">${escapeHtml(entry.fig)}-rasmlar</span>` : ''}
                </div>
                <h5 class="text-sm font-bold text-white mb-1">${escapeHtml(entry.uz)}</h5>
                <p class="text-xs text-slate-300 leading-relaxed">${escapeHtml(entry.desc)}</p>
              </div>
              <div class="flex items-center space-x-1 shrink-0">
                <button 
                  type="button" 
                  onclick="AdminPanel.openEntryForm(${entry.id})" 
                  class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center text-xs transition-colors"
                  title="Tahrirlash"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button 
                  type="button" 
                  onclick="AdminPanel.deleteEntry(${entry.id})" 
                  class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 flex items-center justify-center text-xs transition-colors"
                  title="O'chirish"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function openEntryForm(entryId = null) {
    state.editingEntryId = entryId;
    const formModal = document.getElementById("admin-entry-form-modal");
    if (!formModal) return;

    let eData = {
      lat: "",
      uz: "",
      cat: "Umumiy",
      desc: "",
      fig: ""
    };

    if (entryId !== null) {
      const entries = getStoredEntries();
      const found = entries.find(x => x.id === entryId);
      if (found) eData = JSON.parse(JSON.stringify(found));
    }

    const titleEl = document.getElementById("admin-eform-title");
    if (titleEl) {
      titleEl.innerText = (entryId !== null) ? "Anatomik Qaydni Tahrirlash" : "Yangi Anatomik Qayd";
    }

    document.getElementById("admin-eform-lat").value = eData.lat || "";
    document.getElementById("admin-eform-uz").value = eData.uz || "";
    document.getElementById("admin-eform-cat").value = eData.cat || "Umumiy";
    document.getElementById("admin-eform-fig").value = eData.fig || "";
    document.getElementById("admin-eform-desc").value = eData.desc || "";

    formModal.classList.remove("hidden");
  }

  function closeEntryFormModal() {
    const formModal = document.getElementById("admin-entry-form-modal");
    if (formModal) formModal.classList.add("hidden");
    state.editingEntryId = null;
  }

  function handleEntryFormSubmit(e) {
    e.preventDefault();
    const lat = document.getElementById("admin-eform-lat").value.trim();
    const uz = document.getElementById("admin-eform-uz").value.trim();
    const cat = document.getElementById("admin-eform-cat").value;
    const fig = document.getElementById("admin-eform-fig").value.trim();
    const desc = document.getElementById("admin-eform-desc").value.trim();

    if (!lat || !uz || !desc) {
      showToast("Lotincha, o'zbekcha nom va tavsifni to'ldiring!", "error");
      return;
    }

    const entries = getStoredEntries();
    const entryObj = {
      id: state.editingEntryId !== null ? state.editingEntryId : Date.now(),
      lat,
      uz,
      cat,
      fig,
      desc,
      isCustom: true
    };

    if (state.editingEntryId !== null) {
      const idx = entries.findIndex(x => x.id === state.editingEntryId);
      if (idx !== -1) {
        entries[idx] = entryObj;
        showToast("Qayd muvaffaqiyatli yangilandi!", "success");
      } else {
        entries.push(entryObj);
        showToast("Qayd qo'shildi!", "success");
      }
    } else {
      entries.unshift(entryObj);
      showToast("Yangi qayd muvaffaqiyatli saqlandi!", "success");
    }

    saveStoredEntries(entries);
    closeEntryFormModal();
    renderEntriesTab();
    updateBadges();
  }

  function deleteEntry(entryId) {
    if (!confirm("Haqiqatan ham ushbu anatomik qaydni o'chirmoqchimisiz?")) {
      return;
    }
    const entries = getStoredEntries();
    const updated = entries.filter(x => x.id !== entryId);
    saveStoredEntries(updated);
    showToast("Qayd o'chirildi", "info");
    renderEntriesTab();
    updateBadges();
  }

  // ==========================================================================
  // 6.2 TAB: MUSKULLAR HAQIDA TA'LIMOT (MIOLOGIYA CRUD)
  // ==========================================================================

  function getStoredMuscles() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.MUSCLES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Muskul ma'lumotlarini o'qishda xatolik:", e);
    }
    return [];
  }

  function saveStoredMuscles(muscles) {
    try {
      localStorage.setItem(STORAGE_KEYS.MUSCLES, JSON.stringify(muscles));
      if (window.ModuleMyology && typeof window.ModuleMyology.switchSubSection === "function") {
        window.ModuleMyology.switchSubSection(window.ModuleMyology.getCurrentSubSection());
      }
      return true;
    } catch (e) {
      console.error("Muskullarni saqlashda xatolik:", e);
      showToast("Xatolik: Xotiraga saqlab bo'lmadi!", "error");
      return false;
    }
  }

  function getAllMusclesList() {
    const list = [];
    const myo = window.MYOLOGY_DATA;
    if (myo) {
      if (myo.generalMyology && Array.isArray(myo.generalMyology.shapes)) {
        myo.generalMyology.shapes.forEach(m => list.push({ ...m, groupName: "Umumiy shakllar", sectionKey: "generalMyology" }));
      }
      if (myo.backAndThorax && Array.isArray(myo.backAndThorax.muscles)) {
        myo.backAndThorax.muscles.forEach(m => list.push({ ...m, groupName: "Orqa va ko'krak", sectionKey: "backAndThorax" }));
      }
      if (myo.abdomenAndInguinal && Array.isArray(myo.abdomenAndInguinal.muscles)) {
        myo.abdomenAndInguinal.muscles.forEach(m => list.push({ ...m, groupName: "Qorin va chov", sectionKey: "abdomenAndInguinal" }));
      }
      if (myo.headAndNeck && Array.isArray(myo.headAndNeck.muscles)) {
        myo.headAndNeck.muscles.forEach(m => list.push({ ...m, groupName: "Bosh va bo'yin", sectionKey: "headAndNeck" }));
      }
      if (myo.limbs && Array.isArray(myo.limbs.muscles)) {
        myo.limbs.muscles.forEach(m => list.push({ ...m, groupName: "Qo'l va oyoq", sectionKey: "limbs" }));
      }
    }
    // Custom overrides or additions
    const custom = getStoredMuscles();
    custom.forEach(c => {
      const existingIdx = list.findIndex(x => x.id === c.id);
      if (existingIdx >= 0) {
        list[existingIdx] = { ...list[existingIdx], ...c, isCustom: true };
      } else {
        list.push({ ...c, isCustom: true });
      }
    });
    return list;
  }

  function handleMusclesSearch(query) {
    state.musclesSearchQuery = query;
    renderMusclesTab();
  }

  function renderMusclesTab() {
    const container = document.getElementById("admin-content-muscles");
    if (!container) return;

    const allMuscles = getAllMusclesList();
    const query = (state.musclesSearchQuery || "").toLowerCase().trim();

    const filtered = allMuscles.filter(m => {
      if (!query) return true;
      const uz = (m.nameUz || "").toLowerCase();
      const lat = (m.nameLat || "").toLowerCase();
      const note = (m.clinicalNote || "").toLowerCase();
      const group = (m.groupName || "").toLowerCase();
      return uz.includes(query) || lat.includes(query) || note.includes(query) || group.includes(query);
    });

    container.innerHTML = `
      <!-- Toolbar -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div class="relative flex-1">
          <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
          <input 
            type="text" 
            placeholder="Muskullarni qidirish (o'zbekcha, lotincha, klinik ta'rif)..." 
            value="${escapeHtml(state.musclesSearchQuery)}"
            oninput="AdminPanel.handleMusclesSearch(this.value)"
            class="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-cyan-400 text-xs text-white placeholder-slate-500 font-sans"
          >
        </div>
        <button 
          type="button" 
          onclick="AdminPanel.openMuscleForm()" 
          class="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-extrabold text-xs transition-all shadow-md shadow-rose-500/20 flex items-center space-x-1.5 shrink-0"
        >
          <i class="fa-solid fa-plus text-xs"></i>
          <span>Yangi Muskul Qo'shish</span>
        </button>
      </div>

      <!-- Count -->
      <div class="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
        <span>Jami muskullar: <strong class="text-rose-400">${filtered.length} ta</strong></span>
        <span class="text-[11px] text-slate-500">N.K. Ahmedov Miologiya bo'limi</span>
      </div>

      <!-- Muscles Cards List -->
      <div class="space-y-3">
        ${filtered.map(m => `
          <div class="admin-card p-4 rounded-2xl border transition-all ${m.isCustom ? 'border-rose-500/40 bg-rose-950/10' : ''}">
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-xs font-mono font-bold text-rose-400 italic">${escapeHtml(m.nameLat)}</span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${escapeHtml(m.groupName || m.sectionKey)}</span>
                  ${m.pageRef ? `<span class="text-[10px] font-mono text-cyan-400/90">${escapeHtml(m.pageRef)}</span>` : ''}
                  ${m.isCustom ? `<span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-900/60 text-rose-300 font-bold">Tahrirlangan</span>` : ''}
                </div>
                <h5 class="text-sm font-bold text-white mb-1">${escapeHtml(m.nameUz)}</h5>
                <div class="text-xs text-slate-300 space-y-1">
                  ${m.attachments ? `<div><strong class="text-slate-400">Birikishi:</strong> ${escapeHtml(m.attachments)}</div>` : ''}
                  ${m.neurovascular ? `<div><strong class="text-slate-400">Innervatsiya / Tomirlar:</strong> ${escapeHtml(m.neurovascular)}</div>` : ''}
                  ${m.clinicalNote ? `<div class="text-rose-200/90"><strong class="text-rose-300">Klinik ahamiyati:</strong> ${escapeHtml(m.clinicalNote)}</div>` : ''}
                </div>
              </div>
              <div class="flex items-center space-x-1 shrink-0">
                <button 
                  type="button" 
                  onclick="AdminPanel.openMuscleForm('${m.id}')" 
                  class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400 border border-slate-700 flex items-center justify-center transition-colors text-xs" 
                  title="Tahrirlash"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                ${m.isCustom ? `
                  <button 
                    type="button" 
                    onclick="AdminPanel.deleteMuscle('${m.id}')" 
                    class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-400 border border-slate-700 flex items-center justify-center transition-colors text-xs" 
                    title="Standart holatga qaytarish"
                  >
                    <i class="fa-solid fa-rotate-left"></i>
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function openMuscleForm(muscleId = null) {
    state.editingMuscleId = muscleId;
    let muscle = null;
    if (muscleId) {
      muscle = getAllMusclesList().find(x => x.id === muscleId);
    }

    let modal = document.getElementById("admin-muscle-form-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "admin-muscle-form-modal";
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 modal-backdrop hidden";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="glass-panel cyber-hud-card w-full max-w-2xl max-h-[92vh] rounded-3xl border border-rose-500/40 p-5 shadow-2xl flex flex-col relative animate-fadeIn bg-slate-950/95" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <h4 class="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
            <i class="fa-solid fa-person-running text-rose-400"></i>
            <span>${muscle ? "Muskul Ma'lumotlarini Tahrirlash" : "Yangi Muskul Qo'shish"}</span>
          </h4>
          <button type="button" onclick="AdminPanel.closeMuscleFormModal()" class="text-slate-400 hover:text-white p-1">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <form id="admin-muscle-form" onsubmit="AdminPanel.handleMuscleFormSubmit(event)" class="flex-1 overflow-y-auto py-3 space-y-3.5 pr-1 text-xs">
          <input type="hidden" id="muscle-form-id" value="${muscle ? escapeHtml(muscle.id) : ('muscle_' + Date.now())}">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-400 mb-1 font-semibold">O'zbekcha Nomi *</label>
              <input type="text" id="muscle-form-uz" required value="${muscle ? escapeHtml(muscle.nameUz || '') : ''}" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-rose-400 text-white text-xs font-sans">
            </div>
            <div>
              <label class="block text-slate-400 mb-1 font-semibold">Lotincha Nomi (Terminologia Anatomica) *</label>
              <input type="text" id="muscle-form-lat" required value="${muscle ? escapeHtml(muscle.nameLat || '') : ''}" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-rose-400 text-white text-xs font-mono">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-400 mb-1 font-semibold">Anatomik Bo'lim (Guruh)</label>
              <select id="muscle-form-section" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-rose-400 text-white text-xs">
                <option value="generalMyology" ${muscle && muscle.sectionKey === 'generalMyology' ? 'selected' : ''}>1. Umumiy miologiya va shakllar</option>
                <option value="backAndThorax" ${muscle && muscle.sectionKey === 'backAndThorax' ? 'selected' : ''}>2. Orqa va ko'krak muskullari (diafragma)</option>
                <option value="abdomenAndInguinal" ${muscle && muscle.sectionKey === 'abdomenAndInguinal' ? 'selected' : ''}>3. Qorin va chov kanali</option>
                <option value="headAndNeck" ${muscle && muscle.sectionKey === 'headAndNeck' ? 'selected' : ''}>4. Bosh, yuz va bo'yin muskullari</option>
                <option value="limbs" ${muscle && muscle.sectionKey === 'limbs' ? 'selected' : ''}>5. Qo'l va oyoq muskullari</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-400 mb-1 font-semibold">Atlas Havolasi (Sahifa va Rasm)</label>
              <input type="text" id="muscle-form-pageref" value="${muscle ? escapeHtml(muscle.pageRef || '') : 'N.K. Ahmedov, 1-jild'}" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-rose-400 text-white text-xs font-sans">
            </div>
          </div>

          <div>
            <label class="block text-slate-400 mb-1 font-semibold">Birikishi: Boshlanishi (Origo) va Tugashi (Insertio)</label>
            <input type="text" id="muscle-form-attachments" value="${muscle ? escapeHtml(muscle.attachments || '') : ''}" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-rose-400 text-white text-xs font-sans">
          </div>

          <div>
            <label class="block text-slate-400 mb-1 font-semibold">Innervatsiya va Tomirlar</label>
            <input type="text" id="muscle-form-neuro" value="${muscle ? escapeHtml(muscle.neurovascular || '') : ''}" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-rose-400 text-white text-xs font-sans">
          </div>

          <div>
            <label class="block text-slate-400 mb-1 font-semibold">Klinik Ahamiyati (Sindromlar, xirurgiya, in'eksiya oriyentiri)</label>
            <textarea id="muscle-form-clinical" rows="2" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-rose-400 text-white text-xs font-sans">${muscle ? escapeHtml(muscle.clinicalNote || '') : ''}</textarea>
          </div>

          <div>
            <label class="block text-slate-400 mb-1 font-semibold">High-Yield Quick Fact (Asosiy fakt)</label>
            <input type="text" id="muscle-form-fact" value="${muscle && muscle.quickFacts && muscle.quickFacts[0] ? escapeHtml(muscle.quickFacts[0]) : ''}" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-rose-400 text-white text-xs font-sans">
          </div>

          <div class="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
            <button type="button" onclick="AdminPanel.closeMuscleFormModal()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all">
              Bekor qilish
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-extrabold text-xs transition-all shadow-md shadow-rose-500/20">
              Saqlash
            </button>
          </div>
        </form>
      </div>
    `;

    modal.classList.remove("hidden");
  }

  function closeMuscleFormModal() {
    const modal = document.getElementById("admin-muscle-form-modal");
    if (modal) modal.classList.add("hidden");
    state.editingMuscleId = null;
  }

  function handleMuscleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("muscle-form-id").value;
    const nameUz = document.getElementById("muscle-form-uz").value.trim();
    const nameLat = document.getElementById("muscle-form-lat").value.trim();
    const sectionKey = document.getElementById("muscle-form-section").value;
    const pageRef = document.getElementById("muscle-form-pageref").value.trim();
    const attachments = document.getElementById("muscle-form-attachments").value.trim();
    const neurovascular = document.getElementById("muscle-form-neuro").value.trim();
    const clinicalNote = document.getElementById("muscle-form-clinical").value.trim();
    const fact = document.getElementById("muscle-form-fact").value.trim();

    if (!nameUz || !nameLat) {
      showToast("Iltimos, o'zbekcha va lotincha nomlarni to'liq kiriting!", "warning");
      return;
    }

    const customMuscles = getStoredMuscles();
    const muscleObj = {
      id,
      nameUz,
      nameLat,
      sectionKey,
      pageRef,
      clinicalTag: "KLINIK ANATOMIYA",
      attachments,
      neurovascular,
      clinicalNote,
      quickFacts: fact ? [fact] : ["Odam muskullari klinik morfologiyasi."],
      isCustom: true
    };

    const existingIdx = customMuscles.findIndex(x => x.id === id);
    if (existingIdx >= 0) {
      customMuscles[existingIdx] = muscleObj;
      showToast("Muskul ma'lumotlari muvaffaqiyatli yangilandi!", "success");
    } else {
      customMuscles.push(muscleObj);
      showToast("Yangi muskul muvaffaqiyatli qo'shildi!", "success");
    }

    saveStoredMuscles(customMuscles);
    closeMuscleFormModal();
    renderMusclesTab();
    updateBadges();
  }

  function deleteMuscle(id) {
    if (!confirm("Ushbu muskul bo'yicha kiritilgan o'zgartirishlarni o'chirmoqchimisiz?")) return;
    const custom = getStoredMuscles();
    const filtered = custom.filter(x => x.id !== id);
    saveStoredMuscles(filtered);
    showToast("Muskul standart holatiga qaytarildi", "info");
    renderMusclesTab();
    updateBadges();
  }

  // ==========================================================================
  // 7. TAB 3: ZAXIRA VA EKSPORT / IMPORT (JSON)
  // ==========================================================================

  function renderBackupTab() {
    const container = document.getElementById("admin-content-backup");
    if (!container) return;

    const questions = getStoredQuestions();
    const entries = getStoredEntries();

    container.innerHTML = `
      <div class="space-y-4 max-w-2xl">
        <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h4 class="text-sm font-bold text-white mb-1 flex items-center space-x-2">
            <i class="fa-solid fa-file-export text-cyan-400"></i>
            <span>Zaxira Nusxa Yaratish (Eksport)</span>
          </h4>
          <p class="text-xs text-slate-400 mb-4 leading-relaxed">
            Barcha kiritilgan viktorina savollari va shaxsiy anatomik konspektlarni to'liq JSON fayl ko'rinishida kompyuteringizga yuklab oling.
          </p>
          <button 
            type="button" 
            onclick="AdminPanel.exportBackupFile()" 
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs transition-all shadow-md shadow-cyan-500/25 flex items-center space-x-2"
          >
            <i class="fa-solid fa-download"></i>
            <span>JSON Zaxira Faylini Yuklab Olish</span>
          </button>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h4 class="text-sm font-bold text-white mb-1 flex items-center space-x-2">
            <i class="fa-solid fa-file-import text-amber-400"></i>
            <span>Zaxiradan Tiklash (Import)</span>
          </h4>
          <p class="text-xs text-slate-400 mb-4 leading-relaxed">
            Oldinroq saqlangan <span class="font-mono text-cyan-400">.json</span> zaxira faylini tanlab, savollar va qaydlarni qayta tiklang.
          </p>
          <div class="flex items-center space-x-3">
            <label class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center space-x-2">
              <i class="fa-solid fa-upload text-amber-400"></i>
              <span>Faylni Tanlash (.json)</span>
              <input type="file" id="admin-backup-file-input" accept=".json,application/json" onchange="AdminPanel.handleBackupFileInput(event)" class="hidden">
            </label>
            <span id="admin-import-status" class="text-xs text-slate-400 font-mono"></span>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
          <h4 class="text-sm font-bold text-rose-300 mb-1 flex items-center space-x-2">
            <i class="fa-solid fa-triangle-exclamation text-rose-400"></i>
            <span>Barcha O'zgarishlarni Tozalash (Factory Reset)</span>
          </h4>
          <p class="text-xs text-slate-400 mb-3">
            Barcha mahalliylashtirilgan savollar va qaydlarni o'chirib, tizimni dastlabki holatga qaytaradi.
          </p>
          <button 
            type="button" 
            onclick="AdminPanel.resetAllToFactory()" 
            class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs transition-all shadow-md shadow-rose-600/30 flex items-center space-x-1.5"
          >
            <i class="fa-solid fa-trash-can"></i>
            <span>Hammasini Tozalash</span>
          </button>
        </div>
      </div>
    `;
  }

  function exportBackupFile() {
    const data = {
      atlas: "Prof. N.K. Ahmedov — Odam anatomiyasi (1-jild: Osteologiya)",
      exportedAt: new Date().toISOString(),
      questions: getStoredQuestions(),
      entries: getStoredEntries()
    };

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `ahmedov_osteologiya_zaxira_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Zaxira nusxasi muvaffaqiyatli yuklab olindi!", "success");
  }

  function handleBackupFileInput(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (!parsed || typeof parsed !== "object") {
          throw new Error("Noto'g'ri fayl formati");
        }

        let importedQ = 0;
        let importedE = 0;

        if (Array.isArray(parsed.questions)) {
          saveStoredQuestions(parsed.questions);
          importedQ = parsed.questions.length;
        }
        if (Array.isArray(parsed.entries)) {
          saveStoredEntries(parsed.entries);
          importedE = parsed.entries.length;
        }

        showToast(`Muvaffaqiyatli tiklandi: ${importedQ} ta savol, ${importedE} ta qayd!`, "success");
        updateBadges();
        renderActiveTab();
      } catch (err) {
        console.error("Import xatosi:", err);
        showToast("Xatolik: JSON faylni o'qib bo'lmadi!", "error");
      }
    };
    reader.readAsText(file);
  }

  function resetAllToFactory() {
    if (confirm("DIQQAT: Barcha kiritilgan savollar va shaxsiy qaydlar o'chib ketadi. Buni tasdiqlaysizmi?")) {
      localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
      localStorage.removeItem(STORAGE_KEYS.ENTRIES);
      if (window.App) {
        if (typeof window.App.reloadQuiz === "function") window.App.reloadQuiz();
        if (typeof window.App.reloadGlossary === "function") window.App.reloadGlossary();
      }
      showToast("Barcha ma'lumotlar dastlabki holatga qaytarildi!", "info");
      updateBadges();
      renderActiveTab();
    }
  }

  // ==========================================================================
  // 8. TAB 4: SOZLAMALAR VA PIN XAVFSIZLIGI
  // ==========================================================================

  function renderSettingsTab() {
    const container = document.getElementById("admin-content-settings");
    if (!container) return;

    const isProtected = isPinProtected();
    const currentPin = getPinCode();

    container.innerHTML = `
      <div class="space-y-4 max-w-xl">
        <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h4 class="text-sm font-bold text-white mb-1 flex items-center space-x-2">
            <i class="fa-solid fa-lock text-cyan-400"></i>
            <span>Admin Paneli Kirish Himoyasi</span>
          </h4>
          <p class="text-xs text-slate-400 mb-4 leading-relaxed">
            Admin paneliga faqat maxsus PIN-kod bilan kirishni talab qilish yoki uni ochiq qoldirish.
          </p>

          <form onsubmit="AdminPanel.handleSecuritySubmit(event)" class="space-y-4">
            <label class="flex items-center space-x-3 cursor-pointer p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <input type="checkbox" id="admin-setting-pin-toggle" ${isProtected ? 'checked' : ''} onchange="AdminPanel.togglePinInputVisibility(this.checked)" class="w-4 h-4 rounded text-cyan-500 focus:ring-0">
              <span class="text-xs font-semibold text-slate-200">
                Kirishda PIN-kod so'rashni faollashtirish
              </span>
            </label>

            <div id="admin-pin-config-block" class="${isProtected ? '' : 'hidden'} space-y-3 pt-2">
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">
                  Amaldagi yoki Yangi PIN-kod (4–8 xonali):
                </label>
                <input 
                  type="text" 
                  id="admin-setting-new-pin" 
                  value="${escapeHtml(currentPin)}" 
                  maxlength="8" 
                  class="w-48 px-3.5 py-2 rounded-xl bg-slate-950 border border-cyan-500/30 text-white font-mono text-sm tracking-wider focus:outline-none focus:border-cyan-400"
                >
                <p class="text-[11px] text-slate-500 mt-1">Standart PIN-kod: <span class="font-mono text-cyan-400">2026</span></p>
              </div>
            </div>

            <div class="pt-2">
              <button 
                type="submit" 
                class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs transition-all shadow-md shadow-cyan-500/25"
              >
                Sozlamalarni Saqlash
              </button>
            </div>
          </form>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2 font-mono">
          <div class="text-slate-300 font-bold mb-1 font-sans">Tizim holati (Diagnostika):</div>
          <div>• Saqlash usuli: <span class="text-cyan-400 font-bold">Browser LocalStorage</span></div>
          <div>• Viktorina savollari soni: <span class="text-cyan-400 font-bold">${getStoredQuestions().length} ta</span></div>
          <div>• Shaxsiy qaydlar soni: <span class="text-cyan-400 font-bold">${getStoredEntries().length} ta</span></div>
          <div>• Autentifikatsiya holati: <span class="${state.isUnlocked ? 'text-emerald-400' : 'text-amber-400'} font-bold">${state.isUnlocked ? 'Ochiq (Unlocked)' : 'Standart'}</span></div>
        </div>
      </div>
    `;
  }

  function togglePinInputVisibility(checked) {
    const block = document.getElementById("admin-pin-config-block");
    if (block) {
      if (checked) block.classList.remove("hidden");
      else block.classList.add("hidden");
    }
  }

  function handleSecuritySubmit(e) {
    e.preventDefault();
    const toggle = document.getElementById("admin-setting-pin-toggle");
    const pinInput = document.getElementById("admin-setting-new-pin");

    const isEnabled = toggle ? toggle.checked : false;
    let newPin = (pinInput ? pinInput.value.trim() : "") || DEFAULT_PIN;

    if (isEnabled && newPin.length < 3) {
      showToast("PIN-kod kamida 3 ta belgidan iborat bo'lishi kerak!", "error");
      return;
    }

    localStorage.setItem(STORAGE_KEYS.PIN_ENABLED, isEnabled ? "true" : "false");
    localStorage.setItem(STORAGE_KEYS.PIN_CODE, newPin);

    const lockBtn = document.getElementById("admin-btn-lock");
    if (lockBtn) {
      if (isEnabled) lockBtn.classList.remove("hidden");
      else lockBtn.classList.add("hidden");
    }

    showToast("Xavfsizlik sozlamalari muvaffaqiyatli saqlandi!", "success");
    renderSettingsTab();
  }

  // ==========================================================================
  // 9. TOAST NOTIFICATIONS & UTILITIES
  // ==========================================================================

  function showToast(message, type = "info") {
    let toast = document.getElementById("admin-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "admin-toast";
      document.body.appendChild(toast);
    }

    let colorClasses = "bg-slate-900 border-cyan-500/50 text-white shadow-cyan-500/20";
    let icon = "fa-circle-info text-cyan-400";

    if (type === "success") {
      colorClasses = "bg-slate-900 border-emerald-500/60 text-white shadow-emerald-500/20";
      icon = "fa-circle-check text-emerald-400";
    } else if (type === "error") {
      colorClasses = "bg-slate-900 border-rose-500/60 text-white shadow-rose-500/20";
      icon = "fa-circle-exclamation text-rose-400";
    } else if (type === "warning") {
      colorClasses = "bg-slate-900 border-amber-500/60 text-white shadow-amber-500/20";
      icon = "fa-triangle-exclamation text-amber-400";
    }

    toast.className = `p-3.5 sm:px-4 sm:py-3 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center space-x-2.5 shadow-2xl backdrop-blur-xl animate-fadeIn ${colorClasses} show`;
    toast.innerHTML = `
      <i class="fa-solid ${icon} text-base shrink-0"></i>
      <span class="leading-tight">${escapeHtml(message)}</span>
    `;

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ==========================================================================
  // 10. INITIALIZATION
  // ==========================================================================

  function init() {
    // Keyboard shortcut: Ctrl+Shift+A opens Admin Panel
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        open();
      }
    });

    // Initial check of data to prime localStorage
    getStoredQuestions();
    getStoredEntries();
  }

  return {
    init,
    open,
    close,
    toggleLock,
    setTab,
    handlePinSubmit,
    handleQuestionsSearch,
    openQuestionForm,
    closeQuestionFormModal,
    handleQuestionFormSubmit,
    deleteQuestion,
    confirmResetQuestions,
    openEntryForm,
    closeEntryFormModal,
    handleEntryFormSubmit,
    deleteEntry,
    openMuscleForm,
    closeMuscleFormModal,
    handleMuscleFormSubmit,
    deleteMuscle,
    handleMusclesSearch,
    exportBackupFile,
    handleBackupFileInput,
    resetAllToFactory,
    togglePinInputVisibility,
    handleSecuritySubmit,
    showToast,
    getQuestions: getStoredQuestions,
    getEntries: getStoredEntries,
    getMuscles: getStoredMuscles
  };
})();

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  window.AdminPanel.init();
});
