// VitraOne - Catálogo Digital Elegante
// JavaScript para funcionalidades do catálogo

class VitraOneCatalog {
    constructor() {
        this.products = [];
        this.cart = [];
        this.currentCategory = 'all';
        this.currentFilter = 'all';
        this.currentSort = 'name';
        this.currentView = 'grid';
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.loadSampleProducts();
        this.setupEventListeners();
        this.setupScrollEffects();
        this.renderProducts();
    }

    setupEventListeners() {
        // Busca
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            // Usar debounce para melhor performance
            let searchTimeout;
            const debouncedSearch = (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => this.handleSearch(e), 300);
            };
            searchInput.addEventListener('input', debouncedSearch);
        }

        // Busca mobile
        const mobileSearchInput = document.getElementById('mobile-search-input');
        if (mobileSearchInput) {
            let mobileSearchTimeout;
            const debouncedMobileSearch = (e) => {
                clearTimeout(mobileSearchTimeout);
                mobileSearchTimeout = setTimeout(() => this.handleSearch(e), 300);
            };
            mobileSearchInput.addEventListener('input', debouncedMobileSearch);
        }

        // Menu mobile
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => this.closeMobileMenu());
        }

        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', () => this.closeMobileMenu());
        }

        // Filtros de categoria
        document.querySelectorAll('[data-category]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategoryFilter(e));
        });

        // Filtros de produto
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleProductFilter(e));
        });

        // Ordenação
        const sortSelect = document.querySelector('.sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => this.handleSort(e));
        }

        // Ordenação mobile
        const mobileSortSelect = document.querySelector('.mobile-sort-select');
        if (mobileSortSelect) {
            mobileSortSelect.addEventListener('change', (e) => this.handleSort(e));
        }

        // Sidebar desktop
        const navFilterBtn = document.getElementById('sidebar-open-btn');
        const desktopSidebar = document.getElementById('desktop-sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');

        if (navFilterBtn) {
            navFilterBtn.addEventListener('click', () => this.toggleDesktopSidebar());
        }

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.closeDesktopSidebar());
        }

        // Ordenação sidebar desktop
        const sidebarSortSelect = document.querySelector('.sidebar-sort-select');
        if (sidebarSortSelect) {
            sidebarSortSelect.addEventListener('change', (e) => this.handleSort(e));
        }

        // Visualização
        document.querySelectorAll('[data-view]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleViewChange(e));
        });

        // Carrinho
        const cartBtn = document.querySelector('.btn-cart');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.toggleCart());
        }

        const cartClose = document.querySelector('.cart-close');
        if (cartClose) {
            cartClose.addEventListener('click', () => this.toggleCart());
        }

        // Modal de produto
        document.addEventListener('click', (e) => {
            if (e.target.closest('.product-card')) {
                const productId = e.target.closest('.product-card').dataset.productId;
                if (productId) this.openProductModal(productId);
            }
        });

        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeProductModal());
        }

        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => this.closeProductModal());
        }

        // Ações do produto
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-add-cart') || e.target.closest('.btn-add-cart')) {
                e.stopPropagation();
                const productId = e.target.closest('.product-card, .modal-content').dataset.productId;
                if (productId) this.addToCart(productId);
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-favorite') || e.target.closest('.btn-favorite')) {
                e.stopPropagation();
                const productId = e.target.closest('.product-card, .modal-content').dataset.productId;
                if (productId) this.toggleFavorite(productId);
            }
        });

        // Controles de quantidade
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('qty-btn')) {
                const input = e.target.parentElement.querySelector('.qty-input');
                if (e.target.classList.contains('plus')) {
                    input.value = parseInt(input.value) + 1;
                } else if (e.target.classList.contains('minus') && input.value > 1) {
                    input.value = parseInt(input.value) - 1;
                }
            }
        });
    }

    setupScrollEffects() {
        // Header transparente no scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });

        // Animações de entrada
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        const animateElements = document.querySelectorAll('.product-card');
        animateElements.forEach(el => observer.observe(el));
    }

    loadSampleProducts() {
        this.products = [
            {
                id: 1,
                name: 'Relógio Premium Dourado',
                price: 1299.90,
                originalPrice: 1599.90,
                category: 'luxo',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Relógio de luxo com acabamento em ouro 18k, movimento automático suíço e pulseira de couro italiano.',
                featured: true,
                new: false,
                sale: true,
                specs: {
                    'Material': 'Ouro 18k',
                    'Movimento': 'Automático Suíço',
                    'Pulseira': 'Couro Italiano',
                    'Garantia': '2 anos'
                }
            },
            {
                id: 2,
                name: 'Sofá Moderno Cinza',
                price: 2599.90,
                category: 'decoracao',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Sofá contemporâneo de 3 lugares, revestido em tecido premium com estrutura em madeira maciça.',
                featured: false,
                new: true,
                sale: false,
                specs: {
                    'Dimensões': '200x90x85 cm',
                    'Material': 'Tecido Premium',
                    'Estrutura': 'Madeira Maciça',
                    'Garantia': '1 ano'
                }
            },
            {
                id: 3,
                name: 'Vestido Elegante Preto',
                price: 899.90,
                originalPrice: 1199.90,
                category: 'moda',
                image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Vestido longo para ocasiões especiais, confeccionado em seda italiana com acabamentos em renda.',
                featured: false,
                new: false,
                sale: true,
                specs: {
                    'Material': 'Seda Italiana',
                    'Tamanhos': 'P, M, G, GG',
                    'Cuidados': 'Lavagem a seco',
                    'Origem': 'Itália'
                }
            },
            {
                id: 4,
                name: 'Notebook Pro 16"',
                price: 4599.90,
                category: 'tecnologia',
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Notebook de alta performance com processador Intel i7, 16GB RAM e placa de vídeo dedicada.',
                featured: true,
                new: true,
                sale: false,
                specs: {
                    'Processador': 'Intel i7 12ª geração',
                    'RAM': '16GB DDR4',
                    'Armazenamento': '512GB SSD',
                    'Tela': '16" 4K'
                }
            },
            {
                id: 5,
                name: 'Mesa de Jantar Rústica',
                price: 1899.90,
                originalPrice: 2299.90,
                category: 'decoracao',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Mesa de jantar para 6 pessoas em madeira maciça de carvalho, acabamento rústico envelhecido.',
                featured: false,
                new: false,
                sale: true,
                specs: {
                    'Material': 'Carvalho Maciço',
                    'Capacidade': '6 pessoas',
                    'Dimensões': '180x90x75 cm',
                    'Acabamento': 'Rústico Envelhecido'
                }
            },
            {
                id: 6,
                name: 'Smartphone Premium',
                price: 3299.90,
                category: 'tecnologia',
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Smartphone flagship com câmera tripla de 108MP, tela AMOLED 6.7" e carregamento sem fio.',
                featured: true,
                new: false,
                sale: false,
                specs: {
                    'Tela': '6.7" AMOLED',
                    'Câmera': '108MP Tripla',
                    'Processador': 'Snapdragon 8 Gen 2',
                    'Bateria': '5000mAh'
                }
            },
            {
                id: 7,
                name: 'Anel de Diamante',
                price: 4599.90,
                category: 'luxo',
                image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Anel de noivado com diamante de 1 quilate, engastado em ouro branco 18k.',
                featured: true,
                new: true,
                sale: false,
                specs: {
                    'Pedra': 'Diamante 1ct',
                    'Metal': 'Ouro Branco 18k',
                    'Certificado': 'GIA',
                    'Garantia': 'Vitalícia'
                }
            },
            {
                id: 8,
                name: 'Jaqueta de Couro',
                price: 1299.90,
                category: 'moda',
                image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Jaqueta de couro legítimo, estilo motociclista, com forro interno em algodão.',
                featured: false,
                new: true,
                sale: false,
                specs: {
                    'Material': 'Couro Legítimo',
                    'Tamanhos': 'P, M, G, GG',
                    'Forro': 'Algodão',
                    'Origem': 'Brasil'
                }
            },
            {
                id: 9,
                name: 'Câmera Profissional',
                price: 3899.90,
                category: 'tecnologia',
                image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Câmera DSLR profissional com sensor full-frame e lente 24-70mm f/2.8.',
                featured: true,
                new: false,
                sale: false,
                specs: {
                    'Sensor': 'Full-Frame 24MP',
                    'Lente': '24-70mm f/2.8',
                    'ISO': '100-51200',
                    'Gravação': '4K 60fps'
                }
            },
            {
                id: 10,
                name: 'Bolsa de Luxo',
                price: 1899.90,
                originalPrice: 2299.90,
                category: 'luxo',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Bolsa de couro legítimo italiano, acabamento artesanal e hardware dourado.',
                featured: false,
                new: true,
                sale: true,
                specs: {
                    'Material': 'Couro Italiano',
                    'Acabamento': 'Artesanal',
                    'Hardware': 'Dourado',
                    'Origem': 'Itália'
                }
            },
            {
                id: 11,
                name: 'Luminária Moderna',
                price: 799.90,
                category: 'decoracao',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Luminária de mesa com design minimalista, base em mármore e abajur em tecido premium.',
                featured: false,
                new: true,
                sale: false,
                specs: {
                    'Base': 'Mármore Natural',
                    'Abajur': 'Tecido Premium',
                    'Lâmpada': 'LED 9W',
                    'Dimensões': '40x25x60 cm'
                }
            },
            {
                id: 12,
                name: 'Tênis Esportivo',
                price: 599.90,
                category: 'moda',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
                description: 'Tênis de corrida com tecnologia de amortecimento e design aerodinâmico.',
                featured: false,
                new: true,
                sale: false,
                specs: {
                    'Tecnologia': 'Amortecimento Air',
                    'Sola': 'Borracha Antiderrapante',
                    'Tamanhos': '36-45',
                    'Peso': '280g'
                }
            }
        ];
    }

    getFilteredProducts() {
        let filtered = this.products;

        // Filtro por categoria
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(product => product.category === this.currentCategory);
        }

        // Filtro por tipo
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(product => product[this.currentFilter]);
        }

        // Filtro por busca
        if (this.searchTerm) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }

        // Ordenação
        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'newest':
                    return b.new - a.new;
                default:
                    return 0;
            }
        });

        return filtered;
    }

    renderProducts() {
        const productsGrid = document.getElementById('products-grid');
        const productsCount = document.getElementById('products-count');
        
        if (!productsGrid) return;

        const filteredProducts = this.getFilteredProducts();
        
        // Atualizar contador
        if (productsCount) {
            productsCount.textContent = filteredProducts.length;
        }

        // Renderizar produtos
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card ${this.currentView === 'list' ? 'list-view' : ''}" 
                 data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-badges">
                        ${product.new ? '<div class="product-badge badge-new">Novo</div>' : ''}
                        ${product.sale ? '<div class="product-badge badge-sale">Promoção</div>' : ''}
                        ${product.featured ? '<div class="product-badge badge-featured">Destaque</div>' : ''}
                    </div>
                    <div class="product-actions-overlay">
                        <button class="quick-action-btn" title="Visualizar">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="quick-action-btn" title="Favoritar">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="quick-action-btn" title="Adicionar ao Carrinho">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${this.getCategoryName(product.category)}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price-container">
                        <span class="current-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                        ${product.originalPrice ? `<span class="original-price">R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                        ${product.originalPrice ? `<span class="discount-badge">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary btn-add-cart">
                            <i class="fas fa-shopping-cart"></i> Adicionar
                        </button>
                        <button class="btn-favorite">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Aplicar classe de visualização
        productsGrid.className = `products-grid ${this.currentView === 'list' ? 'list-view' : ''}`;
    }

    getCategoryName(category) {
        const categories = {
            'luxo': 'Luxo',
            'decoracao': 'Decoração',
            'moda': 'Moda',
            'tecnologia': 'Tecnologia'
        };
        return categories[category] || category;
    }

    handleSearch(e) {
        this.searchTerm = e.target.value;
        this.renderProducts();
    }

    handleCategoryFilter(e) {
        // Atualizar botões ativos (desktop, mobile e sidebar)
        document.querySelectorAll('[data-category]').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        this.currentCategory = e.target.dataset.category;
        this.renderProducts();
        
        // Fechar menu mobile após seleção
        this.closeMobileMenu();
    }

    handleProductFilter(e) {
        // Atualizar botões ativos (desktop, mobile e sidebar)
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        this.currentFilter = e.target.dataset.filter;
        this.renderProducts();
        
        // Fechar menu mobile após seleção
        this.closeMobileMenu();
    }

    handleSort(e) {
        this.currentSort = e.target.value;
        this.renderProducts();
    }

    handleViewChange(e) {
        // Atualizar botões ativos (desktop, mobile e sidebar)
        document.querySelectorAll('[data-view]').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        this.currentView = e.target.dataset.view;
        this.renderProducts();
        
        // Fechar menu mobile após seleção
        this.closeMobileMenu();
    }

    openProductModal(productId) {
        const product = this.products.find(p => p.id == productId);
        if (!product) return;

        const modal = document.getElementById('product-modal');
        if (!modal) return;

        // Preencher dados do modal
        document.getElementById('modal-main-image').src = product.image;
        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-current-price').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
        
        if (product.originalPrice) {
            document.getElementById('modal-original-price').textContent = `R$ ${product.originalPrice.toFixed(2).replace('.', ',')}`;
            document.getElementById('modal-original-price').style.display = 'inline';
        } else {
            document.getElementById('modal-original-price').style.display = 'none';
        }
        
        document.getElementById('modal-description').textContent = product.description;

        // Adicionar ID do produto ao modal
        modal.dataset.productId = productId;

        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeProductModal() {
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id == productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.updateCartUI();
        this.showNotification(`${product.name} adicionado ao carrinho!`);
    }

    toggleFavorite(productId) {
        const product = this.products.find(p => p.id == productId);
        if (!product) return;

        // Simular favorito (em uma aplicação real, seria salvo no backend)
        const isFavorited = Math.random() > 0.5; // Simulação
        this.showNotification(isFavorited ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!');
    }

    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    toggleCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.toggle('active');
        }
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        if (mobileMenu && mobileMenuToggle) {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Prevenir scroll do body quando menu estiver aberto
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        if (mobileMenu && mobileMenuToggle) {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    toggleDesktopSidebar() {
        const desktopSidebar = document.getElementById('desktop-sidebar');
        const navFilterBtn = document.getElementById('sidebar-open-btn');
        
        if (desktopSidebar && navFilterBtn) {
            desktopSidebar.classList.add('active');
            navFilterBtn.classList.add('hidden');
            document.body.classList.add('sidebar-active');
        }
    }

    closeDesktopSidebar() {
        const desktopSidebar = document.getElementById('desktop-sidebar');
        const navFilterBtn = document.getElementById('sidebar-open-btn');
        
        if (desktopSidebar && navFilterBtn) {
            desktopSidebar.classList.remove('active');
            navFilterBtn.classList.remove('hidden');
            document.body.classList.remove('sidebar-active');
        }
    }

    showNotification(message) {
        // Criar notificação temporária
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color);
            color: var(--primary-color);
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: var(--shadow-medium);
            z-index: 10000;
            font-weight: 600;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Inicializar aplicação quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const catalog = new VitraOneCatalog();
    
    // Expor no escopo global para debug
    window.vitraOne = catalog;
    
    console.log('VitraOne - Catálogo Digital iniciado!');
});

// Utilitários
const Utils = {
    formatPrice: (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    },

    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};