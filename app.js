const products = [
{
    id: 1,
    name: "Smartphone",
    category: "electronics",
    price: 599,
    image: "images/smartphone.jpg",
    variations: { color: ["Black", "White"], storage: ["64GB", "128GB"] },
  },
  {
    id: 2,
    name: "T-Shirt",
    category: "clothing",
    price: 29,
    image: "images/tshirt.jpg",
    variations: { size: ["S", "M", "L"], color: ["Blue", "Red"] },
  },
  {
    id: 3,
    name: "Watch",
    category: "accessories",
    price: 199,
    image: "images/watch.jpg",
    variations: { material: ["Leather", "Steel"] },
  },

  {
    id: 4,
    name: "Women Clothing",
    category: "clothing",
    price: 40,
    image: "images/girl.jpg",
    variations: { size: ["S", "M", "L"], color: ["Blue", "Red"] },
  },
  {
    id: 5,
    name: "Shoes",
    category: "accessories",
    price: 150,
    image: "images/menshoe.jpg",
    variations: { size: ["5", "6", "7"], color: ["Blue", "Red", "Black"] },
  },
  {
    id: 6,
    name: "Sandal",
    category: "accessories",
    price: 199,
    image: "images/leg.jpg",
    variations: { size: ["5", "6", "7"], color: ["Blue", "Red", "Black"] },
  },
  {
    id: 7,
    name: "Perfume",
    category: "accessories",
    price: 45,
    image: "images/img4.jpg",
    variations: { quantity: ["20 ml", "50 ml"] },
  },
  {
    id: 8,
    name: "Girl's Watch",
    category: "accessories",
    price: 149,
    image: "images/watch1.jpg",
    variations: { material: ["Leather", "Steel"] },
  },
  {
    id: 9,
    name: "Earbud",
    category: "accessories",
    price: 199,
    image: "images/buds.jpg",
    variations: { material: ["Leather", "Steel"] },
  },
  {
    id: 10,
    name: "Bottle",
    category: "accessories",
    price: 30,
    image: "images/bottle.jpg",
    variations: { material: ["Plastic", "Steel"] },
  },
  {
    id: 11,
    name: "Girl's Shoe",
    category: "accessories",
    price: 199,
    image: "images/shoe.jpg",
    variations: { size: ["5", "6", "7"], color: ["Blue", "Red", "Black"] },
  },
  {
    id: 12,
    name: "Girl's Top",
    category: "clothing",
    price: 69,
    image: "images/girl1.jpg",
    variations: { size: ["S", "M", "L"], color: ["Blue", "Red"] },
  },
];

let cart = [];
let currentUser = null;

// Load data from localStorage with error handling
try {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) cart = JSON.parse(storedCart);
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) currentUser = JSON.parse(storedUser);
} catch (error) {
    console.error('Error loading from localStorage:', error);
}

function displayProducts(productsToShow = products) {
    const productGrid = document.getElementById('products');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <select id="variation-${product.id}">
                ${Object.entries(product.variations).map(([key, values]) => 
                    values.map(v => `<option value="${key}:${v}">${key}: ${v}</option>`).join('')
                )}
            </select>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const variationSelect = document.getElementById(`variation-${productId}`);
    if (!variationSelect) return;
    
    const variation = variationSelect.value;
    const cartItem = cart.find(item => item.productId === productId && item.variation === variation);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ productId, variation, quantity: 1 });
    }
    
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    
    if (!cartItems || !cartTotal || !cartCount) return;
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;
        
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="50">
            <div>
                <h4>${product.name} (${item.variation})</h4>
                <p>$${product.price} x ${item.quantity} = $${itemTotal}</p>
                <button onclick="updateCartItem(${index}, ${item.quantity + 1})">+</button>
                <button onclick="updateCartItem(${index}, ${item.quantity - 1})">-</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartItem(index, quantity) {
    if (quantity <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].quantity = quantity;
    }
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    } catch (error) {
        console.error('Error updating cart:', error);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}

function checkout() {
    if (!currentUser) {
        alert('Please login to checkout');
        showLogin();
        return;
    }
    if (cart.length === 0) {
        alert('Cart is empty');
        return;
    }
    alert('Checkout successful!');
    cart = [];
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    } catch (error) {
        console.error('Error during checkout:', error);
    }
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    // Basic input sanitization
    const searchTerm = searchInput.value.replace(/[<>]/g, '').toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (!categoryFilter || !sortFilter) return;
    
    const category = categoryFilter.value;
    const sort = sortFilter.value;
    
    let filteredProducts = [...products];
    
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (sort === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    displayProducts(filteredProducts);
}

function showLogin() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'block';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    }
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function logout() {
    currentUser = null;
    try {
        localStorage.removeItem('currentUser');
        document.getElementById('loginBtn').textContent = 'Login';
        alert('Logged out successfully');
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

// Hamburger Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks && hamburger) {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Initialize event listeners
function initializeEventListeners() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            if (currentUser) {
                logout();
            } else {
                showLogin();
            }
        });
    }

    const closeModal = document.querySelector('.close');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            const loginModal = document.getElementById('loginModal');
            if (loginModal) loginModal.style.display = 'none';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementByソーシャルメディアを読み込む
            document.getElementById('loginPassword').value;
            
            // In production, verify credentials against database
            currentUser = { email };
            try {
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                document.getElementById('loginModal').style.display = 'none';
                document.getElementById('loginBtn').textContent = 'Logout';
            } catch (error) {
                console.error('Error during login:', error);
            }
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const username = document.getElementById('regUsername').value.replace(/[<>]/g, '');
            const email = document.getElementById('regEmail').icsreplace(/[<>]/g, '');
            const password = document.getElementById('regPassword').value;
            
            // In production, store in database with hashed password
            currentUser = { username, email };
            try {
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                document.getElementById('loginModal').style.display = 'none';
                document.getElementById('loginBtn').textContent = 'Logout';
            } catch (error) {
                console.error('Error during registration:', error);
            }
        });
    }

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', e => {
            e.preventDefault();
            if (!currentUser) {
                alert('Please login to update profile');
                showLogin();
                return;
            }
            currentUser.username = document.getElementById('username').value.replace(/[<>]/g, '');
            currentUser.email = document.getElementById('email').value.replace(/[<>]/g, '');
            const password = document.getElementById('password').value;
            if (password) {
                // In production, hash password
                currentUser.password = password;
            }
            try {
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                alert('Profile updated successfully');
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        });
    }

    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (sortFilter) sortFilter.addEventListener('change', filterProducts);

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionId = e.target.getAttribute('href').substring(1);
            document.querySelectorAll('main > section').forEach(section => {
                section.style.display = section.id === sectionId ? 'block' : 'none';
            });
            toggleMenu(); // Close menu on link click
        });
    });

    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartDisplay();
    if (currentUser) {
        document.getElementById('loginBtn').textContent = 'Logout';
    }
    initializeEventListeners();
});