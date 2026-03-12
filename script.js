document.addEventListener('DOMContentLoaded', () => {

  const EMAILJS_PUBLIC_KEY = 'tSnZoTCJJafY5EOj5';
  const EMAILJS_SERVICE_ID = 'service_z9yhmjg';
  const EMAILJS_TEMPLATE_ID = 'template_57voene';
  const CONTACT_RATE_LIMIT_KEY = 'contactFormLastSubmitAt';
  const CONTACT_RATE_LIMIT_MS = 60 * 1000;
  const emailjsClient = window.emailjs;
  let emailjsReady = false;

  // ============================
  // EmailJS Init
  // ============================
  if (emailjsClient && typeof emailjsClient.init === 'function') {
    try {
      emailjsClient.init(EMAILJS_PUBLIC_KEY);
      emailjsReady = true;
    } catch (err) {
      console.warn('Email service initialization failed.', err);
    }
  } else {
    console.warn('Email service is unavailable. Contact form sending is disabled.');
  }

  // ============================
  // Cursor Glow (desktop only)
  // ============================
  const cursorGlow = document.getElementById('cursor-glow');
  if (window.matchMedia('(pointer: fine)').matches && cursorGlow) {
    let glowX = 0, glowY = 0, currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
      glowX = e.clientX;
      glowY = e.clientY;
      cursorGlow.classList.add('active');
    });

    function updateCursor() {
      currentX += (glowX - currentX) * 0.08;
      currentY += (glowY - currentY) * 0.08;
      cursorGlow.style.left = currentX + 'px';
      cursorGlow.style.top = currentY + 'px';
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });
  }

  // ============================
  // Navbar
  // ============================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }));

  // Hide/Show Navbar on scroll
  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (lastScrollY < currentY && currentY > 80) {
          navbar.classList.add('hidden');
        } else {
          navbar.classList.remove('hidden');
        }
        navbar.classList.toggle('scrolled', currentY > 50);
        lastScrollY = currentY;
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ============================
  // Hero Canvas - Network Nodes
  // ============================
  const canvas = document.getElementById('hero-bg');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let pulseWaves = [];
  const PARTICLE_COUNT = 90;
  const CONNECTION_DIST = 160;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.baseRadius = Math.random() * 1.8 + 0.5;
      this.radius = this.baseRadius;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.02;
      this.radius = this.baseRadius + Math.sin(this.pulse) * 0.3;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Dampen velocity
      this.vx *= 0.999;
      this.vy *= 0.999;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${0.4 + Math.sin(this.pulse) * 0.15})`;
      ctx.fill();

      // Tiny glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${0.02 + Math.sin(this.pulse) * 0.01})`;
      ctx.fill();
    }
  }

  class PulseWave {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.maxRadius = 200;
      this.opacity = 0.3;
    }

    update() {
      this.radius += 2.5;
      this.opacity = 0.3 * (1 - this.radius / this.maxRadius);
      return this.radius < this.maxRadius;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(34, 211, 238, ${this.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(PARTICLE_COUNT, Math.floor((width * height) / 12000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();

    // Update pulse waves
    pulseWaves = pulseWaves.filter(pw => {
      pw.draw();
      return pw.update();
    });

    requestAnimationFrame(animate);
  }

  initParticles();
  animate();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas();
      initParticles();
    }, 150);
  });

  // Mouse interaction
  let mouseX = -1000, mouseY = -1000;
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    particles.forEach(p => {
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (200 - dist) / 200;
        p.vx += dx * 0.0004 * force;
        p.vy += dy * 0.0004 * force;
      }
    });
  });

  // Click to emit pulse wave
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    pulseWaves.push(new PulseWave(e.clientX - rect.left, e.clientY - rect.top));
  });

  // ============================
  // Typewriter Effect
  // ============================
  const typewriterEl = document.querySelector('.typewriter-text');
  const phrases = [
    'Defending networks. Hunting threats.',
    'Blue Team | SOC Operations',
    'SIEM. Wazuh. Incident Response.',
    'Security is not a product, it\'s a process.'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      typewriterEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 2200);
        return;
      }
      setTimeout(typeLoop, 55);
    } else {
      typewriterEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 500);
        return;
      }
      setTimeout(typeLoop, 25);
    }
  }

  setTimeout(typeLoop, 1000);

  // ============================
  // Terminal Typing Effect
  // ============================
  const terminalCmd = document.getElementById('terminal-cmd');
  const terminalCommands = [
    'wazuh-agent status --check',
    'tail -f /var/log/alerts.json',
    'suricata --list-rules | grep CVE',
    'nmap -sV -O 192.168.1.0/24',
    'python3 honeypot.py --listen 8080'
  ];
  let cmdIndex = 0;
  let cmdCharIndex = 0;
  let cmdDeleting = false;

  function terminalType() {
    const cmd = terminalCommands[cmdIndex];

    if (!cmdDeleting) {
      terminalCmd.textContent = cmd.substring(0, cmdCharIndex + 1);
      cmdCharIndex++;
      if (cmdCharIndex === cmd.length) {
        cmdDeleting = true;
        setTimeout(terminalType, 3000);
        return;
      }
      setTimeout(terminalType, 45 + Math.random() * 40);
    } else {
      terminalCmd.textContent = cmd.substring(0, cmdCharIndex - 1);
      cmdCharIndex--;
      if (cmdCharIndex === 0) {
        cmdDeleting = false;
        cmdIndex = (cmdIndex + 1) % terminalCommands.length;
        setTimeout(terminalType, 600);
        return;
      }
      setTimeout(terminalType, 15);
    }
  }

  setTimeout(terminalType, 2000);

  // ============================
  // Magnetic Buttons
  // ============================
  const magneticEls = document.querySelectorAll('.magnetic');

  if (window.matchMedia('(pointer: fine)').matches) {
    magneticEls.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // ============================
  // Project Card Pointer Glow
  // ============================
  const tiltCards = document.querySelectorAll('.tilt-card');

  if (window.matchMedia('(pointer: fine)').matches) {
    tiltCards.forEach(card => {
      const glowEl = card.querySelector('.card-glow');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const mx = (x / rect.width) * 100;
        const my = (y / rect.height) * 100;

        card.style.setProperty('--mx', `${mx}%`);
        card.style.setProperty('--my', `${my}%`);

        // Move glow to mouse position
        if (glowEl) {
          glowEl.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(59, 130, 246, 0.12) 0%, transparent 62%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '50%');
        if (glowEl) {
          glowEl.style.background = '';
        }
      });
    });
  }

  // ============================
  // Glow Card Mouse Tracking
  // ============================
  const glowCards = document.querySelectorAll('.glow-card');

  if (window.matchMedia('(pointer: fine)').matches) {
    glowCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--glow-x', x + 'px');
        card.style.setProperty('--glow-y', y + 'px');
      });
    });
  }

  // ============================
  // Scroll Animations
  // ============================
  const animateTargets = document.querySelectorAll(
    '.about-grid, .about-highlights, .project-card, .skill-group, .cert-card, .contact-intro, #contact-form, .social-links'
  );

  animateTargets.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  animateTargets.forEach(el => observer.observe(el));

  // Animate skill bars
  const skillsSection = document.querySelector('.skills');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.dataset.level + '%';
            setTimeout(() => fill.classList.add('animated'), 1600);
          }, i * 120);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  if (skillsSection) skillObserver.observe(skillsSection);

  // Count-up animation for stats
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count, 10);
        let current = 0;
        const duration = 1200;
        const startTime = performance.now();

        function countUp(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.round(eased * target);
          entry.target.textContent = current;
          if (progress < 1) {
            requestAnimationFrame(countUp);
          }
        }

        requestAnimationFrame(countUp);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

  // ============================
  // Project Filtering
  // ============================
  const projectGridPanel = document.getElementById('project-grid-panel');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  function applyProjectFilter(filter) {
    projectCards.forEach((card, i) => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
        card.setAttribute('aria-hidden', 'false');
        card.style.transitionDelay = (i * 60) + 'ms';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.classList.remove('hide');
          });
        });
      } else {
        card.style.transitionDelay = '0ms';
        card.classList.add('hide');
        card.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
          if (card.classList.contains('hide')) {
            card.style.display = 'none';
          }
        }, 400);
      }
    });
  }

  function activateFilterTab(targetBtn, moveFocus = false) {
    filterBtns.forEach(btn => {
      const isActive = btn === targetBtn;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.tabIndex = isActive ? 0 : -1;
    });

    if (projectGridPanel) {
      projectGridPanel.setAttribute('aria-labelledby', targetBtn.id);
    }

    applyProjectFilter(targetBtn.dataset.filter);

    if (moveFocus) {
      targetBtn.focus();
    }
  }

  filterBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => activateFilterTab(btn));

    btn.addEventListener('keydown', (e) => {
      let targetIndex = index;

      if (e.key === 'ArrowRight') targetIndex = (index + 1) % filterBtns.length;
      if (e.key === 'ArrowLeft') targetIndex = (index - 1 + filterBtns.length) % filterBtns.length;
      if (e.key === 'Home') targetIndex = 0;
      if (e.key === 'End') targetIndex = filterBtns.length - 1;

      if (targetIndex !== index) {
        e.preventDefault();
        activateFilterTab(filterBtns[targetIndex], true);
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateFilterTab(btn);
      }
    });
  });

  // ============================
  // Active Nav on Scroll
  // ============================
  const sections = document.querySelectorAll('section');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  updateActiveNav();

  // ============================
  // Contact Form (EmailJS)
  // ============================
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const honeypot = this.querySelector('#website');
      if (honeypot && honeypot.value.trim() !== '') {
        showToast('Message sent successfully!', 'success');
        this.reset();
        return;
      }

      const now = Date.now();
      const lastSubmitAt = Number(localStorage.getItem(CONTACT_RATE_LIMIT_KEY) || 0);
      if (now - lastSubmitAt < CONTACT_RATE_LIMIT_MS) {
        showToast('Please wait a moment before sending another message.', 'error');
        return;
      }

      const messageField = this.querySelector('#message');
      if (messageField && messageField.value.trim().length < 20) {
        showToast('Please add a little more detail to your message.', 'error');
        messageField.focus();
        return;
      }

      if (!emailjsReady || !emailjsClient || typeof emailjsClient.sendForm !== 'function') {
        showToast('Contact service is temporarily unavailable. Please try later.', 'error');
        return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalContent = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        Sending...
      `;
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      emailjsClient.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
        .then(() => {
          localStorage.setItem(CONTACT_RATE_LIMIT_KEY, String(now));
          showToast('Message sent successfully!', 'success');
          contactForm.reset();
        })
        .catch(() => {
          showToast('Failed to send message. Please try again.', 'error');
        })
        .finally(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
        });
    });
  }

  function showToast(message, type) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // ============================
  // Scroll to Top
  // ============================
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
