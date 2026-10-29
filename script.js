/**
 * chauw9.asia — Interactive Profile Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typing Effect
  const phrases = [
    'Java Developer',
    'Minecraft Fabric Modder',
    'Client Architect',
    'Bytecode Tinkerer',
    'Reverse Engineer'
  ];

  const typingElement = document.getElementById('typing-text');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing new phrase
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // 2. Card Subtle Glow Mouse Tracking
  const cards = document.querySelectorAll('.stat-card, .about-card, .skill-category-card, .project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

/**
 * Copy Email to Clipboard with Toast Feedback
 */
function copyEmail() {
  const email = 'tunganh0113g@gmail.com';
  
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(() => {
      showToast('Đã sao chép email: ' + email);
    }).catch(() => {
      fallbackCopy(email);
    });
  } else {
    fallbackCopy(email);
  }
}

function fallbackCopy(text) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showToast('Đã sao chép email: ' + text);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast) return;

  if (toastMsg && message) {
    toastMsg.textContent = message;
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}