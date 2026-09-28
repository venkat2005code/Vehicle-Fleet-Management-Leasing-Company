/**
 * FleetAxis - Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ─── 1. DARK/LIGHT MODE TOGGLE ──────────────────────── */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('fleetaxis-theme');
  if (savedTheme === 'dark') {
    htmlEl.classList.add('dark');
  } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlEl.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      htmlEl.classList.toggle('dark');
      const isDark = htmlEl.classList.contains('dark');
      localStorage.setItem('fleetaxis-theme', isDark ? 'dark' : 'light');
    });
  }

  /* ─── 2. RTL/LTR MODE TOGGLE ─────────────────────────── */
  const dirToggle = document.getElementById('dirToggle');
  
  const updateDirLabel = (dir) => {
    if (dirToggle) {
      // Requirements: "Display only the active mode in the RTL/LTR toggle — show 'LTR' when in LTR mode and 'RTL' when in RTL mode"
      dirToggle.innerHTML = dir === 'rtl' ? 'RTL' : 'LTR';
    }
  };

  // Check saved direction
  const savedDir = localStorage.getItem('fleetaxis-dir') || 'ltr';
  htmlEl.setAttribute('dir', savedDir);
  updateDirLabel(savedDir);

  if (dirToggle) {
    dirToggle.addEventListener('click', () => {
      const currentDir = htmlEl.getAttribute('dir');
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      
      htmlEl.setAttribute('dir', newDir);
      localStorage.setItem('fleetaxis-dir', newDir);
      updateDirLabel(newDir);
    });
  }

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
  
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      
      // Animate hamburger
      const spans = hamburger.querySelectorAll('span');
      if (mobileNav.classList.contains('open')) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
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
