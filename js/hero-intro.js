/**
 * ============================================================================
 * ODAM ANATOMIYASI (ATLAS, 1-JILD) — 1-BO'LIM: OSTEOLOGIYA (Prof. N.K. Ahmedov)
 * CLEAN 2D VECTOR INTRO & HERO CONTROLLER
 * ============================================================================
 * Features:
 * - Clean, smooth 2D animated welcome splash banner with seamless fade transition
 * - Lightweight, error-free execution without any 3D WebGL / Three.js overhead
 * - Responsive 2D vector anatomical showcase in the hero section
 * - Smooth navigation, audio chime, and Day / Night / Clinical theme sync
 */

window.HeroIntro = (function() {
  'use strict';

  let currentTheme = 'night';
  let isIntroActive = true;

  /**
   * 1. INTRO SPLASH OVERLAY CONTROLLER
   */
  function initSplashScreen() {
    const overlay = document.getElementById('intro-splash-overlay');
    const startBtn = document.getElementById('btn-splash-start');
    const skipBtn = document.getElementById('btn-splash-skip');
    const replayBtn = document.getElementById('btn-replay-intro');

    if (!overlay) return;

    // Attach button listeners
    const osteoBtn = document.getElementById('btn-splash-osteology');
    const myoBtn = document.getElementById('btn-splash-myology');

    if (osteoBtn) {
      osteoBtn.onclick = (e) => {
        e.preventDefault();
        playAnatomyScanChime();
        closeSplashScreen(false);
        if (window.App && typeof window.App.switchModule === 'function') {
          window.App.switchModule('module1');
        }
      };
    }

    if (myoBtn) {
      myoBtn.onclick = (e) => {
        e.preventDefault();
        playAnatomyScanChime();
        closeSplashScreen(false);
        if (window.App && typeof window.App.switchModule === 'function') {
          window.App.switchModule('module-myology');
        }
      };
    }

    if (startBtn) {
      startBtn.onclick = (e) => {
        e.preventDefault();
        playAnatomyScanChime();
        closeSplashScreen(true);
      };
    }

    if (skipBtn) {
      skipBtn.onclick = (e) => {
        e.preventDefault();
        closeSplashScreen(false);
      };
    }

    if (replayBtn) {
      replayBtn.onclick = (e) => {
        e.preventDefault();
        replayIntro();
      };
    }

    // Auto-animate 2D elements in splash banner
    if (window.gsap) {
      gsap.from('#intro-splash-overlay .animate-fadeIn', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }

  function closeSplashScreen(scrollToModules = false) {
    const overlay = document.getElementById('intro-splash-overlay');
    if (!overlay) return;

    isIntroActive = false;

    if (window.gsap) {
      gsap.to(overlay, {
        opacity: 0,
        scale: 0.98,
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => {
          overlay.style.display = 'none';
          overlay.style.pointerEvents = 'none';
          overlay.classList.add('hidden', 'closed');
          if (scrollToModules) {
            smoothScrollToHero();
          }
        }
      });
    } else {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
        overlay.style.pointerEvents = 'none';
        overlay.classList.add('hidden', 'closed');
        if (scrollToModules) {
          smoothScrollToHero();
        }
      }, 300);
    }
  }

  function replayIntro() {
    const overlay = document.getElementById('intro-splash-overlay');
    if (!overlay) return;

    isIntroActive = true;
    overlay.style.display = 'flex';
    overlay.style.pointerEvents = 'auto';
    overlay.classList.remove('hidden', 'closed');
    overlay.style.opacity = '0';

    if (window.gsap) {
      gsap.to(overlay, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      overlay.style.opacity = '1';
    }
  }

  /**
   * 2. SMOOTH SCROLL HELPERS
   */
  function smoothScrollToHero() {
    const hero = document.getElementById('hero-section');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function smoothScrollToModules() {
    const m1 = document.getElementById('module1');
    if (m1) {
      m1.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * 3. AUDIO SYNTHESIS: CLEAN MEDICAL SCAN CHIME
   */
  function playAnatomyScanChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.05, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
      });
    } catch (e) {
      // Audio context restricted before interaction
    }
  }

  /**
   * 4. THEME SYNCHRONIZATION
   */
  function setTheme(themeName) {
    if (!['night', 'day', 'clinical'].includes(themeName)) {
      themeName = 'night';
    }
    currentTheme = themeName;
  }

  function resize() {
    // No 3D canvas resize required
  }

  /**
   * INITIALIZE
   */
  function init() {
    initSplashScreen();

    // Hook up "Boshlash" explore button in hero if present
    const heroStartBtn = document.getElementById('btn-hero-start-exploring');
    if (heroStartBtn) {
      heroStartBtn.onclick = (e) => {
        e.preventDefault();
        smoothScrollToModules();
      };
    }
  }

  return {
    init,
    closeSplashScreen,
    replayIntro,
    smoothScrollToModules,
    smoothScrollToHero,
    resize,
    setTheme
  };
})();
