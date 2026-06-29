// TheRain - Global Settings Manager
// Handles Dark/Light mode and EN/FR language across ALL pages

const LOGO_DARK = 'images/logo_dark.png';
const LOGO_LIGHT = 'images/logo_light.png';

// ============================================================
// THEME MANAGEMENT
// ============================================================
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  if(icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  updateLogos(theme);
  localStorage.setItem('therain_theme', theme);
}

function updateLogos(theme) {
  document.querySelectorAll('.nav-logo-img, .footer-logo-img, #navLogo').forEach(img => {
    if(img) img.src = theme === 'dark' ? LOGO_DARK : LOGO_LIGHT;
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ============================================================
// LANGUAGE MANAGEMENT - Safe version that preserves HTML
// ============================================================
function applyLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  const label = document.getElementById('langLabel');
  if(label) label.textContent = lang === 'en' ? 'FR' : 'EN';
  localStorage.setItem('therain_lang', lang);
  
  // Only translate SIMPLE text elements (no child HTML elements)
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if(!text) return;
    
    // Skip elements that contain important child HTML (spans, icons, links etc)
    // Only translate if element has no child elements OR only has text
    const hasChildElements = el.querySelector('span.hl, a, button, i.fas, i.fab, img');
    
    if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else if(!hasChildElements) {
      // Safe to replace - no important child HTML
      el.innerHTML = text;
    } else {
      // Has child HTML - only update text nodes safely
      // Skip to avoid breaking layout
    }
  });
}

function toggleLang() {
  const current = localStorage.getItem('therain_lang') || 'en';
  applyLang(current === 'en' ? 'fr' : 'en');
}

// ============================================================
// MOBILE NAV
// ============================================================
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  if(!nav) return;
  const isOpen = nav.style.display === 'flex' || nav.classList.contains('open');
  if(isOpen) {
    nav.style.display = 'none';
    nav.classList.remove('open');
  } else {
    nav.style.display = 'flex';
    nav.classList.add('open');
  }
}

function closeMobileNav() {
  const nav = document.getElementById('mobileNav');
  if(nav) { nav.style.display = 'none'; nav.classList.remove('open'); }
}

// ============================================================
// INIT - Apply saved settings on page load
// ============================================================
function initSettings() {
  // Apply saved theme (default: dark)
  const savedTheme = localStorage.getItem('therain_theme') || 'dark';
  applyTheme(savedTheme);
  
  // Apply saved language (default: en)
  const savedLang = localStorage.getItem('therain_lang') || 'en';
  // Only apply if user previously chose French
  if(savedLang === 'fr') {
    applyLang('fr');
  }
}

// Run after DOM is fully loaded
document.addEventListener('DOMContentLoaded', initSettings);
