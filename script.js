// ===================================================
// Soumyadip Jana — Portfolio
// ===================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- SKILLS DATA ---------- */
const skillGroups = [
  { title: "Programming Languages", icon: "fa-solid fa-code", items: ["Python","C","C++","Java","JavaScript","SQL"] },
  { title: "Web Development", icon: "fa-solid fa-globe", items: ["HTML5","CSS3","JavaScript","Responsive Design","Bootstrap","React.js (Learning)"] },
  { title: "Machine Learning", icon: "fa-solid fa-diagram-project", items: ["Scikit-learn","Regression","Classification","Clustering","Feature Engineering","Model Evaluation","Data Preprocessing"] },
  { title: "Deep Learning", icon: "fa-solid fa-brain", items: ["TensorFlow","Keras","PyTorch","ANN","CNN","RNN","LSTM"] },
  { title: "Computer Vision", icon: "fa-solid fa-eye", items: ["OpenCV","YOLO","Image Classification","Object Detection","Face Detection","Image Processing"] },
  { title: "Natural Language Processing", icon: "fa-solid fa-comment-dots", items: ["NLTK","spaCy","Hugging Face Transformers","Text Classification","Sentiment Analysis","Tokenization"] },
  { title: "Data Science & Analytics", icon: "fa-solid fa-chart-line", items: ["NumPy","Pandas","Matplotlib","Plotly","Data Cleaning","EDA","Data Visualization"] },
  { title: "Databases", icon: "fa-solid fa-database", items: ["MySQL","SQLite","MongoDB (Basic)"] },
  { title: "Version Control", icon: "fa-brands fa-git-alt", items: ["Git","GitHub"] },
  { title: "Development Tools", icon: "fa-solid fa-screwdriver-wrench", items: ["VS Code","Jupyter Notebook","Google Colab","PyCharm","Anaconda"] },
  { title: "Cloud & Deployment", icon: "fa-solid fa-cloud", items: ["GitHub Pages","Vercel","Streamlit","Flask","Docker (Learning)"] },
  { title: "Soft Skills", icon: "fa-solid fa-people-group", items: ["Problem Solving","Analytical Thinking","Team Collaboration","Communication","Critical Thinking","Time Management","Continuous Learning","Leadership"] },
];

const skillsGrid = document.getElementById('skillsGrid');
skillsGrid.innerHTML = skillGroups.map(g => `
  <div class="skill-card fade-up">
    <h3><i class="${g.icon}"></i> ${g.title}</h3>
    <div class="skill-tags">${g.items.map(i => `<span>${i}</span>`).join('')}</div>
  </div>
`).join('');

/* ---------- THEME TOGGLE ---------- */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorageGet('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  updateThemeIcon(next);
  localStorageSet('theme', next);
});

function updateThemeIcon(theme){
  themeToggle.innerHTML = theme === 'dark'
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
}

// Safe localStorage wrappers (works fine on Vercel; falls back gracefully)
function localStorageGet(key){ try { return localStorage.getItem(key); } catch(e){ return null; } }
function localStorageSet(key, val){ try { localStorage.setItem(key, val); } catch(e){} }

/* ---------- NAV: scroll state + mobile burger ---------- */
const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const navBurger = document.getElementById('navBurger');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  backToTop.classList.toggle('show', window.scrollY > 600);
}, { passive: true });

navBurger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ---------- BACK TO TOP ---------- */
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

/* ---------- TYPING EFFECT ---------- */
const roles = ["Machine Learning Engineer", "AI Enthusiast", "Deep Learning Explorer", "Computer Vision Builder"];
const typingEl = document.getElementById('typing');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const word = roles[roleIndex];
  if (!deleting){
    charIndex++;
    typingEl.textContent = word.slice(0, charIndex);
    if (charIndex === word.length){
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typingEl.textContent = word.slice(0, charIndex);
    if (charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

/* ---------- SCROLL FADE-UP REVEAL ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

/* ---------- STATS COUNT-UP ---------- */
const statEls = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      animateCount(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
statEls.forEach(el => statsObserver.observe(el));

function animateCount(el){
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();
  function step(now){
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* ---------- PROJECT FILTERS ---------- */
const filterChips = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');

filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    projectCards.forEach(card => {
      const tags = card.dataset.tags.split(' ');
      card.classList.toggle('hidden', filter !== 'all' && !tags.includes(filter));
    });
  });
});

/* ---------- CURSOR GLOW (desktop only) ---------- */
const cursorGlow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer: fine)').matches){
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
} else {
  cursorGlow.style.display = 'none';
}

/* ---------- CONTACT FORM ---------- */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Plug in EmailJS here, e.g.:
  // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm, 'YOUR_PUBLIC_KEY')
  formNote.textContent = "Thanks! This demo form isn't wired up yet — connect EmailJS (see README) or mail me directly.";
  formNote.style.color = "var(--secondary)";
  contactForm.reset();
});

/* ===================================================
   NEURAL NETWORK BACKGROUND (signature hero element)
   =================================================== */
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');
let nodes = [];
let w, h;
const NODE_COUNT_BASE = 70;

function resizeCanvas(){
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
}

function getThemeColors(){
  const dark = root.getAttribute('data-theme') !== 'light';
  return {
    node: dark ? 'rgba(148,163,184,0.9)' : 'rgba(37,99,235,0.55)',
    line: dark ? 'rgba(59,130,246,0.18)' : 'rgba(37,99,235,0.12)',
    pulse: dark ? 'rgba(139,92,246,0.9)' : 'rgba(124,58,237,0.7)'
  };
}

function initNodes(){
  const count = Math.min(NODE_COUNT_BASE, Math.floor((w * h) / 16000));
  nodes = Array.from({ length: Math.max(count, 28) }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.6 + 1
  }));
}

let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function drawFrame(){
  if (reducedMotion) return;
  ctx.clearRect(0, 0, w, h);
  const colors = getThemeColors();
  const linkDist = Math.min(150, Math.max(90, w / 9));

  for (let i = 0; i < nodes.length; i++){
    const n = nodes[i];
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > w) n.vx *= -1;
    if (n.y < 0 || n.y > h) n.vy *= -1;
  }

  for (let i = 0; i < nodes.length; i++){
    for (let j = i + 1; j < nodes.length; j++){
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < linkDist){
        ctx.strokeStyle = colors.line;
        ctx.globalAlpha = 1 - dist / linkDist;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;

  nodes.forEach(n => {
    ctx.beginPath();
    ctx.fillStyle = colors.node;
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawFrame);
}

function setupCanvas(){
  resizeCanvas();
  initNodes();
  if (!reducedMotion) requestAnimationFrame(drawFrame);
  else {
    // draw a single static frame for reduced-motion users
    const colors = getThemeColors();
    ctx.clearRect(0,0,w,h);
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.fillStyle = colors.node;
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

setupCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initNodes(); }, { passive: true });
