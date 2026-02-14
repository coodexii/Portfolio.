// State configuration
const state = {
    theme: localStorage.getItem('theme') || 'dark',
    lang: localStorage.getItem('lang') || 'en'
};

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const langText = langToggle.querySelector('.lang-text');
const themeIcon = themeToggle.querySelector('i');
const htmlEl = document.documentElement;

// Initialize
function init() {
    applyTheme(state.theme);
    applyLang(state.lang);
    setupEventListeners();
    setupIntersectionObserver();
}

// Theme Logic
function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(state.theme);
}

// Language Logic
function applyLang(lang) {
    htmlEl.setAttribute('lang', lang);
    langText.textContent = lang === 'en' ? 'AR' : 'EN'; // Show opposite language
    localStorage.setItem('lang', lang);

    // Update Text Content
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });

    // Update Placeholders
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
        const text = el.getAttribute(`data-placeholder-${lang}`);
        if (text) el.setAttribute('placeholder', text);
    });
}

function toggleLang() {
    state.lang = state.lang === 'en' ? 'ar' : 'en';
    applyLang(state.lang);
}

// Event Listeners
function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
    langToggle.addEventListener('click', toggleLang);
}

// Scroll Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));
}

// Run init
document.addEventListener('DOMContentLoaded', init);
