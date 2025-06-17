// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Initialize Interactive Map
function initializeMap() {
    // Coordenadas de Presidente Prudente
    const map = L.map('interactive-map').setView([-22.1256, -51.3895], 13);

    // Adicionar tiles do mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Dados fictícios de pessoas que precisam de ajuda
    const needsData = [
        {
            name: 'Maria Silva',
            service: 'Aulas de Reforço',
            lat: -22.1200,
            lng: -51.3850,
            urgency: 'urgent'
        },
        {
            name: 'João Santos',
            service: 'Reparo Elétrico',
            lat: -22.1300,
            lng: -51.3900,
            urgency: 'normal'
        },
        {
            name: 'Ana Costa',
            service: 'Apoio Psicológico',
            lat: -22.1150,
            lng: -51.3820,
            urgency: 'urgent'
        },
        {
            name: 'Pedro Lima',
            service: 'Consulta Médica',
            lat: -22.1280,
            lng: -51.3950,
            urgency: 'normal'
        },
        {
            name: 'Clara Oliveira',
            service: 'Aulas de Inglês',
            lat: -22.1180,
            lng: -51.3880,
            urgency: 'normal'
        }
    ];

    // Adicionar marcadores ao mapa
    needsData.forEach(person => {
        const icon = L.divIcon({
            className: `custom-marker ${person.urgency}`,
            html: `<div class="marker-content">
                     <i class="fas fa-map-marker-alt"></i>
                   </div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        });

        const marker = L.marker([person.lat, person.lng], { icon })
            .addTo(map)
            .bindPopup(`
                <div class="marker-popup">
                    <h4>${person.name}</h4>
                    <p><strong>Serviço:</strong> ${person.service}</p>
                    <p><strong>Urgência:</strong> ${person.urgency === 'urgent' ? 'Urgente' : 'Normal'}</p>
                    <button class="popup-btn">Entrar em Contato</button>
                </div>
            `);
    });

    // Adicionar estilos CSS para os marcadores
    const style = document.createElement('style');
    style.textContent = `
        .custom-marker {
            background: none;
            border: none;
        }
        
        .marker-content {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        .marker-content i {
            transform: rotate(45deg);
            color: white;
            font-size: 16px;
        }
        
        .urgent .marker-content {
            background: #ef4444;
        }
        
        .normal .marker-content {
            background: #10b981;
        }
        
        .marker-popup {
            text-align: center;
            min-width: 200px;
        }
        
        .marker-popup h4 {
            margin-bottom: 0.5rem;
            color: #1e293b;
        }
        
        .marker-popup p {
            margin-bottom: 0.25rem;
            font-size: 0.9rem;
        }
        
        .popup-btn {
            background: #6366f1;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 0.5rem;
            font-weight: 500;
        }
        
        .popup-btn:hover {
            background: #5855eb;
        }
    `;
    document.head.appendChild(style);
}

// Intersection Observer for animations
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

// Observe all cards for animation
document.querySelectorAll('.helper-card, .need-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Contact button functionality
document.querySelectorAll('.btn-contact').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.need-card');
        const name = card.querySelector('h3').textContent;
        
        // Simulate contact action
        this.innerHTML = '<i class="fas fa-check"></i> Contato Enviado!';
        this.style.background = 'var(--success-color)';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-message"></i> Entrar em Contato';
            this.style.background = 'var(--gradient-primary)';
            this.disabled = false;
        }, 3000);
    });
});

// Hero buttons functionality
document.querySelector('.btn-primary').addEventListener('click', () => {
    window.location.href= "/precisa.html"
});

document.querySelector('.btn-secondary').addEventListener('click', () => {
    window.location.href= "/voluntarios.html"
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    // Initialize map after page load
    initializeMap();
});

// Initialize
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Funcionalidade da seção de pesquisa
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    
    // Submissão do formulário de pesquisa
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            // Simular pesquisa
            searchInput.value = '';
            showSearchFeedback('Buscando por: ' + searchTerm);
            
            // Aqui você redirecionaria para a página de resultados
            setTimeout(() => {
                alert(`Redirecionando para resultados de: "${searchTerm}"`);
            }, 1000);
        }
    });
    
    // Clique nas sugestões
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const suggestion = this.textContent;
            searchInput.value = suggestion;
            searchInput.focus();
            
            // Trigger do efeito visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Feedback visual da pesquisa
    function showSearchFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'search-feedback';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 600;
            animation: feedbackSlide 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }
    
    // Animação para o feedback
    const style = document.createElement('style');
    style.textContent = `
        @keyframes feedbackSlide {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Auto-complete simples (opcional)
    const suggestions = [
        'Aulas de reforço',
        'Consulta médica',
        'Reparo elétrico',
        'Apoio psicológico',
        'Aulas de inglês',
        'Fisioterapia',
        'Corte de cabelo',
        'Jardinagem',
        'Pintura residencial',
        'Aulas de música'
    ];
    
    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        if (value.length > 2) {
            const matches = suggestions.filter(s => 
                s.toLowerCase().includes(value)
            );
            // Aqui você pode implementar um dropdown de sugestões
            console.log('Sugestões:', matches);
        }
    });
});

// Função para mostrar erro fatal
function showFatalError() {
    const errorModal = document.getElementById('fatalError');
    errorModal.classList.add('show');
}

// Função para fechar erro fatal
function closeFatalError() {
    const errorModal = document.getElementById('fatalError');
    errorModal.classList.remove('show');
}

// Exemplo de uso do erro fatal (pode ser chamado em caso de erro crítico)
// showFatalError();

// Fechar modal clicando fora do conteúdo
document.getElementById('fatalError').addEventListener('click', function(e) {
    if (e.target === this) {
        closeFatalError();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeFatalError();
    }
});












// Carrossel de Patrocinadores
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('sponsorsCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carousel) return;
    
    let currentSlide = 0;
    const slides = carousel.children;
    const totalSlides = slides.length;
    const slidesPerView = getSlidesPerView();
    const maxSlide = Math.max(0, totalSlides - slidesPerView);
    
    // Função para determinar quantos slides mostrar por vez
    function getSlidesPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1024) return 3;
        return 4;
    }
    
    // Função para atualizar a posição do carrossel
    function updateCarousel() {
        const slideWidth = 100 / slidesPerView;
        const translateX = -(currentSlide * slideWidth);
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === Math.floor(currentSlide / slidesPerView));
        });
        
        // Atualizar estado dos botões
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }
    
    // Event listeners para os botões
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners para os indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index * slidesPerView;
            if (currentSlide > maxSlide) currentSlide = maxSlide;
            updateCarousel();
        });
    });
    
    // Auto-play (opcional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentSlide >= maxSlide) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }
            updateCarousel();
        }, 4000); // Muda a cada 4 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Iniciar auto-play
    startAutoPlay();
    
    // Pausar auto-play ao passar o mouse
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Atualizar carrossel no redimensionamento da janela
    window.addEventListener('resize', () => {
        const newSlidesPerView = getSlidesPerView();
        if (newSlidesPerView !== slidesPerView) {
            location.reload(); // Recarregar para recalcular
        }
    });
    
    // Suporte a touch/swipe para mobile
    let startX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Mínimo de 50px para considerar swipe
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isDragging = false;
        startAutoPlay();
    });
    
    // Inicializar carrossel
    updateCarousel();
});
