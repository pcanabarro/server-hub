/* ═══════════════════════════════════════════════════════════
   Server Hub — Shared JavaScript
   ═══════════════════════════════════════════════════════════ */

// Create floating particles
function initParticles(containerId = 'particles', count = 30) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (8 + Math.random() * 12) + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
        container.appendChild(p);
    }
}

// Mobile navigation toggle
function initMobileNav() {
    const mobileBtn = document.querySelector('.nav-mobile-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileBtn || !navLinks) return;
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const isOpen = navLinks.classList.contains('open');
        mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('open');
            mobileBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Copy text to clipboard with visual feedback
function copyToClipboard(element, text) {
    navigator.clipboard.writeText(text || element.textContent).then(() => {
        const originalColor = element.style.color;
        element.style.color = '#06d6a0';
        setTimeout(() => {
            element.style.color = originalColor;
        }, 1000);
    });
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initMobileNav();
});
