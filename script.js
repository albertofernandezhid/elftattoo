// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.style.background = window.scrollY > 100
            ? 'rgba(0, 0, 0, 0.98)'
            : 'rgba(0, 0, 0, 0.95)';
    }
});

// Contact form submission (with WhatsApp redirection)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        const nombre = data.nombre?.trim();
        const email = data.email?.trim();
        const telefono = data.telefono?.trim();
        const mensaje = data.mensaje?.trim();

        if (!nombre || !email || !mensaje) {
            alert('Por favor completa todos los campos obligatorios.');
            return;
        }

        const numeroWhatsApp = '34XXXXXXXXX'; // Cambia por tu número real

        const texto = `Hola, soy ${nombre}.\n\nMi email es: ${email}\nTeléfono: ${telefono || 'No proporcionado'}\n\nQuisiera hacerme un tatuaje con esta idea:\n${mensaje}`;
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

        // Mostrar mensaje visual si quieres (usa un <div id="mensaje-exito"> en HTML si deseas animación)
        alert('¡Gracias por tu consulta! Se abrirá WhatsApp para continuar. 🎨✨');

        this.reset();
        window.open(url, '_blank');
    });
}

// Gallery item click animation
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        item.style.transition = 'transform 0.15s ease';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1.05)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        }, 150);
    });
});

// Intersection Observer for reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Prepare elements for animation and observe them
document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Loading screen removal
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
