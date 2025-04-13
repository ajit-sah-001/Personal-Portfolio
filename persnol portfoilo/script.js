
// Matrix rain effect
const matrix = document.querySelector('.hero__matrix');
const charCount = window.innerWidth < 400 ? 20 : window.innerWidth < 600 ? 30 : 40;
for (let i = 0; i < charCount; i++) {
    const char = document.createElement('span');
    char.className = 'hero__matrix-char';
    char.textContent = String.fromCharCode(33 + Math.random() * 94);
    char.style = `--x: ${Math.random() * 100}; --i: ${Math.random() * 1.2};`;
    matrix.appendChild(char);
}

// Typed.js
new Typed('.hero__subtitle', {
    strings: ['Cybersecurity Expert', 'Full-Stack Developer', 'System Programmer'],
    typeSpeed: 35,
    backSpeed: 20,
    backDelay: 1200,
    loop: true,
    startDelay: 300
});

// Title letter delays
document.querySelectorAll('.hero__title span').forEach((span, i) => {
    span.style.animationDelay = `${i * 0.08}s`;
});

// Mobile menu toggle
const toggler = document.querySelector('.navbar__toggler');
const menu = document.querySelector('.navbar__menu');
toggler.addEventListener('click', () => {
    menu.classList.toggle('navbar__menu--open');
    toggler.setAttribute('aria-expanded', menu.classList.contains('navbar__menu--open'));
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        menu.classList.remove('navbar__menu--open');
        toggler.setAttribute('aria-expanded', 'false');
    });
});

// Intersection Observer for animations and active link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar__link');
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.animate-on-scroll').forEach(el => {
                    el.classList.add('visible');
                });

                // Active link
                const current = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === current) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },
    { threshold: 0.2 }
);

sections.forEach(section => observer.observe(section));

// Project filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            card.classList.toggle('hidden', filter !== 'all' && card.getAttribute('data-category') !== filter);
            if (!card.classList.contains('hidden')) {
                card.classList.remove('visible');
                setTimeout(() => card.classList.add('visible'), 50);
            }
        });
    });
});

// Modal handling
document.querySelectorAll('.project-card button').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.parentElement.parentElement.getAttribute('data-modal');
        document.getElementById(modalId).classList.add('modal--open');
    });
});

document.querySelectorAll('.modal__close').forEach(close => {
    close.addEventListener('click', () => {
        close.closest('.modal').classList.remove('modal--open');
    });
});

document.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('modal--open');
    }
});

// Contact form
document.querySelector('.contact__form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Thank you, ${name}! Your message has been sent securely.`);
    e.target.reset();
});

// Initialize skills progress
document.querySelectorAll('.progress__bar').forEach(bar => {
    const width = bar.style.getPropertyValue('--progress-width');
    if (width) {
        bar.style.width = width;
        bar.classList.add('visible');
    }
});
