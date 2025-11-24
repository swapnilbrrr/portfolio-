document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    (function(){
        emailjs.init("tSnZoTCJJafY5EOj5"); // Replace with your EmailJS public key
    })();

    // Navbar
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Hide/Show Navbar on scroll
    let prevScroll = window.pageYOffset;
    window.onscroll = function() {
        let currentScroll = window.pageYOffset;
        if (prevScroll > currentScroll) {
            navbar.style.top = "0";
        } else {
            navbar.style.top = "-80px";
        }
        prevScroll = currentScroll;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    };

    // Hero background animation
    const canvas = document.getElementById("hero-bg");
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    let mouse = { x: width / 2, y: height / 2 };

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 1.5 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = 'rgba(88, 166, 255, 0.6)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.02;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle(Math.random() * width, Math.random() * height));
        }
    }

    function handleParticles() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(88, 166, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.2;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            if (particles[i].size <= 0.3) {
                particles.splice(i, 1);
                i--;
                particles.push(new Particle(Math.random() * width, Math.random() * height));
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        handleParticles();
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(mouse.x, mouse.y));
        }
    });

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        initParticles();
    });

    // Typewriter effect
    const subtitle = document.querySelector('.hero-content p');
    const text = subtitle.textContent.replace(subtitle.querySelector('.cursor').textContent, '').trim();
    subtitle.innerHTML = `<span class="typewriter-text"></span><span class="cursor"></span>`;
    const typewriterText = document.querySelector('.typewriter-text');
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 70);
        }
    }
    setTimeout(typeWriter, 1000);

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    // Animate skill bars
                    if (entry.target.classList.contains('skills')) {
                        const skillLevels = entry.target.querySelectorAll('.skill-level');
                        skillLevels.forEach(skill => {
                            skill.style.width = skill.getAttribute('data-level') + '%';
                        });
                    }
                }, index * 100); // Staggered delay
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                item.classList.add('hide');
                setTimeout(() => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hide');
                    }
                }, 10);
            });
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 75) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }
    updateActiveNav();

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const serviceID = 'service_z9yhmjg'; // Replace with your EmailJS service ID
        const templateID = 'template_57voene'; // Replace with your EmailJS template ID

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                showToast('Message sent successfully!', 'success');
                contactForm.reset();
            }, (err) => {
                showToast('Failed to send message. Please try again.', 'error');
                console.log(JSON.stringify(err));
            });
    });

    function showToast(message, type) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 5000);
    }
});
