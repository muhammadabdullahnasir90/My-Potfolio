/* =========================================================
   MUHAMMAD ABDULLAH NASIR — PORTFOLIO
   Circuit Ledger theme — vanilla JS, no dependencies
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  const preText = document.getElementById('pre-text');
  const bootLines = ['booting portfolio.exe', 'loading skills[]', 'connecting to github', 'ready'];
  let li = 0, ci = 0;
  function typeBoot(){
    if(li >= bootLines.length){
      setTimeout(() => preloader.classList.add('done'), 300);
      return;
    }
    const line = bootLines[li];
    if(ci <= line.length){
      preText.textContent = line.slice(0, ci);
      ci++;
      setTimeout(typeBoot, 28);
    } else {
      li++; ci = 0;
      setTimeout(typeBoot, 220);
    }
  }
  typeBoot();
  // Safety net in case something stalls
  setTimeout(() => preloader.classList.add('done'), 3200);

  /* ---------- CUSTOM CURSOR ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = innerWidth/2, mouseY = innerHeight/2;
  let ringX = mouseX, ringY = mouseY;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });
  function ringLoop(){
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(ringLoop);
  }
  ringLoop();
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
  });

  /* ---------- LIVE BACKGROUND: PARTICLE NETWORK ---------- */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const PARTICLE_COUNT_BASE = 70;
  const mouse = { x: null, y: null, radius: 160 };

  function resize(){
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function initParticles(){
    particles = [];
    const count = Math.min(PARTICLE_COUNT_BASE, Math.floor((W*H)/16000));
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*W,
        y: Math.random()*H,
        vx: (Math.random()-0.5)*0.35,
        vy: (Math.random()-0.5)*0.35,
        r: Math.random()*1.6 + 0.6
      });
    }
  }
  initParticles();
  window.addEventListener('resize', initParticles);

  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

  const SIGNAL = '0,230,160';

  function drawBG(){
    ctx.clearRect(0,0,W,H);

    // subtle vertical gradient wash
    const grad = ctx.createRadialGradient(W*0.5, H*0.15, 0, W*0.5, H*0.15, Math.max(W,H)*0.8);
    grad.addColorStop(0, 'rgba(0,230,160,0.05)');
    grad.addColorStop(1, 'rgba(10,14,20,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    // update + draw particles
    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > W) p.vx *= -1;
      if(p.y < 0 || p.y > H) p.vy *= -1;

      // mouse repulsion
      if(mouse.x !== null){
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < mouse.radius){
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx/dist) * force * 1.6;
          p.y += (dy/dist) * force * 1.6;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${SIGNAL},0.55)`;
      ctx.fill();
    }

    // connecting lines
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 130){
          const op = (1 - dist/130) * 0.18;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = `rgba(${SIGNAL},${op})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawBG);
  }
  drawBG();

  /* ---------- 3D TILT: cards & buttons ---------- */
  function applyTilt(el, {max = 10, scale = 1.02, glare = true} = {}){
    let rect;
    function onMove(e){
      rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * -max;
      const ry = (px - 0.5) * max;
      el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
      if(glare){
        el.style.setProperty('--mx', `${px*100}%`);
        el.style.setProperty('--my', `${py*100}%`);
      }
    }
    function onLeave(){
      el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  }
  document.querySelectorAll('[data-tilt]').forEach(el => applyTilt(el, {max: 8, scale: 1.03}));

  /* ---------- SKILLS DATA ---------- */
  const skillCategories = [
    {
      label: 'Languages',
      items: [
        {name: 'JavaScript (ES6+)', sub: 'Primary language across the stack', tag: '<lang/>'},
        {name: 'TypeScript', sub: 'Typed, safer app development', tag: '<lang/>'},
        {name: 'Python', sub: 'AI/ML & backend services', tag: '<lang/>'},
        {name: 'SQL', sub: 'Relational data & queries', tag: '<lang/>'},
        {name: 'HTML5 & CSS3', sub: 'Semantic, responsive markup', tag: '<lang/>'},
        {name: 'C / C++', sub: 'Fundamentals & problem solving', tag: '<lang/>'},
      ]
    },
    {
      label: 'AI & Automation',
      items: [
        {name: 'LLM Integration', sub: 'OpenAI API · LangChain', tag: '<llm/>'},
        {name: 'AI Chatbots & Assistants', sub: 'Conversational AI systems', tag: '<bot/>'},
        {name: 'RAG & Vector Search', sub: 'Retrieval-augmented generation', tag: '<rag/>'},
        {name: 'AWS Bedrock', sub: 'Generative AI · Foundation models', tag: '<cloud/>'},
        {name: 'Prompt Engineering', sub: 'Structured, reliable outputs', tag: '<prompt/>'},
        {name: 'Workflow Automation', sub: 'AI-driven process automation', tag: '<auto/>'},
      ]
    },
    {
      label: 'Frameworks & Tools',
      items: [
        {name: 'MERN Stack', sub: 'MongoDB · Express · React · Node', tag: '<web/>'},
        {name: 'MEAN Stack', sub: 'MongoDB · Express · Angular · Node', tag: '<web/>'},
        {name: 'React Native (Expo)', sub: 'Cross-platform mobile apps', tag: '<app/>'},
        {name: 'PostgreSQL & MongoDB', sub: 'Relational & NoSQL databases', tag: '<db/>'},
        {name: 'Docker', sub: 'Containerized deployments', tag: '<ops/>'},
        {name: 'Git & GitHub', sub: 'Version control & collaboration', tag: '<vcs/>'},
        {name: 'Postman & REST APIs', sub: 'API design & testing', tag: '<api/>'},
        {name: 'UI/UX Design', sub: 'Interface & interaction design', tag: '<design/>'},
      ]
    }
  ];
  const skillsGrid = document.getElementById('skillsGrid');
  skillsGrid.innerHTML = skillCategories.map(cat => `
    <div class="skills-category">// ${cat.label}</div>
    <div class="skills-row">
      ${cat.items.map(s => `
        <div class="skill-chip" data-tilt>
          <span class="skill-icon">${s.tag}</span>
          <span class="skill-name">${s.name}</span>
          <span class="skill-sub">${s.sub}</span>
        </div>
      `).join('')}
    </div>
  `).join('');
  skillsGrid.querySelectorAll('[data-tilt]').forEach(el => applyTilt(el, {max: 6, scale: 1.02}));

  /* ---------- PROJECTS DATA ---------- */
  const GITHUB = 'https://github.com/muhammadabdullahnasir90';
  const MAIL = 'abdullahnasir.work24@gmail.com';

  const projects = [
    {
      status: 'live', statusLabel: 'In Production · Running in Market',
      title: 'Point-of-Sale (POS) System',
      desc: 'A point-of-sale system built for real retail use — currently deployed and running live in a market, handling day-to-day billing and inventory operations.',
      stack: ['MERN Stack', 'REST API', 'Role-based Auth'],
      features: [
        'Live billing, inventory & transaction tracking',
        'Currently running in production in a physical market',
        'Built for speed and reliability under daily real-world use'
      ],
      actions: [
        {label: 'View on GitHub', href: GITHUB, primary: true, external: true},
      ]
    },
    {
      status: 'live', statusLabel: 'In Production · Running in Market',
      title: 'E-Stamp App',
      desc: 'A digital e-stamping application built for a client to issue and manage stamped documents electronically, replacing manual paper-based workflows — now live in the market.',
      stack: ['Full-Stack Web App', 'Document Workflow', 'Client Delivery'],
      features: [
        'Digitizes and streamlines the e-stamp issuance process',
        'Built to a client\u2019s production requirements',
        'Delivered, deployed, and in active use'
      ],
      actions: [
        {label: 'View on GitHub', href: GITHUB, primary: true, external: true},
      ]
    },
    {
      status: 'client', statusLabel: 'Full-Stack + AI · 2026',
      title: 'AI-Powered Fraud Detection & Analytics Platform',
      desc: 'A full-stack web application that detects fraudulent financial transactions using machine learning, with real-time predictions and human-readable AI explanations.',
      stack: ['FastAPI', 'React', 'PostgreSQL', 'LangChain', 'OpenAI API', 'Docker'],
      features: [
        'RESTful APIs built with FastAPI for real-time fraud predictions',
        'LLM-based explanations via OpenAI API + LangChain for human-readable insights',
        'Interactive React dashboard with live data visualization',
        'PostgreSQL for transaction history & results',
        'Containerized with Docker for scalable deployment'
      ],
      actions: []
    },
    {
      status: 'client', statusLabel: 'Mobile · Full-Stack AI',
      title: 'EastlyAI — Mobile Cooking Assistant',
      desc: 'A cross-platform AI recipe recommendation and cooking assistant app, built end-to-end with a mobile client, REST API, and admin dashboard.',
      stack: ['React Native (Expo)', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Spoonacular API', 'JWT'],
      features: [
        'AI-driven recipe recommendations',
        'Recipe search powered by the Spoonacular API',
        'Real-time in-app chat assistant',
        'JWT authentication & admin panel for content management'
      ],
      actions: []
    },
  ];

  const projectsGrid = document.getElementById('projectsGrid');
  projectsGrid.innerHTML = projects.map(p => `
    <article class="project-card" data-tilt>
      <div class="pc-top">
        <span class="pc-status ${p.status}"><span class="dot"></span>${p.status === 'live' ? 'Live' : 'Personal Project'}</span>
        <span class="pc-year">${p.statusLabel}</span>
      </div>
      <h3>${p.title}</h3>
      <p class="pc-desc">${p.desc}</p>
      <div class="pc-stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
      <ul class="pc-features">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
      ${p.actions.length ? `
      <div class="pc-actions">
        ${p.actions.map(a => a.disabled
          ? `<span class="btn btn-ghost btn-small btn-disabled">${a.label}</span>`
          : `<a class="btn ${a.primary ? 'btn-primary' : 'btn-outline'} btn-small tilt-btn" data-tilt href="${a.href}" ${a.external ? 'target="_blank" rel="noopener"' : ''}>${a.label}</a>`
        ).join('')}
      </div>` : ''}
    </article>
  `).join('');
  projectsGrid.querySelectorAll('[data-tilt]').forEach(el => applyTilt(el, {max: 6, scale: 1.015}));

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});
  revealEls.forEach(el => observer.observe(el));

  /* ---------- COUNTER ANIMATION ---------- */
  document.querySelectorAll('.meta-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const step = () => {
            current += Math.max(1, target / 30);
            if(current >= target){ el.textContent = target; }
            else { el.textContent = Math.floor(current); requestAnimationFrame(step); }
          };
          step();
          counterObs.disconnect();
        }
      });
    }, {threshold: 0.6});
    counterObs.observe(el);
  });

  /* ---------- NAV: active link + mobile toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const sections = document.querySelectorAll('main .section, .hero');
  const navAnchors = document.querySelectorAll('[data-nav]');
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.id;
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, {threshold: 0.5});
  sections.forEach(s => { if(s.id) navObs.observe(s); });

  /* ---------- BACK TO TOP ---------- */
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 500);
  });
  toTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

  /* ---------- CONTACT FORM (mailto handoff) ---------- */
  const msgForm = document.getElementById('msgForm');
  const formNote = document.getElementById('formNote');
  msgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(msgForm);
    const name = encodeURIComponent(data.get('name'));
    const email = encodeURIComponent(data.get('email'));
    const message = encodeURIComponent(data.get('message'));
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get('name')}`);
    const body = `From: ${name} (${email})%0D%0A%0D%0A${message}`;
    window.location.href = `mailto:${MAIL}?subject=${subject}&body=${body}`;
    formNote.textContent = 'Opening your email client…';
  });

});
