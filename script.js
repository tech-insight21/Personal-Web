const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

function toggleMobileNav() {
    mobileNav.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
}

mobileMenuBtn.addEventListener('click', toggleMobileNav);
mobileNavOverlay.addEventListener('click', toggleMobileNav);

const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

function sendEmail(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const help = document.getElementById('help').value;
    const message = document.getElementById('message').value;

    const subject = `New Contact Form Submission from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AHow I can help: ${help}%0D%0AMessage: ${message}`;

    window.location.href = `mailto:temeselewbuta21@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        document.getElementById('contactForm').reset();
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('div.hover-scale');
    sections.forEach(section => {
        section.addEventListener('mouseover', () => {
            section.style.boxShadow = '0 0 15px #00d4ff';
        });
        section.addEventListener('mouseout', () => {
            section.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    const pageTransition = document.getElementById('pageTransition');
    const transitionText = document.getElementById('transitionText');
    const allSections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item a, .pro-btn');
    const navItems = document.querySelectorAll('.nav-item');
    const scrollProgress = document.getElementById('scrollProgress');

    allSections.forEach(section => {
        section.style.display = 'flex';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);

                const sectionNames = {
                    'home': 'Welcome Home',
                    'about': 'About Me',
                    'contact': 'Get In Touch',
                    'projects': 'My Projects',
                    'resume': 'My Resume'
                };

                transitionText.textContent = sectionNames[targetId] || 'Loading...';

                startPageTransition(() => {
                    scrollToSection(targetId);
                });
            }
        });
    });

    function startPageTransition(callback) {
        pageTransition.classList.add('active');

        setTimeout(() => {
            callback();

            setTimeout(() => {
                pageTransition.classList.remove('active');
            }, 600);
        }, 600);
    }

    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });

            updateActiveNav(sectionId);
        }
    }

    function updateActiveNav(sectionId) {
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link.getAttribute('href') === `#${sectionId}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        scrollProgress.style.width = scrollPercent + '%';

        updateActiveNavOnScroll();
    });

    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 100;

        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNav(sectionId);
            }
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    });

    let mouseX = 0;
    let mouseY = 0;
    const stars = [];
    const starCount = 15;

    const cursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }

        createStar(mouseX, mouseY);
    });

    function createStar(x, y) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 15 + 10;
        const tx = (Math.random() - 0.5) * 100;
        const ty = (Math.random() - 0.5) * 100;
        const txEnd = (Math.random() - 0.5) * 200;
        const tyEnd = (Math.random() - 0.5) * 200;

        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.fontSize = size + 'px';
        star.style.setProperty('--tx', tx + 'px');
        star.style.setProperty('--ty', ty + 'px');
        star.style.setProperty('--tx-end', txEnd + 'px');
        star.style.setProperty('--ty-end', tyEnd + 'px');

        document.body.appendChild(star);
        stars.push(star);

        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
            const index = stars.indexOf(star);
            if (index > -1) {
                stars.splice(index, 1);
            }
        }, 1500);

        if (stars.length > starCount) {
            const oldStar = stars.shift();
            if (oldStar && oldStar.parentNode) {
                oldStar.parentNode.removeChild(oldStar);
            }
        }
    }

    const slideUpElements = document.querySelectorAll('.slide-up');

    const slideUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    slideUpElements.forEach(element => {
        slideUpObserver.observe(element);
    });

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
            }
        });
    }, observerOptions);

    const skillSections = document.querySelectorAll('.glass-card, .skills-300-wrapper');
    skillSections.forEach(section => {
        observer.observe(section);
    });

    // Tech Stack Animation Synchronization
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const techIcons = entry.target.querySelectorAll('.tech-icon');
                techIcons.forEach(icon => {
                    icon.classList.add('active');
                });
            }
        });
    }, { threshold: 0.2 });

    const techContainer = document.querySelector('.tech-stack-container');
    if (techContainer) {
        techObserver.observe(techContainer);
    }

    const nameToType = "I'm Temeselew";
    const typingElement = document.getElementById('typing-name');
    let charIndex = 0;

    function typeName() {
        if (charIndex < nameToType.length) {
            typingElement.textContent += nameToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeName, 150); // Speed of typing
        } else {
            typingElement.classList.add('typing-finished');
        }
    }

    if (typingElement) {
        setTimeout(typeName, 500); // Start delay
    }

    // Dynamic 3D Tilt for Projects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;

            card.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(2000px) rotateX(2deg) rotateY(-15deg) translateY(0) scale(1)`;
        });
    });

    // Constant Scroller Logic
    const scrollToggle = document.getElementById('scrollToggle');
    if (scrollToggle) {
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 50) {
                scrollToggle.classList.add('up');
            } else {
                scrollToggle.classList.remove('up');
            }
        });

        scrollToggle.addEventListener('click', () => {
            if (scrollToggle.classList.contains('up')) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
            }
        });
    }

    if (window.innerWidth <= 768) {
        if (cursor) {
            cursor.style.display = 'none';
        }
        document.body.style.cursor = 'auto';
    }

    // Antigravity Animation for About Section
    const canvas = document.getElementById('aboutCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 80;
        const connectionDistance = 150;
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Mouse interaction
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= dx * force * 0.02;
                        this.y -= dy * force * 0.02;
                    }
                }
            }

            draw() {
                ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - (distance / connectionDistance);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    window.addEventListener('load', () => {
        const images = [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ];
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    });
});
