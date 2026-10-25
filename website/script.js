/**
 * DashFlow — Apple Product Showcase Client Logic
 * 1. Interactive Theme Studio & "Match Your Style" Customizer
 * 2. Global Site Light/Dark Mode Switcher
 * 3. 16-Segment Multi-Stream Parallel Acceleration Simulation
 * 4. Dynamic Version Sync from version.json
 * 5. Mobile Navigation Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiteThemeToggle();
  initThemeStudio();
  initTransferShowcase();
  initDynamicVersion();
  initMobileMenu();
});

/* ==========================================================================
   1. Global Website Theme Toggle (Light / Dark)
   ========================================================================== */
function initSiteThemeToggle() {
  const toggleBtn = document.getElementById('site-theme-toggle');
  const root = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('dashflow-site-theme');
  if (savedTheme) {
    root.setAttribute('data-site-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // If user explicitly prefers dark, we can start with dark or default to light
    // User requested: "light like apple", so light is default
    root.setAttribute('data-site-theme', 'light');
  } else {
    root.setAttribute('data-site-theme', 'light');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-site-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-site-theme', next);
      localStorage.setItem('dashflow-site-theme', next);
    });
  }
}

/* ==========================================================================
   2. Interactive Theme Studio & "Match Your Style" Customizer
   ========================================================================== */
function initThemeStudio() {
  const appPreview = document.getElementById('app-preview-window');
  const finishLabel = document.getElementById('current-finish-label');
  const styleTagText = document.getElementById('style-tag-text');
  const swatchesContainer = document.getElementById('color-swatches-container');

  if (!appPreview) return;

  // State
  let currentSkin = 'glass'; // 'glass' | 'default'
  let currentMode = 'light'; // 'light' | 'dark'
  let currentColor = 'blue';
  let currentFinishName = 'Ultramarine';

  const finishStyles = {
    blue: {
      name: 'Ultramarine',
      hex: '#0071e3',
      rgb: '0, 113, 227',
      glassTag: 'Frosted Glass in Ultramarine • Vibrant and focused. The signature high-speed finish.',
      solidTag: 'Studio Solid in Ultramarine • Crisp, focused precision for productive days.'
    },
    purple: {
      name: 'Deep Amethyst',
      hex: '#8b5cf6',
      rgb: '139, 92, 246',
      glassTag: 'Frosted Glass in Deep Amethyst • Sophisticated acrylic depth for creative workflows.',
      solidTag: 'Studio Solid in Deep Amethyst • Rich editorial elegance tailored for deep work.'
    },
    teal: {
      name: 'Alpine Aqua',
      hex: '#06b6d4',
      rgb: '6, 182, 212',
      glassTag: 'Frosted Glass in Alpine Aqua • Ice-cold clarity with electric responsiveness.',
      solidTag: 'Studio Solid in Alpine Aqua • Fresh and ultra-sharp on high-DPI displays.'
    },
    green: {
      name: 'Emerald Mint',
      hex: '#10b981',
      rgb: '16, 185, 129',
      glassTag: 'Frosted Glass in Emerald Mint • Refreshing clarity with low-fatigue contrast.',
      solidTag: 'Studio Solid in Emerald Mint • Clean organic energy that keeps distractions away.'
    },
    rose: {
      name: 'Rose Quartz',
      hex: '#f43f5e',
      rgb: '244, 63, 94',
      glassTag: 'Frosted Glass in Rose Quartz • Striking elegance that stands out on any display.',
      solidTag: 'Studio Solid in Rose Quartz • Radiant warmth crafted for expressive desks.'
    },
    amber: {
      name: 'Sunset Amber',
      hex: '#f59e0b',
      rgb: '245, 158, 11',
      glassTag: 'Frosted Glass in Sunset Amber • Warm and expressive for evening sessions.',
      solidTag: 'Studio Solid in Sunset Amber • Golden studio glow with soothing contrast.'
    },
    clear: {
      name: 'Titanium Clear',
      hex: '#64748b',
      rgb: '100, 116, 139',
      glassTag: 'Frosted Glass in Titanium Clear • Pure minimalism that disappears into Windows.',
      solidTag: 'Studio Solid in Titanium Clear • Monochromatic simplicity that never shouts.'
    }
  };

  function updateAppPreview() {
    const finish = finishStyles[currentColor] || finishStyles.blue;

    // Apply attributes
    appPreview.setAttribute('data-preview-skin', currentSkin);
    appPreview.setAttribute('data-preview-mode', currentMode);
    appPreview.setAttribute('data-preview-color', currentColor);

    // Apply inline CSS variables for instant reactivity
    appPreview.style.setProperty('--preview-accent', finish.hex);
    appPreview.style.setProperty('--preview-accent-rgb', finish.rgb);

    // Update finish name label
    if (finishLabel) {
      finishLabel.textContent = finish.name;
    }

    // Update dynamic style tagline
    if (styleTagText) {
      const tagContent = currentSkin === 'glass' ? finish.glassTag : finish.solidTag;
      styleTagText.textContent = tagContent;
    }
  }

  // Color Swatches interaction
  if (swatchesContainer) {
    const swatches = swatchesContainer.querySelectorAll('.swatch-btn');
    swatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        swatches.forEach((s) => s.classList.remove('active'));
        swatch.classList.add('active');

        currentColor = swatch.getAttribute('data-color') || 'blue';
        currentFinishName = swatch.getAttribute('data-name') || 'Ultramarine';
        updateAppPreview();
      });
    });
  }

  // Skin buttons interaction
  const skinButtons = document.querySelectorAll('[data-skin]');
  skinButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      skinButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      currentSkin = btn.getAttribute('data-skin') || 'glass';
      updateAppPreview();
    });
  });

  // App Appearance Mode buttons interaction (Inside the app preview)
  const modeButtons = document.querySelectorAll('[data-app-mode]');
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      modeButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      currentMode = btn.getAttribute('data-app-mode') || 'light';
      updateAppPreview();
    });
  });

  // Initial update
  updateAppPreview();
}

/* ==========================================================================
   3. 16-Segment Multi-Stream Parallel Acceleration Simulation
   ========================================================================== */
function initTransferShowcase() {
  const grid = document.getElementById('segments-grid');
  const speedEl = document.getElementById('card-speed-display');
  const topBarSpeedEl = document.getElementById('top-bar-speed');
  const percentEl = document.getElementById('card-percent-display');
  const progressBarEl = document.getElementById('card-progress-bar');
  const bytesEl = document.getElementById('card-bytes-display');
  const etaEl = document.getElementById('card-eta-display');
  const hoverMetricEl = document.getElementById('segment-hover-metric');
  const pauseBtn = document.getElementById('card-pause-btn');

  if (!grid) return;

  const totalSegments = 16;
  const targetSizeGB = 5.82;
  const segmentFills = [];
  let isPaused = false;

  // Build 16 Chunks matching DashFlow SegmentBar architecture
  grid.innerHTML = '';
  for (let i = 0; i < totalSegments; i++) {
    const chunk = document.createElement('div');
    chunk.className = 'seg-chunk';
    chunk.title = `Stream #${i + 1} (${(100 / totalSegments).toFixed(1)}%)`;

    const fill = document.createElement('div');
    fill.className = 'seg-chunk-fill';
    fill.style.width = `${Math.floor(Math.random() * 40 + 45)}%`;

    chunk.appendChild(fill);
    grid.appendChild(chunk);
    segmentFills.push(fill);

    // Hover metric interaction
    chunk.addEventListener('mouseenter', () => {
      const chunkBytes = ((targetSizeGB * 1024) / totalSegments).toFixed(0);
      const currBytes = ((parseFloat(fill.style.width) / 100) * chunkBytes).toFixed(0);
      if (hoverMetricEl) {
        const rate = isPaused ? '0.0 MB/s' : `${(Math.random() * 2.5 + 5.5).toFixed(1)} MB/s`;
        hoverMetricEl.textContent = `Stream #${i + 1}: ${currBytes} MB / ${chunkBytes} MB (${parseInt(fill.style.width)}%) • ${rate}`;
      }
    });

    chunk.addEventListener('mouseleave', () => {
      if (hoverMetricEl) {
        hoverMetricEl.textContent = isPaused ? 'Transfer Paused • 0.0 MB/s' : 'Chunk #4: 245 MB / 363 MB (67%) • 8.4 MB/s';
      }
    });
  }

  // Interactive Pause / Resume
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseBtn.textContent = isPaused ? '▶' : '⏸';
      pauseBtn.title = isPaused ? 'Resume Transfer' : 'Pause Transfer';
      if (hoverMetricEl) {
        hoverMetricEl.textContent = isPaused ? 'Transfer Paused • 0.0 MB/s' : 'Chunk #4: 245 MB / 363 MB (67%) • 8.4 MB/s';
      }
    });
  }

  let progress = 68;
  let baseSpeed = 96.2;

  setInterval(() => {
    if (isPaused) {
      if (speedEl) speedEl.textContent = '0.0 MB/s';
      if (topBarSpeedEl) topBarSpeedEl.textContent = '⏸ Paused';
      if (etaEl) etaEl.textContent = 'Paused';
      return;
    }

    // Realistic speed jitter (93.5 - 98.8 MB/s)
    const jitter = (Math.random() * 4 - 2).toFixed(1);
    const currentSpeed = (baseSpeed + parseFloat(jitter)).toFixed(1);

    if (speedEl) speedEl.textContent = `${currentSpeed} MB/s`;
    if (topBarSpeedEl) topBarSpeedEl.textContent = `↓ ${currentSpeed} MB/s`;

    // Advance progress
    progress += 0.32;
    if (progress > 98) progress = 45; // Smooth loop

    const intPercent = Math.floor(progress);
    if (percentEl) percentEl.textContent = `${intPercent}%`;
    if (progressBarEl) progressBarEl.style.width = `${progress}%`;

    const downloadedGB = ((progress / 100) * targetSizeGB).toFixed(2);
    if (bytesEl) bytesEl.textContent = `${downloadedGB} GB / ${targetSizeGB} GB`;

    const remainingGB = targetSizeGB - parseFloat(downloadedGB);
    const seconds = Math.max(1, Math.round((remainingGB * 1024) / parseFloat(currentSpeed)));
    if (etaEl) etaEl.textContent = `${seconds}s remaining`;

    // Update 16 individual chunks with realistic progressive distribution
    segmentFills.forEach((fill, idx) => {
      const offset = (idx % 4) * 3;
      const width = Math.min(100, Math.max(15, progress + offset + (Math.random() * 3 - 1.5)));
      fill.style.width = `${width}%`;
    });
  }, 400);
}

/* ==========================================================================
   4. Dynamic Version Sync from version.json
   ========================================================================== */
function initDynamicVersion() {
  const applyVersion = (data) => {
    if (data && data.desktop && data.desktop.latestVersion) {
      const versionString = `v${data.desktop.latestVersion}`;
      document.querySelectorAll('.dynamic-version').forEach((el) => {
        el.textContent = versionString;
      });
      return true;
    }
    return false;
  };

  // Try relative version.json first, then fall back to GitHub raw
  fetch('../version.json')
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (!applyVersion(data)) {
        fetch('https://raw.githubusercontent.com/amanpandey1407/dashflow-releases/main/version.json')
          .then((res) => (res.ok ? res.json() : null))
          .then((ghData) => applyVersion(ghData))
          .catch(() => {});
      }
    })
    .catch(() => {
      fetch('https://raw.githubusercontent.com/amanpandey1407/dashflow-releases/main/version.json')
        .then((res) => (res.ok ? res.json() : null))
        .then((ghData) => applyVersion(ghData))
        .catch(() => {});
    });
}

/* ==========================================================================
   5. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navDrawer = document.getElementById('mobile-nav-drawer');
  if (!menuBtn || !navDrawer) return;

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navDrawer.classList.toggle('open');
  });

  navDrawer.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      navDrawer.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navDrawer.contains(e.target)) {
      navDrawer.classList.remove('open');
    }
  });
}
