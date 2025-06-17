// needs-list.js
document.addEventListener('DOMContentLoaded', function () {
    // Elementos
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortBy');
    const filterSelect = document.getElementById('filterService');
    const viewButtons = document.querySelectorAll('.view-btn');
    const needsContainer = document.getElementById('needsContainer');
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
    }

    // Pesquisa em tempo real
    let searchTimeout;
    searchInput.addEventListener('input', function () {
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
        btn.addEventListener('click', function () {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const view = this.dataset.view;
            if (view === 'grid') {
                needsContainer.classList.add('grid-view');
            } else {
                needsContainer.classList.remove('grid-view');
            }
        });
    });

    // Função de pesquisa
    function performSearch() {
        showLoading();

        // Simular delay de pesquisa
        setTimeout(() => {
            const searchTerm = searchInput.value.toLowerCase();
            const sortBy = sortSelect.value;
            const filterBy = filterSelect.value;

            // Aqui você faria a requisição real para o backend
            console.log('Pesquisando:', { searchTerm, sortBy, filterBy });

            // Simular resultados
            updateResultsCount();
            hideLoading();
        }, 500);
    }

    // Botões de contato
    document.querySelectorAll('.btn-contact-detailed').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.need-card-detailed');
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

            // Simular envio
            console.log('Contato enviado para:', name);
        });
    });

    // Paginação
    document.querySelectorAll('.page-link').forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.disabled) return;

            showLoading();

            // Simular carregamento de nova página
            setTimeout(() => {
                // Atualizar página ativa
                document.querySelectorAll('.page-item').forEach(item => {
                    item.classList.remove('active');
                });

                if (this.textContent.match(/\d/)) {
                    this.closest('.page-item').classList.add('active');
                }

                // Scroll para o topo
                window.scrollTo({ top: 0, behavior: 'smooth' });

                hideLoading();
            }, 800);
        });
    });

    // Funções auxiliares
    function showLoading() {
        loadingOverlay.classList.add('show');
    }

    function hideLoading() {
        loadingOverlay.classList.remove('show');
    }

    function updateResultsCount() {
        const total = Math.floor(Math.random() * 50) + 20;
        const showing = Math.min(10, total);
        resultsCount.textContent = `Mostrando ${showing} de ${total} pessoas`;
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
