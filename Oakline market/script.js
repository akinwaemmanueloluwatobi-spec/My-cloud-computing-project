/* ==========================================
   OAKLINE MARKET - MAIN JAVASCRIPT APPLICATION
   ========================================== */

// --- SAMPLE PRODUCT DATABASE ---
const PRODUCTS = [
    {
        id: "p1",
        name: "Premium Long-Grain Parboiled Rice (5kg)",
        category: "Groceries",
        price: 7500,
        rating: 4.8,
        ratingCount: 124,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: "p2",
        name: "Extra Virgin Olive & Avocado Oil (500ml)",
        category: "Groceries",
        price: 6200,
        rating: 4.6,
        ratingCount: 45,
        badge: "Discount",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: "p3",
        name: "Men's Breathable Cushion Running Sneakers",
        category: "Fashion",
        price: 24500,
        rating: 4.7,
        ratingCount: 82,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: "p4",
        name: "Classic Leather Chronograph Men's Watch",
        category: "Fashion",
        price: 32000,
        rating: 4.9,
        ratingCount: 36,
        badge: "New Arrival",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: "p5",
        name: "Portable Bass-Boost Wireless Bluetooth Speaker",
        category: "Electronics",
        price: 18500,
        rating: 4.5,
        ratingCount: 198,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: "p6",
        name: "Ultra-HD 4K Streaming Smart TV Box",
        category: "Electronics",
        price: 45000,
        rating: 4.4,
        ratingCount: 64,
        badge: "New Arrival",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: "p7",
        name: "7-Speed Electric Countertop Stand Mixer",
        category: "Home & Kitchen",
        price: 28500,
        rating: 4.7,
        ratingCount: 31,
        badge: "New Arrival",
        image: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: "p8",
        name: "Non-Stick Premium Cookware Set (12 Pieces)",
        category: "Home & Kitchen",
        price: 35000,
        rating: 4.8,
        ratingCount: 95,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: "p9",
        name: "Organic Shea Butter Moisture Body Lotion",
        category: "Beauty & Personal Care",
        price: 4500,
        rating: 4.9,
        ratingCount: 112,
        badge: "Discount",
        image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: "p10",
        name: "Luxury Matte Lipstick Collection Set",
        category: "Beauty & Personal Care",
        price: 8500,
        rating: 4.5,
        ratingCount: 28,
        badge: "New Arrival",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: "p11",
        name: "Noise-Cancelling True Wireless Stereo Earbuds",
        category: "Phones & Accessories",
        price: 15000,
        rating: 4.6,
        ratingCount: 210,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: "p12",
        name: "Fast Charging 20,000mAh Power Bank",
        category: "Phones & Accessories",
        price: 12500,
        rating: 4.8,
        ratingCount: 156,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=500&auto=format&fit=crop&q=60"
    }
];

// --- APPLICATION STATE ---
let state = {
    cart: JSON.parse(localStorage.getItem('oakline_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('oakline_wishlist')) || [],
    currentUser: JSON.parse(localStorage.getItem('oakline_user')) || null,
    orders: JSON.parse(localStorage.getItem('oakline_orders')) || [],
    registeredUsers: JSON.parse(localStorage.getItem('oakline_users')) || [
        // Seed user for testing
        { name: "John Doe", email: "johndoe@gmail.com", phone: "09063966069", password: "password123" }
    ],
    activeView: 'home', // 'home', 'shop', 'account'
    shopFilters: {
        search: '',
        category: 'All',
        tag: 'All',
        sort: 'default'
    }
};

// Save seed users back if empty
if (!localStorage.getItem('oakline_users')) {
    localStorage.setItem('oakline_users', JSON.stringify(state.registeredUsers));
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Plugins
    initAOS();
    initSwiper();

    // Set header dynamic class on scroll
    window.addEventListener('scroll', handleHeaderScroll);

    // Initial View setup
    updatePageViews();
    updateBadges();

    // Render components
    renderHomepageProducts('Best Seller');
    renderShopFilters();
    renderShopCatalog();

    // Register Event Listeners
    setupNavigationListeners();
    setupCartListeners();
    setupAuthListeners();
    setupCheckoutListeners();
    setupChatListeners();
    setupContactAndNewsletterListeners();
    setupLegalListeners();
    highlightCurrentDay();
});

// --- AOS (Animate on Scroll) & Swiper ---
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-container', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            breakpoints: {
                576: { slidesPerView: 1.5 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
            }
        });
    }
}

// --- HEADER SCROLL ACTION ---
function handleHeaderScroll() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, isDanger = false) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    
    toastMsg.textContent = message;
    
    // Change icon style
    const icon = toast.querySelector('i');
    if (isDanger) {
        toast.classList.add('danger');
        icon.className = 'fa-solid fa-triangle-exclamation';
    } else {
        toast.classList.remove('danger');
        icon.className = 'fa-solid fa-circle-check';
    }
    
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// --- ROUTING / VIEW NAVIGATION ---
function setupNavigationListeners() {
    // Top nav & mobile sidebar nav links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-bottom-nav-item, footer a[data-view]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const view = link.getAttribute('data-view');
            const scrollId = link.getAttribute('data-scroll');
            
            if (view) {
                e.preventDefault();
                switchView(view);
                closeSidebar();
            } else if (scrollId) {
                // If on another page, switch to home first
                if (state.activeView !== 'home') {
                    e.preventDefault();
                    switchView('home');
                    setTimeout(() => {
                        scrollToSection(scrollId);
                    }, 150);
                } else {
                    // Just scroll normally
                    closeSidebar();
                }
            }
        });
    });

    // Custom view scroll trigger on home page logo clicking
    document.getElementById('headerLogo').addEventListener('click', (e) => {
        e.preventDefault();
        switchView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Category click redirection on home page
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            state.shopFilters.category = category;
            switchView('shop');
            renderShopFilters();
            renderShopCatalog();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Footer category link redirection
    document.querySelectorAll('.footer-cat-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-cat');
            state.shopFilters.category = category;
            switchView('shop');
            renderShopFilters();
            renderShopCatalog();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Hero Shop Now
    document.getElementById('heroShopNowBtn').addEventListener('click', () => {
        switchView('shop');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hero Explore Categories
    document.getElementById('heroCategoriesBtn').addEventListener('click', () => {
        scrollToSection('categoriesSection');
    });

    // Mobile Hamburger Sidebar Controls
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    document.getElementById('menuToggleBtn').addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });

    document.getElementById('closeSidebarBtn').addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Search header button focuses search in shop catalog
    document.getElementById('searchNavBtn').addEventListener('click', () => {
        switchView('shop');
        document.getElementById('shopSearchInput').focus();
    });

    // Wishlist header button opens wishlist profile tab
    document.getElementById('wishlistNavBtn').addEventListener('click', () => {
        switchView('account');
        if (state.currentUser) {
            triggerDashboardPanel('wishlist');
        }
    });
}

function closeSidebar() {
    document.getElementById('mobileSidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

function switchView(viewName) {
    state.activeView = viewName;
    updatePageViews();
    updateActiveNavIndicators();
}

function updatePageViews() {
    const views = ['home', 'shop', 'account'];
    views.forEach(v => {
        const viewEl = document.getElementById(`${v}View`);
        if (v === state.activeView) {
            viewEl.classList.add('active');
            // Refresh AOS elements on dynamic load
            if (typeof AOS !== 'undefined') AOS.refresh();
        } else {
            viewEl.classList.remove('active');
        }
    });

    // Handle account rendering details
    if (state.activeView === 'account') {
        renderAccountDashboard();
    }
}

function updateActiveNavIndicators() {
    // Update Desktop Nav Links
    const desktopLinks = document.querySelectorAll('#mainHeader .nav-link');
    desktopLinks.forEach(link => {
        const linkView = link.getAttribute('data-view');
        if (linkView === state.activeView) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update Bottom Nav bar Active states
    const bottomLinks = document.querySelectorAll('.mobile-bottom-nav-item');
    bottomLinks.forEach(link => {
        const linkView = link.getAttribute('data-view');
        if (linkView === state.activeView) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// --- DYNAMIC RENDERING (PRODUCTS & CARDS) ---

// Price Formatting Utility
function formatPrice(num) {
    return '₦' + num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Generate stars HTML helper
function getStarsHTML(rating) {
    let stars = '';
    const rounded = Math.round(rating * 2) / 2;
    for (let i = 1; i <= 5; i++) {
        if (i <= rounded) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else if (i - 0.5 === rounded) {
            stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            stars += '<i class="fa-regular fa-star"></i>';
        }
    }
    return stars;
}

// Generate Single Product Card
function createProductCardHTML(p) {
    const isWishlisted = state.wishlist.includes(p.id);
    const badgeHTML = p.badge ? `<span class="product-badge ${p.badge === 'New Arrival' ? 'new' : ''}">${p.badge}</span>` : '';
    const ratingHTML = getStarsHTML(p.rating);
    
    return `
        <article class="product-card" data-id="${p.id}">
            ${badgeHTML}
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" aria-label="Add to wishlist" onclick="toggleWishlistItem('${p.id}')">
                <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <div class="product-img-container">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="product-details">
                <div>
                    <span class="product-category">${p.category}</span>
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-rating">
                        ${ratingHTML}
                        <span>(${p.ratingCount})</span>
                    </div>
                </div>
                <div class="product-price-row">
                    <span class="product-price">${formatPrice(p.price)}</span>
                    <button class="add-cart-icon-btn" aria-label="Add to Cart" onclick="addToCart('${p.id}')">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Render homepage selections (Best Sellers / New Arrivals tabs)
function renderHomepageProducts(filterTag) {
    const grid = document.getElementById('homepageProductGrid');
    const filtered = PRODUCTS.filter(p => p.badge === filterTag);
    // Limit to 4 for clean layout
    grid.innerHTML = filtered.slice(0, 4).map(p => createProductCardHTML(p)).join('');
}

// Homepage Selections Tab Listeners
document.getElementById('btnFeaturedBestSellers').addEventListener('click', (e) => {
    document.getElementById('btnFeaturedBestSellers').classList.add('active');
    document.getElementById('btnFeaturedNewArrivals').classList.remove('active');
    renderHomepageProducts('Best Seller');
});

document.getElementById('btnFeaturedNewArrivals').addEventListener('click', (e) => {
    document.getElementById('btnFeaturedNewArrivals').classList.add('active');
    document.getElementById('btnFeaturedBestSellers').classList.remove('active');
    renderHomepageProducts('New Arrival');
});

document.getElementById('btnFeaturedViewAll').addEventListener('click', () => {
    state.shopFilters.tag = 'All';
    switchView('shop');
    renderShopFilters();
    renderShopCatalog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// --- SHOP VIEWS & CATALOG FILTERS ---
function renderShopFilters() {
    // Render sidebar category listing with dynamic product counts
    const categoryListContainer = document.getElementById('shopCategoryFilterList');
    
    // Get unique categories list
    const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
    
    categoryListContainer.innerHTML = categories.map(cat => {
        let count = 0;
        if (cat === 'All') {
            count = PRODUCTS.length;
        } else {
            count = PRODUCTS.filter(p => p.category === cat).length;
        }
        
        const isActive = state.shopFilters.category === cat;
        return `
            <div class="category-filter-item ${isActive ? 'active' : ''}" data-cat="${cat}">
                <span>${cat}</span>
                <span class="count">${count}</span>
            </div>
        `;
    }).join('');

    // Attach listeners to newly generated items
    document.querySelectorAll('.category-filter-item').forEach(item => {
        item.addEventListener('click', () => {
            state.shopFilters.category = item.getAttribute('data-cat');
            renderShopFilters();
            renderShopCatalog();
        });
    });

    // Update tags indicators
    document.querySelectorAll('#shopTagFilterList .tag-btn').forEach(btn => {
        const tag = btn.getAttribute('data-tag');
        if (tag === state.shopFilters.tag) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update search box values
    document.getElementById('shopSearchInput').value = state.shopFilters.search;
}

function renderShopCatalog() {
    const catalogGrid = document.getElementById('shopCatalogGrid');
    
    // Filter logic
    let results = PRODUCTS.filter(p => {
        // 1. Search text filter
        const matchesSearch = p.name.toLowerCase().includes(state.shopFilters.search.toLowerCase()) || 
                              p.category.toLowerCase().includes(state.shopFilters.search.toLowerCase());
        
        // 2. Category filter
        const matchesCategory = state.shopFilters.category === 'All' || p.category === state.shopFilters.category;
        
        // 3. Tag filter
        let matchesTag = true;
        if (state.shopFilters.tag !== 'All') {
            matchesTag = p.badge === state.shopFilters.tag || 
                         (state.shopFilters.tag === 'Discount' && p.badge === 'Discount');
        }
        
        return matchesSearch && matchesCategory && matchesTag;
    });

    // Sorting logic
    if (state.shopFilters.sort === 'price-low') {
        results.sort((a, b) => a.price - b.price);
    } else if (state.shopFilters.sort === 'price-high') {
        results.sort((a, b) => b.price - a.price);
    } else if (state.shopFilters.sort === 'rating') {
        results.sort((a, b) => b.rating - a.rating);
    }

    // Render results
    if (results.length === 0) {
        catalogGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-light);">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; margin-bottom:15px; opacity:0.3;"></i>
                <p>No products found matching your active filters. Try clearing them.</p>
            </div>
        `;
    } else {
        catalogGrid.innerHTML = results.map(p => createProductCardHTML(p)).join('');
    }

    // Update toolbar total count
    document.getElementById('shopProductCount').textContent = results.length;
}

// Sidebar Filter Event setup
function setupCatalogFilterHandlers() {
    // Search input typing
    document.getElementById('shopSearchInput').addEventListener('input', (e) => {
        state.shopFilters.search = e.target.value;
        renderShopCatalog();
    });

    // Tag button clicking
    document.querySelectorAll('#shopTagFilterList .tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.shopFilters.tag = btn.getAttribute('data-tag');
            renderShopFilters();
            renderShopCatalog();
        });
    });

    // Clear filters action
    document.getElementById('btnResetFilters').addEventListener('click', () => {
        state.shopFilters = {
            search: '',
            category: 'All',
            tag: 'All',
            sort: 'default'
        };
        document.getElementById('shopSortSelect').value = 'default';
        renderShopFilters();
        renderShopCatalog();
        showToast("Filters cleared!");
    });

    // Sort Selection change
    document.getElementById('shopSortSelect').addEventListener('change', (e) => {
        state.shopFilters.sort = e.target.value;
        renderShopCatalog();
    });
}
setupCatalogFilterHandlers();


// --- SHOPPING CART MANAGEMENT ---
function updateBadges() {
    const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = state.wishlist.length;
    
    // Header cart badges
    document.getElementById('cartBadge').textContent = cartCount;
    document.getElementById('mobileCartBadge').textContent = cartCount;
    
    // Header wishlist badge
    document.getElementById('wishlistBadge').textContent = wishlistCount;
}

function setupCartListeners() {
    const cartDrawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartDrawerOverlay');
    const cartBtn = document.getElementById('cartNavBtn');
    const mobileCartBtn = document.getElementById('mobileCartTrigger');
    const closeBtn = document.getElementById('closeCartBtn');

    // Cart Drawer Toggle Actions
    const openCart = () => {
        renderCartDrawerItems();
        cartDrawer.classList.add('active');
        overlay.classList.add('active');
    };

    const closeCart = () => {
        cartDrawer.classList.remove('active');
        overlay.classList.remove('active');
    };

    cartBtn.addEventListener('click', openCart);
    mobileCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });
    closeBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    // Proceed to Checkout CTA
    document.getElementById('cartCheckoutBtn').addEventListener('click', () => {
        if (state.cart.length === 0) {
            showToast("Your cart is empty!", true);
            return;
        }
        
        closeCart();
        
        // Require Authentication before checkouts
        if (!state.currentUser) {
            showToast("Please sign in to complete your checkout.", true);
            openAuthModal();
        } else {
            openCheckoutModal();
        }
    });
}

// Global addToCart called from product buttons
window.addToCart = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.product.id === productId);
    if (existingIndex > -1) {
        state.cart[existingIndex].quantity += 1;
    } else {
        state.cart.push({ product, quantity: 1 });
    }

    localStorage.setItem('oakline_cart', JSON.stringify(state.cart));
    updateBadges();
    showToast(`${product.name} added to cart!`);
};

// Global toggleWishlistItem called from card heart buttons
window.toggleWishlistItem = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const index = state.wishlist.indexOf(productId);
    if (index > -1) {
        // Remove
        state.wishlist.splice(index, 1);
        showToast("Removed from wishlist.");
    } else {
        // Add
        state.wishlist.push(productId);
        showToast("Added to wishlist!");
    }

    localStorage.setItem('oakline_wishlist', JSON.stringify(state.wishlist));
    updateBadges();
    
    // Refresh product displays to show filled hearts
    renderShopCatalog();
    renderHomepageProducts(document.getElementById('btnFeaturedBestSellers').classList.contains('active') ? 'Best Seller' : 'New Arrival');
    
    // Refresh profile tab displays if current
    if (state.activeView === 'account') {
        renderAccountDashboard();
    }
};

function renderCartDrawerItems() {
    const cartItemsContainer = document.getElementById('cartDrawerItems');
    const subtotalContainer = document.getElementById('cartDrawerSubtotal');
    
    if (state.cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty-message">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Your cart is empty</p>
                <button class="btn-primary" style="margin-top: 15px; font-size: 0.85rem;" onclick="switchView('shop'); document.getElementById('closeCartBtn').click();">Browse Shop</button>
            </div>
        `;
        subtotalContainer.textContent = '₦0';
        return;
    }

    let subtotal = 0;
    cartItemsContainer.innerHTML = state.cart.map(item => {
        const itemTotal = item.product.price * item.quantity;
        subtotal += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.product.image}" alt="${item.product.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.product.name}</h4>
                    <div class="cart-item-price">${formatPrice(item.product.price)}</div>
                    <div class="cart-item-controls">
                        <div class="cart-qty-spinner">
                            <button onclick="updateCartQty('${item.product.id}', ${item.quantity - 1})" aria-label="Decrease quantity">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateCartQty('${item.product.id}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
                        </div>
                        <button class="cart-item-remove-btn" onclick="removeFromCart('${item.product.id}')" aria-label="Remove item">
                            <i class="fa-regular fa-trash-can"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    subtotalContainer.textContent = formatPrice(subtotal);
}

window.updateCartQty = function(productId, newQty) {
    if (newQty <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const index = state.cart.findIndex(item => item.product.id === productId);
    if (index > -1) {
        state.cart[index].quantity = newQty;
        localStorage.setItem('oakline_cart', JSON.stringify(state.cart));
        updateBadges();
        renderCartDrawerItems();
    }
};

window.removeFromCart = function(productId) {
    state.cart = state.cart.filter(item => item.product.id !== productId);
    localStorage.setItem('oakline_cart', JSON.stringify(state.cart));
    updateBadges();
    renderCartDrawerItems();
    showToast("Item removed from cart.", true);
};


// --- CUSTOMER ACCOUNTS (AUTHENTICATION) ---
function setupAuthListeners() {
    const authModal = document.getElementById('authModalOverlay');
    const accountBtn = document.getElementById('accountNavBtn');
    const closeBtn = document.getElementById('closeAuthModalBtn');
    const openPromptBtn = document.getElementById('openAuthModalBtn');
    
    // Open authentication screen
    window.openAuthModal = () => {
        authModal.classList.add('active');
        // Reset modals to login view first
        showAuthPanel('login');
    };

    window.closeAuthModal = () => {
        authModal.classList.remove('active');
        clearAuthFormErrors();
    };

    accountBtn.addEventListener('click', () => {
        if (state.currentUser) {
            // Logged in: navigate directly to account dashboard view
            switchView('account');
        } else {
            // Logged out: open Auth modal directly
            openAuthModal();
        }
    });

    closeBtn.addEventListener('click', closeAuthModal);
    openPromptBtn.addEventListener('click', openAuthModal);

    // Tab buttons login/register
    document.getElementById('tabLoginBtn').addEventListener('click', () => showAuthPanel('login'));
    document.getElementById('tabRegisterBtn').addEventListener('click', () => showAuthPanel('register'));

    // Password visibility toggles
    document.querySelectorAll('.password-toggle-icon').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const icon = btn.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fa-regular fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fa-regular fa-eye';
            }
        });
    });

    // Form Submissions
    document.getElementById('loginForm').addEventListener('submit', handleLoginSubmit);
    document.getElementById('registerForm').addEventListener('submit', handleRegisterSubmit);
}

function showAuthPanel(panel) {
    const tabLogin = document.getElementById('tabLoginBtn');
    const tabReg = document.getElementById('tabRegisterBtn');
    const panelLogin = document.getElementById('panelLogin');
    const panelReg = document.getElementById('panelRegister');

    if (panel === 'login') {
        tabLogin.classList.add('active');
        tabReg.classList.remove('active');
        panelLogin.classList.add('active');
        panelReg.classList.remove('active');
    } else {
        tabReg.classList.add('active');
        tabLogin.classList.remove('active');
        panelReg.classList.add('active');
        panelLogin.classList.remove('active');
    }
    clearAuthFormErrors();
}

function clearAuthFormErrors() {
    document.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('error'));
}

// Form validation helper
function validateField(input, groupEl, regex, errorMsg) {
    const val = input.value.trim();
    if (!val || (regex && !regex.test(val))) {
        groupEl.classList.add('error');
        if (errorMsg) groupEl.querySelector('.form-error-msg').textContent = errorMsg;
        return false;
    }
    groupEl.classList.remove('error');
    return true;
}

function handleLoginSubmit(e) {
    e.preventDefault();
    clearAuthFormErrors();

    const emailInput = document.getElementById('loginEmail');
    const emailGroup = document.getElementById('loginEmailGroup');
    const passInput = document.getElementById('loginPassword');
    const passGroup = document.getElementById('loginPasswordGroup');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let isValid = true;
    isValid = validateField(emailInput, emailGroup, emailRegex, "Please enter a valid email address.") && isValid;
    isValid = validateField(passInput, passGroup, null, "Please enter your password.") && isValid;

    if (!isValid) return;

    // Verify credentials in registered users
    const matchedUser = state.registeredUsers.find(
        u => u.email.toLowerCase() === emailInput.value.trim().toLowerCase() && u.password === passInput.value
    );

    if (matchedUser) {
        state.currentUser = matchedUser;
        localStorage.setItem('oakline_user', JSON.stringify(matchedUser));
        closeAuthModal();
        showToast(`Welcome back, ${matchedUser.name}!`);
        
        // Reset login form inputs
        emailInput.value = '';
        passInput.value = '';
        
        // Open dashboard view
        switchView('account');
    } else {
        showToast("Invalid email address or password.", true);
        passGroup.classList.add('error');
        passGroup.querySelector('.form-error-msg').textContent = "Incorrect password.";
    }
}

function handleRegisterSubmit(e) {
    e.preventDefault();
    clearAuthFormErrors();

    const nameInput = document.getElementById('regName');
    const nameGroup = document.getElementById('regNameGroup');
    const emailInput = document.getElementById('regEmail');
    const emailGroup = document.getElementById('regEmailGroup');
    const phoneInput = document.getElementById('regPhone');
    const phoneGroup = document.getElementById('regPhoneGroup');
    const passInput = document.getElementById('regPassword');
    const passGroup = document.getElementById('regPasswordGroup');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+]{10,14}$/;

    let isValid = true;
    isValid = validateField(nameInput, nameGroup, null, "Full Name is required.") && isValid;
    isValid = validateField(emailInput, emailGroup, emailRegex, "Please enter a valid email address.") && isValid;
    isValid = validateField(phoneInput, phoneGroup, phoneRegex, "Please enter a valid phone number.") && isValid;
    
    // Password length validation
    if (passInput.value.length < 6) {
        passGroup.classList.add('error');
        isValid = false;
    } else {
        passGroup.classList.remove('error');
    }

    if (!isValid) return;

    // Check if user already exists
    const emailExists = state.registeredUsers.some(u => u.email.toLowerCase() === emailInput.value.trim().toLowerCase());
    if (emailExists) {
        emailGroup.classList.add('error');
        emailGroup.querySelector('.form-error-msg').textContent = "Email address already registered.";
        return;
    }

    // Register User
    const newUser = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim().toLowerCase(),
        phone: phoneInput.value.trim(),
        password: passInput.value
    };

    state.registeredUsers.push(newUser);
    localStorage.setItem('oakline_users', JSON.stringify(state.registeredUsers));
    
    // Automatically login
    state.currentUser = newUser;
    localStorage.setItem('oakline_user', JSON.stringify(newUser));
    
    closeAuthModal();
    showToast("Account created successfully!");
    
    // Reset forms
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    passInput.value = '';

    switchView('account');
}

// --- USER ACCOUNT DASHBOARD VIEWS ---
function renderAccountDashboard() {
    const loggedInSec = document.getElementById('dashboardSection');
    const loggedOutSec = document.getElementById('loggedOutSection');

    if (!state.currentUser) {
        loggedInSec.style.display = 'none';
        loggedOutSec.style.display = 'block';
        return;
    }

    loggedOutSec.style.display = 'none';
    loggedInSec.style.display = 'grid';

    // Populate profile details
    document.getElementById('dashboardUserName').textContent = state.currentUser.name;
    document.getElementById('dashboardUserEmail').textContent = state.currentUser.email;
    document.getElementById('dashboardUserInitial').textContent = state.currentUser.name.charAt(0).toUpperCase();

    // Set Dashboard Menu panels listeners
    document.querySelectorAll('.dashboard-menu-item[data-panel]').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.dashboard-menu-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const panel = btn.getAttribute('data-panel');
            triggerDashboardPanel(panel);
        };
    });

    // Logout Button
    document.getElementById('dashboardLogoutBtn').onclick = () => {
        state.currentUser = null;
        localStorage.removeItem('oakline_user');
        showToast("Signed out successfully.");
        switchView('home');
    };

    // Render Order History and Wishlist initially
    renderOrderHistory();
    renderWishlist();
}

function triggerDashboardPanel(panelName) {
    const panels = ['history', 'wishlist'];
    panels.forEach(p => {
        const el = document.getElementById(`panel${p.charAt(0).toUpperCase() + p.slice(1)}`);
        const btn = document.querySelector(`.dashboard-menu-item[data-panel="${p}"]`);
        
        if (p === panelName) {
            el.classList.add('active');
            if (btn) btn.classList.add('active');
        } else {
            el.classList.remove('active');
            if (btn) btn.classList.remove('active');
        }
    });
}

function renderOrderHistory() {
    const container = document.getElementById('orderHistoryList');
    // Filter user's specific orders
    const userOrders = state.orders.filter(o => o.userEmail === state.currentUser.email);

    if (userOrders.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-light);">
                <i class="fa-solid fa-clock-rotate-left" style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.2;"></i>
                <p>No orders placed yet. Browse the catalog to start shopping!</p>
            </div>
        `;
        return;
    }

    // Sort order listings descending (Newest first)
    userOrders.sort((a,b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = userOrders.map(order => {
        const prodRows = order.items.map(item => `
            <div class="order-product-row">
                <span>${item.product.name}</span>
                <span class="product-q">Qty: ${item.quantity} x ${formatPrice(item.product.price)}</span>
            </div>
        `).join('');

        return `
            <div class="dashboard-order-item">
                <div class="order-item-header">
                    <div>
                        <span class="ref-code">Ref: ${order.reference}</span>
                        <span class="order-date" style="margin-left: 10px;">${new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <span class="order-status">Pending Payment</span>
                </div>
                <div class="order-item-body">
                    ${prodRows}
                </div>
                <div class="order-item-footer">
                    <span>Delivering To: <span style="font-weight: 500; font-size:0.85rem; color:var(--text-light);">${order.address}</span></span>
                    <span class="order-total">${formatPrice(order.total)}</span>
                </div>
            </div>
        `;
    }).join('');
}

function renderWishlist() {
    const container = document.getElementById('wishlistGrid');
    const items = PRODUCTS.filter(p => state.wishlist.includes(p.id));

    if (items.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-light);">
                <i class="fa-regular fa-heart" style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.2;"></i>
                <p>Your wishlist is empty. Add products to save them for later.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(p => createProductCardHTML(p)).join('');
}


// --- CHECKOUT & BANK TRANSFER ORDER FULFILLMENT ---
function setupCheckoutListeners() {
    const modal = document.getElementById('checkoutModalOverlay');
    const closeBtn = document.getElementById('closeCheckoutModalBtn');

    window.openCheckoutModal = () => {
        // Render total price to transfer
        const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        document.getElementById('checkoutOrderTotal').textContent = formatPrice(subtotal);
        
        // Auto-fill user details if logged in
        if (state.currentUser) {
            document.getElementById('checkoutName').value = state.currentUser.name;
            document.getElementById('checkoutPhone').value = state.currentUser.phone;
        }

        modal.classList.add('active');
    };

    window.closeCheckoutModal = () => {
        modal.classList.remove('active');
        clearCheckoutErrors();
    };

    closeBtn.addEventListener('click', closeCheckoutModal);

    // Form Submission
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
}

function clearCheckoutErrors() {
    document.querySelectorAll('#checkoutForm .form-group').forEach(grp => grp.classList.remove('error'));
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    clearCheckoutErrors();

    const nameInput = document.getElementById('checkoutName');
    const nameGroup = document.getElementById('checkoutNameGroup');
    const phoneInput = document.getElementById('checkoutPhone');
    const phoneGroup = document.getElementById('checkoutPhoneGroup');
    const addressInput = document.getElementById('checkoutAddress');
    const addressGroup = document.getElementById('checkoutAddressGroup');
    const refInput = document.getElementById('checkoutReference');
    const refGroup = document.getElementById('checkoutReferenceGroup');

    let isValid = true;
    isValid = validateField(nameInput, nameGroup, null, "Recipient Name is required.") && isValid;
    isValid = validateField(phoneInput, phoneGroup, null, "Phone Number is required.") && isValid;
    isValid = validateField(addressInput, addressGroup, null, "Delivery Address is required.") && isValid;
    isValid = validateField(refInput, refGroup, null, "Reference detail is required.") && isValid;

    if (!isValid) return;

    // Generate simulated order
    const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const orderRef = 'OAK-' + Math.floor(100000 + Math.random() * 900000);
    
    const newOrder = {
        reference: orderRef,
        userEmail: state.currentUser.email,
        items: [...state.cart],
        total: subtotal,
        address: addressInput.value.trim(),
        phone: phoneInput.value.trim(),
        bankRef: refInput.value.trim(),
        date: new Date().toISOString()
    };

    // Save Order state
    state.orders.push(newOrder);
    localStorage.setItem('oakline_orders', JSON.stringify(state.orders));

    // Clear Cart
    state.cart = [];
    localStorage.removeItem('oakline_cart');
    updateBadges();

    // Close checkout details
    closeCheckoutModal();
    
    // Trigger Success Screen
    showToast(`Order Placed! Reference Code: ${orderRef}`);
    
    // Redirect to Order History Dashboard
    switchView('account');
    triggerDashboardPanel('history');
    renderOrderHistory();
}


// --- LIVE CUSTOMER CHATBOT WIDGET ---
const BOT_ANSWERS = {
    delivery: "We offer swift delivery service anywhere in Ibadan, Oyo State (Ring Road, Bodija, Akobo, Challenge, etc.). Orders are processed within 1-2 hours of payment confirmation. Shipping fees are low and calculated based on distance.",
    payment: "To complete your order, transfer the total invoice amount to Access Bank Plc, Account Number: 09063966069, Name: Oakline Market Ventures. Once done, enter the reference code during checkout to process delivery.",
    hours: "Our opening hours are:\n• Monday – Saturday: 8:00 AM – 8:00 PM\n• Sunday: 10:00 AM – 6:00 PM. You can place orders online 24/7!",
    default: "Thank you for reaching out to Oakline Market! How can I assist you today? You can select one of the quick buttons below or click the WhatsApp button to chat with a live representative."
};

function setupChatListeners() {
    const chatBtn = document.getElementById('chatWidgetToggle');
    const closeBtn = document.getElementById('closeChatBtn');
    const chatWindow = document.getElementById('chatWindow');
    const chatForm = document.getElementById('chatInputForm');
    const chatInput = document.getElementById('chatInput');

    chatBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active') && getChatMessagesCount() === 0) {
            sendBotMessage(BOT_ANSWERS.default);
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Manual input typing
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (!msg) return;

        // User Message
        sendUserMessage(msg);
        chatInput.value = '';

        // Bot Response
        setTimeout(() => {
            const query = msg.toLowerCase();
            if (query.includes('delivery') || query.includes('ship') || query.includes('ibadan')) {
                sendBotMessage(BOT_ANSWERS.delivery);
            } else if (query.includes('pay') || query.includes('bank') || query.includes('transfer') || query.includes('account')) {
                sendBotMessage(BOT_ANSWERS.payment);
            } else if (query.includes('hour') || query.includes('time') || query.includes('open') || query.includes('close')) {
                sendBotMessage(BOT_ANSWERS.hours);
            } else {
                sendBotMessage("I am a virtual assistant. For personalized requests, please tap the green WhatsApp icon to speak directly with our team at Ring Road!");
            }
        }, 800);
    });

    // Quick replies setup
    document.querySelectorAll('.chat-reply-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-reply');
            sendUserMessage(btn.textContent);
            
            setTimeout(() => {
                sendBotMessage(BOT_ANSWERS[key]);
            }, 500);
        });
    });
}

function getChatMessagesCount() {
    return document.getElementById('chatMessages').children.length;
}

function sendUserMessage(text) {
    const container = document.getElementById('chatMessages');
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    container.innerHTML += `
        <div class="chat-msg user">
            <p>${text}</p>
            <span class="chat-time">${time}</span>
        </div>
    `;
    scrollChatToBottom();
}

function sendBotMessage(text) {
    const container = document.getElementById('chatMessages');
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Handle newlines
    const formattedText = text.replace(/\n/g, '<br>');
    
    container.innerHTML += `
        <div class="chat-msg bot">
            <p>${formattedText}</p>
            <span class="chat-time">${time}</span>
        </div>
    `;
    scrollChatToBottom();
}

function scrollChatToBottom() {
    const container = document.getElementById('chatMessages');
    container.scrollTop = container.scrollHeight;
}


// --- OTHER FORMS & NEWSLETTERS ---
function setupContactAndNewsletterListeners() {
    // Customer Contact Form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('contactName');
        const nameGroup = document.getElementById('contactNameGroup');
        const emailInput = document.getElementById('contactEmail');
        const emailGroup = document.getElementById('contactEmailGroup');
        const subjectInput = document.getElementById('contactSubject');
        const subjectGroup = document.getElementById('contactSubjectGroup');
        const messageInput = document.getElementById('contactMessage');
        const messageGroup = document.getElementById('contactMessageGroup');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        let isValid = true;
        isValid = validateField(nameInput, nameGroup, null, "Name is required.") && isValid;
        isValid = validateField(emailInput, emailGroup, emailRegex, "Please enter a valid email address.") && isValid;
        isValid = validateField(subjectInput, subjectGroup, null, "Subject is required.") && isValid;
        isValid = validateField(messageInput, messageGroup, null, "Message is required.") && isValid;

        if (!isValid) return;

        showToast("Message sent to customer service!");
        
        // Reset Inputs
        nameInput.value = '';
        emailInput.value = '';
        subjectInput.value = '';
        messageInput.value = '';
        clearContactErrors();
    });

    function clearContactErrors() {
        document.querySelectorAll('#contactForm .form-group').forEach(grp => grp.classList.remove('error'));
    }

    // Newsletter Signups
    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            showToast("Please enter a valid email address.", true);
            return;
        }

        // Show Success
        emailInput.style.display = 'none';
        document.querySelector('#newsletterForm button').style.display = 'none';
        document.getElementById('newsletterSuccess').style.display = 'block';
        
        showToast("Subscribed successfully!");
    });
}


// --- LEGAL DOCUMENTS MODALS ---
function setupLegalListeners() {
    const modal = document.getElementById('legalModalOverlay');
    const closeBtn = document.getElementById('closeLegalModalBtn');
    const body = document.getElementById('legalModalBody');
    const title = document.getElementById('legalModalTitle');

    const openLegal = (type) => {
        if (type === 'terms') {
            title.textContent = "Terms & Conditions";
            body.innerHTML = `
                <p style="margin-bottom:15px;">Welcome to Oakline Market. By accessing and using our marketplace website, you agree to comply with and be bound by the following terms of use:</p>
                <h5 style="color:var(--primary); font-weight:700; margin-bottom:5px;">1. Service Availability</h5>
                <p style="margin-bottom:15px;">We operate as a general marketplace platform providing local delivery solutions within Ibadan, Oyo State. Real-time bank transfer confirmation determines final delivery dispatch timelines.</p>
                <h5 style="color:var(--primary); font-weight:700; margin-bottom:5px;">2. Payment Terms</h5>
                <p style="margin-bottom:15px;">Currently, payments are verified solely through Direct Bank Transfers to Access Bank Account Number: 09063966069. Orders remain pending until payments are cleared by our accounts unit.</p>
                <h5 style="color:var(--primary); font-weight:700; margin-bottom:5px;">3. Returns & Refunds</h5>
                <p style="margin-bottom:15px;">Damaged goods must be reported within 24 hours of receipt for instant replacement. All returns are subject to structural audit checks.</p>
            `;
        } else {
            title.textContent = "Privacy Policy";
            body.innerHTML = `
                <p style="margin-bottom:15px;">Oakline Market respects the privacy of our shoppers. This policy explains how we protect customer credentials:</p>
                <h5 style="color:var(--primary); font-weight:700; margin-bottom:5px;">1. User Accounts</h5>
                <p style="margin-bottom:15px;">Shopper names, emails, and address inputs gathered during dashboard setup are used strictly to coordinate delivery operations. We do not sell or lease customer lists to third-party advertisers.</p>
                <h5 style="color:var(--primary); font-weight:700; margin-bottom:5px;">2. Local Storage Encryption</h5>
                <p style="margin-bottom:15px;">This website uses browser local storage features to persist shopping bags, wishlists, and user profiles locally on your computer device. We advise signing out on public terminals.</p>
                <h5 style="color:var(--primary); font-weight:700; margin-bottom:5px;">3. Data Security</h5>
                <p style="margin-bottom:15px;">All transactions and phone data are handled locally. For live questions, user details are securely forwarded directly to our encrypted business WhatsApp support line.</p>
            `;
        }
        modal.classList.add('active');
    };

    document.getElementById('btnTerms').onclick = (e) => { e.preventDefault(); openLegal('terms'); };
    document.getElementById('btnPrivacy').onclick = (e) => { e.preventDefault(); openLegal('privacy'); };
    closeBtn.onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
}

// --- CURRENT DAY HOURS HIGHLIGHT ---
function highlightCurrentDay() {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hoursMonSat = document.getElementById('hoursMonSat');
    const hoursSun = document.getElementById('hoursSun');
    
    if (today === 0) {
        hoursSun.classList.add('today');
    } else {
        hoursMonSat.classList.add('today');
    }
}
