// Navegación responsiva y scroll
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    // Toggle menú móvil
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animación hamburger
        hamburger.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en enlaces
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Cambio de estilo navbar en scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animaciones al hacer scroll
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

// Aplicar animación a elementos
document.querySelectorAll('.style-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Simulador de feed de Instagram (placeholder)
function loadInstagramFeed() {
    const instagramFeed = document.getElementById('instagram-feed');
    const placeholder = document.querySelector('.instagram-placeholder');
    
    // Simular carga de posts
    setTimeout(() => {
        if (placeholder) {
            placeholder.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fab fa-instagram" style="font-size: 3rem; color: var(--primary-red); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--white); margin-bottom: 1rem;">Próximamente</h3>
                    <p style="color: var(--gray-light);">Integración con Instagram API en desarrollo</p>
                    <p style="color: var(--gray-light); margin-top: 1rem;">Mientras tanto, visita mi perfil:</p>
                    <a href="https://www.instagram.com/elf.f_tattoo/" target="_blank" class="btn btn-instagram" style="margin-top: 1rem; display: inline-flex;">
                        <i class="fab fa-instagram"></i>
                        @elf.f_tattoo
                    </a>
                </div>
            `;
        }
    }, 1500);
}

// Función real para Instagram API (requiere token de acceso)
async function loadRealInstagramFeed() {
    try {
        // Nota: Para usar en producción necesitarás un token de acceso de Instagram
        // const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_TOKEN}`);
        // const data = await response.json();
        
        // Por ahora usamos datos de ejemplo
        const examplePosts = [
            {
                id: '1',
                media_url: 'https://via.placeholder.com/400x400/dc2626/ffffff?text=Black+Work',
                caption: 'Nuevo diseño en Black Work 🖤',
                permalink: 'https://www.instagram.com/elf.f_tattoo/'
            },
            {
                id: '2',
                media_url: 'https://via.placeholder.com/400x400/991b1b/ffffff?text=Japonés',
                caption: 'Estilo japonés tradicional 🐉',
                permalink: 'https://www.instagram.com/elf.f_tattoo/'
            },
            {
                id: '3',
                media_url: 'https://via.placeholder.com/400x400/dc2626/ffffff?text=Anime',
                caption: 'Personaje anime terminado! ⚡',
                permalink: 'https://www.instagram.com/elf.f_tattoo/'
            }
        ];
        
        const instagramFeed = document.getElementById('instagram-feed');
        instagramFeed.innerHTML = examplePosts.map(post => `
            <div class="instagram-post" style="background: var(--gray-dark); border-radius: 15px; overflow: hidden; transition: transform 0.3s ease;">
                <img src="${post.media_url}" alt="Instagram post" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 1rem;">
                    <p style="color: var(--white); font-size: 0.9rem;">${post.caption}</p>
                    <a href="${post.permalink}" target="_blank" style="color: var(--primary-red); text-decoration: none; font-size: 0.8rem;">Ver en Instagram →</a>
                </div>
            </div>
        `).join('');
        
        // Añadir efecto hover a los posts
        document.querySelectorAll('.instagram-post').forEach(post => {
            post.addEventListener('mouseenter', () => {
                post.style.transform = 'scale(1.05)';
            });
            post.addEventListener('mouseleave', () => {
                post.style.transform = 'scale(1)';
            });
        });
        
    } catch (error) {
        console.log('Error loading Instagram feed:', error);
        loadInstagramFeed(); // Fallback al placeholder
    }
}

// Formulario de contacto con WhatsApp
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const style = formData.get('style');
    const message = formData.get('message');
    
    // Validación básica
    if (!name || !email || !style || !message) {
        showNotification('Por favor, completa todos los campos obligatorios', 'error');
        return;
    }
    
    // Crear mensaje para WhatsApp
    const whatsappMessage = `
🎨 *NUEVA CONSULTA - ELF TATTOO*

👤 *Nombre:* ${name}
📧 *Email:* ${email}
${phone ? `📱 *Teléfono:* ${phone}` : ''}
🎯 *Estilo:* ${getStyleName(style)}

💬 *Mensaje:*
${message}

---
Enviado desde la web ELF TATTOO
    `.trim();
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/34615972352?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Mostrar confirmación
    showNotification('Redirigiendo a WhatsApp...', 'success');
    
    // Limpiar formulario
    this.reset();
});

// Función auxiliar para nombres de estilos
function getStyleName(style) {
    const styles = {
        'blackwork': 'Black Work',
        'japones': 'Japonés',
        'anime': 'Anime',
        'consulta': 'Consulta General'
    };
    return styles[style] || style;
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Efectos de parallax suave
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Contador animado para estadísticas
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', ''));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    });
}

// Observador para animar contadores cuando están visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Preloader simple
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    loadInstagramFeed(); // Cargar feed de Instagram
});

// Lazy loading para imágenes
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Función para copiar texto al clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copiado al portapapeles', 'success');
    }).catch(() => {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Copiado al portapapeles', 'success');
    });
}

// Agregar funcionalidad de copiar al número de teléfono
document.addEventListener('DOMContentLoaded', () => {
    const phoneElement = document.querySelector('.contact-item p');
    if (phoneElement && phoneElement.textContent.includes('+34')) {
        phoneElement.style.cursor = 'pointer';
        phoneElement.title = 'Click para copiar';
        phoneElement.addEventListener('click', () => {
            copyToClipboard(phoneElement.textContent.trim());
        });
    }
});

// Smooth reveal para elementos
const revealElements = document.querySelectorAll('.style-card, .about-content, .contact-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

console.log('🎨 ELF TATTOO Website loaded successfully!');
