// Sample product data
const products = [
    {
        id: 1,
        name: "Organic Dried Tomatoes",
        price: 12.99,
        category: "vegetables",
        image: "https://images.unsplash.com/photo-1592841200221-21e1c4e65d8e?w=300&h=300&fit=crop",
        description: "Sun-dried organic tomatoes, perfect for cooking"
    },
    {
        id: 2,
        name: "Baobab Fruit Powder",
        price: 15.99,
        category: "fruits",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
        description: "Rich in Vitamin C and calcium, superfood powder"
    },
    {
        id: 3,
        name: "Organic Quinoa",
        price: 8.99,
        category: "grains",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
        description: "Premium organic quinoa, protein-rich grain"
    },
    {
        id: 4,
        name: "Moringa Tea",
        price: 6.99,
        category: "teas",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop",
        description: "Nutrient-rich moringa leaf tea"
    },
    {
        id: 5,
        name: "Dried Spinach",
        price: 9.99,
        category: "vegetables",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
        description: "Dehydrated spinach leaves, iron-rich"
    },
    {
        id: 6,
        name: "Cashew Nuts",
        price: 18.99,
        category: "nuts",
        image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=300&h=300&fit=crop",
        description: "Premium raw cashew nuts"
    },
    {
        id: 7,
        name: "Dried Mangoes",
        price: 14.99,
        category: "fruits",
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=300&fit=crop",
        description: "Sweet dried mango slices, no added sugar"
    },
    {
        id: 8,
        name: "Millet Flour",
        price: 7.99,
        category: "flour",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop",
        description: "Gluten-free millet flour"
    },
    {
        id: 9,
        name: "Chia Seeds",
        price: 11.99,
        category: "nuts",
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=300&fit=crop",
        description: "Organic chia seeds, omega-3 rich"
    },
    {
        id: 10,
        name: "Hibiscus Tea",
        price: 5.99,
        category: "teas",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop",
        description: "Refreshing hibiscus flower tea"
    },
    {
        id: 11,
        name: "Brown Rice",
        price: 6.99,
        category: "grains",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
        description: "Organic brown rice, whole grain"
    },
    {
        id: 12,
        name: "Dried Okra",
        price: 8.99,
        category: "vegetables",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
        description: "Crispy dried okra, vitamin rich"
    }
];

// Cart functionality
let cart = [];
let currentFilter = 'all';

// DOM elements
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const productsGrid = document.getElementById('products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    setupScrollAnimations();
    updateCartUI();
});

// Event listeners
function setupEventListeners() {
    // Cart sidebar toggle
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.id.replace('filter-', '');
            setActiveFilter(filter);
            filterProducts(filter);
        });
    });

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            setActiveFilter(category);
            filterProducts(category);
            scrollToProducts();
        });
    });
}

// Render products
function renderProducts(productsToRender = products) {
    productsGrid.innerHTML = '';
    
    productsToRender.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });

    // Add scroll animations to new products
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('slide-in-right');
        });
    }, 100);
}

// Create product card
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
    card.innerHTML = `
        <div class="relative overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="product-image w-full h-48 object-cover">
            <div class="absolute top-2 right-2">
                <button class="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                    <i class="far fa-heart text-gray-600 hover:text-red-500"></i>
                </button>
            </div>
        </div>
        <div class="p-4">
            <h4 class="font-semibold text-gray-800 mb-2">${product.name}</h4>
            <p class="text-sm text-gray-600 mb-3">${product.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">$${product.price}</span>
                <button onclick="addToCart(${product.id})" class="add-to-cart-btn text-white px-4 py-2 rounded-lg transition-all duration-300">
                    <i class="fas fa-cart-plus mr-1"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    return card;
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    animateCartButton();
    showAddToCartFeedback();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.classList.add('cart-bounce');
        setTimeout(() => cartCount.classList.remove('cart-bounce'), 300);
    }

    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Your cart is empty</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const cartItem = createCartItem(item);
            cartItems.appendChild(cartItem);
        });
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Create cart item
function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg';
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
        <div class="flex-1">
            <h5 class="font-semibold text-sm">${item.name}</h5>
            <p class="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">$${item.price}</p>
        </div>
        <div class="flex items-center space-x-2">
            <button onclick="updateQuantity(${item.id}, -1)" class="quantity-btn w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <i class="fas fa-minus text-xs"></i>
            </button>
            <span class="w-8 text-center font-semibold">${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)" class="quantity-btn w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <i class="fas fa-plus text-xs"></i>
            </button>
        </div>
        <button onclick="removeFromCart(${item.id})" class="text-blue-500 hover:text-blue-700 transition-colors">
            <i class="fas fa-trash text-sm"></i>
        </button>
    `;
    return cartItem;
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('cart-open');
    cartOverlay.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    // Add fade out animation
    productsGrid.style.opacity = '0';
    productsGrid.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        renderProducts(filteredProducts);
        productsGrid.style.opacity = '1';
        productsGrid.style.transform = 'translateY(0)';
    }, 200);
}

// Set active filter button
function setActiveFilter(filter) {
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('bg-gray-200', 'text-gray-700');
        btn.style.background = '';
    });

    const activeBtn = document.getElementById(`filter-${filter}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.classList.remove('bg-gray-200', 'text-gray-700');
        activeBtn.style.background = 'linear-gradient(135deg, #10b981, #3b82f6)';
        activeBtn.classList.add('text-white');
    }
}

// Animate cart button
function animateCartButton() {
    cartBtn.classList.add('pulse-animation');
    setTimeout(() => cartBtn.classList.remove('pulse-animation'), 600);
}

// Show add to cart feedback
function showAddToCartFeedback() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 text-white px-6 py-3 rounded-lg shadow-lg z-50 slide-in-right';
    notification.style.background = 'linear-gradient(135deg, #10b981, #3b82f6)';
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-check-circle"></i>
            <span>Item added to cart!</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Scroll to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.category-card, .product-card').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Checkout function (placeholder)
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Simulate checkout process
    this.classList.add('loading');
    this.textContent = 'Processing...';
    
    setTimeout(() => {
        alert('Thank you for your order! This is a demo - no actual payment was processed.');
        cart = [];
        updateCartUI();
        toggleCart();
        this.classList.remove('loading');
        this.textContent = 'Checkout';
    }, 2000);
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
