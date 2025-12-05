// Simple TypeScript for portfolio interactions
document.getElementById('year')!.textContent = String(new Date().getFullYear());

// theme toggle with persistence
const btn = document.getElementById('themeToggle') as HTMLButtonElement | null;
const root = document.documentElement;

function applyTheme(theme: 'dark' | 'light') {
  if (theme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    if (btn) { btn.textContent = 'Light'; btn.setAttribute('aria-pressed', 'true'); }
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    if (btn) { btn.textContent = 'Dark'; btn.setAttribute('aria-pressed', 'false'); }
  }
  try { localStorage.setItem('theme', theme); } catch (_) { /* ignore */ }
}

// initialize from saved preference (or system preference)
const savedTheme = (() => {
  try { return localStorage.getItem('theme'); } catch (_) { return null; }
})();
if (savedTheme === 'dark' || savedTheme === 'light') {
  applyTheme(savedTheme as 'dark' | 'light');
} else {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

if (btn) {
  btn.addEventListener('click', () => {
    const isDark = root.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  });
}

// typewriter simple
const tw = document.getElementById('typewriter')!;
const words = ['Frontend Developer','Designer','Open-source enthusiast'];
let i=0; let idx=0;
function type(){ 
  tw.textContent = words[i].slice(0, ++idx);
  if(idx === words[i].length){ setTimeout(()=>{ idx=0; i=(i+1)%words.length; type(); }, 1200); }
  else setTimeout(type, 80);
}
type();

// basic projects data (replace with real)
const projects = [
  {title:'Admin Dashboard', desc:'Responsive admin UI', url:'#'},
  {title:'Weather App', desc:'API + TypeScript', url:'#'},
  {title:'Food Delivery UI', desc:'HTML, CSS, TypeScript', url:'#'},
  {title:'Portfolio Template', desc:'Modern UI Design', url:'#'},
  {title:'E-commerce Store', desc:'Node.js + MongoDB', url:'#'},
  {title:'Chat Application', desc:'Real-time with WebSocket', url:'#'}
];
const grid = document.getElementById('projectsGrid')!;
projects.forEach(p=>{
  const col = document.createElement('div'); col.className='col-md-6 col-lg-4';
  col.innerHTML = `<div class="card p-3"><h5>${p.title}</h5><p>${p.desc}</p><a class="btn btn-sm btn-outline-primary" href="${p.url}">View</a></div>`;
  grid.appendChild(col);
});

// contact form (demo)
const form = document.getElementById('contactForm') as HTMLFormElement | null;
if (form) {
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const originalText = submitBtn ? submitBtn.textContent : 'Send';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    const nameEl = document.getElementById('name') as HTMLInputElement | null;
    const emailEl = document.getElementById('email') as HTMLInputElement | null;
    const messageEl = document.getElementById('message') as HTMLTextAreaElement | null;

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const message = messageEl ? messageEl.value.trim() : '';

    if (!name || !email || !message) {
      alert('Please fill out all fields before sending.');
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
      return;
    }

    // Emulate an async send (replace with real API call if needed)
    setTimeout(() => {
      // show inline success message
      const success = document.createElement('div');
      success.className = 'alert alert-success mt-3';
      success.textContent = 'Message sent! I will reply soon.';
      // remove any previous alerts
      const existing = form.querySelector('.alert');
      if (existing) existing.remove();
      form.appendChild(success);

      form.reset();
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }

      // show a browser alert as well for visibility
      alert('Message sent! Thank you — I will reply soon.');

      // auto-remove the success notification
      setTimeout(() => { success.remove(); }, 4000);
    }, 800);
  });
}

