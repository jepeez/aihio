import React from 'react'
import ReactDOM from 'react-dom/client'
import HeroScene from './HeroScene'
import { TransitionManager } from './TransitionManager.jsx'
import { ScrambleText } from './scramble.js'
import { MagneticButton } from './magnetic.js'
import { ContactTerminal } from './ContactTerminal.jsx'

const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

// Main Root (for HeroScene & Transitions)
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {isHomePage && <HeroScene />}
      <TransitionManager />
    </React.StrictMode>,
  )
}

// Contact Page Terminal Root
const contactContainer = document.getElementById('contact-terminal-container');
if (contactContainer) {
  ReactDOM.createRoot(contactContainer).render(
    <React.StrictMode>
      <ContactTerminal />
    </React.StrictMode>
  );
}

// Initialize Scramble Effect for static HTML headings
const initScramble = () => {
  const elements = document.querySelectorAll('.scramble-target');
  elements.forEach(el => {
      new ScrambleText(el);
  });
};

// Initialize Magnetic Buttons
const initMagnetic = () => {
    // Navigation Links
    // We select 'nav a' but exclude the logo image link
    const navLinks = document.querySelectorAll('nav a:not(:has(img))');
    navLinks.forEach(el => new MagneticButton(el, { strength: 10, ease: 0.1 }));

    // CTA Buttons (with class magnetic-button)
    const buttons = document.querySelectorAll('.magnetic-button');
    buttons.forEach(el => new MagneticButton(el, { strength: 30, ease: 0.08 }));
};

const initEffects = () => {
    initScramble();
    initMagnetic();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEffects);
} else {
  initEffects();
}
