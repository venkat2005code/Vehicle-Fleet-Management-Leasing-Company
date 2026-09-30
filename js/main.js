/**
 * FleetAxis - Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ─── 1. DARK/LIGHT MODE TOGGLE ──────────────────────── */
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const htmlEl = document.documentElement;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('fleetaxis-theme');
  if (savedTheme === 'dark') {
    htmlEl.classList.add('dark');
  } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlEl.classList.add('dark');
  }

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      htmlEl.classList.toggle('dark');
      const isDark = htmlEl.classList.contains('dark');
      localStorage.setItem('fleetaxis-theme', isDark ? 'dark' : 'light');
    });
  });

  /* ─── 2. RTL/LTR MODE TOGGLE ─────────────────────────── */
  const dirToggles = document.querySelectorAll('.dir-toggle');
  
  const updateDirLabel = (dir) => {
    dirToggles.forEach(toggle => {
      // Requirements: "Display only the active mode in the RTL/LTR toggle — show 'LTR' when in LTR mode and 'RTL' when in RTL mode"
      toggle.innerHTML = dir === 'rtl' ? 'RTL' : 'LTR';
    });
  };

  // Check saved direction
  const savedDir = localStorage.getItem('fleetaxis-dir') || 'ltr';
  htmlEl.setAttribute('dir', savedDir);
  updateDirLabel(savedDir);

  dirToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentDir = htmlEl.getAttribute('dir');
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      
      htmlEl.setAttribute('dir', newDir);
      localStorage.setItem('fleetaxis-dir', newDir);
      updateDirLabel(newDir);
    });
  });

  /* ─── 3. STICKY HEADER ───────────────────────────────── */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    // Trigger on load in case page is already scrolled
    if (window.scrollY > 20) header.classList.add('scrolled');
  }

  /* ─── 4. MOBILE NAVIGATION ───────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  function openMenu() {
    if (!hamburger || !mobileNav) return;
    mobileNav.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!hamburger || !mobileNav) return;
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when a nav link inside mobile-nav is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on resize if viewport becomes large
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  /* ─── 5. ACCORDION ───────────────────────────────────── */
  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(acc => {
    const header = acc.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = acc.classList.contains('open');
        // Close all others
        accordions.forEach(a => a.classList.remove('open'));
        // Toggle current
        if (!isOpen) acc.classList.add('open');
      });
    }
  });
});
