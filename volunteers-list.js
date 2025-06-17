// volunteers-list.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortBy');
    const filterSelect = document.getElementById('filterProfession');
    const viewButtons = document.querySelectorAll('.view-btn');
    const volunteersContainer = document.getElementById('volunteersContainer');
    const resultsCount = document.getElementById('resultsCount');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Navbar mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar nos links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Pesquisa em tempo real
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch();
        }, 300);
    });
    
    // Filtros e ordenação
    sortSelect.addEventListener('change', performSearch);
    filterSelect.addEventListener('change', performSearch);
    
    // Alternância de visualização
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            if (view === 'grid') {
                volunteersContainer.classList.add('grid-view');
            } else {
                volunteersContainer.classList.remove('grid-view');
            }
        });
    });
    
    // Função de pesquisa
    function performSearch() {
        showLoading();
        
        setTimeout(() => {
            const searchTerm = searchInput.value.toLowerCase();
            const sortBy = sortSelect.value;
            const filterBy = filterSelect.value;
            
            // Filtrar cards baseado na pesquisa
            filterCards(searchTerm, filterBy);
            
            // Ordenar cards
            sortCards(sortBy);
            
            // Atualizar contagem
            updateResultsCount();
            hideLoading();
        }, 500);
    }
    
    // Função para filtrar cards
    function filterCards(searchTerm, filterBy) {
        const cards = document.querySelectorAll('.volunteer-card-detailed');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const profession = card.querySelector('.profession').textContent.toLowerCase();
            const specialties = Array.from(card.querySelectorAll('.specialty-tag'))
                .map(tag => tag.textContent.toLowerCase()).join(' ');
            
            const matchesSearch = searchTerm === '' || 
                name.includes(searchTerm) || 
                profession.includes(searchTerm) || 
                specialties.includes(searchTerm);
            
            const matchesFilter = filterBy === 'all' || 
                (filterBy === 'health' && (profession.includes('médico') || profession.includes('psicólog'))) ||
                (filterBy === 'education' && profession.includes('professor')) ||
                (filterBy === 'technical' && profession.includes('eletricista')) ||
                (filterBy === 'beauty' && profession.includes('cabeleireiro')) ||
                (filterBy === 'support' && profession.includes('informática'));
            
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        return visibleCount;
    }
    
    // Função para ordenar cards
    function sortCards(sortBy) {
        const container = volunteersContainer;
        const cards = Array.from(container.querySelectorAll('.volunteer-card-detailed'));
        
        cards.sort((a, b) => {
            switch(sortBy) {
                case 'distance':
                    const distA = parseFloat(a.querySelector('.distance-badge').textContent.replace(/[^\d.]/g, ''));
                    const distB = parseFloat(b.querySelector('.distance-badge').textContent.replace(/[^\d.]/g, ''));
                    return distA - distB;
                    
                case 'rating':
                    const ratingA = parseFloat(a.querySelector('.rating-number').textContent);
                    const ratingB = parseFloat(b.querySelector('.rating-number').textContent);
                    return ratingB - ratingA;
                    
                case 'alphabetical':
                    const nameA = a.querySelector('h3').textContent;
                    const nameB = b.querySelector('h3').textContent;
                    return nameA.localeCompare(nameB);
                    
                default:
                    return 0;
            }
        });
        
        // Reordenar no DOM
        cards.forEach(card => container.appendChild(card));
    }
    
    // Botões de contato
    document.querySelectorAll('.btn-contact-detailed').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.volunteer-card-detailed');
            const name = card.querySelector('h3').textContent;
            
            // Feedback visual
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Contato Enviado!';
            this.style.background = 'var(--success-color)';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = 'var(--gradient-primary)';
                this.disabled = false;
            }, 3000);
            
            console.log('Contato enviado para:', name);
        });
    });
    
    // Paginação
    document.querySelectorAll('.page-link').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;
            
            showLoading();
            
            setTimeout(() => {
                document.querySelectorAll('.page-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                if (this.textContent.match(/\d/)) {
                    this.closest('.page-item').classList.add('active');
                }
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
                hideLoading();
            }, 800);
        });
    });
    
    // Funções auxiliares
    function showLoading() {
        if (loadingOverlay) {
            loadingOverlay.classList.add('show');
        }
    }
    
    function hideLoading() {
        if (loadingOverlay) {
            loadingOverlay.classList.remove('show');
        }
    }
    
    function updateResultsCount() {
        const visibleCards = document.querySelectorAll('.volunteer-card-detailed[style*="block"], .volunteer-card-detailed:not([style*="none"])').length;
        const total = document.querySelectorAll('.volunteer-card-detailed').length;
        if (resultsCount) {
            resultsCount.textContent = `Mostrando ${visibleCards} de ${total} profissionais`;
        }
    }
    
    // Scroll suave para links
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
    
    // Inicialização
    updateResultsCount();
});
