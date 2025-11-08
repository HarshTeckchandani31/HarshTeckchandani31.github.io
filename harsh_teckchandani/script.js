/* Main interactive script for portfolio
   - Typewriter (rotating roles)
   - Skills carousel (simple left/right)
   - Profile shape toggle (circle / hex / square)
   - Hacker mode toggle (intense animations + particles recolor)
   - Mobile menu
   - Contact form submit handling
*/

const roles = [
  "Data Scientist",
  "Bug Bounty Hunter",
  "Software Developer"
];

const typeEl = document.getElementById("typewriter-text");
let rI = 0, cI = 0, typing = true;
const speed = 90;

function typeLoop(){
  const current = roles[rI];
  if (typing) {
    if (cI <= current.length) {
      typeEl.textContent = current.slice(0, cI);
      cI++;
      setTimeout(typeLoop, speed);
    } else {
      typing = false;
      setTimeout(typeLoop, 900);
    }
  } else {
    if (cI >= 0) {
      typeEl.textContent = current.slice(0, cI);
      cI--;
      setTimeout(typeLoop, speed/1.5);
    } else {
      typing = true;
      rI = (rI + 1) % roles.length;
      setTimeout(typeLoop, 200);
    }
  }
}
window.addEventListener('DOMContentLoaded', () => { typeLoop(); });

/* Skills carousel logic */
const skillsTrack = document.querySelector('.skills-track');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let idx = 0;
const step = 150; // px per item approximate

if (prevBtn && nextBtn && skillsTrack) {
  nextBtn.addEventListener('click', () => {
    idx = Math.min(idx + 1, skillsTrack.children.length - 1);
    skillsTrack.style.transform = `translateX(-${idx * step}px)`;
  });
  prevBtn.addEventListener('click', () => {
    idx = Math.max(idx - 1, 0);
    skillsTrack.style.transform = `translateX(-${idx * step}px)`;
  });
}

/* Shape toggle */
const shapeToggle = document.getElementById('shapeToggle');
const profileFrame = document.getElementById('profileFrame');
const shapes = ['circle', 'hexagon', 'square'];
let shapeIndex = 0;
shapeToggle.addEventListener('click', () => {
  shapeIndex = (shapeIndex + 1) % shapes.length;
  profileFrame.className = `profile-frame ${shapes[shapeIndex]}`;
});

/* Hacker mode toggle */
const hackerToggle = document.getElementById('hackerToggle');
hackerToggle.addEventListener('click', () => {
  document.body.classList.toggle('hacker-mode');
  // recolor particles if present
  if (window.pJSDom && window.pJSDom.length) {
    const color = document.body.classList.contains('hacker-mode') ? '#00fff7' : '#b74b4d';
    try {
      window.pJSDom[0].pJS.particles.color.value = color;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    } catch(e) { /* ignore */ }
  }
});

/* Mobile menu toggle */
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close when nav clicked
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(a => a.addEventListener('click', () => { mobileNav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); }));
}

/* Contact form handling */
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMessage.textContent = 'Sending...';
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method: form.method, body: data, headers: { 'Accept': 'application/json' }});
      if (res.ok) {
        form.reset();
        formMessage.textContent = 'Thank you! Your message has been sent.';
      } else {
        formMessage.textContent = 'Oops! Something went wrong. Try again later.';
      }
    } catch (err) {
      formMessage.textContent = 'Network problem. Please try again.';
    }
  });
}

/* Resume download placeholder (user can replace with actual file) */
const downloadResume = document.getElementById('downloadResume');
if (downloadResume) {
  downloadResume.addEventListener('click', () => {
    // If you have resume.pdf in project root, enable direct download:
    // window.open('resume.pdf','_blank');
    alert('Replace this handler to download your resume (put resume.pdf in project root)');
  });
}

/* Year in footer */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Particles initialization (subtle default, recolored in hacker-mode toggle) */
function initParticles(color = '#00fff7') {
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: color },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 160, color: color, opacity: 0.25, width: 1 },
        move: { enable: true, speed: 1.4, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: false }
        },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.6 } } }
      },
      retina_detect: true
    });
  }
}
document.addEventListener('DOMContentLoaded', () => { initParticles('#00fff7'); });

/* small nicety: smooth scroll & active link highlight */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // update active states in sidebar
      document.querySelectorAll('.side-nav a').forEach(x => x.classList.remove('active'));
      const sideMatch = document.querySelector(`.side-nav a[href="#${target.id}"]`);
      if (sideMatch) sideMatch.classList.add('active');
      // close mobile nav if open
      if (mobileNav.classList.contains('open')) mobileNav.classList.remove('open');
    }
  });
});
