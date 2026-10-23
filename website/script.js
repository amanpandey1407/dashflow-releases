/**
 * DashFlow - Product Page Client Logic
 * 1. Cosmic Warp Speed Particle Canvas
 * 2. Authentic 16-Segment Turbo Download Simulation (Matching real DashFlow UI)
 * 3. Dynamic Version Sync from version.json
 */

document.addEventListener('DOMContentLoaded', () => {
  initWarpCanvas();
  initLiveTransferShowcase();
  initDynamicVersion();
  initMobileMenu();
});

/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navDrawer = document.getElementById('mobile-nav-drawer');
  if (!menuBtn || !navDrawer) return;

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuBtn.classList.toggle('active');
    navDrawer.classList.toggle('open');
  });

  navDrawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navDrawer.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navDrawer.contains(e.target)) {
      menuBtn.classList.remove('active');
      navDrawer.classList.remove('open');
    }
  });
}

/* ==========================================================================
   1. Cosmic Warp Speed Particle Canvas
   ========================================================================== */
function initWarpCanvas() {
  const canvas = document.getElementById('warp-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const numStars = 150;
  const stars = [];
  let baseSpeed = 1.0;
  let targetSpeed = 1.0;

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width * 1.8,
      y: (Math.random() - 0.5) * height * 1.8,
      z: Math.random() * width,
      prevZ: 0,
      color: Math.random() > 0.65 ? '#10b981' : (Math.random() > 0.4 ? '#38bdf8' : '#ffffff'),
      radius: Math.random() * 1.2 + 0.6
    });
  }

  // Accelerate starfield when hovering primary action buttons
  const ctaButtons = document.querySelectorAll('.primary-btn, .nav-cta-btn');
  ctaButtons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => (targetSpeed = 3.5));
    btn.addEventListener('mouseleave', () => (targetSpeed = 1.0));
  });

  function render() {
    baseSpeed += (targetSpeed - baseSpeed) * 0.05;

    ctx.fillStyle = 'rgba(9, 10, 13, 0.28)';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i < numStars; i++) {
      const s = stars[i];
      s.prevZ = s.z;
      s.z -= baseSpeed * 2.2;

      if (s.z <= 0) {
        s.z = width;
        s.prevZ = s.z;
        s.x = (Math.random() - 0.5) * width * 1.8;
        s.y = (Math.random() - 0.5) * height * 1.8;
      }

      const k = 260 / s.z;
      const px = s.x * k + cx;
      const py = s.y * k + cy;

      const pk = 260 / (s.prevZ || s.z);
      const prevX = s.x * pk + cx;
      const prevY = s.y * pk + cy;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        const size = Math.max(0.7, (1 - s.z / width) * s.radius * 2.4);
        const alpha = Math.min(0.9, (1 - s.z / width) * 1.3);

        ctx.strokeStyle = s.color;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;

        // Draw motion streak if moving fast, else circle
        if (baseSpeed > 1.4) {
          ctx.lineWidth = size * 0.8;
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1.0;
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Authentic 16-Segment Turbo Download Simulation
   ========================================================================== */
function initLiveTransferShowcase() {
  const grid = document.getElementById('segments-grid');
  const speedEl = document.getElementById('card-speed-display');
  const topBarSpeedEl = document.getElementById('top-bar-speed');
  const percentEl = document.getElementById('card-percent-display');
  const progressBarEl = document.getElementById('card-progress-bar');
  const bytesEl = document.getElementById('card-bytes-display');
  const etaEl = document.getElementById('card-eta-display');
  const hoverMetricEl = document.getElementById('segment-hover-metric');

  if (!grid) return;

  const totalSegments = 16;
  const targetSizeGB = 5.82;
  const segmentFills = [];

  // Create 16 Segment Chunks matching real DashFlow SegmentBar.tsx
  grid.innerHTML = '';
  for (let i = 0; i < totalSegments; i++) {
    const chunk = document.createElement('div');
    chunk.className = 'seg-chunk';
    chunk.title = `Chunk #${i + 1} (${(100 / totalSegments).toFixed(1)}%)`;

    const fill = document.createElement('div');
    fill.className = 'seg-chunk-fill';
    fill.style.width = `${Math.floor(Math.random() * 40 + 45)}%`;

    chunk.appendChild(fill);
    grid.appendChild(chunk);
    segmentFills.push(fill);

    // Hover metric interaction
    chunk.addEventListener('mouseenter', () => {
      const chunkBytes = (targetSizeGB * 1024 / totalSegments).toFixed(0);
      const currBytes = (parseFloat(fill.style.width) / 100 * chunkBytes).toFixed(0);
      if (hoverMetricEl) {
        hoverMetricEl.textContent = `Chunk #${i + 1}: ${currBytes} MB / ${chunkBytes} MB (${parseInt(fill.style.width)}%) • ${(Math.random() * 3 + 5.5).toFixed(1)} MB/s`;
      }
    });

    chunk.addEventListener('mouseleave', () => {
      if (hoverMetricEl) {
        hoverMetricEl.textContent = `Chunk #4: 245 MB / 363 MB (67%) • 8.4 MB/s`;
      }
    });
  }

  let progress = 68;
  let baseSpeed = 96.2;

  setInterval(() => {
    // Subtle realistic speed jitter (93 - 99 MB/s)
    const jitter = (Math.random() * 5 - 2.5).toFixed(1);
    const currentSpeed = (baseSpeed + parseFloat(jitter)).toFixed(1);

    if (speedEl) speedEl.textContent = `${currentSpeed} MB/s`;
    if (topBarSpeedEl) topBarSpeedEl.textContent = `↓ ${currentSpeed} MB/s`;

    // Advance progress
    progress += 0.35;
    if (progress > 98) progress = 42; // Loop smoothly

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
      const width = Math.min(100, Math.max(15, progress + offset + (Math.random() * 4 - 2)));
      fill.style.width = `${width}%`;
    });
  }, 400);
}

/* ==========================================================================
   3. Dynamic Version Sync from version.json
   ========================================================================== */
function initDynamicVersion() {
  fetch('https://raw.githubusercontent.com/amanpandey1407/dashflow-releases/main/version.json')
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data && data.desktop && data.desktop.latestVersion) {
        const versionString = `v${data.desktop.latestVersion}`;
        document.querySelectorAll('.dynamic-version').forEach((el) => {
          el.textContent = versionString;
        });
      }
    })
    .catch(() => {
      // Fallback silently
    });
}
